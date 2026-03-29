export default defineNuxtConfig({
  compatibilityDate: '2026-02-21',
  devtools: { enabled: true },
  srcDir: 'app',
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }
      ]
    }
  },
  runtimeConfig: {
    /** Server-only (never exposed to client) */
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    public: {
      /** API base URL. For apiv1 use http://127.0.0.1:8000 (no /api). Set in .env as NUXT_PUBLIC_API_BASE. */
      apiBase: (process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000').replace(/\/$/, ''),
      /** Absolute site origin for PayMongo success/cancel redirects (no trailing slash). */
      siteUrl: (process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
      googleClientId: process.env.GOOGLE_CLIENT_ID,
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    viewer: true,
  },
})
