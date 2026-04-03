<template>
  <div class="container mx-auto max-w-2xl flex-1 px-4 sm:px-6 lg:px-8">
    <section v-if="!orderRefText" class="py-12 text-center text-dark/75">
      <p>Missing order reference. Return to your cart to try again.</p>
      <NuxtLink
        to="/cart"
        class="mt-4 inline-block text-accent-purple underline"
      >
        View cart
      </NuxtLink>
    </section>

    <section v-else-if="payStatus === 'paid'" class="space-y-6">
      <div class="rounded-2xl border border-green-200 bg-green-50 p-6 text-center sm:p-8">
        <p class="text-sm font-semibold uppercase tracking-wide text-green-800">
          Payment received
        </p>
        <h1 class="mt-2 text-2xl font-bold text-dark sm:text-3xl">
          Thank you
        </h1>
        <p class="mt-3 text-sm text-dark/75 sm:text-base">
          Order reference
          <span class="font-mono font-semibold text-dark">{{ orderRefText }}</span>
        </p>
        <p v-if="totalPaidLabel" class="mt-2 text-sm text-dark/70">
          Total paid {{ totalPaidLabel }}
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

    <section v-else-if="paymentStatus === 'failed'" class="space-y-6 py-8 text-center">
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
      <p v-if="pollHint" class="text-sm text-amber-800">
        {{ pollHint }}
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
</template>

<script setup lang="ts">
import { computed, toValue } from 'vue'
import type { MaybeRef } from 'vue'

const props = defineProps<{
  orderReference: MaybeRef<string>
  paymentStatus: MaybeRef<string>
  totalLabel: MaybeRef<string>
  pollMessage: MaybeRef<string>
  checkOnce: () => void | Promise<void>
}>()

const orderRefText = computed(() => toValue(props.orderReference))
const payStatus = computed(() => toValue(props.paymentStatus))
const totalPaidLabel = computed(() => toValue(props.totalLabel))
const pollHint = computed(() => toValue(props.pollMessage))
</script>
