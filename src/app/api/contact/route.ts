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

/** Trim, collapse newlines out of single-line fields, and cap length. */
function clean(value: unknown, max: number, singleLine = true): string {
  let s = typeof value === "string" ? value.trim() : "";
  if (singleLine) s = s.replace(/[\r\n]+/g, " ");
  return s.slice(0, max);
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
