"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const INDUSTRIES = [
  "Clinics",
  "Real Estate",
  "SMEs",
  "Startups",
  "Marketplaces",
  "Retail",
  "AI SaaS",
  "Home Services",
];

/** Marquee Hero — the fold IS the page. Word-level accent on the display,
 *  load-stagger orchestration, industries marquee as the fold's exit line. */
export default function V2Hero() {
  const reduced = useReducedMotion();
  const enter = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay: 0.08 * i },
        };

  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-28 md:pt-32">
      <div className="v2-ground" aria-hidden="true" />
      <div className="v2-dots" aria-hidden="true" />

      <div className="wrap relative flex flex-1 flex-col justify-center py-10">
        <m.p
          {...enter(0)}
          className="font-display text-[13px] uppercase tracking-[0.16em] text-muted"
        >
          Full-lifecycle studio · Makati → worldwide
        </m.p>

        <m.h1
          {...enter(1)}
          className="v2-display mt-8 text-[clamp(2.9rem,8.2vw,8.25rem)]"
        >
          We build the{" "}
          <span className="text-accent">machine</span>
          <br />
          your growth <span className="text-accent">runs on</span>.
        </m.h1>

        <m.p {...enter(2)} className="mt-8 max-w-xl text-lg text-muted">
          Brand, product, and growth — one remote-first team, measured by the
          numbers that move after launch.
        </m.p>

        <m.div {...enter(3)} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/contact" className="px-7 py-4 text-base">
            Book a strategy call
            <IconArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/work" variant="ghost" className="px-7 py-4 text-base">
            See the numbers
          </Button>
        </m.div>
      </div>

      <m.div {...enter(4)} className="relative border-t border-border">
        <ul className="wrap flex flex-wrap items-center gap-x-8 gap-y-2 py-5">
          <li className="font-display text-[11px] uppercase tracking-[0.16em] text-fg/70">
            Built for
          </li>
          {INDUSTRIES.map((label) => (
            <li
              key={label}
              className="font-display text-[11px] uppercase tracking-[0.16em] text-muted"
            >
              {label}
            </li>
          ))}
        </ul>
      </m.div>
    </section>
  );
}
