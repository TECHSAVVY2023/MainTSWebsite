export function useAuth () {
  const config = useRuntimeConfig()
  
  // Note: tsapi_user is a non-HttpOnly cookie set by the backend containing the basic user profile.
  // The actual JWT (tsapi_token) is HttpOnly and cannot be read by JS, but will be sent in requests automatically.
  // We decode the JSON stored in the cookie.
  const authUserCookie = useCookie<string | null>('tsapi_user', { default: () => null })

  if (process.client) {
    console.log('[useAuth] document.cookie:', document.cookie)
    console.log('[useAuth] authUserCookie value:', authUserCookie.value)
  } else {
    console.log('[useAuth] Server-side authUserCookie value:', authUserCookie.value)
  }

  // Transform it to match the old shape (picture -> image) if needed, but let's keep it simple.
  const user = computed(() => {
    if (!authUserCookie.value) return null;
    try {
      let base64Str = String(authUserCookie.value);
      // Strip outer double quotes if present
      if (base64Str.startsWith('"') && base64Str.endsWith('"')) {
        base64Str = base64Str.slice(1, -1);
      }
      const jsonStr = process.client ? atob(base64Str) : Buffer.from(base64Str, 'base64').toString('utf-8');
      const parsed = JSON.parse(jsonStr);
      return {
        id: parsed.id,
        name: parsed.name,
        email: parsed.email,
        image: parsed.picture
      };
    } catch (e) {
      console.error('Failed to parse tsapi_user cookie:', e);
      return null;
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
    const base = String(config.public.apiBase || '')
    if (!base) {
      console.error('NUXT_PUBLIC_API_BASE is not set; cannot start Google sign-in.')
      return
    }
    window.location.href = `${base}auth/google/start/`
  }

  const logout = async () => {
    if (process.client) {
      const base = String(config.public.apiBase || '')
      try {
        // Tell backend to clear HttpOnly cookies
        await $fetch(`${base}auth/google/logout/`, {
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
