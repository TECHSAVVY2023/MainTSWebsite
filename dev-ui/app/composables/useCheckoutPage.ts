/**
 * Checkout flow: shipping/billing form, PayMongo session start, empty-cart guards.
 */
export type CheckoutShippingFields = {
  fullName: string
  email: string
  confirmEmail: string
  phone: string
  region: string
  province: string
  city: string
  barangay: string
  street: string
}

export type CheckoutBillingFields = {
  fullName: string
  region: string
  province: string
  city: string
  barangay: string
  street: string
}

function formatPayMongoError (e: unknown): string {
  if (e && typeof e === 'object' && 'data' in e) {
    const d = (e as { data?: { error?: string; details?: unknown } }).data
    if (d?.error) {
      const extra = d.details != null ? ` ${JSON.stringify(d.details)}` : ''
      return `${d.error}${extra}`
    }
  }
  if (e instanceof Error) return e.message
  return 'Could not start checkout. Ensure the API server payment settings are configured and try again.'
}

export function useCheckoutPage () {
  const router = useRouter()
  const route = useRoute()
  const config = useRuntimeConfig()
  const { lines, subtotalPhp } = useCart()

  const phase = ref<2 | 3>(2)
  const sameBilling = ref(true)
  const submitting = ref(false)
  const paymentError = ref('')

  const cancelledNotice = computed(() => route.query.cancelled === '1')

  const shipping = reactive<CheckoutShippingFields>({
    fullName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    region: '',
    province: '',
    city: '',
    barangay: '',
    street: ''
  })

  const billing = reactive<CheckoutBillingFields>({
    fullName: '',
    region: '',
    province: '',
    city: '',
    barangay: '',
    street: ''
  })

  const emailMismatchHint = computed(() => {
    const em = shipping.email.trim().toLowerCase()
    const ce = shipping.confirmEmail.trim().toLowerCase()
    if (!shipping.email.trim() || !shipping.confirmEmail.trim()) return false
    return em !== ce
  })

  const canContinueDetails = computed(() => {
    const s = shipping
    const em = s.email.trim().toLowerCase()
    const ce = s.confirmEmail.trim().toLowerCase()
    const emailsMatch = Boolean(em && ce && em === ce)
    return Boolean(
      s.fullName.trim()
      && s.email.trim()
      && emailsMatch
      && s.region.trim()
      && s.province.trim()
      && s.city.trim()
      && s.barangay.trim()
      && s.street.trim()
    )
  })

  function formatPhp (n: number) {
    return `₱${n.toLocaleString('en-PH')}`
  }

  onMounted(() => {
    if (lines.value.length === 0) {
      router.replace('/cart')
    }
  })

  watch(
    lines,
    (v) => {
      if (v.length === 0 && phase.value < 3) {
        router.replace('/cart')
      }
    },
    { deep: true }
  )

  async function startPayMongoCheckout () {
    paymentError.value = ''
    const apiBase = config.public.apiBase as string
    const siteUrl = config.public.siteUrl as string
    if (!apiBase) {
      paymentError.value = 'Missing NUXT_PUBLIC_API_BASE.'
      return
    }

    const reference =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `ord-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

    const successUrl = `${siteUrl}/checkout/success?merchant_order_ref=${encodeURIComponent(reference)}`
    const cancelUrl = `${siteUrl}/checkout?cancelled=1`

    const payloadLines = lines.value.map((l) => ({
      id: l.id,
      name: l.name,
      quantity: l.quantity,
      unitAmountPhp: l.unitAmountPhp,
      ...(l.image && l.image.startsWith('https://') ? { image: l.image } : {})
    }))

    const shipPayload = { ...shipping } as Record<string, string>
    const confirmEmail = String(shipPayload.confirmEmail ?? '').trim()
    delete shipPayload.confirmEmail

    submitting.value = true
    try {
      const res = await $fetch<{ checkout_url: string; reference_number: string }>(
        `${apiBase}/techsavvy_app/payments/paymongo/create-checkout/`,
        {
          method: 'POST',
          body: {
            reference_number: reference,
            success_url: successUrl,
            cancel_url: cancelUrl,
            lines: payloadLines,
            shipping: shipPayload,
            confirm_email: confirmEmail,
            send_email_receipt: false
          }
        }
      )
      if (res.checkout_url) {
        window.location.href = res.checkout_url
        return
      }
      paymentError.value = 'PayMongo did not return a checkout URL.'
    } catch (e: unknown) {
      paymentError.value = formatPayMongoError(e)
    } finally {
      submitting.value = false
    }
  }

  useHead({
    title: 'Checkout',
    meta: [{ name: 'description', content: 'Complete your Tech Savvy merchandise purchase.' }]
  })

  return {
    lines,
    subtotalPhp,
    phase,
    sameBilling,
    submitting,
    paymentError,
    cancelledNotice,
    emailMismatchHint,
    shipping,
    billing,
    canContinueDetails,
    formatPhp,
    startPayMongoCheckout
  }
}
