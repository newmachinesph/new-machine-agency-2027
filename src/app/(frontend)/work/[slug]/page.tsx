import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudyBySlug, nextCaseStudy } from "@/lib/work.data";
import { mediaUrl } from "@/lib/media";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import Dumbbell from "@/components/charts/Dumbbell";
import TrendChart from "@/components/charts/TrendChart";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import GhostTitle from "@/components/v2/GhostTitle";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/icons";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return {};
  // No `images`: the route's own opengraph-image.tsx populates them.
  return pageMetadata({
    title: `${cs.client}: ${cs.metric} ${cs.metricLabel}`,
    description: cs.summary,
    path: `/work/${slug}/`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const next = await nextCaseStudy(cs.slug);

  return (
    <div className="v2-scope">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pb-20">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Link
            href="/work/"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <IconArrowLeft size={14} />
            All work
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <Reveal>
                <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
                  {cs.industry} · {cs.year} · {cs.timeline}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="v2-display mt-6 text-[clamp(2.6rem,6.5vw,6rem)]">
                  {cs.client}
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 max-w-xl text-lg text-muted">{cs.summary}</p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-7 text-xs uppercase tracking-[0.15em] text-accent-fg">
                  {cs.service}
                </p>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="v2-case v2-frame overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={mediaUrl(cs.image, `/work/${cs.slug}.webp`)}
                    alt={`${cs.client} case study`}
                    fill
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover"
                    priority
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
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="wrap pb-24">
        {/* The numbers */}
        <div className="border-t border-border pt-16">
          <Reveal>
            <GhostTitle>What changed, charted.</GhostTitle>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-xl text-muted">
              Twelve months of the metric this engagement was hired to move —
              six before launch, six after.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="h-full">
              <div className="v2-frame flex h-full flex-col p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-fg">{cs.series.label}</h3>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted">
                    {cs.year}
                  </span>
                </div>
                <TrendChart
                  label={cs.series.label}
                  months={cs.series.months}
                  values={cs.series.values}
                  launchIndex={cs.series.launchIndex}
                  unit={cs.series.unit}
                  className="mt-5"
                />
                <p className="mt-4 text-xs text-muted">
                  Representative sample data: the same live measurement dashboard ships with
                  every engagement.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <div className="v2-frame flex h-full flex-col p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-fg">Before → after</h3>
                  <span
                    className="flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-muted"
                    aria-hidden="true"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2" style={{ background: "var(--chart-dim)" }} />
                      Before
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2" style={{ background: "var(--chart-data)" }} />
                      After
                    </span>
                  </span>
                </div>
                <Dumbbell items={cs.kpis} className="mt-8" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Challenge → Approach */}
        <div className="mt-24 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
                The challenge
              </p>
              <p className="mt-4 max-w-xl text-lg text-muted">{cs.challenge}</p>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
                What we did
              </p>
            </Reveal>
            <div className="mt-6 space-y-5">
              {cs.approach.map((step, i) => (
                <Reveal key={step.title} delay={i * 90}>
                  <div className="flex gap-4">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                    <div>
                      <h3 className="font-display font-semibold">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted">{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Outcome */}
        <Reveal className="mt-16">
          <div className="v2-frame p-8 md:p-10">
            <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
              The outcome
            </p>
            <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed md:text-xl">
              {cs.outcome}
            </p>
          </div>
        </Reveal>

        {/* Quote */}
        <Reveal className="mt-16">
          <figure className="mx-auto max-w-3xl px-2 py-4 text-center">
            <blockquote className="font-display text-xl font-medium leading-relaxed md:text-2xl">
              &ldquo;{cs.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted">
              <span className="font-semibold text-fg">{cs.quote.name}</span>, {cs.quote.role}
            </figcaption>
          </figure>
        </Reveal>

        {/* Deliverables */}
        <div className="mt-24">
          <Reveal>
            <GhostTitle>What shipped.</GhostTitle>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {cs.deliverables.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <p className="border-t border-border pt-4 text-sm font-medium text-fg">
                  {item}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Next case */}
        <Reveal className="mt-24">
          <Link
            href={`/work/${next.slug}/`}
            className="v2-frame group flex flex-wrap items-center justify-between gap-6 p-8 md:p-10"
          >
            <div>
              <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
                Next case study
              </p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                {next.client}
              </p>
              <p className="mt-1 text-sm text-muted">
                {next.metric} {next.metricLabel}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-fg">
              Read it
              <IconArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </Reveal>
      </div>

      {/* CTA */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="wrap">
          <Reveal>
            <h2 className="v2-display max-w-3xl text-[clamp(2.2rem,5vw,4.5rem)]">
              A chart with your <span className="text-accent">name</span> on it.
            </h2>
            <p className="mt-6 max-w-xl text-muted">
              Book a free strategy call — we&rsquo;ll tell you which metric to
              move first and what it costs.
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
        data={caseStudySchema({
          client: cs.client,
          summary: cs.summary,
          slug: cs.slug,
          industry: cs.industry,
          service: cs.service,
          year: cs.year,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work/" },
          { name: cs.client, path: `/work/${cs.slug}/` },
        ])}
      />
    </div>
  );
}
