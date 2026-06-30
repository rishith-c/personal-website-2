"use client";

import { useEffect, useRef } from "react";
import CountUp from "@/components/CountUp";
import OrbCanvas from "@/components/OrbCanvas";

interface SpatialCardProps {
  totalRepos: number;
  totalStars: number;
  languages: number;
  shippedThisYear: number;
}

/**
 * The hero's spatial element: a live 3D orb that tilts toward the cursor while
 * its layers parallax on the Z axis, so the whole card floats above the page.
 * The orb itself is a real-time shader (graphite metal, warm rim, drifting
 * light) and reacts to where you point. A small grid of aggregate public stats
 * sits beneath it. Tilt/parallax gated off on touch + reduced-motion.
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

        {/* live 3D orb */}
        <div
          className="spatial-layer relative mx-auto aspect-square w-full max-w-[230px]"
          style={{ ["--z" as never]: "40px" }}
          aria-hidden
        >
          {/* faint ground halo so the metal reads as sitting in space */}
          <span
            className="pointer-events-none absolute inset-[6%] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklch, var(--color-ink) 9%, transparent), transparent 72%)",
            }}
          />
          <OrbCanvas className="relative drop-shadow-[0_18px_30px_rgba(20,16,16,0.28)]" />

          {/* parallax depth dots floating above the orb */}
          <span className="spatial-layer absolute left-[10%] top-[16%] size-1.5 rounded-full bg-[color:var(--color-ink-mute)]" style={{ ["--z" as never]: "66px" }} />
          <span className="spatial-layer absolute right-[12%] top-[26%] size-1 rounded-full bg-[color:var(--color-rule)]" style={{ ["--z" as never]: "94px" }} />
          <span className="spatial-layer absolute bottom-[12%] left-[22%] size-1 rounded-full bg-[color:var(--color-ink-mute)]" style={{ ["--z" as never]: "80px" }} />
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
