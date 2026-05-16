interface NowBlockProps {
  topLanguages: { language: string; count: number }[];
}

/**
 * "Now" section — a short, opinionated read. Paragraphs, not cards. The
 * voice should sound like a person, not a marketing landing page.
 */
export default function NowBlock({ topLanguages }: NowBlockProps) {
  const top = topLanguages.slice(0, 4).map((l) => l.language).join(", ").toLowerCase();
  const fallback = "swift, python, typescript, c";
  const langLine = top.length > 0 ? top : fallback;

  return (
    <section
      id="now"
      aria-labelledby="now-heading"
      className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="grid gap-12 sm:grid-cols-[1fr_2fr] sm:gap-20">
        <div className="sticky top-20 self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-mute)]">
            § Now
          </p>
          <h2
            id="now-heading"
            className="mt-3 font-[family-name:var(--font-serif)] text-[clamp(2.4rem,4.2vw,4rem)] leading-[1] tracking-[-0.02em] text-[color:var(--color-ink)]"
          >
            What I&rsquo;m
            <br />
            <span className="italic text-[color:var(--color-ink-soft)]">spending time on.</span>
          </h2>
        </div>

        <div className="space-y-7 text-[17px] leading-[1.65] text-[color:var(--color-ink-soft)] sm:text-[18px]">
          <p>
            <span className="font-[family-name:var(--font-serif)] text-[26px] italic leading-none text-[color:var(--color-ink)]">
              On-device intelligence.
            </span>{" "}
            Apple is opening up real foundation-model APIs on the phone. The
            thing I want to build is software that thinks where it lives, with
            no round trip and no privacy tax. Synapse is the current
            experiment &mdash; predicting brain activation from intention,
            running on a Meta encoder.
          </p>

          <p>
            <span className="font-[family-name:var(--font-serif)] text-[26px] italic leading-none text-[color:var(--color-ink)]">
              Builder &gt; user.
            </span>{" "}
            I&rsquo;d rather ship five rough things this month than one polished
            thing this year. Most of what&rsquo;s in the index started as a
            hackathon weekend or a 2am idea. Some of them turned into apps with
            real users. That&rsquo;s the loop I&rsquo;m optimizing for.
          </p>

          <p>
            Day to day I work in {langLine}. iOS is home. Python is the lab.
            Next.js is how the labs get on the internet. I run a Raspberry Pi
            for drone work and a 3D printer for the parts in between.
          </p>

          <ul className="grid gap-3 border-t border-[color:var(--color-rule)] pt-7 font-mono text-[13px] text-[color:var(--color-ink-soft)] sm:grid-cols-2">
            <li className="flex items-baseline gap-3">
              <span className="text-[color:var(--color-ink-mute)]">→ today</span>
              <span>building synapse · sf bay area</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="text-[color:var(--color-ink-mute)]">→ reading</span>
              <span>more papers than novels</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="text-[color:var(--color-ink-mute)]">→ school</span>
              <span>tenth grade · 4.0 most days</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="text-[color:var(--color-ink-mute)]">→ open to</span>
              <span>internships, collabs, hard problems</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
