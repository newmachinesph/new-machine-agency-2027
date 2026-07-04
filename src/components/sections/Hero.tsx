import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import TypeWriter from "@/components/ui/TypeWriter";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16">
      <div className="hero-blob hero-blob--a" aria-hidden="true" />
      <div className="hero-blob hero-blob--b" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <div className="wrap relative py-20">
        <Reveal className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Digital growth agency · UAE → worldwide
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl md:text-7xl">
            Digital growth that{" "}
            <span className="text-accent-fg">actually converts.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-5 text-lg font-medium text-muted md:text-2xl">
            Built for <TypeWriter words={site.builtFor} className="text-fg" />
          </p>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-4 max-w-xl text-muted">
            We design websites, landing pages and campaigns that turn visitors into
            customers — clear pricing, fast delivery, no jargon.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact">
              Book a Strategy Call
              <ArrowRight size={16} />
            </Button>
            <Button href="/services" variant="ghost">
              View Our Services
            </Button>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {site.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={400 + i * 70}>
              <GlassCard className="h-full">
                <p className="text-2xl font-bold text-accent-fg md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted">{stat.label}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="scroll-hint" aria-hidden="true" />
        <span className="sr-only">Scroll down to explore</span>
      </div>
    </section>
  );
}
