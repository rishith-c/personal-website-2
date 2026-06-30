/**
 * Hardware feature block. The rest of the site is light paper; this one runs
 * dark on purpose so the drone build reads as its own chapter. Real photos
 * from the bench, a plain-spoken account of what the thing actually does, and
 * a spec rail. One project, named: Prometheus.
 */
const SPECS = [
  { k: "Airframe", v: "1.85 kg" },
  { k: "Firmware", v: "ArduCopter 4.6.3" },
  { k: "Thrust / weight", v: "1.89 : 1" },
  { k: "Hover time", v: "12 to 15 min" },
  { k: "Companion", v: "Raspberry Pi 4" },
  { k: "Control", v: "DroneKit over MAVLink" },
];

export default function Robotics() {
  return (
    <section
      id="robotics"
      aria-labelledby="robotics-heading"
      className="relative isolate overflow-hidden bg-[#141110] text-[#efe9df]"
    >
      {/* faint pixel-mosaic wash on the left, like light catching a circuit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(120% 90% at 0% 0%, rgba(220,70,45,0.10), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to right, #000, transparent)",
          WebkitMaskImage: "linear-gradient(to right, #000, transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
        <p className="reveal-on-view font-mono text-[11px] uppercase tracking-[0.18em] text-[#d2654f]">
          § Hardware
        </p>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* left: the story */}
          <div>
            <h2
              id="robotics-heading"
              className="reveal-lines font-[family-name:var(--font-serif)] text-[clamp(3.4rem,8vw,6.4rem)] leading-[0.92] tracking-[-0.02em]"
            >
              <span className="rise-mask">
                <span className="reveal-line-inner" style={{ ["--i" as never]: 0 }}>
                  Prometheus
                </span>
              </span>
              <span className="rise-mask">
                <span
                  className="reveal-line-inner italic text-[#b8b0a4]"
                  style={{ ["--i" as never]: 1 }}
                >
                  a drone that flies itself.
                </span>
              </span>
            </h2>

            <div className="mt-8 max-w-[46ch] space-y-5 text-[16.5px] leading-[1.6] text-[#cfc8bc] sm:text-[17.5px]">
              <p className="reveal-on-view">
                Prometheus is a 1.85 kilogram quadcopter I&rsquo;m building to fly
                on its own. You give it a list of GPS points, it takes off, holds
                its spot in the wind, runs the route, and turns back for home by
                itself if the battery runs low or the radio link drops.
              </p>
              <p className="reveal-on-view">
                The flight controller runs ArduCopter. A Raspberry Pi 4 sits on
                top as a companion computer and talks to it over MAVLink, so I
                can write a whole mission in Python instead of flying it by
                stick. The frame is assembled, the motors and ESCs are dialed in,
                and the GPS gets a solid lock. First real flight is next.
              </p>
              <p className="reveal-on-view text-[#a89f92]">
                I&rsquo;m writing down every step as I go, the wiring, the configs,
                the parts list, so someone could build the same machine from the
                repo alone.
              </p>
            </div>

            {/* spec rail */}
            <dl className="reveal-stagger mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/12 pt-7 font-mono sm:grid-cols-3">
              {SPECS.map((s) => (
                <div key={s.k}>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8d857a]">
                    {s.k}
                  </dt>
                  <dd className="mt-1.5 text-[14px] text-[#efe9df]">{s.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-3 font-mono text-[12.5px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[#cfc8bc]">
                <span className="pulse-dot" aria-hidden />
                Building now · first flight pending
              </span>
              <a
                href="https://github.com/rishith-c/Prometheus"
                target="_blank"
                rel="noopener noreferrer"
                className="press rounded-full bg-[#efe9df] px-3.5 py-1.5 text-[#141110] transition-colors hover:bg-white"
              >
                Prometheus on GitHub ↗
              </a>
              <a
                href="https://autonomous-drone-iota.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="press rounded-full border border-white/15 px-3.5 py-1.5 text-[#cfc8bc] hover:border-white/40 hover:text-white"
              >
                Build log ↗
              </a>
            </div>
          </div>

          {/* right: the bench */}
          <div className="reveal-on-view grid grid-cols-1 gap-4">
            <figure className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/drone/brain.jpg"
                alt="The autonomy stack on Prometheus: a Raspberry Pi 4, a Matek flight controller, and a BN-880 GPS wired onto the carbon frame."
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="border-t border-white/10 px-4 py-3 font-mono text-[11px] text-[#9a9286]">
                The brain. Raspberry Pi 4, flight controller, and GPS on the
                center deck.
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/drone/frame.jpg"
                alt="The dry-fit carbon-fiber quadcopter frame with four arms, motor mounts, and brushless motors installed."
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
              <figcaption className="border-t border-white/10 px-4 py-3 font-mono text-[11px] text-[#9a9286]">
                Carbon X-frame, dry-fit before the wiring went in.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
