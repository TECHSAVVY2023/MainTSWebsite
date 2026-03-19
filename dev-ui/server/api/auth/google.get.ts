function getOrigin (event: any): string {
  const headers = getRequestHeaders(event)
  const proto = headers['x-forwarded-proto'] || 'http'
  const host = headers['x-forwarded-host'] || headers['host'] || 'localhost:3000'
  const cleanProto = (proto as string).split(',')[0].trim()
  const cleanHost = (host as string).split(',')[0].trim()
  return `${cleanProto}://${cleanHost}`
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const origin = getOrigin(event)
  const clientId = config.public.googleClientId as string
  const redirectUri = `${origin}/api/auth/callback`

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
    state: Buffer.from(redirectUri).toString('base64')
  })

  return sendRedirect(
    event,
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    302
  )
})
