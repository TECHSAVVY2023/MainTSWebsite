<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to catalog" back-href="/merchandise" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-8 sm:pb-24 sm:pt-12">
      <SectionWires gradient-id-prefix="swg-cart" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
        <CartPageMain
          :lines="cart.lines"
          :subtotal-php="cart.subtotalPhp"
          :default-image="cart.defaultImage"
          :set-quantity="cart.setQuantity"
          :remove-item="cart.removeItem"
          :on-line-img-error="cart.onLineImgError"
          :format-php="cart.formatPhp"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const cart = useCartPage()
</script>
