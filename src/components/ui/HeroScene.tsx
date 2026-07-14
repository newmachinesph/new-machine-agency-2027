"use client";

import { useEffect, useRef } from "react";

/**
 * Hero visual: a slowly rotating wireframe "machine" — a chamfer-faceted
 * icosahedral core inside a shell of square particles, in the brand sage
 * green. three.js is dynamically imported so it stays out of the initial
 * bundle and never runs on the server. Pointer moves parallax the lattice;
 * prefers-reduced-motion renders a single static frame with no RAF loop.
 */
export default function HeroScene({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || typeof window === "undefined") return;

    let cancelled = false;
    let cleanup = () => {};

    void (async () => {
      const T = await import("three");
      if (cancelled || !mountRef.current) return;
      const host = mountRef.current;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Brand accent (hex) from the live theme, with a sage fallback.
      const accentRaw = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-fg")
        .trim();
      let accent = new T.Color("#8fc57f");
      try {
        if (accentRaw) accent = new T.Color(accentRaw);
      } catch {
        /* keep fallback */
      }

      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 4.2;

      const renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      host.appendChild(renderer.domElement);

      const group = new T.Group();
      scene.add(group);

      const disposables: Array<{ dispose: () => void }> = [];

      // Outer faceted core — chamfer-style edges.
      const outerGeo = new T.IcosahedronGeometry(1.25, 1);
      const outerEdges = new T.EdgesGeometry(outerGeo);
      const outerMat = new T.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.55 });
      const outer = new T.LineSegments(outerEdges, outerMat);
      group.add(outer);
      disposables.push(outerGeo, outerEdges, outerMat);

      // Inner core, counter-rotating for depth.
      const innerGeo = new T.IcosahedronGeometry(0.62, 0);
      const innerEdges = new T.EdgesGeometry(innerGeo);
      const innerMat = new T.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.85 });
      const inner = new T.LineSegments(innerEdges, innerMat);
      group.add(inner);
      disposables.push(innerGeo, innerEdges, innerMat);

      // Particle shell — square points (no circles, on brand).
      const COUNT = 260;
      const positions = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) {
        // Fibonacci sphere for even distribution, jittered radius.
        const t = i / COUNT;
        const phi = Math.acos(1 - 2 * t);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = 1.9 + (i % 7) * 0.05;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const pointsGeo = new T.BufferGeometry();
      pointsGeo.setAttribute("position", new T.BufferAttribute(positions, 3));
      const pointsMat = new T.PointsMaterial({
        color: accent,
        size: 0.03,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.9,
      });
      const points = new T.Points(pointsGeo, pointsMat);
      group.add(points);
      disposables.push(pointsGeo, pointsMat);

      group.rotation.set(0.4, 0.2, 0);

      // Pointer parallax targets (normalized -1..1).
      let targetX = 0.2;
      let targetY = 0.4;
      let curX = 0.2;
      let curY = 0.4;

      function onPointerMove(e: PointerEvent) {
        const rect = host.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8 + 0.2;
        targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8 + 0.4;
      }
      if (!reduced) window.addEventListener("pointermove", onPointerMove, { passive: true });

      let raf = 0;
      function render() {
        curX += (targetX - curX) * 0.04;
        curY += (targetY - curY) * 0.04;
        group.rotation.y += 0.0016;
        group.rotation.x = curY;
        group.rotation.z = curX * 0.15;
        inner.rotation.y -= 0.006;
        inner.rotation.x += 0.003;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      }

      if (reduced) {
        renderer.render(scene, camera);
      } else {
        raf = requestAnimationFrame(render);
      }

      const ro = new ResizeObserver(() => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        if (reduced) renderer.render(scene, camera);
      });
      ro.observe(host);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
        if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
