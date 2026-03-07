export default defineNuxtConfig({
  compatibilityDate: '2026-02-21',
  devtools: { enabled: true },
  srcDir: 'app',
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      /** API base URL (e.g. Django backend). Set in .env as NUXT_PUBLIC_API_BASE. Used by dashboard and landing page CMS (techsavvy_app GET /cms/list/). When empty, landing uses local JSON/defaults. */
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    viewer: true,
  },
})
