"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  pad?: number;
  durationMs?: number;
  className?: string;
}

/**
 * Mounts at 0, animates to `to` once when the element scrolls into view.
 * Tabular-nums + a single rAF loop so it never thrashes layout.
 */
export default function CountUp({
  to,
  pad = 2,
  durationMs = 1200,
  className,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || startedRef.current) continue;
          startedRef.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / durationMs);
            // strong ease-out
            const eased = 1 - Math.pow(1 - p, 4);
            setValue(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {value.toString().padStart(pad, "0")}
    </span>
  );
}
