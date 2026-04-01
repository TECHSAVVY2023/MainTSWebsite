<template>
  <div class="container mx-auto max-w-2xl flex-1 px-4 sm:px-6 lg:px-8">
    <div
      v-if="showCancelledNotice"
      class="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
      role="status"
    >
      Checkout was cancelled. You can review your cart and try again when you’re ready.
    </div>

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
            v-if="showEmailMismatch"
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
        <span class="text-lg font-bold tabular-nums text-secondary">{{ formatPhp(orderSubtotalPhp) }}</span>
      </div>

      <button
        type="button"
        class="w-full rounded-full bg-[#2E1368] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#6126B1] disabled:opacity-50"
        :disabled="!detailsValid"
        @click="phase = 3"
      >
        Continue to payment
      </button>
    </section>

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
            v-for="line in checkoutLines"
            :key="line.id"
            class="flex justify-between gap-4"
          >
            <span>{{ line.name }} × {{ line.quantity }}</span>
            <span class="shrink-0 tabular-nums">{{ formatPhp(line.unitAmountPhp * line.quantity) }}</span>
          </li>
        </ul>
        <div class="mt-4 flex justify-between border-t border-neutral-border pt-4 text-base font-bold text-dark">
          <span>Total</span>
          <span class="tabular-nums text-secondary">{{ formatPhp(orderSubtotalPhp) }}</span>
        </div>
      </div>

      <div class="rounded-xl border border-accent-purple/25 bg-violet-border/50 p-5 text-sm leading-relaxed text-dark/85">
        <i class="fas fa-lock mr-2 text-accent-purple" aria-hidden="true" />
        After you continue, your order is recorded and you’ll be redirected to PayMongo. When payment succeeds, PayMongo notifies our server via webhook and you’ll return to the confirmation page.
      </div>

      <p v-if="checkoutPaymentError" class="text-sm font-medium text-red-600" role="alert">
        {{ checkoutPaymentError }}
      </p>

      <div class="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          class="rounded-full border border-neutral-border bg-white px-6 py-3 text-sm font-medium text-dark hover:bg-neutral-gray"
          :disabled="checkoutSubmitting"
          @click="phase = 2"
        >
          Back
        </button>
        <button
          type="button"
          class="rounded-full bg-[#2E1368] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6126B1] disabled:opacity-50"
          :disabled="checkoutSubmitting"
          @click="startPayMongoCheckout"
        >
          {{ checkoutSubmitting ? 'Starting checkout…' : 'Continue to PayMongo' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, toValue } from 'vue'
import type { MaybeRef } from 'vue'
import type { CartLine } from '~/composables/useCart'
import type { CheckoutBillingFields, CheckoutShippingFields } from '~/composables/useCheckoutPage'

const phase = defineModel<2 | 3>('phase', { required: true })
const sameBilling = defineModel<boolean>('sameBilling', { required: true })

const props = defineProps<{
  cancelledNotice: MaybeRef<boolean>
  emailMismatchHint: MaybeRef<boolean>
  shipping: CheckoutShippingFields
  billing: CheckoutBillingFields
  canContinueDetails: MaybeRef<boolean>
  lines: MaybeRef<CartLine[]>
  subtotalPhp: MaybeRef<number>
  formatPhp: (n: number) => string
  paymentError: MaybeRef<string>
  submitting: MaybeRef<boolean>
  startPayMongoCheckout: () => void | Promise<void>
}>()

const showCancelledNotice = computed(() => toValue(props.cancelledNotice))
const showEmailMismatch = computed(() => toValue(props.emailMismatchHint))
const detailsValid = computed(() => toValue(props.canContinueDetails))
const checkoutLines = computed(() => toValue(props.lines))
const orderSubtotalPhp = computed(() => toValue(props.subtotalPhp))
const checkoutPaymentError = computed(() => toValue(props.paymentError))
const checkoutSubmitting = computed(() => toValue(props.submitting))
</script>
