"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ProjectCard, { type ProjectCardProps } from "@/components/ProjectCard";

interface ProjectGridProps {
  projects: ProjectCardProps[];
  showFilters?: boolean;
}

const ALL_LANGUAGES = "all";

function uniqueLanguages(projects: ProjectCardProps[]): string[] {
  const set = new Set<string>();
  for (const project of projects) {
    if (project.language) set.add(project.language);
  }
  return [...set].sort();
}

function matchesQuery(project: ProjectCardProps, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  if (project.name.toLowerCase().includes(q)) return true;
  if (project.description?.toLowerCase().includes(q)) return true;
  return project.topics.some((topic) => topic.toLowerCase().includes(q));
}

export default function ProjectGrid({ projects, showFilters = false }: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState<string>(ALL_LANGUAGES);

  const languages = useMemo(() => uniqueLanguages(projects), [projects]);

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeLanguage !== ALL_LANGUAGES && project.language !== activeLanguage) return false;
      return matchesQuery(project, searchQuery);
    });
  }, [projects, activeLanguage, searchQuery]);

  return (
    <section className="flex flex-col gap-6">
      {showFilters ? (
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search projects, topics, descriptions…"
              className="h-11 pl-10 text-base"
              aria-label="Search projects"
            />
          </div>

          {languages.length > 0 ? (
            <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
              <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
                <TabsTrigger
                  value={ALL_LANGUAGES}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  all
                </TabsTrigger>
                {languages.map((lang) => (
                  <TabsTrigger
                    key={lang}
                    value={lang}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {lang.toLowerCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          ) : null}
        </div>
      ) : null}

      <p className="text-sm text-muted-foreground" aria-live="polite">
        showing {visibleProjects.length} of {projects.length}{" "}
        {projects.length === 1 ? "project" : "projects"}
      </p>

      {visibleProjects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-base text-foreground">no projects match your filters.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              try clearing the search or selecting another language.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.url} {...project} />
          ))}
        </div>
      )}
    </section>
  );
}
