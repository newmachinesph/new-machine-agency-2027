import type { CSSProperties } from "react";
import type { BrandIcon } from "@/components/ui/icons";
import PatternGrid from "@/components/ui/PatternGrid";

type FeatureCardProps = {
  icon: BrandIcon;
  title: string;
  text: string;
  /** Tint color (any CSS color or var) for the icon square and the card's gradient wash. */
  tint: string;
  /** Text-color utility for the icon glyph against the tint (e.g. "text-accent-ink"). */
  onTint?: string;
  /** PatternGrid seed so adjacent cards get distinct corner motifs. */
  seed?: number;
  className?: string;
};

/**
 * Tinted bento cell: chamfered icon square, title, blurb, and a chamfered-tile
 * corner motif over a green-ramp gradient wash. The shared "value / feature"
 * card used on the about and careers pages so both read as one system.
 */
export default function FeatureCard({
  icon: Icon,
  title,
  text,
  tint,
  onTint = "text-accent-ink",
  seed,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`bento-cell relative h-full overflow-hidden p-7 ${className}`.trim()}
      style={
        {
          "--tint": tint,
          background:
            "linear-gradient(160deg, color-mix(in srgb, var(--tint) 30%, var(--card)) 0%, var(--card) 62%)",
        } as CSSProperties
      }
    >
      <PatternGrid
        cols={3}
        rows={3}
        seed={seed}
        className="pointer-events-none absolute -right-5 -top-5 h-28 w-28 opacity-[0.22] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_72%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_72%)]"
      />
      <div className="relative">
        <span
          className="grid h-12 w-12 place-items-center chamfer"
          style={{ background: tint }}
        >
          <Icon size={20} className={onTint} />
        </span>
        <h3 className="mt-5 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted">{text}</p>
      </div>
    </div>
  );
}
