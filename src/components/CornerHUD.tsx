"use client";

import { useEffect, useState } from "react";

/**
 * Bottom-left HUD pill that mirrors the section indicator on the right —
 * a live-ticking local clock for San Jose with a pulsing dot. Pure chrome,
 * fixed in space, mix-blend so it reads over any section.
 */
export default function CornerHUD() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 left-5 z-30 hidden font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)] mix-blend-difference md:block"
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-bg)]/70 px-3 py-1.5 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg)]/40">
        <span className="size-1 rounded-full bg-[color:var(--color-accent)]" />
        SJC
        <span className="tabular text-[color:var(--color-ink-soft)]">{time}</span>
      </span>
    </div>
  );
}
