"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { HoverTilt } from "@/components/motion/HoverTilt";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { PageAmbientField } from "@/components/motion/PageAmbientField";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getContactLinks, type ContactLink } from "@/lib/i18n/helpers";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

function getLinkIcon(label: string, actions: Dictionary["contact"]["actions"]): LucideIcon {
  if (label === actions.email) return Mail;
  if (label === actions.linkedin) return ExternalLink;
  if (label === actions.github) return Code2;
  if (label === actions.cv) return Download;
  return ArrowUpRight;
}

function getLinkSubtitle(link: ContactLink): string {
  if (link.href.startsWith("mailto:")) return link.href.replace("mailto:", "");
  try {
    const url = new URL(link.href);
    return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    return link.href;
  }
}

export function ContactClosing() {
  const { dict, path } = useI18n();
  const links = getContactLinks(dict);
  const { copied, copy } = useCopyToClipboard();

  return (
    <div>
      <SectionChapter theme="void" className="relative overflow-hidden pt-16 pb-[var(--space-lg)]">
        <PageAmbientField variant="signal" />
        <div className="container-editorial relative py-[var(--space-md)]">
          <div className="editorial-grid items-start gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <PageHeader
                label={dict.contact.sectionLabel}
                title={dict.contact.headline[0]}
                titleMuted={dict.contact.headline[1]}
                description={dict.contact.intro}
              />

              <ScrollReveal className="mt-10 flex flex-wrap items-center gap-3">
                <MagneticLink href={`mailto:${dict.site.email}`} className="btn-primary">
                  <Mail size={15} />
                  {dict.site.email}
                </MagneticLink>
                <button
                  type="button"
                  onClick={() => copy(dict.site.email)}
                  className="btn-ghost"
                  aria-live="polite"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? dict.common.copied : dict.common.copy}
                </button>
              </ScrollReveal>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={0.08}>
                <HoverTilt maxTilt={5}>
                  <aside className="pro-panel relative overflow-hidden p-8">
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--accent-glow)] opacity-20 blur-3xl"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] border border-[var(--accent-border)] bg-[var(--accent-subtle)] font-display text-xl text-[var(--accent-light)]">
                        {dict.site.initials}
                      </div>
                      <p className="text-h1 mt-6">{dict.site.name}</p>
                      <p className="text-meta mt-2 text-muted-foreground">{dict.site.role}</p>
                      <div className="mt-5 flex items-center gap-2 text-muted-foreground">
                        <MapPin size={14} className="shrink-0 text-[var(--accent)]" aria-hidden="true" />
                        <span className="text-small">{dict.site.location}</span>
                      </div>
                      <ul className="mt-6 flex flex-wrap gap-2" role="list">
                        {dict.site.focus.map((item) => (
                          <li key={item}>
                            <span className="tag">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                </HoverTilt>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </SectionChapter>

      <SectionChapter theme="frost" className="py-[var(--space-xl)]">
        <div className="container-editorial">
          <ScrollReveal className="max-w-xl">
            <p className="text-meta accent-text">{dict.common.channels}</p>
            <h2 className="text-section mt-4 font-display">
              {dict.contact.sectionLabel}
              <span className="text-muted-foreground"> · {dict.common.contactPage}</span>
            </h2>
          </ScrollReveal>

          <ul
            className="editorial-grid mt-12 gap-y-6"
            role="list"
          >
            {links.map((link, i) => {
              const Icon = getLinkIcon(link.label, dict.contact.actions);
              const subtitle = getLinkSubtitle(link);

              return (
                <ScrollReveal key={link.label} delay={i * 0.06} className="col-span-12 md:col-span-6">
                  <HoverTilt maxTilt={4}>
                    <li className="h-full">
                      <a
                        href={link.href}
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        {...(link.download ? { download: true } : {})}
                        className="group pro-panel relative flex h-full flex-col justify-between overflow-hidden p-8 transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_3%,var(--ink-soft))]"
                        data-cursor={link.external ? "external" : undefined}
                      >
                        <div
                          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--accent-subtle)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                        <div className="relative flex items-start justify-between gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--accent-border)] bg-[var(--accent-subtle)] text-[var(--accent-light)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                            <Icon size={18} />
                          </div>
                          <ArrowUpRight
                            size={18}
                            className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                          />
                        </div>
                        <div className="relative mt-8">
                          <p className="text-meta text-muted-foreground">{link.label}</p>
                          <p className="text-h2 mt-2 break-all transition-colors group-hover:text-[var(--accent-light)]">
                            {subtitle}
                          </p>
                        </div>
                      </a>
                    </li>
                  </HoverTilt>
                </ScrollReveal>
              );
            })}
          </ul>
        </div>
      </SectionChapter>

      <SectionChapter theme="void" className="py-[var(--space-lg)]">
        <div className="container-editorial">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href={path("/work")} className="link-form text-meta text-muted-foreground">
                {dict.common.viewSelectedWork}
                <ArrowUpRight size={13} />
              </Link>
              <Link href={path("/about")} className="link-form text-meta text-muted-foreground">
                {dict.common.footerNav.about}
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </SectionChapter>
    </div>
  );
}
