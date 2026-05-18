"use client";

import { useEffect } from "react";

/**
 * Single IntersectionObserver that flips `data-revealed="true"` on every
 * element marked `.reveal-on-view`, `.reveal-lines`, or `.reveal-stagger`.
 * One observer for the whole page is cheaper than per-component observers
 * and avoids race conditions with code-split chunks.
 */
export default function RevealAll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll<HTMLElement>(".reveal-on-view, .reveal-lines, .reveal-stagger")
        .forEach((el) => (el.dataset.revealed = "true"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.05 },
    );

    const observe = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal-on-view, .reveal-lines, .reveal-stagger")
        .forEach((el) => {
          if (el.dataset.revealed !== "true") io.observe(el);
        });
    };

    observe();

    // Re-observe when client-only DOM mounts (e.g. WorkIndex toolbar updates).
    const mo = new MutationObserver(() => observe());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
