import Link from "next/link";
import { Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GitHubStats from "@/components/GitHubStats";
import ProjectGrid from "@/components/ProjectGrid";
import {
  fetchAllRepos,
  summarizeLanguages,
  type GitHubRepo,
} from "@/lib/github";
import type { ProjectCardProps } from "@/components/ProjectCard";

export const metadata = {
  title: "projects · rishith chennupati",
  description: "all of rishith's open source projects, pulled live from github",
};

function toProjectProps(repo: GitHubRepo): ProjectCardProps {
  return {
    name: repo.name,
    description: repo.description,
    url: repo.url,
    homepage: repo.homepage,
    language: repo.language,
    topics: repo.topics,
    stars: repo.stars,
    forks: repo.forks,
    pushedAt: repo.pushedAt,
  };
}

export default async function ProjectsPage() {
  const repos = await fetchAllRepos();
  const visibleRepos = repos.filter((repo) => !repo.isArchived);
  const allProjects = visibleRepos.map(toProjectProps);
  const totalStars = visibleRepos.reduce((sum, repo) => sum + repo.stars, 0);
  const topLanguages = summarizeLanguages(visibleRepos).slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <header className="space-y-4">
        <Badge variant="secondary" className="gap-2 font-mono">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          live from github api
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          all projects
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          every public repo from github.com/rishith-c, sorted by most recently
          updated. data refreshes hourly.
        </p>
      </header>

      <div className="mt-12">
        <GitHubStats
          totalRepos={visibleRepos.length}
          totalStars={totalStars}
          topLanguages={topLanguages}
        />
      </div>

      <Separator className="my-12" />

      {allProjects.length === 0 ? (
        <Card role="alert">
          <CardHeader>
            <CardTitle>couldn&apos;t reach github right now</CardTitle>
            <CardDescription className="text-base">
              the live feed didn&apos;t come back. you can still browse everything
              directly on github.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="https://github.com/rishith-c" target="_blank" rel="noopener noreferrer">
                <Github className="size-4" />
                visit github.com/rishith-c
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ProjectGrid projects={allProjects} showFilters />
      )}
    </div>
  );
}
