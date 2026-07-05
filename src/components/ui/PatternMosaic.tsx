import type { ReactNode } from "react";

type PatternMosaicProps = {
  rows?: number;
  cols?: number;
  className?: string;
};

const CELL = 40;
const SAGE = "var(--accent)";
const DEEP = "var(--accent-deep)";

/**
 * Deterministic spatial hash — gives each cell a stable, varied value from its
 * coordinates. Same result on server and client (no Math.random), so no
 * hydration mismatch, and the strip never repeats an identical block.
 */
function hash(x: number, y: number): number {
  let h = (x * 73856093) ^ (y * 19349663);
  h ^= h >>> 13;
  return h >>> 0;
}

function cell(x: number, y: number, cx: number, cy: number): ReactNode {
  const h = hash(cx, cy);
  const r = h % 100;
  const key = `${cx}-${cy}`;

  // Rare, scattered gaps (never clustered — each cell decides independently).
  if (r < 8) return null;

  const fill = (h >>> 5) % 3 === 0 ? DEEP : SAGE; // ~1/3 deep, ~2/3 sage
  const x2 = x + CELL;
  const y2 = y + CELL;

  // Occasional solid squares for weight.
  if (r >= 92) {
    return <rect key={key} x={x} y={y} width={CELL} height={CELL} fill={fill} />;
  }

  // Triangle orientation varies with position → organic pinwheel read.
  const o = (cx + cy + (h >>> 3)) % 4;
  const pts =
    o === 0
      ? `${x},${y} ${x2},${y} ${x},${y2}` // ◤
      : o === 1
        ? `${x},${y} ${x2},${y} ${x2},${y2}` // ◥
        : o === 2
          ? `${x2},${y} ${x2},${y2} ${x},${y2}` // ◢
          : `${x},${y} ${x2},${y2} ${x},${y2}`; // ◣
  return <polygon key={key} points={pts} fill={fill} />;
}

/**
 * Chamfer/triangle quilt strip traced from the client's reference. Cells are
 * generated from a spatial hash so the run is varied and non-repeating across
 * the full width — no identical blocks, no obvious seam. Decorative only.
 */
export default function PatternMosaic({
  rows = 2,
  cols = 40,
  className = "",
}: PatternMosaicProps) {
  const cells: ReactNode[] = [];
  for (let cy = 0; cy < rows; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      cells.push(cell(cx * CELL, cy * CELL, cx, cy));
    }
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox={`0 0 ${cols * CELL} ${rows * CELL}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      width="100%"
    >
      {cells}
    </svg>
  );
}
