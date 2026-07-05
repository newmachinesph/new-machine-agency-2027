import Link from "next/link";
import work from "@/content/work.json";
import DuotoneImage from "@/components/ui/DuotoneImage";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconArrowRight } from "@/components/ui/icons";

export default function SelectedWork() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          number="02"
          eyebrow="Selected work"
          title="Results our clients can count."
          lead="A few recent projects — what the problem was, and what changed after launch."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {work.map((project, i) => (
            <Reveal key={project.slug} delay={i * 100} className={i === 1 ? "md:mt-10" : ""}>
              <div className="panel beam h-full overflow-hidden">
                <DuotoneImage
                  src={`https://picsum.photos/seed/${project.slug}/800/520`}
                  className="h-44 w-full"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="p-6">
                  <span className="inline-block border border-border px-2.5 py-0.5 text-xs uppercase tracking-[0.12em] text-muted">
                    {project.industry}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{project.client}</h3>
                  <p className="mt-2 text-sm text-muted">{project.story}</p>
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="font-display text-3xl font-bold text-accent-fg">
                      <CountUp value={project.metric} />
                    </p>
                    <p className="mt-1 text-xs text-muted">{project.metricLabel}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.15em] text-muted">
                      {project.service}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320}>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 text-sm text-accent-fg transition-opacity hover:opacity-80"
          >
            Want results like this? Let’s talk
            <IconArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
