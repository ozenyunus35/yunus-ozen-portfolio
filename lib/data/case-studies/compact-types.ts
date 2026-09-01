import type {
  CaseStudyFlowStep,
  CaseStudyLearning,
  ProcessStep,
  RoleArea,
} from "./types";

export type CompactVisualType =
  | "delivery-horizontal"
  | "dashboard-ia"
  | "qr-journey";

export type CompactCaseStudySection = {
  number: string;
  title: string;
  content?: string;
  intro?: string;
};

export type CompactCaseStudy = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  visual: CompactVisualType;
  hero: {
    title: string;
    subtitle: string;
    roles: string[];
    period: string;
    status: "ongoing" | "completed";
  };
  overview: CompactCaseStudySection & { content: string };
  problem: CompactCaseStudySection & { content: string };
  productFlow?: CompactCaseStudySection & {
    intro: string;
    steps: CaseStudyFlowStep[];
  };
  focus?: CompactCaseStudySection & {
    intro: string;
    items: { id: string; label: string; description: string }[];
  };
  role: CompactCaseStudySection & {
    intro: string;
    areas: RoleArea[];
  };
  process: CompactCaseStudySection & {
    intro: string;
    steps: ProcessStep[];
  };
  outcome?: CompactCaseStudySection & { content: string };
  learnings?: CompactCaseStudySection & {
    intro: string;
    items: CaseStudyLearning[];
  };
  nextProject?: {
    number: string;
    title: string;
    slug: string;
    label: string;
    description: string;
  };
};

export type CompactCaseStudySlug = "eyfel" | "fmd" | "tavuk-da-tavuk";
