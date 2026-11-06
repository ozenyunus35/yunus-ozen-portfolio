import { compareMilestonesByDate, compareProjectsByDate } from "@/lib/data/project-periods";
import type { Locale } from "./config";
import { dictionaryEn } from "./dictionaries/en";
import { dictionaryTr } from "./dictionaries/tr";

/** Projects are listed newest first; the journey runs oldest first. Both follow the start dates, so a new entry lands in place on its own. */
function sortProjects<D extends { projects: readonly { slug: string }[]; journey: { milestones: readonly { id: string }[] } }>(dict: D): D {
  return {
    ...dict,
    projects: [...dict.projects].sort((a, b) => compareProjectsByDate(a.slug, b.slug)),
    journey: { ...dict.journey, milestones: [...dict.journey.milestones].sort((a, b) => compareMilestonesByDate(a.id, b.id)) },
  };
}

const dictionaries = {
  tr: sortProjects(dictionaryTr),
  en: sortProjects(dictionaryEn),
} as const;

export type Dictionary = typeof dictionaryEn | typeof dictionaryTr;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
