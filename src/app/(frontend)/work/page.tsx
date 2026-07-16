import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/lib/work.data";
import { mediaUrl } from "@/lib/media";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import BrowserFrame from "@/components/ui/BrowserFrame";
import CountUp from "@/components/ui/CountUp";
import CtaPanel from "@/components/ui/CtaPanel";
import DuotoneImage from "@/components/ui/DuotoneImage";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Sparkline from "@/components/charts/Sparkline";
import { IconArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies measured in numbers, not adjectives: every engagement charted month by month, before and after launch.",
  alternates: { canonical: "/work/" },
};

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();
  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <SectionHeading
          eyebrow="Work"
          title="Every project ships with its numbers."
          lead="We publish what changed after launch, charted month by month, before and after. Representative sample engagements shown until client-consented case studies replace them; the measurement is exactly what every client gets."
        />

        <div className="mt-16 flex flex-col gap-8">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 90}>
              <Link
                href={`/work/${cs.slug}/`}
                className="panel beam chamfer group grid overflow-hidden md:grid-cols-[1.1fr_1fr]"
              >
                {/* Mockup: flex column so the image fills whatever height the
                    text column gives the row (aspect-ratio + h-full would fight
                    the grid's row sizing and clip the card). */}
                <div className="relative border-b border-border md:border-b-0 md:border-r md:flex md:flex-col">
                  <BrowserFrame path={`/work/${cs.slug}`} />
                  <DuotoneImage
                    src={mediaUrl(cs.image, `/work/${cs.slug}.webp`)}
                    alt={`${cs.client}: ${cs.metricLabel}`}
                    className="aspect-[16/9] w-full md:aspect-auto md:min-h-[16rem] md:flex-1"
                    sizes="(min-width: 768px) 55vw, 100vw"
                  />
                  <div className="absolute bottom-0 left-0 chamfer bg-accent px-4 py-3 text-accent-ink">
                    <p className="font-display text-3xl font-bold leading-none tracking-tight">
                      <CountUp value={cs.metric} />
                    </p>
                    <p className="mt-1.5 max-w-[12rem] text-[11px] font-medium uppercase leading-snug tracking-[0.1em] text-accent-ink/70">
                      {cs.metricLabel}
                    </p>
                  </div>
                </div>

                {/* Case summary */}
                <div className="flex flex-col p-7 md:p-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex border border-border px-2.5 py-0.5 text-[11px] uppercase tracking-[0.12em] text-muted">
                      {cs.industry}
                    </span>
                    <span className="inline-flex border border-border px-2.5 py-0.5 text-[11px] uppercase tracking-[0.12em] text-muted">
                      {cs.year} · {cs.timeline}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {cs.client}
                  </h2>
                  <p className="measure mt-3 text-sm text-muted md:text-base">{cs.summary}</p>

                  <div className="mt-6">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted">
                      {cs.series.label}
                    </p>
                    <Sparkline
                      values={cs.series.values}
                      launchIndex={cs.series.launchIndex}
                      className="mt-2 h-10 w-full max-w-xs"
                    />
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                    <p className="text-xs uppercase tracking-[0.15em] text-accent-fg">
                      {cs.service}
                    </p>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent-fg">
                      Read the case study
                      <IconArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <CtaPanel
          title="Your project, measured the same way."
          lead="Every engagement starts with a measurement plan and ends with numbers like these. Book a free strategy call. We'll tell you what's realistic before you spend anything."
          primaryHref="/contact"
          primaryLabel="Book a Strategy Call"
        />
      </div>

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Work",
          description:
            "Case studies measured in numbers: every engagement charted before and after launch.",
          path: "/work/",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work/" },
        ])}
      />
      <JsonLd
        data={itemListSchema({
          name: "Case studies",
          description: "Selected engagements, each charted before and after launch.",
          items: caseStudies.map((cs) => ({
            name: `${cs.client}: ${cs.metricLabel}`,
            path: `/work/${cs.slug}/`,
            description: cs.summary,
          })),
        })}
      />
    </div>
  );
}
