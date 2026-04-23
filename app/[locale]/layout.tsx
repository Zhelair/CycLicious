import Link from "next/link";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {CitySwitcher} from "../../components/city-switcher";
import {LocaleSwitcher} from "../../components/locale-switcher";
import {PwaClientBridge} from "../../components/pwa-client-bridge";
import {locales, type Locale} from "../../lib/i18n/config";

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("brand");
  const cityT = await getTranslations("citySelector");

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="root-shell">
        <div className="site-frame">
          <header className="topbar">
            <div className="brand-mark">
              <strong>Bike Sofia</strong>
              <span>{t("tagline")}</span>
            </div>
            <div className="topbar-actions">
              <CitySwitcher
                activeCityId="sofia"
                cities={[
                  {id: "sofia", name: cityT("sofia"), state: "live"},
                  {id: "plovdiv", name: cityT("plovdiv"), state: "planned"},
                  {id: "varna", name: cityT("varna"), state: "planned"}
                ]}
                description={cityT("description")}
                label={cityT("label")}
                liveLabel={cityT("live")}
                plannedLabel={cityT("planned")}
              />
              <div className="utility-strip">
                <Link className="header-link" href={`/${locale}/settings`}>
                  Settings
                </Link>
                <Link className="header-link" href={`/${locale}/privacy`}>
                  {t("privacyLink")}
                </Link>
                <LocaleSwitcher locale={locale as Locale} />
              </div>
            </div>
          </header>
          {children}
          <PwaClientBridge />
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
