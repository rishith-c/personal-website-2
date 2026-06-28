/**
 * GitHub API client (server-side).
 *
 * Pulls every public, owned, non-fork repo from the configured user.
 * Featured / highlighted repos are derived from signal (recency, stars,
 * description, topics) — nothing hardcoded.
 */

const GITHUB_USER = "rishith-c";
const REVALIDATE_SECONDS = 60 * 60; // 1 hour

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  watchers: number;
  pushedAt: string;
  createdAt: string;
  updatedAt: string;
  isFork: boolean;
  isArchived: boolean;
  isPrivate: boolean;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
}

interface RawRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

interface RawProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
}

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return headers;
}

function mapRepo(raw: RawRepo): GitHubRepo {
  return {
    id: raw.id,
    name: raw.name,
    fullName: raw.full_name,
    description: raw.description,
    url: raw.html_url,
    homepage: raw.homepage,
    language: raw.language,
    topics: raw.topics ?? [],
    stars: raw.stargazers_count,
    forks: raw.forks_count,
    watchers: raw.watchers_count,
    pushedAt: raw.pushed_at,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    isFork: raw.fork,
    isArchived: raw.archived,
    isPrivate: raw.private,
  };
}

export async function fetchAllRepos(user: string = GITHUB_USER): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  const perPage = 100;

  for (let page = 1; page <= 5; page++) {
    const url = `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=${perPage}&page=${page}&sort=pushed&direction=desc&type=owner`;

    let response: Response;
    try {
      response = await fetch(url, {
        headers: authHeaders(),
        next: { revalidate: REVALIDATE_SECONDS },
      });
    } catch {
      break;
    }

    if (!response.ok) break;

    const raw = (await response.json()) as RawRepo[];
    if (!Array.isArray(raw) || raw.length === 0) break;

    for (const item of raw) {
      if (item.private) continue; // never surface private work
      if (item.fork) continue;
      if (item.archived) continue;
      // Hide empty / WIP repos. No description = wasn't worth publishing.
      const desc = item.description?.trim() ?? "";
      if (desc.length < 8) continue;
      repos.push(mapRepo(item));
    }

    if (raw.length < perPage) break;
  }

  return repos.sort(
    (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime(),
  );
}

export async function fetchProfile(user: string = GITHUB_USER): Promise<GitHubProfile | null> {
  const url = `https://api.github.com/users/${encodeURIComponent(user)}`;
  try {
    const response = await fetch(url, {
      headers: authHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;
    const raw = (await response.json()) as RawProfile;
    return {
      login: raw.login,
      name: raw.name,
      bio: raw.bio,
      avatarUrl: raw.avatar_url,
      htmlUrl: raw.html_url,
      publicRepos: raw.public_repos,
      followers: raw.followers,
      following: raw.following,
      location: raw.location,
      blog: raw.blog,
    };
  } catch {
    return null;
  }
}

/**
 * Score a repo by signal. Higher = more worth surfacing.
 *
 * Why: the old site hardcoded a curated list, so featured work went stale
 * the moment a new repo shipped. This derives "interesting" from data the
 * user already maintains on GitHub (push activity, stars, descriptions,
 * topics), so the homepage stays current without manual upkeep.
 */
export function scoreRepo(repo: GitHubRepo, now: number = Date.now()): number {
  let score = 0;

  // Stars are the strongest signal of public interest.
  score += repo.stars * 8;

  // Recency: full credit if pushed in last 30 days, decays to ~0 after a year.
  const ageDays = Math.max(1, (now - new Date(repo.pushedAt).getTime()) / 86400000);
  score += 30 / Math.pow(ageDays / 30 + 1, 1.2) * 10;

  // Having a description means the author cared enough to explain it.
  if (repo.description && repo.description.trim().length > 8) score += 6;

  // Topics signal intentional categorization.
  score += Math.min(repo.topics.length, 4) * 1.5;

  // Penalize empty repos.
  if (!repo.description && repo.stars === 0) score -= 4;

  return score;
}

export function rankRepos(repos: GitHubRepo[]): GitHubRepo[] {
  const now = Date.now();
  return [...repos].sort((a, b) => scoreRepo(b, now) - scoreRepo(a, now));
}

export interface LanguageBreakdown {
  language: string;
  count: number;
}

export function summarizeLanguages(repos: GitHubRepo[]): LanguageBreakdown[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    const lang = repo.language;
    if (!lang) continue;
    counts.set(lang, (counts.get(lang) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count);
}
