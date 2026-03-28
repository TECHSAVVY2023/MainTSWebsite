<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <LayoutPageHeader back-text="Back to Home" />
    <main class="bg-neutral-gray pt-6 pb-16 sm:pt-8 sm:pb-20 md:pt-12 md:pb-24 relative overflow-hidden flex flex-col">
      <SectionWires gradient-id-prefix="swg-search" variant="compact" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex flex-col">
          <SearchTitleSection
            v-model="searchInputValue"
            @submit="search.submitSearch"
          />
          <SearchEmptyState v-if="!queryTrimmed" />
          <template v-else>
            <SearchNoResults v-if="totalCountValue === 0" :query="queryTrimmed" />
            <div v-else class="relative z-10">
              <SearchResultsHeader
                :total-count="totalCountValue"
                :category-count="categoryCountValue"
              />
              <SearchNewsResults
                :items="newsResultsArray"
                :displayed-items="displayedNewsResultsArray"
                :section-link="newsSectionLinkValue"
                :preview-count="PREVIEW_COUNT"
                :expanded="newsExpandedValue"
                @toggle-expand="search.toggleNewsExpanded"
              />
              <SearchCoursesResults
                :items="courseResultsArray"
                :displayed-items="displayedCourseResultsArray"
                :section-link="coursesSectionLinkValue"
                :preview-count="PREVIEW_COUNT"
                :expanded="coursesExpandedValue"
                @toggle-expand="search.toggleCoursesExpanded"
              />
              <SearchProjectsResults
                :items="projectResultsArray"
                :displayed-items="displayedProjectResultsArray"
                :section-link="projectsSectionLinkValue"
                :preview-count="PREVIEW_COUNT"
                :expanded="projectsExpandedValue"
                @toggle-expand="search.toggleProjectsExpanded"
              />
            </div>
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const {
  queryTrimmed,
  search,
  searchInputValue,
  totalCountValue,
  categoryCountValue,
  newsResultsArray,
  displayedNewsResultsArray,
  newsSectionLinkValue,
  newsExpandedValue,
  courseResultsArray,
  displayedCourseResultsArray,
  coursesSectionLinkValue,
  coursesExpandedValue,
  projectResultsArray,
  displayedProjectResultsArray,
  projectsSectionLinkValue,
  projectsExpandedValue,
  PREVIEW_COUNT
} = useSearchPage()
</script>
