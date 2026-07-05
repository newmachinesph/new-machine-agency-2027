import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/**
 * Build-time social card (og:image + Twitter). Deliberately dependency-free —
 * flat brand colours and the system sans, so it renders during static export
 * with no font fetch. Swap for real art in /public and reference it in
 * layout metadata when brand assets land.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "80px",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: 28, height: 28, background: "#8fc57f" }} />
          <div
            style={{
              fontSize: 30,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#a9d896",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            <div style={{ display: "flex" }}>Digital growth that</div>
            <div style={{ display: "flex", color: "#8fc57f" }}>actually converts.</div>
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#b3b3bd", maxWidth: 900 }}>
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#b3b3bd", letterSpacing: "0.04em" }}>
          {site.domain}
        </div>
      </div>
    ),
    size,
  );
}
