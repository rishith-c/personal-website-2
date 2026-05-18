interface MarqueeProps {
  items: string[];
}

/**
 * Infinite horizontal marquee. Pure CSS animation, paused on hover via
 * `.marquee-host:hover .marquee`. The items array is duplicated so the loop
 * is seamless regardless of count.
 */
export default function Marquee({ items }: MarqueeProps) {
  if (items.length === 0) return null;
  const loop = [...items, ...items];

  return (
    <section
      aria-hidden
      className="marquee-host relative border-y border-[color:var(--color-rule-soft)] bg-[color:var(--color-bg)] py-7"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[color:var(--color-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[color:var(--color-bg)] to-transparent" />
      <div className="overflow-hidden">
        <ul className="marquee">
          {loop.map((label, i) => (
            <li
              key={`${label}-${i}`}
              className="flex shrink-0 items-center gap-6 px-6 font-[family-name:var(--font-serif)] text-[clamp(2rem,4vw,3.5rem)] italic leading-none text-[color:var(--color-ink-soft)]"
            >
              <span>{label}</span>
              <span
                aria-hidden
                className="inline-block size-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
