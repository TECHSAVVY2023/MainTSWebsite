<template>
  <article v-if="item" class="group flex flex-col bg-[#f8f7f5] text-gray-900 rounded-lg sm:rounded-xl overflow-hidden shadow-md h-full w-full">
    <div class="w-full aspect-[4/3] overflow-hidden">
      <img
        :src="item?.imageUrl || defaultImage"
        :alt="item?.title"
        class="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        loading="lazy"
        @error="onImageError($event)"
      />
    </div>
    <div class="p-3 sm:p-4 flex flex-col flex-1 min-h-0">
      <p class="text-[0.6875rem] uppercase tracking-widest text-gray-400 mb-1.5">
        {{ formatDate(item?.date) }} · TECH SAVVY
      </p>
      <h2 class="text-sm font-bold tracking-wide uppercase mb-1.5 line-clamp-2">
        {{ item?.title }}
      </h2>
      <div class="relative flex-1 min-h-0 mb-2.5">
        <p class="text-xs leading-relaxed text-gray-600 line-clamp-2 transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
          {{ item?.summary }}
        </p>
        <div class="absolute inset-0 top-0 left-0 right-0 bottom-0 opacity-0 overflow-hidden pointer-events-none transition-opacity duration-300 z-10 group-hover:opacity-100">
          <p class="text-xs leading-relaxed text-gray-600 whitespace-pre-line m-0">{{ item?.description || item?.summary }}</p>
        </div>
      </div>
      <NuxtLink
        v-if="item"
        :to="'/news/' + getNewsSlug(item)"
        class="inline-block text-xs font-bold tracking-[0.12em] uppercase text-gray-900 no-underline mt-auto hover:text-yellow-500 transition-colors"
      >
        READ MORE
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
const { formatDate } = useFormatters()
const { getNewsSlug } = useNewsSlug()

const props = defineProps<{
  item?: { date?: string; title?: string; summary?: string; description?: string; imageUrl?: string } | null
  defaultImage: string
}>()

const { item, defaultImage } = toRefs(props)
const onImageError = useImageFallback(props.defaultImage)
</script>
