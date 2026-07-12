import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getQueryClient } from "../hooks/query/query-client";

/**
 * Provides the shared QueryClient. All islands reuse the same browser
 * QueryClient (see query-client.ts), so cache is shared page-wide.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>;
}
