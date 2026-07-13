import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// Static marketing site for goethe.pro. The app itself lives at
// app.goethe.pro (apps/web) — no auth, no API proxy here.
export default defineConfig({
  output: "static",
  site: "https://goethe.pro",
  vite: {
    plugins: [tailwindcss()],
  },
});
