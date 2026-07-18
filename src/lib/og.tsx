import type { ReactElement } from "react";

/**
 * Shared 1200x630 Open Graph card for the dynamic `opengraph-image.tsx`
 * routes. Colors are the sRGB equivalents of the OKLCH tokens in
 * globals.css — satori (next/og) does not parse oklch().
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const BG = "#0a0b0a";
const CARD = "#141613";
const FG = "#f4f4f4";
const MUTED = "#b3b3bd";
const ACCENT = "#8fc57f";
const ACCENT_DEEP = "#35753a";

/** Hard character clamp — satori's line-clamp support is patchy, and a
 *  truncated string is cheaper than a broken render. */
function clamp(text: string, max: number): string {
  const t = text.trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

/** The NM monogram from components/ui/Logo, with a literal accent fill. */
function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <svg width="126" height="28" viewBox="0 0 180 40">
        <polygon points="0,0 40,0 0,40" fill={ACCENT} />
        <polygon points="80,0 80,40 40,40" fill={ACCENT} />
        <polygon points="100,0 140,40 100,40" fill={ACCENT} />
        <polygon points="180,0 180,40 140,40" fill={ACCENT} />
      </svg>
      <span style={{ color: FG, fontSize: 26, fontWeight: 600, letterSpacing: -0.4 }}>
        New Machine
      </span>
    </div>
  );
}

type CardProps = {
  /** Section label, e.g. "Case Study". */
  kicker: string;
  title: string;
  /** Supporting line under the title. */
  subtitle?: string;
  /** Bottom-left meta line, e.g. "8 min read · Mar 2026". */
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
  const clamped = clamp(title, metric ? 46 : 78);
  const titleSize = clamped.length > 52 ? 62 : clamped.length > 30 ? 76 : 92;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: BG,
        color: FG,
        fontFamily: "sans-serif",
      }}
    >
      {/* Left accent rail */}
      <div
        style={{
          width: 14,
          height: "100%",
          display: "flex",
          backgroundImage: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
        }}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "62px 72px",
        }}
      >
        {/* Top: wordmark + kicker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Wordmark />
          <span
            style={{
              display: "flex",
              color: ACCENT,
              backgroundColor: CARD,
              border: `1px solid ${ACCENT_DEEP}`,
              borderRadius: 999,
              fontSize: 19,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontWeight: 600,
              padding: "8px 20px",
            }}
          >
            {kicker}
          </span>
        </div>

        {/* Middle: the payload */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {metric ? (
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 30 }}>
              <span
                style={{
                  color: ACCENT,
                  fontSize: 178,
                  fontWeight: 700,
                  letterSpacing: -6,
                  lineHeight: 1,
                }}
              >
                {clamp(metric, 10)}
              </span>
              {metricLabel ? (
                <span style={{ color: MUTED, fontSize: 28, marginTop: 12 }}>
                  {clamp(metricLabel, 76)}
                </span>
              ) : null}
            </div>
          ) : null}

          <span
            style={{
              fontSize: metric ? 46 : titleSize,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.08,
            }}
          >
            {clamped}
          </span>

          {subtitle ? (
            <span
              style={{
                color: MUTED,
                fontSize: 30,
                lineHeight: 1.35,
                marginTop: 22,
                maxWidth: 900,
              }}
            >
              {clamp(subtitle, 150)}
            </span>
          ) : null}
        </div>

        {/* Bottom: meta + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid rgba(255,255,255,0.10)`,
            paddingTop: 26,
            fontSize: 24,
            color: MUTED,
          }}
        >
          <span>{meta ? clamp(meta, 70) : ""}</span>
          <span style={{ color: ACCENT }}>newmachine.ph</span>
        </div>
      </div>
    </div>
  );
}
