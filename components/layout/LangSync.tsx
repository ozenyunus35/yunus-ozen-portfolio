"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";

const LOCALE_STORAGE_KEY = "NEXT_LOCALE";

export function LangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  return null;
}
