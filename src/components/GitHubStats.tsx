"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, Star, Code2 } from "lucide-react";

interface LanguageEntry {
  language: string;
  count: number;
}

interface GitHubStatsProps {
  totalRepos: number;
  totalStars: number;
  topLanguages: LanguageEntry[];
}

interface StatCardProps {
  label: string;
  value: number;
  Icon: typeof Star;
  accent: string;
  inView: boolean;
}

const COUNT_DURATION_MS = 1200;

function useAnimatedCount(target: number, run: boolean): number {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!run || startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / COUNT_DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);

  return value;
}

function StatCard({ label, value, Icon, accent, inView }: StatCardProps) {
  const animated = useAnimatedCount(value, inView);
  return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-white/40">{label}</span>
        <Icon size={16} strokeWidth={1.75} style={{ color: accent }} aria-hidden />
      </div>
      <motion.span
        aria-live="polite"
        className="text-4xl font-light tracking-tight text-white/90"
        style={{ textShadow: `0 0 24px color-mix(in oklab, ${accent} 20%, transparent)` }}
      >
        {animated.toLocaleString()}
      </motion.span>
    </div>
  );
}

export default function GitHubStats({ totalRepos, totalStars, topLanguages }: GitHubStatsProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="repositories" value={totalRepos} Icon={GitBranch} accent="var(--accent)" inView={inView} />
        <StatCard label="total stars" value={totalStars} Icon={Star} accent="var(--accent-2)" inView={inView} />
        <StatCard label="languages" value={topLanguages.length} Icon={Code2} accent="var(--accent-3)" inView={inView} />
      </div>

      {topLanguages.length > 0 ? (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-white/40">top languages</span>
          <ul className="flex flex-wrap gap-2">
            {topLanguages.slice(0, 6).map((entry) => (
              <li key={entry.language}>
                <span className="lang-badge">
                  {entry.language}
                  <span className="ml-2 text-white/40">{entry.count}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
