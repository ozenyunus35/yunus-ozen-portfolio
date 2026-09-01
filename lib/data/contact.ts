import { siteConfig } from "@/lib/data/site";

export const contactContent = {
  sectionNumber: "09",
  sectionLabel: "Contact",
  headline: ["CONTACT", "DETAILS."],
  actions: {
    email: {
      label: "Email",
      href: siteConfig.email,
    },
    linkedin: {
      label: "LinkedIn",
      href: siteConfig.social.linkedin,
    },
    github: {
      label: "GitHub",
      href: siteConfig.social.github,
    },
    cv: {
      label: "Download CV",
      href: siteConfig.cv,
    },
  },
} as const;

export type ContactLink = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

function isConfiguredUrl(url: string | null): url is string {
  return Boolean(url && !url.includes("placeholder"));
}

export function getContactLinks(): ContactLink[] {
  const links: ContactLink[] = [];

  if (isConfiguredUrl(contactContent.actions.email.href)) {
    links.push({
      label: contactContent.actions.email.label,
      href: `mailto:${contactContent.actions.email.href}`,
    });
  }

  if (isConfiguredUrl(contactContent.actions.linkedin.href)) {
    links.push({
      label: contactContent.actions.linkedin.label,
      href: contactContent.actions.linkedin.href!,
      external: true,
    });
  }

  if (isConfiguredUrl(contactContent.actions.github.href)) {
    links.push({
      label: contactContent.actions.github.label,
      href: contactContent.actions.github.href!,
      external: true,
    });
  }

  if (isConfiguredUrl(contactContent.actions.cv.href)) {
    links.push({
      label: contactContent.actions.cv.label,
      href: contactContent.actions.cv.href!,
      download: true,
    });
  }

  return links;
}

export function getPrimaryContactLink(): ContactLink | null {
  const email = contactContent.actions.email.href;
  if (!isConfiguredUrl(email)) return null;

  return {
    label: contactContent.actions.email.label,
    href: `mailto:${email}`,
  };
}

export function getSecondaryContactLinks(): ContactLink[] {
  return getContactLinks().filter(
    (link) => link.label !== contactContent.actions.email.label,
  );
}
