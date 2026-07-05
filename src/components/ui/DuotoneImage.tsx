import Image from "next/image";

type DuotoneImageProps = {
  src: string;
  alt?: string;
  /** Sizing/aspect classes for the frame, e.g. "h-40" or "aspect-[4/3]". */
  className?: string;
  sizes?: string;
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
}: DuotoneImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover grayscale" />
      <div className="absolute inset-0 bg-accent-deep mix-blend-multiply" />
      <div className="absolute inset-0 bg-accent-deep/25" />
    </div>
  );
}
