/// <reference types="astro/client" />

import type { Locale } from "@goethepro/i18n";

/** Cloudflare bindings/secrets available at runtime (see wrangler.toml). */
type CloudflareEnv = {
  API_URL?: string;
};

type Runtime = import("@astrojs/cloudflare").Runtime<CloudflareEnv>;

declare global {
  namespace App {
    interface Locals extends Runtime {
      userId: string | null;
      locale: Locale;
    }
  }
}
