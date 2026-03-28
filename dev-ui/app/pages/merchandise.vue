<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to Merch" back-href="/#merch" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-8 sm:pb-24 sm:pt-12 md:pb-32 md:pt-16">
      <SectionWires gradient-id-prefix="swg-merchandise" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
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
                    v-if="itemCount > 0"
                    class="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-[#2E1368] px-1.5 text-xs font-bold text-white tabular-nums"
                  >{{ itemCount }}</span>
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

          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
            <article
              v-for="(item, idx) in items"
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
                <div class="mt-5 flex flex-wrap gap-2">
                  <button
                    v-if="!item.href"
                    type="button"
                    class="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2E1368] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6126B1] sm:flex-none"
                    @click="addToCart(item)"
                  >
                    <i class="fas fa-cart-plus text-xs" aria-hidden="true" />
                    Add to cart
                  </button>
                  <a
                    v-else
                    :href="item.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex flex-1 items-center justify-center rounded-full border border-neutral-border px-4 py-2.5 text-sm font-medium text-dark no-underline hover:border-accent-purple"
                  >
                    View link
                  </a>
                </div>
              </div>
            </article>
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
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { MerchItem } from '~/composables/useMerchCatalog'
import { DEFAULT_MEDIA_FALLBACK } from '~/constants/sampleMedia'

const { items } = useMerchCatalog()
const { addItem, itemCount } = useCart()
const defaultImage = DEFAULT_MEDIA_FALLBACK

function addToCart (item: MerchItem) {
  if (item.href) return
  addItem({
    id: item.id,
    name: item.name,
    priceLabel: item.priceLabel,
    unitAmountPhp: item.unitAmountPhp,
    image: item.image
  })
}

useHead({
  title: 'Merchandise catalog',
  meta: [
    {
      name: 'description',
      content: 'Browse official Code Camp and Tech Savvy community merchandise — tees, hoodies, and more. Contact us to inquire and order.'
    }
  ]
})

function onImgError (e: Event) {
  const img = e.target as HTMLImageElement
  if (img) img.src = defaultImage
}
</script>
