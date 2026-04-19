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
                <div class="mb-1 flex flex-wrap items-center gap-2">
                  <h2 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-dark">
                    Courses
                  </h2>
                  <span
                    v-if="locked"
                    class="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-800 sm:text-[11px]"
                  >
                    <i class="fas fa-lock text-[9px]" aria-hidden="true" />
                    Members
                  </span>
                </div>
                <p class="text-sm leading-relaxed text-dark/60 sm:text-base">
                  Learn full-stack web development with hands-on projects
                </p>
              </div>
            </SectionWireShield>
            <SectionWireShield :wide="false">
              <NuxtLink
                :to="locked ? '/login' : '/courses'"
                class="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent-purple/25 bg-violet-border py-2 px-4 text-sm font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:py-2.5 sm:px-5 sm:text-base"
              >
                <template v-if="locked">
                  <i class="fas fa-lock text-xs" aria-hidden="true" />
                  Sign in to view
                </template>
                <template v-else>
                  Browse all courses
                  <i class="fas fa-arrow-right text-xs" />
                </template>
              </NuxtLink>
            </SectionWireShield>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-[72rem]">
          <div
            class="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch gap-3 sm:gap-4"
            :class="locked ? 'min-h-[280px] sm:min-h-[320px]' : ''"
          >
            <template v-if="locked">
              <div
                v-for="n in 4"
                :key="'course-sk-' + n"
                class="flex flex-col h-full min-h-0 overflow-hidden rounded-xl border border-gray-200/80 bg-[#f0eef5]/90 animate-pulse"
                aria-hidden="true"
              >
                <div class="aspect-video w-full shrink-0 bg-gray-300/60" />
                <div class="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                  <div class="h-3.5 rounded bg-gray-300/50 sm:h-4 w-[84%]" />
                  <div class="h-3 rounded bg-gray-200/80 w-[58%]" />
                  <div class="h-3 rounded bg-gray-200/80 w-[46%]" />
                  <div class="mt-auto h-3 rounded bg-gray-200/70 w-[68%]" />
                </div>
              </div>
            </template>
            <template v-else>
              <article
                v-for="(course, i) in safeCourses"
                :key="course.slug"
                class="group/course course-card relative z-10 flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-[rgba(177,138,243,0.42)] bg-white text-gray-900 shadow-[0_0_0_1px_rgba(126,87,194,0.16),0_0_22px_rgba(97,38,177,0.11),0_0_44px_rgba(177,138,243,0.06),0_6px_16px_rgba(46,19,104,0.05)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(177,138,243,0.55)] hover:shadow-[0_0_0_1px_rgba(126,87,194,0.24),0_0_28px_rgba(97,38,177,0.14),0_0_52px_rgba(177,138,243,0.09),0_8px_20px_rgba(46,19,104,0.07)] animate-fade-in"
                :style="{ animationDelay: `${i * 0.1}s` }"
              >
                <NuxtLink :to="`/courses/${course.slug}`" class="flex h-full min-h-0 flex-col no-underline text-inherit">
                  <div class="relative aspect-video w-full shrink-0 overflow-hidden">
                    <img
                      :src="course.image || defaultImage"
                      :alt="course.title"
                      class="h-full w-full object-cover transition-transform duration-300 group-hover/course:scale-105"
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
                    <span class="mt-auto text-xs font-semibold uppercase tracking-wide text-violet transition-colors duration-200 group-hover/course:text-[#6126b1]">
                      View course
                    </span>
                  </div>
                </NuxtLink>
              </article>
            </template>
          </div>

          <div
            v-if="locked"
            class="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-neutral-gray/70 px-4 py-10 backdrop-blur-[5px] sm:px-6"
          >
            <div class="max-w-sm rounded-2xl border border-violet-200/80 bg-white/95 px-6 py-8 text-center shadow-[0_20px_50px_rgba(46,19,104,0.12)]">
              <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <i class="fas fa-lock text-2xl" aria-hidden="true" />
              </div>
              <p class="text-base font-bold text-dark sm:text-lg">
                Member access
              </p>
              <p class="mt-2 text-sm leading-relaxed text-dark/65">
                Sign in with your community account to unlock courses and browse the full learning catalog.
              </p>
              <NuxtLink
                to="/login"
                class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-700 px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-violet-800"
              >
                <i class="fas fa-sign-in-alt text-xs" aria-hidden="true" />
                Sign in
              </NuxtLink>
            </div>
          </div>
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
    locked?: boolean
    courses?: CourseItem[] | unknown
    defaultImage?: string
  }>(),
  {
    locked: false,
    defaultImage: DEFAULT_COURSE_IMAGE
  }
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
