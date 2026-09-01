import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizedPath } from "@/lib/i18n/paths";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const dict = getDictionary(locale);
    const base = dict.site.url;

    const pages = [
      { path: "/", priority: 1 },
      { path: "/work", priority: 0.9 },
      { path: "/about", priority: 0.9 },
      { path: "/journey", priority: 0.9 },
      { path: "/contact", priority: 0.9 },
    ];

    for (const page of pages) {
      entries.push({
        url: `${base}${localizedPath(page.path, locale)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page.priority,
      });
    }

    for (const project of dict.projects) {
      entries.push({
        url: `${base}${localizedPath(project.href, locale)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: project.tier === "primary" ? 0.9 : 0.8,
      });
    }
  }

  return entries;
}
