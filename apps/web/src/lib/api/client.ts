/**
 * Centralized API client. Every request goes through here so base URL,
 * credentials, JSON handling, and error shape live in ONE place.
 *
 * Domain files (auth.ts, profile.ts, ...) build on top of this — they never
 * call `fetch` directly.
 */

/** Thrown on any non-2xx response. Carries the server's status + message. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Base path. Requests are same-origin: Astro proxies `/api` -> Hono in dev,
 * and they share an origin in prod. So cookies ride along automatically.
 */
const BASE = "/api";

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = opts;

  const res = await fetch(`${BASE}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // 204 / empty bodies -> undefined
  const text = await res.text();
  const data = text ? JSON.parse(text) : undefined;

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "error" in data && String(data.error)) ||
      `Request failed (${res.status})`;
    throw new ApiError(res.status, message);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, opts?: RequestOptions) => request<T>(path, { ...opts, method: "GET" }),
  post: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "POST", body }),
  put: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "PUT", body }),
  delete: <T>(path: string, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "DELETE" }),
};
