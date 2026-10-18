import "server-only";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { site } from "@/config/site";

/**
 * SMTP configuration, read once from the environment. All values come from
 * env so no credentials ever live in the repo. See `.env.example`.
 */
export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  /** Where inquiry notifications land. Defaults to the public studio inbox. */
  to: string;
};

function readConfig(): MailConfig {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM;

  const missing = [
    ["SMTP_HOST", host],
    ["SMTP_USER", user],
    ["SMTP_PASS", pass],
    ["MAIL_FROM", from],
  ]
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length > 0) {
    throw new Error(`Mailer is not configured. Missing env: ${missing.join(", ")}`);
  }

  const port = Number(process.env.SMTP_PORT ?? 465);
  // Default to implicit TLS on 465; otherwise honor SMTP_SECURE explicitly.
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  return {
    host: host!,
    port,
    secure,
    user: user!,
    pass: pass!,
    from: from!,
    to: process.env.MAIL_TO || site.email,
  };
}

let cached: { transporter: Transporter; config: MailConfig } | null = null;

/** Lazily create and reuse a single SMTP transporter across requests. */
export function getMailer(): { transporter: Transporter; config: MailConfig } {
  if (cached) return cached;
  const config = readConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });
  cached = { transporter, config };
  return cached;
}
