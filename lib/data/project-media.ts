export type ProjectMedia = {
  /** MacBook + iPhone screenshot pair in public/, without base path. */
  image: string;
  /** Live demo, or the production site when `live` is set. */
  demo: string;
  /** Source repository, or the case study for client work. */
  source: string;
  /** Client work in production: no public source, link the case study instead. */
  live?: boolean;
};

/** Screenshot visuals and public links for every project — the same in every language. */
export const PROJECT_MEDIA: Record<string, ProjectMedia> = {
  bisevk: {
    image: "/projects/bisevk.webp",
    demo: "https://bisevk.com",
    source: "https://github.com/ozenyunus35/bisevk-case-study",
    live: true,
  },
  fieldline: {
    image: "/projects/fieldline.webp",
    demo: "https://ozenyunus35.github.io/field-service-app/",
    source: "https://github.com/ozenyunus35/field-service-app",
  },
  cadence: {
    image: "/projects/cadence.webp",
    demo: "https://ozenyunus35.github.io/booking-scheduler/",
    source: "https://github.com/ozenyunus35/booking-scheduler",
  },
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
  folio: {
    image: "/projects/folio.webp",
    demo: "https://ozenyunus35.github.io/double-entry-ledger/",
    source: "https://github.com/ozenyunus35/double-entry-ledger",
  },
  quarry: {
    image: "/projects/quarry.webp",
    demo: "https://ozenyunus35.github.io/sql-copilot/",
    source: "https://github.com/ozenyunus35/sql-copilot",
  },
  tally: {
    image: "/projects/tally.webp",
    demo: "https://ozenyunus35.github.io/invoice-extractor/",
    source: "https://github.com/ozenyunus35/invoice-extractor",
  },
  "lead-scraper": {
    image: "/projects/lead-scraper.webp",
    demo: "https://ozenyunus35.github.io/lead-scraper/",
    source: "https://github.com/ozenyunus35/lead-scraper",
  },
  "tavuk-da-tavuk": {
    image: "/projects/tavuk-da-tavuk.webp",
    demo: "https://www.tavukdatavukelazig.com",
    source: "https://github.com/ozenyunus35/tavuk-da-tavuk-case-study",
    live: true,
  },
};
