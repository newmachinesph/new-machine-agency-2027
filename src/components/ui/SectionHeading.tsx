import Reveal from "@/components/ui/Reveal";
import AccentTick from "@/components/ui/AccentTick";

type SectionHeadingProps = {
  /** Kept for call-site compatibility; hallmark default-OFF — not rendered.
   *  ponytail: eyebrows removed at the source so no per-section edits needed. */
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  title,
  lead,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : ""}>
      <Reveal className="flex items-center gap-2.5">
        <AccentTick className={`mt-2 self-start ${centered ? "hidden" : ""}`} />
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={80}>
          <p className={`mt-4 max-w-xl text-muted ${centered ? "mx-auto" : ""}`}>{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
