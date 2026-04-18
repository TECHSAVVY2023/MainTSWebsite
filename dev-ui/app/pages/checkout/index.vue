<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to cart" back-href="/cart" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-8 sm:pb-24 sm:pt-12">
      <SectionWires gradient-id-prefix="swg-checkout" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
        <div class="container mx-auto max-w-2xl flex-1 px-4 sm:px-6 lg:px-8">
          <!-- Empty cart guard handled in script redirect -->

          <div
            v-if="cancelledNotice"
            class="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            role="status"
          >
            Checkout was cancelled. You can review your cart and try again when you’re ready.
          </div>

          <!-- Phase 2: Shipping / billing + payment method -->
          <section v-if="phase === 2" class="space-y-8">
            <header>
              <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-purple">
                Checkout · Steps 2–3
              </p>
              <h1 class="text-[22px] font-bold leading-tight text-dark sm:text-[26px]">
                Shipping, billing & payment method
              </h1>
              <p class="mt-2 text-sm text-dark/75 sm:text-base">
                Enter where we should ship your order and how you’ll pay. Next, you’ll complete payment in a secure flow (encryption handled by the payment gateway).
              </p>
            </header>

            <div class="rounded-xl border border-neutral-border bg-white p-5 sm:p-6">
              <h2 class="mb-4 text-sm font-semibold uppercase tracking-wide text-dark/70">
                Shipping
              </h2>
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="sm:col-span-2 block text-sm font-medium text-dark">
                  Full name
                  <input v-model="shipping.fullName" type="text" autocomplete="name" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark" required>
                </label>
                <label class="block text-sm font-medium text-dark">
                  Email
                  <input v-model="shipping.email" type="email" autocomplete="email" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark" required>
                </label>
                <label class="block text-sm font-medium text-dark">
                  Confirm email
                  <input
                    v-model="shipping.confirmEmail"
                    type="email"
                    autocomplete="email"
                    class="mt-1 w-full rounded-lg border px-3 py-2 text-dark"
                    placeholder="Re-enter your email"
                    required
                  >
                </label>
                <p
                  v-if="emailMismatchHint"
                  class="sm:col-span-2 text-sm text-red-600"
                  role="status"
                >
                  Email addresses must match.
                </p>
                <label class="block text-sm font-medium text-dark">
                  Phone
                  <input v-model="shipping.phone" type="tel" autocomplete="tel" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                </label>
                <label class="block text-sm font-medium text-dark">
                  Region
                  <input v-model="shipping.region" type="text" autocomplete="address-level1" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark" placeholder="e.g. NCR, Region VII" required>
                </label>
                <label class="block text-sm font-medium text-dark">
                  Province
                  <input v-model="shipping.province" type="text" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark" placeholder="e.g. Cebu, Laguna" required>
                </label>
                <label class="block text-sm font-medium text-dark">
                  City / municipality
                  <input v-model="shipping.city" type="text" autocomplete="address-level2" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark" required>
                </label>
                <label class="block text-sm font-medium text-dark">
                  Barangay
                  <input v-model="shipping.barangay" type="text" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark" required>
                </label>
                <label class="sm:col-span-2 block text-sm font-medium text-dark">
                  Street (house / building / street)
                  <input v-model="shipping.street" type="text" autocomplete="street-address" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark" required>
                </label>
              </div>
            </div>

            <div class="rounded-xl border border-neutral-border bg-white p-5 sm:p-6">
              <label class="flex cursor-pointer items-center gap-2 text-sm font-medium text-dark">
                <input v-model="sameBilling" type="checkbox" class="rounded border-neutral-border">
                Billing address same as shipping
              </label>
              <template v-if="!sameBilling">
                <h2 class="mb-4 mt-6 text-sm font-semibold uppercase tracking-wide text-dark/70">
                  Billing
                </h2>
                <div class="grid gap-4 sm:grid-cols-2">
                  <label class="sm:col-span-2 block text-sm font-medium text-dark">
                    Full name
                    <input v-model="billing.fullName" type="text" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                  </label>
                  <label class="block text-sm font-medium text-dark">
                    Region
                    <input v-model="billing.region" type="text" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                  </label>
                  <label class="block text-sm font-medium text-dark">
                    Province
                    <input v-model="billing.province" type="text" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                  </label>
                  <label class="block text-sm font-medium text-dark">
                    City / municipality
                    <input v-model="billing.city" type="text" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                  </label>
                  <label class="block text-sm font-medium text-dark">
                    Barangay
                    <input v-model="billing.barangay" type="text" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                  </label>
                  <label class="sm:col-span-2 block text-sm font-medium text-dark">
                    Street
                    <input v-model="billing.street" type="text" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                  </label>
                </div>
              </template>
            </div>

            <div class="flex items-center justify-between rounded-xl border border-neutral-border bg-white px-5 py-4">
              <span class="text-sm text-dark/75">Order total</span>
              <span class="text-lg font-bold tabular-nums text-secondary">{{ formatPhp(subtotalPhp) }}</span>
            </div>

            <button
              type="button"
              class="w-full rounded-full bg-[#2E1368] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#6126B1] disabled:opacity-50"
              :disabled="!canContinueDetails"
              @click="phase = 3"
            >
              Continue to payment
            </button>
          </section>

          <!-- Phase 3: PayMongo hosted checkout (PCI — card/e-wallets on PayMongo) -->
          <section v-else-if="phase === 3" class="space-y-6">
            <header>
              <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-purple">
                Checkout · Step 3
              </p>
              <h1 class="text-[22px] font-bold leading-tight text-dark sm:text-[26px]">
                Pay with PayMongo
              </h1>
              <p class="mt-2 text-sm text-dark/75 sm:text-base">
                You’ll complete payment on PayMongo’s secure page (cards, GCash, Maya, QR Ph, and other methods your account supports). We never collect card numbers on this site.
              </p>
            </header>

            <div class="rounded-xl border border-neutral-border bg-white p-5 sm:p-6">
              <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-dark/70">
                Order summary
              </h2>
              <ul class="space-y-2 text-sm text-dark/85">
                <li
                  v-for="line in lines"
                  :key="line.id"
                  class="flex justify-between gap-4"
                >
                  <span>{{ line.name }} × {{ line.quantity }}</span>
                  <span class="shrink-0 tabular-nums">{{ formatPhp(line.unitAmountPhp * line.quantity) }}</span>
                </li>
              </ul>
              <div class="mt-4 flex justify-between border-t border-neutral-border pt-4 text-base font-bold text-dark">
                <span>Total</span>
                <span class="tabular-nums text-secondary">{{ formatPhp(subtotalPhp) }}</span>
              </div>
            </div>

            <div class="rounded-xl border border-accent-purple/25 bg-violet-border/50 p-5 text-sm leading-relaxed text-dark/85">
              <i class="fas fa-lock mr-2 text-accent-purple" aria-hidden="true" />
              After you continue, your order is recorded and you’ll be redirected to PayMongo. When payment succeeds, PayMongo notifies our server via webhook and you’ll return to the confirmation page.
            </div>

            <p v-if="paymentError" class="text-sm font-medium text-red-600" role="alert">
              {{ paymentError }}
            </p>

            <div class="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                class="rounded-full border border-neutral-border bg-white px-6 py-3 text-sm font-medium text-dark hover:bg-neutral-gray"
                :disabled="submitting"
                @click="phase = 2"
              >
                Back
              </button>
              <button
                type="button"
                class="rounded-full bg-[#2E1368] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6126B1] disabled:opacity-50"
                :disabled="submitting"
                @click="startPayMongoCheckout"
              >
                {{ submitting ? 'Starting checkout…' : 'Continue to PayMongo' }}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const { lines, subtotalPhp } = useCart()

const phase = ref<2 | 3>(2)
const sameBilling = ref(true)
const submitting = ref(false)
const paymentError = ref('')

const cancelledNotice = computed(() => route.query.cancelled === '1')

const emailMismatchHint = computed(() => {
  const em = shipping.email.trim().toLowerCase()
  const ce = shipping.confirmEmail.trim().toLowerCase()
  if (!shipping.email.trim() || !shipping.confirmEmail.trim()) return false
  return em !== ce
})

const shipping = reactive({
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

const billing = reactive({
  fullName: '',
  region: '',
  province: '',
  city: '',
  barangay: '',
  street: ''
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

function formatPayMongoError (e: unknown): string {
  if (e && typeof e === 'object' && 'data' in e) {
    const d = (e as { data?: { error?: string; details?: unknown } }).data
    if (d?.error) {
      const extra = d.details != null ? ` ${JSON.stringify(d.details)}` : ''
      return `${d.error}${extra}`
    }
  }
  if (e instanceof Error) return e.message
  return 'Could not start PayMongo checkout. Check PAYMONGO_SECRET_KEY on the API server and try again.'
}

async function startPayMongoCheckout () {
  paymentError.value = ''
  const apiBase = config.public.apiBase as string
  const siteUrl =
    String(config.public.siteUrl || '').replace(/\/$/, '') ||
    (typeof window !== 'undefined' ? window.location.origin : '')
  if (!apiBase) {
    paymentError.value = 'Missing NUXT_PUBLIC_API_BASE.'
    return
  }
  if (!siteUrl) {
    paymentError.value = 'Set NUXT_PUBLIC_SITE_URL or open checkout in the browser.'
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
      `${apiBase.replace(/\/$/, '')}/merch/checkout/`,
      {
        method: 'POST',
        body: {
          reference_number: reference,
          success_url: successUrl,
          cancel_url: cancelUrl,
          lines: payloadLines,
          shipping: shipPayload,
          confirm_email: confirmEmail,
          send_email_receipt: true
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
</script>
