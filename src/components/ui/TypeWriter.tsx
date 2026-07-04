"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

const TYPE_MS = 85;
const DELETE_MS = 45;
const HOLD_MS = 1800;
const NEXT_WORD_MS = 400;

type TypeWriterProps = {
  words: readonly string[];
  staticText?: string;
  className?: string;
};

export default function TypeWriter({
  words,
  staticText = "Your Business",
  className = "",
}: TypeWriterProps) {
  const [display, setDisplay] = useState("");
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );

  useEffect(() => {
    if (reduced) return;

    let wordIndex = 0;
    let chars = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const current = words[wordIndex] ?? "";
      if (!deleting) {
        chars += 1;
        setDisplay(current.slice(0, chars));
        if (chars >= current.length) {
          deleting = true;
          timer = window.setTimeout(tick, HOLD_MS);
          return;
        }
        timer = window.setTimeout(tick, TYPE_MS);
      } else {
        chars -= 1;
        setDisplay(current.slice(0, chars));
        if (chars <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timer = window.setTimeout(tick, NEXT_WORD_MS);
          return;
        }
        timer = window.setTimeout(tick, DELETE_MS);
      }
    };

    timer = window.setTimeout(tick, 300);
    return () => window.clearTimeout(timer);
  }, [words, reduced]);

  if (reduced) {
    return <span className={className}>{staticText}</span>;
  }

  return (
    <span className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="tw-caret" aria-hidden="true" />
      <span className="sr-only">{staticText}</span>
    </span>
  );
}
