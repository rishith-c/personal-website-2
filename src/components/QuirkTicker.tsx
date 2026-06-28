"use client";

import { useEffect, useState } from "react";

/**
 * A small, fun status line that cycles through quirky one-liners. Lives in
 * the hero as a wink — mono type, comment-style `//` prefix, a blinking
 * cursor. Crossfades between lines and pauses if the tab is hidden.
 */
const QUIPS = [
  "currently bottlenecked by the school bell",
  "ships features faster than homework gets done",
  "powered by curiosity and far too many open tabs",
  "yes, actually 15. no, not slowing down",
  "will trade sleep for a green build",
  "thinks in Swift, dreams in solder",
  "0 → demo in one caffeine-fuelled weekend",
  "if it doesn't exist yet, that's the fun part",
];

export default function QuirkTicker() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    let outTimer: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      if (document.hidden) return;
      setShown(false);
      outTimer = setTimeout(() => {
        setI((prev) => (prev + 1) % QUIPS.length);
        setShown(true);
      }, 360);
    }, 3600);

    return () => {
      clearInterval(cycle);
      clearTimeout(outTimer);
    };
  }, []);

  return (
    <p
      className="fade-up mt-6 inline-flex items-center gap-2 font-mono text-[12.5px] text-[color:var(--color-ink-mute)]"
      style={{ ["--i" as never]: 4 }}
      aria-live="polite"
    >
      <span className="text-[color:var(--color-rule)]" aria-hidden>
        //
      </span>
      <span
        className="transition-all duration-300 ease-out"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(4px)",
        }}
      >
        {QUIPS[i]}
      </span>
      <span className="quirk-caret inline-block h-[1.05em] w-[1.5px] translate-y-[0.15em] bg-[color:var(--color-accent)]" aria-hidden />
    </p>
  );
}
