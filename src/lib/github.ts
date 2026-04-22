/**
 * GitHub API client (server-side).
 *
 * Pulls repos for the configured user with Next.js revalidation so we don't
 * hammer the API. Falls back gracefully if the request fails.
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
  let page = 1;
  const perPage = 100;

  // Most users have well under a few hundred public repos; cap at 5 pages.
  for (; page <= 5; page++) {
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
      // Skip forks — surface only original work.
      if (item.fork) continue;
      repos.push(mapRepo(item));
    }

    if (raw.length < perPage) break;
  }

  // Most-recently-pushed first.
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
 * Featured set used on the home page. Curated by repo name (case-insensitive)
 * — ordering matches the order given here. Anything missing from the live
 * GitHub feed is silently dropped.
 */
const FEATURED_REPO_NAMES: string[] = [
  "fire-spread-ai",
  "decide-multiverse",
  "sentry",
  "CoachBuddy",
  "Countr",
  "Autonomous-Drone",
  "AutoDoor",
  "Body-Tracking-Solution",
  "Fluentry",
];

export async function fetchFeaturedRepos(): Promise<GitHubRepo[]> {
  const all = await fetchAllRepos();
  const lookup = new Map<string, GitHubRepo>(
    all.map((repo) => [repo.name.toLowerCase(), repo]),
  );
  const featured: GitHubRepo[] = [];
  for (const name of FEATURED_REPO_NAMES) {
    const match = lookup.get(name.toLowerCase());
    if (match) featured.push(match);
  }
  return featured;
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
