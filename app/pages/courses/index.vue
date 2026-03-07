<template>
  <div class="font-inter text-white min-h-screen page-bg-violet courses-page">
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
            <linearGradient id="swg-courses-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="swg-courses-2" x1="0%" y1="0%" x2="0%" y2="100%">
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
          <path class="section-wire section-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#swg-courses-1)" stroke-width="0.8" stroke-linecap="round" />
          <path class="section-wire section-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#swg-courses-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#swg-courses-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#swg-courses-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-5" d="M80 400 Q200 360 320 400" fill="none" stroke="url(#swg-courses-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-6" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="url(#swg-courses-2)" stroke-width="0.55" stroke-linecap="round" />
        </svg>
      </div>
      <div class="section-content-layer flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex flex-col">
        <!-- Title row: heading left, search right -->
        <section class="page-title-row courses-hero-blend mb-8 sm:mb-12">
          <div class="page-title-block">
            <h1 class="courses-title mb-2">Courses</h1>
            <p class="courses-subtitle mb-0">Learn full-stack web development with hands-on projects and mentor support</p>
          </div>
          <div class="page-search-wrap">
            <div class="courses-search-wrap">
              <i class="fas fa-search courses-search-icon"></i>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search courses..."
                class="courses-search-input"
                aria-label="Search courses"
              />
            </div>
          </div>
        </section>

        <!-- Category pills (Udemy-style) -->
        <section class="courses-filters mb-8">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat.value"
              type="button"
              class="course-filter-pill"
              :class="{ active: selectedCategory === cat.value }"
              @click="selectedCategory = cat.value"
            >
              {{ cat.label }}
            </button>
          </div>
        </section>

        <!-- Course grid (Udemy-style cards) -->
        <section class="courses-grid-wrap">
          <div v-if="filteredCourses.length === 0" class="text-center py-16 text-white/60">
            <i class="fas fa-graduation-cap text-4xl mb-4 opacity-50"></i>
            <p>No courses match your search. Try a different filter.</p>
          </div>
          <div v-else class="courses-grid">
            <article
              v-for="course in filteredCourses"
              :key="course.id"
              class="course-card"
            >
              <NuxtLink :to="`/courses/${course.slug}`" class="course-card-link">
                <div class="course-card-image-wrap">
                  <img
                    :src="course.image || DEFAULT_COURSE_IMAGE"
                    :alt="course.title"
                    class="course-card-image"
                    loading="lazy"
                    @error="onCourseImageError($event)"
                  />
                  <span v-if="course.badge" class="course-badge">{{ course.badge }}</span>
                </div>
                <div class="course-card-body">
                  <h2 class="course-card-title">{{ course.title }}</h2>
                  <p class="course-card-instructor">{{ course.instructor }}</p>
                  <div class="course-card-meta">
                    <span class="course-rating">
                      <span class="course-rating-stars">{{ course.rating }}</span>
                      <i class="fas fa-star text-accent-gold text-xs"></i>
                      <span class="course-rating-count">({{ course.reviewCount }})</span>
                    </span>
                    <span v-if="course.duration" class="course-duration">{{ course.duration }}</span>
                  </div>
                  <div class="course-card-footer">
                    <span class="course-price">{{ course.price }}</span>
                    <span v-if="course.level" class="course-level">{{ course.level }}</span>
                  </div>
                </div>
              </NuxtLink>
            </article>
          </div>
        </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { backToHomeHref } = useBackToHome()
const logoUrl = '/assets/codebev-logo.png'
const DEFAULT_COURSE_IMAGE = '/assets/no-image.png'

const searchQuery = ref((route.query.q as string) || '')
const selectedCategory = ref('all')

const categories = [
  { value: 'all', label: 'All' },
  { value: 'development', label: 'Development' },
  { value: 'frontend', label: 'Front-end' },
  { value: 'backend', label: 'Back-end' },
  { value: 'fullstack', label: 'Full-stack' }
]

const defaultCourses = [
  {
    id: '1',
    slug: 'nuxt-vue-fullstack',
    title: 'Nuxt & Vue: Full-Stack Web Development',
    instructor: 'TECH SAVVY Mentors',
    category: 'fullstack',
    rating: '4.8',
    reviewCount: 24,
    duration: '8 weeks',
    price: 'Free',
    level: 'Beginner',
    badge: 'Popular',
    image: 'https://picsum.photos/seed/nuxt/400/225',
    description: 'Build modern web apps with Nuxt 3 and Vue. From routing to API integration.'
  },
  {
    id: '2',
    slug: 'html-css-javascript',
    title: 'HTML, CSS & JavaScript Fundamentals',
    instructor: 'TECH SAVVY Mentors',
    category: 'frontend',
    rating: '4.9',
    reviewCount: 42,
    duration: '6 weeks',
    price: 'Free',
    level: 'Beginner',
    image: 'https://picsum.photos/seed/htmlcss/400/225',
    description: 'Master the building blocks of the web. Responsive design and interactivity.'
  },
  {
    id: '3',
    slug: 'node-express-api',
    title: 'Node.js & Express: Building APIs',
    instructor: 'TECH SAVVY Mentors',
    category: 'backend',
    rating: '4.7',
    reviewCount: 18,
    duration: '5 weeks',
    price: 'Free',
    level: 'Intermediate',
    image: 'https://picsum.photos/seed/node/400/225',
    description: 'Create REST APIs with Node and Express. Database integration and deployment.'
  },
  {
    id: '4',
    slug: 'tailwind-ui',
    title: 'Tailwind CSS & Modern UI',
    instructor: 'TECH SAVVY Mentors',
    category: 'frontend',
    rating: '4.6',
    reviewCount: 15,
    duration: '4 weeks',
    price: 'Free',
    level: 'Beginner',
    image: 'https://picsum.photos/seed/tailwind/400/225',
    description: 'Design beautiful interfaces with Tailwind. Utility-first CSS and components.'
  },
  {
    id: '5',
    slug: 'git-github',
    title: 'Git & GitHub for Developers',
    instructor: 'TECH SAVVY Mentors',
    category: 'development',
    rating: '4.9',
    reviewCount: 31,
    duration: '2 weeks',
    price: 'Free',
    level: 'Beginner',
    badge: 'Essential',
    image: 'https://picsum.photos/seed/git/400/225',
    description: 'Version control and collaboration. Branches, pull requests, and workflows.'
  },
  {
    id: '6',
    slug: 'deployment-basics',
    title: 'Deploy Your First Web App',
    instructor: 'TECH SAVVY Mentors',
    category: 'fullstack',
    rating: '4.5',
    reviewCount: 12,
    duration: '3 weeks',
    price: 'Free',
    level: 'Intermediate',
    image: 'https://picsum.photos/seed/deploy/400/225',
    description: 'From localhost to production. Vercel, Netlify, and basic DevOps.'
  }
]

const courses = ref<typeof defaultCourses>([])

const filteredCourses = computed(() => {
  let list = courses.value
  const q = (searchQuery.value || '').trim().toLowerCase()
  const cat = selectedCategory.value
  if (cat && cat !== 'all') {
    list = list.filter((c) => (c.category || '') === cat)
  }
  if (q) {
    list = list.filter(
      (c) =>
        (c.title || '').toLowerCase().includes(q) ||
        (c.instructor || '').toLowerCase().includes(q) ||
        (c.description || '').toLowerCase().includes(q)
    )
  }
  return list
})

function onCourseImageError(ev: Event) {
  const el = ev.target as HTMLImageElement | null
  if (el?.src) el.src = DEFAULT_COURSE_IMAGE
}

onMounted(() => {
  courses.value = [...defaultCourses]
  const q = route.query.q
  if (typeof q === 'string' && q.trim()) searchQuery.value = q.trim()
})

useHead({
  title: 'Courses | TECH SAVVY Code Camp',
  meta: [{ name: 'description', content: 'Learn full-stack web development with free courses from TECH SAVVY Code Camp. Nuxt, Vue, Node.js, and more.' }],
  link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
})
</script>

<style scoped>
.page-bg-violet {
  background-color: #14082e;
}
</style>

<style>
.courses-page .section-bg-violet {
  background-color: #14082e !important;
}
.courses-page .header-bar {
  background: rgba(20, 8, 46, 0.98);
  border-bottom: 1px solid rgba(181, 163, 255, 0.1);
}
.page-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 1.5rem;
}
.page-title-block { min-width: 0; }
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
.courses-hero-blend {
  background: #14082e;
}
.courses-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.5px;
}
.courses-subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}
.courses-search-wrap {
  position: relative;
}
.courses-search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
}
.courses-search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border-radius: 12px;
  border: 1px solid rgba(181, 163, 255, 0.2);
  background: rgba(35, 21, 89, 0.95);
  color: #fff;
  font-size: 0.9375rem;
  transition: border-color 0.2s, background 0.2s;
}
.courses-search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.courses-search-input:focus {
  outline: none;
  border-color: #b5a3ff;
  background: rgba(45, 28, 110, 0.98);
}
.course-filter-pill {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  background: rgba(181, 163, 255, 0.15);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(181, 163, 255, 0.2);
  cursor: pointer;
  transition: all 0.2s;
}
.course-filter-pill:hover {
  background: rgba(181, 163, 255, 0.25);
  color: #fff;
}
.course-filter-pill.active {
  background: #b5a3ff;
  color: #14082e;
  border-color: #b5a3ff;
}
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.course-card {
  background: rgba(35, 21, 89, 0.95);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(181, 163, 255, 0.2);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  border-color: rgba(181, 163, 255, 0.25);
}
.course-card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}
.course-card-image-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: rgba(35, 21, 89, 0.95);
}
.course-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.course-card:hover .course-card-image {
  transform: scale(1.05);
}
.course-badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #ffd74a;
  color: #14082e;
}
.course-card-body {
  padding: 1rem 1.25rem;
}
.course-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 0.35rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.course-card-instructor {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
}
.course-card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
}
.course-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
.course-rating-count {
  color: rgba(255, 255, 255, 0.5);
}
.course-duration {
  color: rgba(255, 255, 255, 0.5);
}
.course-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(181, 163, 255, 0.1);
}
.course-price {
  font-size: 1rem;
  font-weight: 700;
  color: #ffd74a;
}
.course-level {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
}
@media (min-width: 640px) {
  .courses-title { font-size: 2rem; }
  .courses-subtitle { font-size: 1rem; }
  .courses-grid { gap: 1.75rem; }
  .course-card-title { font-size: 1.0625rem; }
}
@media (min-width: 768px) {
  .courses-title { font-size: 2.25rem; }
  .courses-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
}
</style>
