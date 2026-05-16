import { formatRelativeTime } from "@/lib/time";
import type { GitHubRepo, LanguageBreakdown } from "@/lib/github";

interface HeroProps {
  current: GitHubRepo | null;
  totalRepos: number;
  totalStars: number;
  topLanguages: LanguageBreakdown[];
  shippedThisYear: number;
}

/**
 * Editorial hero. One short, opinionated phrase on top, a serif-italic
 * statement underneath, then a single line of live signal (now building X)
 * and a tight metadata strip. No image. No CTA stack. The work is the CTA.
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
      {/* eyebrow */}
      <p
        className="reveal-block font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-ink-mute)]"
        style={{ ["--i" as never]: 0 }}
      >
        Rishith Chennupati
        <span className="mx-2 text-[color:var(--color-rule)]" aria-hidden>·</span>
        Volume 01
        <span className="mx-2 text-[color:var(--color-rule)]" aria-hidden>·</span>
        SF Bay Area
      </p>

      {/* statement */}
      <h1
        id="hero-heading"
        className="reveal-block mt-7 max-w-[18ch] font-[family-name:var(--font-serif)] text-[clamp(3.6rem,9.5vw,9rem)] font-normal leading-[0.92] tracking-[-0.025em] text-[color:var(--color-ink)] sm:max-w-[24ch] sm:leading-[0.94]"
        style={{ ["--i" as never]: 1 }}
      >
        Building things
        <br />
        <span className="italic text-[color:var(--color-ink-soft)]">that don&rsquo;t</span>{" "}
        <span className="italic text-[color:var(--color-ink-soft)]">exist yet</span>
        <span className="text-[color:var(--color-accent)]">.</span>
      </h1>

      {/* sub */}
      <div
        className="reveal-block mt-10 grid gap-10 sm:grid-cols-[1.4fr_1fr] sm:gap-16"
        style={{ ["--i" as never]: 2 }}
      >
        <p className="max-w-[44ch] text-[17px] leading-[1.55] text-[color:var(--color-ink-soft)] sm:text-[18px]">
          Fifteen years old. I&rsquo;ve been writing code since middle school and
          shipping things ever since &mdash; iOS apps, on-device AI, web
          platforms, autonomous hardware. The list below is everything I&rsquo;ve
          made public, ranked the way I&rsquo;d rank it: by what I care about,
          not by what trended.
        </p>

        {/* live + metadata column */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 self-start text-[13px] font-mono text-[color:var(--color-ink-soft)] sm:max-w-[280px]">
          <div className="col-span-2">
            <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
              <span className="pulse-dot" aria-hidden /> Now
            </dt>
            <dd className="mt-1.5 text-[14.5px] text-[color:var(--color-ink)]">
              {currentLabel}
            </dd>
          </div>

          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
              Repos
            </dt>
            <dd className="tabular mt-1 text-[20px] text-[color:var(--color-ink)]">
              {totalRepos.toString().padStart(2, "0")}
            </dd>
          </div>

          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
              Stars
            </dt>
            <dd className="tabular mt-1 text-[20px] text-[color:var(--color-ink)]">
              {totalStars.toString().padStart(2, "0")}
            </dd>
          </div>

          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
              Languages
            </dt>
            <dd className="tabular mt-1 text-[20px] text-[color:var(--color-ink)]">
              {topLanguages.length.toString().padStart(2, "0")}
            </dd>
          </div>

          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
              Shipped &lsquo;26
            </dt>
            <dd className="tabular mt-1 text-[20px] text-[color:var(--color-ink)]">
              {shippedThisYear.toString().padStart(2, "0")}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
