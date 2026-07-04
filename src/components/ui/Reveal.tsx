"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms, applied via the --rd CSS variable. */
  delay?: number;
  as?: ElementType;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in-view");
      return;
    }

    // "Near" observer: flags elements approaching the viewport (asset-preload hook).
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.near = "true";
          near.disconnect();
        }
      },
      { rootMargin: "200% 0px" },
    );

    // "Show" observer: triggers the entrance animation.
    const show = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add("in-view");
          show.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    near.observe(el);
    show.observe(el);

    return () => {
      near.disconnect();
      show.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ "--rd": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
