"use client";

import { type ReactNode } from "react";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
};

export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <m.div
      className={className || undefined}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </m.div>
  );
}
