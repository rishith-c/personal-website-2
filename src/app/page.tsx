import Link from "next/link";
import { ArrowRight, Code2, Cpu, Globe, Mail, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GitHubStats from "@/components/GitHubStats";
import ProjectGrid from "@/components/ProjectGrid";
import {
  fetchAllRepos,
  fetchFeaturedRepos,
  summarizeLanguages,
  type GitHubRepo,
} from "@/lib/github";
import type { ProjectCardProps } from "@/components/ProjectCard";

interface SkillCard {
  label: string;
  description: string;
  Icon: typeof Code2;
}

const SKILLS: SkillCard[] = [
  { label: "ios", description: "swiftui · vision · healthkit · liquid glass", Icon: Code2 },
  { label: "ai / ml", description: "openai · pytorch · mediapipe · on-device", Icon: Sparkles },
  { label: "full-stack", description: "next.js · react · supabase · firebase", Icon: Globe },
  { label: "hardware", description: "arduino · drones · 3d printing", Icon: Cpu },
];

const LANGUAGES = [
  { name: "swift", level: "advanced" },
  { name: "swiftui", level: "advanced" },
  { name: "python", level: "advanced" },
  { name: "typescript", level: "intermediate" },
  { name: "c++", level: "intermediate" },
  { name: "java", level: "learning" },
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

export default async function HomePage() {
  const [allRepos, featuredRepos] = await Promise.all([fetchAllRepos(), fetchFeaturedRepos()]);
  const totalStars = allRepos.reduce((sum, repo) => sum + repo.stars, 0);
  const topLanguages = summarizeLanguages(allRepos).slice(0, 6);
  const featured = featuredRepos.map(toProjectProps);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* hero */}
      <section className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20">
        <div className="max-w-3xl space-y-6">
          <Badge variant="secondary" className="font-mono">
            available for new projects
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            hi, i&apos;m{" "}
            <span className="text-primary">rishith</span>.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            15-year-old developer & ai builder. 30+ shipped projects across ios,
            web, ai, and hardware. i turn ideas into pixels and code.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg">
              <a href="mailto:rishithchennupati@gmail.com">
                <Mail className="size-4" />
                say hi
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">
                see all projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* skills */}
      <section className="py-20" aria-labelledby="skills-heading">
        <div className="mb-10 space-y-2">
          <h2 id="skills-heading" className="text-3xl font-semibold tracking-tight">
            what i build
          </h2>
          <p className="text-base text-muted-foreground">
            the four areas where i spend most of my time.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill) => (
            <Card key={skill.label} className="transition-colors hover:border-primary/40">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <skill.Icon className="size-5" aria-hidden />
                </div>
                <CardTitle className="text-lg">{skill.label}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {skill.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* github stats */}
      <section className="py-20" aria-labelledby="github-heading">
        <div className="mb-10 space-y-2">
          <h2 id="github-heading" className="text-3xl font-semibold tracking-tight">
            on github
          </h2>
          <p className="text-base text-muted-foreground">
            live snapshot from <span className="font-mono text-foreground">@rishith-c</span> · refreshes hourly.
          </p>
        </div>
        <GitHubStats
          totalRepos={allRepos.length}
          totalStars={totalStars}
          topLanguages={topLanguages}
        />
      </section>

      <Separator />

      {/* featured */}
      <section className="py-20" aria-labelledby="featured-heading">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 id="featured-heading" className="text-3xl font-semibold tracking-tight">
              featured work
            </h2>
            <p className="text-base text-muted-foreground">
              a curated handful — the full set lives on /projects.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/projects">
              view all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <ProjectGrid projects={featured} />
      </section>

      <Separator />

      {/* languages */}
      <section className="py-20" aria-labelledby="languages-heading">
        <div className="mb-10 space-y-2">
          <h2 id="languages-heading" className="text-3xl font-semibold tracking-tight">
            languages i speak
          </h2>
          <p className="text-base text-muted-foreground">
            the day-to-day toolkit.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => (
            <li key={lang.name}>
              <Badge variant="outline" className="gap-2 px-3 py-1.5 text-sm font-normal">
                {lang.name}
                <span className="text-muted-foreground">{lang.level}</span>
              </Badge>
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      {/* contact */}
      <section className="py-24 text-center" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
          let&apos;s build something.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
          got an idea, a problem, or just want to say hi? my inbox is always open.
        </p>
        <Button asChild size="lg" className="mt-8">
          <a href="mailto:rishithchennupati@gmail.com">
            <Mail className="size-4" />
            email me
          </a>
        </Button>
      </section>
    </div>
  );
}
