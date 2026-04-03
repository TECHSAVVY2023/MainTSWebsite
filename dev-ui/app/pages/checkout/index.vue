<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to cart" back-href="/cart" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-8 sm:pb-24 sm:pt-12">
      <SectionWires gradient-id-prefix="swg-checkout" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
        <CheckoutFlowMain
          v-model:phase="phaseModel"
          v-model:same-billing="sameBillingModel"
          :cancelled-notice="co.cancelledNotice"
          :email-mismatch-hint="co.emailMismatchHint"
          :shipping="co.shipping"
          :billing="co.billing"
          :can-continue-details="co.canContinueDetails"
          :lines="co.lines"
          :subtotal-php="co.subtotalPhp"
          :format-php="co.formatPhp"
          :payment-error="co.paymentError"
          :submitting="co.submitting"
          :start-pay-mongo-checkout="co.startPayMongoCheckout"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const co = useCheckoutPage()

const phaseModel = computed({
  get: () => co.phase.value,
  set: (v: 2 | 3) => {
    co.phase.value = v
  }
})

const sameBillingModel = computed({
  get: () => co.sameBilling.value,
  set: (v: boolean) => {
    co.sameBilling.value = v
  }
<<<<<<< HEAD
  if (e instanceof Error) return e.message
  return 'Could not start PayMongo checkout. Check PAYMONGO_SECRET_KEY on the API server and try again.'
}

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
      `${apiBase}/techsavvy_app/merch/checkout/`,
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
=======
>>>>>>> 68abecb5f8a847484f8e49d2af6598f09aad374a
})
</script>
