"use client";

import { useId, useMemo, useState } from "react";
import type { GitHubRepo } from "@/lib/github";
import { colorForLanguage } from "@/lib/language-color";
import { formatRelativeTime } from "@/lib/time";

type SortMode = "recent" | "interest" | "stars";

interface WorkIndexProps {
  repos: GitHubRepo[];
  rankedRepos: GitHubRepo[];
  highlight: GitHubRepo | null;
}

const SORT_LABELS: Record<SortMode, string> = {
  recent: "by recent",
  interest: "by interest",
  stars: "by stars",
};

function uniqueLanguages(repos: GitHubRepo[]): string[] {
  const set = new Set<string>();
  for (const repo of repos) {
    if (repo.language) set.add(repo.language);
  }
  return [...set].sort();
}

export default function WorkIndex({ repos, rankedRepos, highlight }: WorkIndexProps) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("interest");
  const [hovered, setHovered] = useState<number | null>(null);
  const searchId = useId();

  const languages = useMemo(() => uniqueLanguages(repos), [repos]);

  const baseList = useMemo(() => {
    if (sortMode === "recent") return repos;
    if (sortMode === "stars") {
      return [...repos].sort((a, b) => b.stars - a.stars || b.pushedAt.localeCompare(a.pushedAt));
    }
    return rankedRepos;
  }, [repos, rankedRepos, sortMode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return baseList.filter((repo) => {
      if (language && repo.language !== language) return false;
      if (!q) return true;
      if (repo.name.toLowerCase().includes(q)) return true;
      if (repo.description?.toLowerCase().includes(q)) return true;
      return repo.topics.some((topic) => topic.toLowerCase().includes(q));
    });
  }, [baseList, query, language]);

  return (
    <section
      id="index"
      aria-labelledby="index-heading"
      className="relative mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* sticky toolbar — sits under the topbar */}
      <div className="sticky top-12 z-30 -mx-5 sm:-mx-8 mb-2 border-y border-[color:var(--color-rule-soft)] bg-[color:var(--color-bg)]/85 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg)]/70">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8">
          <div className="flex items-baseline gap-3">
            <h2
              id="index-heading"
              className="font-[family-name:var(--font-serif)] text-[22px] leading-none text-[color:var(--color-ink)] sm:text-[26px]"
            >
              the index
            </h2>
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-[color:var(--color-ink-mute)]">
              <span className="tabular text-[color:var(--color-ink-soft)]">
                {filtered.length.toString().padStart(2, "0")}
              </span>
              <span className="mx-1">/</span>
              <span className="tabular">{repos.length.toString().padStart(2, "0")}</span>
              {" "}records
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <label htmlFor={searchId} className="sr-only">
              Search projects
            </label>
            <div className="relative">
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="find a project, topic, idea…"
                className="h-9 w-[220px] rounded-sm border border-[color:var(--color-rule)] bg-transparent px-3 font-mono text-[12.5px] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-mute)] focus:border-[color:var(--color-ink)] focus:outline-none"
              />
            </div>

            <div
              role="radiogroup"
              aria-label="Sort"
              className="flex h-9 items-center rounded-sm border border-[color:var(--color-rule)] p-0.5 font-mono text-[11.5px]"
            >
              {(Object.keys(SORT_LABELS) as SortMode[]).map((mode) => {
                const active = sortMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSortMode(mode)}
                    className={`press h-8 rounded-[2px] px-2.5 transition-colors ${
                      active
                        ? "bg-[color:var(--color-ink)] text-[color:var(--color-bg)]"
                        : "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
                    }`}
                  >
                    {SORT_LABELS[mode]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* language rail */}
        {languages.length > 0 ? (
          <div className="mx-auto w-full max-w-[1180px] overflow-x-auto px-5 pb-3 sm:px-8">
            <ul className="flex items-center gap-1.5 whitespace-nowrap">
              <li>
                <button
                  type="button"
                  onClick={() => setLanguage(null)}
                  className={`press rounded-full px-3 py-1 font-mono text-[11.5px] transition-colors ${
                    !language
                      ? "bg-[color:var(--color-ink)] text-[color:var(--color-bg)]"
                      : "border border-[color:var(--color-rule)] text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
                  }`}
                >
                  all
                </button>
              </li>
              {languages.map((lang) => {
                const active = language === lang;
                return (
                  <li key={lang}>
                    <button
                      type="button"
                      onClick={() => setLanguage(active ? null : lang)}
                      className={`press inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11.5px] transition-colors ${
                        active
                          ? "border-transparent bg-[color:var(--color-ink)] text-[color:var(--color-bg)]"
                          : "border-[color:var(--color-rule)] text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
                      }`}
                    >
                      <span
                        className="inline-block size-1.5 rounded-full"
                        style={{ backgroundColor: colorForLanguage(lang) }}
                        aria-hidden
                      />
                      {lang.toLowerCase()}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>

      {/* column header — desktop only */}
      <div className="mt-10 hidden grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.4fr)_7rem_5rem_5rem] items-center gap-6 border-b border-[color:var(--color-rule)] pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-mute)] md:grid">
        <span>№</span>
        <span>name</span>
        <span>description</span>
        <span>language</span>
        <span className="text-right">stars</span>
        <span className="text-right">pushed</span>
      </div>

      {/* rows */}
      <ul className="divide-y divide-[color:var(--color-rule-soft)]">
        {filtered.length === 0 ? (
          <li className="py-14 text-center font-mono text-[13px] text-[color:var(--color-ink-mute)]">
            no records match. try clearing the filter.
          </li>
        ) : (
          filtered.map((repo, i) => (
            <Row
              key={repo.id}
              repo={repo}
              index={i + 1}
              isHovered={hovered === repo.id}
              isHighlight={highlight?.id === repo.id}
              onEnter={() => setHovered(repo.id)}
              onLeave={() => setHovered(null)}
            />
          ))
        )}
      </ul>
    </section>
  );
}

interface RowProps {
  repo: GitHubRepo;
  index: number;
  isHovered: boolean;
  isHighlight: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

function Row({ repo, index, isHovered, isHighlight, onEnter, onLeave }: RowProps) {
  const langColor = colorForLanguage(repo.language);
  const indexLabel = index.toString().padStart(3, "0");
  const visibleTopics = repo.topics.slice(0, 4);
  // Cap stagger so the 30th row doesn't wait a full second.
  const staggerIndex = Math.min(index - 1, 14);

  return (
    <li
      className="reveal-row group relative"
      style={{ ["--i" as never]: staggerIndex }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block py-5 transition-colors duration-150 ease-out hover:bg-[color:var(--color-bg-elevated)]"
        aria-label={`${repo.name} on GitHub — ${repo.description ?? "no description"}`}
      >
        {/* highlight bar on left (only for top-ranked repo) */}
        {isHighlight ? (
          <span
            aria-hidden
            className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-[color:var(--color-accent)] transition-transform duration-300 ease-out group-hover:scale-y-150"
          />
        ) : null}

        {/* desktop row */}
        <div className="hidden grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.4fr)_7rem_5rem_5rem] items-baseline gap-6 px-1 md:grid">
          <span className="tabular font-mono text-[11.5px] text-[color:var(--color-ink-mute)]">
            {indexLabel}
          </span>

          <span className="flex items-baseline gap-2">
            <span className="font-mono text-[15px] tracking-tight text-[color:var(--color-ink)] transition-colors duration-150 group-hover:text-[color:var(--color-accent)]">
              {repo.name.toLowerCase()}
            </span>
            {isHighlight ? (
              <span
                aria-label="featured"
                className="rounded-full border border-[color:var(--color-accent)]/40 px-1.5 py-px text-[9.5px] font-mono uppercase tracking-[0.14em] text-[color:var(--color-accent)]"
              >
                pick
              </span>
            ) : null}
            <span
              aria-hidden
              className="ml-0.5 inline-block translate-x-0 text-[12px] text-[color:var(--color-ink-mute)] opacity-0 transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:opacity-100"
            >
              ↗
            </span>
          </span>

          <span className="line-clamp-2 text-[14.5px] leading-snug text-[color:var(--color-ink-soft)]">
            {repo.description ?? <span className="italic text-[color:var(--color-ink-mute)]">no description</span>}
          </span>

          <span className="flex items-center gap-2 font-mono text-[12px] text-[color:var(--color-ink-soft)]">
            <span
              aria-hidden
              className="inline-block size-1.5 rounded-full"
              style={{ backgroundColor: langColor }}
            />
            {repo.language?.toLowerCase() ?? "—"}
          </span>

          <span className="tabular text-right font-mono text-[12px] text-[color:var(--color-ink-soft)]">
            {repo.stars > 0 ? `★ ${repo.stars}` : <span className="text-[color:var(--color-ink-mute)]">·</span>}
          </span>

          <span className="tabular text-right font-mono text-[12px] text-[color:var(--color-ink-soft)]">
            {formatRelativeTime(repo.pushedAt)}
          </span>
        </div>

        {/* mobile row */}
        <div className="grid grid-cols-[2rem_1fr] gap-x-3 gap-y-1 px-1 md:hidden">
          <span className="tabular pt-1 font-mono text-[11px] text-[color:var(--color-ink-mute)]">
            {indexLabel}
          </span>
          <div className="min-w-0">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[14.5px] text-[color:var(--color-ink)]">
                {repo.name.toLowerCase()}
              </span>
              <span className="tabular shrink-0 font-mono text-[11px] text-[color:var(--color-ink-mute)]">
                {formatRelativeTime(repo.pushedAt)}
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-[13.5px] leading-snug text-[color:var(--color-ink-soft)]">
              {repo.description ?? <span className="italic text-[color:var(--color-ink-mute)]">no description</span>}
            </p>
            <div className="mt-1.5 flex items-center gap-3 font-mono text-[11px] text-[color:var(--color-ink-soft)]">
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-block size-1.5 rounded-full"
                  style={{ backgroundColor: langColor }}
                />
                {repo.language?.toLowerCase() ?? "—"}
              </span>
              {repo.stars > 0 ? <span>★ {repo.stars}</span> : null}
            </div>
          </div>
        </div>

        {/* expanded row — desktop hover reveals topics + homepage */}
        {(visibleTopics.length > 0 || repo.homepage) ? (
          <div
            className="hidden overflow-hidden pl-[3.75rem] pr-6 transition-[grid-template-rows,margin] duration-300 ease-out md:grid"
            style={{
              gridTemplateRows: isHovered ? "1fr" : "0fr",
              marginTop: isHovered ? "0.6rem" : "0rem",
            }}
            aria-hidden={!isHovered}
          >
            <div className="min-h-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11.5px] text-[color:var(--color-ink-mute)]">
                {visibleTopics.map((topic) => (
                  <span key={topic} className="text-[color:var(--color-ink-soft)]">
                    #{topic}
                  </span>
                ))}
                {repo.homepage ? (
                  <span className="text-[color:var(--color-accent)]">
                    → {repo.homepage.replace(/^https?:\/\//, "")}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </a>
    </li>
  );
}
