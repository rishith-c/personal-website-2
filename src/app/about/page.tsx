import Link from "next/link";
import { Code2, Cpu, Github, Globe, Instagram, Mail, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GitHubStats from "@/components/GitHubStats";
import ProjectGrid from "@/components/ProjectGrid";
import {
  fetchAllRepos,
  fetchProfile,
  summarizeLanguages,
  type GitHubRepo,
} from "@/lib/github";
import type { ProjectCardProps } from "@/components/ProjectCard";

export const metadata = {
  title: "about · rishith chennupati",
  description: "about rishith chennupati — developer, builder, ai enthusiast",
};

const FALLBACK_AVATAR = "https://github.com/rishith-c.png";

interface Area {
  label: string;
  description: string;
  Icon: typeof Code2;
}

const AREAS: Area[] = [
  {
    label: "ios development",
    description:
      "swiftui, vision, healthkit, widgets, live activities — the platform rewards craft and i lean into that.",
    Icon: Code2,
  },
  {
    label: "ai & machine learning",
    description:
      "openai, pytorch, mediapipe, on-device foundation models. the things you can suddenly do that you couldn't before.",
    Icon: Sparkles,
  },
  {
    label: "full-stack web",
    description:
      "next.js + react + tailwind + supabase / firebase. deploy on vercel, ship fast, iterate faster.",
    Icon: Globe,
  },
  {
    label: "hardware & robotics",
    description:
      "arduino, raspberry pi, mavlink drones, 3d-printed enclosures. nothing beats holding a thing you made.",
    Icon: Cpu,
  },
];

const TECH_STACK = [
  "Swift", "SwiftUI", "SwiftData", "Combine", "Vision", "HealthKit", "ARKit",
  "Python", "PyTorch", "TensorFlow", "OpenAI", "MediaPipe",
  "TypeScript", "Next.js", "React", "Tailwind", "Node.js", "Electron",
  "C++", "Arduino", "Raspberry Pi", "MAVLink",
  "Firebase", "Supabase",
];

const SOCIAL_LINKS = [
  { label: "Email", href: "mailto:rishithchennupati@gmail.com", Icon: Mail },
  { label: "GitHub", href: "https://github.com/rishith-c", Icon: Github, external: true },
  { label: "Instagram", href: "https://www.instagram.com/risheeeeth/", Icon: Instagram, external: true },
  { label: "Site", href: "https://rishithc.com", Icon: Globe, external: true },
];

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

export default async function AboutPage() {
  const [profile, allRepos] = await Promise.all([fetchProfile(), fetchAllRepos()]);
  const avatarUrl = profile?.avatarUrl ?? FALLBACK_AVATAR;
  const totalStars = allRepos.reduce((sum, repo) => sum + repo.stars, 0);
  const topLanguages = summarizeLanguages(allRepos).slice(0, 6);
  const recentProjects = allRepos.slice(0, 3).map(toProjectProps);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      {/* heading + bio */}
      <section className="grid items-start gap-10 lg:grid-cols-[200px_1fr]">
        <div className="flex justify-center lg:justify-start">
          <Avatar className="size-40 ring-2 ring-primary/30">
            <AvatarImage src={avatarUrl} alt="Rishith Chennupati" />
            <AvatarFallback className="text-3xl">RC</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            about rishith
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            i&apos;m rishith chennupati — a 15-year-old builder from the san francisco
            bay area. i&apos;ve been writing code since middle school and shipping
            ios apps, web platforms, ai/ml projects, and hardware builds ever since.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            currently exploring on-device ai, agentic workflows, and the next
            wave of ios design (liquid glass, foundation models). always shipping.
          </p>
        </div>
      </section>

      <Separator className="my-16" />

      {/* by the numbers */}
      <section aria-labelledby="numbers-heading">
        <div className="mb-8 space-y-2">
          <h2 id="numbers-heading" className="text-3xl font-semibold tracking-tight">
            by the numbers
          </h2>
          <p className="text-base text-muted-foreground">
            from <span className="font-mono text-foreground">@rishith-c</span>, refreshed hourly.
          </p>
        </div>
        <GitHubStats
          totalRepos={allRepos.length}
          totalStars={totalStars}
          topLanguages={topLanguages}
        />
      </section>

      <Separator className="my-16" />

      {/* areas */}
      <section aria-labelledby="areas-heading">
        <div className="mb-8 space-y-2">
          <h2 id="areas-heading" className="text-3xl font-semibold tracking-tight">
            what i build
          </h2>
          <p className="text-base text-muted-foreground">where i spend my time.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {AREAS.map((area) => (
            <Card key={area.label}>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <area.Icon className="size-5" aria-hidden />
                </div>
                <CardTitle className="text-lg">{area.label}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {area.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-16" />

      {/* tech stack */}
      <section aria-labelledby="stack-heading">
        <div className="mb-8 space-y-2">
          <h2 id="stack-heading" className="text-3xl font-semibold tracking-tight">
            tech i work with
          </h2>
          <p className="text-base text-muted-foreground">
            the day-to-day toolkit, give or take.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <li key={tech}>
              <Badge variant="secondary" className="px-3 py-1.5 text-sm font-normal">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="my-16" />

      {/* currently shipping */}
      {recentProjects.length > 0 ? (
        <>
          <section aria-labelledby="recent-heading">
            <div className="mb-8 space-y-2">
              <h2 id="recent-heading" className="text-3xl font-semibold tracking-tight">
                currently shipping
              </h2>
              <p className="text-base text-muted-foreground">
                three most recent pushes.
              </p>
            </div>
            <ProjectGrid projects={recentProjects} />
          </section>
          <Separator className="my-16" />
        </>
      ) : null}

      {/* find me */}
      <section aria-labelledby="contact-heading">
        <div className="mb-8 space-y-2">
          <h2 id="contact-heading" className="text-3xl font-semibold tracking-tight">
            find me
          </h2>
          <p className="text-base text-muted-foreground">
            elsewhere on the internet.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {SOCIAL_LINKS.map(({ label, href, Icon, external }) => (
            <Button asChild key={label} variant="outline" size="lg">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <Icon className="size-4" />
                {label.toLowerCase()}
              </a>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
