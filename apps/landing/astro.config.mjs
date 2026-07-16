import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// Static marketing site for linguaa.app. The app itself lives at
// app.linguaa.app (apps/web) — no auth, no API proxy here.
export default defineConfig({
  output: "static",
  site: "https://linguaa.app",
  vite: {
    plugins: [tailwindcss()],
  },
});
