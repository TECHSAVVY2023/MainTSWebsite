<template>
  <footer class="relative overflow-hidden pt-6 pb-3 border-t border-white/10 bg-violet">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 w-full pb-4">
        <!-- Column 1 -->
        <div class="flex flex-col items-center gap-0.5 text-center">
          <img :src="logoUrl" alt="CODEDEV Solutions" class="h-7 w-auto object-contain mb-0.5 opacity-95" />
          <p class="text-xs text-white/55 mb-0.5">© 2025 TECH SAVVY Community</p>
          <h3 class="text-[0.625rem] font-semibold tracking-widest uppercase text-accent-purple mt-2 mb-0.5">Navigate</h3>
          <nav class="flex flex-col items-center gap-0.5" aria-label="Footer navigation">
            <NuxtLink to="/" class="text-[0.8125rem] text-white/75 no-underline transition-colors hover:text-accent-purple w-fit">Home</NuxtLink>
            <a href="#news" class="text-[0.8125rem] text-white/75 no-underline transition-colors hover:text-accent-purple w-fit" @click.prevent="scrollToSection('#news')">News</a>
            <NuxtLink to="/courses" class="text-[0.8125rem] text-white/75 no-underline transition-colors hover:text-accent-purple w-fit">Courses</NuxtLink>
            <a href="#calendar" class="text-[0.8125rem] text-white/75 no-underline transition-colors hover:text-accent-purple w-fit" @click.prevent="scrollToSection('#calendar')">Calendar</a>
            <NuxtLink to="/" class="text-[0.8125rem] text-white/75 no-underline transition-colors hover:text-accent-purple w-fit">Community</NuxtLink>
            <NuxtLink to="/login" class="text-[0.8125rem] font-semibold text-accent-purple no-underline mt-1 transition-colors hover:text-accent-light w-fit">Login</NuxtLink>
          </nav>
        </div>
        <!-- Column 2 -->
        <div class="flex flex-col items-center gap-0.5 text-center">
          <h3 class="text-[0.625rem] font-semibold tracking-widest uppercase text-accent-purple mb-0.5">Website</h3>
          <a href="https://www.techsavvies.space" target="_blank" rel="noopener" class="font-medium text-sm text-accent-purple no-underline transition-colors hover:text-accent-light">www.techsavvies.space</a>
          <p class="text-xs text-white/55 mb-0">Freelance Dev Community</p>
          <h3 class="text-[0.625rem] font-semibold tracking-widest uppercase text-accent-purple mt-2 mb-0.5">Legal & contact</h3>
          <nav class="flex flex-col items-center gap-0.5">
            <NuxtLink to="/privacy" class="text-[0.8125rem] text-white/75 no-underline transition-colors hover:text-accent-purple w-fit">Privacy Policy</NuxtLink>
            <NuxtLink to="/terms" class="text-[0.8125rem] text-white/75 no-underline transition-colors hover:text-accent-purple w-fit">Terms of Use</NuxtLink>
            <NuxtLink to="/contact" class="text-[0.8125rem] text-white/75 no-underline transition-colors hover:text-accent-purple w-fit">Contact us</NuxtLink>
          </nav>
        </div>
        <!-- Column 3 -->
        <div class="flex flex-col items-center gap-0.5 text-center">
          <h3 class="text-[0.625rem] font-semibold tracking-widest uppercase text-accent-purple mb-0.5">Find us</h3>
          <address class="not-italic text-xs leading-relaxed text-white/60 m-0">
            Oracle Press International Inc.<br />
            Workflow Co-Working Space<br />
            In front of Ozamiz City Hall, 2nd floor of Mercury Drug/SSS<br />
            Ozamiz, Philippines
          </address>
          <div class="flex justify-center gap-2 mt-1 mb-1">
            <a href="#" class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/10 text-white/70 text-xs transition-colors hover:bg-accent-purple/20 hover:text-accent-purple" aria-label="Facebook"><i class="fab fa-facebook-f" /></a>
            <a href="#" class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/10 text-white/70 text-xs transition-colors hover:bg-accent-purple/20 hover:text-accent-purple" aria-label="Twitter"><i class="fab fa-twitter" /></a>
            <a href="#" class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/10 text-white/70 text-xs transition-colors hover:bg-accent-purple/20 hover:text-accent-purple" aria-label="GitHub"><i class="fab fa-github" /></a>
            <a href="#" class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/10 text-white/70 text-xs transition-colors hover:bg-accent-purple/20 hover:text-accent-purple" aria-label="LinkedIn"><i class="fab fa-linkedin-in" /></a>
          </div>
          <p class="text-xs text-white/45 m-0">
            For inquiries: <a href="mailto:info@techsavvies.space" class="text-white/65 no-underline transition-colors hover:text-accent-purple">info@techsavvies.space</a>
          </p>
        </div>
      </div>
      <div class="pt-3 border-t border-white/10 text-center">
        <p class="text-white/40 text-sm m-0">© 2025 TECH SAVVY Community · Code Camp</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { logoUrl } = useAppLogo()

defineProps<{
  scrollToSection: (id: string) => void
}>()
</script>
