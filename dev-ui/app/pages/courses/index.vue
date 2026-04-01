<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to Home" />
    <main class="bg-neutral-gray pt-6 pb-16 sm:pt-8 sm:pb-20 md:pt-12 md:pb-24 relative overflow-hidden flex flex-col">
      <SectionWires gradient-id-prefix="swg-courses" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
          <CoursesTitleSection v-model="searchQueryValue" />
          <CoursesCategoryPills
            :categories="courses.categories"
            v-model:selected-category="selectedCategoryValue"
          />
          <CoursesGridSection
            :courses="filteredCoursesArray"
            :default-image="DEFAULT_COURSE_IMAGE"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_COURSE_IMAGE } from '~/constants/defaultMediaAssets'

const { courses, searchQueryValue, selectedCategoryValue, filteredCoursesArray } = useCoursesPage()
</script>
