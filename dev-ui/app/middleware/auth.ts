export default defineNuxtRouteMiddleware((to) => {
  // Only run on client — localStorage is not available on server
  if (import.meta.server) return


  if (to.query.token) return

  const token = localStorage.getItem('auth_token')
  if (!token) {
    return navigateTo('/login')
  }
})

