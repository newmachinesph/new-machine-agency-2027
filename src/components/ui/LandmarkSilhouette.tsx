type LandmarkSilhouetteProps = {
  name: string;
  className?: string;
};

/**
 * Simple, recognizable national-landmark silhouettes for the office cards.
 * Decorative only; parent sets size, color (currentColor) and opacity.
 */
const PATHS: Record<string, string> = {
  // Washington Monument — tall tapering obelisk with a pyramidion (United States).
  washington: "M50 12 L56 44 L60 200 L40 200 L44 44 Z",
  // Mayon Volcano — symmetric cone with a small crater (Philippines).
  mayon: "M44 40 Q50 31 56 40 L96 200 L4 200 Z",
};

export default function LandmarkSilhouette({ name, className = "" }: LandmarkSilhouetteProps) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 200"
      fill="currentColor"
      preserveAspectRatio="xMidYMax meet"
    >
      <path d={d} />
    </svg>
  );
}
