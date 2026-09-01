import type { CompactCaseStudy } from "./compact-types";
import { formatProjectPeriod } from "../project-periods";

export const tavukCaseStudy: CompactCaseStudy = {
  slug: "tavuk-da-tavuk",
  meta: {
    title: "Tavuk da Tavuk — Case Study",
    description:
      "Design and development case study for Tavuk da Tavuk — a corporate promotional website and QR menu platform with responsive UI/UX.",
  },
  visual: "qr-journey",
  hero: {
    title: "TAVUK DA TAVUK",
    subtitle: "Corporate Web & QR Menu",
    roles: ["Web Design & Development", "Responsive UI/UX"],
    period: formatProjectPeriod("tavuk-da-tavuk", "en"),
    status: "completed",
  },
  overview: {
    number: "02",
    title: "Overview",
    content:
      "Tavuk da Tavuk combines a corporate promotional website with a QR menu platform for on-site dining. The project required responsive interface design and development for both brand presence and practical menu access.",
  },
  problem: {
    number: "03",
    title: "The Problem",
    content:
      "The business needed both a corporate web presence and a digital menu accessible on-site via QR codes. Customers expect to scan and browse on their phones, while the brand site needs to communicate identity across desktop and mobile viewports.",
  },
  productFlow: {
    number: "04",
    title: "QR-to-Menu Journey",
    intro:
      "The on-site experience follows a direct path from physical touchpoint to digital menu.",
    steps: [
      { id: "scan", label: "Scan", annotation: "QR code on-site" },
      { id: "menu", label: "Menu", annotation: "Digital catalog" },
      { id: "browse", label: "Browse", annotation: "Mobile interface" },
      { id: "select", label: "Select", annotation: "Item choice" },
    ],
  },
  role: {
    number: "05",
    title: "My Role",
    intro:
      "Handled web design and development with a focus on responsive experience across the corporate site and QR menu platform.",
    areas: [
      {
        area: "Design",
        responsibilities: [
          "Designed responsive UI/UX for web and mobile viewports",
          "Structured the corporate website and menu interface",
        ],
      },
      {
        area: "Development",
        responsibilities: [
          "Built and implemented the responsive web experience",
          "Developed the QR menu platform for real on-site use",
        ],
      },
    ],
  },
  process: {
    number: "06",
    title: "Process",
    intro:
      "Work moved from brand and UX definition through to responsive implementation.",
    steps: [
      {
        id: "structure",
        label: "Structure",
        description: "Defined website architecture and QR menu layout for mobile-first access.",
      },
      {
        id: "design",
        label: "Design",
        description: "Created responsive interface designs for corporate and menu experiences.",
      },
      {
        id: "build",
        label: "Build",
        description: "Developed both platforms with attention to cross-device consistency.",
      },
      {
        id: "deploy",
        label: "Deploy",
        description: "Launched for real business use — corporate site and on-site QR menus.",
      },
    ],
  },
  outcome: {
    number: "07",
    title: "Outcome",
    content:
      "The corporate website and QR menu platform were delivered and deployed for real business use during 2023–2024.",
  },
  learnings: {
    number: "08",
    title: "Learnings",
    intro: "Reflections based on the design and development work described.",
    items: [
      {
        id: "l1",
        text: "QR menu experiences require mobile-first thinking — the primary interaction happens on a phone, not a desktop.",
      },
      {
        id: "l2",
        text: "Combining a corporate site and functional menu platform meant balancing brand presentation with practical usability.",
      },
    ],
  },
  nextProject: {
    number: "09",
    title: "Next Project",
    slug: "bisevk",
    label: "Bi-Sevk",
    description: "Logistics marketplace platform",
  },
};
