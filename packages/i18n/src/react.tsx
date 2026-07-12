import { createContext, type ReactNode, useContext, useMemo } from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";
import { createTranslator, type Translator } from "./core";

type I18nContextValue = { locale: Locale; t: Translator };

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Provide the active locale to a React tree. Locale is resolved server-side and
 * passed down as a prop, so islands render in the right language immediately.
 */
export function I18nProvider({
  locale = DEFAULT_LOCALE,
  children,
}: {
  locale?: Locale;
  children: ReactNode;
}) {
  const value = useMemo<I18nContextValue>(
    () => ({ locale, t: createTranslator(locale) }),
    [locale],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Access the translator + current locale. Must be used under <I18nProvider>. */
export function useTranslation(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within <I18nProvider>");
  return ctx;
}
