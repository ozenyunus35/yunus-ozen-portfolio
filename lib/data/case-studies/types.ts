export type ContentStatus = "published" | "todo";

export function hasPublishedContent(
  items: { status: ContentStatus }[],
): boolean {
  return items.some((item) => item.status === "published");
}

export type CaseStudyFlowStep = {
  id: string;
  label: string;
  annotation?: string;
};

export type CaseStudyActor = {
  id: string;
  label: string;
  description: string;
};

export type ProductDecision = {
  id: string;
  status: ContentStatus;
  title?: string;
  problem?: string;
  context?: string;
  options?: string[];
  decision?: string;
  reasoning?: string;
  result?: string;
};

export type CaseStudyChallenge = {
  id: string;
  status: ContentStatus;
  title?: string;
  description?: string;
};

export type CaseStudyLearning = {
  id: string;
  text: string;
};

export type RoleArea = {
  area: string;
  responsibilities: string[];
};

export type DiscoveryItem = {
  id: string;
  label: string;
  description: string;
};

export type ProcessStep = {
  id: string;
  label: string;
  description: string;
};
