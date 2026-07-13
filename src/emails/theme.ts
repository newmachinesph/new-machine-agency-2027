/**
 * Shared visual tokens for transactional email. Mirrors the site brand
 * (sage accent on near-black) but tuned for email: a light, readable body
 * with a dark branded header/footer, since most inboxes and forwards render
 * light backgrounds far more reliably than a fully dark layout.
 */
export const brand = {
  ink: "#0a0a0a", // header / footer background, dark UI
  sage: "#8fc57f", // accent, on the dark header only (low contrast on white)
  sageDeep: "#35753a", // accent text/links on light backgrounds (readable)
  paper: "#ffffff", // body background
  panel: "#f5f7f4", // light detail card
  border: "#e6e8e4",
  text: "#18181b",
  muted: "#6b7280",
  mutedOnInk: "#a1a1aa",
} as const;

export const fontStack =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';

/** Content id nodemailer uses to inline the brand icon as an attachment. */
export const LOGO_CID = "newmachine-logo";
