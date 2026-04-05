<template>
  <div
    class="absolute inset-0 pointer-events-none opacity-90 z-[1]"
    aria-hidden="true"
  >
    <svg
      class="w-full h-full object-cover"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient :id="`${gradientIdPrefix}-1`" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2E1368" stop-opacity="0.22" />
          <stop offset="50%" stop-color="#2E1368" stop-opacity="0.78" />
          <stop offset="100%" stop-color="#2E1368" stop-opacity="0.22" />
        </linearGradient>
        <linearGradient :id="`${gradientIdPrefix}-2`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#6126B1" stop-opacity="0.2" />
          <stop offset="50%" stop-color="#6126B1" stop-opacity="0.72" />
          <stop offset="100%" stop-color="#6126B1" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <path class="fill-none [stroke-width:0.48] [stroke-opacity:0.18]" d="M0 80 Q100 60 180 100 T360 80" stroke="#2E1368" />
      <path class="fill-none [stroke-width:0.48] [stroke-opacity:0.15]" d="M40 0 L40 120 Q80 180 120 220 T200 260" stroke="#6126B1" />
      <path class="fill-none [stroke-width:0.48] [stroke-opacity:0.18]" d="M320 120 Q280 200 240 280 T160 380" stroke="#2E1368" />
      <path class="fill-none [stroke-width:0.48] [stroke-opacity:0.15]" d="M0 280 Q80 260 160 300 T320 280" stroke="#6126B1" />
      <path class="fill-none [stroke-width:0.48] [stroke-opacity:0.18]" d="M80 400 Q200 360 320 400" stroke="#2E1368" />
      <path class="fill-none [stroke-width:0.48] [stroke-opacity:0.15]" d="M200 0 L200 80 Q240 140 200 200 T160 320" stroke="#6126B1" />
      <path class="[stroke-dasharray:30_60] animate-section-wire-flow" d="M0 80 Q100 60 180 100 T360 80" fill="none" :stroke="`url(#${gradientIdPrefix}-1)`" stroke-width="1.05" stroke-linecap="round" />
      <path class="[stroke-dasharray:30_60] animate-section-wire-flow [animation-delay:-0.7s]" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" :stroke="`url(#${gradientIdPrefix}-2)`" stroke-width="0.9" stroke-linecap="round" />
      <path class="[stroke-dasharray:30_60] animate-section-wire-flow [animation-delay:-1.4s]" d="M320 120 Q280 200 240 280 T160 380" fill="none" :stroke="`url(#${gradientIdPrefix}-1)`" stroke-width="0.8" stroke-linecap="round" />
      <path class="[stroke-dasharray:30_60] animate-section-wire-flow [animation-delay:-2.1s]" d="M0 280 Q80 260 160 300 T320 280" fill="none" :stroke="`url(#${gradientIdPrefix}-2)`" stroke-width="0.9" stroke-linecap="round" />
      <path v-if="variant === 'full'" class="[stroke-dasharray:30_60] animate-section-wire-flow [animation-delay:-2.8s]" d="M80 400 Q200 360 320 400" fill="none" :stroke="`url(#${gradientIdPrefix}-1)`" stroke-width="0.8" stroke-linecap="round" />
      <path v-if="variant === 'full'" class="[stroke-dasharray:30_60] animate-section-wire-flow [animation-delay:-3.5s]" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" :stroke="`url(#${gradientIdPrefix}-2)`" stroke-width="0.8" stroke-linecap="round" />
    </svg>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    gradientIdPrefix?: string
    variant?: 'full' | 'compact'
  }>(),
  { gradientIdPrefix: 'swg', variant: 'full' }
)
</script>
