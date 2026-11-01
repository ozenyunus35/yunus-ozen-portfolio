"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { switchLocalePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils/cn";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale: current } = useI18n();

  return (
    <div
      className="flex items-center gap-0.5 rounded-sm border border-[var(--line-strong)] p-0.5"
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => {
        const active = locale === current;

        return (
          <Link
            key={locale}
            href={switchLocalePath(pathname, locale)}
            className={cn(
              "px-3.5 py-2 text-meta transition-colors md:px-2.5 md:py-1",
              active ? "bg-[var(--accent)] text-white" : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={active ? "true" : undefined}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

export function LanguageSwitcherLabels({ current }: { current: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={switchLocalePath(pathname, locale)}
          className={cn(
            "text-meta",
            current === locale ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {localeLabels[locale]}
        </Link>
      ))}
    </div>
  );
}
