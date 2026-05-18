"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Mount-once Lenis driver. Replaces native scroll with momentum-interpolated
 * scroll across the whole page. Required for the rest of the scroll-driven
 * effects (word reveals, marquee, progress bar) to feel intentional rather
 * than juddery.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("lenis-smooth");

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.05,
      wheelMultiplier: 1,
      smoothWheel: true,
      // The strong-ease curve we use everywhere else.
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor links still feel native — let Lenis own them.
    const onAnchor = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -64 });
    };
    document.addEventListener("click", onAnchor);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-smooth");
    };
  }, []);

  return null;
}
