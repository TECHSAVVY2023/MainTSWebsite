<template>
  <section
    id="news"
    class="scroll-mt-20 min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 relative overflow-hidden bg-neutral-gray"
  >
    <SectionWires gradient-id-prefix="swg-news" />
    <div class="relative z-10 isolate flex-1 flex flex-col">
      <div class="container mx-auto relative flex-1 flex flex-col">
        <div class="mb-8 sm:mb-12">
          <div class="flex flex-col items-start justify-between gap-3 sm:gap-4 md:flex-row md:items-end">
            <SectionWireShield :wide="false">
              <div class="max-w-[42rem]">
                <h2 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-dark mb-1">
                  News & Updates
                </h2>
                <p class="text-sm leading-relaxed text-dark/60 sm:text-base">
                  Latest from the community
                </p>
              </div>
            </SectionWireShield>
            <SectionWireShield :wide="false">
              <NuxtLink
                to="/news"
                class="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent-purple/25 bg-violet-border py-2 px-4 text-sm font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:py-2.5 sm:px-5 sm:text-base"
              >
                View all
                <i class="fas fa-arrow-right text-xs" />
              </NuxtLink>
            </SectionWireShield>
          </div>
        </div>

        <div class="w-full max-w-[72rem] mx-auto">
          <div
            class="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 items-start"
          >
            <NuxtLink
              v-for="(item, i) in safeItems"
              :key="item.id || getNewsSlug(item) || i"
              :to="`/news/${getNewsSlug(item)}`"
              class="group/news flex w-full min-h-0 flex-col self-start overflow-hidden rounded-xl border border-[rgba(177,138,243,0.42)] bg-white text-gray-900 no-underline text-inherit shadow-[0_0_0_1px_rgba(126,87,194,0.16),0_0_22px_rgba(97,38,177,0.11),0_0_44px_rgba(177,138,243,0.06),0_6px_16px_rgba(46,19,104,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-[rgba(177,138,243,0.55)] hover:shadow-[0_0_0_1px_rgba(126,87,194,0.24),0_0_28px_rgba(97,38,177,0.14),0_0_52px_rgba(177,138,243,0.09),0_8px_20px_rgba(46,19,104,0.07)] animate-fade-in"
              :style="{ animationDelay: `${i * 0.1}s` }"
            >
              <div class="relative aspect-video w-full shrink-0 overflow-hidden bg-gray-100">
                <img
                  :src="item.imageUrl || defaultImage"
                  :alt="item.title"
                  class="h-full w-full object-cover transition-transform duration-300 group-hover/news:scale-105"
                  loading="lazy"
                  @error="onImageError($event)"
                />
              </div>
              <div class="flex min-h-0 flex-col gap-1 overflow-hidden p-4 sm:p-5">
                <h3
                  class="order-1 line-clamp-2 min-h-[2.35rem] text-[0.8rem] font-bold uppercase leading-snug tracking-wide text-gray-900 sm:min-h-[2.65rem]"
                >
                  {{ item.title }}
                </h3>
                <p class="order-2 line-clamp-1 min-h-[1rem] text-xs uppercase tracking-widest text-gray-400 transition-opacity duration-300 group-hover/news:opacity-70">
                  {{ formatDate(item.date) }} · TECH SAVVY
                </p>
                <div class="order-3 relative overflow-hidden max-h-0 opacity-0 transition-all duration-300 group-hover/news:mb-1 group-hover/news:max-h-[5.5rem] group-hover/news:opacity-100">
                  <p class="m-0 whitespace-pre-line text-[0.8125rem] leading-relaxed text-gray-600 line-clamp-3">
                    {{ (item as { description?: string }).description || item.summary }}
                  </p>
                </div>
                <span
                  class="order-4 mt-auto inline-block text-xs font-bold uppercase tracking-widest text-gray-900 transition-colors duration-200 group-hover/news:text-[#c9a227]"
                >
                  READ MORE
                </span>
              </div>
            </NuxtLink>
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
