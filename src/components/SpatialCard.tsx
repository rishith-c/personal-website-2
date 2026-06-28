"use client";

import { useEffect, useRef } from "react";
import { formatRelativeTime } from "@/lib/time";
import type { GitHubRepo } from "@/lib/github";
import CountUp from "@/components/CountUp";

interface SpatialCardProps {
  current: GitHubRepo | null;
  totalRepos: number;
  totalStars: number;
  languages: number;
  shippedThisYear: number;
}

// Deterministic "commit cadence" bars — flavour, not real data.
const BARS = [4, 7, 3, 9, 6, 8, 5, 11, 7, 10, 6, 9, 4, 8, 12, 7];

/**
 * The hero's spatial element: a floating "build console" card that tilts in
 * 3D toward the cursor, with its inner layers parallaxing on the Z axis so
 * the content feels like it's sitting in space above the page. Holds the
 * live status + the headline stats + a commit-cadence sparkline. Tilt is
 * gated off on touch + reduced-motion (it just sits flat).
 */
export default function SpatialCard({
  current,
  totalRepos,
  totalStars,
  languages,
  shippedThisYear,
}: SpatialCardProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fineHover || reduced) return;

    let raf = 0;
    let tx = 0, ty = 0; // target rot
    let cx = 0, cy = 0; // current rot

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      card.style.setProperty("--rx", `${cy.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${cx.toFixed(2)}deg`);
      // light glare follows the tilt
      card.style.setProperty("--gx", `${(50 + cx * 4).toFixed(1)}%`);
      card.style.setProperty("--gy", `${(50 - cy * 4).toFixed(1)}%`);
      if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tx = Math.max(-1, Math.min(1, px)) * 9;
      ty = Math.max(-1, Math.min(1, py)) * 9;
      card.dataset.lift = "true";
      start();
    };
    const onLeave = () => {
      tx = 0; ty = 0;
      card.dataset.lift = "false";
      start();
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const label = current
    ? `${current.name.toLowerCase()}`
    : "between commits";
  const when = current ? formatRelativeTime(current.pushedAt) : "—";

  return (
    <div
      ref={wrapRef}
      className="fade-up spatial-perspective self-start sm:max-w-[320px]"
      style={{ ["--i" as never]: 7 }}
    >
      <div ref={cardRef} className="spatial-card group relative rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-bg-elevated)]/80 p-5 backdrop-blur-md">
        {/* glare */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--gx,50%) var(--gy,50%), color-mix(in oklch, var(--color-ink) 7%, transparent), transparent 60%)",
          }}
        />

        {/* floating accent badge — deepest layer, pops most */}
        <span
          aria-hidden
          className="spatial-layer absolute -right-2 -top-2 inline-flex size-7 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-[10px] font-mono text-[color:var(--color-accent-ink)] shadow-lg"
          style={{ ["--z" as never]: "70px" }}
        >
          ●
        </span>

        {/* status row */}
        <div className="spatial-layer flex items-center justify-between" style={{ ["--z" as never]: "48px" }}>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
            <span className="pulse-dot" aria-hidden /> Now building
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">live</span>
        </div>
        <div className="spatial-layer mt-1.5" style={{ ["--z" as never]: "44px" }}>
          <p className="font-[family-name:var(--font-serif)] text-[24px] leading-none text-[color:var(--color-ink)]">
            {label}
          </p>
          <p className="mt-1 font-mono text-[11.5px] text-[color:var(--color-ink-mute)]">
            last push · {when}
          </p>
        </div>

        {/* sparkline */}
        <div className="spatial-layer mt-4" style={{ ["--z" as never]: "34px" }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
            Commit cadence
          </p>
          <div className="mt-2 flex h-9 items-end gap-[3px]" aria-hidden>
            {BARS.map((h, i) => (
              <span
                key={i}
                className="spark-bar flex-1 rounded-[1px] bg-[color:var(--color-rule)] group-hover:bg-[color:var(--color-ink-mute)]"
                style={{ height: `${(h / 12) * 100}%`, ["--d" as never]: `${i * 45}ms` }}
              />
            ))}
          </div>
        </div>

        {/* stat grid */}
        <dl className="spatial-layer mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[color:var(--color-rule-soft)] pt-4 font-mono" style={{ ["--z" as never]: "24px" }}>
          {[
            { k: "Repos", v: totalRepos },
            { k: "Stars", v: totalStars },
            { k: "Languages", v: languages },
            { k: "Shipped '26", v: shippedThisYear },
          ].map((s) => (
            <div key={s.k}>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
                {s.k}
              </dt>
              <dd className="mt-1 text-[20px] text-[color:var(--color-ink)] tabular">
                <CountUp to={s.v} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
