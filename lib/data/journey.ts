export type JourneyStep = {
  id: string;
  number: string;
  title: string;
  details: string[];
};

export const productJourneyContent = {
  sectionNumber: "04",
  sectionLabel: "Product Journey",
  heading: "HOW I BUILD PRODUCTS",
  steps: [
    {
      id: "understand",
      number: "01",
      title: "UNDERSTAND",
      details: ["Problem", "User", "Business"],
    },
    {
      id: "research",
      number: "02",
      title: "RESEARCH",
      details: ["Market", "Competitors", "Requirements"],
    },
    {
      id: "define",
      number: "03",
      title: "DEFINE",
      details: ["MVP", "Scope", "Priorities"],
    },
    {
      id: "design",
      number: "04",
      title: "DESIGN",
      details: ["User Flow", "UX", "System"],
    },
    {
      id: "build",
      number: "05",
      title: "BUILD",
      details: ["Development", "Coordination", "Testing"],
    },
    {
      id: "launch",
      number: "06",
      title: "LAUNCH",
      details: ["Release", "Feedback"],
    },
    {
      id: "iterate",
      number: "07",
      title: "ITERATE",
      details: ["Feedback", "Learning", "Improvement"],
    },
  ] satisfies JourneyStep[],
} as const;

export type JourneyStepState = "completed" | "active" | "upcoming";
