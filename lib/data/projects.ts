import { formatProjectPeriod } from "./project-periods";

export type ProjectTier = "primary" | "secondary";

export type ProjectVisual =
  | "logistics-vertical"
  | "delivery-chain"
  | "dashboard"
  | "mobile-qr";

export type FlowNode = {
  id: string;
  label: string;
  meta?: string;
};

export type Project = {
  slug: string;
  title: string;
  displayTitle: string;
  tier: ProjectTier;
  period: string;
  industry: string;
  tagline: string;
  description: string;
  roles: string[];
  href: string;
  status: "ongoing" | "completed";
  visual: ProjectVisual;
  flowNodes: FlowNode[];
};

export const selectedWorkIntro = {
  number: "03",
  label: "SELECTED WORK",
  headline: ["Products I've helped", "turn into reality."],
} as const;

export const projects: Project[] = [
  {
    slug: "bisevk",
    title: "Bi-Sevk",
    displayTitle: "BI-SEVK",
    tier: "primary",
    period: formatProjectPeriod("bisevk", "en"),
    industry: "LOGISTICS / MARKETPLACE",
    tagline: "Logistics platform connecting shippers with carriers",
    description:
      "A logistics platform connecting load owners and shippers with carriers and truck drivers — structuring the flow from load posting to delivery.",
    roles: [
      "Product Management",
      "Project Management",
      "Team Coordination",
      "UI/UX",
      "Technical Collaboration",
    ],
    href: "/work/bisevk",
    status: "ongoing",
    visual: "logistics-vertical",
    flowNodes: [
      { id: "shipper", label: "SHIPPER", meta: "Load owner" },
      { id: "load", label: "LOAD", meta: "Posted freight" },
      { id: "offer", label: "OFFER", meta: "Carrier bid" },
      { id: "carrier", label: "CARRIER", meta: "Truck driver" },
      { id: "transport", label: "TRANSPORT", meta: "In transit" },
      { id: "delivery", label: "DELIVERY", meta: "Completed" },
    ],
  },
  {
    slug: "tavuk-da-tavuk",
    title: "Tavuk da Tavuk",
    displayTitle: "TAVUK DA TAVUK",
    tier: "secondary",
    period: formatProjectPeriod("tavuk-da-tavuk", "en"),
    industry: "CORPORATE / HOSPITALITY",
    tagline: "Corporate website and QR menu platform",
    description:
      "Corporate web presence and QR menu platform — responsive interface design and development for on-site and mobile dining experiences.",
    roles: ["Web Design & Development", "Responsive UI/UX"],
    href: "/work/tavuk-da-tavuk",
    status: "completed",
    visual: "mobile-qr",
    flowNodes: [
      { id: "scan", label: "SCAN", meta: "QR access" },
      { id: "menu", label: "MENU", meta: "Digital catalog" },
      { id: "order", label: "ORDER", meta: "Selection" },
    ],
  },
  {
    slug: "fmd",
    title: "FMD Eğitim Portalı",
    displayTitle: "FMD EĞİTİM PORTALI",
    tier: "secondary",
    period: formatProjectPeriod("fmd", "en"),
    industry: "EDUCATION / MANAGEMENT",
    tagline: "Management panel for education operations",
    description:
      "Management panel structuring education operations — defining panel architecture, user flows, and interface systems in collaboration with the technical team.",
    roles: [
      "UI/UX",
      "Panel Structure",
      "User Flows",
      "Technical Collaboration",
    ],
    href: "/work/fmd-egitim",
    status: "completed",
    visual: "dashboard",
    flowNodes: [
      { id: "overview", label: "OVERVIEW", meta: "Dashboard" },
      { id: "users", label: "USERS", meta: "Management" },
      { id: "content", label: "CONTENT", meta: "Modules" },
      { id: "reports", label: "REPORTS", meta: "Analytics" },
    ],
  },
  {
    slug: "eyfel",
    title: "Eyfel Kurye",
    displayTitle: "EYFEL KURYE",
    tier: "secondary",
    period: formatProjectPeriod("eyfel", "en"),
    industry: "OPERATIONS / DELIVERY",
    tagline: "Restaurant and courier operations platform",
    description:
      "Operations system for restaurants and courier teams, integrated with online ordering platforms — coordinating orders from intake to delivery.",
    roles: [
      "Product & Project Management",
      "Product Structure",
      "User Experience",
      "Development Process",
      "Team Coordination",
    ],
    href: "/work/eyfel-kurye",
    status: "completed",
    visual: "delivery-chain",
    flowNodes: [
      { id: "order", label: "ORDER", meta: "Platform intake" },
      { id: "restaurant", label: "RESTAURANT", meta: "Kitchen prep" },
      { id: "courier", label: "COURIER", meta: "Dispatch" },
      { id: "delivery", label: "DELIVERY", meta: "Handoff" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getPrimaryProject(): Project {
  return projects.find((p) => p.tier === "primary")!;
}

export function getSecondaryProjects(): Project[] {
  return projects.filter((p) => p.tier === "secondary");
}

export function getAllSelectedProjects(): Project[] {
  return projects;
}
