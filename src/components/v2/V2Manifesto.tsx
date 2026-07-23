"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const STATEMENT =
  "We don't automate tasks. We build systems that improve themselves — brand, product, and growth wired into one loop.";

/** 002 · Manifesto — plat-form signature scroll word-reveal. Words sit at
 *  16% opacity and resolve to full as the paragraph crosses the viewport.
 *  Driven by one scroll listener via rAF; reduced motion renders static. */
export default function V2Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".v2-word"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress 0→1 while the block travels from 85% to 35% of viewport.
      const t = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.5)));
      const lit = t * words.length;
      words.forEach((w, i) => {
        const p = Math.min(1, Math.max(0, lit - i));
        w.style.setProperty("--p", p.toFixed(2));
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section className="relative py-28 md:py-44">
      <div className="wrap">
        <p
          ref={ref}
          className="v2-display max-w-5xl text-[clamp(1.9rem,4.6vw,4.25rem)]"
        >
          {STATEMENT.split(" ").map((word, i) => (
            <span key={i} className="v2-word">
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
