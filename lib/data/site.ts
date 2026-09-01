import { CV_PUBLIC_PATH, getCvPublicUrl } from "./cv";
import { getSiteUrl } from "./site-url";

const cvAvailable = process.env.NEXT_PUBLIC_CV_AVAILABLE === "true";

export const siteConfig = {
  name: "Yunus Emre Özen",
  title: "Yunus Emre Özen — Personal Site",
  description:
    "Software engineering student. An informational site about projects, processes, and learning. Based in İzmir, Türkiye.",
  url: getSiteUrl(),
  locale: "en_US",
  location: "İzmir, Türkiye",
  role: "Software Engineering Student",
  focus: ["Product Management", "Project Management", "Software Engineering"],
  initials: "YÖ",
  portfolioYear: "2026",
  cvPath: CV_PUBLIC_PATH,
  cv: cvAvailable ? getCvPublicUrl() : null,
  email: "ozenyunusemre@outlook.com",
  social: {
    linkedin: "https://www.linkedin.com/in/yunus-ozen/",
    github: "https://github.com/ozenyunus35",
  },
} as const;

export const heroContent = {
  name: ["YUNUS", "EMRE", "ÖZEN"],
  introKeywords: ["PRODUCT", "PROJECT", "SYSTEMS", "UX"],
  statement: ["PRODUCT & PROJECT", "MANAGEMENT."],
  secondary: siteConfig.role,
  supporting:
    "This site documents my projects, thinking, and learning — not for hiring or client outreach.",
  actions: {
    work: { label: "Selected Work", href: "/work" },
    ...(siteConfig.cv
      ? { cv: { label: "Download CV", href: siteConfig.cv } }
      : {}),
  },
  meta: {
    location: siteConfig.location.toUpperCase(),
    portfolio: `PERSONAL SITE / ${siteConfig.portfolioYear}`,
  },
} as const;

export const positioningContent = {
  statement: [
    "I don't just think about how a product is built.",
    "I care about why it should be built.",
  ],
  columns: [
    {
      title: "PRODUCT",
      items: ["Strategy", "Requirements", "UX"],
    },
    {
      title: "PROJECT",
      items: ["Coordination", "Planning", "Delivery"],
    },
    {
      title: "ENGINEERING",
      items: ["Technical Background", "Web & Mobile", "Systems Thinking"],
    },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Journey", href: "/journey" },
  { label: "Contact", href: "/contact" },
];

function isConfiguredExternalUrl(url: string | null): url is string {
  return Boolean(url && !url.includes("placeholder"));
}

export const socialNav: NavItem[] = [
  ...(isConfiguredExternalUrl(siteConfig.social.linkedin)
    ? [{ label: "LinkedIn", href: siteConfig.social.linkedin, external: true }]
    : []),
  ...(isConfiguredExternalUrl(siteConfig.social.github)
    ? [{ label: "GitHub", href: siteConfig.social.github, external: true }]
    : []),
];

export const homepageSections = [
  { id: "hero", number: "01", label: "Hero" },
  { id: "positioning", number: "02", label: "Positioning" },
  { id: "work", number: "03", label: "Selected Work" },
  { id: "product-engineering", number: "04", label: "Product × Engineering" },
  { id: "exploring", number: "05", label: "Current Focus" },
  { id: "cta", number: "06", label: "Contact" },
] as const;
