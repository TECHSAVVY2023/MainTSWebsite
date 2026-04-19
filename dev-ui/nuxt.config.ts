import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Local Django default when `.env` has no `NUXT_PUBLIC_API_BASE` (avoids empty CMS + demo fallbacks). */
const defaultPublicApiBase =
  process.env.NUXT_PUBLIC_API_BASE?.trim() ||
  (process.env.NODE_ENV !== "production" ? "http://http://127.0.0.1:8000/api/techsavvy/" : "https://apidev.techsavvies.space/api/techsavvy/");

export default defineNuxtConfig({
  modules: ["nuxt-gtag"],
  gtag: {
    id: "G-G6MZR024YE",
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  ssr: true, // Ensure SSR is enabled for proper meta tag rendering
  srcDir: 'app',
  serverDir: "app/server",
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Tech Savvy Code Camp",
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-G6MZR024YE",
          async: true,
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
  vite: {
    resolve: {
      alias: {
        "#app-manifest": resolve(__dirname, "app/stubs/app-manifest-stub.mjs"),
      },
    },
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    // Server-only (never exposed to client)
    apiBase: process.env.API_BASE,
    public: {
      // Client-safe — Google OAuth & PayMongo secrets live on the API only (apiv1/.env)
      // Override with NUXT_PUBLIC_API_BASE in production; dev falls back to local Django.
      apiBase: defaultPublicApiBase,
      /** Public site origin for checkout success/cancel URLs (e.g. https://techsavvies.space) */
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "",
      /** Comma-separated emails that get super-admin UI (dev: add your Google email). */
      superAdminEmails: process.env.NUXT_PUBLIC_SUPERADMIN_EMAILS || "markanthonyogaoogao@gmail.com",
    },
  }
});
