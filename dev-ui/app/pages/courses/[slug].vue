<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to Courses" back-href="/courses" />
    <main class="bg-neutral-gray pt-6 pb-16 sm:pt-8 sm:pb-20 md:pt-12 md:pb-24 relative overflow-hidden flex flex-col">
      <SectionWires gradient-id-prefix="swg-courses-slug" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div v-if="!course" class="container relative mx-auto flex flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <div class="rounded-2xl border border-neutral-border bg-white p-8 text-center shadow-sm">
            <p class="text-base font-medium text-dark">
              Course not found.
            </p>
            <p class="mt-2 text-sm text-dark/65">
              This slug may not match any course in the catalog, or the list could not be loaded.
            </p>
            <NuxtLink
              to="/courses"
              class="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-purple/35 bg-violet-border px-5 py-2.5 text-sm font-semibold text-accent-purple no-underline hover:bg-[#D9CCFA]"
            >
              Back to courses
            </NuxtLink>
          </div>
        </div>
        <div v-else class="container relative mx-auto flex flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <div class="relative z-10 rounded-2xl border border-neutral-border bg-white p-6 shadow-sm md:p-8">
            <div class="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px]">
              <div>
                <CourseDetailHero
                  :course="course"
                  :default-image="DEFAULT_COURSE_IMAGE"
                />
              </div>
              <aside class="lg:sticky lg:top-24">
                <CourseDetailSidebar :course="course" />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_COURSE_IMAGE } from '~/constants/defaultMediaAssets'

const { course } = useCourseDetailPage()
</script>
