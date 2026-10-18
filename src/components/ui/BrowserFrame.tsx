import { site } from "@/config/site";

type BrowserFrameProps = {
  /** Address-bar path, appended to the display domain (e.g. "/work/acme"). */
  path: string;
  className?: string;
};

/**
 * Decorative browser chrome: three chamfered traffic-light squares and a
 * truncating address bar. Sits above the screenshot in the work and product
 * device-frame mockups.
 */
export default function BrowserFrame({ path, className = "" }: BrowserFrameProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5 ${className}`.trim()}
    >
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 bg-accent/70" />
        <span className="h-2.5 w-2.5 bg-muted/40" />
        <span className="h-2.5 w-2.5 bg-muted/25" />
      </span>
      <span className="ml-2 min-w-0 flex-1 truncate bg-card px-3 py-1 text-[10px] tracking-[0.14em] text-muted">
        {site.domain}
        {path}
      </span>
    </div>
  );
}
