"use client";

import { useEffect, useRef } from "react";
import CountUp from "@/components/CountUp";

interface SpatialCardProps {
  totalRepos: number;
  totalStars: number;
  languages: number;
  shippedThisYear: number;
}

/**
 * The hero's spatial element: an abstract object that tilts in 3D toward the
 * cursor, its layers parallaxing on the Z axis so it floats above the page.
 * Deliberately abstract — concentric geometry, a slow-rotating ring of ticks
 * and a drifting accent node. No project data, nothing about current work;
 * just a calm generative mark. A small grid of aggregate public stats sits
 * beneath it. Tilt/parallax gated off on touch + reduced-motion.
 */
export default function SpatialCard({
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
    let tx = 0, ty = 0;
    let cx = 0, cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      card.style.setProperty("--rx", `${cy.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${cx.toFixed(2)}deg`);
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

  // 32 ticks around a ring for the rotating dial.
  const ticks = Array.from({ length: 32 }, (_, i) => i);

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

        {/* floating accent node — deepest layer, pops most */}
        <span
          aria-hidden
          className="spatial-layer absolute -right-2 -top-2 size-4 rounded-full bg-[color:var(--color-accent)] shadow-lg"
          style={{ ["--z" as never]: "72px" }}
        />

        {/* abstract object */}
        <div
          className="spatial-layer relative mx-auto aspect-square w-full max-w-[230px]"
          style={{ ["--z" as never]: "40px" }}
          aria-hidden
        >
          <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
            {/* concentric rings */}
            <circle cx="100" cy="100" r="86" fill="none" stroke="var(--color-rule)" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="var(--color-rule)" strokeWidth="1" />
            <circle cx="100" cy="100" r="34" fill="none" stroke="var(--color-rule-soft)" strokeWidth="1" />

            {/* rotating tick dial */}
            <g className="abstract-spin" style={{ transformOrigin: "100px 100px" }}>
              {ticks.map((i) => {
                const a = (i / ticks.length) * Math.PI * 2;
                const long = i % 4 === 0;
                const r1 = long ? 70 : 76;
                const r2 = 82;
                return (
                  <line
                    key={i}
                    x1={100 + Math.cos(a) * r1}
                    y1={100 + Math.sin(a) * r1}
                    x2={100 + Math.cos(a) * r2}
                    y2={100 + Math.sin(a) * r2}
                    stroke={long ? "var(--color-ink-mute)" : "var(--color-rule)"}
                    strokeWidth="1"
                  />
                );
              })}
            </g>

            {/* counter-rotating square */}
            <rect
              x="64" y="64" width="72" height="72"
              fill="none" stroke="var(--color-ink-mute)" strokeWidth="1"
              className="abstract-spin-rev"
              style={{ transformOrigin: "100px 100px" }}
            />

            {/* crosshair */}
            <line x1="100" y1="6" x2="100" y2="22" stroke="var(--color-rule)" strokeWidth="1" />
            <line x1="100" y1="178" x2="100" y2="194" stroke="var(--color-rule)" strokeWidth="1" />
            <line x1="6" y1="100" x2="22" y2="100" stroke="var(--color-rule)" strokeWidth="1" />
            <line x1="178" y1="100" x2="194" y2="100" stroke="var(--color-rule)" strokeWidth="1" />

            {/* core */}
            <circle cx="100" cy="100" r="3" fill="var(--color-ink)" />

            {/* orbiting accent node */}
            <g className="abstract-orbit" style={{ transformOrigin: "100px 100px" }}>
              <circle cx="160" cy="100" r="4.5" fill="var(--color-accent)" />
            </g>
          </svg>

          {/* parallax depth dots floating above the object */}
          <span className="spatial-layer absolute left-[12%] top-[20%] size-1.5 rounded-full bg-[color:var(--color-ink-mute)]" style={{ ["--z" as never]: "60px" }} />
          <span className="spatial-layer absolute right-[16%] top-[30%] size-1 rounded-full bg-[color:var(--color-rule)]" style={{ ["--z" as never]: "90px" }} />
          <span className="spatial-layer absolute bottom-[18%] left-[26%] size-1 rounded-full bg-[color:var(--color-ink-mute)]" style={{ ["--z" as never]: "78px" }} />
        </div>

        {/* aggregate public stats */}
        <dl className="spatial-layer mt-3 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[color:var(--color-rule-soft)] pt-4 font-mono" style={{ ["--z" as never]: "24px" }}>
          {[
            { k: "Public repos", v: totalRepos },
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
