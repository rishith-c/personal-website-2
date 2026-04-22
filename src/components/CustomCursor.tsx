"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const RING_SPRING = { damping: 20, stiffness: 150, mass: 0.6 };
const DOT_SPRING = { damping: 25, stiffness: 400, mass: 0.3 };

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, RING_SPRING);
  const ringY = useSpring(y, RING_SPRING);
  const dotX = useSpring(x, DOT_SPRING);
  const dotY = useSpring(y, DOT_SPRING);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      const interactive = !!target?.closest("a, button, [role='button'], input, textarea, select");
      setHovering(interactive);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = hovering ? 56 : 32;
  const dotSize = hovering ? 6 : 8;

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          translateX: ringX,
          translateY: ringY,
          width: ringSize,
          height: ringSize,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[28px] -mt-[28px] rounded-full border border-accent/40 mix-blend-screen transition-[width,height] duration-200"
      />
      <motion.div
        aria-hidden
        style={{
          translateX: dotX,
          translateY: dotY,
          width: dotSize,
          height: dotSize,
          boxShadow: "0 0 14px 4px color-mix(in oklab, var(--accent) 55%, transparent)",
        }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[4px] -mt-[4px] rounded-full bg-accent"
      />
    </>
  );
}
