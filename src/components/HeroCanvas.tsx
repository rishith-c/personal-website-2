"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive ink-dot field that sits behind the hero statement. A loose
 * lattice of small dots drifts slowly and is gently nudged away from the
 * cursor — the ones nearest the pointer warm to the accent colour. Drawn on
 * a single canvas, paused entirely under prefers-reduced-motion. Purely
 * decorative: pointer-events are off and it lives below the text.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const inkRaw = css.getPropertyValue("--color-ink-mute").trim() || "#888";
    const accentRaw = css.getPropertyValue("--color-accent").trim() || "#d23";

    type Dot = { x: number; y: number; ox: number; oy: number; r: number; p: number };
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;

    // Pointer in CSS pixels; starts off-screen so nothing reacts until moved.
    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = w < 640 ? 46 : 58;
      dots = [];
      for (let y = gap * 0.5; y < h; y += gap) {
        for (let x = gap * 0.5; x < w; x += gap) {
          // Deterministic jitter so it's stable across resizes.
          const j = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          const jitter = (j - Math.floor(j) - 0.5) * gap * 0.5;
          dots.push({
            x: x + jitter,
            y: y + jitter,
            ox: x + jitter,
            oy: y + jitter,
            r: 0.9 + (Math.abs(jitter) / gap) * 1.6,
            p: (x + y) * 0.01,
          });
        }
      }
    };

    let raf = 0;
    let t = 0;
    const radius = 150;

    const frame = () => {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        // Slow ambient drift.
        const driftX = Math.sin(t + d.p) * 3;
        const driftY = Math.cos(t * 0.8 + d.p) * 3;
        let px = d.ox + driftX;
        let py = d.oy + driftY;

        // Cursor repulsion + accent warming.
        let warmth = 0;
        if (pointer.active) {
          const dx = px - pointer.x;
          const dy = py - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius && dist > 0.001) {
            const force = (1 - dist / radius) ** 2;
            px += (dx / dist) * force * 26;
            py += (dy / dist) * force * 26;
            warmth = force;
          }
        }

        d.x += (px - d.x) * 0.12;
        d.y += (py - d.y) * 0.12;

        const r = d.r * (1 + warmth * 1.4);
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        if (warmth > 0.01) {
          ctx.fillStyle = accentRaw;
          ctx.globalAlpha = 0.18 + warmth * 0.55;
        } else {
          ctx.fillStyle = inkRaw;
          ctx.globalAlpha = 0.16;
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    frame();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
