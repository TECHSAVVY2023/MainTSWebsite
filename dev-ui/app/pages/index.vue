<template>
  <div class="font-inter text-white min-h-screen bg-violet">
    <AppHeader :scroll-to-section="landing.scrollToSection" @search="landing.onHeaderSearch" />
    <HeroSection :scroll-to-section="landing.scrollToSection" />
    <NewsSection :items="newsItemsForSection" :default-image="landing.DEFAULT_NEWS_IMAGE" />
    <CoursesSection :courses="coursesForSection" :default-image="landing.DEFAULT_COURSE_IMAGE" />
    <AboutSection />
    <ProjectsSection :projects="projectsForSection" :default-image="landing.DEFAULT_PROJECT_IMAGE" />
    <CalendarSection :events="eventsForSection" />
    <AppFooter :scroll-to-section="landing.scrollToSection" />
  </div>
</template>

<script setup lang="ts">
const { landing, newsItemsForSection, coursesForSection, projectsForSection, eventsForSection } = useLandingPage()
</script>
