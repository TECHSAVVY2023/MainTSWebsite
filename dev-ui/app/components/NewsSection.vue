<template>
  <section
    id="news"
    class="min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 relative overflow-hidden bg-violet"
  >
    <SectionWires gradient-id-prefix="swg-news" />
    <div class="relative z-10 isolate flex-1 flex flex-col">
      <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div class="mb-0">
            <h2 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-white mb-1">
              News & Updates
            </h2>
            <p class="text-sm sm:text-base text-white/60 max-w-[42rem] leading-relaxed">
              Latest from the community
            </p>
          </div>
          <NuxtLink
            to="/news"
            class="inline-flex items-center gap-2 py-2 px-4 sm:py-2.5 sm:px-5 rounded-full bg-violet-border border border-accent-purple/25 text-accent-purple font-medium text-sm sm:text-base transition-colors hover:bg-violet-light hover:border-accent-purple/40 hover:text-accent-light no-underline shrink-0"
          >
            View all
            <i class="fas fa-arrow-right text-xs" />
          </NuxtLink>
        </div>

        <div class="w-full max-w-[72rem] mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-start">
            <article
              v-for="(item, i) in safeItems"
              :key="i"
              class="group flex flex-col bg-neutral-card text-gray-900 rounded-xl overflow-hidden shadow-none h-[380px] max-h-[380px] self-start animate-fade-in"
              :style="{ animationDelay: `${i * 0.1}s` }"
            >
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
                <a
                  v-if="isExternalLink(item)"
                  :href="(item as { link?: string }).link"
                  target="_blank"
                  rel="noopener"
                  class="inline-block text-xs font-bold tracking-widest uppercase text-gray-900 no-underline order-4 mt-auto transition-colors hover:text-accent-gold"
                >
                  READ MORE
                </a>
                <NuxtLink
                  v-else
                  :to="`/news/${getNewsSlug(item)}`"
                  class="inline-block text-xs font-bold tracking-widest uppercase text-gray-900 no-underline order-4 mt-auto transition-colors hover:text-accent-gold"
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
  { defaultImage: '/assets/no-image.png' }
)

const safeItems = computed(() => {
  const raw = props.items
  if (!Array.isArray(raw)) return []
  return raw.filter((item): item is NewsItem => item != null && typeof item === 'object')
})

const { formatDate } = useFormatters()
const { getNewsSlug } = useNewsSlug()
const onImageError = useImageFallback(props.defaultImage)

function isExternalLink(item: { link?: string }) {
  const href = item?.link?.trim()
  return !!href && (href.startsWith('http://') || href.startsWith('https://'))
}
</script>
