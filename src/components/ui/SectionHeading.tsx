import Reveal from "@/components/ui/Reveal";

type SectionHeadingProps = {
  number?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  number,
  eyebrow,
  title,
  lead,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : ""}>
      <Reveal
        className={`flex items-center gap-2.5 ${centered ? "justify-center" : ""}`}
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {number ? `${number} · ${eyebrow}` : eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      </Reveal>
      {lead ? (
        <Reveal delay={160}>
          <p className={`mt-4 max-w-xl text-muted ${centered ? "mx-auto" : ""}`}>{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
