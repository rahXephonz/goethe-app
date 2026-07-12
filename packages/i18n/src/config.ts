/** Supported UI locales. `en` is the default. */
export const LOCALES = ["en", "id", "de"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Cookie the browser/server use to persist the chosen locale. */
export const LOCALE_COOKIE = "locale";

/** Human labels for a locale switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
  de: "Deutsch",
};

/** Narrow any string to a supported Locale, falling back to the default. */
export function resolveLocale(input: string | null | undefined): Locale {
  if (!input) return DEFAULT_LOCALE;
  // Accept exact ("en") and region tags ("en-US") by matching the primary subtag.
  const primary = input.toLowerCase().split("-")[0] ?? "";
  return (LOCALES as readonly string[]).includes(primary) ? (primary as Locale) : DEFAULT_LOCALE;
}
