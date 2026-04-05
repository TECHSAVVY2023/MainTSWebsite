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
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div class="group p-5 border rounded-2xl border border-violet-100/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-violet-200/20">
                  <h3 class="text-green-900 font-bold text-sm uppercase tracking-widest mb-3">Our Vision</h3>
                  <p class="text-sm leading-relaxed text-gray-700">
                    To empower and support developers in their career growth and connect them with rewarding opportunities.
                  </p>
                </div>
                
                <div class="group p-5 border rounded-2xl border border-indigo-100/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-indigo-200/20">
                  <h3 class="text-green-900 font-bold text-sm uppercase tracking-widest mb-3">Our Mission</h3>
                  <p class="text-sm leading-relaxed text-gray-700">
                    To enhance technical skills and facilitate knowledge-sharing among community members.
                  </p>
                </div>
              </div>
            </div>
          </SectionWireShield>
        </div>

        <!-- Right Column: 3D Community Carousel -->
        <div class="relative min-h-[550px] md:min-h-[650px] lg:h-auto flex flex-col items-center justify-center">
          
          <!-- 3D Perspective Container -->
          <div 
            class="relative w-full max-w-[480px] aspect-square flex items-center justify-center"
            @mouseenter="stopRotation"
            @mouseleave="startRotation"
          >
            
            <!-- Backdrop Glow for active focus -->
            <div class="absolute inset-0 bg-violet-400/10 blur-[120px] rounded-full scale-75 pointer-events-none" />

            <div 
              v-for="(img, index) in trioImages" 
              :key="index"
              class="rounded-[2.5rem] absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              :class="[
                index === currentIndex ? 'z-30 opacity-100 scale-100 translate-x-0 cursor-default shadow-[0_45px_90px_rgba(26,5,51,0.15)]' : 'shadow-lg',
                index === (currentIndex - 1 + 3) % 3 ? 'z-10 opacity-30 scale-[0.85] -translate-x-[45%] cursor-pointer' : '',
                index === (currentIndex + 1) % 3 ? 'z-10 opacity-30 scale-[0.85] translate-x-[45%] cursor-pointer' : ''
              ]"
              @click="currentIndex = index"
            >
              <div 
                class="w-full h-full rounded-[2.5rem] overflow-hidden border-[6px] border-white bg-white group transition-shadow duration-500"
                :class="index === currentIndex ? '' : 'shadow-2xl'"
              >
                <img 
                  :src="img" 
                  alt="Community Life" 
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                <!-- Inactive Overlay (Tint only, No Blur) -->
                <div 
                  v-if="index !== currentIndex" 
                  class="absolute inset-0 bg-gray-900/5 transition-opacity duration-700" 
                />
              </div>
            </div>

            <!-- Floating Growth Badge (Overlays the active slide) -->
            <div class="absolute -bottom-10 -right-6 z-40 bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_60px_rgba(26,5,51,0.12)] border border-violet-100 hidden sm:block animate-float">
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
          <div class="flex items-center gap-3 mt-20 lg:mr-32">
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
import { ref, onMounted, onUnmounted } from 'vue'

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

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

</style>
