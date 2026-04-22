# personal-website-2

rishith chennupati's personal website — v2.

multi-page next.js 16 site that pulls projects live from the github api instead of hardcoding them. featured projects on the home page, all projects on `/projects`, and an about page.

## stack

- next.js 16 (app router) + react 19
- tailwind 4
- framer motion
- lucide icons
- live data from the github rest api (`api.github.com/users/rishith-c/repos`)

## run locally

```bash
npm install
npm run dev
```

site comes up at http://localhost:3000.

## structure

- `src/app/page.tsx` — home (hero + featured projects)
- `src/app/projects/page.tsx` — all repos pulled live from github
- `src/app/about/page.tsx` — about
- `src/lib/github.ts` — github api client (server-side, revalidated hourly)
- `src/components/` — ui pieces

## env

optional: set `GITHUB_TOKEN` to raise the github api rate limit (5k/h authenticated vs 60/h unauth).
