import Image from "next/image";
import Link from "next/link";
import {
  Code,
  Cpu,
  Globe,
  Github,
  Instagram,
  Mail,
  Palette,
  Sparkles,
} from "lucide-react";
import {
  fetchAllRepos,
  fetchProfile,
  summarizeLanguages,
  type GitHubRepo,
} from "@/lib/github";
import GitHubStats from "@/components/GitHubStats";
import GlassCard from "@/components/GlassCard";
import ProjectGrid from "@/components/ProjectGrid";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "about · rishith chennupati",
  description: "about rishith chennupati — developer, builder, ai enthusiast",
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

interface AreaCard {
  icon: React.ReactNode;
  label: string;
  description: string;
}

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const FALLBACK_AVATAR = "https://github.com/rishith-c.png";

const AREAS: AreaCard[] = [
  {
    icon: <Code className="h-5 w-5" />,
    label: "ios development",
    description:
      "swift, swiftui, swiftdata. shipping native ios apps that feel built for the platform.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    label: "ai & ml",
    description:
      "on-device foundation models, agents, computer vision, and the workflows that surround them.",
  },
  {
    icon: <Palette className="h-5 w-5" />,
    label: "full-stack web",
    description:
      "next.js, react, tailwind, supabase, firebase. fast, polished, type-safe.",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    label: "hardware & robotics",
    description:
      "drones, robotics, arduino, raspberry pi, mavlink. software that touches the real world.",
  },
];

const TECH_CHIPS: string[] = [
  "Swift",
  "SwiftUI",
  "SwiftData",
  "Combine",
  "Vision",
  "HealthKit",
  "ARKit",
  "Python",
  "PyTorch",
  "TensorFlow",
  "OpenAI",
  "MediaPipe",
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind",
  "Node.js",
  "Electron",
  "C++",
  "Arduino",
  "Raspberry Pi",
  "MAVLink",
  "Firebase",
  "Supabase",
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: <Github className="h-4 w-4" />,
    label: "github",
    href: "https://github.com/rishith-c",
  },
  {
    icon: <Instagram className="h-4 w-4" />,
    label: "instagram",
    href: "https://instagram.com/rishith.c",
  },
  {
    icon: <Mail className="h-4 w-4" />,
    label: "email",
    href: "mailto:rishithchennupati@gmail.com",
  },
  {
    icon: <Globe className="h-4 w-4" />,
    label: "rishithc.com",
    href: "https://rishithc.com",
  },
];

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

export default async function AboutPage() {
  const [profile, allRepos] = await Promise.all([
    fetchProfile(),
    fetchAllRepos(),
  ]);

  const avatarUrl = profile?.avatarUrl ?? FALLBACK_AVATAR;
  const totalStars = allRepos.reduce((sum, repo) => sum + repo.stars, 0);
  const topLanguages = summarizeLanguages(allRepos).slice(0, 6);
  const recentProjects = allRepos.slice(0, 4).map(toProjectCardProps);

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6 page-fade-in">
      <div className="mx-auto max-w-5xl space-y-24">
        {/* heading */}
        <section>
          <SectionHeading as="h1">
            <>
              about <span className="text-gradient">rishith</span>
            </>
          </SectionHeading>
        </section>

        {/* avatar + bio */}
        <section className="grid items-start gap-12 lg:grid-cols-[260px_1fr]">
          <div className="relative mx-auto lg:mx-0">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-accent-3/30 via-accent/20 to-accent-2/30 blur-2xl"
            />
            <Image
              src={avatarUrl}
              alt="rishith chennupati"
              width={240}
              height={240}
              className="rounded-full ring-1 ring-white/10"
              priority
            />
          </div>
          <GlassCard>
            <div className="space-y-5 text-white/75 leading-relaxed">
              <p>
                i&apos;m rishith chennupati, a 15-year-old builder from the san
                francisco bay area. i&apos;ve been writing code since middle
                school and shipping ios apps, web platforms, ai/ml projects, and
                hardware builds ever since.
              </p>
              <p>
                <span className="text-white">what i love:</span> ios + swiftui
                because the platform rewards craft. ai/ml for the things you can
                suddenly do that you couldn&apos;t before. building hardware
                because nothing beats holding a thing you made.
              </p>
              <p>
                <span className="text-white">currently:</span> exploring on-device
                AI, agentic workflows, and the next wave of ios design (liquid
                glass, foundation models). always shipping.
              </p>
            </div>
          </GlassCard>
        </section>

        {/* by the numbers */}
        <section>
          <SectionHeading subtitle="live from github">
            <>
              by the <span className="text-gradient">numbers</span>
            </>
          </SectionHeading>
          <div className="mt-12">
            <GitHubStats
              totalRepos={allRepos.length}
              totalStars={totalStars}
              topLanguages={topLanguages}
            />
          </div>
        </section>

        {/* areas */}
        <section>
          <SectionHeading subtitle="where i spend my time">
            <>
              what i <span className="text-gradient">build</span>
            </>
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {AREAS.map((area) => (
              <GlassCard key={area.label} hover>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-white/5 p-2 text-white/80">
                    {area.icon}
                  </div>
                  <div>
                    <div className="font-medium text-white">{area.label}</div>
                    <p className="mt-1 text-base leading-relaxed text-white/65">
                      {area.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* tech chips */}
        <section>
          <SectionHeading subtitle="day-to-day toolkit">
            <>
              tech i <span className="text-gradient">work with</span>
            </>
          </SectionHeading>
          <div className="mt-12 flex flex-wrap gap-2">
            {TECH_CHIPS.map((chip) => (
              <span key={chip} className="lang-badge">
                {chip}
              </span>
            ))}
          </div>
        </section>

        {/* currently shipping */}
        <section>
          <SectionHeading subtitle="freshest commits">
            <>
              currently <span className="text-gradient">shipping</span>
            </>
          </SectionHeading>
          <div className="mt-12">
            {recentProjects.length === 0 ? (
              <GlassCard>
                <p className="text-center text-white/65">
                  github is being shy right now —{" "}
                  <Link
                    href="https://github.com/rishith-c"
                    className="text-white underline underline-offset-4"
                  >
                    catch the latest on github
                  </Link>
                  .
                </p>
              </GlassCard>
            ) : (
              <ProjectGrid projects={recentProjects} />
            )}
          </div>
        </section>

        {/* social */}
        <section>
          <SectionHeading subtitle="the ways in">
            <>
              find me <span className="text-gradient">elsewhere</span>
            </>
          </SectionHeading>
          <div className="mt-12 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="glass-button inline-flex items-center gap-2"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
