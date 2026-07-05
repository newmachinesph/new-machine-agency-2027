import { IconPricing, IconChat, IconGrowth, IconSpeed } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const differentiators = [
  {
    icon: IconSpeed,
    title: "Fast delivery",
    text: "Weeks, not quarters — without cutting corners.",
  },
  {
    icon: IconPricing,
    title: "Transparent pricing",
    text: "One fixed quote before we start. It doesn’t move.",
  },
  {
    icon: IconChat,
    title: "Direct communication",
    text: "You talk to the people doing the work, not an account layer.",
  },
  {
    icon: IconGrowth,
    title: "Results-focused",
    text: "We report in inquiries and revenue, not impressions.",
  },
];

export default function WhyTrustUs() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          number="05"
          eyebrow="Why trust us"
          title="Big-agency output. Small-team honesty."
          lead="Everything you actually want from an agency — none of the overhead."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="panel h-full p-6">
                <span className="grid h-10 w-10 place-items-center border border-border">
                  <item.icon size={20} className="text-accent-fg" />
                </span>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
