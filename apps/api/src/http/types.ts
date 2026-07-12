import type { Translator } from "@goethepro/i18n";

/** Hono environment shared by every route: request-scoped locale + user. */
export type AppEnv = { Variables: { userId: string | null; t: Translator } };
