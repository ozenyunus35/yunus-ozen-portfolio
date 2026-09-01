import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { LangSync } from "@/components/layout/LangSync";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <LangSync locale={locale} />
      <PersonJsonLd locale={locale} />
      <a href="#main-content" className="skip-link">
        {dict.common.skipToContent}
      </a>
      <Providers>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </Providers>
    </I18nProvider>
  );
}

export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}
