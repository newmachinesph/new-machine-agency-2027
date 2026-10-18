/** Brand tick — a half-square triangle echoing the NM logo's mosaic tiles
 *  (the ◤ from `polygon 0,0 40,0 0,40`). Replaces the generic accent square
 *  as the marker beside eyebrows and section titles. */
export default function AccentTick({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 shrink-0 bg-accent [clip-path:polygon(0_0,100%_0,0_100%)] ${className}`.trim()}
    />
  );
}
