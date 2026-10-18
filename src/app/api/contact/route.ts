import { NextResponse } from "next/server";
import { getPayload } from "payload";
import payloadConfig from "@payload-config";
import { site } from "@/config/site";
import { getMailer } from "@/lib/mailer";
import { LOGO_PNG } from "@/emails/logo";
import { LOGO_CID } from "@/emails/theme";
import {
  renderConfirmationEmail,
  renderNotificationEmail,
} from "@/emails/render";

// nodemailer needs the Node.js runtime (not Edge), and each submission must be
// handled at request time.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 200, email: 254, company: 200, service: 120, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-instance in-memory limiter: 5 submissions / 10 min per IP. Resets on
// redeploy/cold start and doesn't share state across instances — fine for
// this endpoint's honeypot-backed abuse level, revisit with Upstash if traffic grows.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const rateLimitHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitHits.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

/** Trim, collapse newlines out of single-line fields, and cap length. */
function clean(value: unknown, max: number, singleLine = true): string {
  let s = typeof value === "string" ? value.trim() : "";
  if (singleLine) s = s.replace(/[\r\n]+/g, " ");
  return s.slice(0, max);
}

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verify the Turnstile token with Cloudflare. Returns an error string when the
 * submission should be rejected, or null when it may proceed.
 *
 * Fails CLOSED in production: if the secret is missing there, something is
 * misconfigured and we reject rather than silently serving an unprotected
 * endpoint. In development an unset secret skips the check so the form is
 * usable without Cloudflare credentials.
 */
async function verifyTurnstile(token: string, ip: string): Promise<string | null> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] TURNSTILE_SECRET_KEY is not set; rejecting submission");
      return "Verification is not configured on the server.";
    }
    return null;
  }

  if (!token) return "Please complete the verification challenge.";

  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    const result = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    if (result.success === true) return null;
    console.warn("[contact] turnstile rejected:", result["error-codes"]);
    return "Verification failed. Please try again.";
  } catch (err) {
    // Cloudflare unreachable or timed out. Reject rather than wave it
    // through — an outage must not become an open spam window.
    console.error("[contact] turnstile verification error:", err);
    return "We couldn't verify your submission. Please try again.";
  }
}

function logoAttachment() {
  return [
    {
      filename: "new-machine.png",
      content: LOGO_PNG,
      cid: LOGO_CID,
      contentType: "image/png",
    },
  ];
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success, send nothing.
  if (clean(payload.website, 100).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, MAX.name);
  const email = clean(payload.email, MAX.email);
  const company = clean(payload.company, MAX.company);
  const service = clean(payload.service, MAX.service);
  const message = clean(payload.message, MAX.message, false);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, email and message." },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 422 },
    );
  }

  // Bot check runs after cheap validation but before any mail or DB work.
  const turnstileError = await verifyTurnstile(
    clean(payload.turnstileToken, 2048),
    ip,
  );
  if (turnstileError) {
    return NextResponse.json({ ok: false, error: turnstileError }, { status: 403 });
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Manila",
  });
  const firstName = name.split(" ")[0] || name;

  let mailer: ReturnType<typeof getMailer>;
  try {
    mailer = getMailer();
  } catch (err) {
    console.error("[contact] mailer config error:", err);
    return NextResponse.json(
      { ok: false, error: "Email is not configured on the server yet." },
      { status: 500 },
    );
  }
  const { transporter, config } = mailer;

  // 1) Notification to the studio (the critical send).
  try {
    const { html, text } = await renderNotificationEmail({
      name,
      email,
      company: company || undefined,
      service: service || undefined,
      message,
      submittedAt,
    });
    await transporter.sendMail({
      from: config.from,
      to: config.to,
      replyTo: `"${name}" <${email}>`,
      subject: `New inquiry from ${name}${company ? ` (${company})` : ""}`,
      html,
      text,
      attachments: logoAttachment(),
    });
  } catch (err) {
    console.error("[contact] failed to send notification:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please try again." },
      { status: 502 },
    );
  }

  // Persist the lead to the admin (best-effort: a DB failure must not break the
  // email response contract).
  try {
    const payloadClient = await getPayload({ config: payloadConfig });
    await payloadClient.create({
      collection: "contact-submissions",
      data: { name, email, company, service, message },
    });
  } catch (err) {
    console.error("[contact] failed to save submission (non-fatal):", err);
  }

  // 2) Confirmation to the visitor (best-effort: never fail the request on it).
  try {
    const { html, text } = await renderConfirmationEmail({
      name,
      service: service || undefined,
      message,
    });
    await transporter.sendMail({
      from: config.from,
      to: `"${name}" <${email}>`,
      replyTo: site.email,
      subject: `We got your message, ${firstName}`,
      html,
      text,
      attachments: logoAttachment(),
    });
  } catch (err) {
    console.error("[contact] failed to send confirmation (non-fatal):", err);
  }

  return NextResponse.json({ ok: true });
}
