"use client";

import { motion } from "framer-motion";
import { Star, GitFork, Github, ExternalLink } from "lucide-react";

export interface ProjectCardProps {
  name: string;
  description: string | null;
  url: string;
  homepage?: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  pushedAt: string;
  index?: number;
}

const LANGUAGE_COLORS: Readonly<Record<string, string>> = {
  Swift: "#F05138",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  C: "#555555",
  "C++": "#00599C",
  Java: "#ED8B00",
  Kotlin: "#A97BFF",
  Go: "#00ADD8",
  Rust: "#DEA584",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Shell: "#89E051",
  Vue: "#41B883",
  Dart: "#00B4AB",
  Ruby: "#CC342D",
};

const FALLBACK_LANG_COLOR = "#888888";
const MAX_TOPICS = 6;

function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diffMs = Date.now() - then;
  const sec = Math.max(1, Math.floor(diffMs / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  const yr = Math.floor(day / 365);
  return `${yr}y ago`;
}

export default function ProjectCard({
  name,
  description,
  url,
  homepage,
  language,
  topics,
  stars,
  forks,
  pushedAt,
  index = 0,
}: ProjectCardProps) {
  const langColor = language ? LANGUAGE_COLORS[language] ?? FALLBACK_LANG_COLOR : FALLBACK_LANG_COLOR;
  const visibleTopics = topics.slice(0, MAX_TOPICS);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="glow-card flex h-full flex-col gap-4 p-6 rounded-3xl"
    >
      <header className="flex items-start justify-between gap-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex-1 min-w-0"
        >
          <h3 className="text-lg font-medium tracking-tight text-white/90 lowercase truncate group-hover:text-gradient">
            {name.toLowerCase()}
          </h3>
        </a>
        {language ? (
          <span className="flex items-center gap-1.5 font-mono text-xs text-white/50 shrink-0">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: langColor, boxShadow: `0 0 6px ${langColor}66` }}
            />
            {language}
          </span>
        ) : null}
      </header>

      {description ? (
        <p className="text-sm leading-relaxed text-white/60 line-clamp-3">
          {description}
        </p>
      ) : (
        <p className="text-sm italic text-white/30">no description</p>
      )}

      {visibleTopics.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {visibleTopics.map((topic) => (
            <li key={topic}>
              <span className="lang-badge">{topic}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <footer className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs text-white/40 font-mono">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center gap-1">
            <Star size={12} strokeWidth={1.75} aria-hidden /> {stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={12} strokeWidth={1.75} aria-hidden /> {forks}
          </span>
          <span className="truncate">updated {formatRelativeTime(pushedAt)}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on GitHub`}
            className="text-white/40 hover:text-[#4ade80] transition-colors"
          >
            <Github size={14} strokeWidth={1.75} />
          </a>
          {homepage ? (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} live demo`}
              className="text-white/40 hover:text-[#22d3ee] transition-colors"
            >
              <ExternalLink size={14} strokeWidth={1.75} />
            </a>
          ) : null}
        </div>
      </footer>
    </motion.article>
  );
}
