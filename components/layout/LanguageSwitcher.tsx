"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils/cn";

export function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-0.5 rounded-sm border border-[var(--line-strong)] p-0.5"
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => {
        const href = switchLocalePath(pathname, locale);
        const active = pathname.startsWith(`/${locale}`);

        return (
          <Link
            key={locale}
            href={href}
            className={cn(
              "px-2.5 py-1 text-meta transition-colors",
              active
                ? "bg-[var(--accent)] text-white"
                : "text-muted-foreground hover:text-foreground",
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
