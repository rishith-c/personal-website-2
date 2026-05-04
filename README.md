# personal-website-2

Rishith Chennupati's personal website, version 2. A multi-page Next.js 16 site that pulls projects live from the GitHub API instead of hardcoding them.

## Pages

- **Home** (`/`) - Hero section, skill cards, live GitHub stats, featured projects, languages, and a contact CTA.
- **Projects** (`/projects`) - Full list of repos fetched from `api.github.com/users/rishith-c/repos`, sorted by most recently pushed. Forks are excluded.
- **About** (`/about`) - Bio, skill areas, tech stack badges, three most recent projects, and social links.

The GitHub data is fetched server-side and revalidated every hour, so the site stays current without rebuilding.

## Stack

- Next.js 16 (App Router) with React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- Framer Motion for animations
- Lucide icons

## Quickstart

```bash
npm install
npm run dev
```

Opens at http://localhost:3000.

Optionally set a `GITHUB_TOKEN` environment variable to raise the GitHub API rate limit from 60 requests/hour (unauthenticated) to 5,000/hour.

## Project Structure

```
src/
  app/
    page.tsx          - Home page (hero + featured projects)
    projects/page.tsx - All repos from GitHub
    about/page.tsx    - About page with bio and tech stack
    layout.tsx        - Root layout with navigation and footer
    globals.css       - Global styles
  components/
    ProjectGrid.tsx   - Grid layout for project cards
    ProjectCard.tsx   - Individual project card
    GitHubStats.tsx   - Repo count, stars, and language breakdown
    Navigation.tsx    - Top nav bar
    Footer.tsx        - Site footer
    ui/               - shadcn/ui primitives (card, badge, button, etc.)
  lib/
    github.ts         - GitHub API client with revalidation and featured repo curation
    utils.ts          - Utility functions
```

## Deployment

Configured for Netlify via `netlify.toml`. Also works on Vercel with zero config.

## Screenshots

<!-- Add screenshot: Home page hero section with skill cards -->
<!-- Add screenshot: Projects page showing live GitHub repos -->
<!-- Add screenshot: About page with GitHub stats -->
