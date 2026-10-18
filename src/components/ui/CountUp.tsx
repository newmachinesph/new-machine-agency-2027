"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type CountUpProps = {
  value: string;
  className?: string;
  durationMs?: number;
};

type Parsed = { prefix: string; target: number; decimals: number; suffix: string };

/** "+214%" → {prefix:"+", target:214, decimals:0, suffix:"%"}; "2.5×" → decimals 1. */
function parse(value: string): Parsed | null {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return null;
  const [, prefix, num, suffix] = match;
  const dot = num.indexOf(".");
  return { prefix, target: parseFloat(num), decimals: dot === -1 ? 0 : num.length - dot - 1, suffix };
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts a stat value up from zero the first time it scrolls into view.
 * SSR renders the final value (no CLS, works without JS); reduced motion
 * leaves it static. Renders an inline span, so it drops into any heading.
 */
export default function CountUp({ value, className, durationMs = 1400 }: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduced) return;
    const parsed = parse(value);
    const el = ref.current;
    if (!parsed || !el) return;

    let raf = 0;
    let start = 0;
    const format = (n: number) => `${parsed.prefix}${n.toFixed(parsed.decimals)}${parsed.suffix}`;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / durationMs);
      setDisplay(format(parsed.target * easeOutExpo(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          setDisplay(format(0));
          raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, reduced, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
