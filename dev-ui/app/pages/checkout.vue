<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to cart" back-href="/cart" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-8 sm:pb-24 sm:pt-12">
      <SectionWires gradient-id-prefix="swg-checkout" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
        <div class="container mx-auto max-w-2xl flex-1 px-4 sm:px-6 lg:px-8">
          <!-- Empty cart guard handled in script redirect -->

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
                  Phone
                  <input v-model="shipping.phone" type="tel" autocomplete="tel" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                </label>
                <label class="sm:col-span-2 block text-sm font-medium text-dark">
                  Address line 1
                  <input v-model="shipping.line1" type="text" autocomplete="address-line1" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark" required>
                </label>
                <label class="sm:col-span-2 block text-sm font-medium text-dark">
                  Address line 2
                  <input v-model="shipping.line2" type="text" autocomplete="address-line2" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                </label>
                <label class="block text-sm font-medium text-dark">
                  City
                  <input v-model="shipping.city" type="text" autocomplete="address-level2" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark" required>
                </label>
                <label class="block text-sm font-medium text-dark">
                  Postal code
                  <input v-model="shipping.postal" type="text" autocomplete="postal-code" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                </label>
                <label class="sm:col-span-2 block text-sm font-medium text-dark">
                  Country / region
                  <input v-model="shipping.country" type="text" autocomplete="country-name" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark" required>
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
                  <label class="sm:col-span-2 block text-sm font-medium text-dark">
                    Address
                    <input v-model="billing.line1" type="text" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                  </label>
                  <label class="block text-sm font-medium text-dark">
                    City
                    <input v-model="billing.city" type="text" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                  </label>
                  <label class="block text-sm font-medium text-dark">
                    Postal code
                    <input v-model="billing.postal" type="text" class="mt-1 w-full rounded-lg border px-3 py-2 text-dark">
                  </label>
                </div>
              </template>
            </div>

            <div class="rounded-xl border border-neutral-border bg-white p-5 sm:p-6">
              <h2 class="mb-4 text-sm font-semibold uppercase tracking-wide text-dark/70">
                Payment method
              </h2>
              <p class="mb-4 text-sm text-dark/65">
                Choose how you’ll pay. Card details are never stored on our servers in production—the gateway encrypts sensitive data before sending it to the processor.
              </p>
              <div class="space-y-3">
                <label
                  v-for="opt in paymentOptions"
                  :key="opt.value"
                  class="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"
                  :class="paymentMethod === opt.value ? 'border-accent-purple bg-violet-border/40' : 'border-neutral-border hover:border-dark/20'"
                >
                  <input v-model="paymentMethod" type="radio" name="pay" :value="opt.value" class="mt-1">
                  <span>
                    <span class="block font-medium text-dark">{{ opt.label }}</span>
                    <span class="block text-sm text-dark/60">{{ opt.hint }}</span>
                  </span>
                </label>
              </div>
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

          <!-- Phase 3: Payment submission & encryption (PCI-safe demo) -->
          <section v-else-if="phase === 3" class="space-y-6">
            <header>
              <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-purple">
                Checkout · Step 3
              </p>
              <h1 class="text-[22px] font-bold leading-tight text-dark sm:text-[26px]">
                Payment submission & encryption
              </h1>
              <p class="mt-2 text-sm text-dark/75 sm:text-base">
                <strong class="font-semibold text-dark">Data entry:</strong> the customer enters payment details in a secure form hosted or tokenized by the payment gateway.
                <strong class="mt-2 block font-semibold text-dark">Encryption:</strong> the gateway encrypts sensitive data and transmits it to the payment processor—we never handle raw card data on our app servers (PCI DSS).
              </p>
            </header>

            <div
              v-if="paymentMethod === 'card'"
              class="rounded-xl border border-accent-purple/25 bg-[rgba(20,8,46,0.45)] p-5 text-white sm:p-6"
            >
              <p class="text-sm leading-relaxed text-white/90">
                <i class="fas fa-lock mr-2" aria-hidden="true" />
                <strong class="text-[#D9CCFA]">Demo mode:</strong> do not enter real card numbers. In production, integrate Stripe Elements, hosted fields, or redirect checkout so the gateway encrypts PAN/CVV before they reach your infrastructure.
              </p>
              <div class="mt-5 grid gap-4 sm:grid-cols-2">
                <label class="sm:col-span-2 block text-sm font-medium text-white/90">
                  Cardholder name
                  <input
                    v-model="cardDemo.name"
                    type="text"
                    placeholder="As shown on card"
                    class="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
                    autocomplete="off"
                  >
                </label>
                <label class="sm:col-span-2 block text-sm font-medium text-white/90">
                  Card number (demo — use fake digits only)
                  <input
                    v-model="cardDemo.pan"
                    type="text"
                    inputmode="numeric"
                    placeholder="4242 4242 4242 4242"
                    maxlength="19"
                    class="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
                    autocomplete="off"
                  >
                </label>
                <label class="block text-sm font-medium text-white/90">
                  Expiry (MM/YY)
                  <input
                    v-model="cardDemo.exp"
                    type="text"
                    placeholder="12/30"
                    class="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
                    autocomplete="off"
                  >
                </label>
                <label class="block text-sm font-medium text-white/90">
                  CVV (demo)
                  <input
                    v-model="cardDemo.cvv"
                    type="text"
                    inputmode="numeric"
                    maxlength="4"
                    placeholder="•••"
                    class="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/40"
                    autocomplete="off"
                  >
                </label>
              </div>
            </div>

            <div
              v-else-if="paymentMethod === 'paypal'"
              class="rounded-xl border border-neutral-border bg-white p-6 text-center"
            >
              <p class="text-dark/80">
                You would be redirected to <strong>PayPal</strong> to log in and approve the payment. The gateway then returns an encrypted authorization to our store.
              </p>
            </div>

            <div
              v-else
              class="rounded-xl border border-neutral-border bg-white p-6 text-center"
            >
              <p class="text-dark/80">
                You would confirm with <strong>Apple Pay</strong> on your device. Wallet tokens are encrypted end-to-end through the payment network—no raw card data on our servers.
              </p>
            </div>

            <p v-if="paymentError" class="text-sm font-medium text-red-600" role="alert">
              {{ paymentError }}
            </p>

            <div class="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                class="rounded-full border border-neutral-border bg-white px-6 py-3 text-sm font-medium text-dark hover:bg-neutral-gray"
                @click="phase = 2"
              >
                Back
              </button>
              <button
                type="button"
                class="rounded-full bg-[#2E1368] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6126B1] disabled:opacity-50"
                :disabled="submitting"
                @click="runAuthorization"
              >
                {{ paymentMethod === 'card' ? 'Encrypt & submit to gateway (demo)' : 'Submit payment (demo)' }}
              </button>
            </div>
          </section>

          <!-- Phase 4: Authorization -->
          <section v-else-if="phase === 4" class="py-16 text-center">
            <div class="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-accent-purple/30 border-t-[#2E1368]" aria-hidden="true" />
            <h1 class="text-xl font-bold text-dark sm:text-2xl">
              Authorization in progress
            </h1>
            <p class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-dark/75">
              The payment processor sends the request to the issuing bank to verify the account and available funds. An approval or decline code is returned to the gateway—then relayed to the store.
            </p>
          </section>

          <!-- Phase 5: Finalization -->
          <section v-else-if="phase === 5" class="space-y-6">
            <div class="rounded-2xl border border-green-200 bg-green-50 p-6 text-center sm:p-8">
              <p class="text-sm font-semibold uppercase tracking-wide text-green-800">
                Order successful
              </p>
              <h1 class="mt-2 text-2xl font-bold text-dark sm:text-3xl">
                Thank you
              </h1>
              <p class="mt-3 text-sm text-dark/75 sm:text-base">
                Reference <span class="font-mono font-semibold text-dark">{{ authResult?.orderRef }}</span>
                · Authorization <span class="font-mono font-semibold text-dark">{{ authResult?.authorizationCode }}</span>
              </p>
            </div>

            <div class="rounded-xl border border-neutral-border bg-white p-5 text-sm leading-relaxed text-dark/80 sm:p-6">
              <h2 class="font-semibold text-dark">
                Transaction finalization
              </h2>
              <ul class="mt-3 list-inside list-disc space-y-2">
                <li>
                  <strong class="text-dark">Customer confirmation:</strong> you’re viewing the confirmation screen; a receipt can be emailed from production checkout.
                </li>
                <li>
                  <strong class="text-dark">Funds transfer:</strong> the processor moves authorized funds toward the merchant’s bank account.
                </li>
                <li>
                  <strong class="text-dark">Merchant settlement:</strong> deposits usually land within <strong>1–3 business days</strong>, after which fulfillment can proceed.
                </li>
              </ul>
            </div>

            <div class="rounded-xl border border-accent-purple/25 bg-[rgba(20,8,46,0.5)] p-5 text-sm leading-relaxed text-white/85">
              <h2 class="font-semibold text-[#D9CCFA]">
                Fishbowl Inventory
              </h2>
              <p class="mt-2">
                For warehouse operations, this order can be pushed to <strong class="text-white">Fishbowl Inventory</strong> to allocate stock, pick/pack, and sync on-hand quantities. Connect Fishbowl via API or import after payment capture in production.
              </p>
            </div>

            <NuxtLink
              to="/merchandise"
              class="inline-flex w-full items-center justify-center rounded-full border border-accent-purple/35 bg-violet-border py-3 text-sm font-semibold text-accent-purple no-underline hover:bg-[#D9CCFA]"
            >
              Back to merchandise
            </NuxtLink>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
type PaymentMethod = 'card' | 'paypal' | 'apple_pay'

const router = useRouter()
const { lines, subtotalPhp, clearCart } = useCart()

const phase = ref<2 | 3 | 4 | 5>(2)
const sameBilling = ref(true)
const paymentMethod = ref<PaymentMethod>('card')
const submitting = ref(false)
const paymentError = ref('')
const authResult = ref<{
  orderRef: string
  authorizationCode: string
  message: string
} | null>(null)

const shipping = reactive({
  fullName: '',
  email: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  postal: '',
  country: ''
})

const billing = reactive({
  fullName: '',
  line1: '',
  city: '',
  postal: ''
})

const cardDemo = reactive({
  name: '',
  pan: '',
  exp: '',
  cvv: ''
})

const paymentOptions = [
  { value: 'card' as const, label: 'Credit or debit card', hint: 'Secure form; gateway encrypts card data to the processor.' },
  { value: 'paypal' as const, label: 'PayPal', hint: 'Redirect to PayPal; return with encrypted token.' },
  { value: 'apple_pay' as const, label: 'Apple Pay', hint: 'Device wallet; network tokenization.' }
]

const canContinueDetails = computed(() => {
  const s = shipping
  return Boolean(
    s.fullName.trim()
    && s.email.trim()
    && s.line1.trim()
    && s.city.trim()
    && s.country.trim()
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
    if (v.length === 0 && phase.value < 5) {
      router.replace('/cart')
    }
  },
  { deep: true }
)

async function runAuthorization () {
  paymentError.value = ''
  if (paymentMethod.value === 'card') {
    const panDigits = cardDemo.pan.replace(/\D/g, '')
    if (panDigits.length < 12) {
      paymentError.value = 'Enter a demo card number (fake digits only), or switch to PayPal / Apple Pay.'
      return
    }
  }

  const orderRef = `ORD-${Date.now()}`
  phase.value = 4
  submitting.value = true

  try {
    const res = await $fetch<{
      ok: boolean
      orderRef: string
      authorizationCode: string
      message: string
    }>('/api/checkout/authorize', {
      method: 'POST',
      body: {
        orderRef,
        paymentMethod: paymentMethod.value,
        amountPhp: subtotalPhp.value
      }
    })
    authResult.value = {
      orderRef: res.orderRef,
      authorizationCode: res.authorizationCode,
      message: res.message
    }
    phase.value = 5
    clearCart()
  } catch (e: unknown) {
    phase.value = 3
    paymentError.value = e instanceof Error ? e.message : 'Authorization failed (demo). Try again.'
  } finally {
    submitting.value = false
  }
}

useHead({
  title: 'Checkout',
  meta: [{ name: 'description', content: 'Complete your Tech Savvy merchandise purchase.' }]
})
</script>
