import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-gtag"],
  gtag: {
    id: "G-G6MZR024YE",
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  ssr: true, // Ensure SSR is enabled for proper meta tag rendering
  srcDir: 'app',
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
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    // Server-only (never exposed to client)
    apiBase: process.env.API_BASE,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    public: {
      // Client-safe - Base API URL without path
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
    },
  }
});
