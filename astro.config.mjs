// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://louis-badr.fr",
  trailingSlash: "always",

  // The about page became the contact page.
  redirects: {
    "/aboutme/": "/contact/",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
