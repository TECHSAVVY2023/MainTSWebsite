<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to Merch" back-href="/#merch" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-8 sm:pb-24 sm:pt-12 md:pb-32 md:pt-16">
      <SectionWires gradient-id-prefix="swg-merchandise" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
        <MerchCatalogMain
          :items="merch.items"
          :item-count="merch.itemCount"
          :default-image="merch.defaultImage"
          :add-to-cart="merch.addToCart"
          :add-to-cart-and-go-to-cart="merch.addToCartAndGoToCart"
          :on-img-error="merch.onImgError"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const merch = useMerchandisePage()
</script>
