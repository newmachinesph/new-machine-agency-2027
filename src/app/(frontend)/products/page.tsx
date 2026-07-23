import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@/components/ui/icons";
import { site } from "@/config/site";
import { getProducts } from "@/lib/products.data";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import Button from "@/components/ui/Button";
import { productImageUrl } from "@/lib/media";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description: `${site.principle} The Machines run a job end to end, verify their own work, and stop when it is done.`,
  path: "/products/",
  withImage: true,
});

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="v2-scope">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pb-20">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
              The Machines
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="v2-display mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
              Systems that improve <span className="text-accent">themselves</span>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg text-muted">
              Each Machine runs toward a goal, passes a gate, and stops when the
              job is done.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact">
                Talk to us
                <IconArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={i * 90}>
                <Link
                  href={`/products/${product.slug}/`}
                  className="v2-case v2-frame group flex h-full flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={productImageUrl(product.image, product.slug)}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                      {product.status}
                    </p>
                    <h2 className="mt-2 font-display text-lg font-semibold text-fg">
                      {product.name}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-muted">{product.oneLiner}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-fg">
                      See the machine
                      <IconArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
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
              Got a job worth a <span className="text-accent">Machine</span>?
            </h2>
            <p className="mt-6 max-w-xl text-muted">
              All {products.length} are in active development — tell us about yours.
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
        data={webPageSchema({
          type: "CollectionPage",
          name: "The Machines",
          description: `${site.principle} Loop-engineered systems that run a job end to end, verify their own work against a gate, and stop when it is done.`,
          path: "/products/",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
        ])}
      />
      <JsonLd
        data={itemListSchema({
          name: "The Machines",
          description: `The ${products.length} Machines built by ${site.name}.`,
          items: products.map((product) => ({
            name: product.name,
            path: `/products/${product.slug}/`,
            description: product.oneLiner,
          })),
        })}
      />
    </div>
  );
}
