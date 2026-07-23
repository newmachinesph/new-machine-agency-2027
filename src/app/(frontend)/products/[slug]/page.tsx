import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/icons";
import { site } from "@/config/site";
import { getProducts, getProductBySlug } from "@/lib/products.data";
import { breadcrumbSchema, faqSchema, orgRef } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import Faq from "@/components/ui/Faq";
import GhostTitle from "@/components/v2/GhostTitle";
import Button from "@/components/ui/Button";
import DuotoneImage from "@/components/ui/DuotoneImage";
import { productImageUrl } from "@/lib/media";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  // No `images`: the route's own opengraph-image.tsx populates them.
  return pageMetadata({
    title: product.name,
    description: product.oneLiner,
    path: `/products/${slug}/`,
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="v2-scope">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pb-20">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Link
            href="/products/"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <IconArrowLeft size={14} />
            All products
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <Reveal>
                <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
                  {product.status}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="v2-display mt-6 text-[clamp(2.6rem,6.5vw,6rem)]">
                  {product.name}
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 max-w-xl text-lg text-muted">{product.oneLiner}</p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/contact">
                    Talk to us
                    <IconArrowRight size={16} />
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="v2-frame overflow-hidden">
                <DuotoneImage
                  src={productImageUrl(product.image, product.slug)}
                  alt={product.name}
                  className="aspect-[4/3] w-full"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="wrap pb-24">
        {/* Problem -> Solution */}
        <div className="grid gap-10 border-t border-border pt-16 md:grid-cols-2 md:gap-14">
          <Reveal>
            <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
              The problem
            </p>
            <p className="mt-4 max-w-xl text-muted">{product.problem}</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
              The solution
            </p>
            <p className="mt-4 max-w-xl text-muted">{product.solution}</p>
          </Reveal>
        </div>

        {/* Features */}
        <div className="mt-24">
          <Reveal>
            <GhostTitle>What&rsquo;s inside.</GhostTitle>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {product.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 90}>
                <div className="border-t border-border pt-5">
                  <h3 className="font-display font-semibold text-fg">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted">{feature.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The loop: a machine is only real if something can reject its output */}
        <div className="mt-24">
          <Reveal>
            <div className="v2-frame p-8 md:p-12">
              <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
                The loop
              </p>
              <p className="mt-5 max-w-xl text-muted">
                A machine earns the name when something can automatically reject
                its work and make it try again.
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
                No client results published yet
              </p>
            </div>
          </Reveal>
        </div>

        {/* FAQ */}
        {product.faqs?.length ? (
          <div className="mt-24">
            <Reveal>
              <GhostTitle>Questions.</GhostTitle>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-12 max-w-3xl">
                <Faq items={product.faqs} />
              </div>
            </Reveal>
          </div>
        ) : null}
      </div>

      {/* CTA */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="wrap">
          <Reveal>
            <h2 className="v2-display max-w-3xl text-[clamp(2.2rem,5vw,4.5rem)]">
              Want {product.name} for your <span className="text-accent">business</span>?
            </h2>
            <p className="mt-6 max-w-xl text-muted">
              We&rsquo;re building it in the open — tell us what you need.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact">
                Talk to us
                <IconArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

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
      {product.faqs?.length ? <JsonLd data={faqSchema(product.faqs)} /> : null}
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
