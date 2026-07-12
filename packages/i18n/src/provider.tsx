import { type ReactNode, useMemo } from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";
import { I18nContext, type I18nContextValue } from "./context";
import { createTranslator } from "./core";

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
