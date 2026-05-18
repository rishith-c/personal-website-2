"use client";

import { useEffect, useRef } from "react";

interface RevealParagraphProps {
  text: string;
  lead?: string;
  className?: string;
}

/**
 * Word-level scroll-scrubbed reveal. Modern browsers use native
 * `animation-timeline: view()` (CSS-only, hardware-accelerated). Older
 * browsers without that API fall back to an IntersectionObserver that
 * snap-reveals the whole paragraph once it enters the viewport.
 *
 * `lead` is an optional bold serif opener used for the call-out sentence.
 */
export default function RevealParagraph({ text, lead, className }: RevealParagraphProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const words = text.split(/\s+/);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const supportsTimeline =
      typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()");
    if (supportsTimeline) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "-15% 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <p ref={ref} className={`reveal-paragraph ${className ?? ""}`}>
      {lead ? (
        <span className="reveal-word font-[family-name:var(--font-serif)] text-[26px] italic leading-none text-[color:var(--color-ink)]">
          {lead}
        </span>
      ) : null}
      {lead ? " " : null}
      {words.map((word, i) => (
        <span key={i} className="reveal-word">
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
