import Reveal from "@/components/ui/Reveal";

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
        <span aria-hidden="true" className={`h-1.5 w-1.5 bg-accent ${centered ? "hidden" : ""}`} />
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
