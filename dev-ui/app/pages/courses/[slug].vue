<template>
  <div class="font-inter min-h-screen bg-zinc-100 text-[#1A1A1D]">
    <LayoutPageHeader back-text="Back to Courses" back-href="/courses" />
    <main class="bg-zinc-100 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 relative overflow-hidden flex flex-col">
      <SectionWires gradient-id-prefix="swg-courses-slug" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div v-if="pending" class="container relative mx-auto flex flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <div class="rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
            <p class="text-sm font-semibold text-[#1A1A1D]">
              Loading course…
            </p>
          </div>
        </div>
        <div v-else-if="!course" class="container relative mx-auto flex flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <div class="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
            <p class="text-base font-medium text-[#1A1A1D]">
              Course not found.
            </p>
            <p class="mt-2 text-sm text-[#1A1A1D]/65">
              This slug may not match any course in the catalog, or the list could not be loaded.
            </p>
            <NuxtLink
              to="/courses"
              class="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-600/35 bg-violet-100 px-5 py-2.5 text-sm font-semibold text-violet-800 no-underline hover:bg-violet-200"
            >
              Back to courses
            </NuxtLink>
          </div>
        </div>
        <div v-else class="container relative mx-auto flex flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <div class="relative z-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <div class="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px]">
              <div>
                <CoursesCourseDetailHero
                  :course="course"
                  :default-image="DEFAULT_COURSE_IMAGE"
                />
              </div>
              <aside class="lg:sticky lg:top-24">
                <CoursesCourseDetailSidebar :course="course" />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_COURSE_IMAGE } from '~/constants/sampleMedia'

const { course, pending } = useCourseDetailPage()
</script>
