import Link from "next/link";
import products from "@/content/products.json";
import DuotoneImage from "@/components/ui/DuotoneImage";
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
          number="08"
          eyebrow="Products"
          title="We build our own products, too."
          lead="The same team, the same standards — pointed at problems we kept seeing our clients face."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <Link href={`/products/${product.slug}/`} className="panel beam block h-full overflow-hidden">
                <DuotoneImage
                  src={`https://picsum.photos/seed/${product.slug}/800/500`}
                  className="h-32 w-full"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
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
