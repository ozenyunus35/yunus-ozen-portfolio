import type { Locale } from "./config";
import { dictionaryEn } from "./dictionaries/en";
import { dictionaryTr } from "./dictionaries/tr";

const dictionaries = {
  tr: dictionaryTr,
  en: dictionaryEn,
} as const;

export type Dictionary = typeof dictionaryEn | typeof dictionaryTr;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
