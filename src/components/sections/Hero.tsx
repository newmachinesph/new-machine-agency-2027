import HeroIntro from "@/components/sections/HeroIntro";
import PatternMosaic from "@/components/ui/PatternMosaic";
import PatternTrace from "@/components/ui/PatternTrace";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16">
      <div className="hero-blob hero-blob--a" aria-hidden="true" />
      <div className="hero-blob hero-blob--b" aria-hidden="true" />
      <div className="hero-trace" aria-hidden="true">
        <PatternTrace
          idPrefix="hero"
          className="h-full w-full text-accent-deep opacity-40"
        />
      </div>
      <div className="noise" aria-hidden="true" />

      <HeroIntro />

      <p className="absolute bottom-14 left-6 hidden text-[10px] uppercase tracking-[0.2em] text-muted sm:block">
        Remote-first · Building for founders worldwide
      </p>

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2">
        <div className="scroll-hint" aria-hidden="true" />
        <span className="sr-only">Scroll down to explore</span>
      </div>

      <PatternMosaic rows={1} className="absolute bottom-0 left-0 right-0 h-10 w-full" />
    </section>
  );
}
