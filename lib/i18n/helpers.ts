import type { Dictionary } from "@/lib/i18n/get-dictionary";

export type ContactLink = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

function isConfiguredUrl(url: string | null): url is string {
  return Boolean(url && !url.includes("placeholder"));
}

export function getContactLinks(dict: Dictionary): ContactLink[] {
  const links: ContactLink[] = [];
  const { site, contact } = dict;

  if (isConfiguredUrl(site.email)) {
    links.push({
      label: contact.actions.email,
      href: `mailto:${site.email}`,
    });
  }

  if (isConfiguredUrl(site.social.linkedin)) {
    links.push({
      label: contact.actions.linkedin,
      href: site.social.linkedin,
      external: true,
    });
  }

  if (isConfiguredUrl(site.social.github)) {
    links.push({
      label: contact.actions.github,
      href: site.social.github,
      external: true,
    });
  }

  if (isConfiguredUrl(site.cv)) {
    links.push({
      label: contact.actions.cv,
      href: site.cv!,
      download: true,
    });
  }

  return links;
}

export function getProjects(dict: Dictionary) {
  return dict.projects;
}

export function getSocialNav(dict: Dictionary) {
  const items = [];
  if (isConfiguredUrl(dict.site.social.linkedin)) {
    items.push({ label: "LinkedIn", href: dict.site.social.linkedin, external: true });
  }
  if (isConfiguredUrl(dict.site.social.github)) {
    items.push({ label: "GitHub", href: dict.site.social.github, external: true });
  }
  return items;
}

export function getRouteFromPathname(pathname: string, dict: Dictionary) {
  const stripped = pathname.replace(/^\/(tr|en)/, "") || "/";
  if (stripped === "/") return dict.routes[0];
  if (stripped.startsWith("/work")) return dict.routes[1];
  if (stripped.startsWith("/about")) return dict.routes[2];
  if (stripped.startsWith("/journey")) return dict.routes[3];
  if (stripped.startsWith("/contact")) return dict.routes[4];
  return dict.routes[0];
}
