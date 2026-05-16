/**
 * Contact + footer rolled into one. The footer is a single long sentence,
 * editorial style — no link soup, no big "Get in touch!" button stack.
 */
export default function Colophon() {
  return (
    <footer id="contact" className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-bg)]">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
        <h2 className="font-[family-name:var(--font-serif)] text-[clamp(3.2rem,7.5vw,7.2rem)] leading-[0.95] tracking-[-0.02em] text-[color:var(--color-ink)]">
          Send a note.
          <br />
          <a
            href="mailto:rishithchennupati@gmail.com"
            className="group inline-flex items-baseline gap-3 italic text-[color:var(--color-ink-soft)] transition-colors duration-200 hover:text-[color:var(--color-accent)]"
          >
            rishithchennupati
            <span aria-hidden className="text-[color:var(--color-ink-mute)] transition-colors group-hover:text-[color:var(--color-accent)]">@</span>
            gmail
            <span aria-hidden className="text-[color:var(--color-ink-mute)] transition-colors group-hover:text-[color:var(--color-accent)]">.com</span>
            <span aria-hidden className="ml-1 inline-block translate-y-[-0.1em] text-[0.5em] text-[color:var(--color-ink-mute)] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[color:var(--color-accent)]">
              ↗
            </span>
          </a>
        </h2>

        <p className="mt-10 max-w-[44ch] text-[15px] leading-[1.6] text-[color:var(--color-ink-soft)] sm:text-[16px]">
          Best place to find me is email. If you&rsquo;re building something
          interesting in iOS, AI, or hardware — especially the messy
          intersection — I want to hear about it.
        </p>

        <div className="mt-20 grid gap-6 border-t border-[color:var(--color-rule-soft)] pt-8 font-mono text-[12px] text-[color:var(--color-ink-mute)] sm:grid-cols-3">
          <div>
            <p className="uppercase tracking-[0.16em]">Elsewhere</p>
            <ul className="mt-3 space-y-1.5 text-[color:var(--color-ink-soft)]">
              <li>
                <a
                  href="https://github.com/rishith-c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex items-center gap-1.5 hover:text-[color:var(--color-ink)]"
                >
                  github / rishith-c ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/risheeeeth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex items-center gap-1.5 hover:text-[color:var(--color-ink)]"
                >
                  instagram / risheeeeth ↗
                </a>
              </li>
              <li>
                <a
                  href="https://buymeacoffee.com/rishithc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex items-center gap-1.5 hover:text-[color:var(--color-ink)]"
                >
                  buy me a coffee ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="uppercase tracking-[0.16em]">Colophon</p>
            <p className="mt-3 text-[color:var(--color-ink-soft)]">
              Set in <span className="italic font-[family-name:var(--font-serif)]">Instrument Serif</span> and Geist.
              Built with Next.js. Hosted on Vercel. Index is live from the
              GitHub API, cached for an hour.
            </p>
          </div>

          <div>
            <p className="uppercase tracking-[0.16em]">Location</p>
            <p className="mt-3 text-[color:var(--color-ink-soft)]">
              San Jose, CA
              <br />
              37.34°N, 121.89°W
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-baseline justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)] sm:flex-row">
          <p>© 2026 Rishith Chennupati. All work, mostly mine.</p>
          <p>End of file.</p>
        </div>
      </div>
    </footer>
  );
}
