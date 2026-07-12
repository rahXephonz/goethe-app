/**
 * React binding for @goethepro/i18n. Re-export barrel: the provider component
 * and the hook live in separate modules so Vite Fast Refresh can hot-swap the
 * provider without tripping on a mixed component/hook export.
 */
export { type I18nContextValue, useTranslation } from "./context";
export { I18nProvider } from "./provider";
