import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/icons";
import { site } from "@/config/site";
import { getServices, getServiceBySlug } from "@/lib/services.data";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import Button from "@/components/ui/Button";
import Faq from "@/components/ui/Faq";
import GhostTitle from "@/components/v2/GhostTitle";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  // No `images`: the route's own opengraph-image.tsx populates them.
  return pageMetadata({
    title: service.name,
    description: service.metaDescription,
    path: `/services/${slug}/`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const services = await getServices();
  const related = services.filter((s) => s.stage === service.stage && s.slug !== service.slug);

  return (
    <div className="v2-scope">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pb-20">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Link
            href="/services/"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <IconArrowLeft size={14} />
            All services
          </Link>

          <div className="mt-10">
            <Reveal>
              <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
                {service.stage}
              </p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="v2-display mt-6 text-[clamp(2.6rem,6.5vw,6rem)]">
                {service.name}
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-lg text-muted">{service.outcome}</p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-8">
                <Button href="/contact">
                  Book a Strategy Call
                  <IconArrowRight size={16} />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Problem → Approach */}
      <section className="wrap py-16 md:py-24">
        <Reveal>
          <GhostTitle>The problem we solve.</GhostTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">{service.problem}</p>
        </Reveal>
        <div className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {service.approach.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <div className="flex gap-4">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                <div>
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="wrap py-16 md:py-24">
        <Reveal>
          <GhostTitle>What&rsquo;s included.</GhostTitle>
        </Reveal>
        <Reveal delay={90}>
          <ul className="mt-10 grid gap-x-12 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-b border-border py-3.5 text-sm text-fg/85"
              >
                <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            <span className="font-semibold text-fg">Built for </span>
            {service.forWho}
          </p>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="wrap py-16 md:py-24">
        <Reveal>
          <GhostTitle>Questions, answered.</GhostTitle>
        </Reveal>
        <Reveal delay={90}>
          <div className="mt-10 max-w-3xl">
            <Faq items={service.faqs} />
          </div>
        </Reveal>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="wrap py-16 md:py-24">
          <Reveal>
            <GhostTitle>More in this stage.</GhostTitle>
          </Reveal>
          <div className="mt-10 border-t border-border">
            {related.map((rel, i) => (
              <Reveal key={rel.slug} delay={i * 60}>
                <Link
                  href={`/services/${rel.slug}/`}
                  className="group grid gap-1.5 border-b border-border py-6 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-8"
                >
                  <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent-fg">
                    {rel.name}
                  </h3>
                  <p className="text-sm text-muted">{rel.outcome}</p>
                  <IconArrowRight
                    size={16}
                    className="hidden self-center text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent md:block"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <h2 className="v2-display max-w-4xl text-[clamp(2.2rem,5.5vw,4.5rem)]">
              Start with <span className="text-accent">{service.name}</span>.
            </h2>
            <p className="mt-6 max-w-xl text-muted">
              Book a free call. We&rsquo;ll tell you honestly what will move
              your numbers and what won&rsquo;t.
            </p>
            <div className="mt-8">
              <Button href="/contact">
                Book a Strategy Call
                <IconArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

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
