type LandmarkSilhouetteProps = {
  name: string;
  className?: string;
};

/**
 * Simple, recognizable national-landmark silhouettes for the office cards.
 * Decorative only; parent sets size, color (currentColor) and opacity.
 */
const PATHS: Record<string, string> = {
  // Burj Khalifa — stepped, tapering tower into a spire (UAE).
  burj: "M50 6 L52 30 L57 30 L60 66 L67 66 L70 112 L79 112 L82 200 L18 200 L21 112 L30 112 L33 66 L40 66 L43 30 L48 30 Z",
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
