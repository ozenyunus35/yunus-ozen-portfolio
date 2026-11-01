/** Merged pull requests in public open-source projects. Counts are refreshed from GitHub at build time. */
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

const AUTHOR = "ozenyunus35";

/** Fallback when GitHub cannot be reached during the build (counted 31 Oct 2026). */
export const OPEN_SOURCE_REPOS: OpenSourceRepo[] = [
  { repo: "repowise-dev/repowise", name: "repowise", language: "Python · TypeScript", merged: 28 },
  { repo: "stephenh/ts-proto", name: "ts-proto", language: "TypeScript", merged: 17 },
  { repo: "uutils/coreutils", name: "uutils/coreutils", language: "Rust", merged: 17 },
  { repo: "cachix/devenv", name: "devenv", language: "Rust", merged: 5 },
  { repo: "Automattic/harper", name: "Harper", language: "Rust", merged: 5 },
  { repo: "oxc-project/oxc", name: "oxc", language: "Rust", merged: 4 },
];

const FALLBACK: OpenSourceStats = {
  repos: OPEN_SOURCE_REPOS,
  total: 115,
  repoCount: 33,
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

async function search(query: string, page = 1): Promise<SearchResponse> {
  const url = new URL("https://api.github.com/search/issues");
  url.searchParams.set("q", query);
  url.searchParams.set("per_page", "100");
  url.searchParams.set("page", String(page));
  const token = process.env.GITHUB_TOKEN;
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

let cached: Promise<OpenSourceStats> | null = null;

/**
 * Merged PR counts from the GitHub search API. Runs once per build (both
 * languages share the result); any failure falls back to the numbers above.
 */
export function getOpenSourceStats(): Promise<OpenSourceStats> {
  cached ??= (async () => {
    try {
      const base = `is:pr is:merged author:${AUTHOR} -user:${AUTHOR}`;
      const first = await search(base);
      const items = [...first.items];
      for (let page = 2; items.length < first.total_count && page <= 10; page++) {
        items.push(...(await search(base, page)).items);
      }
      const perRepo = new Map<string, number>();
      for (const item of items) {
        const repo = item.repository_url.replace("https://api.github.com/repos/", "");
        perRepo.set(repo.toLowerCase(), (perRepo.get(repo.toLowerCase()) ?? 0) + 1);
      }
      return {
        repos: OPEN_SOURCE_REPOS.map((r) => ({ ...r, merged: perRepo.get(r.repo.toLowerCase()) ?? r.merged })),
        total: first.total_count,
        repoCount: perRepo.size,
        countedAt: new Date().toISOString().slice(0, 10),
      };
    } catch (error) {
      console.warn("Open source stats: using fallback numbers.", error);
      return FALLBACK;
    }
  })();
  return cached;
}
