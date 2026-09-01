import { positioningContent } from "@/lib/data/site";
import { siteConfig } from "@/lib/data/site";

export const aboutContent = {
  sectionNumber: "01",
  sectionLabel: "About",
  headline: ["Product thinking", "with engineering depth."],
  paragraphs: [
    "I'm a Software Engineering student interested in what happens beyond the code.",
    "My experience across development, UI/UX and project coordination gradually moved my focus toward product management.",
    "I enjoy understanding problems, structuring requirements and working with teams to turn ideas into usable products.",
  ],
  positioning: positioningContent.statement,
  focusStatement:
    "Technical background informs how I scope products, coordinate delivery, and evaluate what is feasible within real constraints.",
  capabilities: positioningContent.columns,
  meta: [
    { label: "Based In", value: siteConfig.location },
    { label: "Education", value: "Software Engineering" },
    { label: "Focus", value: "Product & Project Management" },
  ],
} as const;
