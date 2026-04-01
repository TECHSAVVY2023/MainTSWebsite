<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to cart" back-href="/cart" />
    <main class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-gray pb-20 pt-8 sm:pb-24 sm:pt-12">
      <SectionWires gradient-id-prefix="swg-checkout" />
      <div class="relative z-10 isolate flex flex-1 flex-col">
        <CheckoutFlowMain
          v-model:phase="phaseModel"
          v-model:same-billing="sameBillingModel"
          :cancelled-notice="co.cancelledNotice"
          :email-mismatch-hint="co.emailMismatchHint"
          :shipping="co.shipping"
          :billing="co.billing"
          :can-continue-details="co.canContinueDetails"
          :lines="co.lines"
          :subtotal-php="co.subtotalPhp"
          :format-php="co.formatPhp"
          :payment-error="co.paymentError"
          :submitting="co.submitting"
          :start-pay-mongo-checkout="co.startPayMongoCheckout"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const co = useCheckoutPage()

const phaseModel = computed({
  get: () => co.phase.value,
  set: (v: 2 | 3) => {
    co.phase.value = v
  }
})

const sameBillingModel = computed({
  get: () => co.sameBilling.value,
  set: (v: boolean) => {
    co.sameBilling.value = v
  }
})
</script>
