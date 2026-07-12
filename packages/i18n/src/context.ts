import { createContext, useContext } from "react";
import type { Locale } from "./config";
import type { Translator } from "./core";

export type I18nContextValue = { locale: Locale; t: Translator };

export const I18nContext = createContext<I18nContextValue | null>(null);

/** Access the translator + current locale. Must be used under <I18nProvider>. */
export function useTranslation(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within <I18nProvider>");
  return ctx;
}
