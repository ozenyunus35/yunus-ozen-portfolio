import { formatProjectPeriod } from "./project-periods";

export type ExperienceMilestone = {
  id: string;
  period: string;
  title: string;
  context?: string;
  description: string;
  type: "education" | "project" | "event";
  href?: string;
};

export const experienceContent = {
  sectionLabel: "Journey",
  headline: ["Building toward product", "through real systems."],
  intro:
    "A timeline of education, projects, and milestones — each shaping how I approach product and project work.",
  milestones: [
    {
      id: "education",
      period: "Ongoing",
      title: "Software Engineering",
      context: "Education",
      description:
        "Studying software engineering while focusing on product management, project coordination, and systems thinking.",
      type: "education",
    },
    {
      id: "nasa-2022",
      period: "2022",
      title: "NASA Space Apps Challenge",
      context: "Elazığ",
      description:
        "Participated in the NASA International Space Apps Challenge — collaborating on a team project. Related repository available on GitHub.",
      type: "event",
      href: "https://github.com/ozenyunus35/WINK-TO-THE-FUTURE-INNOSOFT",
    },
    {
      id: "eyfel",
      period: formatProjectPeriod("eyfel", "en"),
      title: "Eyfel Kurye",
      context: "Operations / Delivery",
      description:
        "Operations system for restaurants and courier teams, integrated with online ordering platforms.",
      type: "project",
      href: "/work/eyfel-kurye",
    },
    {
      id: "fmd",
      period: formatProjectPeriod("fmd", "en"),
      title: "FMD Eğitim Portalı",
      context: "Education / Management",
      description:
        "Management panel structuring education operations — panel architecture, user flows, and interface systems.",
      type: "project",
      href: "/work/fmd-egitim",
    },
    {
      id: "bisevk",
      period: formatProjectPeriod("bisevk", "en"),
      title: "Bi-Sevk",
      context: "Logistics / Marketplace",
      description:
        "Logistics marketplace connecting load owners with carriers — product and project leadership on an ongoing platform.",
      type: "project",
      href: "/work/bisevk",
    },
    {
      id: "tavuk-da-tavuk",
      period: formatProjectPeriod("tavuk-da-tavuk", "en"),
      title: "Tavuk da Tavuk",
      context: "Corporate / Hospitality",
      description:
        "Corporate web presence and QR menu platform — responsive interface design and development.",
      type: "project",
      href: "/work/tavuk-da-tavuk",
    },
  ] satisfies ExperienceMilestone[],
} as const;
