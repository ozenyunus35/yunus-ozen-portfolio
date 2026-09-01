import type { CompactCaseStudy } from "./compact-types";
import { formatProjectPeriod } from "../project-periods";

export const eyfelCaseStudy: CompactCaseStudy = {
  slug: "eyfel",
  meta: {
    title: "Eyfel Kurye — Product Case Study",
    description:
      "Product and project case study for Eyfel Kurye, a restaurant and courier operations system integrated with online platforms.",
  },
  visual: "delivery-horizontal",
  hero: {
    title: "EYFEL KURYE",
    subtitle: "Restaurant & Courier Operations",
    roles: [
      "Product & Project Management",
      "Product Structure",
      "User Experience",
      "Development Process",
      "Team Coordination",
    ],
    period: formatProjectPeriod("eyfel", "en"),
    status: "completed",
  },
  overview: {
    number: "02",
    title: "Overview",
    content:
      "Eyfel Kurye is an operations system for restaurants and courier teams, integrated with online ordering platforms. The product coordinates the path from incoming orders through restaurant preparation to courier dispatch and delivery.",
  },
  problem: {
    number: "03",
    title: "The Problem",
    content:
      "Restaurants receiving orders from multiple online platforms need a unified way to manage incoming requests, kitchen workflow, and courier assignment. Without a structured system, coordination between restaurant staff and delivery teams becomes fragmented and difficult to track.",
  },
  productFlow: {
    number: "04",
    title: "Product Flow",
    intro:
      "The platform follows the operational sequence from order intake through to customer delivery.",
    steps: [
      { id: "order", label: "Order", annotation: "Platform intake" },
      { id: "restaurant", label: "Restaurant", annotation: "Kitchen prep" },
      { id: "courier", label: "Courier", annotation: "Dispatch" },
      { id: "delivery", label: "Delivery", annotation: "Handoff" },
    ],
  },
  role: {
    number: "05",
    title: "My Role",
    intro:
      "Work centered on product structure and project coordination — defining how the system should operate and ensuring the team moved through development with clear responsibilities.",
    areas: [
      {
        area: "Product",
        responsibilities: [
          "Defined product structure and operational logic",
          "Shaped user experience across restaurant and courier workflows",
        ],
      },
      {
        area: "Project",
        responsibilities: [
          "Managed development process and team coordination",
          "Aligned product scope with delivery timelines",
        ],
      },
    ],
  },
  process: {
    number: "06",
    title: "Process",
    intro:
      "The project moved through structured phases with ongoing coordination between product definition and development work.",
    steps: [
      {
        id: "scope",
        label: "Scope",
        description: "Defined operational requirements based on restaurant and courier needs.",
      },
      {
        id: "structure",
        label: "Structure",
        description: "Mapped product architecture and user flows across both sides of the system.",
      },
      {
        id: "development",
        label: "Development",
        description: "Coordinated the team through build phases with regular alignment checkpoints.",
      },
      {
        id: "delivery",
        label: "Delivery",
        description: "Supported rollout and iteration based on operational feedback.",
      },
    ],
  },
  outcome: {
    number: "07",
    title: "Outcome",
    content:
      "The project was completed in 2025. The operations system was structured and delivered for restaurant and courier use integrated with online ordering platforms.",
  },
  learnings: {
    number: "08",
    title: "Learnings",
    intro: "Reflections based on the work described — not presented as quantified outcomes.",
    items: [
      {
        id: "l1",
        text: "Coordinating two operational sides — restaurant and courier — required clear product structure before development could proceed efficiently.",
      },
      {
        id: "l2",
        text: "Integration with external ordering platforms added complexity to how incoming orders were normalized and processed.",
      },
    ],
  },
  nextProject: {
    number: "09",
    title: "Next Project",
    slug: "fmd",
    label: "FMD Eğitim Portalı",
    description: "Management panel for education operations",
  },
};
