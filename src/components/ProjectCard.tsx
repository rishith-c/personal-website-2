"use client";

import Link from "next/link";
import { ExternalLink, GitFork, Github, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const LANGUAGE_COLOR: Record<string, string> = {
  Swift: "#F05138",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  C: "#555555",
  "C++": "#00599C",
  Java: "#ED8B00",
  Kotlin: "#A97BFF",
  Go: "#00ADD8",
  Rust: "#DEA584",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Shell: "#89E051",
  Vue: "#41B883",
  Dart: "#00B4AB",
  Ruby: "#CC342D",
};

const FALLBACK_LANG_COLOR = "#888888";

export interface ProjectCardProps {
  name: string;
  description: string | null;
  url: string;
  homepage?: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  pushedAt: string;
}

function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const seconds = Math.max(1, Math.round((now - then) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.round(months / 12);
  return `${years}y ago`;
}

export default function ProjectCard({
  name,
  description,
  url,
  homepage,
  language,
  topics,
  stars,
  forks,
  pushedAt,
}: ProjectCardProps) {
  const langColor = (language && LANGUAGE_COLOR[language]) ?? FALLBACK_LANG_COLOR;
  const visibleTopics = topics.slice(0, 5);

  return (
    <Card className="group flex h-full flex-col transition-colors hover:border-primary/40">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg lowercase tracking-tight">
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors after:absolute after:inset-0 after:content-['']"
            >
              {name.toLowerCase()}
            </Link>
          </CardTitle>
          {language ? (
            <Badge variant="outline" className="shrink-0 gap-1.5 font-mono text-xs">
              <span
                aria-hidden
                className="inline-block size-2 rounded-full"
                style={{ backgroundColor: langColor }}
              />
              {language}
            </Badge>
          ) : null}
        </div>
        {description ? (
          <CardDescription className="text-base leading-relaxed line-clamp-3">
            {description}
          </CardDescription>
        ) : (
          <CardDescription className="italic">no description</CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        {visibleTopics.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {visibleTopics.map((topic) => (
              <li key={topic}>
                <Badge variant="secondary" className="font-normal">
                  {topic}
                </Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 border-t pt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="flex items-center gap-1">
            <Star className="size-3.5" /> {stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="size-3.5" /> {forks}
          </span>
          <span aria-hidden>·</span>
          <span>{formatRelativeTime(pushedAt)}</span>
        </div>
        <div className="relative z-10 flex items-center gap-1">
          {homepage ? (
            <Button asChild variant="ghost" size="icon" aria-label={`${name} live demo`}>
              <a href={homepage} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-4" />
              </a>
            </Button>
          ) : null}
          <Button asChild variant="ghost" size="icon" aria-label={`${name} on GitHub`}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
