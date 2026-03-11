<template>
  <div class="font-inter text-white min-h-screen page-bg-violet">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50">
      <nav class="header-bar relative" :class="{ 'scrolled': headerScrolled }">
        <div class="container mx-auto px-5 sm:px-8">
          <div class="flex items-center justify-between h-16">
            <NuxtLink to="/" class="flex items-center shrink-0 pr-4" aria-label="Home">
              <img :src="logoUrl" alt="CODEDEV Solutions" class="h-10 md:h-11 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity" />
            </NuxtLink>

            <div class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
              <a href="#news" class="nav-link" @click.prevent="scrollToSection('#news')">News</a>
              <a href="#courses" class="nav-link" @click.prevent="scrollToSection('#courses')">Courses</a>
              <a href="#about" class="nav-link" @click.prevent="scrollToSection('#about')">About</a>
              <a href="#projects" class="nav-link" @click.prevent="scrollToSection('#projects')">Projects</a>
              <a href="#calendar" class="nav-link" @click.prevent="scrollToSection('#calendar')">Calendar</a>
            </div>

            <div class="hidden md:flex shrink-0 pl-4 items-center">
              <form role="search" class="header-search-wrap" @submit.prevent="onHeaderSearch">
                <label for="header-search" class="sr-only">Search news, courses, and featured projects</label>
                <i class="fas fa-search header-search-icon" aria-hidden="true"></i>
                <input
                  id="header-search"
                  v-model="headerSearchQuery"
                  type="search"
                  autocomplete="off"
                  placeholder="Search news, courses, projects..."
                  class="header-search-input"
                  aria-label="Search news, courses, and featured projects"
                />
              </form>
            </div>

            <button type="button" class="md:hidden p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors" aria-label="Open menu" :aria-expanded="mobileMenuOpen" aria-controls="mobileMenu" @click="mobileMenuOpen = !mobileMenuOpen">
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>
      <!-- Mobile menu backdrop (click to close) -->
      <div
        class="mobile-menu-backdrop"
        :class="{ open: mobileMenuOpen }"
        aria-hidden="true"
        @click="mobileMenuOpen = false"
      />
      <!-- Mobile menu (slide-in from right) -->
      <div id="mobileMenu" class="mobile-menu" role="dialog" aria-label="Navigation menu" :aria-hidden="!mobileMenuOpen" :class="{ open: mobileMenuOpen }">
        <button type="button" class="mobile-menu-close" aria-label="Close menu" @click="mobileMenuOpen = false">
          <i class="fas fa-times"></i>
        </button>
        <form role="search" class="mobile-search-wrap" @submit.prevent="onHeaderSearch">
          <i class="fas fa-search mobile-search-icon" aria-hidden="true"></i>
          <input
            v-model="headerSearchQuery"
            type="search"
            autocomplete="off"
            placeholder="Search news, courses, projects..."
            class="mobile-search-input"
            aria-label="Search"
          />
        </form>
        <a href="#news" class="mobile-nav-link" @click.prevent="scrollToSection('#news'); mobileMenuOpen = false">News</a>
        <a href="#courses" class="mobile-nav-link" @click.prevent="scrollToSection('#courses'); mobileMenuOpen = false">Courses</a>
        <a href="#about" class="mobile-nav-link" @click.prevent="scrollToSection('#about'); mobileMenuOpen = false">About</a>
        <a href="#projects" class="mobile-nav-link" @click.prevent="scrollToSection('#projects'); mobileMenuOpen = false">Projects</a>
        <a href="#calendar" class="mobile-nav-link" @click.prevent="scrollToSection('#calendar'); mobileMenuOpen = false">Calendar</a>
      </div>
    </header>

    <!-- Hero Section: exactly one viewport so violet sections start right below -->
    <section class="hero-section h-screen flex flex-col justify-center pt-16 pb-14 sm:pt-20 sm:pb-20 relative overflow-hidden">
      <div class="absolute inset-0 hero-bg" :style="{ backgroundImage: `url(${heroBgUrl})` }"></div>
      <div class="absolute inset-0 hero-gradient hero-overlay"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl mx-auto text-center hero-content-box">
          <div class="inline-flex items-center gap-1.5 mb-3 sm:mb-4 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/30">
            <span class="text-[10px] sm:text-xs font-semibold tracking-wide uppercase text-white">Season 4</span>
            <span class="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse"></span>
          </div>

          <h1 class="hero-title font-black mb-4 tracking-tight leading-tight">
            <span class="gradient-text">CODE CAMP</span>
          </h1>

          <p class="text-sm sm:text-lg text-accent-light mb-3 sm:mb-4 max-w-xl mx-auto font-light">
            Code · Create · Connect
          </p>

          <p class="text-xs sm:text-base text-white/70 mb-4 sm:mb-6 max-w-xl mx-auto leading-relaxed">
            A growing IT community in Misamis Occidental, empowering developers through full-stack web development and career growth.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button type="button" class="hero-btn-primary">
              Coming Soon!
            </button>
            <a href="#news" class="hero-btn-secondary" @click.prevent="scrollToSection('#news')">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- News & Updates -->
    <section id="news" class="section-same-size min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 relative overflow-hidden news-section section-bg-violet">
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
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div class="section-title-card">
            <div class="section-title-wrap mb-0">
              <h2 class="section-heading">News & Updates</h2>
              <p class="section-sub">Latest from the community</p>
            </div>
          </div>
          <NuxtLink to="/news" class="view-all-btn">
            View all
            <i class="fas fa-arrow-right text-xs"></i>
          </NuxtLink>
        </div>

        <div class="news-content-wrap w-full">
          <div id="newsGrid" class="news-grid-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-start">
            <article
              v-for="(item, i) in newsItemsDisplay"
              :key="i"
              class="news-card-single animate-fade-in"
              :style="{ animationDelay: (i * 0.1) + 's' }"
            >
              <div class="news-card-image-wrap">
                <img
                  :src="item.imageUrl || DEFAULT_NEWS_IMAGE"
                  :alt="item.title"
                  class="news-card-image"
                  loading="lazy"
                  @error="onNewsImageError($event, i)"
                />
              </div>
              <div class="news-card-body">
                <p class="news-card-meta">
                  {{ formatDate(item.date) }} · TECH SAVVY
                </p>
                <h3 class="news-card-title">
                  {{ item.title }}
                </h3>
                <div class="news-card-description">
                  <p>{{ (item as { description?: string }).description || item.summary }}</p>
                </div>
                <a
                  v-if="isExternalNewsLink(item)"
                  :href="(item as { link?: string }).link"
                  target="_blank"
                  rel="noopener"
                  class="news-card-read"
                >
                  READ MORE
                </a>
                <NuxtLink v-else :to="'/news/' + getItemSlug(item)" class="news-card-read">
                  READ MORE
                </NuxtLink>
              </div>
            </article>
          </div>
        </div>
        </div>
      </div>
    </section>

    <!-- Courses Section -->
    <section id="courses" class="section-same-size min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 relative overflow-hidden section-bg-violet">
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
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div class="section-title-card">
            <div class="section-title-wrap mb-0">
              <h2 class="section-heading">Courses</h2>
              <p class="section-sub">Learn full-stack web development with hands-on projects</p>
            </div>
          </div>
          <NuxtLink to="/courses" class="view-all-btn">
            Browse all courses
            <i class="fas fa-arrow-right text-xs"></i>
          </NuxtLink>
        </div>

        <div class="courses-preview-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-start">
          <article
            v-for="(course, i) in coursesPreview"
            :key="course.slug"
            class="course-preview-card animate-fade-in"
            :style="{ animationDelay: (i * 0.1) + 's' }"
          >
            <NuxtLink :to="`/courses/${course.slug}`" class="course-preview-link">
              <div class="course-preview-image-wrap">
                <img
                  :src="course.image || DEFAULT_COURSE_IMAGE"
                  :alt="course.title"
                  class="course-preview-image"
                  loading="lazy"
                  @error="onCourseImageError($event)"
                />
                <span v-if="course.badge" class="course-preview-badge">{{ course.badge }}</span>
              </div>
              <div class="course-preview-body">
                <h3 class="course-preview-title">{{ course.title }}</h3>
                <p class="course-preview-instructor">{{ course.instructor }}</p>
                <div class="course-preview-meta">
                  <span class="course-preview-rating">
                    <i class="fas fa-star text-accent-gold text-xs"></i> {{ course.rating }}
                  </span>
                  <span class="course-preview-duration">{{ course.duration }}</span>
                </div>
                <span class="course-preview-cta">View course</span>
              </div>
            </NuxtLink>
          </article>
        </div>
        </div>
      </div>
    </section>

    <!-- About / What is TECH SAVVY -->
    <section id="about" class="section-same-size min-h-screen section-bg-violet pt-8 pb-16 md:pt-12 md:pb-24 about-section relative overflow-hidden">
      <div class="section-wires" aria-hidden="true">
        <svg class="section-wires-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="swg-about-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="swg-about-2" x1="0%" y1="0%" x2="0%" y2="100%">
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
          <path class="section-wire section-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#swg-about-1)" stroke-width="0.8" stroke-linecap="round" />
          <path class="section-wire section-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#swg-about-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#swg-about-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#swg-about-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-5" d="M80 400 Q200 360 320 400" fill="none" stroke="url(#swg-about-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-6" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="url(#swg-about-2)" stroke-width="0.55" stroke-linecap="round" />
        </svg>
      </div>
      <div class="section-content-layer flex-1 flex flex-col">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex-shrink-0 relative">
        <div class="section-title-card mb-6 md:mb-8">
          <div class="section-title-wrap mb-0 text-left">
            <h2 class="section-heading">What is Tech Savvy?</h2>
            <p class="section-sub">Our vision, mission, and how we support developers in Misamis Occidental.</p>
          </div>
        </div>
      </div>
      <div ref="whatisWrapRef" class="whatis-in-same-section whatis-wrap relative">
        <div class="whatis-pages">
          <section class="whatis-page">
            <div class="whatis-page-inner">
              <div class="whatis-content whatis-content-mobile-center">
                <h2 class="whatis-title">Vision</h2>
                <p>A growing IT community empowering developers in their career growth and connecting them with opportunities in the IT industry.</p>
                <div class="whatis-buttons">
                  <button type="button" class="whatis-btn" @click="whatisStep('right')">Main →</button>
                </div>
              </div>
              <div class="whatis-images">
                <div class="whatis-img-card"><img src="https://picsum.photos/600/400?random=about1" alt="" loading="lazy" /></div>
                <div class="whatis-img-card"><img src="https://picsum.photos/600/400?random=about2" alt="" loading="lazy" /></div>
              </div>
            </div>
          </section>

          <section class="whatis-page">
            <div class="whatis-page-inner">
              <div class="whatis-content whatis-content-mobile-center">
                <h2 class="whatis-title">What is TECH SAVVY?</h2>
                <p class="whatis-p-first">A growing IT community in Misamis Occidental, <strong>started April 30, 2023 at Workflow Co-Working Space Ozamiz</strong>, running code camps in full-stack web development.</p>
                <p class="whatis-p-rest hidden md:block"><strong>Tech Savvy</strong> mentors aspiring developers with full-stack techniques and supports them from learning through to roles in the IT industry.</p>
                <div class="whatis-buttons">
                  <button type="button" class="whatis-btn" @click="whatisStep('left')">← Vision</button>
                  <button type="button" class="whatis-btn" @click="whatisStep('right')">Mission →</button>
                </div>
              </div>
              <div class="whatis-images">
                <div class="whatis-img-card"><img src="https://picsum.photos/600/400?random=about3" alt="" loading="lazy" /></div>
                <div class="whatis-img-card"><img src="https://picsum.photos/600/400?random=about4" alt="" loading="lazy" /></div>
              </div>
            </div>
          </section>

          <section class="whatis-page">
            <div class="whatis-page-inner">
              <div class="whatis-content whatis-content-mobile-center">
                <h2 class="whatis-title">Mission</h2>
                <p>The mission is to enhance the skills and knowledge of developers, facilitate networking and knowledge-sharing among community members, and assist job seekers in finding fulfilling roles in the IT industry.</p>
                <div class="whatis-buttons">
                  <button type="button" class="whatis-btn" @click="whatisStep('left')">← Main</button>
                </div>
              </div>
              <div class="whatis-images">
                <div class="whatis-img-card"><img src="https://picsum.photos/600/400?random=about5" alt="" loading="lazy" /></div>
                <div class="whatis-img-card"><img src="https://picsum.photos/600/400?random=about6" alt="" loading="lazy" /></div>
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section-same-size min-h-screen pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-12 md:pb-24 section-bg-violet relative overflow-hidden">
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
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div class="section-title-card">
            <div class="section-title-wrap mb-0">
              <h2 class="section-heading">Featured Projects</h2>
              <p class="section-sub">Ecommerce websites developed by our community</p>
            </div>
          </div>
          <NuxtLink to="/projects" class="view-all-btn">
            View all
            <i class="fas fa-arrow-right text-xs"></i>
          </NuxtLink>
        </div>

        <div id="projectsGrid" class="projects-grid-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div v-for="project in projects" :key="project.title" class="project-card project-card-light group relative overflow-hidden rounded-xl sm:rounded-2xl hover-lift">
            <div class="aspect-video relative bg-gray-200 overflow-hidden">
              <img
                :src="project.image || DEFAULT_PROJECT_IMAGE"
                :alt="project.alt || project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                @error="onProjectImageError($event)"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5 sm:p-4">
                <a :href="project.url" target="_blank" rel="noopener" class="inline-flex items-center text-accent-purple font-semibold text-[11px] sm:text-xs">
                  Visit Site
                  <i class="fas fa-external-link-alt ml-1.5 text-[10px] sm:text-xs"></i>
                </a>
              </div>
            </div>
            <div class="project-card-body p-2.5 sm:p-4">
              <h3 class="text-sm sm:text-base font-bold mb-0.5 text-gray-900">{{ project.title }}</h3>
              <p class="text-gray-600 text-[11px] sm:text-xs">{{ project.domain }}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>

    <!-- Calendar Section: monthly grid like reference -->
    <section id="calendar" class="section-same-size min-h-screen pt-8 pb-16 md:pt-12 md:pb-24 section-bg-violet relative overflow-hidden">
      <div class="section-wires" aria-hidden="true">
        <svg class="section-wires-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="swg-calendar-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="swg-calendar-2" x1="0%" y1="0%" x2="0%" y2="100%">
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
          <path class="section-wire section-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#swg-calendar-1)" stroke-width="0.8" stroke-linecap="round" />
          <path class="section-wire section-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#swg-calendar-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#swg-calendar-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#swg-calendar-2)" stroke-width="0.65" stroke-linecap="round" />
          <path class="section-wire section-wire-5" d="M80 400 Q200 360 320 400" fill="none" stroke="url(#swg-calendar-1)" stroke-width="0.55" stroke-linecap="round" />
          <path class="section-wire section-wire-6" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="url(#swg-calendar-2)" stroke-width="0.55" stroke-linecap="round" />
        </svg>
      </div>
      <div class="section-content-layer flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="section-title-card mb-6 md:mb-8">
          <div class="section-title-wrap mb-0">
            <h2 class="section-heading">Community Calendar</h2>
            <p class="section-sub">Stay updated with workshops, meetups, and events</p>
          </div>
        </div>

        <div class="glass-effect rounded-2xl overflow-hidden">
          <!-- Toolbar: Today, prev/next, month/year -->
          <div class="calendar-toolbar flex flex-wrap items-center justify-between gap-3 p-4 md:p-5 border-b border-white/10">
            <div class="flex items-center gap-2">
              <button type="button" class="calendar-today-btn" @click="calendarGoToday">Today</button>
              <div class="flex items-center gap-1">
                <button type="button" class="calendar-nav-btn" aria-label="Previous month" @click="calendarPrevMonth">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button type="button" class="calendar-nav-btn" aria-label="Next month" @click="calendarNextMonth">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <h3 class="calendar-month-year text-xl font-bold text-white">
              {{ calendarMonthLabel }}
            </h3>
            <a href="https://calendar.google.com/calendar/embed?src=en.philippines%23holiday%40group.v.calendar.google.com&ctz=Asia%2FManila&mode=AGENDA" target="_blank" rel="noopener" class="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white border border-white/20 hover:border-white/30 transition-colors">
              <i class="fas fa-external-link-alt mr-2"></i>
              Google Calendar
            </a>
          </div>

          <!-- Day headers -->
          <div class="calendar-day-headers grid grid-cols-7 text-center text-xs font-semibold text-white/60 uppercase tracking-wider border-b border-white/10">
            <div v-for="d in calendarDayLabels" :key="d" class="py-3">{{ d }}</div>
          </div>

          <!-- Month grid -->
          <div class="calendar-grid">
            <div v-for="(week, wi) in calendarGrid" :key="wi" class="calendar-week grid grid-cols-7 min-h-[80px] sm:min-h-[100px]">
              <div
                v-for="(day, di) in week"
                :key="di"
                class="calendar-cell border-b border-r border-white/10 p-1.5 sm:p-2 flex flex-col"
                :class="{ 'bg-white/5': day.isCurrentMonth && day.isToday, 'opacity-50': !day.isCurrentMonth }"
              >
                <div class="flex items-center justify-between mb-1">
                  <span
                    v-if="day.date"
                    class="calendar-cell-date text-sm font-medium"
                    :class="day.isToday ? 'calendar-cell-today' : 'text-white/90'"
                  >{{ day.dayNum }}</span>
                  <span v-if="day.date && day.isCurrentMonth" class="text-[10px] text-white/50 hidden sm:inline">{{ day.monthLabel }}</span>
                </div>
                <div class="calendar-cell-events flex-1 space-y-1 overflow-hidden">
                  <template v-for="(ev, ei) in day.events" :key="ei">
                    <a
                      v-if="ev.link"
                      :href="ev.link"
                      target="_blank"
                      rel="noopener"
                      class="calendar-event block rounded px-1.5 py-0.5 text-[10px] sm:text-xs font-medium truncate transition-opacity hover:opacity-90"
                      :class="ei % 2 === 0 ? 'calendar-event-primary' : 'calendar-event-secondary'"
                      :title="ev.title + (ev.time ? ' · ' + ev.time : '')"
                    >
                      {{ ev.title || 'Event' }}{{ ev.time ? ` · ${ev.time}` : '' }}
                    </a>
                    <div
                      v-else
                      class="calendar-event rounded px-1.5 py-0.5 text-[10px] sm:text-xs font-medium truncate"
                      :class="ei % 2 === 0 ? 'calendar-event-primary' : 'calendar-event-secondary'"
                      :title="ev.title + (ev.time ? ' · ' + ev.time : '')"
                    >
                      {{ ev.title || 'Event' }}{{ ev.time ? ` · ${ev.time}` : '' }}
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>

    <!-- Footer: improved 3-column layout -->
    <footer class="footer-main relative overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="footer-grid text-center">
          <!-- Column 1: Brand & navigate -->
          <div class="footer-col">
            <img :src="logoUrl" alt="CODEDEV Solutions" class="footer-logo" />
            <p class="footer-copy">© 2025 TECH SAVVY Community</p>
            <h3 class="footer-heading">Navigate</h3>
            <nav class="footer-nav" aria-label="Footer navigation">
              <NuxtLink to="/" class="footer-link">Home</NuxtLink>
              <a href="#news" class="footer-link" @click.prevent="scrollToSection('#news')">News</a>
              <NuxtLink to="/courses" class="footer-link">Courses</NuxtLink>
              <a href="#calendar" class="footer-link" @click.prevent="scrollToSection('#calendar')">Calendar</a>
              <NuxtLink to="/community-dashboard" class="footer-link">Community</NuxtLink>
              <NuxtLink to="/login" class="footer-link footer-login">Login</NuxtLink>
            </nav>
          </div>
          <!-- Column 2: Legal & contact -->
          <div class="footer-col">
            <h3 class="footer-heading">Website</h3>
            <a href="https://www.techsavvies.space" target="_blank" rel="noopener" class="footer-website">www.techsavvies.space</a>
            <p class="footer-tagline">Freelance Dev Community</p>
            <h3 class="footer-heading">Legal & contact</h3>
            <nav class="footer-nav">
              <NuxtLink to="/privacy" class="footer-link">Privacy Policy</NuxtLink>
              <NuxtLink to="/terms" class="footer-link">Terms of Use</NuxtLink>
              <NuxtLink to="/contact" class="footer-link">Contact us</NuxtLink>
            </nav>
          </div>
          <!-- Column 3: Location & social -->
          <div class="footer-col">
            <h3 class="footer-heading">Find us</h3>
            <address class="footer-address">
              Oracle Press International Inc.<br />
              Workflow Co-Working Space<br />
              In front of Ozamiz City Hall, 2nd floor of Mercury Drug/SSS<br />
              Ozamiz, Philippines
            </address>
            <div class="footer-social">
              <a href="#" class="footer-social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="footer-social-link" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" class="footer-social-link" aria-label="GitHub"><i class="fab fa-github"></i></a>
              <a href="#" class="footer-social-link" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <p class="footer-inquiry">
              For inquiries: <a href="mailto:info@techsavvies.space" class="footer-inquiry-link">info@techsavvies.space</a>
            </p>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="text-white/40 text-sm">© 2025 TECH SAVVY Community · Code Camp</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
/**
 * Design reference: figma_design.text (Figma export – colors, typography, spacing)
 * Assets reference: C:\xampp\htdocs\Figma\workflow_project\ (index.html + assets/)
 */
const APPROVED_NEWS_KEY = 'approvedNewsForLanding'
const CALENDAR_KEY = 'calendarEventsForLanding'
/** Optional JSON for dynamic landing content. Place at public/data/landing.json */
const LANDING_DATA_URL = '/data/landing.json'
/** Sample / seed data for News & Updates cards. Place at public/data/news.json */
const NEWS_DATA_URL = '/data/news.json'
/** TechSavvy CMS API path (relative to apiBase). Backend mounts app at api/techsavvy_app/. */
const CMS_LIST_PATH = '/techsavvy_app/cms/list/'

const config = useRuntimeConfig()
const apiBase = (config.public?.apiBase as string) || ''

const { getItem: getStorage, setItem: setStorage } = useSafeStorage()
const { setLastHomeSection } = useLastHomeSection()

/** Map techsavvy_app DataPostingCMSModel to landing news item shape. baseUrl used for relative image URLs. */
function mapCmsToNewsItem (cms: {
  id?: number
  title?: string
  authors?: string
  descriptions?: string
  approval_status?: string
  links?: string[]
  files?: { name?: string; url?: string }[]
  created_at?: string
}, baseUrl?: string) {
  const base = baseUrl ?? apiBase
  let fileUrl = Array.isArray(cms.files) && cms.files[0]?.url ? cms.files[0].url : ''
  if (fileUrl && base && !fileUrl.startsWith('http')) {
    fileUrl = `${base.replace(/\/$/, '')}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`
  }
  const link = Array.isArray(cms.links) && cms.links[0] ? cms.links[0] : ''
  return {
    id: String(cms.id ?? ''),
    date: cms.created_at || '',
    title: cms.title || 'Untitled',
    summary: cms.descriptions || '',
    description: cms.descriptions || '',
    imageUrl: fileUrl,
    link: link || '#'
  }
}

/** Logo from public folder – put your file at public/assets/codebev-logo.png */
const logoUrl = '/assets/codebev-logo.png'
/** Hero background image (public/assets/hero_bg.jpg) */
const heroBgUrl = '/assets/hero_bg.jpg'

const mobileMenuOpen = ref(false)
const headerScrolled = ref(false)
const headerSearchQuery = ref('')
const whatisWrapRef = ref<HTMLElement | null>(null)

function onHeaderSearch () {
  mobileMenuOpen.value = false
  const q = headerSearchQuery.value?.trim() || ''
  if (q) navigateTo({ path: '/search', query: { q } })
  else navigateTo('/search')
}

/** Normalize API response: raw array or wrapped { data/results/items } */
function normalizeCmsList (body: unknown): unknown[] {
  if (Array.isArray(body)) return body
  if (body && typeof body === 'object' && !Array.isArray(body)) {
    const o = body as Record<string, unknown>
    if (Array.isArray(o.data)) return o.data
    if (Array.isArray(o.results)) return o.results
    if (Array.isArray(o.items)) return o.items
  }
  return []
}

type NewsItem = { date?: string; title?: string; summary?: string; description?: string; imageUrl?: string; link?: string; id?: string }

const newsItems = ref<NewsItem[]>([])

// Fetch CMS from API on server (avoids CORS) and client; result synced to newsItems in onMounted
const { data: cmsListFromApi } = await useAsyncData(
  'landing-cms-list',
  async () => {
    const cfg = useRuntimeConfig()
    const base = (cfg.public?.apiBase as string) || ''
    if (!base) return []
    try {
      const url = `${String(base).replace(/\/$/, '')}${CMS_LIST_PATH}`
      const data = await $fetch<unknown>(url)
      const list = normalizeCmsList(data)
      return list
        .filter((item: { approval_status?: string }) => item.approval_status !== 'rejected')
        .map((item: unknown) => mapCmsToNewsItem(item as Parameters<typeof mapCmsToNewsItem>[0], base))
    } catch {
      return []
    }
  },
  { server: true, default: () => [] }
)
/** Only first 4 shown on index; View all goes to /news with pagination */
const newsItemsDisplay = computed(() => newsItems.value.slice(0, 4))

const calendarEvents = ref<{ date: string; time?: string; title?: string; description?: string; link?: string }[]>([])

/** Current month shown in community calendar (month is 0-indexed for Date) */
const calendarViewDate = ref<Date>(new Date())

const calendarDayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const calendarMonthLabel = computed(() => {
  const d = calendarViewDate.value
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

type CalendarDay = { date: Date | null; dayNum: number; monthLabel: string; isCurrentMonth: boolean; isToday: boolean; events: { date: string; time?: string; title?: string; description?: string; link?: string }[] }

const calendarGrid = computed(() => {
  const view = calendarViewDate.value
  const year = view.getFullYear()
  const month = view.getMonth()
  const today = new Date()
  const todayISO = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0')

  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startDow = first.getDay()
  const daysInMonth = last.getDate()

  const eventsByDate: Record<string, typeof calendarEvents.value> = {}
  calendarEvents.value.forEach((ev) => {
    const iso = (ev.date || '').slice(0, 10)
    if (!eventsByDate[iso]) eventsByDate[iso] = []
    eventsByDate[iso].push(ev)
  })

  const weeks: CalendarDay[][] = []
  let week: CalendarDay[] = []
  const pad = startDow
  for (let i = 0; i < pad; i++) {
    const prev = new Date(year, month, 1 - (pad - i))
    const iso = prev.getFullYear() + '-' + String(prev.getMonth() + 1).padStart(2, '0') + '-' + String(prev.getDate()).padStart(2, '0')
    week.push({
      date: prev,
      dayNum: prev.getDate(),
      monthLabel: prev.toLocaleDateString('en-US', { month: 'short' }),
      isCurrentMonth: false,
      isToday: iso === todayISO,
      events: eventsByDate[iso] || []
    })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    const iso = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0')
    week.push({
      date,
      dayNum: d,
      monthLabel: date.toLocaleDateString('en-US', { month: 'short' }),
      isCurrentMonth: true,
      isToday: iso === todayISO,
      events: eventsByDate[iso] || []
    })
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length > 0) {
    let d = 1
    while (week.length < 7) {
      const next = new Date(year, month + 1, d++)
      const iso = next.getFullYear() + '-' + String(next.getMonth() + 1).padStart(2, '0') + '-' + String(next.getDate()).padStart(2, '0')
      week.push({
        date: next,
        dayNum: next.getDate(),
        monthLabel: next.toLocaleDateString('en-US', { month: 'short' }),
        isCurrentMonth: false,
        isToday: iso === todayISO,
        events: eventsByDate[iso] || []
      })
    }
    weeks.push(week)
  }
  return weeks
})

function calendarPrevMonth () {
  const d = new Date(calendarViewDate.value)
  d.setMonth(d.getMonth() - 1)
  calendarViewDate.value = d
}

function calendarNextMonth () {
  const d = new Date(calendarViewDate.value)
  d.setMonth(d.getMonth() + 1)
  calendarViewDate.value = d
}

function calendarGoToday () {
  calendarViewDate.value = new Date()
}

type ProjectItem = { title: string; domain?: string; url: string; image?: string; alt?: string }

const projects = ref<ProjectItem[]>([])

type CoursePreviewItem = { slug: string; title: string; instructor?: string; rating?: string; duration?: string; badge?: string; image?: string }

const coursesPreview = ref<CoursePreviewItem[]>([])

/** Default placeholder when API has no image (API-ready) */
const DEFAULT_NEWS_IMAGE = '/assets/no-image.png'
const DEFAULT_PROJECT_IMAGE = '/assets/no-image.png'
const DEFAULT_COURSE_IMAGE = '/assets/no-image.png'

useHead({
  title: 'TECH SAVVY | Code Camp 2025 — Modern Community & Full-Stack Development',
  meta: [
    { name: 'description', content: 'Modern minimalist redesign of TECH SAVVY Code Camp - A growing IT community in Misamis Occidental running code camps in full-stack web development.' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
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

function isExternalNewsLink (item: { link?: string }) {
  const href = item?.link?.trim()
  return !!href && (href.startsWith('http://') || href.startsWith('https://'))
}

function formatEventDate (str: string) {
  if (!str) return ''
  const d = new Date(str)
  return isNaN(d.getTime()) ? str : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

function scrollToSection (id: string) {
  if (id === '#') return
  const el = document.querySelector(id)
  if (el) {
    const y = (el as HTMLElement).getBoundingClientRect().top + window.pageYOffset
    const headerOffset = id === '#news' ? 0 : 80
    window.scrollTo({ top: Math.max(0, y - headerOffset), behavior: 'smooth' })
  }
}

function whatisStep (step: 'left' | 'right') {
  const wrap = whatisWrapRef.value
  if (!wrap) return
  const pages = wrap.querySelector('.whatis-pages')
  const total = pages ? pages.children.length : 3
  const w = wrap.clientWidth || window.innerWidth
  if (!w) return
  const cur = Math.round(wrap.scrollLeft / w)
  const next = step === 'left' ? Math.max(0, cur - 1) : Math.min(total - 1, cur + 1)
  wrap.scrollTo({ left: w * next, behavior: 'smooth' })
}

function onNewsImageError(ev: Event, _index: number) {
  const el = ev.target as HTMLImageElement | null
  if (el && typeof el.src !== 'undefined') el.src = DEFAULT_NEWS_IMAGE
}

function onProjectImageError(ev: Event) {
  const el = ev.target as HTMLImageElement | null
  if (el && typeof el.src !== 'undefined') el.src = DEFAULT_PROJECT_IMAGE
}

function onCourseImageError(ev: Event) {
  const el = ev.target as HTMLImageElement | null
  if (el && typeof el.src !== 'undefined') el.src = DEFAULT_COURSE_IMAGE
}

onMounted(async () => {
  // Use CMS data from useAsyncData (fetched on server or client) if available
  const fromApi = cmsListFromApi.value
  if (Array.isArray(fromApi) && fromApi.length > 0) {
    newsItems.value = fromApi as NewsItem[]
  } else if (apiBase) {
    // Client-side retry (e.g. after hydration) in case useAsyncData failed
    try {
      const cmsUrl = `${apiBase.replace(/\/$/, '')}${CMS_LIST_PATH}`
      const res = await fetch(cmsUrl)
      const data = await res.json().catch(() => null)
      const list = normalizeCmsList(data)
      if (res.ok && list.length > 0) {
        const mapped = list
          .filter((item: { approval_status?: string }) => item.approval_status !== 'rejected')
          .map((item: unknown) => mapCmsToNewsItem(item as Parameters<typeof mapCmsToNewsItem>[0]))
        if (mapped.length > 0) newsItems.value = mapped
      }
    } catch {
      /* fall through to fallback */
    }
  }

  // Fallback: local JSON when API not configured, failed, or returned empty
  if (newsItems.value.length === 0) {
    try {
      const res = await fetch(NEWS_DATA_URL)
      if (res.ok) {
        const data = await res.json()
        const list = Array.isArray(data) ? data : (data?.news ?? data?.items ?? [])
        if (Array.isArray(list) && list.length > 0) {
          newsItems.value = list
        }
      }
    } catch {
      /* keep newsItems empty */
    }
  }

  try {
    const res = await fetch(LANDING_DATA_URL)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data.projects) && data.projects.length > 0) projects.value = data.projects
      if (Array.isArray(data.calendarEvents) && data.calendarEvents.length > 0) {
        calendarEvents.value = data.calendarEvents.slice().sort(
          (a: { date: string }, b: { date: string }) => (a.date || '').localeCompare(b.date || '')
        )
      }
    }
  } catch {
    /* use defaults when JSON missing or invalid */
  }

  try {
    const raw = getStorage(APPROVED_NEWS_KEY)
    const approved = JSON.parse(raw || '[]')
    if (Array.isArray(approved) && approved.length > 0) {
      newsItems.value = [...approved, ...newsItems.value]
    }
  } catch {
    /* keep newsItems as is */
  }

  try {
    const raw = getStorage(CALENDAR_KEY)
    const events = JSON.parse(raw || '[]')
    if (events.length > 0) {
      calendarEvents.value = events.slice().sort(
        (a: { date: string }, b: { date: string }) => (a.date || '').localeCompare(b.date || '')
      )
    }
  } catch {
    /* keep calendarEvents as is */
  }

  const wrap = whatisWrapRef.value
  if (wrap) {
    const w = wrap.clientWidth || window.innerWidth
    if (w) wrap.scrollLeft = w * 1
    window.addEventListener('resize', () => {
      const pages = wrap.querySelector('.whatis-pages')
      const total = pages ? pages.children.length : 3
      const cur = Math.round(wrap.scrollLeft / (wrap.clientWidth || window.innerWidth))
      const idx = Math.max(0, Math.min(cur, total - 1))
      wrap.scrollLeft = (wrap.clientWidth || window.innerWidth) * idx
    })
  }

  window.addEventListener('scroll', () => {
    headerScrolled.value = window.scrollY > 30
  })

  if (typeof document !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate-fade-in')
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.glass-effect, .gradient-border').forEach(card => observer.observe(card))

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).id
          if (id && ['news', 'courses', 'about', 'projects', 'calendar'].includes(id)) {
            setLastHomeSection(id)
          }
        }
      })
    }, { threshold: 0.2, rootMargin: '-20% 0px -20% 0px' })
    ;['news', 'courses', 'about', 'projects', 'calendar'].forEach(id => {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    })
  }

  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  if (hash && ['#news', '#courses', '#about', '#projects', '#calendar'].includes(hash)) {
    nextTick(() => scrollToSection(hash))
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = ''
  }
})

watch(mobileMenuOpen, (open) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})
</script>

<style scoped>
.page-bg-violet {
  background-color: #14082E;
}
/* Hero: photo background (hero_bg.jpg) – cover, centered */
.hero-bg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
/* Figma: hero gradient overlay 135deg #14082E 0%, #231559 50%, #000 100% */
.hero-gradient {
  background: linear-gradient(135deg, #14082E 0%, #231559 50%, #000000 100%);
}
.hero-overlay {
  opacity: 0.72;
}
/* Section moving wires (News, Courses, About, Projects, Calendar) */
.section-wires {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.55;
  z-index: 1;
}
.section-wires-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.section-wire {
  stroke-dasharray: 30 60;
  stroke-dashoffset: 0;
  animation: section-wire-flow 4s linear infinite;
}
.section-wire-2 { animation-delay: -0.7s; }
.section-wire-3 { animation-delay: -1.4s; }
.section-wire-4 { animation-delay: -2.1s; }
.section-wire-5 { animation-delay: -2.8s; }
.section-wire-6 { animation-delay: -3.5s; }
@keyframes section-wire-flow {
  to { stroke-dashoffset: -90; }
}

/* Hero content card – subtle shadow to avoid ghosted duplicate look */
.hero-content-box {
  background: rgba(245, 240, 240, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 16px 14px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (min-width: 640px) {
  .hero-content-box { border-radius: 20px; padding: 20px; gap: 16px; }
}
.hero-title {
  font-size: clamp(1.5rem, 5vw, 3.25rem);
  line-height: 1.1;
  letter-spacing: -0.025em;
  background: none;
}
.hero-btn-primary {
  padding: 10px 18px;
  background: #FFD74A;
  color: #14082E;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  line-height: 1.35;
  letter-spacing: 0.02em;
  border-radius: 8px;
  transition: all 0.3s ease;
}
@media (min-width: 640px) {
  .hero-btn-primary { padding: 12.8px 24px; font-size: 14px; line-height: 21px; letter-spacing: 0.42px; }
}
.hero-btn-primary:hover {
  background: rgba(255, 215, 74, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(255, 215, 74, 0.25);
}
.hero-btn-secondary {
  padding: 9px 18px;
  background: rgba(20, 8, 46, 0.7);
  border: 1px solid rgba(181, 163, 255, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1.35;
  border-radius: 8px;
  transition: all 0.3s ease;
}
@media (min-width: 640px) {
  .hero-btn-secondary { padding: 11.8px 24px; font-size: 14px; line-height: 20px; }
}
.hero-btn-secondary:hover {
  background: rgba(181, 163, 255, 0.1);
  transform: translateY(-2px);
}
.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #382A52;
  border: 1px solid rgba(181, 163, 255, 0.25);
  border-radius: 9999px;
  color: #B5A3FF;
  font-weight: 500;
  font-size: 13px;
  line-height: 1.35;
  transition: all 0.2s ease;
  text-decoration: none;
  flex-shrink: 0;
}
@media (min-width: 640px) {
  .view-all-btn { padding: 10px 20px; font-size: 15px; gap: 8px; }
}
.view-all-btn:hover {
  background: #452f6a;
  border-color: rgba(181, 163, 255, 0.4);
  color: #c4b8ff;
}
.header-bar.scrolled {
  background: rgba(20, 8, 46, 0.98);
}
</style>

<style>
.glass-effect {
  background: rgba(35, 21, 89, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(181, 163, 255, 0.2);
}

/* Figma: CODE CAMP gradient 101.5deg #B5A3FF → #FFD74A (text only, no block) */
.gradient-text {
  display: inline-block;
  background: linear-gradient(101.5deg, #B5A3FF 0%, #FFD74A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.gradient-border {
  position: relative;
  background: linear-gradient(135deg, #14082E, #231559);
}

.gradient-border::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, #B5A3FF, #FFD74A);
  border-radius: inherit;
  z-index: -1;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.projects-grid-wrap {
  max-width: 72rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.project-card {
  max-width: 100%;
}

.project-card-light {
  background: #f8f7f5;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.project-card-light .project-card-body {
  background: #f8f7f5;
}

.project-card .aspect-video { min-height: 0; }

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.text-balance {
  text-wrap: balance;
}

.news-content-wrap {
  max-width: 72rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.news-grid-wrap {
  width: 100%;
  grid-auto-rows: 380px;
}

.news-card-single {
  display: flex;
  flex-direction: column;
  background: #f8f7f5;
  color: #111827;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: none;
  height: 380px;
  max-height: 380px;
  align-self: start;
}

.news-card-image-wrap {
  width: 100%;
  height: 160px;
  overflow: hidden;
  flex-shrink: 0;
  transition: height 0.35s ease;
}

.news-card-single:hover .news-card-image-wrap {
  height: 120px;
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
  overflow: hidden;
}

.news-card-meta {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #9ca3af;
  margin-bottom: 0.35rem;
  order: 2;
  max-height: 2rem;
  overflow: hidden;
  transition: opacity 0.35s ease, max-height 0.35s ease, margin 0.35s ease;
}

.news-card-title {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
  order: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: order 0.35s ease;
}

.news-card-description {
  order: 3;
  position: relative;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  margin: 0;
  padding: 0;
  transition: max-height 0.4s ease, opacity 0.4s ease, margin 0.4s ease, order 0.35s ease;
}

.news-card-description::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2.5rem;
  background: linear-gradient(to bottom, transparent, #f8f7f5);
  pointer-events: none;
}

.news-card-description p {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
  white-space: pre-line;
}

.news-card-single:hover .news-card-meta {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
  pointer-events: none;
}

.news-card-single:hover .news-card-title {
  order: 2;
}

.news-card-single:hover .news-card-description {
  order: 1;
  max-height: 7rem;
  opacity: 1;
  margin-bottom: 0.5rem;
}

.news-card-read {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #111827;
  text-decoration: none;
  order: 4;
  margin-top: auto;
  transition: color 0.3s ease;
}

.news-card-read:hover {
  color: #facc15;
}

/* Courses preview section */
.courses-preview-grid {
  width: 100%;
  grid-auto-rows: 1fr;
}

.course-preview-card {
  display: flex;
  flex-direction: column;
  background: #f8f7f5;
  color: #111827;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.25);
  align-self: start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-preview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.3);
}

.course-preview-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.course-preview-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  flex-shrink: 0;
}

.course-preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.course-preview-card:hover .course-preview-image {
  transform: scale(1.05);
}

.course-preview-badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #FFD74A;
  color: #14082E;
  border-radius: 0.25rem;
}

.course-preview-body {
  padding: 1rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.course-preview-title {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.35;
}

.course-preview-instructor {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.course-preview-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.course-preview-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.course-preview-cta {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #14082E;
  margin-top: auto;
  transition: color 0.3s ease;
}

.course-preview-card:hover .course-preview-cta {
  color: #B5A3FF;
}

#about.about-section {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
@media (max-width: 767px) {
  #about.about-section { overflow-x: hidden; }
}

#about.about-section .section-title-wrap {
  flex-shrink: 0;
}

.whatis-wrap {
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
}

.whatis-wrap::-webkit-scrollbar { height: 8px; }
.whatis-wrap::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
.whatis-wrap::-webkit-scrollbar-thumb { background: #3D2A6E; border-radius: 4px; }

.whatis-pages {
  display: flex;
  height: 100%;
  min-height: 380px;
}

.whatis-page {
  width: 100%;
  min-width: 100%;
  flex-shrink: 0;
  height: 100%;
  min-height: inherit;
  background: #14082E;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 32px 24px 48px;
  box-sizing: border-box;
  overflow-y: auto;
}

.whatis-page-inner {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 32px 48px;
}

.whatis-content {
  flex: 1 1 340px;
  max-width: 480px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

/* Mobile: one slide per view (no peek), align to other sections (left, same container width) */
@media (max-width: 767px) {
  .whatis-wrap {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    padding: 0;
  }
  .whatis-page {
    width: 100%;
    min-width: 100%;
    box-sizing: border-box;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .whatis-page-inner {
    width: 100%;
    max-width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .whatis-content {
    flex: 0 0 auto;
    width: 100%;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }
  .whatis-content-mobile-center {
    text-align: left;
    align-items: flex-start;
  }
  .whatis-content-mobile-center .whatis-buttons {
    justify-content: flex-start;
  }
}

.whatis-title {
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #fff;
}

.whatis-content p {
  font-size: 0.875rem;
  line-height: 1.55;
  color: #fff;
}

.whatis-content p strong { font-weight: 500; }

.whatis-images {
  flex: 0 1 420px;
  max-width: 480px;
  min-width: 0;
  position: relative;
  height: 400px;
}

.whatis-img-card {
  position: absolute;
  width: 78%;
  height: 280px;
  min-height: 220px;
  background: #14082E;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 12px 40px rgba(0,0,0,0.25);
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease, z-index 0s;
}

.whatis-img-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 8px 24px rgba(181, 163, 255, 0.12);
  z-index: 20;
}

.whatis-img-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.whatis-img-card:first-child {
  top: 0;
  left: 0;
  border: 2px solid rgba(120, 200, 140, 0.55);
  z-index: 1;
}

.whatis-img-card:first-child:hover {
  z-index: 25;
}

.whatis-img-card:last-child {
  left: 58%;
  top: 34%;
  border: 2px solid rgba(220, 120, 120, 0.55);
  z-index: 2;
}

.whatis-img-card:last-child:hover {
  z-index: 25;
}

.whatis-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-family: inherit;
  font-weight: 500;
  font-size: 0.875rem;
  color: #fff;
  background: #231559;
  border: 1px solid #3D2A6E;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}

.whatis-btn:hover {
  background: #2e1d6b;
  border-color: #5a3d9e;
}

.whatis-buttons { display: flex; gap: 12px; flex-wrap: wrap; }

.header-bar {
  background: rgba(20, 8, 46, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.header-bar::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 74, 0.35), rgba(181, 163, 255, 0.35), transparent);
  opacity: 0.8;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.nav-link:hover {
  color: #fff;
  border-bottom-color: #B5A3FF;
}

.nav-cta {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: #FFD74A;
  color: #14082E;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.03em;
  border-radius: 9999px;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}

.nav-cta:hover {
  background: #ffe066;
  box-shadow: 0 4px 20px rgba(255, 215, 74, 0.4);
  transform: translateY(-1px);
}

/* Header search bar – modern glass style */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.header-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
}
.header-search-icon {
  position: absolute;
  left: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  pointer-events: none;
  transition: color 0.2s ease;
}
.header-search-input {
  width: 100%;
  min-width: 11rem;
  max-width: 14rem;
  padding: 0.5rem 1rem 0.5rem 2.25rem;
  background: rgba(56, 42, 82, 0.7);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 9999px;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.header-search-input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}
.header-search-input:hover {
  background: rgba(69, 47, 106, 0.8);
  border-color: rgba(181, 163, 255, 0.3);
}
.header-search-input:focus {
  border-color: rgba(181, 163, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(181, 163, 255, 0.15);
}
.header-search-wrap:focus-within .header-search-icon {
  color: rgba(181, 163, 255, 0.9);
}
/* Mobile menu search */
.mobile-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.75rem;
}
.mobile-search-icon {
  position: absolute;
  left: 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  pointer-events: none;
}
.mobile-search-input {
  width: 100%;
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(181, 163, 255, 0.25);
  border-radius: 12px;
  color: #fff;
  font-size: 0.9375rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.mobile-search-input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}
.mobile-search-input:focus {
  border-color: rgba(181, 163, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(181, 163, 255, 0.12);
}

/* Force violet (#14082E) on all sections except hero – avoids Tailwind purge/override issues */
.section-bg-violet {
  background-color: #14082E !important;
}

.section-same-size {
  min-height: 100vh;
  box-sizing: border-box;
}

.section-title-wrap {
  margin-bottom: 3rem;
}

.section-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #B5A3FF;
  margin-bottom: 0.5rem;
}

/* Figma: section heading 30px, Bold, -0.6px letter-spacing */
.section-heading {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.25;
  color: #fff;
  margin-bottom: 0.35rem;
}

.section-sub {
  font-size: 13px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.6);
  max-width: 42rem;
  overflow-wrap: break-word;
}

@media (min-width: 640px) {
  .section-heading { font-size: 26px; line-height: 1.3; margin-bottom: 0.5rem; }
  .section-sub { font-size: 14px; line-height: 1.5; }
}

@media (min-width: 768px) {
  .section-heading { font-size: 30px; line-height: 36px; letter-spacing: -0.6px; }
  .section-sub { font-size: 16px; line-height: 24px; }
}

@media (max-width: 900px) {
  .whatis-page-inner { flex-direction: column; align-items: center; gap: 24px; }
  .whatis-content { max-width: 100%; }
  .whatis-images { max-width: 440px; height: 380px; }
  .whatis-img-card { width: 75%; height: 240px; min-height: 200px; }
  .whatis-img-card:last-child { left: 55%; top: 30%; }
}

@media (max-width: 600px) {
  .whatis-images {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    height: auto;
    min-height: 320px;
    position: relative;
    max-width: 100%;
  }
  .whatis-img-card {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    width: 85% !important;
    max-width: 320px;
    height: 200px;
    min-height: 180px;
  }
  .whatis-img-card:first-child,
  .whatis-img-card:last-child {
    left: auto;
    top: auto;
  }
}

.mobile-menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: 39;
  background: rgba(0, 0, 0, 0.25);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.mobile-menu-backdrop.open {
  opacity: 1;
  pointer-events: auto;
}

@media (min-width: 768px) {
  .mobile-menu-backdrop { display: none !important; }
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  max-width: 85vw;
  z-index: 40;
  background: rgba(20, 8, 46, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 5rem 1.5rem 2rem;
  overflow-y: auto;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.3);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  pointer-events: none;
  text-align: center;
}

.mobile-menu.open {
  transform: translateX(0);
  pointer-events: auto;
}

.mobile-menu .mobile-nav-link {
  display: block;
  padding: 0.75rem 0;
  font-size: 0.9375rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: color 0.2s;
  text-align: center;
}

.mobile-menu .mobile-nav-link:hover { color: #fff; }

.mobile-menu .mobile-nav-cta {
  display: inline-block;
  width: fit-content;
  margin-top: 0.75rem;
  padding: 0.35rem 0.75rem;
  background: #FFD74A;
  color: #14082E;
  font-weight: 700;
  font-size: 0.75rem;
  text-align: center;
  border-radius: 9999px;
  text-decoration: none;
}

.mobile-menu-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none !important;
    transform: none;
  }
}

/* Mobile: standard smaller typography and spacing */
@media (max-width: 767px) {
  .page-bg-violet { overflow-x: hidden; font-size: 14px; }
  .section-heading { font-size: 1.125rem; line-height: 1.3; margin-bottom: 0.25rem; }
  .section-sub { font-size: 0.75rem; line-height: 1.35; }
  .section-title-wrap { margin-bottom: 1.25rem; }
  .view-all-btn { font-size: 0.8125rem; padding: 0.5rem 0.875rem; }
  #news.news-section { overflow-x: hidden; }
  .news-content-wrap { max-width: 100%; min-width: 0; }
  #newsGrid { gap: 1rem; min-width: 0; width: 100%; }
  .news-card-single { max-width: 290px; margin-left: auto; margin-right: auto; }
  .whatis-pages { min-height: 300px; }
  .whatis-page { padding: 20px 1rem 32px; }
  .whatis-content { padding: 14px; }
  .whatis-title { font-size: 1rem; }
  .whatis-content p { font-size: 0.8125rem; }
  .whatis-images { height: 260px; max-width: 100%; }
  .whatis-img-card { width: 70%; height: 170px; min-height: 150px; }
  .whatis-img-card:last-child { left: 50%; top: 28%; }
  .whatis-btn { padding: 6px 12px; font-size: 0.75rem; }
  .calendar-month-year { font-size: 0.9375rem; }
  .calendar-toolbar { padding: 0.5rem 0.75rem; gap: 0.5rem; }
  .calendar-today-btn { padding: 6px 10px; font-size: 0.75rem; }
  .calendar-nav-btn { width: 32px; height: 32px; font-size: 0.75rem; }
  .calendar-day-headers div { padding: 0.5rem 0; font-size: 0.625rem; }
  .calendar-cell { padding: 0.35rem; min-height: 64px; }
  .calendar-cell-date { font-size: 0.75rem; }
  .calendar-event-primary, .calendar-event-secondary { font-size: 0.625rem; padding: 2px 6px; }
  .calendar-cell-today { width: 22px; height: 22px; font-size: 0.75rem; }
  .container { padding-left: 1rem; padding-right: 1rem; }
  .project-card { max-width: 280px; margin-left: auto; margin-right: auto; }
  .project-card h3 { font-size: 0.9375rem; }
  .project-card p { font-size: 0.6875rem; }
  .hero-title { font-size: 1.5rem; }
  .hero-content-box .text-sm { font-size: 0.8125rem; }
  .hero-content-box .text-xs { font-size: 0.6875rem; }
  .hero-btn-primary, .hero-btn-secondary { font-size: 0.8125rem; padding: 8px 14px; }
  .nav-link, .mobile-nav-link { font-size: 0.875rem; }
  .nav-cta, .mobile-nav-cta { font-size: 0.75rem; }
  .footer-heading { font-size: 0.5625rem; }
  .footer-link, .footer-website { font-size: 0.75rem; }
  .footer-address, .footer-copy, .footer-tagline, .footer-inquiry { font-size: 0.6875rem; }
  .footer-bottom p { font-size: 0.6875rem; }
}

@media (max-width: 480px) {
  .section-heading { font-size: 1rem; }
  .section-sub { font-size: 0.6875rem; }
  .view-all-btn { font-size: 0.75rem; padding: 0.4rem 0.75rem; }
  .whatis-page { padding: 16px 0.75rem 24px; }
  .whatis-content { padding: 12px; }
  .whatis-title { font-size: 0.9375rem; }
  .whatis-content p { font-size: 0.75rem; }
  .whatis-btn { font-size: 0.6875rem; padding: 5px 10px; }
  .whatis-img-card { width: 85% !important; max-width: 280px; height: 150px; min-height: 130px; }
  .footer-heading { font-size: 0.5rem; }
  .footer-link, .footer-website { font-size: 0.6875rem; }
  .footer-address, .footer-copy, .footer-tagline, .footer-inquiry { font-size: 0.625rem; }
  .footer-logo { height: 1.25rem; }
  .footer-bottom p { font-size: 0.625rem; }
  .calendar-month-year { font-size: 0.875rem; }
  .project-card h3 { font-size: 0.875rem; }
  .project-card p { font-size: 0.625rem; }
}

/* Community Calendar: monthly grid */
.calendar-toolbar { background: rgba(35, 21, 89, 0.95); }
.calendar-today-btn {
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background: rgba(35, 21, 89, 0.95);
  border: 1px solid rgba(181, 163, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  transition: background 0.2s, border-color 0.2s;
}
.calendar-today-btn:hover {
  background: rgba(45, 28, 110, 0.98);
  border-color: rgba(181, 163, 255, 0.3);
}
.calendar-nav-btn {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(35, 21, 89, 0.95);
  border: 1px solid rgba(181, 163, 255, 0.2);
  transition: background 0.2s, color 0.2s;
}
.calendar-nav-btn:hover {
  background: rgba(45, 28, 110, 0.98);
  color: #fff;
}
.calendar-month-year { color: #fff; }
.calendar-day-headers { background: rgba(35, 21, 89, 0.95); }
.calendar-grid { background: rgba(35, 21, 89, 0.92); }
.calendar-cell { background: rgba(35, 21, 89, 0.95); }
.calendar-cell:last-child { border-right: none; }
.calendar-cell-today {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(181, 163, 255, 0.35);
  color: #fff;
  font-weight: 700;
}
.calendar-event-primary {
  background: #3D2A6E;
  color: #B5A3FF;
  border-left: 3px solid #B5A3FF;
}
.calendar-event-secondary {
  background: rgba(76, 175, 80, 0.25);
  color: #81C784;
  border-left: 3px solid #4CAF50;
}

@media (hover: none) {
  .news-card-flip:hover .news-card-inner { transform: none; }
}

/* Footer: compact layout */
.footer-main {
  padding-top: 1.5rem;
  padding-bottom: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #14082E;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  width: 100%;
  padding-bottom: 1rem;
}
@media (min-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 1.25rem;
    row-gap: 1rem;
  }
}
.footer-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  text-align: center;
}
.footer-logo {
  height: 1.75rem;
  width: auto;
  object-fit: contain;
  margin-bottom: 0.1rem;
  opacity: 0.95;
}
.footer-copy {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 0.2rem;
}
.footer-heading {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #B5A3FF;
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
}
.footer-col .footer-heading:first-of-type { margin-top: 0; }
.footer-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}
.footer-link {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  transition: color 0.2s;
  width: fit-content;
}
.footer-link:hover {
  color: #B5A3FF;
}
.footer-login {
  font-weight: 600;
  color: #B5A3FF;
  margin-top: 0.25rem;
}
.footer-login:hover {
  color: #EEEAFF;
}
.footer-website {
  font-weight: 500;
  font-size: 0.875rem;
  color: #B5A3FF;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-website:hover {
  color: #EEEAFF;
}
.footer-tagline {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 0;
}
.footer-address {
  font-style: normal;
  font-size: 0.75rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}
.footer-social {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.footer-social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.375rem;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  transition: background 0.2s, color 0.2s;
}
.footer-social-link:hover {
  background: rgba(181, 163, 255, 0.2);
  color: #B5A3FF;
}
.footer-inquiry {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
}
.footer-inquiry-link {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-inquiry-link:hover {
  color: #B5A3FF;
}
.footer-bottom {
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}
.footer-bottom p {
  font-size: 0.75rem;
  margin: 0;
}
</style>
