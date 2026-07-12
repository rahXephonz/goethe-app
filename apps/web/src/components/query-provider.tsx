import type { Locale } from "@goethepro/i18n";
import { I18nProvider } from "@goethepro/i18n/react";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ComponentType, ReactNode } from "react";
import { getQueryClient } from "../hooks/query/query-client";

/**
 * Provides the shared QueryClient. All islands reuse the same browser
 * QueryClient (see query-client.ts), so cache is shared page-wide.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>;
}

/**
 * Wrap a component so it carries its own providers (React Query + i18n). This
 * matters in Astro: nesting islands via slots hydrates the child as a SEPARATE
 * island OUTSIDE the provider's React tree, so it never sees context. Mounting
 * one HOC-wrapped island keeps provider and consumer in the same React root.
 *
 * The island takes a `locale` prop (resolved server-side, passed from .astro),
 * so it renders in the right language on first paint.
 *
 * Usage in .astro:  <FooIsland client:load locale={Astro.locals.locale} />
 */
export function withProviders<P extends object>(Component: ComponentType<P>) {
  return function ProvidedIsland({ locale, ...props }: P & { locale?: Locale }) {
    return (
      <QueryProvider>
        <I18nProvider locale={locale}>
          <Component {...(props as P)} />
        </I18nProvider>
      </QueryProvider>
    );
  };
}
