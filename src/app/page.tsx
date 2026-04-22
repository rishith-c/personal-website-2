import Link from "next/link";
import { ArrowRight, Code, Gamepad2, Mail, Palette, Sparkles } from "lucide-react";
import {
  fetchAllRepos,
  fetchFeaturedRepos,
  summarizeLanguages,
  type GitHubRepo,
} from "@/lib/github";
import AsciiPortrait from "@/components/AsciiPortrait";
import GitHubStats from "@/components/GitHubStats";
import GlassCard from "@/components/GlassCard";
import ParticlesBackground from "@/components/ParticlesBackground";
import ProjectGrid from "@/components/ProjectGrid";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import TypewriterText from "@/components/TypewriterText";

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
  index?: number;
}

interface SkillCard {
  icon: React.ReactNode;
  label: string;
  description: string;
}

interface LanguagePill {
  name: string;
  level: string;
  color: string;
}

const SKILL_CARDS: SkillCard[] = [
  {
    icon: <Code className="h-5 w-5" />,
    label: "ios dev",
    description: "swift, swiftui, swiftdata. apps that feel native.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    label: "ai/ml",
    description: "on-device models, agents, computer vision.",
  },
  {
    icon: <Palette className="h-5 w-5" />,
    label: "full-stack",
    description: "next.js, react, typescript, tailwind.",
  },
  {
    icon: <Gamepad2 className="h-5 w-5" />,
    label: "hardware",
    description: "drones, robotics, arduino, raspberry pi.",
  },
];

const LANGUAGE_PILLS: LanguagePill[] = [
  { name: "swift", level: "advanced", color: "#F05138" },
  { name: "swiftui", level: "advanced", color: "#0071E3" },
  { name: "python", level: "advanced", color: "#3776AB" },
  { name: "typescript", level: "intermediate", color: "#3178C6" },
  { name: "c++", level: "intermediate", color: "#00599C" },
  { name: "java", level: "learning", color: "#ED8B00" },
];

function toProjectCardProps(repo: GitHubRepo, index?: number): ProjectCardProps {
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
    index,
  };
}

export default async function HomePage() {
  const [allRepos, featuredRepos] = await Promise.all([
    fetchAllRepos(),
    fetchFeaturedRepos(),
  ]);

  const totalStars = allRepos.reduce((sum, repo) => sum + repo.stars, 0);
  const topLanguages = summarizeLanguages(allRepos).slice(0, 6);
  const featured = featuredRepos.map((repo, index) => toProjectCardProps(repo, index));

  return (
    <main className="relative min-h-screen page-fade-in">
      {/* hero */}
      <section className="relative flex min-h-screen items-center px-6 py-24">
        <ParticlesBackground />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <AsciiPortrait />
          </div>
          <div className="order-1 lg:order-2">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              hi, <span className="text-gradient">rishith</span> here.
            </h1>
            <div className="mt-6 text-lg text-white/70 sm:text-xl">
              <TypewriterText
                text="15-year-old developer & ai builder. 30+ shipped projects across ios, web, ai, and hardware."
                speed={28}
              />
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="mailto:rishithchennupati@gmail.com"
                className="glass-button inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                <span>say hi</span>
              </a>
              <Link
                href="/projects"
                className="glass-button inline-flex items-center gap-2"
              >
                <span>see all projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* about blurb */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading subtitle="the short version">
            <>
              about <span className="text-gradient">me</span>
            </>
          </SectionHeading>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <GlassCard>
              <div className="space-y-4 text-white/75">
                <p>
                  i&apos;m rishith — a 15-year-old developer from the bay area.
                  i&apos;ve been shipping software since middle school: ios apps,
                  ai/ml projects, web platforms, and hardware builds.
                </p>
                <p>
                  i care about craft. i love when a thing feels good to use, when
                  the seams disappear, when the code is clean enough that
                  tomorrow-me can read it.
                </p>
                <p>
                  always shipping. always learning.
                </p>
              </div>
            </GlassCard>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SKILL_CARDS.map((skill) => (
                <GlassCard key={skill.label} hover>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-white/5 p-2 text-white/80">
                      {skill.icon}
                    </div>
                    <div>
                      <div className="font-medium text-white">{skill.label}</div>
                      <div className="mt-1 text-sm text-white/60">
                        {skill.description}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* github stats */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <GitHubStats
              totalRepos={allRepos.length}
              totalStars={totalStars}
              topLanguages={topLanguages}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* featured projects */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading subtitle="a curated handful — see all on /projects">
            <>
              featured <span className="text-gradient">work</span>
            </>
          </SectionHeading>
          <div className="mt-12">
            <ProjectGrid projects={featured} />
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/projects" className="glass-button">
              view all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* languages */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading>
            <>
              languages i <span className="text-gradient">speak</span>
            </>
          </SectionHeading>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {LANGUAGE_PILLS.map((lang) => (
              <span
                key={lang.name}
                className="lang-badge"
                style={{
                  borderColor: `${lang.color}55`,
                  color: lang.color,
                  backgroundColor: `${lang.color}12`,
                }}
              >
                {lang.name} · {lang.level}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* contact cta */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            let&apos;s <span className="text-gradient">connect</span>
          </h2>
          <p className="mt-4 text-white/65">
            building something cool? want to chat? always open to interesting
            people and interesting problems.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="mailto:rishithchennupati@gmail.com"
              className="glass-button inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              <span>rishithchennupati@gmail.com</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
