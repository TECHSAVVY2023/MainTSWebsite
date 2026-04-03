<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to merchandise" back-href="/merchandise" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-8 sm:pb-24 sm:pt-12">
      <SectionWires gradient-id-prefix="swg-checkout-success" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
        <CheckoutSuccessMain
          :order-reference="success.orderReference"
          :payment-status="success.paymentStatus"
          :total-label="success.totalLabel"
          :poll-message="success.pollMessage"
          :check-once="success.checkOnce"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
const route = useRoute()
const config = useRuntimeConfig()
const { clearCart } = useCart()

const refParam = computed(() => {
  const q = route.query.merchant_order_ref
  return typeof q === 'string' && q.trim() ? q.trim() : ''
})

const status = ref<'pending' | 'paid' | 'failed' | ''>('')
const totalCentavos = ref<number | null>(null)
const pollMessage = ref('')
let pollTimer: ReturnType<typeof setInterval> | null = null
let attempts = 0
const maxAttempts = 45

const totalLabel = computed(() => {
  if (totalCentavos.value == null) return ''
  const peso = totalCentavos.value / 100
  return `₱${peso.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
})

async function checkOnce () {
  const ref = refParam.value
  if (!ref) return
  const apiBase = (config.public.apiBase as string || '').replace(/\/$/, '')
  try {
    const res = await $fetch<{
      reference_number: string
      status: string
      total_centavos?: number
    }>(`${apiBase}/merch/order/${encodeURIComponent(ref)}/`)
    totalCentavos.value = typeof res.total_centavos === 'number' ? res.total_centavos : null
    if (res.status === 'paid') {
      status.value = 'paid'
      clearCart()
      stopPoll()
      return
    }
    if (res.status === 'failed') {
      status.value = 'failed'
      pollMessage.value = 'Payment was not completed. You can return to the cart to try again.'
      stopPoll()
      return
    }
  } catch {
    pollMessage.value = 'Could not reach the server. Check your API URL and connection.'
  }
}

function stopPoll () {
  if (pollTimer != null) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

function tick () {
  attempts += 1
  if (attempts > maxAttempts) {
    stopPoll()
    pollMessage.value =
      'Still waiting for confirmation. If you already paid, your order will update when the webhook arrives—you can refresh this page later.'
    return
  }
  void checkOnce()
}

onMounted(async () => {
  if (!refParam.value) {
    return
  }
  await checkOnce()
  if (status.value === 'paid' || status.value === 'failed') return
  pollTimer = setInterval(tick, 2000)
})

onUnmounted(() => {
  stopPoll()
})

useHead({
  title: 'Checkout — success',
  meta: [{ name: 'description', content: 'Payment confirmation for your Tech Savvy order.' }]
})
=======
const success = useCheckoutSuccessPage()
>>>>>>> 68abecb5f8a847484f8e49d2af6598f09aad374a
</script>
