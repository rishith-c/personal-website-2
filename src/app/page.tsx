import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { fetchRepos, rankRepos, summarizeLanguages, relativeTime } from "@/lib/github";

export const revalidate = 3600;

const SPECS = [
  { k: "Airframe", v: "1.85 kg" },
  { k: "Firmware", v: "ArduCopter 4.6.3" },
  { k: "Thrust / weight", v: "1.89 : 1" },
  { k: "Hover time", v: "12 to 15 min" },
  { k: "Companion", v: "Raspberry Pi 4" },
  { k: "Control", v: "DroneKit / MAVLink" },
];

export default async function HomePage() {
  const repos = await fetchRepos();
  const ranked = rankRepos(repos);
  const languages = summarizeLanguages(repos);
  const totalStars = repos.reduce((s, r) => s + r.stars, 0);
  const thisYear = new Date().getFullYear();
  const shipped = repos.filter((r) => new Date(r.createdAt).getFullYear() === thisYear).length;
  const top = ranked.slice(0, 9);

  return (
    <>
      <Header />
      <Reveal />

      <main id="top">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="hero wrap">
          <p className="eyebrow anim-body" data-anim="body" data-hero>
            Rishith Chennupati · San Jose, CA
          </p>
          <h1 className="hero-title" data-anim="headline" data-hero>
            Building things that don&rsquo;t exist yet.
          </h1>
          <p className="hero-lead anim-body" data-anim="body" data-hero>
            I&rsquo;m fifteen. I started writing code in middle school and haven&rsquo;t
            really stopped since: iOS apps, on-device AI, web platforms, and lately a
            drone that flies itself. Everything I&rsquo;ve made public lives below.
          </p>
          <div className="hero-actions anim-body" data-anim="body" data-hero>
            <a href="#work" className="btn-brand">
              See the work
            </a>
            <a href="https://github.com/rishith-c" target="_blank" rel="noopener noreferrer" className="btn-muted">
              GitHub ↗
            </a>
          </div>

          <div className="hero-visual">
            <div id="hero-mock" className="mock-frame anim-illustrate">
              <div className="mock-bar">
                <span className="tl" /> <span className="tl" /> <span className="tl" />
                <span style={{ marginLeft: 10 }}>prometheus · autonomous gps drone</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mock-media"
                src="/drone/brain.jpg"
                alt="The autonomy stack on Prometheus: a Raspberry Pi 4, flight controller, and GPS on the carbon frame."
              />
              <span className="mock-tag">
                <span className="live" /> building now
              </span>
            </div>
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────── */}
        <section id="about" className="section wrap">
          <p className="eyebrow">About</p>
          <h2 className="section-title" data-anim="headline">
            A builder more than a user.
          </h2>
          <p className="section-desc anim-body" data-anim="body">
            iOS is home, Python is the lab, and Next.js is how the labs get online. I&rsquo;d
            rather ship five rough things this month than one perfect thing next year. A lot of
            what&rsquo;s below started as a hackathon weekend or a 2am idea I couldn&rsquo;t drop,
            and a few of them turned into apps people actually use.
          </p>

          <div className="stat-row anim-stagger" data-anim="stagger">
            <div className="stat">
              <div className="k">Public repos</div>
              <div className="v">{repos.length}</div>
            </div>
            <div className="stat">
              <div className="k">Languages</div>
              <div className="v">{languages.length}</div>
            </div>
            <div className="stat">
              <div className="k">Stars</div>
              <div className="v">{totalStars}</div>
            </div>
            <div className="stat">
              <div className="k">Shipped &rsquo;{String(thisYear).slice(2)}</div>
              <div className="v">{shipped}</div>
            </div>
          </div>
        </section>

        {/* ── Work ─────────────────────────────────────────────── */}
        <section id="work" className="section wrap">
          <p className="eyebrow">Selected work</p>
          <h2 className="section-title" data-anim="headline">
            The index, ranked the way I&rsquo;d rank it.
          </h2>
          <p className="section-desc anim-body" data-anim="body">
            Pulled live from GitHub, ordered by what I care about and not by what was trending
            that week.
          </p>

          <div className="grid-cards anim-stagger" data-anim="stagger">
            {top.map((r) => (
              <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="card">
                <div className="card-name">{r.name}</div>
                <p className="card-desc">{r.description}</p>
                <div className="card-meta">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                    <span className="lang-dot" /> {r.language ?? "·"}
                  </span>
                  {r.stars > 0 ? <span>★ {r.stars}</span> : null}
                  <span>{relativeTime(r.pushedAt)}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Robotics / Prometheus ────────────────────────────── */}
        <section id="robotics" className="section wrap">
          <div className="feature">
            <div>
              <p className="eyebrow">Robotics</p>
              <h2 className="section-title" data-anim="headline">
                Prometheus, <span className="it">a drone that flies itself.</span>
              </h2>
              <p className="section-desc anim-body" data-anim="body">
                A 1.85 kg quadcopter I&rsquo;m building to fly on its own. You give it a list of
                GPS points, it takes off, holds position in the wind, runs the route, and turns
                back for home by itself if the battery runs low or the radio link drops. A
                Raspberry Pi rides on top and runs the missions over MAVLink, so I can write a
                whole flight in Python instead of flying it by stick.
              </p>
              <div className="spec-grid anim-stagger" data-anim="stagger">
                {SPECS.map((s) => (
                  <div key={s.k} className="spec">
                    <div className="k">{s.k}</div>
                    <div className="v">{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://github.com/rishith-c/Prometheus" target="_blank" rel="noopener noreferrer" className="chip">
                  Prometheus on GitHub ↗
                </a>
                <a href="https://autonomous-drone-iota.vercel.app" target="_blank" rel="noopener noreferrer" className="chip">
                  Build log ↗
                </a>
              </div>
            </div>

            <div id="hero-mock-2" className="mock-frame">
              <div className="mock-bar">
                <span className="tl" /> <span className="tl" /> <span className="tl" />
                <span style={{ marginLeft: 10 }}>carbon x-frame · dry fit</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mock-media"
                src="/drone/frame.jpg"
                alt="The dry-fit carbon-fiber quadcopter frame with four arms and motors installed."
              />
            </div>
          </div>
        </section>
      </main>

      {/* ── Contact / footer ───────────────────────────────────── */}
      <footer id="contact" className="foot">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title" data-anim="headline">
            Let&rsquo;s build something.
          </h2>
          <a href="mailto:rishithchennupati@gmail.com" className="foot-mail">
            rishithchennupati@gmail.com
          </a>
          <p className="section-desc anim-body" data-anim="body" style={{ color: "rgba(255,255,255,0.6)" }}>
            Email is the best way to reach me. If you&rsquo;re building something in iOS, AI, or
            hardware, especially where those overlap, I&rsquo;d like to hear about it.
          </p>

          <div className="foot-links">
            <a href="https://github.com/rishith-c" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/rishith-chennupati-b4ba202a4/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://www.instagram.com/risheeeeth/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
          </div>

          <div className="foot-base">
            <span>© {thisYear} Rishith Chennupati</span>
            <span>San Jose, CA · 37.34°N, 121.89°W</span>
          </div>
        </div>
      </footer>
    </>
  );
}
