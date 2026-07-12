/**
 * Centralized API client as Effect. Every request goes through here so base URL,
 * credentials, JSON handling, and error shape live in ONE place.
 *
 * Domain files (auth.ts, profile.ts, ...) build on top of this and return
 * Effects; they never call `fetch` directly. Effects are run at the React Query
 * boundary (see run.ts) — no runtime/services needed in the browser bundle.
 */
import { Data, Effect } from "effect";

/** Typed failure for any non-2xx response (or network/parse error). */
export class ApiError extends Data.TaggedError("ApiError")<{
  readonly status: number;
  readonly message: string;
}> {}

/**
 * Base path. Requests are same-origin: Astro proxies `/api` -> Hono in dev,
 * and they share an origin in prod. So cookies ride along automatically.
 */
const BASE = "/api";

export interface RequestOptions {
  readonly method?: string;
  readonly body?: unknown;
}

export function request<A>(path: string, opts: RequestOptions = {}): Effect.Effect<A, ApiError> {
  return Effect.gen(function* () {
    const res = yield* Effect.tryPromise({
      try: (signal) =>
        fetch(`${BASE}${path}`, {
          method: opts.method ?? "GET",
          credentials: "include",
          headers: opts.body !== undefined ? { "Content-Type": "application/json" } : undefined,
          body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
          signal,
        }),
      catch: () => new ApiError({ status: 0, message: "Network error" }),
    });

    const text = yield* Effect.tryPromise({
      try: () => res.text(),
      catch: () => new ApiError({ status: res.status, message: "Failed to read response" }),
    });

    const data = yield* Effect.try({
      try: (): unknown => (text ? JSON.parse(text) : undefined),
      catch: () => new ApiError({ status: res.status, message: "Invalid JSON response" }),
    });

    if (!res.ok) {
      const message =
        data && typeof data === "object" && "error" in data
          ? String((data as { error: unknown }).error)
          : `Request failed (${res.status})`;
      return yield* new ApiError({ status: res.status, message });
    }

    return data as A;
  });
}
