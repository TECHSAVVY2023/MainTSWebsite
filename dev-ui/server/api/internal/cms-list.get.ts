/**
 * Same-origin proxy for CMS list JSON so the browser never calls Django directly
 * (avoids CORS and wrong host when the site is opened via LAN IP while API is 127.0.0.1).
 */
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const base = String(config.apiBase || config.public.apiBase || "").replace(/\/$/, "")
  if (!base) {
    throw createError({ statusCode: 503, statusMessage: "API base not configured" })
  }
  const url = `${base}/api/techsavvies/cms/list/`
  return await $fetch(url, {
    headers: { Accept: 'application/json' }
  })
})
