<template>
  <div class="font-inter text-dark min-h-screen bg-white">
    <AppHeader :scroll-to-section="landing.scrollToSection" @search="landing.onHeaderSearch" />
    <HeroSection :scroll-to-section="landing.scrollToSection" />
    <NewsSection :items="newsItemsForSection" :default-image="landing.DEFAULT_NEWS_IMAGE" />
    <CoursesSection :courses="coursesForSection" :default-image="landing.DEFAULT_COURSE_IMAGE" />
    <AboutSection />
    <ProjectsSection
      :locked="!isLoggedIn"
      :projects="projectsForSection"
      :default-image="landing.DEFAULT_PROJECT_IMAGE"
    />
    <MerchSection />
    
    <CommunityHubSection
      :reminders="eventRemindersForSection"
      :speakers="speakersForSection"
      :sponsors="sponsorsForSection"
      :partners="partnersForSection"
    />
    <ClientOnly>
      <FeaturedBusiness
        :sponsors="sponsorsForSection"
        :partners="partnersForSection"
      />
    </ClientOnly>
    
    <AppFooter :scroll-to-section="landing.scrollToSection" />
    
    <!-- Floating Scroll to Top FAB -->
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn, init } = useAuth()
onMounted(() => init())

const {
  landing,
  newsItemsForSection,
  coursesForSection,
  projectsForSection,
  eventRemindersForSection,
  speakersForSection,
  sponsorsForSection,
  partnersForSection
} = useLandingPage()
</script>
