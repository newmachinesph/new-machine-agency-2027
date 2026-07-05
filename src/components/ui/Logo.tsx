type LogoProps = {
  className?: string;
};

/**
 * NM monogram in the original PatternMosaic tile vocabulary (40px half-square
 * triangles, flat sage, crisp edges). Left pair = the untouched ◤◢ tiles that
 * read as "N"; right pair = two ramps descending into a center valley — outer
 * stems + V = abstract "M".
 */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 180 40"
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* N — original mosaic tiles, unchanged */}
      <polygon points="0,0 40,0 0,40" fill="var(--accent)" />
      <polygon points="80,0 80,40 40,40" fill="var(--accent)" />
      {/* M — ramps meeting in a center valley */}
      <polygon points="100,0 140,40 100,40" fill="var(--accent)" />
      <polygon points="180,0 180,40 140,40" fill="var(--accent)" />
    </svg>
  );
}
