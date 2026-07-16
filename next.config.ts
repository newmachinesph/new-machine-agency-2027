import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // NOTE: `output: "export"` (static export) was removed so the contact form's
  // `/api/contact` route handler can run server-side to send email via SMTP.
  // Every page is still statically prerendered; only the API route needs a
  // Node.js server / serverless function at runtime.
  trailingSlash: true,
  images: { unoptimized: true },
  // nodemailer is a Node-only package; keep it out of the bundle so its
  // dynamic requires resolve correctly at runtime.
  serverExternalPackages: ["nodemailer"],
};

export default withPayload(nextConfig);
