"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
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
          className="v2-counter uppercase"
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
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-accent px-7 py-4 font-semibold text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
          >
            Book a strategy call
            <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 border border-border px-7 py-4 font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
          >
            See the numbers
          </Link>
        </m.div>
      </div>

      <m.div {...enter(4)} className="relative border-t border-border py-5">
        <div className="v2-marquee" aria-hidden="true">
          <div className="v2-marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-14">
                {INDUSTRIES.map((label) => (
                  <span
                    key={label}
                    className="flex items-center gap-14 font-display text-sm uppercase tracking-[0.18em] text-muted"
                  >
                    {label}
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent/60" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="sr-only">
          Built for clinics, real estate, SMEs, startups, marketplaces, retail,
          AI SaaS, and home services.
        </p>
      </m.div>
    </section>
  );
}
