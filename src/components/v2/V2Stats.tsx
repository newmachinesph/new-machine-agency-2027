import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

const STATS = [
  { value: "5.3×", label: "Median lift in the metric each engagement was hired to move" },
  { value: "8wk", label: "Median time from kickoff to launch" },
  { value: "100%", label: "Engagements on a fixed quote — zero hourly billing" },
];

/** 004 · Numbers — three giant figures on the dark canvas. */
export default function V2Stats() {
  return (
    <section className="relative border-y border-border py-20 md:py-28">
      <div className="wrap">
        <p className="v2-counter uppercase">004 · Numbers</p>
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 90}>
              <p className="font-display text-[clamp(3.5rem,7vw,6.5rem)] font-semibold leading-none text-accent-fg">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-4 max-w-[30ch] text-sm text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
