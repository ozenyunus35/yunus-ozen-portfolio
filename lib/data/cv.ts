import { withBasePath } from "./base-path";

/** Path under `public/` — file must exist at build time for the download link to appear. */
export const CV_PUBLIC_PATH = "/documents/Yunus_Emre_Ozen_CV.pdf" as const;

export function getCvPublicUrl(): string {
  return withBasePath(CV_PUBLIC_PATH);
}
