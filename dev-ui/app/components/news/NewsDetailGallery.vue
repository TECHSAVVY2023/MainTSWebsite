<template>
  <div class="rounded-2xl border border-white/20 overflow-hidden bg-[rgba(35,21,89,0.95)] shadow-xl">
    <!-- Single image: hero layout -->
    <template v-if="imagesArray.length === 1">
      <div
        class="relative overflow-hidden min-h-[280px] lg:min-h-[320px] cursor-pointer aspect-video"
        role="button"
        tabindex="0"
        @click="$emit('open-lightbox', 0)"
        @keydown.enter="$emit('open-lightbox', 0)"
        @keydown.space.prevent="$emit('open-lightbox', 0)"
      >
        <img
          :src="imagesArray[0]"
          :alt="`${props.title} – image 1`"
          class="w-full h-full min-h-[280px] object-cover block"
          loading="eager"
          @error="onImageError"
        />
      </div>
    </template>

    <!-- Multiple images: carousel with thumbnails and pagination -->
    <template v-else-if="imagesArray.length > 1">
      <div class="relative">
        <!-- Main image -->
        <div
          class="relative overflow-hidden min-h-[280px] lg:min-h-[320px] cursor-pointer aspect-video"
          role="button"
          tabindex="0"
          @click="$emit('open-lightbox', safeCurrentIndex)"
          @keydown.enter="$emit('open-lightbox', safeCurrentIndex)"
          @keydown.space.prevent="$emit('open-lightbox', safeCurrentIndex)"
        >
          <img
            :src="imagesArray[safeCurrentIndex]"
            :alt="`${props.title} – image ${safeCurrentIndex + 1}`"
            class="w-full h-full min-h-[280px] object-cover block transition-opacity duration-300"
            loading="eager"
            @error="onImageError"
          />
          <!-- Prev/Next arrows -->
          <button
            type="button"
            class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all z-10"
            aria-label="Previous image"
            @click.stop="goPrev"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all z-10"
            aria-label="Next image"
            @click.stop="goNext"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <!-- Pagination badge -->
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-medium">
            {{ safePageLabel }}
          </div>
        </div>

        <!-- Thumbnail strip -->
        <div class="flex gap-2 p-2 overflow-x-auto bg-black/20">
          <button
            v-for="(img, idx) in imagesArray"
            :key="idx"
            type="button"
            class="flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all"
            :class="idx === safeCurrentIndex ? 'border-yellow-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-90'"
            @click="currentIndex = idx"
          >
            <img
              :src="img"
              :alt="`Thumbnail ${idx + 1}`"
              class="w-full h-full object-cover block"
              loading="lazy"
              @error="onImageError"
            />
          </button>
        </div>
      </div>
    </template>

    <!-- Empty or loading: single fallback -->
    <template v-else>
      <div
        class="relative overflow-hidden min-h-[280px] lg:min-h-[320px] aspect-video flex items-center justify-center bg-black/20"
        role="img"
        aria-label="Image loading"
      >
        <img
          :src="(imagesArray[0] || fallbackImage)"
          :alt="`${props.title} – image 1`"
          class="w-full h-full min-h-[280px] object-cover block"
          loading="eager"
          @error="onImageError"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    images?: string[] | { value?: string[] }
    title?: string
  }>(),
  { images: () => [], title: '' }
)

const imagesArray = computed(() => {
  const v = props.images
  if (Array.isArray(v)) return v
  if (v && typeof v === 'object' && 'value' in v) return Array.isArray((v as { value?: unknown }).value) ? (v as { value: string[] }).value : []
  return []
})

defineEmits<{
  'open-lightbox': [idx: number]
}>()

const onImageError = useImageFallback(DEFAULT_NEWS_IMAGE)

const currentIndex = ref(0)

const safeCurrentIndex = computed(() => {
  const idx = Number(currentIndex.value)
  const len = imagesArray.value.length
  if (!Number.isFinite(idx) || idx < 0 || len === 0) return 0
  return Math.min(idx, len - 1)
})

const safePageLabel = computed(() => {
  const len = imagesArray.value.length
  const cur = safeCurrentIndex.value + 1
  return `${cur} / ${len}`
})

watch(imagesArray, () => {
  currentIndex.value = 0
}, { immediate: true })

function goPrev () {
  const len = imagesArray.value.length
  if (len === 0) return
  const idx = Number(currentIndex.value)
  currentIndex.value = Number.isFinite(idx) ? (idx - 1 + len) % len : 0
}

function goNext () {
  const len = imagesArray.value.length
  if (len === 0) return
  const idx = Number(currentIndex.value)
  currentIndex.value = Number.isFinite(idx) ? (idx + 1) % len : 0
}
</script>
