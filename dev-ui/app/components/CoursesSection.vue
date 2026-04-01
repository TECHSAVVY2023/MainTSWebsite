<template>
  <section
    id="courses"
    class="scroll-mt-20 min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 relative overflow-hidden bg-neutral-gray"
  >
    <SectionWires gradient-id-prefix="swg-courses" />
    <div class="relative z-10 isolate flex-1 flex flex-col">
      <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
        <div class="mb-8 sm:mb-12">
          <SectionWireShield>
            <div class="flex flex-col items-start justify-between gap-3 sm:gap-4 md:flex-row md:items-end">
            <div class="mb-0">
              <h2 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-dark mb-1">
                Courses
              </h2>
              <p class="max-w-[42rem] text-sm leading-relaxed text-dark/60 sm:text-base">
                Learn full-stack web development with hands-on projects
              </p>
            </div>
            <NuxtLink
              to="/courses"
              class="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent-purple/25 bg-violet-border py-2 px-4 text-sm font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:py-2.5 sm:px-5 sm:text-base"
            >
              Browse all courses
              <i class="fas fa-arrow-right text-xs" />
            </NuxtLink>
            </div>
          </SectionWireShield>
        </div>

        <div class="w-full max-w-[72rem] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-start">
          <article
            v-for="(course, i) in safeCourses"
            :key="course.slug"
            class="course-card group flex flex-col bg-neutral-card text-gray-900 rounded-xl overflow-hidden border card-outline-violet-glow self-start transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <NuxtLink :to="`/courses/${course.slug}`" class="flex flex-col h-full no-underline text-inherit">
              <div class="relative w-full aspect-video overflow-hidden shrink-0">
                <img
                  :src="course.image || defaultImage"
                  :alt="course.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  @error="onImageError($event)"
                />
                <span
                  v-if="course.badge"
                  class="absolute top-2 left-2 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide bg-accent-gold text-violet rounded"
                >
                  {{ course.badge }}
                </span>
              </div>
              <div class="p-4 flex flex-col flex-1 min-h-0">
                <h3 class="text-sm font-bold tracking-wide mb-1 overflow-hidden text-ellipsis line-clamp-2 leading-snug">
                  {{ course.title }}
                </h3>
                <p class="text-xs text-gray-500 mb-2">
                  {{ course.instructor }}
                </p>
                <div class="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span class="inline-flex items-center gap-1">
                    <i class="fas fa-star text-accent-gold text-xs" /> {{ course.rating }}
                  </span>
                  <span>{{ course.duration }}</span>
                </div>
                <span class="text-xs font-semibold tracking-wide uppercase text-violet mt-auto transition-colors group-hover:text-accent-purple">
                  View course
                </span>
              </div>
            </NuxtLink>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DEFAULT_COURSE_IMAGE } from '~/constants/defaultMediaAssets'

type CourseItem = {
  slug: string
  title: string
  instructor?: string
  rating?: string
  duration?: string
  badge?: string
  image?: string
}

const props = withDefaults(
  defineProps<{
    courses?: CourseItem[] | unknown
    defaultImage?: string
  }>(),
  { defaultImage: DEFAULT_COURSE_IMAGE }
)

const safeCourses = computed(() => {
  const raw = props.courses
  return Array.isArray(raw) ? raw.filter((c): c is CourseItem => c != null && typeof c === 'object') : []
})

function onImageError(ev: Event) {
  const el = ev.target as HTMLImageElement | null
  if (el?.src !== undefined) el.src = props.defaultImage
}
</script>
