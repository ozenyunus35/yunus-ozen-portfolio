import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LangSync } from "@/components/layout/LangSync";
import { Providers } from "@/components/layout/Providers";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

/** Header, footer and providers around every page, in one language. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
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
