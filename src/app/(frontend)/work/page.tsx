import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudies } from "@/lib/work.data";
import { mediaUrl } from "@/lib/media";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import Sparkline from "@/components/charts/Sparkline";
import { IconArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies measured in numbers, not adjectives: every engagement charted month by month, before and after launch.",
  path: "/work/",
  withImage: true,
});

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();
  return (
    <div className="v2-scope">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pb-20">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
              Work
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="v2-display mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
              Every project ships with its <span className="text-accent">numbers</span>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg text-muted">
              Representative samples for now — the measurement is exactly what
              every client gets.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Case list */}
      <section className="pb-24">
        <div className="wrap">
          <div className="flex flex-col gap-8">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 90}>
                <Link
                  href={`/work/${cs.slug}/`}
                  className="v2-case v2-frame group grid overflow-hidden md:grid-cols-[1.1fr_1fr]"
                >
                  <div className="relative aspect-[16/9] border-b border-border md:aspect-auto md:min-h-[18rem] md:border-b-0 md:border-r">
                    <Image
                      src={mediaUrl(cs.image, `/work/${cs.slug}.webp`)}
                      alt={`${cs.client}: ${cs.metricLabel}`}
                      fill
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <p className="font-display text-5xl font-semibold text-accent-fg">
                        <CountUp value={cs.metric} />
                      </p>
                      <p className="mt-1 max-w-[26ch] text-xs uppercase tracking-[0.14em] text-white/70">
                        {cs.metricLabel}
                      </p>
                    </div>
                  </div>

                  {/* Case summary */}
                  <div className="flex flex-col p-7 md:p-9">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                      {cs.industry} · {cs.year} · {cs.timeline}
                    </p>
                    <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                      {cs.client}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-muted md:text-base">
                      {cs.summary}
                    </p>

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
                      <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent-fg">
                        Read the case study
                        <IconArrowRight
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="wrap">
          <Reveal>
            <h2 className="v2-display max-w-3xl text-[clamp(2.2rem,5vw,4.5rem)]">
              Your project, measured the <span className="text-accent">same way</span>.
            </h2>
            <p className="mt-6 max-w-xl text-muted">
              Book a free strategy call — we&rsquo;ll tell you what&rsquo;s
              realistic before you spend anything.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact">
                Book a Strategy Call
                <IconArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

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
