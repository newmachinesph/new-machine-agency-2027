import type { ReactNode } from "react";

type PatternMosaicProps = {
  rows?: number;
  className?: string;
};

const CELL = 40;
const SAGE = "var(--accent)";
const DEEP = "var(--accent-deep)";

/**
 * Triangle/square quilt strip traced from the client's reference image.
 * Deterministic 24-cell sequence — mostly sage half-square triangles in
 * alternating orientations (pinwheel read), occasional solid squares, gaps.
 * Codes: S solid sage · D solid deep · . gap ·
 * a/b/c/d sage triangles (◤◥◢◣) · w/x/y/z deep triangles (◤◥◢◣).
 */
const ROW = [
  "a", "c", "S", "b", "d", ".", "w", "a",
  "c", "D", "b", "d", "a", ".", "y", "S",
  "b", "d", "a", "D", "c", ".", "x", "b",
];

function cell(code: string, x: number, y: number, key: string): ReactNode {
  const x2 = x + CELL;
  const y2 = y + CELL;
  const tri = (points: string, fill: string) => <polygon key={key} points={points} fill={fill} />;
  switch (code) {
    case "S":
      return <rect key={key} x={x} y={y} width={CELL} height={CELL} fill={SAGE} />;
    case "D":
      return <rect key={key} x={x} y={y} width={CELL} height={CELL} fill={DEEP} />;
    case "a":
      return tri(`${x},${y} ${x2},${y} ${x},${y2}`, SAGE);
    case "b":
      return tri(`${x},${y} ${x2},${y} ${x2},${y2}`, SAGE);
    case "c":
      return tri(`${x2},${y} ${x2},${y2} ${x},${y2}`, SAGE);
    case "d":
      return tri(`${x},${y} ${x2},${y2} ${x},${y2}`, SAGE);
    case "w":
      return tri(`${x},${y} ${x2},${y} ${x},${y2}`, DEEP);
    case "x":
      return tri(`${x},${y} ${x2},${y} ${x2},${y2}`, DEEP);
    case "y":
      return tri(`${x2},${y} ${x2},${y2} ${x},${y2}`, DEEP);
    case "z":
      return tri(`${x},${y} ${x2},${y2} ${x},${y2}`, DEEP);
    default:
      return null;
  }
}

export default function PatternMosaic({ rows = 2, className = "" }: PatternMosaicProps) {
  const rowCodes = Array.from({ length: rows }, (_, r) =>
    r % 2 === 0 ? ROW : [...ROW].reverse(),
  );

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox={`0 0 ${ROW.length * CELL} ${rows * CELL}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      width="100%"
    >
      {rowCodes.map((codes, r) =>
        codes.map((code, c) => cell(code, c * CELL, r * CELL, `${r}-${c}`)),
      )}
    </svg>
  );
}
