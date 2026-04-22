"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import ProjectCard, { type ProjectCardProps } from "@/components/ProjectCard";

interface ProjectGridProps {
  projects: ProjectCardProps[];
  showFilters?: boolean;
}

const ALL_LANGUAGES = "all";

function uniqueLanguages(projects: ProjectCardProps[]): string[] {
  const set = new Set<string>();
  for (const p of projects) {
    if (p.language) set.add(p.language);
  }
  return Array.from(set).sort();
}

function matchesQuery(project: ProjectCardProps, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  if (project.name.toLowerCase().includes(q)) return true;
  if (project.description?.toLowerCase().includes(q)) return true;
  return project.topics.some((t) => t.toLowerCase().includes(q));
}

export default function ProjectGrid({ projects, showFilters = false }: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState<string>(ALL_LANGUAGES);

  const languages = useMemo(() => uniqueLanguages(projects), [projects]);

  const visibleProjects = useMemo(() => {
    return projects.filter((p) => {
      if (activeLanguage !== ALL_LANGUAGES && p.language !== activeLanguage) return false;
      return matchesQuery(p, searchQuery);
    });
  }, [projects, activeLanguage, searchQuery]);

  return (
    <section className="flex flex-col gap-6">
      {showFilters ? (
        <div className="flex flex-col gap-4">
          <label className="glass-subtle flex items-center gap-3 px-4 py-2.5 rounded-full">
            <Search size={15} strokeWidth={1.75} className="text-white/40" aria-hidden />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search projects, topics, descriptions..."
              className="flex-1 bg-transparent text-sm text-white/90 placeholder:text-white/30 focus:outline-none"
              aria-label="Search projects"
            />
          </label>

          {languages.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <FilterChip
                label="all"
                active={activeLanguage === ALL_LANGUAGES}
                onClick={() => setActiveLanguage(ALL_LANGUAGES)}
              />
              {languages.map((lang) => (
                <FilterChip
                  key={lang}
                  label={lang}
                  active={activeLanguage === lang}
                  onClick={() => setActiveLanguage(lang)}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="font-mono text-xs text-white/40">
        showing {visibleProjects.length} of {projects.length} project{projects.length === 1 ? "" : "s"}
      </p>

      {visibleProjects.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center">
          <p className="text-white/60">no projects match your filters.</p>
          <p className="mt-2 text-sm text-white/30">try clearing the search or selecting another language.</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.url}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <ProjectCard {...project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
        active
          ? "bg-[#4ade80]/15 text-[#4ade80] ring-1 ring-[#4ade80]/40"
          : "glass-subtle text-white/50 hover:text-white/80"
      }`}
    >
      {label.toLowerCase()}
    </button>
  );
}
