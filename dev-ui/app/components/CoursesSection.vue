<template>
  <section
    id="courses"
    class="scroll-mt-20 min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 relative overflow-hidden bg-neutral-gray"
  >
    <SectionWires gradient-id-prefix="swg-courses" />
    <div class="relative z-10 isolate flex-1 flex flex-col">
      <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
        <div class="mb-8 sm:mb-12">
          <div class="flex flex-col items-start justify-between gap-3 sm:gap-4 md:flex-row md:items-end">
            <SectionWireShield :wide="false">
              <div class="max-w-[42rem]">
                <h2 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-dark mb-1">
                  Courses
                </h2>
                <p class="text-sm leading-relaxed text-dark/60 sm:text-base">
                  Learn full-stack web development with hands-on projects
                </p>
              </div>
            </SectionWireShield>
            <SectionWireShield :wide="false">
              <NuxtLink
                to="/courses"
                class="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent-purple/25 bg-violet-border py-2 px-4 text-sm font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:py-2.5 sm:px-5 sm:text-base"
              >
                Browse all courses
                <i class="fas fa-arrow-right text-xs" />
              </NuxtLink>
            </SectionWireShield>
          </div>
        </div>

        <div
          class="mx-auto grid w-full max-w-[72rem] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch gap-3 sm:gap-4"
        >
          <article
            v-for="(course, i) in safeCourses"
            :key="course.slug"
            class="courses-landing-card course-card relative z-10 flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 animate-fade-in"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <NuxtLink :to="`/courses/${course.slug}`" class="flex h-full min-h-0 flex-col no-underline text-inherit">
              <div class="relative aspect-video w-full shrink-0 overflow-hidden">
                <img
                  :src="course.image || defaultImage"
                  :alt="course.title"
                  class="courses-landing-card__img h-full w-full object-cover"
                  loading="lazy"
                  @error="onImageError($event)"
                />
                <span
                  v-if="course.badge"
                  class="absolute left-2 top-2 rounded-full border border-white/80 bg-white/92 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-violet shadow-[0_4px_14px_rgba(0,0,0,0.16)] backdrop-blur-[2px]"
                >
                  {{ course.badge }}
                </span>
              </div>
              <div class="flex min-h-0 flex-1 flex-col gap-1.5 bg-white p-4">
                <h3
                  class="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug tracking-wide text-gray-900 sm:min-h-[3.25rem]"
                >
                  {{ course.title }}
                </h3>
                <p class="line-clamp-1 min-h-[1.125rem] text-xs text-gray-500">
                  {{ course.instructor }}
                </p>
                <div class="flex min-h-[1.25rem] flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-500">
                  <span class="inline-flex items-center gap-1">
                    <i class="fas fa-star text-accent-gold text-xs" /> {{ course.rating }}
                  </span>
                  <span>{{ course.duration }}</span>
                </div>
                <span class="courses-landing-card__cta mt-auto text-xs font-semibold uppercase tracking-wide text-violet">
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
import { DEFAULT_COURSE_IMAGE } from '~/constants/sampleMedia'

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

<style scoped>
.courses-landing-card {
  border-color: rgba(177, 138, 243, 0.42);
  box-shadow:
    0 0 0 1px rgba(126, 87, 194, 0.16),
    0 0 22px rgba(97, 38, 177, 0.11),
    0 0 44px rgba(177, 138, 243, 0.06),
    0 6px 16px rgba(46, 19, 104, 0.05);
  transform: translateY(0);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.courses-landing-card:hover {
  border-color: rgba(177, 138, 243, 0.55);
  box-shadow:
    0 0 0 1px rgba(126, 87, 194, 0.24),
    0 0 28px rgba(97, 38, 177, 0.14),
    0 0 52px rgba(177, 138, 243, 0.09),
    0 8px 20px rgba(46, 19, 104, 0.07);
  transform: translateY(-4px);
}

.courses-landing-card__img {
  transform: scale(1);
  transition: transform 0.3s ease;
}

.courses-landing-card:hover .courses-landing-card__img {
  transform: scale(1.05);
}

.courses-landing-card__cta {
  transition: color 0.2s ease;
}

.courses-landing-card:hover .courses-landing-card__cta {
  color: #6126b1;
}
</style>
