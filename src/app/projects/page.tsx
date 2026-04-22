import Link from "next/link";
import {
  fetchAllRepos,
  summarizeLanguages,
  type GitHubRepo,
} from "@/lib/github";
import GitHubStats from "@/components/GitHubStats";
import GlassCard from "@/components/GlassCard";
import ProjectGrid from "@/components/ProjectGrid";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "projects · rishith chennupati",
  description: "all of rishith's open source projects, pulled live from github",
};

interface ProjectCardProps {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  pushedAt: string;
}

function toProjectCardProps(repo: GitHubRepo): ProjectCardProps {
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
  const allProjects = visibleRepos.map(toProjectCardProps);

  const totalStars = visibleRepos.reduce((sum, repo) => sum + repo.stars, 0);
  const topLanguages = summarizeLanguages(visibleRepos).slice(0, 6);

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 page-fade-in">
      <div className="mx-auto max-w-6xl">
        <header className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              live from github api
            </span>
          </div>
          <SectionHeading subtitle="pulled live from github · sorted by most recently updated">
            <>
              all <span className="text-gradient">projects</span>
            </>
          </SectionHeading>
        </header>

        <div className="mt-12">
          <GitHubStats
            totalRepos={visibleRepos.length}
            totalStars={totalStars}
            topLanguages={topLanguages}
          />
        </div>

        <div className="mt-16">
          {allProjects.length === 0 ? (
            <GlassCard>
              <div className="space-y-3 text-center">
                <h3 className="text-xl font-semibold text-white">
                  couldn&apos;t reach github right now
                </h3>
                <p className="text-white/65">
                  the live feed didn&apos;t come back. you can still browse
                  everything directly on github.
                </p>
                <div className="pt-2">
                  <Link
                    href="https://github.com/rishith-c"
                    className="glass-button inline-flex items-center gap-2"
                  >
                    visit github.com/rishith-c →
                  </Link>
                </div>
              </div>
            </GlassCard>
          ) : (
            <ProjectGrid projects={allProjects} showFilters />
          )}
        </div>
      </div>
    </main>
  );
}
