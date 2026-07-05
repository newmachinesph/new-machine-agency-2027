import Link from "next/link";
import work from "@/content/work.json";
import { site } from "@/config/site";
import DuotoneImage from "@/components/ui/DuotoneImage";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconArrowRight } from "@/components/ui/icons";

/** Vertical offset per column — staggered editorial rhythm on the wide canvas. */
const OFFSET = ["", "lg:mt-16", "lg:mt-8"];

export default function SelectedWork() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          number="02"
          eyebrow="Selected work"
          title="Work that competes with anyone, anywhere."
          lead="Remote-first, full-lifecycle projects for founders across every timezone — a few representative builds, measured by what changed after launch, not the size of the deliverable."
        />

        <div className="mt-16 grid gap-x-8 gap-y-20 md:grid-cols-3">
          {work.map((project, i) => (
            <Reveal key={project.slug} delay={i * 110} className={OFFSET[i] ?? ""}>
              <article className="group relative flex h-full flex-col">
                {/* Device-frame mockup + overlapping metric badge */}
                <div className="relative">
                  <div className="chamfer panel beam overflow-hidden">
                    {/* Browser chrome */}
                    <div
                      aria-hidden="true"
                      className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3"
                    >
                      <span className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 bg-accent/70" />
                        <span className="h-2.5 w-2.5 bg-muted/40" />
                        <span className="h-2.5 w-2.5 bg-muted/25" />
                      </span>
                      <span className="ml-2 flex-1 truncate bg-card px-3 py-1 text-[10px] tracking-[0.14em] text-muted">
                        {site.domain}/work/{project.slug}
                      </span>
                    </div>
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
                </div>

                {/* Case detail */}
                <div className="mt-11 flex flex-1 flex-col px-1">
                  <span className="inline-flex w-fit border border-border px-2.5 py-0.5 text-[11px] uppercase tracking-[0.12em] text-muted">
                    {project.industry}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{project.client}</h3>
                  <p className="measure mt-2 text-sm text-muted">{project.story}</p>
                  <p className="mt-6 text-xs uppercase tracking-[0.15em] text-accent-fg">
                    {project.service}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={340}>
          <Link
            href="/contact"
            className="mt-16 inline-flex items-center gap-2 text-sm text-accent-fg transition-opacity hover:opacity-80"
          >
            Have work worth doing right? Let’s talk
            <IconArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
