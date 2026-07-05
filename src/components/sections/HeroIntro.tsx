"use client";

import * as m from "motion/react-m";
import { useReducedMotion, type Variants } from "motion/react";
import { IconArrowRight, IconCheck } from "@/components/ui/icons";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";
import TypeWriter from "@/components/ui/TypeWriter";
import VideoEmbed from "@/components/ui/VideoEmbed";
import PatternGrid from "@/components/ui/PatternGrid";

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

const trust = ["Full lifecycle", "Remote-first", "Fixed pricing"];

export default function HeroIntro() {
  const reduced = useReducedMotion();

  return (
    <m.div
      className="wrap relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.9fr] lg:gap-16 lg:py-20"
      variants={container}
      initial={reduced ? false : "hidden"}
      animate="show"
    >
      {/* LEFT — copy */}
      <div>
        <m.div variants={item} className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Full-lifecycle studio · Remote-first
          </span>
        </m.div>

        <m.h1
          variants={item}
          className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl 2xl:text-8xl"
        >
          Digital <span className="text-outline">growth</span> that{" "}
          <span className="text-accent-fg">actually converts.</span>
        </m.h1>

        <m.p variants={item} className="mt-6 text-lg font-medium text-fg/80 md:text-2xl">
          Built for <TypeWriter words={site.builtFor} className="text-fg" />
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

        <m.ul
          variants={item}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
        >
          {trust.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <IconCheck size={16} className="text-accent-fg" />
              {point}
            </li>
          ))}
        </m.ul>
      </div>

      {/* RIGHT — framed hero visual (PatternGrid peeks behind for depth) */}
      <m.div variants={item} className="relative">
        <PatternGrid
          cols={4}
          rows={4}
          className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 opacity-25 sm:h-52 sm:w-52"
        />
        <div className="beam chamfer relative border border-border bg-surface p-2">
          <VideoEmbed id={site.videoId} title="Nomad Media — how we build" priority />
        </div>
      </m.div>
    </m.div>
  );
}
