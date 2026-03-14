<template>
  <div class="font-inter text-white min-h-screen bg-violet">
    <LayoutPageHeader back-text="Back to Projects" back-href="/#projects" />
    <main class="bg-violet pt-6 pb-16 sm:pt-8 sm:pb-20 md:pt-12 md:pb-24 relative overflow-hidden flex flex-col">
      <SectionWires gradient-id-prefix="swg-projects" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
          <ProjectsTitleSection v-model="projectSearchInputValue" />
          <ProjectsGridSection
            :projects="filteredProjectsArray"
            default-image="/assets/no-image.png"
          />
          <ProjectsEmptyState
            v-if="filteredProjectsArray.length === 0"
            :has-search-query="!!searchQueryValue"
            :search-query="String(projectSearchInputValue || '').trim()"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { projectSearchInputValue, filteredProjectsArray, searchQueryValue } = useProjectsPage()
</script>
