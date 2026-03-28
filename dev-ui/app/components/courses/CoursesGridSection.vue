<template>
  <section>
    <div v-if="courses.length === 0" class="text-center py-16 text-dark/60">
      <i class="fas fa-graduation-cap text-4xl mb-4 opacity-50" :aria-hidden="true" />
      <p>No courses match your search. Try a different filter.</p>
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 justify-items-center">
      <article
        v-for="course in courses"
        :key="course.id"
        class="w-full max-w-[280px] mx-2 sm:mx-3 group bg-[rgba(35,21,89,0.95)] rounded-lg sm:rounded-xl overflow-hidden border border-white/20 card-violet-glow-aura transition-all duration-200 hover:-translate-y-0.5"
      >
        <NuxtLink :to="`/courses/${course.slug}`" class="block no-underline text-inherit">
          <div class="relative aspect-[4/3] overflow-hidden bg-[rgba(35,21,89,0.95)]">
            <img
              :src="course.image || defaultImage"
              :alt="course.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              @error="onCourseImageError($event)"
            />
            <span v-if="course.badge" class="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[0.5625rem] font-bold uppercase tracking-wide bg-[#ffd74a] text-[#14082e]">{{ course.badge }}</span>
          </div>
          <div class="p-3 sm:p-4">
            <h2 class="text-sm sm:text-base font-bold text-white leading-snug mb-1.5 line-clamp-2">{{ course.title }}</h2>
            <p class="text-xs text-white/60 mb-1.5">{{ course.instructor }}</p>
            <div class="flex items-center gap-2 flex-wrap text-xs text-white/70 mb-1.5">
              <span class="inline-flex items-center gap-0.5">
                <span>{{ course.rating }}</span>
                <i class="fas fa-star text-yellow-400 text-[0.5625rem]" :aria-hidden="true" />
                <span class="text-white/50">({{ course.reviewCount }})</span>
              </span>
              <span v-if="course.duration" class="text-white/50">{{ course.duration }}</span>
            </div>
            <div class="flex items-center justify-between flex-wrap gap-1 pt-2 border-t border-white/10">
              <span class="text-sm font-bold text-[#ffd74a]">{{ course.price }}</span>
              <span v-if="course.level" class="text-[0.5625rem] font-semibold uppercase tracking-wide text-white/50">{{ course.level }}</span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  courses: { id: string; slug: string; title: string; instructor: string; rating: string; reviewCount: number; duration?: string; price: string; level?: string; badge?: string; image?: string }[]
  defaultImage: string
}>()

const { courses, defaultImage } = toRefs(props)
const onCourseImageError = useImageFallback(props.defaultImage)
</script>
