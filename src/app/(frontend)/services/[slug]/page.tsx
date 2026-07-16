import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconArrowRight, IconCheck, IconWebsite } from "@/components/ui/icons";
import services from "@/content/services.json";
import { site } from "@/config/site";
import { serviceIcons, stageGroups } from "@/lib/services";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import Button from "@/components/ui/Button";
import DuotoneImage from "@/components/ui/DuotoneImage";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import PatternGrid from "@/components/ui/PatternGrid";
import PatternSignal from "@/components/ui/PatternSignal";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}/` },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon] ?? IconWebsite;
  const stageNumber = String(stageGroups.findIndex((g) => g.stage === service.stage) + 1).padStart(
    2,
    "0",
  );
  const related = services.filter((s) => s.stage === service.stage && s.slug !== service.slug);

  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <Link
          href="/services/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <IconArrowLeft size={14} />
          All services
        </Link>

        {/* Hero */}
        <div className="relative mt-8 overflow-hidden">
          <PatternSignal className="pointer-events-none absolute -top-16 right-0 h-80 w-80 opacity-[0.1] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]" />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <Reveal className="flex items-center gap-3">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center chamfer"
                  style={{ background: service.tint }}
                >
                  <Icon size={22} className="text-accent-ink" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-fg">
                  {service.stage}
                </span>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                  {service.outcome}
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="measure mt-5 text-lg text-muted">{service.description}</p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/contact">
                    Book a Strategy Call
                    <IconArrowRight size={16} />
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="chamfer panel beam overflow-hidden">
                <div
                  aria-hidden="true"
                  className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3"
                >
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 bg-accent/70" />
                    <span className="h-2.5 w-2.5 bg-muted/40" />
                    <span className="h-2.5 w-2.5 bg-muted/25" />
                  </span>
                  <span className="ml-2 min-w-0 flex-1 truncate bg-card px-3 py-1 text-[10px] tracking-[0.14em] text-muted">
                    {site.domain}/services/{service.slug}
                  </span>
                </div>
                <DuotoneImage
                  src={`https://picsum.photos/seed/${service.slug}/1200/900`}
                  alt={`${service.name} | ${site.name}`}
                  className="aspect-[4/3] w-full"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Problem → Approach */}
        <div className="mt-24 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
                The problem
              </p>
              <p className="measure mt-4 text-lg text-muted">{service.problem}</p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
                How we approach it
              </p>
            </Reveal>
            <div className="mt-6 space-y-5">
              {service.approach.map((step, i) => (
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

        {/* What's included */}
        <div className="mt-24">
          <SectionHeading number={stageNumber} eyebrow="Scope" title="What's included" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <div
                  className="bento-cell flex h-full items-start gap-3 p-6"
                  style={{ "--tint": service.tint } as CSSProperties}
                >
                  <IconCheck size={18} className="mt-0.5 shrink-0 text-accent-fg" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-8 text-sm text-muted">
              <span className="font-semibold text-fg">Built for </span>
              {service.forWho}
            </p>
          </Reveal>
        </div>

        {/* FAQ */}
        <div className="mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="FAQ" title={`Questions about ${service.name}`} />
          <Reveal delay={80}>
            <Faq items={service.faqs} />
          </Reveal>
        </div>

        {/* Related services */}
        {related.length > 0 && (
          <div className="mt-24">
            <SectionHeading eyebrow={service.stage} title="More in this stage" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, i) => {
                const RelIcon = serviceIcons[rel.icon] ?? IconWebsite;
                return (
                  <Reveal key={rel.slug} delay={i * 60}>
                    <Link
                      href={`/services/${rel.slug}/`}
                      className="panel beam chamfer group/rel flex h-full flex-col p-6"
                    >
                      <span
                        className="grid h-11 w-11 place-items-center chamfer"
                        style={{ background: rel.tint }}
                      >
                        <RelIcon size={19} className="text-accent-ink" />
                      </span>
                      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                        {rel.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted">{rel.outcome}</p>
                      <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm text-accent-fg">
                        Explore
                        <IconArrowRight size={14} />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <Reveal>
          <div className="panel relative mt-24 overflow-hidden p-10 text-center md:p-14">
            <PatternGrid
              cols={6}
              rows={3}
              seed={9}
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
            />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Ready to start with {service.name}?
              </h2>
              <p className="measure mx-auto mt-3 text-muted">
                Book a free call. We&rsquo;ll tell you honestly what will move the needle and
                what won&rsquo;t.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/contact">
                  Book a Strategy Call
                  <IconArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.description,
          slug: service.slug,
        })}
      />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
          { name: service.name, path: `/services/${service.slug}/` },
        ])}
      />
    </div>
  );
}
