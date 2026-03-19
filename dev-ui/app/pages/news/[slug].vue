<template>
  <div class="font-inter min-h-screen bg-violet text-white">
    <LayoutPageHeader back-text="Back to all news" back-href="/news" />
    <main class="bg-violet pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-14 md:pb-24 relative overflow-hidden flex flex-col">
      <SectionWires gradient-id-prefix="swg-news-slug" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-10 relative flex-1 flex flex-col">
          <section class="mb-6 relative z-10 bg-violet">
            <p class="text-xs font-semibold tracking-[0.25em] uppercase text-yellow-400">News &amp; Updates</p>
            <p v-if="!article" class="text-sm text-white/60 mt-4">
              We couldn't find this news item. It may have been removed or the link is incorrect.
            </p>
          </section>
          <section v-if="article" class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start max-w-[1200px] mx-auto">
            <div class="flex flex-col gap-6">
              <NewsDetailGallery
                :images="articleImagesArray"
                :title="article.title || ''"
                @open-lightbox="detail.openLightbox"
              />
              <NewsImageLightbox
                :visible="lightboxVisible"
                :images="articleImagesArray"
                :current-index="lightboxIndexValue"
                :title="article.title || ''"
                @close="detail.closeLightbox"
                @prev="detail.prevImage"
                @next="detail.nextImage"
              />
              <div class="relative z-10 rounded-xl p-5 sm:p-6 bg-violet">
                <h1 class="text-lg sm:text-xl font-bold leading-tight mb-2 text-white">{{ article.title }}</h1>
                <a
                  v-if="article?.link && article.link !== '#'"
                  :href="article.link"
                  target="_blank"
                  rel="noopener"
                  class="text-sm leading-relaxed text-[#b5a3ff] hover:text-[#eeeaFF] transition-colors inline-block max-w-full break-words"
                >
                  {{ article.link }}
                </a>
                <p v-else class="text-sm leading-relaxed text-white/60">
                  No external link provided.
                </p>
              </div>
            </div>
            <div class="flex flex-col">
              <NewsDetailContent
                :article="article"
                :full-article-text="article ? detail.fullArticle(article) : ''"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { detail, article, articleImagesArray, lightboxIndexValue, lightboxVisible } = useNewsDetailPage()
</script>
