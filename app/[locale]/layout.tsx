import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { isLocale } from "@/lib/i18n/config";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <SiteShell locale={locale}>{children}</SiteShell>;
}

export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}
