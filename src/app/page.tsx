import {
  fetchAllRepos,
  rankRepos,
  summarizeLanguages,
} from "@/lib/github";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import WorkIndex from "@/components/WorkIndex";
import NowBlock from "@/components/NowBlock";
import Colophon from "@/components/Colophon";

export const revalidate = 3600;

export default async function HomePage() {
  const repos = await fetchAllRepos();
  const ranked = rankRepos(repos);
  const topLanguages = summarizeLanguages(repos);
  const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);
  const current = repos[0] ?? null;
  const highlight = ranked[0] ?? null;

  const thisYear = new Date().getFullYear();
  const shippedThisYear = repos.filter(
    (repo) => new Date(repo.createdAt).getFullYear() === thisYear,
  ).length;

  return (
    <>
      <TopBar totalRepos={repos.length} />
      <main className="paper-grid">
        <Hero
          current={current}
          totalRepos={repos.length}
          totalStars={totalStars}
          topLanguages={topLanguages}
          shippedThisYear={shippedThisYear}
        />
        <WorkIndex repos={repos} rankedRepos={ranked} highlight={highlight} />
        <NowBlock topLanguages={topLanguages} />
      </main>
      <Colophon />
    </>
  );
}
