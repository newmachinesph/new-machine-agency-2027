type SparklineProps = {
  values: readonly number[];
  /** Index of the first post-launch point — pre reads dim, post reads accent. */
  launchIndex: number;
  className?: string;
};

/**
 * Decorative 12-point sparkline for work cards: pre-launch months in the
 * de-emphasis hue, post-launch in the data hue, with a hairline launch tick.
 * Purely decorative (aria-hidden) — the linked case study carries the numbers.
 */
export default function Sparkline({ values, launchIndex, className = "" }: SparklineProps) {
  const W = 120;
  const H = 36;
  const pad = 3;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const n = values.length;

  const x = (i: number) => pad + (i / (n - 1)) * (W - pad * 2);
  const y = (v: number) => pad + (1 - (v - min) / span) * (H - pad * 2);

  const pre = values
    .slice(0, launchIndex)
    .map((v, i) => `${x(i)},${y(v)}`)
    .join(" ");
  const post = values
    .slice(launchIndex - 1)
    .map((v, i) => `${x(launchIndex - 1 + i)},${y(v)}`)
    .join(" ");
  const xLaunch = (x(launchIndex - 1) + x(launchIndex)) / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block ${className}`.trim()}
    >
      <line
        x1={xLaunch}
        x2={xLaunch}
        y1={0}
        y2={H}
        stroke="var(--line)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <polyline
        points={pre}
        fill="none"
        stroke="var(--chart-dim)"
        strokeWidth="2"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
      <polyline
        points={post}
        fill="none"
        stroke="var(--chart-data)"
        strokeWidth="2"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
