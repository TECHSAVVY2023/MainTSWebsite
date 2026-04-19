<template>
  <section
    class="relative overflow-hidden border-y border-violet-100/80 bg-gradient-to-b from-slate-50/90 via-white to-violet-50/40 py-14 sm:py-16 md:py-20"
    aria-labelledby="community-strip-heading"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.08),transparent)]"
      aria-hidden="true"
    />

    <div class="container relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
        <p
          id="community-strip-heading"
          class="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-violet-600/90 sm:text-xs"
        >
          Powered by our community
        </p>
      </div>
    </div>

    <div class="relative w-full overflow-x-hidden">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f8fafc] to-transparent sm:w-24 md:w-32"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#faf5ff] to-transparent sm:w-24 md:w-32"
        aria-hidden="true"
      />

      <div
        class="relative z-0 flex min-h-[5.25rem] items-center overflow-visible py-2 sm:min-h-[6rem] sm:py-2.5 md:min-h-[6.75rem] md:py-3"
        role="list"
        aria-label="Community sponsor and partner logos"
      >
        <div
        class="flex items-center whitespace-nowrap"
        :class="reduceMotion ? 'mx-auto flex-wrap justify-center gap-y-3 px-4 whitespace-normal sm:max-w-[72rem]' : 'marquee-track inline-flex w-max'"
        >
          <div
            v-for="set in marqueeRepeatCount"
            :key="`marquee-set-${set}`"
            class="flex items-center"
            :aria-hidden="reduceMotion ? false : set > 1"
          >
            <div
              v-for="(item, i) in marqueeStrip"
              :key="`logo-${set}-${i}-${item.logo}`"
              class="flex shrink-0 pr-5 sm:pr-7 md:pr-8"
              role="listitem"
            >
              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative z-0 block h-[3.25rem] w-[8.5rem] shrink-0 origin-center overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm ring-1 ring-black/[0.03] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] transform-gpu transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-200 motion-reduce:ease-out motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100 hover:z-20 hover:scale-110 hover:border-violet-200 hover:shadow-lg hover:ring-violet-500/15 focus-visible:z-20 focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 sm:h-14 sm:w-40 md:h-16 md:w-44"
                aria-label="Visit partner website"
              >
                <img
                  :src="item.logo"
                  alt=""
                  role="presentation"
                  class="absolute inset-0 h-full w-full object-cover object-center opacity-90 grayscale transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[15ms] motion-reduce:duration-200 motion-reduce:delay-0 group-hover:opacity-100 group-hover:grayscale-0"
                  loading="lazy"
                  decoding="async"
                  @error="onImgError"
                />
              </a>
              <div
                v-else
                class="group relative z-0 block h-[3.25rem] w-[8.5rem] shrink-0 origin-center overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm ring-1 ring-black/[0.03] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] transform-gpu transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-200 motion-reduce:ease-out motion-reduce:hover:scale-100 hover:z-20 hover:scale-110 hover:border-violet-200 hover:shadow-lg hover:ring-violet-500/15 sm:h-14 sm:w-40 md:h-16 md:w-44"
                aria-hidden="true"
              >
                <img
                  :src="item.logo"
                  alt=""
                  role="presentation"
                  class="absolute inset-0 h-full w-full object-cover object-center opacity-90 grayscale transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[15ms] motion-reduce:duration-200 motion-reduce:delay-0 group-hover:opacity-100 group-hover:grayscale-0"
                  loading="lazy"
                  decoding="async"
                  @error="onImgError"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SAMPLE_BRAND_LOGOS } from '~/constants/sampleMedia'

export type CommunityStripOrg = {
  name: string
  logo?: string
  link?: string
}

const props = withDefaults(
  defineProps<{
    sponsors?: CommunityStripOrg[]
    partners?: CommunityStripOrg[]
  }>(),
  {
    sponsors: () => [],
    partners: () => []
  }
)

const { logoUrl } = useAppLogo()

/** One row when user prefers reduced motion (avoid tripling the same strip). */
const reduceMotion = ref(false)
onMounted(() => {
  if (!import.meta.client) return
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const marqueeRepeatCount = computed(() => (reduceMotion.value ? 1 : 3))

/** Readable labels for sample assets (fallback strip). */
const FALLBACK_LABELS: Record<string, string> = {
  codebev: 'CodeBev',
  cloud: 'Cloud & infra',
  diversity: 'Diversity in tech',
  youth: 'Youth programs',
  openSource: 'Open source',
  green: 'Sustainability',
  devrel: 'Developer relations',
  print: 'Print & media',
  venue: 'Venue partner',
  education: 'Education',
  advocacy: 'Advocacy',
  coffee: 'Local coffee',
  campus: 'Campus',
  startup: 'Startups',
  freelance: 'Freelance community'
}

type StripItem = { name: string; logo: string; link?: string }

const fallbackStrip = computed((): StripItem[] => {
  return (Object.entries(SAMPLE_BRAND_LOGOS) as [string, string][]).map(([key, logo]) => ({
    name: FALLBACK_LABELS[key] || key,
    logo,
    link: undefined
  }))
})

/** At least this many tiles per marquee cycle so the loop feels full. */
const MIN_STRIP_LENGTH = 10

function expandStrip (items: StripItem[]): StripItem[] {
  if (items.length === 0) return []
  const out: StripItem[] = [...items]
  let i = 0
  while (out.length < MIN_STRIP_LENGTH) {
    const src = items[i % items.length]
    out.push({ ...src })
    i++
  }
  return out
}

const marqueeStrip = computed(() => {
  const fromProps: StripItem[] = [...(props.sponsors || []), ...(props.partners || [])]
    .filter((r) => r.logo && String(r.logo).trim())
    .map((r) => ({
      name: r.name || 'Partner',
      logo: String(r.logo).trim(),
      link: r.link && r.link !== '#' ? r.link : undefined
    }))

  if (fromProps.length === 0) {
    return expandStrip(fallbackStrip.value)
  }

  /** One tile per sponsor/partner — no duplicate names in a single cycle. */
  return fromProps
})

function onImgError (e: Event) {
  const el = e.target as HTMLImageElement | null
  if (el && logoUrl.value) el.src = logoUrl.value
}
</script>

<style scoped>
.marquee-track {
  animation: community-marquee 55s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes community-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-100% / 3));
  }
}
</style>
