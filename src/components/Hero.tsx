import { formatRelativeTime } from "@/lib/time";
import type { GitHubRepo, LanguageBreakdown } from "@/lib/github";
import CountUp from "@/components/CountUp";
import HeroCanvas from "@/components/HeroCanvas";
import QuirkTicker from "@/components/QuirkTicker";

interface HeroProps {
  current: GitHubRepo | null;
  totalRepos: number;
  totalStars: number;
  topLanguages: LanguageBreakdown[];
  shippedThisYear: number;
}

/**
 * Editorial hero. The big serif statement uses line-mask reveals (each
 * line slides up from below an overflow-hidden clip), eyebrow + paragraph
 * + stat grid fade-up with cascading delays. The whole block lives inside
 * a `HeroShell` client wrapper that scrubs scale/opacity as the user
 * starts scrolling past it.
 */
export default function Hero({
  current,
  totalRepos,
  totalStars,
  topLanguages,
  shippedThisYear,
}: HeroProps) {
  const currentLabel = current
    ? `${current.name.toLowerCase()} · ${formatRelativeTime(current.pushedAt)}`
    : "between commits";

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto w-full max-w-[1180px] px-5 pt-16 sm:px-8 sm:pt-24"
    >
      {/* interactive ink-dot field — decorative, sits beneath the type */}
      <HeroCanvas />

      <div className="relative z-10">
      {/* eyebrow */}
      <p
        className="fade-up font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-ink-mute)]"
        style={{ ["--i" as never]: 0 }}
      >
        Rishith Chennupati
        <span className="mx-2 text-[color:var(--color-rule)]" aria-hidden>·</span>
        Volume 01
        <span className="mx-2 text-[color:var(--color-rule)]" aria-hidden>·</span>
        San Jose, CA
      </p>

      {/* fun, rotating status line */}
      <QuirkTicker />

      {/* statement — line-mask reveals */}
      <h1
        id="hero-heading"
        className="mt-7 max-w-[18ch] font-[family-name:var(--font-serif)] text-[clamp(3.6rem,9.5vw,9rem)] font-normal leading-[0.92] tracking-[-0.025em] text-[color:var(--color-ink)] sm:max-w-[24ch] sm:leading-[0.94]"
      >
        <span className="rise-mask">
          <span className="rise-line" style={{ ["--i" as never]: 1 }}>
            Building things
          </span>
        </span>
        <span className="rise-mask">
          <span
            className="rise-line italic text-[color:var(--color-ink-soft)]"
            style={{ ["--i" as never]: 2 }}
          >
            that don&rsquo;t
          </span>
        </span>
        <span className="rise-mask">
          <span
            className="rise-line italic text-[color:var(--color-ink-soft)]"
            style={{ ["--i" as never]: 3 }}
          >
            exist yet
            <span className="not-italic text-[color:var(--color-accent)]">.</span>
          </span>
        </span>
      </h1>

      {/* sub */}
      <div className="mt-10 grid gap-10 sm:grid-cols-[1.4fr_1fr] sm:gap-16">
        <p
          className="fade-up max-w-[44ch] text-[17px] leading-[1.55] text-[color:var(--color-ink-soft)] sm:text-[18px]"
          style={{ ["--i" as never]: 6 }}
        >
          Fifteen years old. I&rsquo;ve been writing code since middle school and
          shipping things ever since &mdash; iOS apps, on-device AI, web
          platforms, autonomous hardware. The list below is everything I&rsquo;ve
          made public, ranked the way I&rsquo;d rank it: by what I care about,
          not by what trended.
        </p>

        {/* live + metadata column */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 self-start text-[13px] font-mono text-[color:var(--color-ink-soft)] sm:max-w-[280px]">
          <div className="fade-up col-span-2" style={{ ["--i" as never]: 7 }}>
            <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
              <span className="pulse-dot" aria-hidden /> Now
            </dt>
            <dd className="mt-1.5 text-[14.5px] text-[color:var(--color-ink)]">
              {currentLabel}
            </dd>
          </div>

          <div className="fade-up" style={{ ["--i" as never]: 8 }}>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
              Repos
            </dt>
            <dd className="mt-1 text-[20px] text-[color:var(--color-ink)]">
              <CountUp to={totalRepos} />
            </dd>
          </div>

          <div className="fade-up" style={{ ["--i" as never]: 9 }}>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
              Stars
            </dt>
            <dd className="mt-1 text-[20px] text-[color:var(--color-ink)]">
              <CountUp to={totalStars} />
            </dd>
          </div>

          <div className="fade-up" style={{ ["--i" as never]: 10 }}>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
              Languages
            </dt>
            <dd className="mt-1 text-[20px] text-[color:var(--color-ink)]">
              <CountUp to={topLanguages.length} />
            </dd>
          </div>

          <div className="fade-up" style={{ ["--i" as never]: 11 }}>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
              Shipped &lsquo;26
            </dt>
            <dd className="mt-1 text-[20px] text-[color:var(--color-ink)]">
              <CountUp to={shippedThisYear} />
            </dd>
          </div>
        </dl>
      </div>

      {/* tiny scroll cue */}
      <div
        className="fade-up mt-20 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-mute)]"
        style={{ ["--i" as never]: 13 }}
        aria-hidden
      >
        <span>Scroll for the index</span>
        <span className="relative inline-block h-px w-14 overflow-hidden bg-[color:var(--color-rule)]">
          <span className="scroll-cue-bar absolute inset-y-0 left-0 w-1/3 bg-[color:var(--color-ink)]" />
        </span>
      </div>
      </div>
    </section>
  );
}
