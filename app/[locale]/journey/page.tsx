import type { Metadata } from "next";
import { JourneyPath } from "@/components/journey/JourneyPath";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = isLocale(l) ? l : "tr";
  const dict = getDictionary(locale);
  return createPageMetadata(dict.pages.journey.title, dict.pages.journey.description, localizedPath("/journey", locale), locale);
}

export default function JourneyPage() {
  return <JourneyPath />;
}
