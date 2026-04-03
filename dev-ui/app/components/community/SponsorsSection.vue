<template>
  <div class="w-full max-w-[72rem] mx-auto space-y-10 sm:space-y-12">
    <section v-if="sponsors.length > 0" aria-labelledby="sponsors-grid-heading">
      <div class="mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-5">
        <div class="min-w-0 flex-1 pr-2">
          <SectionWireShield>
            <div class="mb-1.5 flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-gradient-to-br from-accent-purple to-accent-light shadow-[0_0_10px_rgba(97,38,177,0.45)]" aria-hidden="true" />
              <h3 id="sponsors-grid-heading" class="text-lg font-bold tracking-tight text-dark sm:text-xl">
                Sponsors
              </h3>
            </div>
          </SectionWireShield>
        </div>
        <span class="shrink-0 rounded-full border border-accent-purple/15 bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-purple/80 shadow-sm sm:text-xs">
          {{ sponsors.length }} total
        </span>
      </div>
      <div class="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-4">
        <SponsorFlipCard
          v-for="(sponsor, idx) in sponsors"
          :key="'sp-' + (sponsor.name || idx)"
          kind="sponsor"
          :sponsor="sponsor"
          :default-logo="defaultLogo"
        />
      </div>
    </section>

    <section v-if="partners.length > 0" aria-labelledby="partners-grid-heading">
      <div class="mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-5">
        <div class="min-w-0 flex-1 pr-2">
          <SectionWireShield>
            <div class="mb-1.5 flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 shadow-[0_0_10px_rgba(20,184,166,0.4)]" aria-hidden="true" />
              <h3 id="partners-grid-heading" class="text-lg font-bold tracking-tight text-dark sm:text-xl">
                Partners
              </h3>
            </div>
          </SectionWireShield>
        </div>
        <span class="shrink-0 rounded-full border border-teal-500/20 bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-teal-700/90 shadow-sm sm:text-xs">
          {{ partners.length }} total
        </span>
      </div>
      <div class="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-4">
        <SponsorFlipCard
          v-for="(sponsor, idx) in partners"
          :key="'pt-' + (sponsor.name || idx)"
          kind="partner"
          :sponsor="sponsor"
          :default-logo="defaultLogo"
        />
      </div>
    </section>

    <div
      v-if="sponsors.length === 0 && partners.length === 0"
      class="rounded-2xl border border-neutral-border bg-gradient-to-br from-[#f8f7fb] to-[#eceff4] p-6 text-center text-sm text-dark/65 shadow-inner"
    >
      <p class="font-medium text-dark/75">Sponsors and partners will be announced soon.</p>
      <p class="mt-1 text-xs text-dark/50">Check back as we grow the community.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import SponsorFlipCard, { type SponsorFlipItem } from '~/components/community/SponsorFlipCard.vue'
import { DEFAULT_MEDIA_FALLBACK } from '~/constants/defaultMediaAssets'

withDefaults(
  defineProps<{
    sponsors: SponsorFlipItem[]
    partners: SponsorFlipItem[]
  }>(),
  {
    sponsors: () => [],
    partners: () => []
  }
)

const defaultLogo = DEFAULT_MEDIA_FALLBACK
</script>
