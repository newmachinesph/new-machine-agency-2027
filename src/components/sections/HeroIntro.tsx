"use client";

import * as m from "motion/react-m";
import { useReducedMotion, type Variants } from "motion/react";
import { IconArrowRight } from "@/components/ui/icons";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";
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
          Full-lifecycle startup studio · Remote-first, worldwide
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
        From brand to build to launch to growth to scale — clear pricing,
        fast delivery, no jargon.
      </m.p>

      <m.div variants={item} className="mt-8 flex flex-wrap gap-4">
        <Button href="/contact">
          Book a Strategy Call
          <IconArrowRight size={16} />
        </Button>
        <Button href="/services" variant="ghost">
          View Our Services
        </Button>
      </m.div>
    </m.div>
  );
}
