type LandmarkSilhouetteProps = {
  name: string;
  className?: string;
};

/**
 * Simple, recognizable national-landmark silhouettes for the office cards.
 * Decorative only; parent sets size, color (currentColor) and opacity.
 */
const PATHS: Record<string, string> = {
  // Golden Gate Bridge tower — twin columns with two cross-braces (United States).
  goldengate:
    "M32 16 H42 V200 H32 Z M58 16 H68 V200 H58 Z M32 46 H68 V58 H32 Z M32 106 H68 V118 H32 Z",
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
