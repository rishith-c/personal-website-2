import { Coffee, Github } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  Icon?: typeof Coffee;
  external?: boolean;
}

const FOOTER_LINKS: FooterLink[] = [
  { label: "rishithc.com", href: "https://rishithc.com", external: true },
  { label: "buy me a coffee", href: "https://buymeacoffee.com/rishithc", Icon: Coffee, external: true },
  { label: "github", href: "https://github.com/rishith-c", Icon: Github, external: true },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-white/30">
          © 2026 rishith chennupati. made with care.
        </p>
        <ul className="flex items-center gap-5">
          {FOOTER_LINKS.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1.5 font-mono text-xs text-white/30 hover:text-accent transition-colors"
              >
                {Icon ? <Icon size={13} strokeWidth={1.75} aria-hidden /> : null}
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
