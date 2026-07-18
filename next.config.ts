import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

// R2-hosted CMS media lives at a runtime-configured domain; picsum.photos is
// used for dev/seed placeholder imagery. Both need explicit remotePatterns
// now that optimization is on (Next requires an allowlist for remote hosts).
const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  { protocol: "https", hostname: "picsum.photos" },
];
if (process.env.R2_PUBLIC_URL) {
  try {
    const r2 = new URL(process.env.R2_PUBLIC_URL);
    remotePatterns.push({ protocol: r2.protocol.replace(":", "") as "https", hostname: r2.hostname });
  } catch {
    /* invalid URL in env; skip */
  }
}

const nextConfig: NextConfig = {
  // NOTE: `output: "export"` (static export) was removed so the contact form's
  // `/api/contact` route handler can run server-side to send email via SMTP.
  // Every page is still statically prerendered; only the API route needs a
  // Node.js server / serverless function at runtime.
  trailingSlash: true,
  // Optimization was off (`unoptimized: true`) as a leftover from the old
  // static-export setup. The app is server-rendered now, so let next/image
  // actually resize/re-encode (AVIF/WebP) instead of shipping originals.
  images: { remotePatterns },
  // nodemailer is a Node-only package; keep it out of the bundle so its
  // dynamic requires resolve correctly at runtime.
  // nodemailer: Node-only, dynamic requires must resolve at runtime.
  // sharp: `next/og` (ImageResponse) calls sharp to rasterize the OG cards.
  // Bundling it pairs sharp's JS with the wrong native @img binary (the repo
  // has sharp 0.35/libvips 8.18 at the root and 0.34/8.17 under next/), which
  // throws "colourspace: parameter space not set" on every OG request.
  serverExternalPackages: ["nodemailer", "sharp"],
};

export default withAnalyzer(withPayload(nextConfig));
