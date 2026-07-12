import type { APIContext, MiddlewareHandler } from "astro";

/** Astro's context is a superset of both middleware and endpoint contexts. */
type AnyContext = APIContext | Parameters<MiddlewareHandler>[0];

/**
 * Absolute base URL of the Hono API, for SERVER-side fetches (middleware/SSR).
 * Relative "/api" only works in the browser; server code needs a full origin.
 *
 * Resolution order:
 *   1. Cloudflare runtime binding/secret  (Astro.locals.runtime.env.API_URL)
 *   2. Build-time env                      (import.meta.env.API_URL)
 *   3. Dev fallback                        (local Hono on :8787)
 */
export function getApiBase(context: AnyContext): string {
  return (
    context.locals.runtime?.env?.API_URL ??
    (import.meta.env.API_URL as string | undefined) ??
    "http://localhost:8787"
  );
}
