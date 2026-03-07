<template>
  <div class="font-inter text-white min-h-screen page-bg-violet">
    <header class="sticky top-0 left-0 right-0 z-50 header-bar">
      <nav class="container mx-auto px-5 sm:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink :to="backToHomeHref" class="flex items-center gap-2 sm:gap-3 text-white/90 hover:text-white transition-colors text-sm sm:text-base">
            <i class="fas fa-arrow-left text-base sm:text-lg"></i>
            <span class="font-medium">Back to News & Updates</span>
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center shrink-0">
            <img :src="logoUrl" alt="TECH SAVVY" class="h-8 sm:h-9 w-auto object-contain opacity-90" />
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="section-bg-violet pt-6 pb-16 sm:pt-8 sm:pb-20 md:pt-12 md:pb-24 relative overflow-hidden flex flex-col">
      <div class="section-wires" aria-hidden="true">
        <svg class="section-wires-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="swg-news-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="swg-news-2" x1="0%" y1="0%" x2="0%" y2="100%">
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
          <path class="section-wire section-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#swg-news-1)" stroke-width="0.8" stroke-linecap="round" />
          <path class="section-wire section-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#swg-news-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#swg-news-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#swg-news-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-5" d="M80 400 Q200 360 320 400" fill="none" stroke="url(#swg-news-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-6" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="url(#swg-news-2)" stroke-width="0.55" stroke-linecap="round" />
        </svg>
      </div>
      <div class="section-content-layer flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex flex-col">
        <!-- Title row: same as Courses page -->
        <section class="page-title-row courses-hero-blend mb-8 sm:mb-12">
          <div class="page-title-block">
            <h1 class="courses-title mb-2">News &amp; Updates</h1>
            <p class="courses-subtitle mb-0">Latest from the community</p>
          </div>
          <div class="page-search-wrap">
            <div class="courses-search-wrap">
              <i class="fas fa-search courses-search-icon"></i>
              <input
                v-model="newsSearchInput"
                type="text"
                placeholder="Search news..."
                class="courses-search-input"
                aria-label="Search news"
              />
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <article
            v-for="(item, i) in paginatedNews"
            :key="i"
            class="news-card-single"
          >
            <div class="news-card-image-wrap">
              <img
                :src="item.imageUrl || DEFAULT_NEWS_IMAGE"
                :alt="item.title"
                class="news-card-image"
                loading="lazy"
                @error="onNewsImageError($event)"
              />
            </div>
            <div class="news-card-body">
              <p class="news-card-meta">
                {{ formatDate(item.date) }} · TECH SAVVY
              </p>
              <h2 class="news-card-title">
                {{ item.title }}
              </h2>
              <div class="news-card-text-wrap">
                <p class="news-card-excerpt">
                  {{ item.summary }}
                </p>
                <div class="news-card-full-article">
                  <p>{{ item.description || item.summary }}</p>
                </div>
              </div>
              <NuxtLink :to="'/news/' + getItemSlug(item)" class="news-card-read">
                READ MORE
              </NuxtLink>
            </div>
          </article>
        </div>

        <div v-if="filteredNewsItems.length === 0" class="text-center py-16 text-white/60">
          <p v-if="searchQuery">No news match “{{ newsSearchInput.trim() }}”. Try a different search or <NuxtLink to="/news" class="text-accent-gold hover:underline">view all</NuxtLink>.</p>
          <p v-else>No news yet. Check back later.</p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex flex-wrap items-center justify-center gap-2">
          <NuxtLink
            v-if="currentPage > 1"
            :to="{ path: '/news', query: newsPageQuery(currentPage - 1) }"
            class="pagination-btn"
            aria-label="Previous page"
          >
            <i class="fas fa-chevron-left mr-1"></i> Previous
          </NuxtLink>
          <span v-else class="pagination-btn opacity-50 pointer-events-none cursor-default" aria-hidden="true">
            <i class="fas fa-chevron-left mr-1"></i> Previous
          </span>
          <template v-for="(p, pIdx) in pageNumbers" :key="'p-' + pIdx">
            <NuxtLink
              v-if="p !== '…'"
              :to="{ path: '/news', query: newsPageQuery(p as number) }"
              class="pagination-btn min-w-[2.5rem] justify-center"
              :class="{ 'pagination-btn-active': currentPage === p }"
            >
              {{ p }}
            </NuxtLink>
            <span v-else class="px-2 text-white/50">…</span>
          </template>
          <NuxtLink
            v-if="currentPage < totalPages"
            :to="{ path: '/news', query: newsPageQuery(currentPage + 1) }"
            class="pagination-btn"
            aria-label="Next page"
          >
            Next <i class="fas fa-chevron-right ml-1"></i>
          </NuxtLink>
          <span v-else class="pagination-btn opacity-50 pointer-events-none cursor-default" aria-hidden="true">
            Next <i class="fas fa-chevron-right ml-1"></i>
          </span>
        </div>
        <p v-if="filteredNewsItems.length > 0" class="mt-4 text-center text-xs sm:text-sm text-white/50">
          Page {{ currentPage }} of {{ totalPages }} ({{ filteredNewsItems.length }} total{{ searchQuery ? ' matching' : '' }})
        </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { backToHomeHref } = useBackToHome()
const route = useRoute()
const { getItem: getStorage } = useSafeStorage()
const { fetchCmsList } = useCmsNews()
const APPROVED_NEWS_KEY = 'approvedNewsForLanding'
const NEWS_DATA_URL = '/data/news.json'
const logoUrl = '/assets/codebev-logo.png'
const DEFAULT_NEWS_IMAGE = '/assets/no-image.png'
const PER_PAGE = 6

type NewsItemShape = { id?: string; date?: string; title?: string; summary?: string; description?: string; imageUrl?: string; link?: string }

const newsItems = ref<NewsItemShape[]>([])

const { data: cmsListFromApi } = await useAsyncData('news-page-cms-list', () => fetchCmsList(), { server: true, default: () => [] })

const newsSearchInput = ref('')

const searchQuery = computed(() => (newsSearchInput.value || '').trim().toLowerCase())

const filteredNewsItems = computed(() => {
  const q = searchQuery.value
  if (!q) return newsItems.value
  return newsItems.value.filter(
    (n) =>
      (n.title || '').toLowerCase().includes(q) ||
      (n.summary || '').toLowerCase().includes(q) ||
      ((n as { description?: string }).description || '').toLowerCase().includes(q)
  )
})

const currentPage = computed(() => {
  const p = Number(route.query.page)
  return Number.isFinite(p) && p >= 1 ? p : 1
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredNewsItems.value.length / PER_PAGE)))

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE
  return filteredNewsItems.value.slice(start, start + PER_PAGE)
})

const pageNumbers = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '…')[] = []
  if (cur <= 3) {
    pages.push(1, 2, 3, 4, '…', total)
  } else if (cur >= total - 2) {
    pages.push(1, '…', total - 3, total - 2, total - 1, total)
  } else {
    pages.push(1, '…', cur - 1, cur, cur + 1, '…', total)
  }
  return pages
})

useHead({
  title: 'News & Updates | TECH SAVVY Code Camp',
  meta: [{ name: 'description', content: 'Latest news and updates from the TECH SAVVY community.' }],
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }
  ]
})

function formatDate (str: string) {
  if (!str) return ''
  const d = new Date(str)
  return isNaN(d.getTime()) ? str : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/** Slug for news detail URL; must match [slug].vue getItemSlug() */
function newsSlug (item: { title?: string; date?: string }) {
  const base = `${item.title || ''} ${item.date || ''}`.trim().toLowerCase()
  return base.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'news-item'
}

function getItemSlug (item: { id?: string; title?: string; date?: string }) {
  return item.id || newsSlug(item)
}

function newsPageQuery (page: number) {
  const q: Record<string, string> = { page: String(page) }
  const search = newsSearchInput.value?.trim()
  if (search) q.q = search
  return q
}

function onNewsImageError (ev: Event) {
  const el = ev.target as HTMLImageElement | null
  if (el?.src) el.src = DEFAULT_NEWS_IMAGE
}

onMounted(async () => {
  const q = route.query.q
  if (typeof q === 'string' && q.trim()) newsSearchInput.value = q.trim()

  const fromApi = cmsListFromApi.value
  if (Array.isArray(fromApi) && fromApi.length > 0) {
    newsItems.value = fromApi
  } else {
    try {
      const list = await fetchCmsList()
      if (list.length > 0) {
        newsItems.value = list
      }
    } catch { /* fall through */ }
  }

  if (newsItems.value.length === 0) {
    try {
      const res = await fetch(NEWS_DATA_URL)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) newsItems.value = data
      }
    } catch { /* keep empty */ }
  }

  try {
    const raw = getStorage(APPROVED_NEWS_KEY)
    const approved = JSON.parse(raw || '[]')
    if (Array.isArray(approved) && approved.length > 0) newsItems.value = [...approved, ...newsItems.value]
  } catch { /* ignore */ }
})
</script>

<style scoped>
.page-bg-violet { background-color: #14082E; }
</style>

<style>
.page-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 1.5rem;
}
.page-title-block { min-width: 0; }
.page-title-block.section-title-wrap { margin-bottom: 0; }
.page-search-wrap {
  flex-shrink: 0;
  min-width: 200px;
  max-width: 320px;
  width: 100%;
  margin-left: auto;
}
@media (min-width: 640px) {
  .page-search-wrap { width: 280px; }
}
.category-search-wrap { position: relative; }
.category-search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
}
.category-search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border-radius: 12px;
  border: 1px solid rgba(181, 163, 255, 0.2);
  background: rgba(35, 21, 89, 0.95);
  color: #fff;
  font-size: 0.9375rem;
  transition: border-color 0.2s, background 0.2s;
}
.category-search-input::placeholder { color: rgba(255, 255, 255, 0.4); }
.category-search-input:focus {
  outline: none;
  border-color: #b5a3ff;
  background: rgba(45, 28, 110, 0.98);
}
.section-bg-violet { background-color: #14082E !important; }
.section-heading { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.25; color: #fff; margin-bottom: 0.35rem; }
.section-sub { font-size: 13px; line-height: 1.4; color: rgba(255,255,255,0.6); }
.section-title-wrap { margin-bottom: 1.5rem; }
.header-bar { background: rgba(20, 8, 46, 0.98); border-bottom: 1px solid rgba(181, 163, 255, 0.1); }
/* Static card design for news list (no flip) */
.news-card-single {
  display: flex;
  flex-direction: column;
  background: #f8f7f5;
  color: #111827;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.25);
  height: 100%;
}

.news-card-image-wrap {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  transition: aspect-ratio 0.35s ease;
}

.news-card-single:hover .news-card-image-wrap {
  aspect-ratio: 16 / 9;
}

.news-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.news-card-single:hover .news-card-image {
  transform: scale(1.05);
}

.news-card-body {
  padding: 1.25rem 1.4rem 1.4rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.news-card-meta {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #9ca3af;
  margin-bottom: 0.35rem;
}

.news-card-title {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}

.news-card-text-wrap {
  position: relative;
  flex: 1;
  min-height: 0;
  margin-bottom: 0.75rem;
}

.news-card-excerpt {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #4b5563;
  transition: opacity 0.3s ease;
}

.news-card-full-article {
  position: absolute;
  inset: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  transition: opacity 0.35s ease;
  z-index: 1;
}

.news-card-full-article::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background: linear-gradient(to bottom, transparent, #f8f7f5);
  pointer-events: none;
}

.news-card-full-article p {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #4b5563;
  white-space: pre-line;
  margin: 0;
}

.news-card-single:hover .news-card-excerpt {
  opacity: 0;
  pointer-events: none;
}

.news-card-single:hover .news-card-full-article {
  opacity: 1;
}

.news-card-read {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #111827;
  text-decoration: none;
  margin-top: auto;
}

.news-card-read:hover {
  color: #facc15;
}
@media (min-width: 640px) {
  .section-heading { font-size: 26px; line-height: 1.3; margin-bottom: 0.5rem; }
  .section-sub { font-size: 14px; line-height: 1.5; }
  .section-title-wrap { margin-bottom: 2rem; }
}
@media (min-width: 768px) {
  .section-heading { font-size: 30px; line-height: 36px; letter-spacing: -0.6px; }
  .section-sub { font-size: 16px; line-height: 24px; }
  .section-title-wrap { margin-bottom: 3rem; }
}
.pagination-btn { display: inline-flex; align-items: center; padding: 0.4rem 0.6rem; border-radius: 8px; font-size: 0.8125rem; font-weight: 600; color: rgba(255,255,255,0.9); background: rgba(35, 21, 89, 0.95); border: 1px solid rgba(181, 163, 255, 0.2); text-decoration: none; transition: background 0.2s, color 0.2s, border-color 0.2s; }
.pagination-btn:hover:not(.opacity-50) { background: rgba(45, 28, 110, 0.98); color: #fff; border-color: rgba(181, 163, 255, 0.35); }
.pagination-btn-active { background: #B5A3FF; color: #14082E; border-color: #B5A3FF; }
.pagination-btn-active:hover { background: #C4B5FF; color: #14082E; }
@media (min-width: 640px) {
  .pagination-btn { padding: 0.5rem 0.75rem; font-size: 0.875rem; border-radius: 10px; }
}
@media (max-width: 767px) {
  .section-heading { font-size: 1.125rem; line-height: 1.3; }
  .section-sub { font-size: 0.75rem; line-height: 1.35; }
  .section-title-wrap { margin-bottom: 1.25rem; }
  .news-card-single { max-width: 320px; margin-left: auto; margin-right: auto; }
  .pagination-btn { font-size: 0.75rem; padding: 0.35rem 0.6rem; }
}
@media (max-width: 480px) {
  .section-heading { font-size: 1rem; }
  .section-sub { font-size: 0.6875rem; }
}
</style>
