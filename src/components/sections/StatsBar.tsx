import { site } from "@/config/site";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";

export default function StatsBar() {
  return (
    <section aria-label="Key numbers" className="border-b border-border">
      <div className="wrap grid grid-cols-2 gap-4 py-12 md:py-16 lg:grid-cols-4">
        {site.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 70} className="h-full">
            <GlassCard className="h-full">
              <p className="font-display text-2xl font-bold text-accent-fg md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted">{stat.label}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
