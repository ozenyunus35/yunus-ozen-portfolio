"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  /** Path shown above the title, after the home crumb. The last crumb is the current page. */
  crumbs: Crumb[];
  title: string;
  /** Last words of the title, set in the italic serif. */
  accent?: string;
  description?: string;
  /** Buttons under the description. */
  actions?: React.ReactNode;
  /** Right column on large screens (a profile card, a spec sheet). */
  aside?: React.ReactNode;
  className?: string;
};

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** Opening of every inner page: breadcrumb, title with an accent word, intro, actions and an optional side card. */
export function PageHero({ crumbs, title, accent, description, actions, aside, className }: PageHeroProps) {
  const { dict, path } = useI18n();

  return (
    <section className={cn("page-hero relative isolate overflow-hidden", className)}>
      <div className="hero-wash" aria-hidden>
        <span className="hero-wash-a" />
        <span className="hero-wash-b" />
      </div>
      <div className="hero-grid-fade absolute inset-0 -z-10" aria-hidden />

      <div className={cn("container-editorial relative grid gap-12 pb-16 pt-28 sm:pt-32", aside ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16" : undefined)}>
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="anim-fade">
            <ol className="crumbs" role="list">
              <li>
                <Link href={path("/")}>{dict.site.name.toLowerCase().replace(" ", "-")}</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.label}>
                  <ChevronRight size={12} aria-hidden />
                  {c.href && i < crumbs.length - 1 ? (
                    <Link href={path(c.href)}>{c.label}</Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="text-display font-display anim-rise mt-8 max-w-4xl" style={delay(60)}>
            {title}
            {accent && (
              <>
                {" "}
                <span className="accent-serif accent-ink">{accent}</span>
              </>
            )}
          </h1>
          {description && (
            <p className="text-body anim-rise mt-6 max-w-2xl text-muted-foreground md:text-[1.0625rem]" style={delay(120)}>
              {description}
            </p>
          )}
          {actions && (
            <div className="anim-rise mt-8 flex flex-wrap items-center gap-3" style={delay(180)}>
              {actions}
            </div>
          )}
        </div>
        {aside && (
          <div className="anim-rise min-w-0" style={delay(200)}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
