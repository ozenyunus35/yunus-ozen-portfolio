import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

export function createMetadata(locale: Locale, overrides?: Partial<Metadata>): Metadata {
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(dict.site.url),
    title: {
      default: dict.site.title,
      template: `%s — ${dict.site.name}`,
    },
    description: dict.site.description,
    authors: [{ name: dict.site.name }],
    creator: dict.site.name,
    openGraph: {
      type: "website",
      locale: dict.site.locale,
      url: dict.site.url,
      siteName: dict.site.name,
      title: dict.site.title,
      description: dict.site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.title,
      description: dict.site.description,
      creator: dict.site.name,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...overrides,
  };
}

function cleanPath(path: string): string {
  return path.replace(/^\/(tr|en)/, "") || "/";
}

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
  locale: Locale,
): Metadata {
  const dict = getDictionary(locale);
  const url = `${dict.site.url}${path}`;
  const base = createMetadata(locale);
  const bare = cleanPath(path);

  return {
    ...base,
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        tr: `${dict.site.url}${localizedPath(bare, "tr")}`,
        en: `${dict.site.url}${localizedPath(bare, "en")}`,
      },
    },
    openGraph: {
      ...base.openGraph,
      title,
      description,
      url,
    },
    twitter: {
      ...base.twitter,
      title,
      description,
    },
  };
}

export function createProjectMetadata(
  title: string,
  description: string,
  slug: string,
  locale: Locale,
): Metadata {
  const dict = getDictionary(locale);
  const path = localizedPath(`/work/${slug}`, locale);
  const url = `${dict.site.url}${path}`;
  const base = createMetadata(locale);

  return {
    ...base,
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...base.openGraph,
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      ...base.twitter,
      title,
      description,
    },
  };
}
