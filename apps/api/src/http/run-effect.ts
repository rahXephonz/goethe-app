import { Cause, type Effect, Exit, Option } from "effect";
import type { Context } from "hono";
import { type DomainError, toHttpError } from "@/errors.js";
import { type AppServices, runtime } from "@/runtime.js";
import type { AppEnv } from "./types.js";

/**
 * Run a domain Effect at the HTTP boundary and turn its outcome into a Response:
 *  - success  -> `onSuccess` builds the response,
 *  - a typed DomainError -> translated JSON with its mapped status,
 *  - any unexpected defect -> logged + 500.
 *
 * This is the ONLY place effects meet Hono, so route handlers stay declarative.
 */
export async function runEffect<A, R extends AppServices>(
  c: Context<AppEnv>,
  effect: Effect.Effect<A, DomainError, R>,
  onSuccess: (value: A) => Response,
): Promise<Response> {
  const exit = await runtime.runPromiseExit(effect);
  const t = c.get("t");
  return Exit.match(exit, {
    onSuccess,
    onFailure: (cause) => {
      const failure = Cause.failureOption(cause);
      if (Option.isSome(failure)) {
        const { status, messageKey } = toHttpError(failure.value);
        return c.json({ error: t(messageKey) }, status);
      }
      console.error("[api] unexpected defect:", Cause.pretty(cause));
      return c.json({ error: t("api.error.internal") }, 500);
    },
  });
}
