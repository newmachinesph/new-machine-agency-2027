import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "A short call to understand your business, your customers and what success looks like.",
  },
  {
    number: "02",
    title: "Design",
    text: "We design the experience around one job: turning your visitors into inquiries.",
  },
  {
    number: "03",
    title: "Build",
    text: "Fast, mobile-first and tested on real devices — built to be live in weeks, not months.",
  },
  {
    number: "04",
    title: "Grow",
    text: "Launch is the start. We measure, refine and keep the inquiries coming.",
  },
];

export default function Process() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          number="04"
          eyebrow="How we work"
          title="A process you can actually follow."
          lead="No mystery phases, no jargon-filled status reports. Four steps, each with a clear deliverable."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 90}>
              <div className="relative pt-8">
                <span aria-hidden="true" className="absolute top-0 h-px w-full bg-border" />
                <span
                  aria-hidden="true"
                  className="absolute -top-[3px] left-0 h-[7px] w-[7px] bg-accent"
                />
                <p className="text-sm font-bold text-accent-fg">{step.number}</p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
