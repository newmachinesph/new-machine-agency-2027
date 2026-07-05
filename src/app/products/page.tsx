import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import products from "@/content/products.json";
import Button from "@/components/ui/Button";
import DuotoneImage from "@/components/ui/DuotoneImage";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software products we build in-house — born from problems we kept seeing our clients face.",
  alternates: { canonical: "/products/" },
};

function badgeClasses(status: string): string {
  if (status === "Live") return "border-accent bg-accent/10 text-accent-fg";
  if (status === "Beta") return "border-accent text-accent-fg";
  return "border-border text-muted";
}

export default function ProductsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <Reveal className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Products
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display mt-5 max-w-2xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Built by us. Used by businesses like yours.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-xl text-muted">
            The same team that builds client projects also builds products — tools born
            from problems we kept running into on real engagements.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.name} delay={i * 90}>
              <div className="panel flex h-full flex-col overflow-hidden">
                <DuotoneImage
                  src={`https://picsum.photos/seed/${encodeURIComponent(product.name)}/800/500`}
                  className="h-40 w-full"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="flex flex-1 flex-col p-7">
                <span
                  className={`inline-block self-start border px-2.5 py-0.5 text-xs ${badgeClasses(product.status)}`}
                >
                  {product.status}
                </span>
                <h2 className="mt-4 text-xl font-semibold">{product.name}</h2>
                <p className="mt-2 flex-1 text-sm text-muted">{product.oneLiner}</p>
                {product.link ? (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-sm text-accent-fg transition-opacity hover:opacity-80"
                  >
                    Visit →
                  </a>
                ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className="mt-10 text-sm text-muted">
            All three are in active development. Want early access, or have a problem
            you think we should build for? We’d love to hear it.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-8">
            <Button href="/contact">
              Talk to us
              <ArrowRight size={16} />
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
