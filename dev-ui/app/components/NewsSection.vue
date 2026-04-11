<template>
  <section
    id="news"
    class="scroll-mt-20 min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 relative overflow-hidden bg-neutral-gray"
  >
    <SectionWires gradient-id-prefix="swg-news" />
    <div class="relative z-10 isolate flex-1 flex flex-col">
      <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
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
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 items-start"
          >
            <NuxtLink
              v-for="(item, i) in safeItems"
              :key="item.id || getNewsSlug(item) || i"
              :to="`/news/${getNewsSlug(item)}`"
              class="news-landing-card flex w-full min-h-0 flex-col self-start overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 no-underline text-inherit animate-fade-in"
              :style="{ animationDelay: `${i * 0.1}s` }"
            >
              <div class="news-landing-card__media relative aspect-video w-full shrink-0 overflow-hidden bg-gray-100">
                <img
                  :src="item.imageUrl || defaultImage"
                  :alt="item.title"
                  class="news-landing-card__img h-full w-full object-cover"
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
                <p class="news-landing-card__meta order-2 line-clamp-1 min-h-[1rem] text-xs uppercase tracking-widest text-gray-400">
                  {{ formatDate(item.date) }} · TECH SAVVY
                </p>
                <div class="news-landing-card__excerpt order-3 relative overflow-hidden">
                  <p class="m-0 whitespace-pre-line text-[0.8125rem] leading-relaxed text-gray-600 line-clamp-3">
                    {{ (item as { description?: string }).description || item.summary }}
                  </p>
                </div>
                <span
                  class="order-4 mt-auto inline-block text-xs font-bold uppercase tracking-widest text-gray-900 transition-colors news-landing-card__cta"
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

<style scoped>
/**
 * Card hover is driven only by `.news-landing-card:hover` (this element = one card).
 * No Tailwind `group` / `group-hover` — those can match a distant ancestor `.group:hover`.
 */
.news-landing-card {
  border-color: rgba(177, 138, 243, 0.42);
  box-shadow:
    0 0 0 1px rgba(126, 87, 194, 0.16),
    0 0 22px rgba(97, 38, 177, 0.11),
    0 0 44px rgba(177, 138, 243, 0.06),
    0 6px 16px rgba(46, 19, 104, 0.05);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.news-landing-card:hover {
  border-color: rgba(177, 138, 243, 0.55);
  box-shadow:
    0 0 0 1px rgba(126, 87, 194, 0.24),
    0 0 28px rgba(97, 38, 177, 0.14),
    0 0 52px rgba(177, 138, 243, 0.09),
    0 8px 20px rgba(46, 19, 104, 0.07);
}

.news-landing-card__img {
  transform: scale(1);
  transition: transform 0.3s ease;
}

.news-landing-card:hover .news-landing-card__img {
  transform: scale(1.05);
}

.news-landing-card__meta {
  transition: opacity 0.3s ease;
}

.news-landing-card:hover .news-landing-card__meta {
  opacity: 0.7;
}

.news-landing-card__excerpt {
  max-height: 0;
  opacity: 0;
  margin-bottom: 0;
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease,
    margin-bottom 0.3s ease;
}

.news-landing-card:hover .news-landing-card__excerpt {
  max-height: 5.5rem;
  opacity: 1;
  margin-bottom: 0.25rem;
}

.news-landing-card__cta {
  transition: color 0.2s ease;
}

.news-landing-card:hover .news-landing-card__cta {
  color: #c9a227;
}
</style>
