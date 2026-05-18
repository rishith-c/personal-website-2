"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS: { id: string; label: string }[] = [
  { id: "top", label: "00 — Cover" },
  { id: "index", label: "01 — Index" },
  { id: "now", label: "02 — Now" },
  { id: "contact", label: "03 — Contact" },
];

/**
 * Fixed-position scroll heads-up display:
 *  - thin vertical progress rail on the left edge
 *  - tiny section indicator pill bottom-right that updates with the active id
 *
 * Both update inside a single rAF tick to avoid scroll thrash.
 */
export default function ScrollHUD() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(SECTIONS[0].label);
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

      // Pick the lowest section whose top is above 35% of the viewport.
      const mark = window.innerHeight * 0.35;
      let current = SECTIONS[0];
      for (const section of SECTIONS) {
        if (section.id === "top") continue;
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= mark) current = section;
      }
      setActive(current.label);
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

      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 right-5 z-30 hidden font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)] mix-blend-difference md:block"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-rule)]/0 bg-[color:var(--color-bg)]/70 px-3 py-1.5 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg)]/40">
          <span aria-hidden className="size-1 rounded-full bg-[color:var(--color-accent)]" />
          {active}
          <span aria-hidden className="tabular text-[color:var(--color-ink-mute)]">
            · {Math.round(progress * 100).toString().padStart(2, "0")}%
          </span>
        </span>
      </div>
    </>
  );
}
