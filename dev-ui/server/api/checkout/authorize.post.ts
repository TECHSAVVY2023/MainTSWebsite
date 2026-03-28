/**
 * Demo authorization endpoint — no card data accepted (PCI). Mirrors gateway → processor → issuer flow.
 * Production: replace with Stripe/payment provider webhooks and server-side capture.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({})) as {
    orderRef?: string
    paymentMethod?: string
    amountPhp?: number
  }

  await new Promise((r) => setTimeout(r, 900))

  const orderRef = body.orderRef || `ORD-${Date.now()}`
  const approved = true

  if (!approved) {
    throw createError({
      statusCode: 402,
      statusMessage: 'Payment declined (demo)'
    })
  }

  return {
    ok: true,
    orderRef,
    authorizationCode: `AUTH-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    paymentMethod: body.paymentMethod ?? 'unknown',
    amountPhp: body.amountPhp ?? 0,
    message:
      'Issuer approved authorization. Settlement to merchant account typically completes in 1–3 business days.'
  }
})
