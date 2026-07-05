import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const facts = [
  { value: "75%", text: "of people judge a company’s credibility by its website design alone." },
  { value: "0.05s", text: "is how long it takes a visitor to form a first impression of your site." },
  { value: "88%", text: "of visitors won’t return after a bad website experience." },
  { value: "53%", text: "abandon a mobile site that takes longer than 3 seconds to load." },
];

export default function WhyItMatters() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="wrap grid gap-14 md:grid-cols-[1fr_1.2fr]">
        <SectionHeading
          number="03"
          eyebrow="Why it matters"
          title="Your website is your hardest-working employee."
          lead="It never sleeps, never takes leave — and most businesses still treat it as an afterthought. The numbers say otherwise."
        />

        <div className="divide-y divide-border">
          {facts.map((fact, i) => (
            <Reveal key={fact.value} delay={i * 90}>
              <div className="flex items-baseline gap-6 py-6">
                <p className="w-32 shrink-0 text-4xl font-extrabold text-accent-fg md:text-5xl">
                  {fact.value}
                </p>
                <p className="text-muted">{fact.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
