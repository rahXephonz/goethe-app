import { QueryClient } from "@tanstack/react-query";

/**
 * Astro renders each `client:*` island as its OWN React root. To share one
 * cache across all islands on a page, they must share ONE QueryClient — so we
 * keep a browser-side singleton here instead of `new QueryClient()` per root.
 */
let browserClient: QueryClient | undefined;

function make() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") return make(); // SSR: fresh, never shared
  browserClient ??= make();
  return browserClient;
}

/** Centralized query keys — the source of truth for cache invalidation. */
export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  profile: {
    detail: ["profile"] as const,
  },
};
