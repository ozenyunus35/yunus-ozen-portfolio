/** Repo subpath for GitHub Pages project sites, e.g. "/yunus-ozen-portfolio". Empty for local dev. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!basePath) return normalized;
  return `${basePath}${normalized}`;
}
