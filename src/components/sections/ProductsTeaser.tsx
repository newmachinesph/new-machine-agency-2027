import Link from "next/link";
import products from "@/content/products.json";
import DuotoneImage from "@/components/ui/DuotoneImage";
import Logo from "@/components/ui/Logo";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

function badgeClasses(status: string): string {
  if (status === "Beta" || status === "Live") {
    return "border-accent text-accent-fg";
  }
  return "border-border text-muted";
}

export default function ProductsTeaser() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          number="09"
          eyebrow="Products"
          title="We build our own products, too."
          lead="The same team, the same standards — pointed at problems we kept seeing our clients face."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <Link href={`/products/${product.slug}/`} className="panel beam block h-full overflow-hidden">
                {/* Browser device-frame */}
                <div
                  aria-hidden="true"
                  className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5"
                >
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 bg-accent/70" />
                    <span className="h-2.5 w-2.5 bg-muted/40" />
                    <span className="h-2.5 w-2.5 bg-muted/25" />
                  </span>
                  <span className="ml-2 flex-1 truncate bg-card px-3 py-1 text-[10px] tracking-[0.14em] text-muted">
                    nomadmedia.co/products/{product.slug}
                  </span>
                </div>
                {/* Screenshot placeholder with centered solid-white wordmark */}
                <div className="relative">
                  <DuotoneImage
                    src={`https://picsum.photos/seed/${product.slug}/800/500`}
                    className="aspect-[16/10] w-full"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <span className="pointer-events-none absolute inset-0 grid place-items-center">
                    <Logo className="h-7 w-auto opacity-90 [&_polygon]:fill-white" />
                  </span>
                </div>
                <div className="p-6">
                  <span
                    className={`inline-block border px-2.5 py-0.5 text-xs ${badgeClasses(product.status)}`}
                  >
                    {product.status}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted">{product.oneLiner}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <Link
            href="/products"
            className="mt-8 inline-block text-sm text-accent-fg transition-opacity hover:opacity-80"
          >
            See all products →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
