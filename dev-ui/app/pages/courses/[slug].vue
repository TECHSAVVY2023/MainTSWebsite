<template>
  <div class="font-inter text-white min-h-screen page-bg-violet courses-detail-page">
    <header class="sticky top-0 left-0 right-0 z-50 header-bar">
      <nav class="container mx-auto px-5 sm:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/courses" class="flex items-center gap-2 sm:gap-3 text-white/90 hover:text-white transition-colors text-sm sm:text-base">
            <i class="fas fa-arrow-left text-base sm:text-lg"></i>
            <span class="font-medium">Back to Courses</span>
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
            <linearGradient id="swg-courses-slug-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="swg-courses-slug-2" x1="0%" y1="0%" x2="0%" y2="100%">
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
          <path class="section-wire section-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#swg-courses-slug-1)" stroke-width="0.8" stroke-linecap="round" />
          <path class="section-wire section-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#swg-courses-slug-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#swg-courses-slug-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#swg-courses-slug-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-5" d="M80 400 Q200 360 320 400" fill="none" stroke="url(#swg-courses-slug-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-6" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="url(#swg-courses-slug-2)" stroke-width="0.55" stroke-linecap="round" />
        </svg>
      </div>
      <div class="section-content-layer flex-1 flex flex-col">
      <div v-if="!course" class="container mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex flex-col">
          <p class="text-white/60">Course not found.</p>
      </div>
      <div v-else class="container mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex flex-col">
        <div class="course-detail-content-card">
        <div class="course-detail-layout">
          <div class="course-detail-main">
            <div class="course-detail-hero">
              <div class="course-detail-image-wrap">
                <img
                  :src="course.image || DEFAULT_COURSE_IMAGE"
                  :alt="course.title"
                  class="course-detail-image"
                  @error="onCourseImageError($event)"
                />
                <span v-if="course.badge" class="course-detail-badge">{{ course.badge }}</span>
              </div>
              <h1 class="course-detail-title">{{ course.title }}</h1>
              <p class="course-detail-subtitle">{{ course.description }}</p>
              <div class="course-detail-meta">
                <span class="course-detail-instructor">
                  <i class="fas fa-user"></i> {{ course.instructor }}
                </span>
                <span class="course-detail-rating">
                  <i class="fas fa-star text-accent-gold"></i> {{ course.rating }} ({{ course.reviewCount }} reviews)
                </span>
                <span v-if="course.duration" class="course-detail-duration">
                  <i class="fas fa-clock"></i> {{ course.duration }}
                </span>
                <span v-if="course.level" class="course-detail-level">{{ course.level }}</span>
              </div>
            </div>
            <div class="course-detail-content">
              <h2 class="course-detail-heading">What you'll learn</h2>
              <ul class="course-detail-learn-list">
                <li v-for="(item, i) in course.learnItems" :key="i"><i class="fas fa-check text-accent-gold"></i> {{ item }}</li>
              </ul>
            </div>
          </div>
          <aside class="course-detail-sidebar">
            <div class="course-detail-card">
              <div class="course-detail-price">{{ course.price }}</div>
              <button type="button" class="course-detail-cta">Enroll Now</button>
              <p class="course-detail-note">Free for TECH SAVVY community members</p>
            </div>
          </aside>
        </div>
        </div>
      </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const logoUrl = '/assets/codebev-logo.png'
const DEFAULT_COURSE_IMAGE = '/assets/no-image.png'

const defaultCourses: Record<string, { id: string; slug: string; title: string; instructor: string; category: string; rating: string; reviewCount: number; duration: string; price: string; level: string; badge?: string; image: string; description: string; learnItems?: string[] }> = {
  'nuxt-vue-fullstack': {
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
    description: 'Build modern web apps with Nuxt 3 and Vue. From routing to API integration.',
    learnItems: ['File-based routing and layouts', 'Composables and state management', 'API routes and server integration', 'Deployment and best practices']
  },
  'html-css-javascript': {
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
    description: 'Master the building blocks of the web. Responsive design and interactivity.',
    learnItems: ['Semantic HTML and accessibility', 'CSS Flexbox and Grid', 'JavaScript fundamentals', 'DOM manipulation and events']
  },
  'node-express-api': {
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
    description: 'Create REST APIs with Node and Express. Database integration and deployment.',
    learnItems: ['Express routing and middleware', 'REST API design', 'Database integration', 'Authentication basics']
  },
  'tailwind-ui': {
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
    description: 'Design beautiful interfaces with Tailwind. Utility-first CSS and components.',
    learnItems: ['Utility-first CSS', 'Responsive design', 'Component patterns', 'Dark mode and styling']
  },
  'git-github': {
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
    description: 'Version control and collaboration. Branches, pull requests, and workflows.',
    learnItems: ['Git basics and commands', 'Branches and merging', 'Pull requests and code review', 'GitHub workflows']
  },
  'deployment-basics': {
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
    description: 'From localhost to production. Vercel, Netlify, and basic DevOps.',
    learnItems: ['Static site deployment', 'Environment variables', 'CI/CD basics', 'Domain and hosting']
  }
}

const slug = computed(() => String(route.params.slug || ''))
const course = computed(() => defaultCourses[slug.value] || null)

function onCourseImageError(ev: Event) {
  const el = ev.target as HTMLImageElement | null
  if (el?.src) el.src = DEFAULT_COURSE_IMAGE
}

useHead(() => ({
  title: course.value ? `${course.value.title} | Courses | TECH SAVVY Code Camp` : 'Course not found | TECH SAVVY Code Camp',
  meta: [{ name: 'description', content: course.value?.description || 'TECH SAVVY Code Camp courses.' }],
  link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
}))
</script>

<style scoped>
.page-bg-violet { background-color: #14082e; }
</style>

<style>
.courses-detail-page .section-bg-violet { background-color: #14082e !important; }
.courses-detail-page .header-bar { background: rgba(20, 8, 46, 0.98); border-bottom: 1px solid rgba(181, 163, 255, 0.1); }
.course-detail-content-card {
  background: #14082e;
  position: relative;
  z-index: 10;
  border-radius: 16px;
  padding: 1.5rem;
}
@media (min-width: 768px) {
  .course-detail-content-card { padding: 2rem; }
}
.course-detail-layout { display: grid; grid-template-columns: 1fr 320px; gap: 2rem; align-items: start; max-width: 1100px; margin: 0 auto; }
.course-detail-image-wrap { position: relative; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; background: rgba(35, 21, 89, 0.95); margin-bottom: 1.5rem; }
.course-detail-image { width: 100%; height: 100%; object-fit: cover; }
.course-detail-badge { position: absolute; top: 1rem; left: 1rem; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; background: #ffd74a; color: #14082e; }
.course-detail-title { font-size: 1.75rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; line-height: 1.3; }
.course-detail-subtitle { font-size: 1rem; color: rgba(255,255,255,0.75); line-height: 1.6; margin-bottom: 1rem; }
.course-detail-meta { display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.875rem; color: rgba(255,255,255,0.7); margin-bottom: 2rem; }
.course-detail-meta span { display: inline-flex; align-items: center; gap: 0.35rem; }
.course-detail-heading { font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
.course-detail-learn-list { list-style: none; padding: 0; margin: 0; }
.course-detail-learn-list li { display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.9375rem; color: rgba(255,255,255,0.85); }
.course-detail-card { background: rgba(35, 21, 89, 0.95); border: 1px solid rgba(181, 163, 255, 0.2); border-radius: 16px; padding: 1.5rem; position: sticky; top: 6rem; }
.course-detail-price { font-size: 1.5rem; font-weight: 800; color: #ffd74a; margin-bottom: 1rem; }
.course-detail-cta { width: 100%; padding: 0.875rem 1.5rem; border-radius: 10px; font-size: 1rem; font-weight: 700; background: #ffd74a; color: #14082e; border: none; cursor: pointer; transition: background 0.2s, transform 0.2s; }
.course-detail-cta:hover { background: #ffe066; transform: translateY(-1px); }
.course-detail-note { font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-top: 0.75rem; text-align: center; }
@media (max-width: 1023px) {
  .course-detail-layout { grid-template-columns: 1fr; }
  .course-detail-card { position: static; }
}
</style>
