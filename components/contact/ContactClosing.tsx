"use client";

import {
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { HomeFaq } from "@/components/home/HomeFaq";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/prism/SectionLabel";
import { PageHero } from "@/components/ui/PageHero";
import { ProfileCard } from "@/components/ui/ProfileCard";
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
  if (link.download) return "PDF";
  if (link.href.startsWith("mailto:")) return link.href.replace("mailto:", "");
  try {
    const url = new URL(link.href);
    return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    return link.href;
  }
}

export function ContactClosing() {
  const { dict } = useI18n();
  const links = getContactLinks(dict);
  const { copied, copy } = useCopyToClipboard();

  return (
    <div>
      <PageHero
        crumbs={[{ label: dict.contact.sectionLabel.toLowerCase() }]}
        title={dict.contact.headline[0]}
        accent={dict.contact.headline[1]}
        description={dict.contact.intro}
        actions={
          <>
            <MagneticLink href={`mailto:${dict.site.email}`} className="btn-primary">
              <Mail size={15} />
              {dict.site.email}
            </MagneticLink>
            <button type="button" onClick={() => copy(dict.site.email)} className="btn-ghost" aria-live="polite">
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? dict.common.copied : dict.common.copy}
            </button>
          </>
        }
        aside={<ProfileCard />}
      />

      <section className="theme-frost py-[var(--space-xl)]">
        <div className="container-editorial">
          <ScrollReveal>
            <SectionLabel number="01" label={dict.inner.channels} />
          </ScrollReveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
            {links.map((link, i) => {
              const Icon = getLinkIcon(link.label, dict.contact.actions);
              return (
                <li key={link.label}>
                  <ScrollReveal delay={i * 0.05} className="h-full">
                    <a
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      {...(link.download ? { download: true } : {})}
                      className="channel-card group"
                      data-cursor={link.external ? "external" : undefined}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid size-11 place-items-center rounded-xl border border-[var(--line-strong)] bg-[var(--tint)] text-foreground transition-colors group-hover:border-[var(--accent-border)] group-hover:text-[var(--accent-light)]">
                          <Icon size={18} />
                        </span>
                        <ArrowUpRight size={17} className="text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                      </div>
                      <p className="text-h2 mt-8">{link.label}</p>
                      <p className="spec-link mt-1.5 !text-muted-foreground">{getLinkSubtitle(link)}</p>
                    </a>
                  </ScrollReveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <HomeFaq />
    </div>
  );
}
