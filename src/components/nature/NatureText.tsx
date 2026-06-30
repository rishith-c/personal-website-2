"use client";

import { NAV_GUTTER_PX } from "@/components/ui/Nav";
import { GITHUB_USERNAME, PORTFOLIO, REPO_DEMO_LINKS } from "@/lib/sections";
import { formatRelative, useGithubRepos } from "@/hooks/useGithubRepos";
import { useScrollStore } from "@/lib/store";

/** Smooth fade-in / hold / fade-out across a scroll window. */
function windowReveal(progress: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  const fadeIn = Math.min(1, t / 0.24);
  const fadeOut = Math.min(1, (1 - t) / 0.24);
  const vis = Math.max(0, Math.min(fadeIn, fadeOut));
  const dir = t < 0.5 ? 1 : -1;
  const travel = (1 - vis) * 26 * dir;
  return { vis, travel };
}

/** Fade in across [start, fullAt] then hold at full, never fades out. */
function holdReveal(progress: number, start: number, fullAt: number) {
  const vis = Math.max(0, Math.min(1, (progress - start) / (fullAt - start)));
  const travel = (1 - vis) * 26;
  return { vis, travel };
}

function TextPanel({
  children,
  className = "",
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}) {
  const alignClass =
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  return (
    <div
      className={`nat-panel pointer-events-auto rounded-lg px-5 py-4 md:px-6 md:py-5 ${alignClass} ${className}`}
    >
      {children}
    </div>
  );
}

function Block({
  start,
  end,
  hold,
  className,
  panelAlign = "left",
  children,
}: {
  start: number;
  end: number;
  hold?: boolean;
  className: string;
  panelAlign?: "left" | "center" | "right";
  children: React.ReactNode;
}) {
  const progress = useScrollStore((s) => s.progress);
  const { vis, travel } = hold
    ? holdReveal(progress, start, start + (end - start) * 0.6)
    : windowReveal(progress, start, end);

  if (vis <= 0.001) return null;

  return (
    <div
      className={`absolute ${className}`}
      style={{
        opacity: vis,
        transform: `translateY(${travel}px)`,
        filter: vis < 1 ? `blur(${(1 - vis) * 5}px)` : undefined,
      }}
    >
      <TextPanel align={panelAlign}>{children}</TextPanel>
    </div>
  );
}

function LatestRepos() {
  const repoState = useGithubRepos(GITHUB_USERNAME, 4);

  if (repoState.status === "loading") {
    return (
      <ul className="mt-4 space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className="h-7 animate-pulse rounded bg-white/10" />
        ))}
      </ul>
    );
  }

  if (repoState.status === "error") {
    return (
      <p className="nat-text mt-4 text-sm text-white/70">
        Couldn&apos;t load repos ({repoState.message}). Check{" "}
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          className="pointer-events-auto underline underline-offset-2"
        >
          GitHub
        </a>
        .
      </p>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {repoState.repos.map((repo) => {
        const demo = REPO_DEMO_LINKS[repo.name];
        const tag = [repo.language, formatRelative(repo.pushedAt)].filter(Boolean).join(" · ");

        return (
          <li key={repo.id} className="pointer-events-auto">
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nat-text font-serif text-xl text-white transition-opacity hover:opacity-70 md:text-2xl"
            >
              {repo.name}
            </a>
            {tag ? (
              <span className="nat-text ml-2 text-[11px] tracking-wide text-white/60 uppercase">
                {tag}
              </span>
            ) : null}
            {demo ? (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="nat-text ml-2 text-[11px] tracking-wide text-white/50 uppercase underline-offset-2 hover:text-white hover:underline"
              >
                live
              </a>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function NatureText() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 box-border max-md:pr-4"
      style={{ paddingRight: `max(1rem, calc(${NAV_GUTTER_PX}px + env(safe-area-inset-right, 0px)))` }}
    >
      {/* Intro */}
      <Block
        start={0.0}
        end={0.16}
        panelAlign="center"
        className="left-1/2 top-[34%] w-[88%] max-w-3xl -translate-x-1/2"
      >
        <p className="nat-text text-sm text-white/80">Hi, I&apos;m</p>
        <h1 className="nat-text mt-2 font-serif text-5xl leading-[1.05] text-white md:text-7xl">
          {PORTFOLIO.name}
        </h1>
        <p className="nat-text mt-4 text-[11px] tracking-[0.35em] text-white/60 uppercase">
          Fifteen · San Jose · building things that don&apos;t exist yet
        </p>
      </Block>

      {/* About */}
      <Block start={0.21} end={0.38} className="bottom-[20%] left-8 max-w-md md:left-16">
        <p className="nat-text text-[11px] tracking-[0.35em] text-white/65 uppercase">About</p>
        <p className="nat-text mt-3 text-base leading-relaxed text-white/95 md:text-lg">
          {PORTFOLIO.about}
        </p>
      </Block>

      {/* Work */}
      <Block start={0.41} end={0.58} className="left-8 top-[24%] max-w-md md:left-16">
        <p className="nat-text text-[11px] tracking-[0.35em] text-white/65 uppercase">
          Latest on GitHub
        </p>
        <LatestRepos />
      </Block>

      {/* Robotics — Prometheus */}
      <Block
        start={0.61}
        end={0.78}
        panelAlign="left"
        className="right-14 top-[22%] max-w-sm md:right-28"
      >
        <p className="nat-text text-[11px] tracking-[0.35em] text-white/65 uppercase">Robotics</p>
        <a
          href="https://github.com/rishith-c/Prometheus"
          target="_blank"
          rel="noopener noreferrer"
          className="nat-text pointer-events-auto mt-2 inline-block font-serif text-3xl text-white transition-opacity hover:opacity-70 md:text-4xl"
        >
          Prometheus
        </a>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/drone/brain.jpg"
          alt="The autonomy stack on Prometheus: a Raspberry Pi 4, flight controller, and GPS on the carbon frame."
          loading="lazy"
          decoding="async"
          className="mt-3 aspect-[4/3] w-full rounded-md border border-white/10 object-cover"
        />
        <p className="nat-text mt-3 text-[15px] leading-relaxed text-white/90">
          A 1.85 kg quadcopter I&apos;m building to fly itself. You give it GPS
          points, it takes off, holds position in wind, runs the route, and comes
          home on its own. A Raspberry Pi runs the missions over MAVLink.
        </p>
      </Block>

      {/* Contact */}
      <Block
        start={0.9}
        end={1.0}
        hold
        panelAlign="center"
        className="bottom-[22%] left-1/2 w-[88%] max-w-xl -translate-x-1/2"
      >
        <p className="nat-text text-[11px] tracking-[0.35em] text-white/65 uppercase">Contact</p>
        <a
          href={`mailto:${PORTFOLIO.email}`}
          className="nat-text pointer-events-auto mt-3 inline-block font-serif text-2xl text-white transition-opacity hover:opacity-70 md:text-3xl"
        >
          {PORTFOLIO.email}
        </a>
        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {PORTFOLIO.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nat-text pointer-events-auto text-[11px] tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
      </Block>
    </div>
  );
}
