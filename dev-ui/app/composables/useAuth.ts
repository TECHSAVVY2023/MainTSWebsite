export function useAuth () {
  const config = useRuntimeConfig()
  const user = useState<{ id?: string; name?: string; email?: string; image?: string } | null>('auth_user', () => null)
  const token = useState<string | null>('auth_token', () => null)

  const isLoggedIn = computed(() => !!token.value)

  const init = () => {
    if (!process.client) return
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    if (storedToken) token.value = storedToken
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch {
        // ignore parse errors
      }
    }
  }

  const setAuth = (jwt: string) => {
    if (!process.client) return
    try {
      const base64 = jwt.split('.')[1]!.replace(/-/g, '+').replace(/_/g, '/')
      const payload = JSON.parse(atob(base64))
      const userData = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        image: payload.picture
      }
      localStorage.setItem('auth_token', jwt)
      localStorage.setItem('auth_user', JSON.stringify(userData))
      token.value = jwt
      user.value = userData
    } catch (e) {
      console.error('Failed to decode JWT', e)
    }
  }

  const login = () => {
    if (!process.client) return
    const base = String(config.public.apiBase || '').replace(/\/$/, '')
    if (!base) {
      console.error('NUXT_PUBLIC_API_BASE is not set; cannot start Google sign-in.')
      return
    }
    window.location.href = `${base}/auth/google/start/`
  }

  const logout = () => {
    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
    token.value = null
    user.value = null
    navigateTo('/login')
  }

  return { user, token, isLoggedIn, init, setAuth, login, logout }
}
