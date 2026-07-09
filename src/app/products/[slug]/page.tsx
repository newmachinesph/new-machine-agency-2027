import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconArrowRight, IconChat } from "@/components/ui/icons";
import products from "@/content/products.json";
import { site, whatsappHref } from "@/config/site";
import { productIcons, productBadgeClasses } from "@/lib/products";
import { breadcrumbSchema, orgRef } from "@/lib/schema";
import Button from "@/components/ui/Button";
import DuotoneImage from "@/components/ui/DuotoneImage";
import JsonLd from "@/components/ui/JsonLd";
import Logo from "@/components/ui/Logo";
import PatternGrid from "@/components/ui/PatternGrid";
import PatternSignal from "@/components/ui/PatternSignal";
import Reveal from "@/components/ui/Reveal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.oneLiner,
    alternates: { canonical: `/products/${slug}/` },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const Icon = productIcons[product.icon] ?? IconChat;

  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <Link
          href="/products/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <IconArrowLeft size={14} />
          All products
        </Link>

        {/* Hero */}
        <div className="relative mt-8 overflow-hidden">
          <PatternSignal className="pointer-events-none absolute -top-16 right-0 h-80 w-80 opacity-[0.1] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <Reveal delay={80}>
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
                  <span className="ml-2 flex-1 truncate bg-card px-3 py-1 text-[10px] tracking-[0.14em] text-muted">
                    {site.domain}/products/{product.slug}
                  </span>
                </div>
                <div className="relative">
                  <DuotoneImage
                    src={`https://picsum.photos/seed/${product.slug}/1200/900`}
                    className="aspect-[4/3] w-full"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                  <span className="pointer-events-none absolute inset-0 grid place-items-center">
                    <Logo className="h-10 w-auto opacity-90 [&_polygon]:fill-white" />
                  </span>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal className="flex items-center gap-3">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center chamfer"
                  style={{ background: product.tint }}
                >
                  <Icon size={22} className="text-accent-ink" />
                </span>
                <span
                  className={`inline-block border px-2.5 py-0.5 text-xs ${productBadgeClasses(product.status)}`}
                >
                  {product.status}
                </span>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                  {product.name}
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="measure mt-5 text-lg text-muted">{product.oneLiner}</p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/contact">
                    Talk to us
                    <IconArrowRight size={16} />
                  </Button>
                  <Button href={whatsappHref} variant="ghost">
                    <IconChat size={16} />
                    WhatsApp
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Problem -> Solution */}
        <div className="mt-24 grid gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
              The problem
            </p>
            <p className="measure mt-4 text-muted">{product.problem}</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
              The solution
            </p>
            <p className="measure mt-4 text-muted">{product.solution}</p>
          </Reveal>
        </div>

        {/* Features */}
        <div className="mt-24">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
              What&apos;s inside
            </p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              Features
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 80}>
                <div
                  className="bento-cell h-full p-6"
                  style={{ "--tint": product.tint } as CSSProperties}
                >
                  <h3 className="font-display font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted">{feature.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The loop — a machine is only real if something can reject its output */}
        <div className="mt-24">
          <Reveal>
            <div className="panel beam relative overflow-hidden p-8 md:p-12">
              <PatternGrid
                cols={6}
                rows={3}
                seed={3}
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
              />
              <div className="relative">
                <span className="inline-block border border-border px-2.5 py-0.5 text-xs uppercase tracking-[0.12em] text-muted">
                  The loop
                </span>
                <p className="measure mt-5 text-muted">
                  Anything can generate. A machine earns the name when something can
                  automatically reject its work and make it try again.
                </p>
                <dl className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
                  {[
                    { term: "Goal", def: product.loop.goal },
                    { term: "Verify", def: product.loop.verify },
                    { term: "Stop when", def: product.loop.stop },
                  ].map((row) => (
                    <div key={row.term} className="border-t border-border pt-5">
                      <dt className="text-xs uppercase tracking-[0.15em] text-accent-fg">
                        {row.term}
                      </dt>
                      <dd className="mt-3 text-sm leading-relaxed text-muted">{row.def}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-10 text-xs uppercase tracking-[0.15em] text-muted">
                  {product.status} · no client results published yet
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <div className="mt-24">
          <Reveal>
            <div className="panel relative overflow-hidden p-10 text-center md:p-14">
              <PatternGrid
                cols={6}
                rows={3}
                seed={9}
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
              />
              <div className="relative">
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  Want {product.name} for your business?
                </h2>
                <p className="measure mx-auto mt-3 text-muted">
                  We&apos;re building it in the open — tell us what you need and we&apos;ll
                  factor it into the roadmap.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button href="/contact">
                    Talk to us
                    <IconArrowRight size={16} />
                  </Button>
                  <Button href={whatsappHref} variant="ghost">
                    <IconChat size={16} />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: product.name,
          description: product.oneLiner,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: `${site.url}/products/${product.slug}/`,
          // Reference the one Organization node instead of minting a new,
          // unlinked copy of it on every product page.
          brand: orgRef,
          publisher: orgRef,
          provider: orgRef,
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
          { name: product.name, path: `/products/${product.slug}/` },
        ])}
      />
    </div>
  );
}
