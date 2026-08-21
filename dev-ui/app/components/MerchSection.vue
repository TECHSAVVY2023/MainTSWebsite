<template>
  <section
    id="merch"
    class="scroll-mt-20 relative overflow-hidden border-y border-neutral-border bg-white pb-12 pt-12 shadow-[inset_0_1px_0_rgba(255,255,255,1)] md:pb-16 md:pt-16"
  >
    <SectionWires gradient-id-prefix="swg-merch" />
    <div class="relative z-10 isolate">
      <div class="container mx-auto px-6 sm:px-10 lg:px-16">
        <div class="mb-8 sm:mb-10 md:mb-12">
          <div class="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <SectionWireShield variant="white" :wide="false">
              <div class="max-w-[36rem]">
                <h2 class="mb-1 text-[19px] font-bold leading-tight tracking-tight text-dark sm:text-[22px] md:text-[26px]">
                  Merch
                </h2>
                <p class="text-xs leading-relaxed text-dark/60 sm:text-sm">
                  Official Code Camp and community gear — clean fits, same energy as the cohort.
                </p>
              </div>
            </SectionWireShield>
            <SectionWireShield variant="white" :wide="false">
              <NuxtLink
                to="/merchandise"
                class="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent-purple/25 bg-violet-border px-3.5 py-2 text-xs font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:px-4 sm:text-sm"
              >
                View more
                <i class="fas fa-arrow-right text-[10px] sm:text-xs" aria-hidden="true" />
              </NuxtLink>
            </SectionWireShield>
          </div>
        </div>

        <div
          v-if="displayItems.length > 0"
          class="mx-auto grid w-full max-w-[72rem] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6 items-stretch"
        >
          <article
            v-for="(item, idx) in displayItems"
            :key="item.id || item.name + idx"
            class="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-violet-100/80 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-900/5"
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

                <!-- Top Right Discount Tag (Shopee Style) -->
                <div
                  v-if="item.discountPercentage && item.discountPercentage > 0"
                  class="absolute right-0 top-0 z-10 rounded-bl-xl bg-gradient-to-r from-amber-500 via-rose-500 to-[#EE4D2D] px-2.5 py-1 text-[11px] font-black uppercase tracking-tight text-white shadow-md"
                >
                  -{{ item.discountPercentage }}%
                </div>

                <!-- Bottom Image Banner Strip -->
                <div class="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#2E1368]/95 to-violet-900/90 px-2 py-0.5 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-wider text-amber-300">
                  <span class="truncate">{{ item.badgeLabel || 'Official' }}</span>
                  <i class="fas fa-certificate text-[8px] text-amber-300 ml-1" />
                </div>

                <!-- Sold Out Center Blur Overlay -->
                <div
                  v-if="item.stock !== undefined && item.stock <= 0"
                  class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/45 p-2 backdrop-blur-[2px]"
                >
                  <span class="rounded-xl border border-white/40 bg-black/85 px-3 py-1.5 text-center text-xs font-black uppercase tracking-widest text-white shadow-xl">
                    SOLD OUT
                  </span>
                </div>
              </div>

              <!-- ── Product Info ── -->
              <div class="mt-2.5 space-y-1.5 text-left">
                <!-- Title with Preferred / Tag Badge -->
                <h3 class="line-clamp-2 min-h-[2.5rem] text-xs font-bold leading-snug text-[#1a0533] sm:text-[13px]">
                  <span
                    class="mr-1 inline-flex items-center rounded bg-[#EE4D2D] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white"
                  >
                    {{ item.badgeLabel || 'Preferred' }}
                  </span>
                  {{ item.name }}
                </h3>

                <!-- Subtitle / Spec Note if any -->
                <p v-if="item.subtitle" class="line-clamp-1 text-[11px] text-slate-500">
                  {{ item.subtitle }}
                </p>

                <!-- Price Row with Strikethrough & Stock -->
                <div class="pt-1 flex items-baseline justify-between gap-1 flex-wrap">
                  <div class="flex items-baseline gap-1.5">
                    <span class="text-sm font-black text-[#EE4D2D] sm:text-base">
                      ₱{{ Math.round(item.unitAmountPhp).toLocaleString() }}
                    </span>
                    <span
                      v-if="item.originalPricePhp && item.originalPricePhp > item.unitAmountPhp"
                      class="text-[10px] text-slate-400 line-through font-medium"
                    >
                      ₱{{ Math.round(item.originalPricePhp).toLocaleString() }}
                    </span>
                  </div>

                  <!-- Stock Count Display -->
                  <div
                    class="text-[10px] font-bold"
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
            <div class="mt-3 grid w-full shrink-0 grid-cols-2 gap-2 pt-2 border-t border-violet-50">
              <template v-if="!item.href">
                <button
                  type="button"
                  :disabled="item.stock !== undefined && item.stock <= 0"
                  class="inline-flex min-h-[2.35rem] w-full min-w-0 items-center justify-center gap-1 rounded-xl bg-[#2E1368] px-2 py-1.5 text-[11px] font-bold leading-tight text-white shadow-sm transition-all hover:bg-[#6126B1] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                  @click="addToCart(item)"
                >
                  <i class="fas fa-cart-plus shrink-0 text-[10px]" aria-hidden="true" />
                  <span class="truncate">{{ item.stock !== undefined && item.stock <= 0 ? 'Sold Out' : 'Add to cart' }}</span>
                </button>
                <button
                  type="button"
                  :disabled="item.stock !== undefined && item.stock <= 0"
                  class="inline-flex min-h-[2.35rem] w-full min-w-0 items-center justify-center gap-1 rounded-xl border border-accent-purple/40 bg-violet-50 px-2 py-1.5 text-[11px] font-bold leading-tight text-accent-purple shadow-sm transition-all hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                  aria-label="Add to cart and open cart to checkout"
                  @click="addToCartAndGoToCart(item)"
                >
                  <i class="fas fa-shopping-bag shrink-0 text-[10px]" aria-hidden="true" />
                  <span class="truncate">Checkout</span>
                </button>
              </template>
              <a
                v-else
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="col-span-2 inline-flex min-h-[2.35rem] w-full items-center justify-center rounded-xl border border-neutral-border px-3 py-1.5 text-xs font-bold text-dark no-underline transition-colors hover:border-accent-purple"
              >
                View link
              </a>
            </div>
          </article>
        </div>

        <div
          v-else
          class="mx-auto max-w-[72rem] rounded-2xl border border-dashed border-violet-200 bg-white/90 p-8 text-center shadow-sm"
        >
          <pre class="font-mono text-[11px] sm:text-xs text-violet-600 whitespace-pre leading-relaxed inline-block text-left mx-auto mb-3 select-none">{{ asciiMsg }}</pre>
          <p class="text-xs font-bold uppercase tracking-wider text-dark">No Merchandise Available Yet</p>
          <p class="mt-1 text-[11px] text-dark/60">Community merchandise can be added by Super Admins via the Dashboard.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MerchItem } from '~/composables/useMerchCatalog'
import { DEFAULT_MEDIA_FALLBACK } from '~/constants/sampleMedia'
import { getRandomAsciiMessage } from '~/constants/asciiMessages'

const asciiMsg = computed(() => getRandomAsciiMessage())

const props = withDefaults(
  defineProps<{
    items?: MerchItem[]
    defaultImage?: string
  }>(),
  {
    items: () => [],
    defaultImage: DEFAULT_MEDIA_FALLBACK
  }
)

const { items: catalogDefaults } = useMerchCatalog()
const { addItem } = useCart()

const displayItems = computed(() =>
  props.items && props.items.length > 0 ? props.items : catalogDefaults.value
)

function merchPayload (item: MerchItem) {
  return {
    id: item.id,
    name: item.name,
    priceLabel: item.priceLabel,
    unitAmountPhp: item.unitAmountPhp,
    image: item.image
  }
}

function addToCart (item: MerchItem) {
  if (item.href) return
  addItem(merchPayload(item))
  navigateTo('/merchandise')
}

function addToCartAndGoToCart (item: MerchItem) {
  if (item.href) return
  addItem(merchPayload(item))
  navigateTo('/cart')
}

function onImgError (e: Event) {
  const img = e.target as HTMLImageElement
  if (img && props.defaultImage) img.src = props.defaultImage
}
</script>
