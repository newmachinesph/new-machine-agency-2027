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
    text: "Fast, mobile-first and tested on real devices, built to be live in weeks, not months.",
  },
  {
    number: "04",
    title: "Grow",
    text: "Launch is the start. We measure, refine and keep the inquiries coming.",
  },
];

export default function Process() {
  return (
    <section className="bg-surface py-16 md:py-24 lg:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="How we work"
          title="A process you can actually follow."
          lead="No mystery phases, no jargon-filled status reports. Four steps, each with a clear deliverable."
        />

        <div className="mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 90}>
              <div>
                <span aria-hidden="true" className="block h-0.5 w-10 bg-accent" />
                <h3 className="mt-5 flex items-baseline gap-3 font-display text-xl font-bold md:text-2xl">
                  <span className="font-display text-2xl font-bold tabular-nums text-accent-fg md:text-3xl">
                    {step.number}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-3 text-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
