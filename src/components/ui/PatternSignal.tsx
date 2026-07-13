type PatternSignalProps = {
  className?: string;
};

// Central negative-space cross + chamfered block corners.
const CX1 = 185;
const CX2 = 215;
const CY1 = 240;
const CY2 = 280;
const CH = 40;

/**
 * Bold chamfered-block mark, traced as vectors from the client's green
 * key-art: four blocks framing a negative-space cross, with thin diagonal
 * hairlines. Decorative; parent sets size + opacity. Pure SVG, no client JS.
 */
export default function PatternSignal({ className = "" }: PatternSignalProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 400 520"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
    >
      {/* thin diagonal hairlines */}
      <g stroke="var(--accent)" strokeWidth="1.25" fill="none" opacity="0.5">
        <path d="M-20 150 L200 -70" />
        <path d="M420 150 L200 -70" />
        <path d="M-20 370 L200 590" />
        <path d="M420 370 L200 590" />
      </g>
      {/* TL: deep */}
      <polygon
        points={`0,0 ${CX1},0 ${CX1},${CY1 - CH} ${CX1 - CH},${CY1} 0,${CY1}`}
        fill="var(--accent-deep)"
      />
      {/* TR: bright */}
      <polygon
        points={`${CX2},0 400,0 400,${CY1} ${CX2 + CH},${CY1} ${CX2},${CY1 - CH}`}
        fill="var(--accent)"
      />
      {/* BL: strong */}
      <polygon
        points={`0,${CY2} ${CX1 - CH},${CY2} ${CX1},${CY2 + CH} ${CX1},520 0,520`}
        fill="var(--accent-strong)"
      />
      {/* BR: deep */}
      <polygon
        points={`${CX2},${CY2 + CH} ${CX2 + CH},${CY2} 400,${CY2} 400,520 ${CX2},520`}
        fill="var(--accent-deep)"
      />
    </svg>
  );
}
