import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudyBySlug, nextCaseStudy } from "@/lib/work.data";
import { mediaUrl } from "@/lib/media";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import Dumbbell from "@/components/charts/Dumbbell";
import TrendChart from "@/components/charts/TrendChart";
import BrowserFrame from "@/components/ui/BrowserFrame";
import CountUp from "@/components/ui/CountUp";
import CtaPanel from "@/components/ui/CtaPanel";
import DuotoneImage from "@/components/ui/DuotoneImage";
import JsonLd from "@/components/ui/JsonLd";
import PatternGrid from "@/components/ui/PatternGrid";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@/components/ui/icons";

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
  return {
    title: `${cs.client}: ${cs.metric} ${cs.metricLabel}`,
    description: cs.summary,
    alternates: { canonical: `/work/${slug}/` },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const next = await nextCaseStudy(cs.slug);

  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <Link
          href="/work/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <IconArrowLeft size={14} />
          All work
        </Link>

        {/* Hero */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-14">
          <div>
            <Reveal className="flex flex-wrap items-center gap-2">
              <span className="inline-flex border border-border px-2.5 py-0.5 text-[11px] uppercase tracking-[0.12em] text-muted">
                {cs.industry}
              </span>
              <span className="inline-flex border border-border px-2.5 py-0.5 text-[11px] uppercase tracking-[0.12em] text-muted">
                {cs.year} · {cs.timeline}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                {cs.client}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="measure mt-5 text-lg text-muted">{cs.summary}</p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-7 text-xs uppercase tracking-[0.15em] text-accent-fg">
                {cs.service}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="relative">
              <div className="chamfer panel beam overflow-hidden">
                <BrowserFrame path={`/work/${cs.slug}`} />
                <DuotoneImage
                  src={mediaUrl(cs.image, `/work/${cs.slug}.webp`)}
                  alt={`${cs.client} case study`}
                  className="aspect-[16/10] w-full"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 left-0 chamfer bg-accent px-5 py-4 text-accent-ink shadow-[6px_6px_0_rgba(0,0,0,0.28)]">
                <p className="font-display text-4xl font-bold leading-none tracking-tight">
                  <CountUp value={cs.metric} />
                </p>
                <p className="mt-1.5 max-w-[13rem] text-[11px] font-medium uppercase leading-snug tracking-[0.1em] text-accent-ink/70">
                  {cs.metricLabel}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* The numbers */}
        <div className="mt-28">
          <SectionHeading
            eyebrow="The numbers"
            title="What changed, charted."
            lead="Twelve months of the metric this engagement was hired to move, six before launch, six after, plus every headline KPI, before and after."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="h-full">
              <div className="panel chamfer flex h-full flex-col p-6 md:p-8">
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
              <div className="panel chamfer flex h-full flex-col p-6 md:p-8">
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
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
                The challenge
              </p>
              <p className="measure mt-4 text-lg text-muted">{cs.challenge}</p>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
                What we did
              </p>
            </Reveal>
            <div className="mt-6 space-y-5">
              {cs.approach.map((step, i) => (
                <Reveal key={step.title} delay={i * 80}>
                  <div className="flex gap-4">
                    <span className="font-display text-xl font-bold text-accent-fg/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
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
          <div className="panel chamfer relative overflow-hidden p-8 md:p-10">
            <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-accent" />
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
              The outcome
            </p>
            <p className="measure mt-4 text-lg font-medium leading-relaxed md:text-xl">
              {cs.outcome}
            </p>
          </div>
        </Reveal>

        {/* Quote */}
        <Reveal className="mt-16">
          <figure className="relative mx-auto max-w-3xl px-2 py-4 text-center">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-display text-8xl text-accent-fg opacity-30"
            >
              “
            </span>
            <blockquote className="relative font-display text-xl font-medium leading-relaxed md:text-2xl">
              {cs.quote.text}
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted">
              <span className="font-semibold text-fg">{cs.quote.name}</span>, {cs.quote.role}
            </figcaption>
          </figure>
        </Reveal>

        {/* Deliverables */}
        <div className="mt-24">
          <SectionHeading eyebrow="Scope" title="What shipped" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cs.deliverables.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <div className="bento-cell flex h-full items-start gap-3 p-6">
                  <IconCheck size={18} className="mt-0.5 shrink-0 text-accent-fg" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Next case */}
        <Reveal className="mt-24">
          <Link
            href={`/work/${next.slug}/`}
            className="panel beam chamfer relative flex flex-wrap items-center justify-between gap-6 overflow-hidden p-8 md:p-10"
          >
            <PatternGrid
              cols={3}
              rows={3}
              seed={5}
              className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 opacity-[0.1]"
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Next case study
              </p>
              <p className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                {next.client}
              </p>
              <p className="mt-1 text-sm text-muted">
                {next.metric} {next.metricLabel}
              </p>
            </div>
            <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-accent-fg">
              Read it
              <IconArrowRight size={16} />
            </span>
          </Link>
        </Reveal>

        <CtaPanel
          title="Want a chart like this with your name on it?"
          lead="Book a free strategy call. We'll tell you which metric to move first, what's realistic, and exactly what it costs, before you commit to anything."
          primaryHref="/contact"
          primaryLabel="Book a Strategy Call"
        />
      </div>

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
