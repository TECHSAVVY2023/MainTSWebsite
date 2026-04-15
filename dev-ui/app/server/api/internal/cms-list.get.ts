/**
 * Same-origin proxy for CMS list JSON so the browser never calls Django directly
 * (avoids CORS and wrong host when the site is opened via LAN IP while API is 127.0.0.1).
 */
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const base = String(config.apiBase || config.public.apiBase || "").replace(/\/$/, "")
  if (!base) {
    // Keep homepage resilient in environments where API base is missing.
    return []
  }

  const url = `${base}/api/techsavvy/cms/list/`
  try {
    return await $fetch(url, {
      headers: { Accept: 'application/json' }
    })
  } catch {
    // Do not throw from this proxy route: homepage can proceed with fallback content.
    return []
  }
})
