"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { SectionChapter } from "@/components/axis/SectionChapter";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { PageAmbientField } from "@/components/motion/PageAmbientField";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getContactLinks } from "@/lib/i18n/helpers";

export function ContactClosing() {
  const { dict, path } = useI18n();
  const links = getContactLinks(dict);
  const { copied, copy } = useCopyToClipboard();

  return (
    <div>
      <SectionChapter theme="void" className="relative overflow-hidden pt-16 pb-[var(--space-xl)]">
        <PageAmbientField variant="signal" />
        <div className="container-editorial relative py-[var(--space-md)]">
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
      </SectionChapter>

      <SectionChapter theme="frost" className="py-[var(--space-xl)]">
        <div className="container-editorial max-w-2xl">
          <ScrollReveal>
            <p className="text-meta text-muted-foreground">{dict.common.channels}</p>
          </ScrollReveal>
          <ul className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]" role="list">
            {links.map((link, i) => (
              <ScrollReveal key={link.label} delay={i * 0.05}>
                <li>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(link.download ? { download: true } : {})}
                    className="group -mx-3 flex items-center justify-between rounded-[var(--radius-md)] px-3 py-6 transition-colors hover:bg-[var(--accent-subtle)]"
                    data-cursor={link.external ? "external" : undefined}
                  >
                    <div>
                      <p className="text-meta text-muted-foreground">{link.label}</p>
                      <p className="text-h2 mt-1 transition-colors group-hover:text-[var(--accent-light)]">
                        {link.label === dict.contact.actions.email ? dict.site.email : link.label}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                    />
                  </a>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </SectionChapter>

      <SectionChapter theme="chalk" className="py-[var(--space-lg)]">
        <div className="container-editorial">
          <ScrollReveal>
            <Link href={path("/work")} className="link-form text-meta text-muted-foreground">
              {dict.common.viewSelectedWork}
              <ArrowUpRight size={13} />
            </Link>
          </ScrollReveal>
        </div>
      </SectionChapter>
    </div>
  );
}
