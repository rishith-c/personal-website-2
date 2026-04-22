"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Github, Instagram, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string): boolean =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled
          ? "border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href="/"
          className="font-mono text-base font-semibold tracking-tight hover:text-primary transition-colors"
        >
          rishith.c
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Button
                  asChild
                  variant={active ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "text-sm font-medium",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Link href={link.href} aria-current={active ? "page" : undefined}>
                    {link.label}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          {SOCIAL_LINKS.map(({ label, href, Icon, external }) => (
            <Button asChild key={label} variant="ghost" size="icon" aria-label={label} title={label}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <Icon className="size-4" />
              </a>
            </Button>
          ))}
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden" />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-full flex-col gap-6 p-6">
              <div className="font-mono text-base font-semibold">rishith.c</div>
              <Separator />
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Button
                        asChild
                        variant={active ? "secondary" : "ghost"}
                        className="w-full justify-start text-base"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Link href={link.href} aria-current={active ? "page" : undefined}>
                          {link.label}
                        </Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
              <Separator />
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map(({ label, href, Icon, external }) => (
                  <Button asChild key={label} variant="outline" size="icon" aria-label={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      <Icon className="size-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
