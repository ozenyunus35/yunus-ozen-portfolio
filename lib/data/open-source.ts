/** Merged pull requests in public open-source projects (counted 31 Oct 2026). */
export type OpenSourceRepo = {
  repo: string;
  name: string;
  language: string;
  merged: number;
};

export const OPEN_SOURCE_REPOS: OpenSourceRepo[] = [
  { repo: "repowise-dev/repowise", name: "repowise", language: "Python · TypeScript", merged: 28 },
  { repo: "stephenh/ts-proto", name: "ts-proto", language: "TypeScript", merged: 17 },
  { repo: "uutils/coreutils", name: "uutils/coreutils", language: "Rust", merged: 17 },
  { repo: "cachix/devenv", name: "devenv", language: "Rust", merged: 5 },
  { repo: "Automattic/harper", name: "Harper", language: "Rust", merged: 5 },
  { repo: "oxc-project/oxc", name: "oxc", language: "Rust", merged: 4 },
];

export const OPEN_SOURCE_TOTAL = "115";

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
  return `https://github.com/${repo}/pulls?q=is%3Apr+author%3Aozenyunus35+is%3Amerged`;
}
