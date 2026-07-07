export type DumbbellItem = {
  label: string;
  before: number;
  after: number;
  /** Display strings — units live here ("$84", "0:47"), numbers drive the scale. */
  beforeLabel: string;
  afterLabel: string;
  /** Signed improvement, e.g. "+214%" or "−68%". */
  delta: string;
};

/** Clamp a track position so the square + its label never leave the row. */
const pos = (v: number, max: number) => `clamp(1.25rem, ${(v / max) * 100}%, calc(100% - 1.25rem))`;

/**
 * Before → after dumbbell rows: one hue in two shades — "before" in the
 * de-emphasis gray, "after" in the data hue — joined by a 2px connector.
 * Every value is directly labeled (before under, after above, so labels can
 * never collide), and the delta rides the row's right edge as a chip.
 * Each row carries its own unit, so each scales independently to its own max.
 */
export default function Dumbbell({ items, className = "" }: { items: DumbbellItem[]; className?: string }) {
  return (
    <dl className={`flex flex-col gap-7 ${className}`.trim()}>
      {items.map((item) => {
        const max = Math.max(item.before, item.after) * 1.05;
        const from = Math.min(item.before, item.after);
        const to = Math.max(item.before, item.after);
        return (
          <div key={item.label}>
            <dt className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-fg">{item.label}</span>
              <span className="bg-accent/12 px-2 py-0.5 text-xs font-semibold text-accent-fg">
                {item.delta}
              </span>
            </dt>
            <dd className="mt-4 mb-1">
              <div className="relative h-2" aria-hidden="true">
                {/* Track */}
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
                {/* Connector */}
                <span
                  className="absolute top-1/2 h-0.5 -translate-y-1/2"
                  style={{
                    left: pos(from, max),
                    width: `calc(${((to - from) / max) * 100}% )`,
                    background: "var(--chart-dim)",
                    opacity: 0.55,
                  }}
                />
                {/* Before (de-emphasis) */}
                <span
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: pos(item.before, max),
                    background: "var(--chart-dim)",
                    boxShadow: "0 0 0 2px var(--card)",
                  }}
                />
                <span
                  className="absolute top-4 -translate-x-1/2 text-xs text-muted"
                  style={{ left: pos(item.before, max), fontVariantNumeric: "tabular-nums" }}
                >
                  {item.beforeLabel}
                </span>
                {/* After (data hue) */}
                <span
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: pos(item.after, max),
                    background: "var(--chart-data)",
                    boxShadow: "0 0 0 2px var(--card)",
                  }}
                />
                <span
                  className="absolute -top-5 -translate-x-1/2 text-xs font-semibold text-fg"
                  style={{ left: pos(item.after, max), fontVariantNumeric: "tabular-nums" }}
                >
                  {item.afterLabel}
                </span>
              </div>
              <span className="sr-only">
                Before: {item.beforeLabel}. After: {item.afterLabel}. Change: {item.delta}.
              </span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
