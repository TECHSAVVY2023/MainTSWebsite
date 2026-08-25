<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to Merch" back-href="/#merch" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-24 sm:pb-24 sm:pt-28 md:pb-32 md:pt-32">
      <SectionWires gradient-id-prefix="swg-merchandise" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
        <MerchCatalogMain
          :items="items"
          :item-count="itemCount"
          :default-image="defaultImage"
          :add-to-cart="addToCart"
          :add-to-cart-and-go-to-cart="addToCartAndGoToCart"
          :on-img-error="onImgError"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { MerchItem } from '~/composables/useMerchCatalog'
import { DEFAULT_MEDIA_FALLBACK } from '~/constants/sampleMedia'
import MerchCatalogMain from '~/components/merch/MerchCatalogMain.vue'

const { items } = useMerchCatalog()
const { addItem, itemCount } = useCart()
const defaultImage = DEFAULT_MEDIA_FALLBACK

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
}

/** Adds line then opens cart (same flow as footer “View cart”). */
function addToCartAndGoToCart (item: MerchItem) {
  if (item.href) return
  addItem(merchPayload(item))
  navigateTo('/cart')
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
