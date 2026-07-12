import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
    // Load wrangler.toml vars (API_URL) into `astro dev` via miniflare.
    platformProxy: { enabled: true },
  }),
  // We don't use Astro.session (auth = cookies + API). Setting a driver stops
  // the CF adapter from auto-binding a "SESSION" KV namespace (and its warning).
  session: { driver: 'memory' },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Single-origin dev: browser talks to Astro; /api proxies to Hono.
      // Cookies set by the API are first-party -> no CORS, no cookie drama.
      proxy: {
        '/api': { target: 'http://localhost:8787', changeOrigin: false },
      },
    },
  },
});
