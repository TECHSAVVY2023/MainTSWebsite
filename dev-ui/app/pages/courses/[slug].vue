<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to Courses" back-href="/courses" />
    <main class="bg-neutral-gray pt-6 pb-16 sm:pt-8 sm:pb-20 md:pt-12 md:pb-24 relative overflow-hidden flex flex-col">
      <SectionWires gradient-id-prefix="swg-courses-slug" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div v-if="!course.course" class="container mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex flex-col">
          <p class="text-white/60">Course not found.</p>
        </div>
        <div v-else class="container mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex flex-col">
          <div class="relative z-10 rounded-2xl p-6 md:p-8 bg-white border border-neutral-border shadow-sm">
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start max-w-[1100px] mx-auto">
              <div>
                <CourseDetailHero
                  :course="course.course"
                  :default-image="DEFAULT_COURSE_IMAGE"
                />
              </div>
              <aside class="lg:sticky lg:top-24">
                <CourseDetailSidebar :course="course.course" />
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

const { course } = useCourseDetailPage()
</script>
