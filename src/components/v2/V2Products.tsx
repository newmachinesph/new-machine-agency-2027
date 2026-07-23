import Link from "next/link";
import { getProducts } from "@/lib/products.data";
import Reveal from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/** 005 · Machines — product line as a dark bento: one anchor card + grid.
 *  First product gets the wide anchor slot; next five fill the rail. */
export default async function V2Products() {
  const products = (await getProducts()).slice(0, 6);
  if (products.length === 0) return null;
  const [anchor, ...rest] = products;

  return (
    <section className="relative py-24 md:py-36">
      <div className="wrap">
        <Reveal>
          <p className="v2-counter uppercase">005 · Machines</p>
          <h2 className="v2-ghost mt-6 text-[clamp(2.5rem,6vw,5.5rem)]">
            Growth, productized.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          <Reveal className="md:col-span-2 md:row-span-2">
            <Link
              href={`/products/${anchor.slug}`}
              className="v2-frame group flex h-full min-h-[18rem] flex-col justify-between p-8"
            >
              <div>
                <span className="inline-block border border-accent/40 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-accent-fg">
                  {anchor.status}
                </span>
                <h3 className="v2-display mt-6 text-3xl md:text-4xl">
                  {anchor.name}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                  {anchor.oneLiner}
                </p>
              </div>
              <span className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-fg">
                See the machine
                <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>

          {rest.map((product, i) => (
            <Reveal key={product.slug} delay={i * 60}>
              <Link
                href={`/products/${product.slug}`}
                className="v2-frame group flex h-full flex-col justify-between p-6"
              >
                <h3 className="font-display text-lg font-semibold text-fg">
                  {product.name}
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-accent-fg">
                  {product.status}
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Link
            href="/products"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-accent-fg"
          >
            All 12 machines
            <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
