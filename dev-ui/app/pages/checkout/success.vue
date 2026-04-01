<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to merchandise" back-href="/merchandise" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-8 sm:pb-24 sm:pt-12">
      <SectionWires gradient-id-prefix="swg-checkout-success" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
        <CheckoutSuccessMain
          :order-reference="success.orderReference"
          :payment-status="success.paymentStatus"
          :total-label="success.totalLabel"
          :poll-message="success.pollMessage"
          :check-once="success.checkOnce"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const success = useCheckoutSuccessPage()
</script>
