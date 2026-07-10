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
    <section className="bg-surface py-16 md:py-24 lg:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="How we work"
          title="A process you can actually follow."
          lead="No mystery phases, no jargon-filled status reports. Four steps, each with a clear deliverable."
        />

        <div className="relative mt-16">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-7 hidden h-px bg-border md:block"
          />

          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 90}>
                <div className="relative">
                  <span className="chamfer relative z-10 grid h-14 w-14 place-items-center bg-accent font-display text-lg font-bold text-accent-ink">
                    {step.number}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold md:text-2xl">{step.title}</h3>
                  <p className="mt-3 text-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
