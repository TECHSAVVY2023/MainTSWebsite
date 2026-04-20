<template>
  <footer id="main-footer" class="relative overflow-hidden bg-white pt-14 pb-8 sm:pt-16">
    <!-- Top bridge divider matching HeroSection stats trust bar -->
    <div class="absolute top-0 left-0 right-0 z-10 w-full h-px bg-gradient-to-r from-transparent via-violet-50 to-transparent" />

    <div class="container mx-auto relative z-10">
      <div class="mb-14 grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
        
        <!-- Column 1: Brand -->
        <div class="flex items-center justify-center text-center lg:justify-start lg:text-left">
          <div class="max-w-full">
            <NuxtLink to="/" class="mx-auto mb-6 flex w-fit shrink-0 items-center lg:mx-0" aria-label="Home">
            <img :src="logoUrl" alt="TechSavvy" class="h-20 w-auto sm:h-24" />
          </NuxtLink>
          <div class="space-y-3">
            <p class="text-sm font-bold leading-relaxed text-[#1a0533] sm:text-[0.9375rem]">
              Think Smart, Code Smarter.<br />
              <span class="text-violet-600">Powering Businesses Through Technology.</span>
            </p>
            <!-- <p class="text-xs text-gray-400 font-medium leading-relaxed ">
              Join the Tech Savvy community and level up your fullstack journey.
            </p> -->
          </div>
          </div>
        </div>

        <!-- Column 2: Navigate -->
        <div class="flex flex-col items-center gap-6 text-center lg:items-start lg:pl-16 lg:text-left">
          <h3 class="text-[10px] font-black tracking-[0.2em] uppercase text-violet-400">Navigate</h3>
          <nav class="flex flex-col items-center gap-3.5 lg:items-start" aria-label="Footer navigation">
            <NuxtLink to="/" class="text-[13px] font-semibold text-[#1a0533] no-underline transition-colors hover:text-violet-600">Home</NuxtLink>
            <a href="#news" class="text-[13px] font-semibold text-[#1a0533] no-underline transition-colors hover:text-violet-600" @click.prevent="scrollToSection('#news')">News</a>
            <NuxtLink to="/courses" class="text-[13px] font-semibold text-[#1a0533] no-underline transition-colors hover:text-violet-600">Courses</NuxtLink>
            <a href="#merch" class="text-[13px] font-semibold text-[#1a0533] no-underline transition-colors hover:text-violet-600" @click.prevent="scrollToSection('#merch')">Merch</a>
            <a href="#events-reminders" class="text-[13px] font-semibold text-[#1a0533] no-underline transition-colors hover:text-violet-600" @click.prevent="scrollToSection('#events-reminders')">Events Reminder</a>
            <a href="#community-sponsors" class="text-[13px] font-semibold text-[#1a0533] no-underline transition-colors hover:text-violet-600" @click.prevent="scrollToSection('#community-sponsors')">Sponsors</a>
            <a href="#community-people" class="text-[13px] font-semibold text-[#1a0533] no-underline transition-colors hover:text-violet-600" @click.prevent="scrollToSection('#community-people')">Community</a>
          </nav>
        </div>

        <!-- Column 3: Legal & Resources -->
        <div class="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <h3 class="text-[10px] font-black tracking-[0.2em] uppercase text-violet-400">Legal & contact</h3>
          <nav class="flex flex-col items-center gap-3.5 lg:items-start">
            <NuxtLink to="/privacy" class="text-[13px] font-semibold text-[#1a0533] no-underline transition-colors hover:text-violet-600">Privacy Policy</NuxtLink>
            <NuxtLink to="/terms" class="text-[13px] font-semibold text-[#1a0533] no-underline transition-colors hover:text-violet-600">Terms of Use</NuxtLink>
            <NuxtLink to="/contact" class="text-[13px] font-semibold text-[#1a0533] no-underline transition-colors hover:text-violet-600">Contact us</NuxtLink>
            <NuxtLink to="/login" class="inline-flex items-center gap-2 text-[13px] font-black text-violet-600 no-underline mt-2 transition-all hover:translate-x-1">
              Login to Portal
              <i class="fas fa-arrow-right text-[10px]"></i>
            </NuxtLink>
          </nav>
        </div>

        <!-- Column 4: Find Us -->
        <div class="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <h3 class="text-[10px] font-black tracking-[0.2em] uppercase text-violet-400">Find us</h3>
          
          <!-- Location Area styled like Hero card -->
          <address class="not-italic flex flex-col gap-3">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center shadow-sm">
                <i class="fas fa-map-marker-alt text-violet-600 text-sm"></i>
              </div>
              <div class="space-y-1">
                <p class="text-[11px] text-[#1a0533] font-bold leading-tight">
                  Oracle Press International Inc.<br />
                  Workflow Co-Working Space<br />
                  Mercury Drug/SSS, Ozamiz City
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shadow-sm">
                <i class="fas fa-paper-plane text-amber-600 text-sm"></i>
              </div>
              <a href="mailto:info@techsavvies.space" class="text-[11px] font-bold text-violet-600 no-underline transition-colors hover:text-violet-700">info@techsavvies.space</a>
            </div>
          </address>

          <div class="flex items-center gap-2.5 pt-2">
            <a href="#" class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 text-sm transition-all duration-300 hover:bg-violet-600 hover:text-white hover:shadow-[0_8px_20px_rgba(124,58,237,0.3)] hover:-translate-y-0.5" aria-label="Facebook"><i class="fab fa-facebook-f" /></a>
            <a href="#" class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 text-sm transition-all duration-300 hover:bg-violet-600 hover:text-white hover:shadow-[0_8px_20px_rgba(124,58,237,0.3)] hover:-translate-y-0.5" aria-label="Twitter"><i class="fab fa-twitter" /></a>
            <a href="#" class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 text-sm transition-all duration-300 hover:bg-violet-600 hover:text-white hover:shadow-[0_8px_20px_rgba(124,58,237,0.3)] hover:-translate-y-0.5" aria-label="GitHub"><i class="fab fa-github" /></a>
            <a href="#" class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 text-sm transition-all duration-300 hover:bg-violet-600 hover:text-white hover:shadow-[0_8px_20px_rgba(124,58,237,0.3)] hover:-translate-y-0.5" aria-label="LinkedIn"><i class="fab fa-linkedin-in" /></a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="relative flex flex-col items-center justify-between gap-3 pt-8 text-center sm:flex-row sm:text-left">
        <!-- Thin divider matching the stats bar -->
        <div class="absolute top-0 left-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-violet-50 to-transparent" />
        
        <p class="text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.1em] text-gray-400">
          © {{ currentYear }} TECH SAVVY Community · <span class="text-violet-600">Code Camp</span>
        </p>
        
        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <span class="text-[10px] font-bold uppercase tracking-widest text-[#1a0533]/60">All Rights Reserved</span>
          <a href="https://www.techsavvies.space" target="_blank" rel="noopener" class="text-[10px] font-bold uppercase tracking-widest text-violet-400 hover:text-violet-600 transition-colors">techsavvies.space</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { logoUrl } = useAppLogo()
const currentYear = new Date().getFullYear()

defineProps<{
  scrollToSection: (id: string) => void
}>()
</script>
