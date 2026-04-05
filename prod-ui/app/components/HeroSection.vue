<template>
  <section
    class="relative min-h-screen overflow-hidden flex flex-col bg-white"
    @mousemove="handleMouseMove"
  >
    <!-- Subtle star particles -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <span
        v-for="i in 40"
        :key="i"
        class="absolute rounded-full bg-violet-400 animate-pulse opacity-0"
        :style="starStyle()"
      />
    </div>

    <!-- Cursor glow -->
    <div
      class="pointer-events-none fixed z-10 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)] transition-transform duration-75"
      :style="{ transform: `translate(${mouseX - 144}px, ${mouseY - 144}px)` }"
    />

    <!-- Floating blobs -->
    <!-- <div class="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-violet-100 blur-[100px] pointer-events-none" />
    <div class="absolute -bottom-20 -right-20 w-[420px] h-[420px] rounded-full bg-violet-50 blur-[80px] pointer-events-none" />
    <div class="absolute top-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-amber-50 blur-[60px] pointer-events-none" /> -->

    <!-- Main content -->
    <div class="relative z-20 flex flex-1 items-center">
      <div class="container mx-auto px-6 lg:px-16 py-24 pt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <!-- Left: Text -->
        <div class="text-left">

          <!-- Season badge -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-600 mb-6 shadow-[0_4px_16px_rgba(124,58,237,0.3)]">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span class="text-xs font-bold tracking-[0.2em] uppercase text-white">Season 4 · 2026</span>
          </div>

          <!-- Headline -->
          <h1 class="font-black leading-tight text-[#1a0533] mb-5 text-[clamp(2.2rem,5.5vw,4rem)]">
            TECHSAVVY,<br />
            <span class="bg-[linear-gradient(90deg,#7c3aed,#a855f7)] bg-clip-text text-transparent">
              CODE CAMP.
            </span>
          </h1>

          <!-- Sub-tagline -->
          <p class="text-base sm:text-lg text-violet-700 mb-3 font-semibold tracking-wide">
            Code · Create · Connect
          </p>

          <!-- Description -->
          <p class="text-sm sm:text-base text-gray-500 max-w-lg whitespace-nowrap">
            Think Smart, Code Smarter and Powering Businesses Through Technology.
         
          </p>
          <p class="text-sm sm:text-base text-gray-500 mb-10 max-w-lg">
 Join the Tech Savvy community and level up your fullstack journey.
          </p>
  
          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              class="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-violet-600 text-white font-bold text-sm tracking-wide shadow-[0_8px_24px_rgba(124,58,237,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-[0_12px_32px_rgba(124,58,237,0.45)] cursor-pointer"
            >
              Join Community
            </button>
            <a
              href="#news"
              class="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-violet-700 font-semibold text-sm border-2 border-violet-200 transition-all duration-300 hover:border-violet-500 hover:bg-violet-50 hover:-translate-y-0.5 no-underline"
              @click.prevent="props.scrollToSection('#news')"
            >
              Learn More
            </a>
          </div>

          <!-- Social proof -->
          <div class="mt-10 flex items-center gap-3">
            <div class="flex -space-x-2">
              <div
                v-for="(color, n) in avatarColors"
                :key="n"
                class="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                :style="{ background: color }"
              />
            </div>
            <p class="text-xs text-gray-400">
              Join <span class="text-violet-700 font-semibold">200+</span> students already enrolled
            </p>
          </div>

        </div>

        <!-- Right: Floating card visual -->
        <div class="hidden lg:flex items-center justify-center relative">

          <!-- Glow ring -->
          <div class="absolute w-[600px] h-[600px] rounded-full border-2 border-violet-100 bg-violet-50/50" />

          <!-- Main card -->
          <div class="relative z-10 bg-white border border-violet-100 rounded-3xl p-7 w-8/12 shadow-[0_24px_64px_rgba(124,58,237,0.12),0_4px_16px_rgba(124,58,237,0.06)] animate-[cardFloat_6s_ease-in-out_infinite]">

            <!-- Card header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <i class="fas fa-globe text-violet-600 mr-0.5"></i>
                <span class="text-[#1a0533] font-bold text-sm">Code Camp 2026</span>
              </div>
              <span class="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-bold">Season 4</span>
            </div>

            <!-- 3D Stacked Slideshow Centerpiece -->
            <div class="relative mb-5 h-80 group/carousel select-none">
              
              <!-- Top Indicators: Pulse + Counter -->
              <div class="absolute top-2 left-0 right-0 z-[40] flex items-center justify-between px-3 pointer-events-none">
                <div class="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span class="text-[9px] font-bold text-white uppercase tracking-tighter">Latest Post</span>
                </div>
                <div class="text-[10px] font-black text-white/90 tracking-widest bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                  0{{ currentSlide + 1 }} / 0{{ cardHighlights.length }}
                </div>
              </div>

              <!-- Perspective Stack -->
              <div class="relative h-full w-full flex items-center justify-center perspective-[1000px]">
                <TransitionGroup name="slide-stack">
                  <div
                    v-for="(img, idx) in cardHighlights"
                    v-show="idx === currentSlide"
                    :key="idx"
                    class="absolute inset-0 z-30 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(124,58,237,0.25)] border border-violet-100/50 bg-white"
                  >
                    <img :src="img" class="w-full h-full object-cover" />
                    <!-- Subtle glass overlay -->
                    <div class="absolute inset-0 bg-violet-600/5" />
                  </div>
                  
                  <!-- Phantom "Next" Slide (Visual Depth) -->
                  <div
                    v-show="true"
                    :key="'next-' + ((currentSlide + 1) % cardHighlights.length)"
                    class="absolute inset-0 scale-[0.88] translate-x-4 translate-y-1 z-20 opacity-30 blur-[1px] rounded-2xl overflow-hidden grayscale-[30%]"
                  >
                    <img :src="cardHighlights[(currentSlide + 1) % cardHighlights.length]" class="w-full h-full object-cover" />
                  </div>
                </TransitionGroup>
              </div>

              <!-- Navigation Arrows -->
              <button
                @click="prevSlide"
                class="absolute left-[-12px] top-1/2 -translate-y-1/2 z-40 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 border border-violet-100 shadow-lg text-violet-600 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-violet-600 hover:text-white cursor-pointer active:scale-90"
              >
                <i class="fas fa-chevron-left text-xs" />
              </button>
              <button
                @click="nextSlide"
                class="absolute right-[-12px] top-1/2 -translate-y-1/2 z-40 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 border border-violet-100 shadow-lg text-violet-600 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-violet-600 hover:text-white cursor-pointer active:scale-90"
              >
                <i class="fas fa-chevron-right text-xs" />
              </button>

              <!-- Animated Progress Bar (Bottom) -->
              <div class="absolute bottom-2 left-4 right-4 z-40 h-1 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden">
                <div
                  ref="progressBar"
                  class="h-full bg-white transition-all duration-[4000ms] shadow-[0_0_8px_white]"
                  :key="currentSlide"
                  :style="{ width: '100%' }"
                />
              </div>
            </div>

            <!-- Address Area -->
            <div class="mb-4 p-3.5 bg-violet-50/50 border border-violet-100 rounded-2xl flex items-center gap-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-violet-100 flex items-center justify-center shadow-sm">
                <i class="fas fa-map-marker-alt text-violet-600 text-sm"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400 mb-0.5">Where to find us</p>
                <p class="text-[11px] text-[#1a0533] font-bold leading-tight line-clamp-2">
                  Workflow Co-Working Space Ozamiz Misamis Occidental
                </p>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="tag in tags"
                :key="tag"
                class="text-[10px] px-2.5 py-0.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 font-bold tracking-wide"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Floating badge 1 -->
          <div class="absolute top-[-20px] right-[-30px] flex items-center gap-2 bg-white border border-violet-100 rounded-2xl px-3.5 py-2.5 shadow-[0_8px_24px_rgba(124,58,237,0.12)] animate-[badgeFloat1_5s_ease-in-out_infinite]">
            <span class="text-lg">⚡</span>
            <div>
              <p class="text-[#1a0533] text-xs font-bold leading-tight">Fullstack</p>
              <p class="text-gray-400 text-[10px] leading-tight">Road to Dev</p>
            </div>
          </div>

          <!-- Floating badge 2 -->
          <div class="absolute bottom-[-20px] left-[-40px] flex items-center gap-2 bg-white border border-violet-100 rounded-2xl px-3.5 py-2.5 shadow-[0_8px_24px_rgba(124,58,237,0.12)] animate-[badgeFloat2_6s_ease-in-out_infinite]">
            <span class="text-lg">🚀</span>
            <div>
              <p class="text-[#1a0533] text-xs font-bold leading-tight">Live Projects</p>
              <p class="text-gray-400 text-[10px] leading-tight">Real-world builds</p>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- Gradient fade: white → #F7F6FB (NewsSection bg) -->
    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 h-52 z-10"
      style="background: linear-gradient(to bottom, transparent 0%, #F7F6FB 100%);"
      aria-hidden="true"
    />

    <!-- Stats trust bar — bridges hero into NewsSection -->
    <div class="relative z-20 mt-auto w-full" style="background: #F7F6FB;">
      <div class="container mx-auto px-6 lg:px-16">
        <!-- Thin violet divider line -->
        <div class="w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent mb-0" />
        <div class="grid grid-cols-2 sm:grid-cols-4 divide-x divide-violet-100 py-5">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col items-center justify-center gap-0.5 px-4 text-center"
          >
            <span class="text-2xl sm:text-3xl font-black text-violet-700 leading-none tracking-tight">
              {{ stat.value }}
            </span>
            <span class="text-[0.7rem] sm:text-xs font-semibold uppercase tracking-widest text-gray-400 mt-1">
              {{ stat.label }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  scrollToSection: (id: string) => void
}>()

const techSavvyLogo = 'https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png'

const cardHighlights = [
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/WorkflowHighlight-1.jpg",
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/googleZamPenMorning.jpg",
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/googleCDO.jpg",
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/TechSavvyPioneers.jpg",
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/GDGCebu.jpg",
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/GDGCebuMerch.jpg"
]

const currentSlide = ref(0)
const slideInterval = ref<ReturnType<typeof setInterval> | null>(null)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % cardHighlights.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + cardHighlights.length) % cardHighlights.length
}

onMounted(() => {
  slideInterval.value = setInterval(nextSlide, 4000)
})

onBeforeUnmount(() => {
  if (slideInterval.value) clearInterval(slideInterval.value)
})

const stats = [
  { value: '10+', label: 'Projects' },
  { value: '20+', label: 'Partners and Collaborators' },
  { value: '50+', label: 'Core Members' },
  { value: '800+', label: 'Participants' },
]

const tags = ['Bootcamps', 'Workshops', 'Webinars', 'Trainings']

const avatarColors = ['#a78bfa', '#f59e0b', '#34d399', '#60a5fa']

const mouseX = ref(0)
const mouseY = ref(0)
const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const starStyle = () => ({
  top: Math.random() * 100 + '%',
  left: Math.random() * 100 + '%',
  width: Math.random() * 3 + 1 + 'px',
  height: Math.random() * 3 + 1 + 'px',
  animationDelay: Math.random() * 6 + 's',
  animationDuration: Math.random() * 4 + 3 + 's',
  opacity: (Math.random() * 0.15 + 0.05).toString(),
})
</script>

<style scoped>
/* 3D Stack Transition */
.slide-stack-enter-active,
.slide-stack-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-stack-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.9) rotateY(-15deg);
}

.slide-stack-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.9) rotateY(15deg);
}

/* Progress bar reset animation */
@keyframes progressShrink {
  from { width: 100%; }
  to { width: 0%; }
}

.progressBar {
  animation: progressShrink 4s linear infinite;
}
</style>
