"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LERP = 0.15;
const LOADING_SAFETY_MS = 4000;

export default function CustomCursor() {
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setActive(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!active) {
      delete document.documentElement.dataset.cursor;
      return;
    }

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    document.documentElement.dataset.cursor = "on";

    let tx = 0;
    let ty = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    let started = false;
    let loadingTimer = 0;

    const loop = () => {
      rx += (tx - rx) * LERP;
      ry += (ty - ry) * LERP;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      if (!started) {
        started = true;
        rx = tx;
        ry = ty;
        root.classList.add("cursor-live");
        loop();
      }
    };

    const onLeave = () => root.classList.remove("cursor-live");
    const onEnter = () => {
      if (started) root.classList.add("cursor-live");
    };
    const onDown = () => root.classList.add("is-down");
    const onUp = () => root.classList.remove("is-down");

    const onOver = (e: MouseEvent) => {
      const target = e.target;
      if (
        target instanceof Element &&
        target.closest("a,button,[role=button],input,textarea,select,label")
      ) {
        root.classList.add("is-hover");
      } else {
        root.classList.remove("is-hover");
      }
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor || anchor.target === "_blank") return;
      if (anchor.origin !== window.location.origin) return;
      if (anchor.pathname === window.location.pathname) return;
      root.classList.add("is-loading");
      window.clearTimeout(loadingTimer);
      loadingTimer = window.setTimeout(
        () => root.classList.remove("is-loading"),
        LOADING_SAFETY_MS,
      );
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(loadingTimer);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("click", onClick);
      root.classList.remove("cursor-live", "is-hover", "is-down", "is-loading");
      delete document.documentElement.dataset.cursor;
    };
  }, [active]);

  // Route change completed. Stop the loading spinner.
  useEffect(() => {
    rootRef.current?.classList.remove("is-loading");
  }, [pathname]);

  if (!active) return null;

  return (
    <div ref={rootRef} aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
