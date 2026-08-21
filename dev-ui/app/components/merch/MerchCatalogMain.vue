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
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <article
        v-for="(item, idx) in catalogItems"
        :key="item.id || item.name + idx"
        class="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-violet-100/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-900/5"
      >
        <div>
          <!-- ── Product Image Container with Shopee-Style Badges ── -->
          <div class="relative aspect-square w-full overflow-hidden rounded-xl bg-[#f5f6f9]">
            <img
              :src="item.image || defaultImage"
              :alt="item.alt || item.name"
              class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              :class="{ 'blur-[2.5px] opacity-70 grayscale-[40%]': item.stock !== undefined && item.stock <= 0 }"
              loading="lazy"
              decoding="async"
              @error="onImgError"
            />

            <!-- Top Right Shopee-Style Discount Tag -->
            <div
              v-if="item.discountPercentage && item.discountPercentage > 0"
              class="absolute right-0 top-0 z-10 rounded-bl-xl bg-gradient-to-r from-amber-500 via-rose-500 to-[#EE4D2D] px-3 py-1 text-xs font-black uppercase tracking-tight text-white shadow-md"
            >
              -{{ item.discountPercentage }}%
            </div>

            <!-- Bottom Image Banner Strip -->
            <div class="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#2E1368]/95 to-violet-900/90 px-2.5 py-1 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
              <span class="truncate">{{ item.badgeLabel || 'TechSavvy Official' }}</span>
              <i class="fas fa-certificate text-[9px] text-amber-300 ml-1" />
            </div>

            <!-- Sold Out Center Blur Overlay -->
            <div
              v-if="item.stock !== undefined && item.stock <= 0"
              class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/45 p-3 backdrop-blur-[2px]"
            >
              <span class="rounded-xl border border-white/40 bg-black/85 px-4 py-2 text-center text-sm font-black uppercase tracking-widest text-white shadow-xl">
                SOLD OUT
              </span>
            </div>
          </div>

          <!-- ── Product Info ── -->
          <div class="mt-3.5 space-y-2 text-left">
            <!-- Title with Preferred / Tag Badge -->
            <h2 class="line-clamp-2 min-h-[2.75rem] text-sm font-bold leading-snug text-[#1a0533] sm:text-[15px]">
              <span
                class="mr-1.5 inline-flex items-center rounded bg-[#EE4D2D] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white"
              >
                {{ item.badgeLabel || 'Preferred' }}
              </span>
              {{ item.name }}
            </h2>

            <!-- Subtitle / Spec Note if any -->
            <p v-if="item.subtitle" class="line-clamp-2 text-xs leading-relaxed text-slate-500">
              {{ item.subtitle }}
            </p>

            <!-- Price Row with Strikethrough & Stock -->
            <div class="pt-1.5 flex items-baseline justify-between gap-1 flex-wrap">
              <div class="flex items-baseline gap-2">
                <span class="text-base font-black text-[#EE4D2D] sm:text-lg">
                  ₱{{ Math.round(item.unitAmountPhp).toLocaleString() }}
                </span>
                <span
                  v-if="item.originalPricePhp && item.originalPricePhp > item.unitAmountPhp"
                  class="text-xs text-slate-400 line-through font-medium"
                >
                  ₱{{ Math.round(item.originalPricePhp).toLocaleString() }}
                </span>
              </div>

              <!-- Stock Count Display -->
              <div
                class="text-xs font-bold"
                :class="item.stock !== undefined && item.stock <= 0 ? 'text-red-500' : item.stock !== undefined && item.stock < 10 ? 'text-amber-600' : 'text-slate-500'"
              >
                <span v-if="item.stock !== undefined && item.stock <= 0">Out of Stock</span>
                <span v-else-if="item.stock !== undefined && item.stock < 10">{{ item.stock }} left</span>
                <span v-else>{{ item.stock ?? 100 }} in stock</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Retained Action Buttons ── -->
        <div class="mt-4 grid w-full shrink-0 grid-cols-2 gap-2.5 pt-3 border-t border-violet-50">
          <template v-if="!item.href">
            <button
              type="button"
              :disabled="item.stock !== undefined && item.stock <= 0"
              class="inline-flex min-h-[2.5rem] w-full min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[#2E1368] px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#6126B1] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 sm:text-sm"
              @click="addToCart(item)"
            >
              <i class="fas fa-cart-plus shrink-0 text-xs" aria-hidden="true" />
              <span class="truncate">{{ item.stock !== undefined && item.stock <= 0 ? 'Sold Out' : 'Add to cart' }}</span>
            </button>
            <button
              type="button"
              :disabled="item.stock !== undefined && item.stock <= 0"
              class="inline-flex min-h-[2.5rem] w-full min-w-0 items-center justify-center gap-1.5 rounded-xl border border-accent-purple/40 bg-violet-50 px-3 py-2 text-xs font-bold text-accent-purple shadow-sm transition-all hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 sm:text-sm"
              aria-label="Add to cart and open cart to checkout"
              @click="addToCartAndGoToCart(item)"
            >
              <i class="fas fa-shopping-bag shrink-0 text-xs" aria-hidden="true" />
              <span class="truncate">Checkout</span>
            </button>
          </template>
          <a
            v-else
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="col-span-2 inline-flex min-h-[2.5rem] w-full items-center justify-center rounded-xl border border-neutral-border px-4 py-2 text-sm font-bold text-dark no-underline hover:border-accent-purple"
          >
            View link
          </a>
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
