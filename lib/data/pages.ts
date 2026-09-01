import { siteConfig } from "./site";

export const pageMetadata = {
  home: {
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
  },
  work: {
    title: "Selected Work",
    description:
      "Product and project case studies — logistics marketplace, delivery operations, education management, and corporate digital products.",
    path: "/work",
  },
  about: {
    title: "About",
    description:
      "Product and project management focus grounded in software engineering — capabilities, process, and how technical background informs product thinking.",
    path: "/about",
  },
  journey: {
    title: "Journey",
    description:
      "Education, projects, and milestones — including NASA Space Apps Challenge and the path toward product management.",
    path: "/journey",
  },
  contact: {
    title: "Contact",
    description:
      "Get in touch — email, LinkedIn, and GitHub. Let's build something useful.",
    path: "/contact",
  },
} as const;

export type PageKey = keyof typeof pageMetadata;
