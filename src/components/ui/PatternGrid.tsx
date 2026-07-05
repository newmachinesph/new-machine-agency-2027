import type { CSSProperties } from "react";

type PatternGridProps = {
  cols?: number;
  rows?: number;
  className?: string;
  style?: CSSProperties;
};

const CELL = 56;
const CH = 14; // chamfer — echoes the .chamfer signature
const NOTCH = 16;

/** Green ramp, light → dark, cycled by row (traced from the quilt reference). */
const RAMP = [
  "var(--accent-strong)",
  "var(--accent)",
  "var(--accent-deep)",
  "var(--accent)",
];

/**
 * Filled chamfered-square grid in a green ramp — traced as vectors from the
 * client's mosaic key-art. Each cell is a chamfered square with a dark corner
 * notch. Deterministic, pure SVG (no client JS); parent sets size + opacity.
 */
export default function PatternGrid({
  cols = 3,
  rows = 4,
  className = "",
  style,
}: PatternGridProps) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    const fill = RAMP[r % RAMP.length];
    for (let c = 0; c < cols; c++) {
      const x = c * CELL;
      const y = r * CELL;
      const x2 = x + CELL;
      const y2 = y + CELL;
      // Square with a chamfered top-right corner.
      const body = `${x},${y} ${x2 - CH},${y} ${x2},${y + CH} ${x2},${y2} ${x},${y2}`;
      // Dark triangular notch, top-left — reads as a cut in both themes.
      const notch = `${x},${y} ${x + NOTCH},${y} ${x},${y + NOTCH}`;
      cells.push(
        <g key={`${r}-${c}`}>
          <polygon points={body} fill={fill} />
          <polygon points={notch} fill="#000" fillOpacity="0.32" />
        </g>,
      );
    }
  }
  return (
    <svg
      aria-hidden="true"
      className={className}
      style={style}
      viewBox={`0 0 ${cols * CELL} ${rows * CELL}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      width="100%"
    >
      {cells}
    </svg>
  );
}
