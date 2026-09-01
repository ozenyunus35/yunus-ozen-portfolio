export type ConceptNode = {
  id: string;
  label: string;
  description: string;
};

export const productEngineeringContent = {
  sectionNumber: "04",
  sectionLabel: "Product × Engineering",
  headline: ["PRODUCT THINKING.", "ENGINEERING MINDSET."],
  product: {
    title: "PRODUCT",
    nodes: [
      {
        id: "ux",
        label: "UX",
        description:
          "Translating user needs into clear flows, interfaces, and interaction patterns.",
      },
      {
        id: "business",
        label: "BUSINESS",
        description:
          "Understanding why a product should exist — value, constraints, and priorities.",
      },
      {
        id: "data",
        label: "DATA",
        description:
          "Using evidence and feedback to inform decisions rather than assumptions.",
      },
    ],
  },
  engineering: {
    title: "ENGINEERING",
    nodes: [
      {
        id: "api",
        label: "API",
        description:
          "How systems communicate — endpoints, contracts, and integration boundaries.",
      },
      {
        id: "frontend",
        label: "Frontend",
        description:
          "Building responsive interfaces that connect user experience to application logic.",
      },
      {
        id: "backend",
        label: "Backend",
        description:
          "Server-side structure, business logic, and the systems behind the interface.",
      },
      {
        id: "database",
        label: "Database",
        description:
          "Data modeling and storage — how information is organized and retrieved.",
      },
      {
        id: "ui-ux",
        label: "UI/UX",
        description:
          "The overlap where design decisions meet implementation constraints.",
      },
      {
        id: "system-design",
        label: "System Design",
        description:
          "Thinking in components, dependencies, and how parts connect in a product.",
      },
    ],
  },
} as const;

export type ConceptSide = keyof Pick<
  typeof productEngineeringContent,
  "product" | "engineering"
>;
