export type ProjectMedia = {
  /** MacBook + iPhone screenshot pair in public/, without base path. */
  image: string;
  demo: string;
  source: string;
};

/** Screenshot visuals and public links for projects with a live demo — the same in every language. */
export const PROJECT_MEDIA: Record<string, ProjectMedia> = {
  relay: {
    image: "/projects/relay.webp",
    demo: "https://ozenyunus35.github.io/ai-support-assistant/",
    source: "https://github.com/ozenyunus35/ai-support-assistant",
  },
  "atlas-portal": {
    image: "/projects/atlas-portal.webp",
    demo: "https://ozenyunus35.github.io/admin-file-portal/",
    source: "https://github.com/ozenyunus35/admin-file-portal",
  },
  "pdf-to-excel": {
    image: "/projects/pdf-to-excel.webp",
    demo: "https://ozenyunus35.github.io/pdf-data-extractor/",
    source: "https://github.com/ozenyunus35/pdf-data-extractor",
  },
  "lead-scraper": {
    image: "/projects/lead-scraper.webp",
    demo: "https://ozenyunus35.github.io/lead-scraper/",
    source: "https://github.com/ozenyunus35/lead-scraper",
  },
};
