<template>
  <section
    id="merch"
    class="scroll-mt-20 relative overflow-hidden border-y border-neutral-border bg-white pb-16 pt-16 shadow-[inset_0_1px_0_rgba(255,255,255,1)] md:pb-24 md:pt-24"
  >
    <SectionWires gradient-id-prefix="swg-merch" />
    <div class="relative z-10 isolate">
      <div class="container mx-auto px-8 sm:px-12 lg:px-20">
        <div class="mb-12 flex flex-col items-start justify-between gap-4 sm:mb-14 md:mb-16 md:flex-row md:items-end">
          <div class="max-w-[42rem]">
            <h2 class="mb-1 text-[22px] font-bold leading-tight tracking-tight text-dark sm:text-[26px] md:text-[30px]">
              Merch
            </h2>
            <p class="text-sm leading-relaxed text-dark/60 sm:text-base">
              Official Code Camp and community gear — clean fits, same energy as the cohort.
            </p>
          </div>
          <NuxtLink
            to="/contact"
            class="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent-purple/25 bg-violet-border px-4 py-2.5 text-sm font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:px-5 sm:text-base"
          >
            Inquire to order
            <i class="fas fa-arrow-right text-xs" aria-hidden="true" />
          </NuxtLink>
        </div>

        <div class="mx-auto grid w-full max-w-[72rem] grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-12 lg:gap-14">
          <component
            :is="item.href ? 'a' : 'div'"
            v-for="(item, idx) in displayItems"
            :key="item.name + idx"
            class="group block text-center"
            :class="item.href ? 'no-underline' : ''"
            v-bind="item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {}"
          >
            <div
              class="relative aspect-square overflow-hidden rounded-2xl bg-[#e8eaef] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-shadow duration-300 group-hover:shadow-[0_12px_40px_rgba(97,38,177,0.12)]"
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
            <h3 class="mt-5 text-base font-semibold tracking-tight text-dark sm:text-[1.05rem]">
              {{ item.name }}
            </h3>
            <p class="mt-1.5 text-base font-semibold tabular-nums text-secondary sm:text-[1.0625rem]">
              {{ item.priceLabel }}
            </p>
            <p
              v-if="item.subtitle"
              class="mx-auto mt-2 max-w-[16rem] text-[13px] leading-relaxed text-dark/80 sm:text-sm sm:leading-snug"
            >
              {{ item.subtitle }}
            </p>
          </component>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export type MerchItem = {
  name: string
  priceLabel: string
  subtitle?: string
  image?: string
  alt?: string
  /** Optional external product or form link */
  href?: string
}

const DEFAULT_MERCH: MerchItem[] = [
  {
    name: 'Season 4 community tee',
    priceLabel: 'From ₱549',
    subtitle: 'Think smart. Code smart. Official Code Camp Season 4 print.',
    image: '/assets/no-image.png',
    alt: 'Code Camp Season 4 community t-shirt'
  },
  {
    name: 'Tech Savvy hoodie',
    priceLabel: 'From ₱1,090',
    subtitle: 'Mid-weight fleece, embroidered mark — for meetups and late builds.',
    image: '/assets/no-image.png',
    alt: 'Tech Savvy hoodie'
  },
  {
    name: 'Sticker & pin set',
    priceLabel: 'From ₱180',
    subtitle: 'Vinyl stickers and enamel pin — bundle for laptops and lanyards.',
    image: '/assets/no-image.png',
    alt: 'Tech Savvy stickers and pin set'
  }
]

const props = withDefaults(
  defineProps<{
    items?: MerchItem[]
    defaultImage?: string
  }>(),
  {
    items: () => [],
    defaultImage: '/assets/no-image.png'
  }
)

const displayItems = computed(() =>
  props.items && props.items.length > 0 ? props.items : DEFAULT_MERCH
)

function onImgError (e: Event) {
  const img = e.target as HTMLImageElement
  if (img && props.defaultImage) img.src = props.defaultImage
}
</script>
