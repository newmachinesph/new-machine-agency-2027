"use client";

import * as m from "motion/react-m";
import { useReducedMotion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import TypeWriter from "@/components/ui/TypeWriter";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroIntro() {
  const reduced = useReducedMotion();

  return (
    <m.div
      className="wrap relative py-20"
      variants={container}
      initial={reduced ? false : "hidden"}
      animate="show"
    >
      <m.div variants={item} className="flex items-center gap-2.5">
        <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Digital growth agency · UAE → worldwide
        </span>
      </m.div>

      <m.h1
        variants={item}
        className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl md:text-8xl"
      >
        Digital <span className="text-outline">growth</span> that{" "}
        <span className="text-accent-fg">actually converts.</span>
      </m.h1>

      <m.p variants={item} className="mt-5 text-lg font-medium text-muted md:text-2xl">
        Built for <TypeWriter words={site.builtFor} className="text-fg" />
      </m.p>

      <m.p variants={item} className="mt-4 max-w-xl text-muted">
        We design websites, landing pages and campaigns that turn visitors into
        customers — clear pricing, fast delivery, no jargon.
      </m.p>

      <m.div variants={item} className="mt-8 flex flex-wrap gap-4">
        <Button href="/contact">
          Book a Strategy Call
          <ArrowRight size={16} />
        </Button>
        <Button href="/services" variant="ghost">
          View Our Services
        </Button>
      </m.div>

      <m.div variants={item} className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {site.stats.map((stat) => (
          <GlassCard key={stat.label} className="h-full">
            <p className="font-display text-2xl font-bold text-accent-fg md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted">{stat.label}</p>
          </GlassCard>
        ))}
      </m.div>
    </m.div>
  );
}
