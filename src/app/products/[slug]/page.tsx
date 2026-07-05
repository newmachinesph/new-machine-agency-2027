import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IconArrowLeft,
  IconArrowRight,
  IconChat,
  IconSpeed,
  IconLanding,
  type BrandIcon,
} from "@/components/ui/icons";
import products from "@/content/products.json";
import { whatsappHref } from "@/config/site";
import Button from "@/components/ui/Button";
import DuotoneImage from "@/components/ui/DuotoneImage";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const icons: Record<string, BrandIcon> = {
  chat: IconChat,
  speed: IconSpeed,
  landing: IconLanding,
};

function badgeClasses(status: string): string {
  if (status === "Live") return "border-accent bg-accent/10 text-accent-fg";
  if (status === "Beta") return "border-accent text-accent-fg";
  return "border-border text-muted";
}

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

  const Icon = icons[product.icon] ?? IconChat;

  return (
    <div className="pt-32 pb-24">
      <div className="wrap max-w-4xl">
        <Link
          href="/products/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <IconArrowLeft size={14} />
          All products
        </Link>

        <Reveal delay={80} className="mt-8 flex items-center gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center border border-border"
            style={{ color: product.tint } as CSSProperties}
          >
            <Icon size={20} />
          </span>
          <span
            className={`inline-block border px-2.5 py-0.5 text-xs ${badgeClasses(product.status)}`}
          >
            {product.status}
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="font-display mt-5 text-4xl font-extrabold tracking-tight md:text-5xl">
            {product.name}
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-5 max-w-xl text-lg text-muted">{product.oneLiner}</p>
        </Reveal>

        <Reveal delay={260}>
          <DuotoneImage
            src={`https://picsum.photos/seed/${product.slug}/1200/600`}
            className="mt-10 aspect-[2/1] w-full"
            sizes="(min-width: 768px) 56rem, 100vw"
          />
        </Reveal>
      </div>

      <div className="wrap max-w-4xl mt-16 grid gap-10 md:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
            The problem
          </p>
          <p className="mt-4 text-muted">{product.problem}</p>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
            The solution
          </p>
          <p className="mt-4 text-muted">{product.solution}</p>
        </Reveal>
      </div>

      <div className="wrap max-w-4xl mt-16">
        <Reveal>
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">Features</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {product.features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 80}>
              <div
                className="bento-cell h-full p-6"
                style={{ "--tint": product.tint } as CSSProperties}
              >
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted">{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="wrap max-w-4xl mt-16">
        <Reveal>
          <div className="panel beam p-8">
            <span className="inline-block border border-border px-2.5 py-0.5 text-xs uppercase tracking-[0.12em] text-muted">
              Sample outcome
            </span>
            <p className="font-display mt-5 text-4xl font-bold text-accent-fg">
              <CountUp value={product.caseStudy.metric} />
            </p>
            <p className="mt-1 text-sm text-muted">{product.caseStudy.metricLabel}</p>
            <p className="mt-5 text-muted">{product.caseStudy.story}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.15em] text-muted">
              {product.caseStudy.client} · representative sample, not a named client
            </p>
          </div>
        </Reveal>
      </div>

      <div className="wrap max-w-4xl mt-16">
        <Reveal>
          <div className="panel p-8 text-center">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              Want {product.name} for your business?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              We&apos;re building it in the open — tell us what you need and we&apos;ll
              factor it into the roadmap.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
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
        </Reveal>
      </div>
    </div>
  );
}
