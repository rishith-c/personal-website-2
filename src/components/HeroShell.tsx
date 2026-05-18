"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps the hero and applies a scroll-driven "scale + fade away" effect
 * once the user starts scrolling past it. The actual transform is
 * expressed in CSS — this just streams the progress value into the
 * --hero-progress custom property inside a single rAF tick.
 */
export default function HeroShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pending = false;
    let raf = 0;

    const compute = () => {
      pending = false;
      const rect = node.getBoundingClientRect();
      const distance = -rect.top;
      // Spread the effect over ~70vh of scroll so it stays smooth.
      const span = window.innerHeight * 0.7;
      const p = Math.min(1, Math.max(0, distance / span));
      node.style.setProperty("--hero-progress", p.toFixed(3));
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div ref={ref} className="hero-shell">
      {children}
    </div>
  );
}
