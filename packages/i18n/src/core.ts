import { DEFAULT_LOCALE, type Locale } from "./config";
import { dictionaries, type MessageKey } from "./messages";

/** Values allowed for `{placeholder}` interpolation. */
export type TransParams = Record<string, string | number>;

/** A bound translate function for one locale. */
export type Translator = (key: MessageKey, params?: TransParams) => string;

/** Replace `{name}` tokens in a template with params. Unknown tokens are left as-is. */
function interpolate(template: string, params?: TransParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

/**
 * Build a translator bound to `locale`. Falls back to the default locale, then
 * to the key itself, so a missing translation never throws — it degrades.
 */
export function createTranslator(locale: Locale): Translator {
  const dict = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
  return (key, params) => {
    const template = dict[key] ?? dictionaries[DEFAULT_LOCALE][key] ?? key;
    return interpolate(template, params);
  };
}
