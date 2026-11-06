/** Filter categories on the project index — the same in every language. */
export const PROJECT_CATEGORIES = ["ai", "web", "mobile", "automation"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_CATEGORY_MAP: Record<string, ProjectCategory[]> = {
  folio: ["web", "automation"],
  quarry: ["ai", "web"],
  tally: ["ai", "automation", "web"],
  bisevk: ["web", "mobile"],
  fieldline: ["mobile"],
  cadence: ["web"],
  relay: ["ai", "web"],
  "atlas-portal": ["web"],
  "pdf-to-excel": ["automation", "web"],
  "lead-scraper": ["automation"],
  "tavuk-da-tavuk": ["web"],
};
