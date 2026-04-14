<template>
  <article
    class="aspect-[4/5] w-full min-h-0 self-start cursor-pointer [perspective:1200px] transition-[transform,filter] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-purple sm:aspect-auto sm:h-full sm:min-h-[288px] sm:self-stretch"
    tabindex="0"
    :aria-expanded="flipped"
    :aria-label="ariaLabel"
    @click="onCardClick"
    @keydown="onCardKeydown"
  >
    <div
      class="relative h-full min-h-0 rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.34,0.72,0.35,1)] [transform-style:preserve-3d] sm:min-h-[288px]"
      :class="flipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'"
    >
      <!-- Front: dark logo panel + light name bar (matches sponsor card mock) -->
      <div
        class="absolute inset-0 flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#1a1040]/40 shadow-[0_8px_32px_rgba(26,16,64,0.18)] [backface-visibility:hidden] [transform:rotateY(0deg)] sm:min-h-[288px]"
      >
        <div
          class="relative min-h-0 flex-1 overflow-hidden bg-gradient-to-b"
          :class="logoPanelClass"
        >
          <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_25%,var(--sponsor-logo-glow),transparent_70%)]"
            :style="{ '--sponsor-logo-glow': kind === 'partner' ? 'rgba(45,212,191,0.14)' : 'rgba(139,92,246,0.2)' }"
            aria-hidden="true"
          />
          <div
            class="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-black/25 to-transparent"
            aria-hidden="true"
          />

          <!-- Fills the entire top panel edge-to-edge (object-cover may crop sides or top/bottom) -->
          <img
            :src="logoSrc"
            :alt="`${sponsor.name} logo`"
            class="absolute inset-0 z-[1] h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
            @error="onLogoError"
          >
        </div>

        <div
          class="relative z-[1] flex shrink-0 flex-col items-center justify-center bg-[#eceff4] px-2 py-2 sm:min-h-[4.5rem] sm:px-4 sm:py-3.5"
        >
          <p
            class="line-clamp-2 text-center text-[11px] font-bold leading-snug tracking-tight text-[#1a1a1d] sm:text-sm"
          >
            {{ sponsor.name }}
          </p>
        </div>
      </div>

      <!-- Back -->
      <div
        class="absolute inset-0 flex flex-col gap-2 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br p-3 text-sm shadow-[0_16px_48px_rgba(26,10,60,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:gap-3 sm:p-5"
        :class="backShellClass"
      >
        <div class="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/[0.06] blur-3xl" aria-hidden="true" />
        <div class="pointer-events-none absolute -bottom-24 -left-12 h-40 w-40 rounded-full bg-accent-light/[0.12] blur-3xl" aria-hidden="true" />

        <div class="relative z-[1] flex items-start justify-between gap-2">
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[13px] font-bold tracking-tight text-white shadow-inner shadow-black/20"
            aria-hidden="true"
          >
            {{ initials }}
          </div>
          <span
            v-if="tierLabel"
            class="max-w-[58%] truncate rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-center text-[9px] font-semibold uppercase leading-tight tracking-wider text-[#e9d5ff] sm:text-[10px]"
          >
            {{ tierLabel }}
          </span>
        </div>

        <div class="relative z-[1] min-h-0 flex-1 space-y-2">
          <p class="text-[15px] font-semibold leading-snug tracking-tight text-white">
            {{ sponsor.name }}
          </p>
          <div
            class="h-px w-10 bg-gradient-to-r rounded-full"
            :class="kind === 'partner' ? 'from-teal-300/90 to-transparent' : 'from-accent-light to-transparent opacity-80'"
            aria-hidden="true"
          />
          <p class="line-clamp-3 text-[11px] leading-relaxed !text-[#FFFFFF] sm:line-clamp-4 sm:text-xs">
            {{ sponsor.description || 'Supporting our developer community.' }}
          </p>
        </div>

        <div class="relative z-[1] mt-auto flex flex-col gap-2 pt-1">
          <div class="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              class="h-full w-[68%] rounded-full bg-gradient-to-r transition-all duration-500"
              :class="kind === 'partner' ? 'from-teal-400 to-emerald-300' : 'from-accent-light to-accent-purple'"
            />
          </div>
          <!-- Native <a> for static assets / absolute URLs so Vue Router never treats them as app routes -->
          <a
            v-if="visitHref && useFullPageNavigation"
            :href="visitHref"
            :target="isExternalHttp ? '_blank' : undefined"
            :rel="isExternalHttp ? 'noopener noreferrer' : undefined"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 text-xs font-bold text-[#2e1368] no-underline shadow-lg shadow-black/25 transition hover:bg-[#f7f3ff] hover:text-secondary active:scale-[0.98] sm:text-[13px]"
          >
            {{ ctaLabel }}
            <span class="text-base leading-none" aria-hidden="true">↗</span>
          </a>
          <NuxtLink
            v-else-if="visitHref"
            :to="visitHref"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 text-xs font-bold text-[#2e1368] no-underline shadow-lg shadow-black/25 transition hover:bg-[#f7f3ff] hover:text-secondary active:scale-[0.98] sm:text-[13px]"
          >
            {{ ctaLabel }}
            <span class="text-base leading-none" aria-hidden="true">↗</span>
          </NuxtLink>
          <p v-else class="text-center text-[10px] text-white/35">
            Link coming soon
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
export type SponsorFlipItem = {
  name: string
  tier?: string
  description?: string
  link?: string
  logo?: string
}

const props = withDefaults(
  defineProps<{
    sponsor: SponsorFlipItem
    defaultLogo: string
    /** Visual lane: sponsors vs partners (accent + labels). */
    kind?: 'sponsor' | 'partner'
  }>(),
  { kind: 'sponsor' }
)

const flipped = ref(false)

const ariaLabel = computed(() => {
  const n = props.sponsor.name || 'Sponsor'
  return flipped.value
    ? `${n}, showing details. Click to return to logo.`
    : `${n}, logo. Click for details.`
})

function onCardClick (e: MouseEvent) {
  const el = e.target as HTMLElement | null
  if (el?.closest('a[href]')) return
  flipped.value = !flipped.value
}

function onCardKeydown (e: KeyboardEvent) {
  if (e.key !== 'Enter' && e.key !== ' ') return
  const el = e.target as HTMLElement | null
  if (el?.closest('a[href]')) return
  e.preventDefault()
  flipped.value = !flipped.value
}

const logoBroken = ref(false)

watch(
  () => [props.sponsor.logo, props.sponsor.name] as const,
  () => {
    logoBroken.value = false
  }
)

const logoSrc = computed(() => {
  if (logoBroken.value) return props.defaultLogo
  return props.sponsor.logo?.trim() || props.defaultLogo
})

function onLogoError () {
  logoBroken.value = true
}

const initials = computed(() => {
  const n = props.sponsor.name?.trim() || '?'
  const parts = n.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[1]![0]!).toUpperCase()
  }
  return n.slice(0, 2).toUpperCase()
})

const tierLabel = computed(() => props.sponsor.tier?.trim() || '')

const visitHref = computed(() => {
  const u = props.sponsor.link?.trim()
  return u || null
})

/** Opens in new tab */
const isExternalHttp = computed(() => /^https?:\/\//i.test(visitHref.value || ''))

/**
 * Static files and absolute URLs must not go through Vue Router (avoids
 * "No match for /assets/..." when CMS link points at an image path).
 */
const useFullPageNavigation = computed(() => {
  const u = (visitHref.value || '').trim()
  if (!u) return false
  if (/^https?:\/\//i.test(u)) return true
  if (/^(mailto|tel):/i.test(u)) return true
  if (u.startsWith('/assets/')) return true
  if (/\.(png|jpe?g|gif|webp|svg|pdf|ico|woff2?)(\?[^#]*)?(#|$)/i.test(u)) return true
  return false
})

const ctaLabel = computed(() => (props.kind === 'partner' ? 'Visit partner' : 'Visit sponsor'))

/** Dark upper panel: sponsors = indigo/violet; partners = navy → teal undertone */
const logoPanelClass = computed(() =>
  props.kind === 'partner'
    ? 'from-[#0c1929] via-[#134e4a] to-[#164e63]'
    : 'from-[#121028] via-[#1f1348] to-[#2e1368]'
)

const backShellClass = computed(() =>
  props.kind === 'partner'
    ? 'from-[#0f172a] via-[#134e4a] to-[#115e59]'
    : 'from-[#1a0d3e] via-[#2e1368] to-[#4c1d95]'
)
</script>
