"use client";

import * as m from "motion/react-m";
import { useReducedMotion, type Variants } from "motion/react";
import { IconArrowRight } from "@/components/ui/icons";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";
import AccentTick from "@/components/ui/AccentTick";

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
      className="wrap relative flex flex-col gap-12 py-16 lg:gap-16 lg:py-20"
      variants={container}
      initial={reduced ? false : "hidden"}
      animate="show"
    >
      <div className="max-w-3xl">
        <m.div variants={item} className="flex items-center gap-2.5">
          <AccentTick />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Full-lifecycle studio · Remote-first
          </span>
        </m.div>

        <m.h1
          variants={item}
          className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl 2xl:text-8xl"
        >
          We build the <span className="text-image-fill">machine</span> your growth{" "}
          <span className="text-accent-fg">runs on.</span>
        </m.h1>

        <m.p variants={item} className="mt-6 text-lg font-medium text-fg/80 md:text-2xl">
          Built for{" "}
          <span className="text-fg">{site.builtFor.slice(0, 4).join(", ")} &amp; more</span>
        </m.p>

        <m.div variants={item} className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">
            Book a Strategy Call
            <IconArrowRight size={16} />
          </Button>
          <Button href="/work" variant="ghost">
            See the Numbers
          </Button>
        </m.div>
      </div>
    </m.div>
  );
}
