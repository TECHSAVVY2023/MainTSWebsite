export function useAuth () {
  const config = useRuntimeConfig()
  
  // Note: tsapi_user is a non-HttpOnly cookie set by the backend containing the basic user profile.
  // The actual JWT (tsapi_token) is HttpOnly and cannot be read by JS, but will be sent in requests automatically.
  // We decode the JSON stored in the cookie.
  const authUserCookie = useCookie<{ id?: string; name?: string; email?: string; picture?: string } | null>('tsapi_user', { default: () => null })

  // Transform it to match the old shape (picture -> image) if needed, but let's keep it simple.
  const user = computed(() => {
    if (!authUserCookie.value) return null;
    return {
      id: authUserCookie.value.id,
      name: authUserCookie.value.name,
      email: authUserCookie.value.email,
      image: authUserCookie.value.picture
    }
  })

  // We don't store the token in state anymore since it's an HttpOnly cookie
  const token = computed(() => authUserCookie.value ? 'cookie-based' : null)

  const isLoggedIn = computed(() => !!authUserCookie.value)

  const init = () => {
    // No-op. useCookie handles hydration on both client and server automatically.
  }

  const setAuth = (jwt: string) => {
    // No-op for the new flow since the backend handles setting the HttpOnly cookie.
    // If you need it for legacy compatibility, leave empty.
  }

  const login = () => {
    if (!process.client) return
    const base = String(config.public.apiBase || '').replace(/\/$/, '')
    if (!base) {
      console.error('NUXT_PUBLIC_API_BASE is not set; cannot start Google sign-in.')
      return
    }
    window.location.href = `${base}/api/techsavvy/auth/google/start/`
  }

  const logout = async () => {
    if (process.client) {
      const base = String(config.public.apiBase || '').replace(/\/$/, '')
      try {
        // Tell backend to clear HttpOnly cookies
        await $fetch(`${base}/api/techsavvy/auth/logout/`, {
          method: 'POST',
        })
      } catch (e) {
        console.error('Logout failed', e)
      }
    }
    // Clear the non-HttpOnly cookie on frontend
    authUserCookie.value = null
    navigateTo('/login')
  }

  return { user, token, isLoggedIn, init, setAuth, login, logout }
}
