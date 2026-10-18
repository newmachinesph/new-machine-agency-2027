"use client";

import { useEffect, useRef, useState } from "react";

type TrendChartProps = {
  /** Chart title, also used for the accessible summary + data table caption. */
  label: string;
  months: readonly string[];
  values: readonly number[];
  /** Index of the first post-launch month; the launch rule sits just before it. */
  launchIndex: number;
  /** Singular-ish unit for the tooltip, e.g. "inquiries" or "%". */
  unit: string;
  className?: string;
};

/** Snap the y-axis ceiling to a clean 1/2/5×10ⁿ step so ticks read as round numbers. */
function niceScale(max: number): { top: number; ticks: number[] } {
  const rawStep = max / 4;
  const pow = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const step = [1, 2, 5, 10].map((s) => s * pow).find((s) => s >= rawStep) ?? 10 * pow;
  const top = Math.ceil(max / step) * step;
  const ticks = [];
  for (let t = 0; t <= top; t += step) ticks.push(t);
  return { top, ticks };
}

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Brand trend chart: single series, pre-launch months in the de-emphasis hue,
 * post-launch in the data hue with a 10% area wash, a hairline launch rule and
 * a direct label on the endpoint. Hover/touch gets a crosshair + tooltip; a
 * visually hidden table carries the exact numbers for screen readers.
 *
 * The viewBox is resized to the container's real pixel width, so text inside
 * the SVG always renders 1:1, no shrunken axis labels on mobile.
 */
export default function TrendChart({
  label,
  months,
  values,
  launchIndex,
  unit,
  className = "",
}: TrendChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setWidth(w);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const height = Math.round(Math.min(300, Math.max(210, width * 0.42)));
  const m = { top: 30, right: 20, bottom: 26, left: 46 };
  const innerW = width - m.left - m.right;
  const innerH = height - m.top - m.bottom;
  const n = values.length;
  const { top, ticks } = niceScale(Math.max(...values));

  const x = (i: number) => m.left + (i / (n - 1)) * innerW;
  const y = (v: number) => m.top + innerH - (v / top) * innerH;

  const pre = values.slice(0, launchIndex);
  const prePoints = pre.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  // Post segment starts at the last pre-launch point so the line stays continuous.
  const postPoints = values
    .slice(launchIndex - 1)
    .map((v, i) => `${x(launchIndex - 1 + i)},${y(v)}`)
    .join(" ");
  const areaPath = `M ${postPoints.split(" ").join(" L ")} L ${x(n - 1)},${y(0)} L ${x(
    launchIndex - 1,
  )},${y(0)} Z`;

  const xLaunch = (x(launchIndex - 1) + x(launchIndex)) / 2;
  const labelStride = width > 560 ? 1 : width > 380 ? 2 : 3;
  const last = n - 1;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const i = Math.round(((px - m.left) / innerW) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  const tooltipLeft =
    hover === null ? 0 : Math.max(3.5, Math.min(96.5, (x(hover) / width) * 100));

  return (
    <div ref={wrapRef} className={`relative ${className}`.trim()}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        role="img"
        aria-label={`${label}: ${fmt(values[0])} in ${months[0]}, ${fmt(
          values[last],
        )} in ${months[last]}. Launch after ${months[launchIndex - 1]}.`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        className="block touch-none select-none"
      >
        {/* Gridlines + y ticks (hairline, recessive) */}
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={m.left}
              x2={width - m.right}
              y1={y(t)}
              y2={y(t)}
              stroke="var(--line)"
              strokeWidth="1"
              shapeRendering="crispEdges"
            />
            <text
              x={m.left - 8}
              y={y(t) + 3.5}
              textAnchor="end"
              fontSize="11"
              fill="var(--muted)"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {fmt(t)}
            </text>
          </g>
        ))}

        {/* Month labels */}
        {months.map((month, i) =>
          i % labelStride === 0 ? (
            <text
              key={month + i}
              x={x(i)}
              y={height - 8}
              textAnchor="middle"
              fontSize="11"
              fill="var(--muted)"
            >
              {month}
            </text>
          ) : null,
        )}

        {/* Launch rule + flag */}
        <line
          x1={xLaunch}
          x2={xLaunch}
          y1={m.top - 6}
          y2={height - m.bottom}
          stroke="var(--muted)"
          strokeWidth="1"
          opacity="0.55"
          shapeRendering="crispEdges"
        />
        <text
          x={xLaunch + 6}
          y={m.top + 2}
          fontSize="10"
          fill="var(--muted)"
          style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          Launch
        </text>

        {/* Post-launch area wash (10%) */}
        <path d={areaPath} fill="var(--chart-data)" opacity="0.1" />

        {/* Pre-launch line (de-emphasis) */}
        <polyline
          points={prePoints}
          fill="none"
          stroke="var(--chart-dim)"
          strokeWidth="2"
          strokeLinecap="square"
        />
        {/* Post-launch line (data hue) */}
        <polyline
          points={postPoints}
          fill="none"
          stroke="var(--chart-data)"
          strokeWidth="2"
          strokeLinecap="square"
        />

        {/* Endpoint marker (square, surface ring) + direct label */}
        <rect
          x={x(last) - 4}
          y={y(values[last]) - 4}
          width="8"
          height="8"
          fill="var(--chart-data)"
          stroke="var(--card)"
          strokeWidth="2"
        />
        <text
          x={x(last) - 2}
          y={y(values[last]) - 10}
          textAnchor="end"
          fontSize="12"
          fontWeight="600"
          fill="var(--fg)"
        >
          {fmt(values[last])}
        </text>

        {/* Hover crosshair + marker */}
        {hover !== null ? (
          <g aria-hidden="true">
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={m.top}
              y2={height - m.bottom}
              stroke="var(--muted)"
              strokeWidth="1"
              opacity="0.4"
              shapeRendering="crispEdges"
            />
            <rect
              x={x(hover) - 4}
              y={y(values[hover]) - 4}
              width="8"
              height="8"
              fill={hover < launchIndex ? "var(--chart-dim)" : "var(--chart-data)"}
              stroke="var(--card)"
              strokeWidth="2"
            />
          </g>
        ) : null}
      </svg>

      {/* Tooltip */}
      {hover !== null ? (
        <div
          aria-hidden="true"
          className="glass chamfer pointer-events-none absolute top-1 z-10 -translate-x-1/2 px-3 py-1.5 text-xs whitespace-nowrap"
          style={{ left: `${tooltipLeft}%` }}
        >
          <span className="text-muted">{months[hover]} · </span>
          <span className="font-semibold text-fg" style={{ fontVariantNumeric: "tabular-nums" }}>
            {fmt(values[hover])}
          </span>
          <span className="text-muted"> {unit}</span>
          {hover === launchIndex ? <span className="text-accent-fg"> · launch month</span> : null}
        </div>
      ) : null}

      {/* Exact numbers for screen readers */}
      <table className="sr-only">
        <caption>{label}</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">{unit}</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month, i) => (
            <tr key={month + i}>
              <th scope="row">
                {month}
                {i === launchIndex ? " (launch)" : ""}
              </th>
              <td>{fmt(values[i])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
