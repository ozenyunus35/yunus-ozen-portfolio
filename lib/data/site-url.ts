import { basePath } from "./base-path";

const GITHUB_USER = "ozenyunus35";
const GITHUB_REPO = "yunus-ozen-portfolio";

/** Public origin including repo subpath when deployed to GitHub Pages project sites. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (basePath) {
    return `https://${GITHUB_USER}.github.io${basePath}`;
  }

  return `https://${GITHUB_USER}.github.io/${GITHUB_REPO}`;
}
