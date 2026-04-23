export const locales = ["bg", "en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bg";
export const localePrefix = "always";
