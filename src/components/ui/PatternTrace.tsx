type PatternTraceProps = {
  className?: string;
  /** Unique per page usage: SVG pattern ids must not collide. */
  idPrefix?: string;
};

/**
 * Chamfered-rectangle linework traced from the client's pattern reference.
 * Two staggered rows of closed outlines per tile (brick layout): every
 * path is closed, so the repeat can never produce dangling segments.
 * The row-B path crosses the tile edge and is drawn twice (once shifted
 * by -340) so the horizontal seam overlaps exactly.
 * Decorative only: parent sets color via `text-…` (currentColor) and opacity.
 */
export default function PatternTrace({ className = "", idPrefix = "pt" }: PatternTraceProps) {
  const id = `${idPrefix}-trace`;
  const box = "fill-none stroke-current";
  return (
    <svg aria-hidden="true" className={className} width="100%" height="100%">
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width="340" height="260">
          <path d="M60 20 H320 V80 L280 120 H20 V60 Z" className={box} strokeWidth="1" />
          <path d="M230 150 H490 V210 L450 250 H190 V190 Z" className={box} strokeWidth="1" />
          <path d="M-110 150 H150 V210 L110 250 H-150 V190 Z" className={box} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
