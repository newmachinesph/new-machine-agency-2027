import { site } from "@/config/site";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import PatternGrid from "@/components/ui/PatternGrid";

export default function StatsBar() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="relative overflow-hidden border-b border-border"
    >
      <PatternGrid
        rows={2}
        cols={14}
        seed={1}
        className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full opacity-[0.14]"
      />

      <div className="wrap relative py-16 md:py-20">
        <Reveal>
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Standing commitments
            </span>
          </div>
          <h2
            id="proof-heading"
            className="mt-3 max-w-2xl font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl md:text-4xl"
          >
            What you can count on from day one.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {site.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70} className="h-full">
              <div className="panel beam chamfer relative h-full p-6 md:p-7">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[3px] bg-accent/70"
                />
                <p className="font-display text-4xl font-extrabold tracking-[-0.03em] text-accent-fg sm:text-5xl md:text-6xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-3 text-sm text-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
