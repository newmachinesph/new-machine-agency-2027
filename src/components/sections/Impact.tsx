import Link from "next/link";
import { caseStudies } from "@/lib/work";
import TrendChart from "@/components/charts/TrendChart";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconArrowRight } from "@/components/ui/icons";

/** Medians across the sample engagements in work.json — recompute if those change. */
const tiles = [
  { value: "5.3×", label: "Median lift in the metric each engagement was hired to move" },
  { value: "8wk", label: "Median time from kickoff to launch" },
  { value: "100%", label: "Engagements on a fixed quote — zero hourly billing" },
];

export default function Impact() {
  const flagship = caseStudies[0];

  return (
    <section className="bg-surface py-16 md:py-24 lg:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Measured outcomes"
            title="Growth you can audit, not just admire."
            lead="Every engagement starts with a measurement plan and ships with a live results dashboard. This is the reporting standard — charted, honest, and yours to keep."
          />

          <div className="mt-10">
            {tiles.map((tile, i) => (
              <Reveal key={tile.label} delay={i * 90}>
                <div className="flex items-baseline gap-5 border-t border-border py-5">
                  <p className="w-24 shrink-0 font-display text-4xl font-extrabold tracking-[-0.03em] text-accent-fg">
                    <CountUp value={tile.value} />
                  </p>
                  <p className="text-sm text-muted">{tile.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280}>
            <Link
              href="/work/"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-80"
            >
              Explore the case studies
              <IconArrowRight size={15} />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={120} className="h-full">
          <div className="panel chamfer flex h-full flex-col justify-between p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h3 className="text-sm font-semibold text-fg">
                {flagship.client} — {flagship.series.label.toLowerCase()}
              </h3>
              <span className="bg-accent/12 px-2 py-0.5 text-xs font-semibold text-accent-fg">
                {flagship.metric} in 90 days
              </span>
            </div>
            <TrendChart
              label={flagship.series.label}
              months={flagship.series.months}
              values={flagship.series.values}
              launchIndex={flagship.series.launchIndex}
              unit={flagship.series.unit}
              className="mt-6"
            />
            <p className="mt-4 text-xs text-muted">
              Representative sample data ·{" "}
              <Link
                href={`/work/${flagship.slug}/`}
                className="text-accent-fg underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                read the full case study
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
