<template>
  <div class="font-inter min-h-screen page-bg-violet text-white">
    <header class="sticky top-0 left-0 right-0 z-50 header-bar">
      <nav class="container mx-auto px-5 sm:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/news" class="flex items-center gap-2 text-white/80 hover:text-white text-sm sm:text-base">
            <i class="fas fa-arrow-left text-base sm:text-lg"></i>
            <span class="font-medium">Back to all news</span>
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center shrink-0">
            <img :src="logoUrl" alt="TECH SAVVY" class="h-8 sm:h-9 w-auto object-contain opacity-90" />
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="section-bg-violet pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-14 md:pb-24 relative overflow-hidden flex flex-col">
      <div class="section-wires" aria-hidden="true">
        <svg class="section-wires-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="swg-news-slug-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="swg-news-slug-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FFD74A" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#FFD74A" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#FFD74A" stop-opacity="0.3" />
            </linearGradient>
          </defs>
          <path class="section-wire-base" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="#B5A3FF" stroke-width="0.35" stroke-opacity="0.15" />
          <path class="section-wire-base" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="#FFD74A" stroke-width="0.35" stroke-opacity="0.12" />
          <path class="section-wire-base" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="#B5A3FF" stroke-width="0.35" stroke-opacity="0.15" />
          <path class="section-wire-base" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="#FFD74A" stroke-width="0.35" stroke-opacity="0.12" />
          <path class="section-wire-base" d="M80 400 Q200 360 320 400" fill="none" stroke="#B5A3FF" stroke-width="0.35" stroke-opacity="0.15" />
          <path class="section-wire-base" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="#FFD74A" stroke-width="0.35" stroke-opacity="0.12" />
          <path class="section-wire section-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#swg-news-slug-1)" stroke-width="0.8" stroke-linecap="round" />
          <path class="section-wire section-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#swg-news-slug-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#swg-news-slug-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#swg-news-slug-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-5" d="M80 400 Q200 360 320 400" fill="none" stroke="url(#swg-news-slug-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-6" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="url(#swg-news-slug-2)" stroke-width="0.55" stroke-linecap="round" />
        </svg>
      </div>
      <div class="section-content-layer flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-10 relative flex-1 flex flex-col">
        <section class="mb-6 news-section-blend">
          <p class="text-xs font-semibold tracking-[0.25em] uppercase text-accent-gold">News &amp; Updates</p>
          <p v-if="!article" class="text-sm text-white/60 mt-4">We couldn't find this news item. It may have been removed or the link is incorrect.</p>
        </section>

        <section v-if="article" class="news-detail-layout">
          <!-- Left: Image gallery + title & summary -->
          <div class="news-detail-left">
            <div class="news-detail-card image-gallery" :class="`gallery-count-${articleImages.length}`">
              <div class="gallery-grid">
                <div
                  v-for="(img, idx) in articleImages"
                  :key="idx"
                  class="gallery-item"
                  role="button"
                  tabindex="0"
                  @click="openLightbox(idx)"
                  @keydown.enter="openLightbox(idx)"
                  @keydown.space.prevent="openLightbox(idx)"
                >
                  <img
                    :src="img"
                    :alt="`${article.title} – image ${idx + 1}`"
                    class="gallery-image"
                    loading="lazy"
                    @error="onDetailImageError"
                  />
                </div>
              </div>
            </div>
            <!-- Lightbox overlay -->
            <Teleport to="body">
              <Transition name="lightbox">
                <div
                  v-if="lightboxIndex !== null"
                  class="lightbox-overlay"
                  @click.self="closeLightbox"
                >
                  <button
                    type="button"
                    class="lightbox-close"
                    aria-label="Close"
                    @click="closeLightbox"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                  <button
                    v-if="articleImages.length > 1"
                    type="button"
                    class="lightbox-nav lightbox-prev"
                    aria-label="Previous image"
                    @click.stop="prevImage"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <div class="lightbox-content">
                    <img
                      :src="articleImages[lightboxIndex]"
                      :alt="`${article.title} – image ${lightboxIndex + 1}`"
                      class="lightbox-image"
                      @click.stop
                    />
                  </div>
                  <button
                    v-if="articleImages.length > 1"
                    type="button"
                    class="lightbox-nav lightbox-next"
                    aria-label="Next image"
                    @click.stop="nextImage"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </Transition>
            </Teleport>
            <div class="intro-block-card">
              <div class="intro-block">
                <h1 class="intro-title">{{ article.title }}</h1>
                <p class="intro-summary">{{ article.summary }}</p>
              </div>
            </div>
          </div>

          <!-- Right: Single content card -->
          <div class="news-detail-content">
            <div class="news-detail-card content-card">
              <div class="meta-chip">Featured update</div>
              <p class="meta-date">{{ formatDateUppercase(article.date) }}</p>
              <p class="meta-author">Community update · TECH SAVVY Code Camp</p>
              <p class="meta-intro">
                Stay in the loop with what&#160;is happening inside the community &mdash; from
                camps and workshops to new projects and partnerships.
              </p>

              <h2 class="body-heading">Full article</h2>
              <div class="body-scroll">
                <p class="body-text">
                  {{ fullArticle(article) }}
                </p>
              </div>

              <h2 class="side-heading">Details</h2>
              <ul class="side-list">
                <li>
                  <span class="side-label">Type</span>
                  <span class="side-value">Community news / update</span>
                </li>
                <li>
                  <span class="side-label">Location</span>
                  <span class="side-value">Misamis Occidental, Philippines</span>
                </li>
                <li>
                  <span class="side-label">Published</span>
                  <span class="side-value">{{ formatDate(article.date) }}</span>
                </li>
              </ul>
              <NuxtLink to="/news" class="side-cta">
                Back to News &amp; Updates
                <i class="fas fa-arrow-right text-xs"></i>
              </NuxtLink>
            </div>
          </div>
        </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getItem: getStorage } = useSafeStorage()
const { fetchCmsList } = useCmsNews()

const APPROVED_NEWS_KEY = 'approvedNewsForLanding'
const NEWS_DATA_URL = '/data/news.json'
const logoUrl = '/assets/codebev-logo.png'
const DEFAULT_NEWS_IMAGE = '/assets/no-image.png'

type NewsItem = { id?: string; date?: string; title?: string; summary?: string; description?: string; imageUrl?: string; link?: string; images?: string[] }

const newsItems = ref<NewsItem[]>([])

const { data: cmsListFromApi } = await useAsyncData('news-slug-cms-list', () => fetchCmsList(), { server: true, default: () => [] })

const slugParam = computed(() => String(route.params.slug || ''))

function newsSlug (item: { title?: string; date?: string }) {
  const base = `${item.title || ''} ${item.date || ''}`.trim().toLowerCase()
  const cleaned = base.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return cleaned || 'news-item'
}

function getItemSlug (item: NewsItem) {
  return item.id || newsSlug(item)
}

const article = computed<NewsItem | undefined>(() =>
  newsItems.value.find((n) => getItemSlug(n) === slugParam.value)
)

/** Normalize to 1–6 images: prefer images[] array, fallback to imageUrl */
const articleImages = computed(() => {
  const a = article.value
  if (!a) return [DEFAULT_NEWS_IMAGE]
  const arr = (a as { images?: string[] }).images
  if (Array.isArray(arr) && arr.length > 0) {
    return arr.slice(0, 6).filter(Boolean).map((u) => u || DEFAULT_NEWS_IMAGE)
  }
  const single = (a as { imageUrl?: string }).imageUrl
  return [single && single.trim() ? single : DEFAULT_NEWS_IMAGE]
})

function fullArticle (item: { summary?: string; description?: string }) {
  if (item.description && item.description.trim()) return item.description.trim()
  return item.summary || ''
}

function formatDate (str: string | undefined) {
  if (!str) return ''
  const d = new Date(str)
  return isNaN(d.getTime())
    ? str
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDateUppercase (str: string | undefined) {
  if (!str) return ''
  const d = new Date(str)
  if (isNaN(d.getTime())) return str
  return d
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase()
    .replace(/\s+/g, ' ')
}

function onDetailImageError (ev: Event) {
  const el = ev.target as HTMLImageElement | null
  if (el?.src) el.src = DEFAULT_NEWS_IMAGE
}

const lightboxIndex = ref<number | null>(null)

function openLightbox (idx: number) {
  lightboxIndex.value = idx
}

function closeLightbox () {
  lightboxIndex.value = null
}

function prevImage () {
  if (lightboxIndex.value === null) return
  const len = articleImages.value.length
  lightboxIndex.value = (lightboxIndex.value - 1 + len) % len
}

function nextImage () {
  if (lightboxIndex.value === null) return
  const len = articleImages.value.length
  lightboxIndex.value = (lightboxIndex.value + 1) % len
}

function onKeydown (e: KeyboardEvent) {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowLeft') prevImage()
  else if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})

onMounted(async () => {
  const fromApi = cmsListFromApi.value
  if (Array.isArray(fromApi) && fromApi.length > 0) {
    newsItems.value = fromApi
  } else {
    try {
      const list = await fetchCmsList()
      if (list.length > 0) newsItems.value = list
    } catch { /* fall through */ }
  }

  if (newsItems.value.length === 0) {
    try {
      const res = await fetch(NEWS_DATA_URL)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) newsItems.value = data as NewsItem[]
      }
    } catch { /* keep empty */ }
  }

  try {
    const raw = getStorage(APPROVED_NEWS_KEY)
    const approved = JSON.parse(raw || '[]')
    if (Array.isArray(approved) && approved.length > 0) {
      newsItems.value = [...approved, ...newsItems.value]
    }
  } catch { /* ignore */ }
})

useHead(() => ({
  title: article.value
    ? `${article.value.title} | News & Updates | TECH SAVVY Code Camp`
    : 'News not found | TECH SAVVY Code Camp',
  meta: [
    {
      name: 'description',
      content: article.value?.summary || 'Detailed view for a TECH SAVVY Code Camp news item.'
    }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }
  ]
}))
</script>

<style scoped>
.page-bg-violet {
  background-color: #14082e;
}
</style>

<style>
.section-bg-violet {
  background-color: #14082e !important;
}

.header-bar {
  background: rgba(20, 8, 46, 0.98);
  border-bottom: 1px solid rgba(181, 163, 255, 0.1);
}

.news-section-blend {
  background: #14082e;
  position: relative;
  z-index: 10;
}

.intro-block-card {
  background: #14082e;
  position: relative;
  z-index: 10;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
}

.news-detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

.news-detail-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.intro-block {
  text-align: left;
}

.intro-title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.5rem;
  color: #fff;
}

@media (min-width: 768px) {
  .intro-title {
    font-size: 1.2rem;
  }
}

.intro-summary {
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
}

.news-detail-content {
  display: flex;
  flex-direction: column;
}

.news-detail-card {
  background: rgba(35, 21, 89, 0.95);
  border-radius: 18px;
  border: 1px solid rgba(181, 163, 255, 0.2);
  padding: 1.25rem 1.5rem;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.5);
}

.image-gallery {
  padding: 0;
  overflow: hidden;
}

.gallery-grid {
  display: grid;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  min-height: 280px;
}

.gallery-count-1 .gallery-grid {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.gallery-count-2 .gallery-grid {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

.gallery-count-3 .gallery-grid {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

.gallery-count-4 .gallery-grid {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.gallery-count-5 .gallery-grid {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.gallery-count-6 .gallery-grid {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  min-height: 120px;
  cursor: pointer;
}

.gallery-image {
  width: 100%;
  height: 100%;
  min-height: 140px;
  object-fit: cover;
  display: block;
}

.content-card {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.content-card .body-heading {
  margin-top: 1.5rem;
}

.content-card .side-heading {
  margin-top: 1.5rem;
}

.content-card .side-list {
  margin-bottom: 1rem;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  align-self: flex-start;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(255, 215, 74, 0.18);
  color: #ffd74a;
  margin-bottom: 0.75rem;
}

.meta-date {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 0.25rem;
}

.meta-author {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.75rem;
}

.meta-intro {
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
}

.body-heading {
  font-size: 0.9375rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.body-scroll {
  padding-right: 0.5rem;
}

.body-text {
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  white-space: pre-line;
}

.side-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.side-heading {
  font-size: 0.9375rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.side-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.side-label {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
}

.side-value {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.side-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #b5a3ff;
  text-decoration: none;
}

.side-cta:hover {
  color: #eeeaFF;
}

@media (max-width: 1023px) {
  .news-detail-layout {
    grid-template-columns: 1fr;
  }

  .image-gallery {
    position: static;
  }

  .gallery-grid {
    min-height: 240px;
  }

  .gallery-count-3 .gallery-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .gallery-count-5 .gallery-grid,
  .gallery-count-6 .gallery-grid {
    grid-template-columns: 1fr 1fr;
  }

  .gallery-item {
    min-height: 100px;
  }

  .gallery-image {
    min-height: 100px;
  }
}

@media (max-width: 640px) {
  .news-detail-card {
    padding: 1rem 1.1rem;
    border-radius: 14px;
  }
}

/* Lightbox overlay */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 100;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #1a0a2e;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.lightbox-close:hover {
  background: #fff;
  transform: scale(1.05);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #1a0a2e;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.lightbox-nav:hover {
  background: #fff;
  transform: translateY(-50%) scale(1.08);
}

.lightbox-prev {
  left: 1.5rem;
}

.lightbox-next {
  right: 1.5rem;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  pointer-events: none;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>

