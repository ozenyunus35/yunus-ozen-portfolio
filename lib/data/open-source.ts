/** Merged pull requests in public open-source projects, counted from GitHub at build time and again in the browser. */
export type OpenSourceRepo = {
  repo: string;
  name: string;
  language: string;
  merged: number;
};

export type OpenSourceStats = {
  repos: OpenSourceRepo[];
  total: number;
  repoCount: number;
  /** ISO date of the count, or null when the fallback numbers are shown. */
  countedAt: string | null;
};

export const AUTHOR = "ozenyunus35";

/** Fallback when GitHub cannot be reached (counted 6 Nov 2026). */
export const OPEN_SOURCE_REPOS: OpenSourceRepo[] = [
  { repo: "repowise-dev/repowise", name: "repowise", language: "Python · TypeScript", merged: 28 },
  { repo: "stephenh/ts-proto", name: "ts-proto", language: "TypeScript", merged: 17 },
  { repo: "uutils/coreutils", name: "uutils/coreutils", language: "Rust", merged: 20 },
  { repo: "cachix/devenv", name: "devenv", language: "Rust", merged: 5 },
  { repo: "Automattic/harper", name: "Harper", language: "Rust", merged: 5 },
  { repo: "oxc-project/oxc", name: "oxc", language: "Rust", merged: 4 },
];

const FALLBACK: OpenSourceStats = {
  repos: OPEN_SOURCE_REPOS,
  total: 123,
  repoCount: 35,
  countedAt: null,
};

export const OPEN_SOURCE_ALSO = [
  "Grafana",
  "Gitea",
  "Nuxt",
  "Apache DataFusion",
  "Turso",
  "OpenTelemetry",
  "SQLFluff",
  "rules_go",
];

export function mergedPrsUrl(repo: string): string {
  return `https://github.com/${repo}/pulls?q=is%3Apr+author%3A${AUTHOR}+is%3Amerged`;
}

type SearchResponse = {
  total_count: number;
  items: { repository_url: string }[];
};

/** Owners whose repositories don't count as open-source work, as SHA-256 of the lowercase name. */
const EXCLUDED_OWNERS = new Set([
  "102ac65b6a6a8f184b122c45a5369df31392807437a1dc62fa6e2582fe151068",
  "0a1fa2f638f828c9ab0976a8a9f0b2171d122896b859f65fa542ab9d53f55a44",
]);

async function sha256(text: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const MERGED_QUERY = `is:pr is:merged author:${AUTHOR} -user:${AUTHOR}`;

/** One page of the GitHub issue search; works with or without a token. */
export async function searchPage(query: string, page = 1, token?: string): Promise<SearchResponse> {
  const url = new URL("https://api.github.com/search/issues");
  url.searchParams.set("q", query);
  url.searchParams.set("per_page", "100");
  url.searchParams.set("page", String(page));
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`GitHub search ${res.status}`);
  return res.json() as Promise<SearchResponse>;
}

/** Every merged PR, grouped by repository, without the excluded owners. */
export async function countMergedPrs(token?: string): Promise<OpenSourceStats> {
  const first = await searchPage(MERGED_QUERY, 1, token);
  const items = [...first.items];
  for (let page = 2; items.length < first.total_count && page <= 10; page++) {
    items.push(...(await searchPage(MERGED_QUERY, page, token)).items);
  }
  const owners = new Map<string, boolean>();
  const perRepo = new Map<string, number>();
  for (const item of items) {
    const repo = item.repository_url.replace("https://api.github.com/repos/", "").toLowerCase();
    const owner = repo.split("/")[0];
    if (!owners.has(owner)) owners.set(owner, EXCLUDED_OWNERS.has(await sha256(owner)));
    if (owners.get(owner)) continue;
    perRepo.set(repo, (perRepo.get(repo) ?? 0) + 1);
  }
  const total = [...perRepo.values()].reduce((a, b) => a + b, 0);
  return {
    repos: OPEN_SOURCE_REPOS.map((r) => ({ ...r, merged: perRepo.get(r.repo.toLowerCase()) ?? r.merged }))
      .sort((a, b) => b.merged - a.merged),
    total,
    repoCount: perRepo.size,
    countedAt: new Date().toISOString(),
  };
}

let cached: Promise<OpenSourceStats> | null = null;

/**
 * The build-time count (both languages share it); any failure falls back to
 * the numbers above. The browser counts again on load, see useLiveOpenSource.
 */
export function getOpenSourceStats(): Promise<OpenSourceStats> {
  cached ??= countMergedPrs(process.env.GITHUB_TOKEN).catch((error) => {
    console.warn("Open source stats: using fallback numbers.", error);
    return FALLBACK;
  });
  return cached;
}
