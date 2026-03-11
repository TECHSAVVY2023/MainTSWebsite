<template>
  <div class="font-inter text-white min-h-screen page-bg-violet search-page">
    <header class="sticky top-0 left-0 right-0 z-50 header-bar">
      <nav class="container mx-auto px-5 sm:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink :to="backToHomeHref" class="flex items-center gap-2 sm:gap-3 text-white/90 hover:text-white transition-colors text-sm sm:text-base">
            <i class="fas fa-arrow-left text-base sm:text-lg"></i>
            <span class="font-medium">Back to Home</span>
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
            <linearGradient id="swg-search-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="swg-search-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FFD74A" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#FFD74A" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#FFD74A" stop-opacity="0.3" />
            </linearGradient>
          </defs>
          <path class="section-wire-base" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="#B5A3FF" stroke-width="0.35" stroke-opacity="0.15" />
          <path class="section-wire-base" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="#FFD74A" stroke-width="0.35" stroke-opacity="0.12" />
          <path class="section-wire-base" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="#B5A3FF" stroke-width="0.35" stroke-opacity="0.15" />
          <path class="section-wire-base" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="#FFD74A" stroke-width="0.35" stroke-opacity="0.12" />
          <path class="section-wire section-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#swg-search-1)" stroke-width="0.8" stroke-linecap="round" />
          <path class="section-wire section-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#swg-search-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#swg-search-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#swg-search-2)" stroke-width="0.65" stroke-linecap="round" />
        </svg>
      </div>
      <div class="section-content-layer flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex flex-col">
          <!-- Title row: same as Courses page -->
          <section class="page-title-row courses-hero-blend mb-8 sm:mb-12">
            <div class="page-title-block">
              <h1 class="courses-title mb-2">Search</h1>
              <p class="courses-subtitle mb-0">Find content in News &amp; Updates, Courses, and Featured Projects</p>
            </div>
            <div class="page-search-wrap">
              <form role="search" class="courses-search-wrap" @submit.prevent="submitSearch">
                <i class="fas fa-search courses-search-icon" aria-hidden="true"></i>
                <input
                  v-model="searchInput"
                  type="search"
                  autocomplete="off"
                  placeholder="Search news, courses, projects..."
                  class="courses-search-input"
                  aria-label="Search"
                />
              </form>
            </div>
          </section>

          <!-- Empty: no query -->
          <div v-if="!queryTrimmed" class="search-empty-state">
            <div class="search-empty-icon-wrap">
              <i class="fas fa-compass"></i>
            </div>
            <p class="search-empty-title">Explore by keyword</p>
            <p class="search-empty-desc">Enter a term above to search across News &amp; Updates, Courses, and Featured Projects.</p>
          </div>

          <template v-else>
            <!-- Empty: no results -->
            <div v-if="totalCount === 0" class="search-empty-state">
              <div class="search-empty-icon-wrap search-empty-icon-sad">
                <i class="fas fa-search"></i>
              </div>
              <p class="search-empty-title">No results for “{{ queryTrimmed }}”</p>
              <p class="search-empty-desc">Try a different term or browse <NuxtLink to="/news" class="search-empty-link">News</NuxtLink>, <NuxtLink to="/courses" class="search-empty-link">Courses</NuxtLink>, or <NuxtLink to="/projects" class="search-empty-link">Projects</NuxtLink>.</p>
            </div>

            <!-- Results -->
            <div v-else class="search-results">
              <div class="search-results-badge">
                <span class="search-results-count">{{ totalCount }}</span>
                <span class="search-results-label">result{{ totalCount !== 1 ? 's' : '' }} in {{ categoryCount }} {{ categoryCount === 1 ? 'section' : 'sections' }}</span>
              </div>
              <p class="search-results-hint">Choose a section below to see all matching results:</p>

              <!-- News & Updates -->
              <section v-if="newsResults.length > 0" class="search-section-card search-section-news">
                <div class="search-section-header">
                  <div class="search-section-title-wrap">
                    <span class="search-section-icon"><i class="fas fa-newspaper"></i></span>
                    <h2 class="search-section-title">News &amp; Updates</h2>
                    <span class="search-section-count">{{ newsResults.length }}</span>
                  </div>
                  <NuxtLink :to="newsSectionLink" class="search-section-cta">
                    View all
                    <i class="fas fa-arrow-right"></i>
                  </NuxtLink>
                </div>
                <ul class="search-result-list">
                  <li v-for="(item, i) in displayedNewsResults" :key="i">
                    <NuxtLink :to="'/news/' + getNewsSlug(item)" class="search-result-item">
                      <span class="search-result-title">{{ item.title }}</span>
                      <span class="search-result-meta">{{ formatDate(item.date) }}</span>
                      <i class="fas fa-chevron-right search-result-arrow"></i>
                    </NuxtLink>
                  </li>
                </ul>
                <button
                  v-if="newsResults.length > PREVIEW_COUNT"
                  type="button"
                  class="search-section-toggle"
                  @click="newsExpanded = !newsExpanded"
                >
                  <span>{{ newsExpanded ? 'Show less' : `Show ${newsResults.length - PREVIEW_COUNT} more` }}</span>
                  <i class="fas fa-chevron-down search-section-toggle-icon" :class="{ 'search-section-toggle-icon-open': newsExpanded }" aria-hidden="true"></i>
                </button>
              </section>

              <!-- Courses -->
              <section v-if="courseResults.length > 0" class="search-section-card search-section-courses">
                <div class="search-section-header">
                  <div class="search-section-title-wrap">
                    <span class="search-section-icon"><i class="fas fa-graduation-cap"></i></span>
                    <h2 class="search-section-title">Courses</h2>
                    <span class="search-section-count">{{ courseResults.length }}</span>
                  </div>
                  <NuxtLink :to="coursesSectionLink" class="search-section-cta">
                    View all
                    <i class="fas fa-arrow-right"></i>
                  </NuxtLink>
                </div>
                <ul class="search-result-list">
                  <li v-for="(item, i) in displayedCourseResults" :key="i">
                    <NuxtLink :to="`/courses/${item.slug}`" class="search-result-item">
                      <span class="search-result-title">{{ item.title }}</span>
                      <span class="search-result-meta">{{ item.instructor }} · {{ item.duration }}</span>
                      <i class="fas fa-chevron-right search-result-arrow"></i>
                    </NuxtLink>
                  </li>
                </ul>
                <button
                  v-if="courseResults.length > PREVIEW_COUNT"
                  type="button"
                  class="search-section-toggle"
                  @click="coursesExpanded = !coursesExpanded"
                >
                  <span>{{ coursesExpanded ? 'Show less' : `Show ${courseResults.length - PREVIEW_COUNT} more` }}</span>
                  <i class="fas fa-chevron-down search-section-toggle-icon" :class="{ 'search-section-toggle-icon-open': coursesExpanded }" aria-hidden="true"></i>
                </button>
              </section>

              <!-- Featured Projects -->
              <section v-if="projectResults.length > 0" class="search-section-card search-section-projects">
                <div class="search-section-header">
                  <div class="search-section-title-wrap">
                    <span class="search-section-icon"><i class="fas fa-project-diagram"></i></span>
                    <h2 class="search-section-title">Featured Projects</h2>
                    <span class="search-section-count">{{ projectResults.length }}</span>
                  </div>
                  <NuxtLink :to="projectsSectionLink" class="search-section-cta">
                    View all
                    <i class="fas fa-arrow-right"></i>
                  </NuxtLink>
                </div>
                <ul class="search-result-list">
                  <li v-for="(item, i) in displayedProjectResults" :key="i">
                    <a :href="item.url" target="_blank" rel="noopener" class="search-result-item">
                      <span class="search-result-title">{{ item.title }}</span>
                      <span class="search-result-meta">{{ item.domain }}</span>
                      <i class="fas fa-chevron-right search-result-arrow"></i>
                    </a>
                  </li>
                </ul>
                <button
                  v-if="projectResults.length > PREVIEW_COUNT"
                  type="button"
                  class="search-section-toggle"
                  @click="projectsExpanded = !projectsExpanded"
                >
                  <span>{{ projectsExpanded ? 'Show less' : `Show ${projectResults.length - PREVIEW_COUNT} more` }}</span>
                  <i class="fas fa-chevron-down search-section-toggle-icon" :class="{ 'search-section-toggle-icon-open': projectsExpanded }" aria-hidden="true"></i>
                </button>
              </section>
            </div>
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { backToHomeHref } = useBackToHome()
const { getItem: getStorage } = useSafeStorage()

const APPROVED_NEWS_KEY = 'approvedNewsForLanding'
const LANDING_DATA_URL = '/data/landing.json'
const NEWS_DATA_URL = '/data/news.json'
const logoUrl = '/assets/codebev-logo.png'

const searchInput = ref('')
const queryTrimmed = computed(() => (route.query.q as string)?.trim() || '')

const PREVIEW_COUNT = 3
const newsExpanded = ref(false)
const coursesExpanded = ref(false)
const projectsExpanded = ref(false)

const displayedNewsResults = computed(() =>
  newsExpanded.value ? newsResults.value : newsResults.value.slice(0, PREVIEW_COUNT)
)
const displayedCourseResults = computed(() =>
  coursesExpanded.value ? courseResults.value : courseResults.value.slice(0, PREVIEW_COUNT)
)
const displayedProjectResults = computed(() =>
  projectsExpanded.value ? projectResults.value : projectResults.value.slice(0, PREVIEW_COUNT)
)

const defaultNews = [
  { date: '2026-02-07', title: 'Code Camp Season 4 — Coming soon', summary: 'Join the community and connect with aspiring IT developers in Misamis Occidental.', description: '', imageUrl: '', link: '#', id: undefined as string | undefined },
  { date: '2026-02-01', title: 'Tech Savvy at Workflow Co-Working Space', summary: 'We run code camps in full-stack web development.', description: '', imageUrl: '', link: '#', id: undefined as string | undefined },
  { date: '2026-01-15', title: 'Community calendar and events', summary: 'Check the calendar below for workshops and meetups.', description: '', imageUrl: '', link: '#', id: undefined as string | undefined },
  { date: '2026-01-08', title: 'Full-stack web development bootcamp', summary: 'Learn modern front-end and back-end technologies.', description: '', imageUrl: '', link: '#', id: undefined as string | undefined }
]

const defaultCourses = [
  { id: '1', slug: 'nuxt-vue-fullstack', title: 'Nuxt & Vue: Full-Stack Web Development', instructor: 'TECH SAVVY Mentors', category: 'fullstack', rating: '4.8', reviewCount: 24, duration: '8 weeks', price: 'Free', level: 'Beginner', badge: 'Popular', image: '', description: 'Build modern web apps with Nuxt 3 and Vue. From routing to API integration.' },
  { id: '2', slug: 'html-css-javascript', title: 'HTML, CSS & JavaScript Fundamentals', instructor: 'TECH SAVVY Mentors', category: 'frontend', rating: '4.9', reviewCount: 42, duration: '6 weeks', price: 'Free', level: 'Beginner', image: '', description: 'Master the building blocks of the web. Responsive design and interactivity.' },
  { id: '3', slug: 'node-express-api', title: 'Node.js & Express: Building APIs', instructor: 'TECH SAVVY Mentors', category: 'backend', rating: '4.7', reviewCount: 18, duration: '5 weeks', price: 'Free', level: 'Intermediate', image: '', description: 'Create REST APIs with Node and Express. Database integration and deployment.' },
  { id: '4', slug: 'tailwind-ui', title: 'Tailwind CSS & Modern UI', instructor: 'TECH SAVVY Mentors', category: 'frontend', rating: '4.6', reviewCount: 15, duration: '4 weeks', price: 'Free', level: 'Beginner', image: '', description: 'Design beautiful interfaces with Tailwind. Utility-first CSS and components.' },
  { id: '5', slug: 'git-github', title: 'Git & GitHub for Developers', instructor: 'TECH SAVVY Mentors', category: 'development', rating: '4.9', reviewCount: 31, duration: '2 weeks', price: 'Free', level: 'Beginner', badge: 'Essential', image: '', description: 'Version control and collaboration. Branches, pull requests, and workflows.' },
  { id: '6', slug: 'deployment-basics', title: 'Deploy Your First Web App', instructor: 'TECH SAVVY Mentors', category: 'fullstack', rating: '4.5', reviewCount: 12, duration: '3 weeks', price: 'Free', level: 'Intermediate', image: '', description: 'From localhost to production. Vercel, Netlify, and basic DevOps.' }
]

const defaultProjects = [
  { title: 'Fabrics Plus Curtains', domain: 'www.fabricspluscurtains.com', url: 'https://www.fabricspluscurtains.com', image: '', alt: 'Fabrics Plus Curtains' },
  { title: 'Delgar Frozen Products', domain: 'www.delgar.store', url: 'https://www.delgar.store', image: '', alt: 'Delgar Frozen Products' },
  { title: "Kathie's Kitchen", domain: 'www.kathieskitchen.com', url: 'https://www.kathieskitchen.com', image: '', alt: "Kathie's Kitchen" }
]

const newsItems = ref<typeof defaultNews>([])
const coursesList = ref<typeof defaultCourses>([])
const projectsList = ref<typeof defaultProjects>([])

function getNewsSlug (item: { id?: string; title?: string; date?: string }) {
  const base = `${item.title || ''} ${item.date || ''}`.trim().toLowerCase()
  const slug = base.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'news-item'
  return item.id || slug
}

function formatDate (str: string) {
  if (!str) return ''
  const d = new Date(str)
  return isNaN(d.getTime()) ? str : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function matches (text: string, q: string) {
  return (text || '').toLowerCase().includes(q)
}

const newsResults = computed(() => {
  const q = queryTrimmed.value.toLowerCase()
  if (!q) return []
  return newsItems.value.filter(
    (n) =>
      matches(n.title, q) ||
      matches(n.summary, q) ||
      matches((n as { description?: string }).description, q)
  )
})

const courseResults = computed(() => {
  const q = queryTrimmed.value.toLowerCase()
  if (!q) return []
  return coursesList.value.filter(
    (c) =>
      matches(c.title, q) ||
      matches(c.instructor, q) ||
      matches(c.description, q)
  )
})

const projectResults = computed(() => {
  const q = queryTrimmed.value.toLowerCase()
  if (!q) return []
  return projectsList.value.filter(
    (p) => matches(p.title, q) || matches(p.domain, q)
  )
})

const totalCount = computed(
  () => newsResults.value.length + courseResults.value.length + projectResults.value.length
)

const categoryCount = computed(() => {
  let n = 0
  if (newsResults.value.length > 0) n++
  if (courseResults.value.length > 0) n++
  if (projectResults.value.length > 0) n++
  return n
})

const newsSectionLink = computed(() => ({ path: '/news', query: queryTrimmed.value ? { q: queryTrimmed.value } : {} }))
const coursesSectionLink = computed(() => ({ path: '/courses', query: queryTrimmed.value ? { q: queryTrimmed.value } : {} }))
const projectsSectionLink = computed(() => ({ path: '/projects', query: queryTrimmed.value ? { q: queryTrimmed.value } : {} }))

function submitSearch () {
  const q = searchInput.value?.trim() || ''
  if (q) router.push({ path: '/search', query: { q } })
}

watch(queryTrimmed, () => {
  newsExpanded.value = false
  coursesExpanded.value = false
  projectsExpanded.value = false
})

onMounted(async () => {
  newsItems.value = [...defaultNews]
  coursesList.value = [...defaultCourses]
  projectsList.value = [...defaultProjects]
  const q = queryTrimmed.value
  if (q) searchInput.value = q

  try {
    const res = await fetch(NEWS_DATA_URL)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) newsItems.value = data
    }
  } catch { /* use defaults */ }
  try {
    const res = await fetch(LANDING_DATA_URL)
    if (res.ok) {
      const data = await res.json()
      if (data?.news && Array.isArray(data.news) && data.news.length > 0) {
        const existing = new Set(newsItems.value.map((n) => `${n.title}-${n.date}`))
        const extra = data.news.filter((n: { title?: string; date?: string }) => !existing.has(`${n.title}-${n.date}`))
        newsItems.value = [...newsItems.value, ...extra]
      }
      if (data?.projects && Array.isArray(data.projects) && data.projects.length > 0) projectsList.value = data.projects
    }
  } catch { /* use defaults */ }
  try {
    const raw = getStorage(APPROVED_NEWS_KEY)
    const approved = JSON.parse(raw || '[]')
    if (Array.isArray(approved) && approved.length > 0) newsItems.value = [...approved, ...newsItems.value]
  } catch { /* ignore */ }
})

useHead({
  title: () => (queryTrimmed.value ? `“${queryTrimmed.value}” – Search | TECH SAVVY` : 'Search | TECH SAVVY Code Camp'),
  meta: [{ name: 'description', content: 'Search news and updates, courses, and featured projects.' }],
  link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
})
</script>

<style scoped>
.page-bg-violet { background-color: #14082e; }
</style>

<style>
.search-page .section-bg-violet { background-color: #14082e !important; }
.search-page .header-bar { background: rgba(20, 8, 46, 0.98); border-bottom: 1px solid rgba(181, 163, 255, 0.1); }

/* Title row: same as Courses page (ensure layout when Courses not mounted) */
.search-page .page-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 1.5rem;
}
.search-page .page-title-block { min-width: 0; }
.search-page .page-search-wrap {
  flex-shrink: 0;
  min-width: 200px;
  max-width: 320px;
  width: 100%;
  margin-left: auto;
}
@media (min-width: 640px) {
  .search-page .page-search-wrap { width: 280px; }
}

/* Hero (legacy – kept for any refs) */
.search-hero { position: relative; z-index: 10; }
.search-hero-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #b5a3ff;
  margin-bottom: 0.75rem;
}
.search-hero-label i { opacity: 0.9; }
.search-page-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}
.search-title-gradient {
  background: linear-gradient(101.5deg, #b5a3ff 0%, #ffd74a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.search-page-subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 1.5rem;
}
.search-page-form {
  display: flex;
  align-items: stretch;
  gap: 0;
  max-width: 28rem;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
.search-input-wrap {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(56, 42, 82, 0.9);
  border: 1px solid rgba(181, 163, 255, 0.25);
  border-right: none;
}
.search-page-icon {
  position: absolute;
  left: 1.125rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  pointer-events: none;
  transition: color 0.2s;
}
.search-page-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.5rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 0.9375rem;
  outline: none;
  transition: border-color 0.2s;
}
.search-page-input::placeholder { color: rgba(255, 255, 255, 0.45); }
.search-input-wrap:focus-within { border-color: rgba(181, 163, 255, 0.5); box-shadow: 0 0 0 2px rgba(181, 163, 255, 0.15); }
.search-input-wrap:focus-within .search-page-icon { color: #b5a3ff; }
.search-page-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
  background: #ffd74a;
  color: #14082e;
  font-weight: 700;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, color 0.2s;
}
.search-page-btn:hover { background: #ffe066; transform: translateX(2px); }
.search-btn-arrow { font-size: 0.75rem; opacity: 0.9; transition: transform 0.2s; }
.search-page-btn:hover .search-btn-arrow { transform: translateX(2px); }

/* Empty states */
.search-empty-state {
  text-align: center;
  padding: 3rem 1.5rem;
  position: relative;
  z-index: 10;
}
.search-empty-icon-wrap {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(181, 163, 255, 0.12);
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.5rem;
}
.search-empty-icon-sad { background: rgba(255, 215, 74, 0.1); color: rgba(255, 215, 74, 0.5); }
.search-empty-title { font-size: 1.125rem; font-weight: 600; color: #fff; margin-bottom: 0.5rem; }
.search-empty-desc { font-size: 0.9375rem; color: rgba(255, 255, 255, 0.6); line-height: 1.5; max-width: 28rem; margin: 0 auto; }
.search-empty-link { color: #b5a3ff; text-decoration: none; font-weight: 500; }
.search-empty-link:hover { color: #ffd74a; text-decoration: underline; }

/* Results summary */
.search-results { position: relative; z-index: 10; }
.search-results-badge {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 0.75rem;
  background: rgba(181, 163, 255, 0.12);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 9999px;
}
.search-results-count { font-size: 1.25rem; font-weight: 800; color: #ffd74a; }
.search-results-label { font-size: 0.8125rem; color: rgba(255, 255, 255, 0.8); font-weight: 500; }
.search-results-hint { font-size: 0.875rem; color: rgba(255, 255, 255, 0.55); margin-bottom: 1.5rem; }

/* Section cards */
.search-section-card {
  background: rgba(35, 21, 89, 0.92);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  margin-bottom: 1.25rem;
  position: relative;
  z-index: 10;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-section-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: 4px 0 0 4px;
}
.search-section-news::before { background: linear-gradient(180deg, #ffd74a, #b5a3ff); }
.search-section-courses::before { background: linear-gradient(180deg, #b5a3ff, #ffd74a); }
.search-section-projects::before { background: linear-gradient(180deg, #ffd74a, #b5a3ff); }
.search-section-card:hover { border-color: rgba(181, 163, 255, 0.35); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2); }
.search-section-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(181, 163, 255, 0.15);
}
.search-section-title-wrap { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
.search-section-icon {
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(255, 215, 74, 0.15);
  color: #ffd74a;
  font-size: 0.875rem;
}
.search-section-title { font-size: 1.125rem; font-weight: 700; color: #fff; margin: 0; }
.search-section-count {
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  padding: 0.2rem 0.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
}
.search-section-cta {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #b5a3ff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.2s, transform 0.2s;
}
.search-section-cta:hover { color: #ffd74a; transform: translateX(2px); }
.search-section-cta i { font-size: 0.7rem; }

/* Result list */
.search-result-list { list-style: none; padding: 0; margin: 0; }
.search-result-list li { margin-bottom: 0.5rem; }
.search-result-list li:last-child { margin-bottom: 0; }
.search-result-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  color: inherit;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.search-result-item:hover { background: rgba(181, 163, 255, 0.1); }
.search-result-title { flex: 1; font-weight: 500; color: #fff; min-width: 0; }
.search-result-item:hover .search-result-title { color: #b5a3ff; }
.search-result-meta { font-size: 0.8125rem; color: rgba(255, 255, 255, 0.5); flex-shrink: 0; }
.search-result-arrow {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
  transition: color 0.2s, transform 0.2s;
}
.search-result-item:hover .search-result-arrow { color: #ffd74a; transform: translateX(3px); }

/* Section expand/collapse toggle */
.search-section-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
  padding: 0.625rem 1rem;
  background: rgba(181, 163, 255, 0.1);
  border: 1px solid rgba(181, 163, 255, 0.25);
  border-radius: 10px;
  color: #b5a3ff;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.search-section-toggle:hover {
  background: rgba(181, 163, 255, 0.18);
  border-color: rgba(181, 163, 255, 0.4);
  color: #fff;
}
.search-section-toggle-icon {
  font-size: 0.7rem;
  transition: transform 0.25s ease;
}
.search-section-toggle-icon-open {
  transform: rotate(180deg);
}
</style>
