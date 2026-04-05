<template>
  <section
    id="news"
    class="scroll-mt-20 min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 relative overflow-hidden bg-neutral-gray"
  >
    <SectionWires gradient-id-prefix="swg-news" />
    <div class="relative z-10 isolate flex-1 flex flex-col">
      <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
        <div class="mb-8 sm:mb-12">
          <SectionWireShield>
            <div class="flex flex-col items-start justify-between gap-3 sm:gap-4 md:flex-row md:items-end">
            <div class="mb-0">
              <h2 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-dark mb-1">
                News & Updates
              </h2>
              <p class="max-w-[42rem] text-sm leading-relaxed text-dark/60 sm:text-base">
                Latest from the community
              </p>
            </div>
            <NuxtLink
              to="/news"
              class="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent-purple/25 bg-violet-border py-2 px-4 text-sm font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:py-2.5 sm:px-5 sm:text-base"
            >
              View all
              <i class="fas fa-arrow-right text-xs" />
            </NuxtLink>
            </div>
          </SectionWireShield>
        </div>

        <div class="w-full max-w-[72rem] mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-start">
            <article
              v-for="(item, i) in safeItems"
              :key="i"
              class="group relative flex flex-col bg-white border text-gray-900 rounded-xl overflow-hidden card-outline-violet-glow h-[380px] max-h-[380px] self-start animate-fade-in"
              :style="{ animationDelay: `${i * 0.1}s` }"
            >
              <!-- Clickable overlay (opens the detail page) -->
              <NuxtLink
                :to="`/news/${getNewsSlug(item)}`"
                class="absolute inset-0 z-0"
                aria-label="Open news detail"
              />

              <div class="w-full h-40 overflow-hidden shrink-0 transition-[height] duration-350 group-hover:h-[7.5rem]">
                <img
                  :src="item.imageUrl || defaultImage"
                  :alt="item.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  @error="onImageError($event)"
                />
              </div>
              <div class="p-5 flex flex-col flex-1 min-h-0 overflow-hidden">
                <p class="text-xs uppercase tracking-widest text-gray-400 mb-1 order-2 max-h-8 overflow-hidden transition-all duration-350 group-hover:opacity-0 group-hover:max-h-0 group-hover:mb-0">
                  {{ formatDate(item.date) }} · TECH SAVVY
                </p>
                <h3 class="text-[0.8rem] font-bold tracking-wide uppercase mb-1 order-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {{ item.title }}
                </h3>
                <div class="order-3 relative max-h-0 overflow-hidden opacity-0 m-0 p-0 transition-all duration-300 group-hover:max-h-[7rem] group-hover:opacity-100 group-hover:mb-2">
                  <p class="text-[0.8125rem] leading-relaxed text-gray-600 m-0 whitespace-pre-line">
                    {{ (item as { description?: string }).description || item.summary }}
                  </p>
                </div>
                <NuxtLink
                  :to="`/news/${getNewsSlug(item)}`"
                  class="relative z-10 inline-block text-xs font-bold tracking-widest uppercase text-gray-900 no-underline order-4 mt-auto transition-colors hover:text-accent-gold"
                >
                  READ MORE
                </NuxtLink>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DEFAULT_NEWS_IMAGE } from '~/constants/sampleMedia'

type NewsItem = {
  date?: string
  title?: string
  summary?: string
  description?: string
  imageUrl?: string
  link?: string
  id?: string
}

const props = withDefaults(
  defineProps<{
    items?: NewsItem[] | unknown
    defaultImage?: string
  }>(),
  { defaultImage: DEFAULT_NEWS_IMAGE }
)

const safeItems = computed(() => {
  const raw = props.items
  if (!Array.isArray(raw)) return []
  return raw.filter((item): item is NewsItem => item != null && typeof item === 'object')
})

const { formatDate } = useFormatters()
const { getNewsSlug } = useNewsSlug()
const onImageError = useImageFallback(props.defaultImage)
</script>
