"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fixed-position scroll heads-up display: a thin vertical progress rail on
 * the left edge. Updates inside a single rAF tick to avoid scroll thrash.
 */
export default function ScrollHUD() {
  const [progress, setProgress] = useState(0);
  const railRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let raf = 0;
    let pending = false;

    const compute = () => {
      pending = false;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(p);
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
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-12 z-30 hidden h-[calc(100dvh-3rem)] w-px bg-[color:var(--color-rule-soft)] md:block"
      >
        <span
          ref={railRef}
          className="block w-px origin-top bg-[color:var(--color-ink)] transition-transform duration-100 ease-out"
          style={{
            height: "100%",
            transform: `scaleY(${progress})`,
          }}
        />
      </div>
    </>
  );
}
