import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PatternSignal from "@/components/ui/PatternSignal";

const facts = [
  { value: "75%", text: "of people judge a company’s credibility by its website design alone." },
  { value: "0.05s", text: "is how long it takes a visitor to form a first impression of your site." },
  { value: "88%", text: "of visitors won’t return after a bad website experience." },
  { value: "53%", text: "abandon a mobile site that takes longer than 3 seconds to load." },
];

export default function WhyItMatters() {
  return (
    <section className="relative overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
      <PatternSignal className="pointer-events-none absolute -right-24 top-1/2 hidden w-72 -translate-y-1/2 opacity-[0.06] lg:block" />

      <div className="wrap relative grid gap-14 md:grid-cols-[1fr_1.2fr]">
        <SectionHeading
          eyebrow="Why it matters"
          title="Your website is your hardest-working employee."
          lead="It never sleeps, never takes leave — and most businesses still treat it as an afterthought. The numbers say otherwise."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {facts.map((fact, i) => (
            <Reveal key={fact.value} delay={i * 90}>
              <div className="beam panel chamfer flex h-full flex-col gap-3 p-7">
                <p className="font-display text-4xl font-extrabold text-accent-fg md:text-5xl">
                  <CountUp value={fact.value} />
                </p>
                <p className="text-sm text-muted md:text-base">{fact.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
