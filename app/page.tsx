"use client";

import { useEffect } from "react";
import { withBasePath } from "@/lib/data/base-path";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

const LOCALE_STORAGE_KEY = "NEXT_LOCALE";

export default function RootRedirectPage() {
  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    const locale = stored && isLocale(stored) ? stored : defaultLocale;
    window.location.replace(withBasePath(`/${locale}/`));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-body text-muted-foreground">Redirecting…</p>
    </main>
  );
}
