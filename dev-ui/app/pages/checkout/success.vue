<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to merchandise" back-href="/merchandise" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-8 sm:pb-24 sm:pt-12">
      <SectionWires gradient-id-prefix="swg-checkout-success" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
        <div class="container mx-auto max-w-2xl flex-1 px-4 sm:px-6 lg:px-8">
          <section v-if="!refParam" class="py-12 text-center text-dark/75">
            <p>Missing order reference. Return to your cart to try again.</p>
            <NuxtLink
              to="/cart"
              class="mt-4 inline-block text-accent-purple underline"
            >
              View cart
            </NuxtLink>
          </section>

          <section v-else-if="status === 'paid'" class="space-y-6">
            <div class="rounded-2xl border border-green-200 bg-green-50 p-6 text-center sm:p-8">
              <p class="text-sm font-semibold uppercase tracking-wide text-green-800">
                Payment received
              </p>
              <h1 class="mt-2 text-2xl font-bold text-dark sm:text-3xl">
                Thank you
              </h1>
              <p class="mt-3 text-sm text-dark/75 sm:text-base">
                Order reference
                <span class="font-mono font-semibold text-dark">{{ refParam }}</span>
              </p>
              <p v-if="totalLabel" class="mt-2 text-sm text-dark/70">
                Total paid {{ totalLabel }}
              </p>
            </div>

            <p class="text-center text-sm text-dark/65">
              PayMongo confirmed this payment via webhook. You’ll receive any receipt email from PayMongo if enabled.
            </p>

            <NuxtLink
              to="/merchandise"
              class="inline-flex w-full items-center justify-center rounded-full border border-accent-purple/35 bg-violet-border py-3 text-sm font-semibold text-accent-purple no-underline hover:bg-[#D9CCFA]"
            >
              Back to merchandise
            </NuxtLink>
          </section>

          <section v-else-if="status === 'failed'" class="space-y-6 py-8 text-center">
            <h1 class="text-xl font-bold text-dark">
              Payment not completed
            </h1>
            <p class="mx-auto max-w-md text-sm text-dark/75">
              {{ pollMessage || 'You can return to your cart and try checkout again.' }}
            </p>
            <NuxtLink
              to="/cart"
              class="inline-flex rounded-full bg-[#2E1368] px-6 py-3 text-sm font-semibold text-white no-underline hover:bg-[#6126B1]"
            >
              Back to cart
            </NuxtLink>
          </section>

          <section v-else class="space-y-6 py-8 text-center">
            <div class="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-accent-purple/30 border-t-[#2E1368]" aria-hidden="true" />
            <h1 class="text-xl font-bold text-dark">
              Confirming payment…
            </h1>
            <p class="mx-auto max-w-md text-sm leading-relaxed text-dark/75">
              If you completed checkout on PayMongo, we’re waiting for confirmation. This usually takes a few seconds.
            </p>
            <p v-if="pollMessage" class="text-sm text-amber-800">
              {{ pollMessage }}
            </p>
            <button
              type="button"
              class="rounded-full border border-neutral-border bg-white px-5 py-2.5 text-sm font-medium text-dark hover:bg-neutral-gray"
              @click="checkOnce"
            >
              Check again
            </button>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
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
</script>
