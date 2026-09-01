"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type I18nContextValue = {
  locale: Locale;
  dict: Dictionary;
  path: (href: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
};

export function I18nProvider({ locale, dict, children }: I18nProviderProps) {
  const value = useMemo(
    () => ({
      locale,
      dict,
      path: (href: string) => localizedPath(href, locale),
    }),
    [locale, dict],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
