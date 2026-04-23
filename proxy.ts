import createMiddleware from "next-intl/middleware";

import {defaultLocale, localePrefix, locales} from "./lib/i18n/config";

const proxy = createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});

export default proxy;

export const config = {
  matcher: ["/", "/(bg|en|ru)/:path*"]
};
