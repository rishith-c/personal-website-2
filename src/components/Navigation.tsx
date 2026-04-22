"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Instagram } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "about", href: "/about" },
];

interface SocialLink {
  label: string;
  href: string;
  Icon: typeof Mail;
  external?: boolean;
}

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Email", href: "mailto:rishithchennupati@gmail.com", Icon: Mail },
  { label: "GitHub", href: "https://github.com/rishith-c", Icon: Github, external: true },
  { label: "Instagram", href: "https://www.instagram.com/risheeeeth/", Icon: Instagram, external: true },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,900px)]"
    >
      <div
        className={`flex items-center justify-between gap-6 px-5 py-2.5 rounded-full transition-all duration-300 ${
          scrolled ? "glass-strong shadow-lg shadow-black/30" : "glass-subtle"
        }`}
      >
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-white/90 hover:text-[#4ade80] transition-colors"
        >
          rishith c.
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    active
                      ? "text-[#4ade80]"
                      : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          {SOCIAL_LINKS.map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="p-2 rounded-full text-white/60 hover:text-[#4ade80] hover:bg-white/5 transition-colors"
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
