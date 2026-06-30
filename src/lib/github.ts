/**
 * Minimal server-side GitHub client. Pulls public, owned, non-fork repos
 * for the index, ranked by a light signal blend (recency + stars + a real
 * description). Cached for an hour.
 */
const GITHUB_USER = "rishith-c";
const REVALIDATE = 60 * 60;

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
  createdAt: string;
}

interface RawRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  created_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

export async function fetchRepos(user = GITHUB_USER): Promise<Repo[]> {
  const out: Repo[] = [];
  for (let page = 1; page <= 4; page++) {
    let res: Response;
    try {
      res = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=100&page=${page}&sort=pushed&type=owner`,
        { headers: headers(), next: { revalidate: REVALIDATE } },
      );
    } catch {
      break;
    }
    if (!res.ok) break;
    const raw = (await res.json()) as RawRepo[];
    if (!Array.isArray(raw) || raw.length === 0) break;
    for (const r of raw) {
      if (r.private || r.fork || r.archived) continue;
      if ((r.description?.trim().length ?? 0) < 8) continue;
      out.push({
        id: r.id,
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
        createdAt: r.created_at,
      });
    }
    if (raw.length < 100) break;
  }
  return out;
}

export function rankRepos(repos: Repo[], now = Date.now()): Repo[] {
  const score = (r: Repo) => {
    let s = r.stars * 8;
    const ageDays = Math.max(1, (now - Date.parse(r.pushedAt)) / 86400000);
    s += (30 / Math.pow(ageDays / 30 + 1, 1.2)) * 10;
    if ((r.description?.trim().length ?? 0) > 8) s += 6;
    return s;
  };
  return [...repos].sort((a, b) => score(b) - score(a));
}

export function summarizeLanguages(repos: Repo[]): { language: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  return [...counts.entries()]
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count);
}

export function relativeTime(iso: string): string {
  const sec = Math.max(0, (Date.now() - Date.parse(iso)) / 1000);
  const day = sec / 86400;
  if (day < 1) return "today";
  if (day < 14) return `${Math.round(day)}d ago`;
  if (day < 60) return `${Math.round(day / 7)}w ago`;
  if (day < 365) return `${Math.round(day / 30)}mo ago`;
  return `${Math.round(day / 365)}y ago`;
}
