import type { CompactCaseStudy } from "./compact-types";
import { formatProjectPeriod } from "../project-periods";

export const fmdCaseStudy: CompactCaseStudy = {
  slug: "fmd",
  meta: {
    title: "FMD Eğitim Portalı — Product Case Study",
    description:
      "UI/UX case study for FMD Eğitim Portalı, a management panel focused on information architecture, user flows, and design-development collaboration.",
  },
  visual: "dashboard-ia",
  hero: {
    title: "FMD EĞİTİM PORTALI",
    subtitle: "Management Panel",
    roles: [
      "UI/UX",
      "Panel Structure",
      "User Flows",
      "Technical Team Collaboration",
    ],
    period: formatProjectPeriod("fmd", "en"),
    status: "completed",
  },
  overview: {
    number: "02",
    title: "Overview",
    content:
      "FMD Eğitim Portalı is a management panel for education operations. The work focused on structuring how information is organized, how users navigate the system, and how interface design aligns with the technical team's implementation.",
  },
  problem: {
    number: "03",
    title: "The Problem",
    content:
      "Education operations require managing users, content, and reporting through a single interface. Without clear information architecture and defined user flows, management panels become difficult to navigate and expensive to extend.",
  },
  focus: {
    number: "04",
    title: "Focus Areas",
    intro:
      "The case study centers on design and structural decisions rather than implementation ownership.",
    items: [
      {
        id: "ia",
        label: "Information Architecture",
        description:
          "Organizing panel sections, navigation hierarchy, and content groupings for education management workflows.",
      },
      {
        id: "flows",
        label: "User Flows",
        description:
          "Mapping how administrators move through tasks — from overview to specific management actions.",
      },
      {
        id: "dashboard",
        label: "Dashboard Structure",
        description:
          "Defining the layout and component structure for operational visibility and module access.",
      },
      {
        id: "collaboration",
        label: "Design–Development Collaboration",
        description:
          "Working with the technical team to translate interface decisions into feasible implementation plans.",
      },
    ],
  },
  role: {
    number: "05",
    title: "My Role",
    intro:
      "Contributed through UI/UX design and panel structuring — collaborating with the technical team rather than leading development.",
    areas: [
      {
        area: "Design",
        responsibilities: [
          "Defined panel structure and navigation hierarchy",
          "Designed user flows for management tasks",
          "Created interface systems for education operations",
        ],
      },
      {
        area: "Collaboration",
        responsibilities: [
          "Worked with the technical team on feasibility and handoff",
          "Aligned design decisions with implementation constraints",
        ],
      },
    ],
  },
  process: {
    number: "06",
    title: "Process",
    intro:
      "Work progressed from understanding management needs to structured interface delivery.",
    steps: [
      {
        id: "research",
        label: "Research",
        description: "Understood management requirements and existing operational patterns.",
      },
      {
        id: "architecture",
        label: "Architecture",
        description: "Defined information architecture and navigation structure for the panel.",
      },
      {
        id: "flows",
        label: "Flows",
        description: "Mapped user journeys across management tasks and module access.",
      },
      {
        id: "handoff",
        label: "Handoff",
        description: "Collaborated with the technical team on design-to-development transition.",
      },
    ],
  },
  outcome: {
    number: "07",
    title: "Outcome",
    content:
      "The management panel structure and interface system were defined and delivered in collaboration with the technical team during 2024.",
  },
  learnings: {
    number: "08",
    title: "Learnings",
    intro: "Reflections based on the design-focused work described.",
    items: [
      {
        id: "l1",
        text: "Management panels benefit from information architecture decisions made before interface detail — navigation structure determines usability.",
      },
      {
        id: "l2",
        text: "Close collaboration with the technical team early prevented design decisions that would have been difficult to implement.",
      },
    ],
  },
  nextProject: {
    number: "09",
    title: "Next Project",
    slug: "tavuk-da-tavuk",
    label: "Tavuk da Tavuk",
    description: "Corporate website and QR menu platform",
  },
};
