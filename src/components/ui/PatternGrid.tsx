import type { CSSProperties } from "react";

type PatternGridProps = {
  cols?: number;
  rows?: number;
  seed?: number;
  className?: string;
  style?: CSSProperties;
};

const CELL = 56;
const CH = 14; // chamfer: echoes the .chamfer signature
const NOTCH = 16;

// Field tones + a brighter highlight that pops off the field so the block
// reads instead of blending into the surface at low opacity.
const FIELD = ["var(--accent)", "var(--accent-deep)"];
const HIGHLIGHT = "var(--accent-strong)";

/**
 * Deterministic spatial hash: stable on server + client (no Math.random),
 * so no hydration mismatch and the field never repeats a block. Same trick
 * as PatternMosaic; `seed` offsets it so each placement looks distinct.
 */
function hash(x: number, y: number): number {
  let h = (x * 73856093) ^ (y * 19349663);
  h ^= h >>> 13;
  return h >>> 0;
}

/** Chamfered-square body with the cut at corner o (0=TL,1=TR,2=BR,3=BL). */
function body(o: number, x: number, y: number, x2: number, y2: number): string {
  switch (o) {
    case 0:
      return `${x + CH},${y} ${x2},${y} ${x2},${y2} ${x},${y2} ${x},${y + CH}`;
    case 1:
      return `${x},${y} ${x2 - CH},${y} ${x2},${y + CH} ${x2},${y2} ${x},${y2}`;
    case 2:
      return `${x},${y} ${x2},${y} ${x2},${y2 - CH} ${x2 - CH},${y2} ${x},${y2}`;
    default:
      return `${x},${y} ${x2},${y} ${x2},${y2} ${x + CH},${y2} ${x},${y2 - CH}`;
  }
}

/** Dark notch triangle at corner o: reads as a cut in both themes. */
function notch(o: number, x: number, y: number, x2: number, y2: number): string {
  switch (o) {
    case 0:
      return `${x},${y} ${x + NOTCH},${y} ${x},${y + NOTCH}`;
    case 1:
      return `${x2},${y} ${x2 - NOTCH},${y} ${x2},${y + NOTCH}`;
    case 2:
      return `${x2},${y2} ${x2 - NOTCH},${y2} ${x2},${y2 - NOTCH}`;
    default:
      return `${x},${y2} ${x + NOTCH},${y2} ${x},${y2 - NOTCH}`;
  }
}

/**
 * Abstract chamfered-tile field in a green ramp, traced from the client's
 * mosaic key-art. Each cell's fill, chamfer corner, and presence come from a
 * spatial hash, so the block reads as an irregular quilt (not a repeating
 * wallpaper) and two placements with different `seed` never match. Pure SVG,
 * no client JS; parent sets size + opacity.
 */
export default function PatternGrid({
  cols = 3,
  rows = 4,
  seed = 0,
  className = "",
  style,
}: PatternGridProps) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const h = hash(c + seed * 131 + 1, r + seed * 89 + 1);
      const v = h % 100;
      if (v < 14) continue; // gap → negative space breaks the solid field

      const x = c * CELL;
      const y = r * CELL;
      const x2 = x + CELL;
      const y2 = y + CELL;
      const o = (h >>> 3) % 4; // chamfer corner rotates → abstract, non-banded
      const fill = v >= 82 ? HIGHLIGHT : FIELD[(h >>> 5) % FIELD.length];

      cells.push(
        <g key={`${r}-${c}`}>
          <polygon points={body(o, x, y, x2, y2)} fill={fill} />
          <polygon
            points={notch((o + 2) % 4, x, y, x2, y2)}
            fill="#000"
            fillOpacity="0.32"
          />
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
