import { SESSION_COOKIE } from "@goethepro/auth";
import { createTranslator, LOCALE_COOKIE, resolveLocale } from "@goethepro/i18n";
import type { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { resolveUserId } from "@/modules/auth/auth.service.js";
import { runtime } from "@/runtime.js";
import type { AppEnv } from "./types.js";

/** Resolve the request locale (cookie -> Accept-Language -> en) into a translator. */
export const i18nMiddleware: MiddlewareHandler<AppEnv> = async (c, next) => {
  const cookieLocale = getCookie(c, LOCALE_COOKIE);
  const acceptLang = c.req.header("Accept-Language")?.split(",")[0];
  c.set("t", createTranslator(resolveLocale(cookieLocale ?? acceptLang)));
  await next();
};

/** Resolve the session cookie into a userId (or null) for downstream handlers. */
export const sessionMiddleware: MiddlewareHandler<AppEnv> = async (c, next) => {
  const token = getCookie(c, SESSION_COOKIE);
  c.set("userId", await runtime.runPromise(resolveUserId(token)));
  await next();
};
