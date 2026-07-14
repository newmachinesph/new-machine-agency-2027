import Link from "next/link";
import products from "@/content/products.json";
import BrowserFrame from "@/components/ui/BrowserFrame";
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
    <section className="bg-surface py-16 md:py-24 lg:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="The Machines"
          title="We build systems that improve themselves."
          lead="Each Machine runs a job end to end, checks its own work against a gate it cannot talk its way past, and stops when the job is done."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.slice(0, 3).map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <Link href={`/products/${product.slug}/`} className="panel beam block h-full overflow-hidden">
                <BrowserFrame path={`/products/${product.slug}`} />
                {/* Screenshot placeholder with centered solid-white wordmark */}
                <div className="relative">
                  <DuotoneImage
                    src={`/products/${product.slug}.webp`}
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
