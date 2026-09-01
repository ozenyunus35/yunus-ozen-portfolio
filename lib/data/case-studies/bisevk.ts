import type {
  CaseStudyActor,
  CaseStudyChallenge,
  CaseStudyFlowStep,
  CaseStudyLearning,
  DiscoveryItem,
  ProcessStep,
  ProductDecision,
  RoleArea,
} from "./types";
import { formatProjectPeriod } from "../project-periods";

export const bisevkCaseStudy = {
  slug: "bisevk",
  meta: {
    title: "Bi-Sevk — Product Case Study",
    description:
      "Product and project case study for Bi-Sevk, a logistics marketplace connecting load owners with carriers in Türkiye.",
  },

  hero: {
    title: "BI-SEVK",
    subtitle: "Logistics Marketplace",
    roles: [
      "Product Management",
      "Project Management",
      "Team Coordination",
      "UI/UX",
      "Development",
    ],
    period: formatProjectPeriod("bisevk", "en"),
  },

  overview: {
    number: "02",
    title: "Overview",
    content:
      "Bi-Sevk is a logistics marketplace platform that connects load owners and shippers with carriers and truck drivers. The product creates a digital workflow for posting freight, discovering opportunities, making offers, and coordinating transportation through to delivery.",
  },

  problem: {
    number: "03",
    title: "The Problem",
    content:
      "Load owners need reliable transportation for their freight. Carriers and truck drivers need access to suitable loads that match their capacity and routes. Without a structured digital workflow, matching supply and demand relies on fragmented communication. Bi-Sevk addresses this by connecting both sides through a single platform.",
  },

  discovery: {
    number: "04",
    title: "Discovery",
    intro:
      "The project began from a real client request. Before development, the focus was on understanding what was being asked, what already existed in the market, and what the initial product scope should include.",
    items: [
      {
        id: "client-requirements",
        label: "Client Requirements",
        description:
          "Evaluated the initial project request and maintained direct communication with the client to understand expectations and constraints.",
      },
      {
        id: "competitor-research",
        label: "Competitor Research",
        description:
          "Researched existing logistics and marketplace platforms, with particular focus on competitors operating in Türkiye.",
      },
      {
        id: "market-analysis",
        label: "Market Analysis",
        description:
          "Analyzed how similar products structure the shipper–carrier relationship and what patterns exist in the local market context.",
      },
      {
        id: "initial-scope",
        label: "Initial Product Scope",
        description:
          "Worked toward defining what the first version of the product needed to include before committing to development.",
      },
    ] satisfies DiscoveryItem[],
  },

  productDefinition: {
    number: "05",
    title: "Product Definition",
    intro:
      "The initial scope was defined before development began — translating client requirements and research findings into a structured plan the team could execute against.",
    flow: [
      { id: "requirements", label: "Requirements", annotation: "From client & research" },
      { id: "prioritization", label: "Prioritization", annotation: "Scope decisions" },
      { id: "mvp", label: "MVP", annotation: "First version" },
      { id: "dev-plan", label: "Development Plan", annotation: "Timeline & cost" },
    ] satisfies CaseStudyFlowStep[],
    note: "MVP scope, project timeline, and cost considerations were evaluated as part of this definition phase — not after development had already started.",
  },

  userTypes: {
    number: "06",
    title: "User Types",
    intro:
      "The platform serves two primary sides of the marketplace. Actor definitions are based on the product's core marketplace structure.",
    actors: [
      {
        id: "load-owner",
        label: "Load Owner",
        description:
          "Shippers who post freight and need carriers to transport their loads.",
      },
      {
        id: "carrier",
        label: "Carrier",
        description:
          "Truck drivers and carrier operators who seek suitable loads and submit offers.",
      },
    ] satisfies CaseStudyActor[],
  },

  coreFlow: {
    number: "07",
    title: "Core Product Flow",
    intro:
      "The platform's workflow connects load owners and carriers through a structured sequence — from listing to delivery.",
    steps: [
      { id: "load-owner", label: "Load Owner", annotation: "Marketplace participant" },
      { id: "load-listing", label: "Load Listing", annotation: "Freight posted" },
      { id: "carrier-discovery", label: "Carrier Discovery", annotation: "Available loads" },
      { id: "offer", label: "Offer", annotation: "Carrier bid" },
      { id: "selection", label: "Selection", annotation: "Match confirmed" },
      { id: "transportation", label: "Transportation", annotation: "In transit" },
      { id: "delivery", label: "Delivery", annotation: "Completed" },
    ] satisfies CaseStudyFlowStep[],
  },

  myRole: {
    number: "08",
    title: "My Role",
    intro:
      "Responsibilities spanned product definition, project coordination, interface design, and hands-on development — often overlapping rather than operating in isolation.",
    areas: [
      {
        area: "Product",
        responsibilities: [
          "Evaluated the initial client request",
          "Researched competitors, particularly in Türkiye",
          "Helped define requirements and MVP scope",
        ],
      },
      {
        area: "Project",
        responsibilities: [
          "Considered project timeline and cost",
          "Formed the development team",
          "Coordinated responsibilities and managed processes",
        ],
      },
      {
        area: "UX",
        responsibilities: [
          "Participated in UI/UX work across the product",
        ],
      },
      {
        area: "Technical",
        responsibilities: [
          "Participated in development when necessary",
          "Bridged product decisions with implementation work",
        ],
      },
    ] satisfies RoleArea[],
    intersection:
      "Product scoping informed project planning. Project coordination kept design and development aligned with client requirements. UX decisions were made with implementation constraints in mind. Technical involvement helped validate whether defined scope was feasible within timeline and cost.",
  },

  developmentProcess: {
    number: "09",
    title: "Development Process",
    intro:
      "Work moved through structured phases while maintaining alignment between what the client needed and what the team was building.",
    steps: [
      {
        id: "requirement",
        label: "Requirement",
        description: "Translating client needs and defined scope into actionable work items.",
      },
      {
        id: "design",
        label: "Design",
        description: "UI/UX exploration aligned with product structure and user flows.",
      },
      {
        id: "development",
        label: "Development",
        description: "Building platform features with ongoing coordination across the team.",
      },
      {
        id: "testing",
        label: "Testing",
        description: "Validating functionality against defined requirements before release.",
      },
      {
        id: "iteration",
        label: "Iteration",
        description: "Refining the product based on feedback and ongoing project needs.",
      },
    ] satisfies ProcessStep[],
    coordination:
      "Client requirements remained the reference point throughout — design and development work was coordinated to stay within the defined MVP scope and project timeline.",
  },

  productDecisions: {
    number: "10",
    title: "Product Decisions",
    intro:
      "Documented product decisions will be added as verified content becomes available. The structure below is prepared for individual decision records.",
    decisions: [
      {
        id: "decision-01",
        status: "todo",
      },
      {
        id: "decision-02",
        status: "todo",
      },
    ] satisfies ProductDecision[],
  },

  challenges: {
    number: "11",
    title: "Challenges",
    intro:
      "Verified challenges will be documented here. Content is pending — placeholders are intentionally empty rather than fabricated.",
    items: [
      { id: "challenge-01", status: "todo" },
      { id: "challenge-02", status: "todo" },
    ] satisfies CaseStudyChallenge[],
  },

  currentStatus: {
    number: "12",
    title: "Current Status",
    content:
      "The project is ongoing. Development and product work continue as the platform evolves.",
  },

  learnings: {
    number: "13",
    title: "What I Learned",
    intro:
      "Reflections based on the responsibilities described — not presented as quantified outcomes.",
    items: [
      {
        id: "learning-01",
        text: "Starting from a real client request required continuously balancing product ambition with timeline and cost constraints.",
      },
      {
        id: "learning-02",
        text: "Competitor research focused on the Türkiye market helped frame initial scope before development commitments were made.",
      },
      {
        id: "learning-03",
        text: "Forming and coordinating a development team required clear responsibility assignment alongside ongoing product alignment.",
      },
      {
        id: "learning-04",
        text: "Participating in both product/UX and development work provided practical context for scope and feasibility decisions.",
      },
    ] satisfies CaseStudyLearning[],
  },

  nextProject: {
    number: "14",
    title: "Next Project",
    slug: "eyfel",
    label: "Eyfel Kurye",
    description: "Restaurant and courier operations platform",
  },
} as const;

export type BiSevkCaseStudy = typeof bisevkCaseStudy;
