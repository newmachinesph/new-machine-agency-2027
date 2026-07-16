import Image from "next/image";

type DuotoneImageProps = {
  src: string;
  alt?: string;
  /** Sizing/aspect classes for the frame, e.g. "h-40" or "aspect-[4/3]". */
  className?: string;
  sizes?: string;
  /** Set on the single above-the-fold hero image per page to improve LCP. */
  priority?: boolean;
};

/**
 * Brand image treatment: grayscale photo → deep-green multiply → green wash.
 * Same recipe as the footer band, so every photo on the site reads as one system.
 */
export default function DuotoneImage({
  src,
  alt = "",
  className = "",
  sizes = "100vw",
  priority = false,
}: DuotoneImageProps) {
  // ponytail: only add the default `relative` when the caller hasn't set its
  // own position. Otherwise Tailwind's `.relative` beats a caller `absolute`
  // (stylesheet order, not class order), collapsing an `absolute inset-0` fill
  // to height 0. Upgrade path: drop if we adopt a positionless image wrapper.
  const hasPosition = /(^|\s)(absolute|fixed|relative|sticky)(\s|$)/.test(className);
  return (
    <div className={`${hasPosition ? "" : "relative"} overflow-hidden ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover grayscale"
      />
      <div className="absolute inset-0 bg-accent-deep mix-blend-multiply" />
      <div className="absolute inset-0 bg-accent-deep/25" />
    </div>
  );
}
