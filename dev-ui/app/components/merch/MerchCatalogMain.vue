<template>
  <div class="container mx-auto max-w-6xl flex-1 px-4 sm:px-6 lg:px-8">
    <header class="mb-10 sm:mb-14">
      <SectionWireShield variant="gray">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div class="max-w-3xl">
            <span class="mb-2 block text-xs font-semibold uppercase tracking-widest text-accent-purple">
              Merchandise
            </span>
            <h1 class="mb-4 text-[22px] font-bold leading-tight tracking-tight text-dark sm:text-[28px] md:text-[32px]">
              Merchandise catalog
            </h1>
            <p class="text-base leading-relaxed text-dark/80 sm:text-lg">
              Official Code Camp and community gear — clean fits, same energy as the cohort.
              Add items to your cart, then complete checkout: shipping and billing, payment method, secure encryption via the gateway, bank authorization, and order confirmation.
            </p>
          </div>
          <NuxtLink
            to="/cart"
            class="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-accent-purple/35 bg-white px-4 py-2.5 text-sm font-semibold text-accent-purple no-underline shadow-sm transition-colors hover:bg-violet-border sm:px-5"
          >
            <i class="fas fa-shopping-bag" aria-hidden="true" />
            Cart
            <span
              v-if="cartCountDisplay > 0"
              class="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-[#2E1368] px-1.5 text-xs font-bold text-white tabular-nums"
            >{{ cartCountDisplay }}</span>
          </NuxtLink>
        </div>
      </SectionWireShield>
    </header>

    <div
      class="mb-12 rounded-2xl border border-accent-purple/25 bg-neutral-gray p-5 sm:p-6"
      role="note"
    >
      <p class="text-sm font-semibold text-accent-purple sm:text-base">
        Note
      </p>
      <p class="mt-2 text-sm leading-relaxed text-dark/80 sm:text-[0.9375rem]">
        Requesting an item does not guarantee stock. Some pieces are produced in limited runs and fulfilled
        <span class="font-medium text-dark">first come, first served</span>
        while supplies last. We’ll confirm by email or your preferred channel after you inquire.
      </p>
    </div>

    <div
      v-if="catalogItems.length > 0"
      class="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12"
    >
      <article
        v-for="(item, idx) in catalogItems"
        :key="item.id || item.name + idx"
        class="group flex flex-col overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(97,38,177,0.12)]"
      >
        <a
          v-if="item.href"
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
          class="relative block aspect-square overflow-hidden bg-[#e8eaef] no-underline"
        >
          <img
            :src="item.image || defaultImage"
            :alt="item.alt || item.name"
            class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
            @error="onImgError"
          >
        </a>
        <div
          v-else
          class="relative aspect-square overflow-hidden bg-[#e8eaef]"
        >
          <img
            :src="item.image || defaultImage"
            :alt="item.alt || item.name"
            class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
            @error="onImgError"
          >
        </div>
        <div class="flex flex-1 flex-col p-5 sm:p-6">
          <SectionWireShield variant="white">
            <h2 class="text-lg font-semibold leading-snug tracking-tight text-dark sm:text-xl">
              {{ item.name }}
            </h2>
            <p
              v-if="item.subtitle"
              class="mt-2 text-sm leading-relaxed text-dark/70"
            >
              {{ item.subtitle }}
            </p>
            <p class="mt-4 text-lg font-semibold tabular-nums text-secondary sm:text-xl">
              {{ item.priceLabel }}
            </p>
          </SectionWireShield>
          <div class="mt-5 grid w-full grid-cols-2 gap-2.5">
            <template v-if="!item.href">
              <button
                type="button"
                class="inline-flex min-h-[2.75rem] w-full min-w-0 items-center justify-center gap-1.5 rounded-full bg-[#2E1368] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#6126B1] sm:gap-2 sm:px-4 sm:py-2.5"
                @click="addToCart(item)"
              >
                <i class="fas fa-cart-plus shrink-0 text-[11px] sm:text-xs" aria-hidden="true" />
                <span class="truncate">Add to cart</span>
              </button>
              <button
                type="button"
                class="inline-flex min-h-[2.75rem] w-full min-w-0 items-center justify-center gap-1.5 rounded-full border border-accent-purple/40 bg-violet-border px-3 py-2 text-sm font-semibold text-accent-purple shadow-sm transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:gap-2 sm:px-4 sm:py-2.5"
                aria-label="Add to cart and open cart to checkout"
                title="Review cart and continue to checkout"
                @click="addToCartAndGoToCart(item)"
              >
                <i class="fas fa-shopping-bag shrink-0 text-[11px] sm:text-xs" aria-hidden="true" />
                <span class="truncate">Checkout</span>
              </button>
            </template>
            <a
              v-else
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="col-span-2 inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-full border border-neutral-border px-4 py-2.5 text-sm font-medium text-dark no-underline hover:border-accent-purple"
            >
              View link
            </a>
          </div>
        </div>
      </article>
    </div>

    <div
      v-else
      class="my-8 rounded-2xl border border-dashed border-violet-200 bg-white p-12 text-center shadow-sm"
    >
      <pre class="font-mono text-[11px] sm:text-xs text-violet-600 whitespace-pre leading-relaxed inline-block text-left mx-auto mb-4 select-none">{{ asciiMsg }}</pre>
      <p class="text-sm font-bold uppercase tracking-wider text-dark">No Merchandise Available Yet</p>
      <p class="mt-1 text-xs text-dark/60">Official community merchandise can be added by Super Admins via the Dashboard.</p>
    </div>

    <div class="mt-14 border-t border-neutral-border pt-10 sm:mt-16">
      <SectionWireShield variant="gray">
        <div class="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p class="max-w-xl text-sm leading-relaxed text-dark/75 sm:text-base">
            Questions about sizes, bulk orders, or custom cohort prints? We’re happy to help.
          </p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              to="/cart"
              class="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent-purple/35 bg-violet-border px-5 py-2.5 text-sm font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:px-6 sm:text-base"
            >
              View cart
              <i class="fas fa-shopping-bag text-xs" aria-hidden="true" />
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="inline-flex shrink-0 items-center gap-2 rounded-full border border-neutral-border bg-white px-5 py-2.5 text-sm font-medium text-dark/85 no-underline transition-colors hover:border-accent-purple sm:px-6 sm:text-base"
            >
              Contact us
              <i class="fas fa-arrow-right text-xs" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>
      </SectionWireShield>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MaybeRef } from 'vue'
import type { MerchItem } from '../../composables/useMerchCatalog'
import { getRandomAsciiMessage } from '~/constants/asciiMessages'

const asciiMsg = computed(() => getRandomAsciiMessage())

const props = defineProps<{
  items: MaybeRef<MerchItem[]>
  itemCount: MaybeRef<number>
  defaultImage: string
  addToCart: (item: MerchItem) => void
  addToCartAndGoToCart: (item: MerchItem) => void
  onImgError: (e: Event) => void
}>()

const catalogItems = computed(() => toValue(props.items))
const cartCountDisplay = computed(() => toValue(props.itemCount))
</script>
