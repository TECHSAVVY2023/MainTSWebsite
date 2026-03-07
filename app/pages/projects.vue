<template>
  <div class="font-inter text-white min-h-screen page-bg-violet">
    <header class="sticky top-0 left-0 right-0 z-50 header-bar">
      <nav class="container mx-auto px-5 sm:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink :to="backToHomeHref" class="flex items-center gap-2 sm:gap-3 text-white/90 hover:text-white transition-colors text-sm sm:text-base">
            <i class="fas fa-arrow-left text-base sm:text-lg"></i>
            <span class="font-medium">Back to Projects</span>
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
            <linearGradient id="swg-projects-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="swg-projects-2" x1="0%" y1="0%" x2="0%" y2="100%">
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
          <path class="section-wire section-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#swg-projects-1)" stroke-width="0.8" stroke-linecap="round" />
          <path class="section-wire section-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#swg-projects-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#swg-projects-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#swg-projects-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-5" d="M80 400 Q200 360 320 400" fill="none" stroke="url(#swg-projects-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-6" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="url(#swg-projects-2)" stroke-width="0.55" stroke-linecap="round" />
        </svg>
      </div>
      <div class="section-content-layer flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex flex-col">
        <!-- Title row: same as Courses page -->
        <section class="page-title-row courses-hero-blend mb-8 sm:mb-12">
          <div class="page-title-block">
            <h1 class="courses-title mb-2">Featured Projects</h1>
            <p class="courses-subtitle mb-0">Ecommerce websites developed by our community</p>
          </div>
          <div class="page-search-wrap">
            <div class="courses-search-wrap">
              <i class="fas fa-search courses-search-icon"></i>
              <input
                v-model="projectSearchInput"
                type="text"
                placeholder="Search projects..."
                class="courses-search-input"
                aria-label="Search projects"
              />
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div v-for="project in filteredProjects" :key="project.title" class="project-card-light group relative overflow-hidden rounded-xl sm:rounded-2xl hover-lift">
            <div class="aspect-video relative bg-gray-200 overflow-hidden">
              <img
                :src="project.image || DEFAULT_PROJECT_IMAGE"
                :alt="project.alt || project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                @error="onProjectImageError($event)"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-5">
                <a :href="project.url" target="_blank" rel="noopener" class="inline-flex items-center text-accent-purple font-semibold text-xs sm:text-sm">
                  Visit Site
                  <i class="fas fa-external-link-alt ml-2 text-xs"></i>
                </a>
              </div>
            </div>
            <div class="project-card-body p-3 sm:p-5">
              <h2 class="text-base sm:text-xl font-bold mb-0.5 sm:mb-1 text-gray-900">{{ project.title }}</h2>
              <p class="text-gray-600 text-xs sm:text-sm">{{ project.domain }}</p>
            </div>
          </div>
        </div>

        <div v-if="filteredProjects.length === 0" class="text-center py-16 text-white/60">
          <p v-if="searchQuery">No projects match “{{ projectSearchInput.trim() }}”. Try a different search or <NuxtLink to="/projects" class="text-accent-gold hover:underline">view all</NuxtLink>.</p>
          <p v-else>No projects yet. Check back later.</p>
        </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { backToHomeHref } = useBackToHome()
const logoUrl = '/assets/codebev-logo.png'
const DEFAULT_PROJECT_IMAGE = '/assets/no-image.png'

const defaultProjects = [
  { title: 'Fabrics Plus Curtains', domain: 'www.fabricspluscurtains.com', url: 'https://www.fabricspluscurtains.com', image: '', alt: 'Fabrics Plus Curtains website preview' },
  { title: 'Delgar Frozen Products', domain: 'www.delgar.store', url: 'https://www.delgar.store', image: '', alt: 'Delgar Frozen Products website preview' },
  { title: "Kathie's Kitchen", domain: 'www.kathieskitchen.com', url: 'https://www.kathieskitchen.com', image: '', alt: "Kathie's Kitchen website preview" }
]

const projects = ref<typeof defaultProjects>([])

const projectSearchInput = ref('')

const searchQuery = computed(() => (projectSearchInput.value || '').trim().toLowerCase())

const filteredProjects = computed(() => {
  const q = searchQuery.value
  if (!q) return projects.value
  return projects.value.filter(
    (p) =>
      (p.title || '').toLowerCase().includes(q) ||
      (p.domain || '').toLowerCase().includes(q)
  )
})

useHead({
  title: 'Projects | TECH SAVVY Code Camp',
  meta: [{ name: 'description', content: 'Ecommerce and web projects by the TECH SAVVY community.' }],
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }
  ]
})

function onProjectImageError (ev: Event) {
  const el = ev.target as HTMLImageElement | null
  if (el?.src) el.src = DEFAULT_PROJECT_IMAGE
}

onMounted(() => {
  projects.value = [...defaultProjects]
  const q = route.query.q
  if (typeof q === 'string' && q.trim()) projectSearchInput.value = q.trim()
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
.project-card-light {
  background: #f8f7f5;
  border: 1px solid rgba(0, 0, 0, 0.06);
}
.project-card-light .project-card-body {
  background: #f8f7f5;
}
.section-bg-violet { background-color: #14082E !important; }
.section-heading { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.25; color: #fff; margin-bottom: 0.35rem; }
.section-sub { font-size: 13px; line-height: 1.4; color: rgba(255,255,255,0.6); }
.section-title-wrap { margin-bottom: 1.5rem; }
.header-bar { background: rgba(20, 8, 46, 0.98); border-bottom: 1px solid rgba(181, 163, 255, 0.1); }
.hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
.hover-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); }
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
@media (max-width: 767px) {
  .section-heading { font-size: 1.125rem; line-height: 1.3; }
  .section-sub { font-size: 0.75rem; line-height: 1.35; }
  .section-title-wrap { margin-bottom: 1.25rem; }
  .project-card-light h2 { font-size: 0.9375rem; }
  .project-card-light p { font-size: 0.6875rem; }
  .project-card-light .text-\[11px\], .project-card-light .text-xs { font-size: 0.6875rem; }
}
@media (max-width: 480px) {
  .section-heading { font-size: 1rem; }
  .section-sub { font-size: 0.6875rem; }
  .project-card-light h2 { font-size: 0.875rem; }
  .project-card-light p { font-size: 0.625rem; }
}
</style>
