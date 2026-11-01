import type { Metadata } from "next";
import { HomeContent } from "@/components/home/HomeContent";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = isLocale(l) ? l : "tr";
  const dict = getDictionary(locale);
  return createPageMetadata(dict.pages.home.title, dict.pages.home.description, localizedPath("/", locale), locale);
}

export default function HomePage() {
  return <HomeContent />;
}
