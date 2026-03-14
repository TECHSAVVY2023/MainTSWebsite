<template>
  <div class="font-inter text-white min-h-screen bg-violet">
    <LayoutPageHeader back-text="Back to News & Updates" back-href="/#news" />
    <main class="bg-violet pt-6 pb-16 sm:pt-8 sm:pb-20 md:pt-12 md:pb-24 relative overflow-hidden flex flex-col">
      <SectionWires gradient-id-prefix="swg-news" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
          <NewsTitleSection v-model="newsSearchInputValue" />
          <NewsGridSection
            :items="paginatedNewsArray"
            default-image="/assets/no-image.png"
          />
          <NewsEmptyState
            v-if="filteredNewsItemsArray.length === 0"
            :has-search-query="!!searchQueryValue"
            :search-query="(newsSearchInputValue || '').trim()"
          />
          <NewsPaginationSection
            v-if="paginatedNewsArray.length > 0"
            base-path="/news"
            :current-page="currentPageValue"
            :total-pages="totalPagesValue"
            :total-items="filteredNewsItemsArray.length"
            :page-numbers="pageNumbersValue"
            :page-query="news.pageQuery"
            :search-label="!!searchQueryValue"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const {
  news,
  newsSearchInputValue,
  paginatedNewsArray,
  filteredNewsItemsArray,
  searchQueryValue,
  currentPageValue,
  totalPagesValue,
  pageNumbersValue
} = useNewsPage()
</script>
