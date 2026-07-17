import AccentTick from "@/components/ui/AccentTick";
import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconChat } from "@/components/ui/icons";
import { site } from "@/config/site";
import { productIcons, productBadgeClasses } from "@/lib/products";
import { getProducts } from "@/lib/products.data";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import Button from "@/components/ui/Button";
import DuotoneImage from "@/components/ui/DuotoneImage";
import { productImageUrl } from "@/lib/media";
import JsonLd from "@/components/ui/JsonLd";
import Logo from "@/components/ui/Logo";
import PatternGrid from "@/components/ui/PatternGrid";
import PatternSignal from "@/components/ui/PatternSignal";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Products",
  description: `${site.principle} The Machines: loop-engineered systems that run a job end to end, verify their own work, and stop when it is done.`,
  alternates: { canonical: "/products/" },
};

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <div className="relative overflow-hidden">
          <PatternSignal className="pointer-events-none absolute -top-10 right-0 h-72 w-72 opacity-[0.1] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]" />

          <div className="relative">
            <Reveal className="flex items-center gap-2.5">
              <AccentTick />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                The Machines
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
                We don&apos;t automate tasks. We build systems that{" "}
                <span className="text-accent-fg">improve themselves.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="measure mt-5 text-muted">
                Anything can generate. A Machine earns the name because something can
                automatically reject its work and make it try again: a goal it runs
                toward, a gate it has to pass, and a point at which it stops. Each one
                below publishes that loop before it asks for your trust.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact">
                  Talk to us
                  <IconArrowRight size={16} />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {products.map((product, i) => {
            const Icon = productIcons[product.icon] ?? IconChat;
            return (
              <Reveal key={product.slug} delay={i * 90}>
                <Link
                  href={`/products/${product.slug}/`}
                  className="panel beam relative flex h-full flex-col overflow-hidden"
                >
                  <PatternGrid
                    cols={3}
                    rows={3}
                    seed={i + 1}
                    className="pointer-events-none absolute -right-5 -top-5 h-24 w-24 opacity-[0.16] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]"
                  />

                  {/* Browser device-frame */}
                  <div
                    aria-hidden="true"
                    className="relative flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5"
                  >
                    <span className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 bg-accent/70" />
                      <span className="h-2.5 w-2.5 bg-muted/40" />
                      <span className="h-2.5 w-2.5 bg-muted/25" />
                    </span>
                    <span className="ml-2 min-w-0 flex-1 truncate bg-card px-3 py-1 text-[10px] tracking-[0.14em] text-muted">
                      {site.domain}/products/{product.slug}
                    </span>
                  </div>
                  {/* Screenshot with centered solid-white wordmark */}
                  <div className="relative">
                    <DuotoneImage
                      src={productImageUrl(product.image, product.slug)}
                      alt={product.name}
                      className="aspect-[16/10] w-full"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <span className="pointer-events-none absolute inset-0 grid place-items-center">
                      <Logo className="h-8 w-auto opacity-90 [&_polygon]:fill-white" />
                    </span>
                  </div>

                  <div className="relative flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center chamfer"
                        style={{ background: product.tint }}
                      >
                        <Icon size={18} className="text-accent-ink" />
                      </span>
                      <span
                        className={`inline-block border px-2.5 py-0.5 text-xs ${productBadgeClasses(product.status)}`}
                      >
                        {product.status}
                      </span>
                    </div>
                    <h2 className="font-display mt-5 text-xl font-bold tracking-tight">
                      {product.name}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-muted">{product.oneLiner}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent-fg">
                      View product
                      <IconArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={340}>
          <div className="panel relative mt-20 overflow-hidden p-10 text-center md:p-14">
            <PatternGrid
              cols={6}
              rows={3}
              seed={9}
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
            />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Got a job worth turning into a Machine?
              </h2>
              <p className="measure mx-auto mt-3 text-muted">
                All {products.length} are in active development. If a job in your business
                repeats every week and something could tell good output from bad, it can
                probably be a Machine. Tell us about it.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/contact">
                  Talk to us
                  <IconArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

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
