"use client";

import Link from "next/link";
import { ArrowUpRight, Command, Download } from "lucide-react";
import { ImmersiveHeroField } from "@/components/cinematic/ImmersiveHeroField";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { openCommandMenu } from "@/components/layout/CommandMenu";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Entrance delays in ms; the text is in the HTML from the start, CSS only fades it in. */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function HomeHero() {
  const { dict, path } = useI18n();
  const cv = dict.site.cv;
  const nameParts = dict.site.name.split(" ");

  return (
    <SectionChapter theme="void" id="hero" className="relative min-h-[100svh]">
      <ImmersiveHeroField />

      <div className="container-editorial relative flex min-h-[100svh] flex-col justify-end pb-[var(--space-lg)] pt-24">
        <div className="editorial-grid items-end gap-y-12">
          <div className="col-span-12 lg:col-span-9">
            <p className="anim-fade text-meta text-muted-foreground">
              {dict.site.location} · {dict.site.role}
            </p>

            <h1 className="mt-6 overflow-hidden">
              {nameParts.map((part, i) => (
                <span key={part} className="anim-rise-lg text-colossal block font-display" style={delay(80 + i * 90)}>
                  {part}
                </span>
              ))}
            </h1>

            <p className="anim-rise text-statement mt-10 max-w-xl text-muted-foreground" style={delay(300)}>
              {dict.hero.tagline}
            </p>
          </div>

          <ul className="col-span-12 space-y-2 lg:col-span-3 lg:text-right" role="list">
            {dict.site.focus.map((item, i) => (
              <li key={item} className="anim-slide text-meta text-[var(--accent-light)]" style={delay(380 + i * 60)}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="anim-fade mt-14 flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-10" style={delay(450)}>
          <Link href={path("/work")} className="btn-primary">
            {dict.hero.viewWork}
            <ArrowUpRight size={14} />
          </Link>
          <Link href={path("/about")} className="btn-ghost">
            {dict.common.footerNav.about}
          </Link>
          {cv && (
            <a href={cv} download className="btn-ghost">
              <Download size={14} />
              {dict.common.cv}
            </a>
          )}
          <button type="button" onClick={openCommandMenu} className="kbd-hint ml-auto hidden md:inline-flex">
            <Command size={12} aria-hidden />K <span className="text-muted-foreground">{dict.command.hint}</span>
          </button>
        </div>

        <div className="anim-fade absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" style={delay(900)} aria-hidden="true">
          <span className="text-meta text-muted-foreground">Scroll</span>
          <span className="scroll-cue block h-8 w-px bg-[var(--accent)]" />
        </div>
      </div>
    </SectionChapter>
  );
}
