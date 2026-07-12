import { defineMiddleware } from "astro:middleware";
import { LOCALE_COOKIE, resolveLocale } from "@goethepro/i18n";
import type { MiddlewareHandler } from "astro";
import { getApiBase } from "./lib/api-server";

const PUBLIC_PATHS = new Set(["/login", "/register"]);

type MiddlewareContext = Parameters<MiddlewareHandler>[0];

/**
 * Resolve the current user by asking the API (no direct DB access — keeps the
 * web app edge/Cloudflare-deployable). The incoming Cookie header is forwarded
 * so the API can validate the session server-to-server.
 */
async function resolveUserId(context: MiddlewareContext): Promise<string | null> {
  const cookie = context.request.headers.get("cookie");
  if (!cookie) return null;
  try {
    const res = await fetch(`${getApiBase(context)}/api/auth/me`, {
      headers: { cookie },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { user: { id: string } | null };
    return data.user?.id ?? null;
  } catch {
    // API unreachable -> treat as unauthenticated rather than 500 the page.
    return null;
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  // Locale: explicit cookie wins, else negotiate from Accept-Language, else default.
  const cookieLocale = context.cookies.get(LOCALE_COOKIE)?.value;
  const acceptLang = context.request.headers.get("accept-language");
  context.locals.locale = resolveLocale(cookieLocale ?? acceptLang);

  context.locals.userId = await resolveUserId(context);

  const path = context.url.pathname;
  const isPublic = PUBLIC_PATHS.has(path) || path.startsWith("/api");

  if (!context.locals.userId && !isPublic) {
    return context.redirect("/login");
  }
  if (context.locals.userId && PUBLIC_PATHS.has(path)) {
    return context.redirect("/dashboard");
  }
  return next();
});
