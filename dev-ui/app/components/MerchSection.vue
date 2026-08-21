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
          class="mx-auto grid w-full max-w-[72rem] grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6 items-stretch"
        >
          <article
            v-for="(item, idx) in displayItems"
            :key="item.id || item.name + idx"
            class="group flex h-full min-h-0 w-full flex-col text-center"
          >
            <a
              v-if="item.href"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="relative mx-auto block aspect-square w-full max-w-none shrink-0 overflow-hidden rounded-xl bg-[#e8eaef] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] no-underline transition-shadow duration-300 group-hover:shadow-[0_10px_32px_rgba(97,38,177,0.1)]"
            >
              <img
                :src="item.image || defaultImage"
                :alt="item.alt || item.name"
                class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
                @error="onImgError"
              >
            </a>
            <div
              v-else
              class="relative mx-auto aspect-square w-full max-w-none shrink-0 overflow-hidden rounded-xl bg-[#e8eaef] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-shadow duration-300 group-hover:shadow-[0_10px_32px_rgba(97,38,177,0.1)]"
            >
              <img
                :src="item.image || defaultImage"
                :alt="item.alt || item.name"
                class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
                @error="onImgError"
              >
            </div>
            <div class="mt-3 flex min-h-0 flex-1 flex-col justify-between px-0.5">
              <SectionWireShield variant="white" :wide="false">
                <h3 class="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug tracking-tight text-dark sm:min-h-[2.75rem] sm:text-[0.9375rem]">
                  {{ item.name }}
                </h3>
                <p class="mt-1 text-sm font-semibold tabular-nums text-secondary sm:text-[0.95rem]">
                  {{ item.priceLabel }}
                </p>
                <p
                  v-if="item.subtitle"
                  class="mx-auto mt-1.5 line-clamp-2 min-h-[2.25rem] max-w-none text-[11px] leading-relaxed text-dark/80 sm:text-xs sm:leading-snug"
                >
                  {{ item.subtitle }}
                </p>
              </SectionWireShield>
            </div>
            <div class="mt-3 grid w-full shrink-0 grid-cols-2 gap-2">
              <template v-if="!item.href">
                <button
                  type="button"
                  class="inline-flex min-h-[2.5rem] w-full min-w-0 items-center justify-center gap-1 rounded-full bg-[#2E1368] px-2 py-2 text-[11px] font-semibold leading-tight text-white shadow-sm transition-colors hover:bg-[#6126B1] sm:gap-1.5 sm:px-3 sm:text-xs"
                  @click="addToCart(item)"
                >
                  <i class="fas fa-cart-plus shrink-0 text-[9px] sm:text-[10px]" aria-hidden="true" />
                  <span class="truncate text-center">Add to cart</span>
                </button>
                <button
                  type="button"
                  class="inline-flex min-h-[2.5rem] w-full min-w-0 items-center justify-center gap-1 rounded-full border border-accent-purple/40 bg-violet-border px-2 py-2 text-[11px] font-semibold leading-tight text-accent-purple shadow-sm transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:gap-1.5 sm:px-3 sm:text-xs"
                  aria-label="Add to cart and open cart to checkout"
                  title="Review cart and continue to checkout"
                  @click="addToCartAndGoToCart(item)"
                >
                  <i class="fas fa-shopping-bag shrink-0 text-[9px] sm:text-[10px]" aria-hidden="true" />
                  <span class="truncate text-center">Checkout</span>
                </button>
              </template>
              <a
                v-else
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="col-span-2 inline-flex min-h-[2.5rem] w-full items-center justify-center rounded-full border border-neutral-border px-3 py-2 text-xs font-medium text-dark no-underline transition-colors hover:border-accent-purple"
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
