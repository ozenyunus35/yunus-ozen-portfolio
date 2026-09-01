import type { Metadata } from "next";
import { AboutProfile } from "@/components/about/AboutProfile";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = isLocale(l) ? l : "tr";
  const dict = getDictionary(locale);
  return createPageMetadata(dict.pages.about.title, dict.pages.about.description, localizedPath("/about", locale), locale);
}

export default function AboutPage() {
  return <AboutProfile />;
}
