import type { SectionId } from "./store";

export interface SectionConfig {
  id: SectionId;
  label: string;
}

export const SECTIONS: SectionConfig[] = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "robotics", label: "Robotics" },
  { id: "contact", label: "Contact" },
];

export const SECTION_HEIGHT_VH = 100;
export const TOTAL_SCROLL_VH = SECTIONS.length * SECTION_HEIGHT_VH;

export const GITHUB_USERNAME = "rishith-c";

/** Optional live demos keyed by repo name. */
export const REPO_DEMO_LINKS: Record<string, string> = {
  Prometheus: "https://autonomous-drone-iota.vercel.app",
  grid: "https://apps.apple.com/app/id6745692380",
};

export const PORTFOLIO = {
  name: "Rishith Chennupati",
  about:
    "I'm fifteen, in San Jose. I started writing code in middle school and haven't really stopped since: iOS apps, on-device AI, web things, and lately a drone that flies itself. Scroll down to see what I've shipped, or just email me.",
  email: "rishithchennupati@gmail.com",
  social: [
    { label: "GitHub", href: `https://github.com/${GITHUB_USERNAME}` },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rishith-chennupati-b4ba202a4/" },
    { label: "Instagram", href: "https://www.instagram.com/risheeeeth/" },
  ],
};
