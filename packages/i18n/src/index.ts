/** Framework-agnostic i18n core. React binding lives in `@goethepro/i18n/react`. */
export {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_LABELS,
  LOCALES,
  type Locale,
  resolveLocale,
} from "./config";
export { createTranslator, type Translator, type TransParams } from "./core";
export { dictionaries, type MessageKey, type Messages } from "./messages";
