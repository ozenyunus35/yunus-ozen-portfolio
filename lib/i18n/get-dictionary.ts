import { compareProjectsByDate } from "@/lib/data/project-periods";
import type { Locale } from "./config";
import { dictionaryEn } from "./dictionaries/en";
import { dictionaryTr } from "./dictionaries/tr";

/** Projects are listed newest first, by start date. */
function sortProjects<D extends { projects: readonly { slug: string }[] }>(dict: D): D {
  return { ...dict, projects: [...dict.projects].sort((a, b) => compareProjectsByDate(a.slug, b.slug)) };
}

const dictionaries = {
  tr: sortProjects(dictionaryTr),
  en: sortProjects(dictionaryEn),
} as const;

export type Dictionary = typeof dictionaryEn | typeof dictionaryTr;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
