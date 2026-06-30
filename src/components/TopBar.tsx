import Link from "next/link";

interface TopBarProps {
  totalRepos: number;
}

/**
 * Thin sticky top bar. Intentionally low-contrast — the page is the show,
 * not the chrome. Two anchors and the three places to reach me.
 */
export default function TopBar({ totalRepos }: TopBarProps) {
  return (
    <header
      className="topbar-enter sticky top-0 z-40 w-full border-b border-[color:var(--color-rule-soft)] bg-[color:var(--color-bg)]/85 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg)]/70"
    >
      <div className="mx-auto flex h-12 w-full max-w-[1180px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="press group inline-flex items-center gap-2 font-mono text-[12.5px] text-[color:var(--color-ink)]"
          aria-label="rishith chennupati, home"
        >
          <span className="inline-block size-1.5 rounded-full bg-[color:var(--color-ink)] transition-colors group-hover:bg-[color:var(--color-accent)]" aria-hidden />
          <span>rishith.c</span>
          <span className="text-[color:var(--color-ink-mute)]">
            / {totalRepos.toString().padStart(2, "0")} repos
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 text-[12.5px] font-mono">
          <a
            href="#index"
            className="press rounded-sm px-2 py-1 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
          >
            index
          </a>
          <a
            href="#robotics"
            className="press hidden rounded-sm px-2 py-1 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] sm:inline-block"
          >
            robotics
          </a>
          <a
            href="#now"
            className="press rounded-sm px-2 py-1 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
          >
            now
          </a>
          <a
            href="#contact"
            className="press rounded-sm px-2 py-1 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
          >
            contact
          </a>
          <span className="mx-1 hidden h-3.5 w-px bg-[color:var(--color-rule)] sm:inline-block" aria-hidden />
          <a
            href="https://github.com/rishith-c"
            target="_blank"
            rel="noopener noreferrer"
            className="press hidden rounded-sm px-2 py-1 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] sm:inline-block"
          >
            github ↗
          </a>
          <a
            href="https://www.linkedin.com/in/rishith-chennupati-b4ba202a4/"
            target="_blank"
            rel="noopener noreferrer"
            className="press hidden rounded-sm px-2 py-1 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] sm:inline-block"
          >
            linkedin ↗
          </a>
          <a
            href="mailto:rishithchennupati@gmail.com"
            className="press hidden rounded-sm px-2 py-1 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] sm:inline-block"
          >
            email ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
