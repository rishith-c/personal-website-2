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
import SmoothScroll from "@/components/SmoothScroll";
import ScrollHUD from "@/components/ScrollHUD";
import Marquee from "@/components/Marquee";

export const revalidate = 3600;

const TECH_RAIL = [
  "Swift",
  "SwiftUI",
  "Vision",
  "HealthKit",
  "Liquid Glass",
  "Python",
  "PyTorch",
  "OpenAI",
  "MediaPipe",
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind",
  "Supabase",
  "Firebase",
  "C++",
  "Arduino",
  "MAVLink",
  "Raspberry Pi",
];

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

  // Mix language names with the tech rail so the marquee always has range.
  const marqueeItems = [
    ...topLanguages.slice(0, 6).map((l) => l.language),
    ...TECH_RAIL,
  ];

  return (
    <>
      <SmoothScroll />
      <ScrollHUD />
      <TopBar totalRepos={repos.length} />
      <main id="top" className="paper-grid">
        <Hero
          current={current}
          totalRepos={repos.length}
          totalStars={totalStars}
          topLanguages={topLanguages}
          shippedThisYear={shippedThisYear}
        />
        <div className="h-24 sm:h-32" aria-hidden />
        <Marquee items={marqueeItems} />
        <WorkIndex repos={repos} rankedRepos={ranked} highlight={highlight} />
        <NowBlock topLanguages={topLanguages} />
      </main>
      <Colophon />
    </>
  );
}
