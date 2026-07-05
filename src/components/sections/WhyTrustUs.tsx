import { IconPricing, IconChat, IconGrowth, IconSpeed } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PatternGrid from "@/components/ui/PatternGrid";

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
    <section className="relative overflow-hidden py-24 md:py-32">
      <PatternGrid
        cols={2}
        rows={3}
        className="pointer-events-none absolute -right-10 top-0 h-64 w-64 opacity-[0.12] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]"
      />
      <div className="wrap relative">
        <SectionHeading
          number="07"
          eyebrow="Why trust us"
          title="The best teams don’t settle for average. Neither do we."
          lead="No agency theater, no fabricated case studies — just the honest reasons startups choose to build with us."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="panel beam chamfer relative flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center chamfer bg-accent text-accent-ink">
                    <item.icon size={22} />
                  </span>
                  <span className="font-display text-sm font-semibold text-accent-fg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
