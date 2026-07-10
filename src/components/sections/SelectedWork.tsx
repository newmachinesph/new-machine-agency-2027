import Link from "next/link";
import { caseStudies } from "@/lib/work";
import BrowserFrame from "@/components/ui/BrowserFrame";
import DuotoneImage from "@/components/ui/DuotoneImage";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Sparkline from "@/components/charts/Sparkline";
import { IconArrowRight } from "@/components/ui/icons";

/** Vertical offset per column — staggered editorial rhythm on the wide canvas. */
const OFFSET = ["", "lg:mt-16", "lg:mt-8"];

export default function SelectedWork() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="Selected work"
          title="Results first. Here's the proof."
          lead="Three representative engagements, each measured by what changed after launch. Every card opens into the full case study — the numbers charted month by month, before and after."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-3">
          {caseStudies.map((project, i) => (
            <Reveal key={project.slug} delay={i * 110} className={OFFSET[i] ?? ""}>
              <Link
                href={`/work/${project.slug}/`}
                className="group relative flex h-full flex-col"
              >
                {/* Device-frame mockup + overlapping metric badge */}
                <div className="relative">
                  <div className="chamfer panel beam overflow-hidden">
                    <BrowserFrame path={`/work/${project.slug}`} />
                    <DuotoneImage
                      src={`https://picsum.photos/seed/${project.slug}/960/600`}
                      className="aspect-[16/10] w-full"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>

                  {/* Bold metric badge, punching over the frame's lower edge */}
                  <div className="absolute -bottom-6 left-0 chamfer bg-accent px-4 py-3 text-accent-ink shadow-[6px_6px_0_rgba(0,0,0,0.28)]">
                    <p className="font-display text-3xl font-bold leading-none tracking-tight">
                      <CountUp value={project.metric} />
                    </p>
                    <p className="mt-1.5 max-w-[11rem] text-[11px] font-medium uppercase leading-snug tracking-[0.1em] text-accent-ink/70">
                      {project.metricLabel}
                    </p>
                  </div>

                  {/* Sparkline of the case's headline series, tucked bottom-right */}
                  <Sparkline
                    values={project.series.values}
                    launchIndex={project.series.launchIndex}
                    className="absolute bottom-3 right-3 h-8 w-24 opacity-90"
                  />
                </div>

                {/* Case detail */}
                <div className="mt-11 flex flex-1 flex-col px-1">
                  <span className="inline-flex w-fit border border-border px-2.5 py-0.5 text-[11px] uppercase tracking-[0.12em] text-muted">
                    {project.industry}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold transition-colors group-hover:text-accent-fg">
                    {project.client}
                  </h3>
                  <p className="measure mt-2 text-sm text-muted">{project.story}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-accent-fg">
                    Read the case study
                    <IconArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={340}>
          <Link
            href="/work/"
            className="mt-16 inline-flex items-center gap-2 text-sm text-accent-fg transition-opacity hover:opacity-80"
          >
            See all work, numbers included
            <IconArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
