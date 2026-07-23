import type { ReactElement } from "react";

/**
 * Shared 1200x630 Open Graph card for the dynamic `opengraph-image.tsx`
 * routes, in the v2 machine-dark vocabulary: near-black green canvas,
 * hairline grid, corner-ticked frame, triangle-mosaic wordmark.
 * Colors are sRGB equivalents of the OKLCH tokens in globals.css —
 * satori (next/og) does not parse oklch().
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const BG = "#101311"; // oklch(12.5% 0.006 150)
const FG = "#f4f6f3";
const MUTED = "#9aa39a";
const ACCENT = "#8fc57f"; // oklch(76.8% 0.112 138.7)
const GRID = "rgba(255,255,255,0.08)";
const FRAME = "rgba(255,255,255,0.16)";

/** Hard character clamp — satori's line-clamp support is patchy, and a
 *  truncated string is cheaper than a broken render. */
function clamp(text: string, max: number): string {
  const t = text.trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

/** The NM triangle mosaic from components/ui/Logo + NEW*MACHINE wordmark. */
function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <svg width="112" height="25" viewBox="0 0 180 40">
        <polygon points="0,0 40,0 0,40" fill={ACCENT} />
        <polygon points="80,0 80,40 40,40" fill={ACCENT} />
        <polygon points="100,0 140,40 100,40" fill={ACCENT} />
        <polygon points="180,0 180,40 140,40" fill={ACCENT} />
      </svg>
      <span
        style={{
          display: "flex",
          color: FG,
          fontSize: 23,
          fontWeight: 700,
          letterSpacing: 3,
        }}
      >
        NEW<span style={{ color: ACCENT }}>*</span>MACHINE
      </span>
    </div>
  );
}

/** 7px solid corner tick — the site's .v2-frame signature. */
function Tick({ corner }: { corner: "tl" | "br" }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 11,
        height: 11,
        backgroundColor: FG,
        ...(corner === "tl" ? { top: -6, left: -6 } : { bottom: -6, right: -6 }),
      }}
    />
  );
}

type CardProps = {
  /** Section label, e.g. "Case Study". */
  kicker: string;
  title: string;
  /** Supporting line under the title. */
  subtitle?: string;
  /** Bottom meta line, e.g. "8 min read · Mar 2026". */
  meta?: string;
  /** Hero number (case studies lead with this). */
  metric?: string;
  metricLabel?: string;
};

export function ogCard({
  kicker,
  title,
  subtitle,
  meta,
  metric,
  metricLabel,
}: CardProps): ReactElement {
  const clamped = clamp(title, metric ? 46 : 72);
  const titleSize = clamped.length > 48 ? 60 : clamped.length > 28 ? 74 : 92;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: BG,
        color: FG,
        fontFamily: "sans-serif",
        padding: 44,
      }}
    >
      {/* Hairline grid: one div per axis (satori tiles single gradients reliably) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          backgroundImage: `linear-gradient(90deg, ${GRID} 0px, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "100px 630px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          backgroundImage: `linear-gradient(180deg, ${GRID} 0px, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "1200px 100px",
        }}
      />
      {/* Soft radial green glow, top-right corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(143,197,127,0.20) 0%, rgba(143,197,127,0) 55%)",
        }}
      />

      {/* Corner-ticked frame (.v2-frame signature) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          border: `1px solid ${FRAME}`,
          padding: "48px 56px",
        }}
      >
        <Tick corner="tl" />
        <Tick corner="br" />

        {/* Kicker: accent square + small caps, letter-spaced, muted */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 12, height: 12, backgroundColor: ACCENT }} />
          <span
            style={{
              display: "flex",
              color: MUTED,
              fontSize: 21,
              letterSpacing: 5,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {kicker}
          </span>
        </div>

        {/* Middle: the payload */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {metric ? (
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 28 }}>
              <span
                style={{
                  color: ACCENT,
                  fontSize: 172,
                  fontWeight: 700,
                  letterSpacing: -6,
                  lineHeight: 1,
                }}
              >
                {clamp(metric, 10)}
              </span>
              {metricLabel ? (
                <span style={{ color: MUTED, fontSize: 28, marginTop: 14 }}>
                  {clamp(metricLabel, 76)}
                </span>
              ) : null}
            </div>
          ) : null}

          <span
            style={{
              color: FG,
              fontSize: metric ? 46 : titleSize,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.04,
            }}
          >
            {clamped}
          </span>

          {subtitle ? (
            <span
              style={{
                color: MUTED,
                fontSize: 29,
                lineHeight: 1.35,
                marginTop: 22,
                maxWidth: 880,
              }}
            >
              {clamp(subtitle, 150)}
            </span>
          ) : null}
        </div>

        {/* Bottom row: wordmark + meta · domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Wordmark />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 23,
              color: MUTED,
            }}
          >
            {meta ? <span style={{ display: "flex" }}>{clamp(meta, 60)}</span> : null}
            {meta ? <span style={{ display: "flex", color: FRAME }}>·</span> : null}
            <span style={{ display: "flex", color: FG }}>newmachine.ph</span>
          </div>
        </div>
      </div>
    </div>
  );
}
