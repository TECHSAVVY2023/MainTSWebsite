<template>
  <section id="about" class="py-24 md:py-32 bg-white relative overflow-hidden">
    <!-- Subtle background wires for continuity-->
    <SectionWires gradient-id-prefix="swg-about-new" /> 
    
    <div class="container mx-auto px-2 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        
        <!-- Left Column: Typographic Story -->
        <div class=" bg-white pr-10 py-5">
          <SectionWireShield>
            <div class="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100">
              <!-- <span class="flex h-2 w-2 rounded-full bg-violet-600 animate-pulse" /> -->
              <i class="fa fa-leaf text-green-400"></i>
              <span class="text-[0.65rem] font-bold uppercase tracking-wider text-violet-700">About Our Community</span>
            </div>
            
            <h2 class="text-4xl md:text-5xl font-extrabold text-[#1a0533] leading-[1.1] mb-8 tracking-tight flex whitespace-nowrap">
              What is <span class="pr-5 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent pl-3">TECH SAVVY?</span>
            </h2>
            
            <div class="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
              <p>
                A vibrant IT community in Misamis Occidental, <span class="font-bold text-gray-900 decoration-violet-200 decoration-4">started April 30, 2023</span> at 
                
                <a href="https://www.facebook.com/workflowcoffeematcha" class="font-bold text-green-700 hover:underline decoration-green-700 decoration-4 underline-offset-2">Workflow Co-Working Space Ozamiz</a>.
                We're dedicated to running immersive code camps in full-stack web development.
              </p>
              
              <p>
                We guide aspiring developers by teaching the right techniques and helping them upskill through their journey from roadmap sessions to pursuing roles in the global IT industry.
              </p>

              <!-- Vision & Mission Cards -->
              <div class="grid grid-cols-1 items-stretch gap-4 pt-6 sm:gap-5 md:grid-cols-2">
                <div
                  class="group flex h-full min-h-0 flex-col border rounded-2xl border-violet-100/50 p-5 transition-all hover:bg-white hover:shadow-xl hover:shadow-violet-200/20"
                >
                  <h3 class="mb-3 text-sm font-bold uppercase tracking-widest text-green-900">
                    Our Vision
                  </h3>
                  <p class="min-h-[4.5rem] flex-1 text-sm leading-relaxed text-gray-700 sm:min-h-[5rem]">
                    To empower and support developers in their career growth and connect them with rewarding opportunities.
                  </p>
                </div>

                <div
                  class="group flex h-full min-h-0 flex-col border rounded-2xl border-indigo-100/50 p-5 transition-all hover:bg-white hover:shadow-xl hover:shadow-indigo-200/20"
                >
                  <h3 class="mb-3 text-sm font-bold uppercase tracking-widest text-green-900">
                    Our Mission
                  </h3>
                  <p class="min-h-[4.5rem] flex-1 text-sm leading-relaxed text-gray-700 sm:min-h-[5rem]">
                    To enhance technical skills and facilitate knowledge-sharing among community members.
                  </p>
                </div>
              </div>
            </div>
          </SectionWireShield>
        </div>

        <!-- Right Column: 3D Community Carousel -->
        <div class="relative flex min-h-0 flex-col items-center justify-center py-6 sm:min-h-[420px] sm:py-8 md:min-h-[520px] md:py-10 lg:min-h-0 lg:h-auto lg:py-0">
          
          <!-- 3D Perspective Container: max size scales with viewport + breakpoints -->
          <div 
            class="relative flex aspect-square w-full max-w-[min(92vw,17.5rem)] items-center justify-center sm:max-w-[min(90vw,22.5rem)] md:max-w-[25rem] lg:max-w-[28rem] xl:max-w-[30rem]"
            @mouseenter="stopRotation"
            @mouseleave="startRotation"
          >
            
            <!-- Backdrop Glow for active focus -->
            <div class="absolute inset-0 bg-violet-400/10 blur-[120px] rounded-full scale-75 pointer-events-none" />

            <div 
              v-for="(img, index) in trioImages" 
              :key="index"
              class="absolute inset-0 rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] sm:rounded-[2.5rem]"
              :class="[
                index === currentIndex ? 'z-30 opacity-100 scale-100 translate-x-0 cursor-default shadow-[0_45px_90px_rgba(26,5,51,0.15)]' : 'shadow-lg',
                index === (currentIndex - 1 + 3) % 3 ? 'z-10 opacity-30 scale-[0.85] -translate-x-[45%] cursor-pointer' : '',
                index === (currentIndex + 1) % 3 ? 'z-10 opacity-30 scale-[0.85] translate-x-[45%] cursor-pointer' : ''
              ]"
              @click="currentIndex = index"
            >
              <div 
                class="group h-full w-full overflow-hidden rounded-3xl border-4 border-white bg-white transition-shadow duration-500 sm:rounded-[2.5rem] sm:border-[6px]"
                :class="index === currentIndex ? '' : 'shadow-2xl'"
              >
                <img 
                  :src="img" 
                  alt="Community Life" 
                  class="h-full w-full max-w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                <!-- Inactive Overlay (Tint only, No Blur) -->
                <div 
                  v-if="index !== currentIndex" 
                  class="absolute inset-0 bg-gray-900/5 transition-opacity duration-700" 
                />
              </div>
            </div>

            <!-- Floating Growth Badge (Overlays the active slide) -->
            <div class="absolute -bottom-10 -right-6 z-40 hidden rounded-3xl border border-violet-100 bg-white/95 p-5 shadow-[0_20px_60px_rgba(26,5,51,0.12)] backdrop-blur-xl sm:block animate-float-card">
              <div class="flex items-center gap-4">
                <div class="flex -space-x-3">
                  <div v-for="i in 3" :key="i" class="w-10 h-10 rounded-full border-2 border-white bg-violet-100 overflow-hidden shadow-md">
                    <img :src="`https://i.pravatar.cc/100?img=${i+42}`" alt="Member" class="w-full h-full object-cover" />
                  </div>
                </div>
                <div class="text-left flex flex-col gap-0.5">
                  <div class="flex items-center gap-1.5">
                    <p class="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest">Community Growth</p>
                    <span class="px-2 py-0.5 rounded-full bg-violet-600 text-[0.55rem] font-black text-white uppercase tracking-tighter shadow-sm">Season 4</span>
                  </div>
                  <p class="text-[0.85rem] font-black text-[#1a0533] leading-tight">
                    <span class="text-violet-600">+50 Active Members</span> 
                    <span class="text-gray-400 font-medium ml-1">in 2026</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced Carousel Dots Navigation -->
          <div class="mt-12 flex items-center gap-3 sm:mt-16 md:mt-20 lg:mr-32">
            <button 
              v-for="(_, i) in trioImages" 
              :key="i"
              class="h-2 rounded-full transition-all duration-500 ease-out"
              :class="i === currentIndex ? 'w-10 bg-violet-600 shadow-[0_0_15px_rgba(124,58,237,0.4)]' : 'w-2 bg-gray-200 hover:bg-violet-200'"
              @click="currentIndex = i"
              :aria-label="`Go to slide ${i+1}`"
            />
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const currentIndex = ref(1) // Set center image as focused initially
const trioImages = [
  'https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/GoldenTrio3.jpg',
  'https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/Golden5.jpg',
  'https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/GoldenTrio.jpg'
]

let timer: ReturnType<typeof setInterval> | null = null

const startRotation = () => {
  if (timer) return
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % trioImages.length
  }, 5000)
}

const stopRotation = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startRotation()
})

onUnmounted(() => {
  stopRotation()
})

</script>
