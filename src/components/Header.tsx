// Inline so the build's CSS minifier can't drop the unprefixed property
// (it strips `backdrop-filter` and keeps only the -webkit- alias, which
// Chrome ignores — killing the frosted glass).
const blur14 = { backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" } as const;
const glass = { backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" } as const;

export default function Header() {
  return (
    <header className="df-header">
      <div className="df-header-blur" style={blur14} aria-hidden />
      <div className="df-header-inner">
        <a href="#top" className="df-logo" aria-label="Rishith Chennupati, home">
          <svg className="mark" viewBox="0 0 24 24" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="6" fill="#2563eb" />
            <rect x="13.5" y="2" width="8.5" height="8.5" rx="3" fill="#93c5fd" />
          </svg>
          <span className="name">
            rishith<em>c</em>
          </span>
        </a>

        <div className="df-header-end">
          <nav className="df-nav-pill" style={glass} aria-label="Main">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#robotics">Robotics</a>
            <a href="#contact">Contact</a>
          </nav>
          <nav className="df-nav-pill df-nav-pill--solo" style={glass} aria-label="LinkedIn">
            <a href="https://www.linkedin.com/in/rishith-chennupati-b4ba202a4/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </nav>
          <nav className="df-nav-pill df-nav-pill--solo" style={glass} aria-label="Email">
            <a href="mailto:rishithchennupati@gmail.com">Email</a>
          </nav>
          <a
            href="https://github.com/rishith-c"
            target="_blank"
            rel="noopener noreferrer"
            className="df-github"
            style={glass}
            aria-label="GitHub"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.395-.135-.345-.72-1.395-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
