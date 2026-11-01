"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Code2, Copy, CornerDownLeft, Download, ExternalLink, FileText, Globe, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { switchLocalePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils/cn";

const OPEN_EVENT = "command-menu:open";

/** Element to give focus back to when the menu closes; module scope, there is only one menu. */
let returnFocus: HTMLElement | null = null;

/** Opens the menu from anywhere (header button, hero hint). */
export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  keywords?: string;
  run: () => void;
};

/** Normalises Turkish letters so "ozen" finds "Özen" and "is" finds "İş". */
const fold = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i");

export function CommandMenu() {
  const { dict, path, locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const t = dict.command;

  const close = useCallback(() => {
    setOpen(false);
    returnFocus?.focus?.();
  }, []);

  const show = useCallback(() => {
    returnFocus = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setNotice(null);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [open, show, close]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      close();
      router.push(path(href));
    };
    const external = (href: string) => () => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    };
    const other = locale === "tr" ? "en" : "tr";

    const list: Item[] = [
      { id: "home", group: t.groups.pages, label: t.home, icon: ArrowRight, run: go("/") },
      ...dict.nav.map((n) => ({ id: `nav-${n.href}`, group: t.groups.pages, label: n.label, icon: ArrowRight, run: go(n.href) })),
      ...dict.projects.map((p) => ({
        id: `project-${p.slug}`,
        group: t.groups.projects,
        label: p.title,
        hint: p.industry,
        keywords: `${p.tagline} ${p.technologies.join(" ")}`,
        icon: FileText,
        run: go(`/work/${p.slug}`),
      })),
      {
        id: "copy-email",
        group: t.groups.actions,
        label: t.copyEmail,
        hint: dict.site.email,
        keywords: "mail email e-posta iletisim contact",
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(dict.site.email).catch(() => {});
          setNotice(t.copied);
          window.setTimeout(close, 700);
        },
      },
      ...(dict.site.cv
        ? [{
            id: "cv",
            group: t.groups.actions,
            label: dict.common.downloadCv,
            hint: "PDF",
            keywords: "cv resume ozgecmis",
            icon: Download,
            run: () => {
              close();
              const a = document.createElement("a");
              a.href = dict.site.cv!;
              a.download = "";
              a.click();
            },
          }]
        : []),
      {
        id: "language",
        group: t.groups.actions,
        label: t.switchLanguage,
        hint: other.toUpperCase(),
        keywords: "dil language turkce english",
        icon: Globe,
        run: () => {
          close();
          router.push(switchLocalePath(pathname, other));
        },
      },
      { id: "github", group: t.groups.links, label: "GitHub", hint: "ozenyunus35", icon: Code2, run: external(dict.site.social.github) },
      { id: "linkedin", group: t.groups.links, label: "LinkedIn", hint: "yunus-ozen", icon: ExternalLink, run: external(dict.site.social.linkedin) },
    ];
    return list;
  }, [dict, t, locale, path, pathname, router, close]);

  const results = useMemo(() => {
    const q = fold(query.trim());
    if (!q) return items;
    return items.filter((item) => fold(`${item.label} ${item.hint ?? ""} ${item.keywords ?? ""} ${item.group}`).includes(q));
  }, [items, query]);

  const current = Math.min(active, Math.max(0, results.length - 1));

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${current}"]`)?.scrollIntoView({ block: "nearest" });
  }, [current]);

  if (!open) return null;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current + 1) % Math.max(1, results.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current - 1 + results.length) % Math.max(1, results.length));
    } else if (event.key === "Enter") {
      event.preventDefault();
      results[current]?.run();
    } else if (event.key === "Tab") {
      event.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <div className="cmdk-backdrop fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]" onMouseDown={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.open}
        className="cmdk-panel w-full max-w-lg overflow-hidden rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--ink-soft)] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4">
          <Search size={15} className="shrink-0 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            placeholder={t.placeholder}
            className="h-14 w-full bg-transparent text-body text-foreground outline-none placeholder:text-muted-foreground"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={results[current] ? `cmdk-${results[current].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="text-meta shrink-0 rounded-sm border border-[var(--line-strong)] px-1.5 py-0.5 text-muted-foreground">esc</kbd>
        </div>

        {notice ? (
          <p className="text-meta px-4 py-10 text-center text-[var(--accent-light)]" role="status">
            {notice}
          </p>
        ) : results.length === 0 ? (
          <p className="text-body px-4 py-10 text-center text-muted-foreground">{t.empty}</p>
        ) : (
          <ul ref={listRef} id="cmdk-list" role="listbox" className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
            {results.map((item, i) => {
              const heading = item.group !== lastGroup ? item.group : null;
              lastGroup = item.group;
              const Icon = item.icon;
              return (
                <li key={item.id} role="presentation">
                  {heading && <p className="text-meta px-3 pb-1.5 pt-3 text-muted-foreground first:pt-1">{heading}</p>}
                  <div
                    id={`cmdk-${item.id}`}
                    role="option"
                    aria-selected={i === current}
                    data-index={i}
                    onMouseMove={() => i !== current && setActive(i)}
                    onClick={item.run}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 transition-colors duration-100",
                      i === current ? "bg-[var(--accent-subtle)] text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <Icon size={15} className={cn("shrink-0", i === current && "text-[var(--accent-light)]")} aria-hidden />
                    <span className="min-w-0 flex-1 truncate text-small">{item.label}</span>
                    {item.hint && <span className="text-meta hidden truncate text-muted-foreground sm:inline">{item.hint}</span>}
                    {i === current && <CornerDownLeft size={13} className="shrink-0 text-muted-foreground" aria-hidden />}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="text-meta flex items-center gap-4 border-t border-[var(--line)] px-4 py-2.5 text-muted-foreground">
          <span>↑↓ {t.navigate}</span>
          <span>↵ {t.select}</span>
        </div>
      </div>
    </div>
  );
}
