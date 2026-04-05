<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to catalog" back-href="/merchandise" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-8 sm:pb-24 sm:pt-12">
      <SectionWires gradient-id-prefix="swg-cart" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
        <div class="container mx-auto max-w-3xl flex-1 px-4 sm:px-6 lg:px-8">
          <header class="mb-8">
            <span class="mb-2 block text-xs font-semibold uppercase tracking-widest text-accent-purple">
              Checkout · Step 1
            </span>
            <h1 class="text-[22px] font-bold leading-tight tracking-tight text-dark sm:text-[28px]">
              Cart completion
            </h1>
            <p class="mt-2 text-sm leading-relaxed text-dark/75 sm:text-base">
              Review your merchandise. When you’re ready, continue to shipping, billing, and payment method selection.
            </p>
          </header>

          <div
            v-if="lines.length === 0"
            class="rounded-2xl border border-neutral-border bg-white p-10 text-center shadow-sm"
          >
            <p class="text-dark/80">
              Your cart is empty.
            </p>
            <NuxtLink
              to="/merchandise"
              class="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-purple/35 bg-violet-border px-5 py-2.5 text-sm font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA]"
            >
              Browse merchandise
            </NuxtLink>
          </div>

          <template v-else>
            <ul class="space-y-4 rounded-2xl border border-neutral-border bg-white p-4 sm:p-6">
              <li
                v-for="line in lines"
                :key="line.id"
                class="flex flex-col gap-4 border-b border-neutral-border pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center"
              >
                <div class="flex flex-1 gap-4">
                  <div class="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#e8eaef]">
                    <img
                      :src="line.image || defaultImage"
                      :alt="line.name"
                      class="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      @error="onLineImgError"
                    >
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="font-semibold text-dark">
                      {{ line.name }}
                    </p>
                    <p class="text-sm text-dark/65">
                      {{ line.priceLabel }} each
                    </p>
                  </div>
                </div>
                <div class="flex items-center justify-between gap-4 sm:justify-end">
                  <div class="flex items-center rounded-lg border border-neutral-border">
                    <button
                      type="button"
                      class="px-3 py-2 text-dark/80 hover:bg-neutral-gray"
                      aria-label="Decrease quantity"
                      @click="setQuantity(line.id, line.quantity - 1)"
                    >
                      −
                    </button>
                    <span class="min-w-[2rem] text-center text-sm tabular-nums">{{ line.quantity }}</span>
                    <button
                      type="button"
                      class="px-3 py-2 text-dark/80 hover:bg-neutral-gray"
                      aria-label="Increase quantity"
                      @click="setQuantity(line.id, line.quantity + 1)"
                    >
                      +
                    </button>
                  </div>
                  <p class="w-24 text-right font-semibold tabular-nums text-secondary">
                    {{ formatPhp(line.unitAmountPhp * line.quantity) }}
                  </p>
                  <button
                    type="button"
                    class="text-sm text-dark/50 underline-offset-2 hover:text-red-600 hover:underline"
                    @click="removeItem(line.id)"
                  >
                    Remove
                  </button>
                </div>
              </li>
            </ul>

            <div class="mt-6 flex flex-col gap-4 rounded-2xl border border-neutral-border bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-lg font-semibold text-dark">
                Subtotal <span class="tabular-nums text-secondary">{{ formatPhp(subtotalPhp) }}</span>
              </p>
              <NuxtLink
                to="/checkout"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-accent-purple/35 bg-[#2E1368] px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#6126B1]"
              >
                Proceed to checkout
                <i class="fas fa-arrow-right text-xs" aria-hidden="true" />
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_MEDIA_FALLBACK } from '~/constants/sampleMedia'

const { lines, subtotalPhp, setQuantity, removeItem } = useCart()
const defaultImage = DEFAULT_MEDIA_FALLBACK

function onLineImgError (e: Event) {
  const el = e.target as HTMLImageElement | null
  if (!el || el.dataset.fallback === '1') return
  el.dataset.fallback = '1'
  el.src = defaultImage
}

function formatPhp (n: number) {
  return `₱${n.toLocaleString('en-PH')}`
}

useHead({
  title: 'Shopping cart',
  meta: [{ name: 'description', content: 'Review your Tech Savvy merchandise cart before checkout.' }]
})
</script>
