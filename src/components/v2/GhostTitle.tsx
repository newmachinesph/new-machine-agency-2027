import type { ReactNode } from "react";

/** V2 section heading: huge low-contrast ghost display line. */
export default function GhostTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`v2-ghost text-[clamp(2.5rem,6vw,5.5rem)] ${className}`.trim()}>
      {children}
    </h2>
  );
}
