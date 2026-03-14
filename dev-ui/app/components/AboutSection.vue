<template>
  <section
    id="about"
    class="min-h-screen flex flex-col pt-8 pb-16 md:pt-12 md:pb-24 bg-violet relative overflow-hidden"
  >
    <SectionWires gradient-id-prefix="swg-about" />
    <div class="relative z-10 isolate flex-1 flex flex-col">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex-shrink-0 relative">
        <div class="mb-6 md:mb-8">
          <h2 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-white mb-1 text-left">
            What is Tech Savvy?
          </h2>
          <p class="text-sm sm:text-base text-white/60 max-w-[42rem] text-left leading-relaxed">
            Our vision, mission, and how we support developers in Misamis Occidental.
          </p>
        </div>
      </div>
      <div
        ref="whatisWrapRef"
        class="flex-1 min-h-0 w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory touch-pan-x box-border [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-violet-border"
      >
        <div class="whatis-pages flex h-full min-h-[380px]">
          <section class="w-full min-w-full shrink-0 h-full min-h-[380px] bg-violet snap-start snap-always flex flex-wrap items-center justify-center py-8 px-6 md:py-12 md:px-8 overflow-y-auto box-border max-[767px]:px-4">
            <div class="max-w-[1000px] w-full mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-12 max-[767px]:justify-start max-[767px]:items-start max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-6">
              <div class="flex-1 min-w-0 max-w-[480px] flex flex-col gap-3.5 p-5 bg-white/10 border border-white/10 rounded-xl break-words max-[767px]:w-full max-[767px]:max-w-[280px] max-[767px]:mx-auto max-[900px]:max-w-full">
                <h2 class="text-white font-semibold text-2xl leading-tight tracking-tight">Vision</h2>
                <p class="text-sm md:text-base text-white leading-relaxed">A growing IT community empowering developers in their career growth and connecting them with opportunities in the IT industry.</p>
                <div class="flex gap-3 flex-wrap">
                  <button type="button" class="inline-flex items-center justify-center py-2.5 px-5 font-medium text-sm text-white bg-violet-dark border border-violet-border rounded-lg cursor-pointer transition-colors hover:bg-violet-light hover:border-accent-purple/60" @click="step('right')">Main →</button>
                </div>
              </div>
              <div class="flex-[0_1_420px] max-w-[480px] min-w-0 relative h-[400px] max-[900px]:max-w-[440px] max-[900px]:h-[380px] max-[600px]:flex max-[600px]:flex-col max-[600px]:items-center max-[600px]:gap-4 max-[600px]:h-auto max-[600px]:min-h-[320px]">
                <div class="absolute w-[78%] h-[280px] min-h-[220px] bg-violet rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:z-[25] top-0 left-0 border-2 border-green-400/55 z-[1] max-[900px]:w-3/4 max-[900px]:h-[240px] max-[900px]:min-h-[200px] max-[600px]:!relative max-[600px]:!left-auto max-[600px]:!top-auto max-[600px]:w-[85%] max-[600px]:max-w-[320px] max-[600px]:h-[200px] max-[600px]:min-h-[180px]">
                  <img src="https://picsum.photos/600/400?random=about1" alt="" class="w-full h-full object-cover object-center block" loading="lazy" />
                </div>
                <div class="absolute w-[78%] h-[280px] min-h-[220px] bg-violet rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:z-[25] left-[58%] top-[34%] border-2 border-red-400/55 z-[2] max-[900px]:left-[55%] max-[900px]:top-[30%] max-[900px]:w-3/4 max-[900px]:h-[240px] max-[900px]:min-h-[200px] max-[600px]:!relative max-[600px]:!left-auto max-[600px]:!top-auto max-[600px]:w-[85%] max-[600px]:max-w-[320px] max-[600px]:h-[200px] max-[600px]:min-h-[180px]">
                  <img src="https://picsum.photos/600/400?random=about2" alt="" class="w-full h-full object-cover object-center block" loading="lazy" />
                </div>
              </div>
            </div>
          </section>

          <section class="w-full min-w-full shrink-0 h-full min-h-[380px] bg-violet snap-start snap-always flex flex-wrap items-center justify-center py-8 px-6 md:py-12 md:px-8 overflow-y-auto box-border max-[767px]:px-4">
            <div class="max-w-[1000px] w-full mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-12 max-[767px]:justify-start max-[767px]:items-start max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-6">
              <div class="flex-1 min-w-0 max-w-[480px] flex flex-col gap-3.5 p-5 bg-white/10 border border-white/10 rounded-xl break-words max-[767px]:w-full max-[767px]:max-w-[280px] max-[767px]:mx-auto max-[900px]:max-w-full">
                <h2 class="text-white font-semibold text-2xl leading-tight tracking-tight">What is TECH SAVVY?</h2>
                <p class="text-sm md:text-base text-white leading-relaxed">A growing IT community in Misamis Occidental, <strong class="font-medium">started April 30, 2023 at Workflow Co-Working Space Ozamiz</strong>, running code camps in full-stack web development.</p>
                <p class="hidden md:block text-sm md:text-base text-white leading-relaxed"><strong class="font-medium">Tech Savvy</strong> mentors aspiring developers with full-stack techniques and supports them from learning through to roles in the IT industry.</p>
                <div class="flex gap-3 flex-wrap">
                  <button type="button" class="inline-flex items-center justify-center py-2.5 px-5 font-medium text-sm text-white bg-violet-dark border border-violet-border rounded-lg cursor-pointer transition-colors hover:bg-violet-light hover:border-accent-purple/60" @click="step('left')">← Vision</button>
                  <button type="button" class="inline-flex items-center justify-center py-2.5 px-5 font-medium text-sm text-white bg-violet-dark border border-violet-border rounded-lg cursor-pointer transition-colors hover:bg-violet-light hover:border-accent-purple/60" @click="step('right')">Mission →</button>
                </div>
              </div>
              <div class="flex-[0_1_420px] max-w-[480px] min-w-0 relative h-[400px] max-[900px]:max-w-[440px] max-[900px]:h-[380px] max-[600px]:flex max-[600px]:flex-col max-[600px]:items-center max-[600px]:gap-4 max-[600px]:h-auto max-[600px]:min-h-[320px]">
                <div class="absolute w-[78%] h-[280px] min-h-[220px] bg-violet rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:z-[25] top-0 left-0 border-2 border-green-400/55 z-[1] max-[900px]:w-3/4 max-[900px]:h-[240px] max-[900px]:min-h-[200px] max-[600px]:!relative max-[600px]:!left-auto max-[600px]:!top-auto max-[600px]:w-[85%] max-[600px]:max-w-[320px] max-[600px]:h-[200px] max-[600px]:min-h-[180px]">
                  <img src="https://picsum.photos/600/400?random=about3" alt="" class="w-full h-full object-cover object-center block" loading="lazy" />
                </div>
                <div class="absolute w-[78%] h-[280px] min-h-[220px] bg-violet rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:z-[25] left-[58%] top-[34%] border-2 border-red-400/55 z-[2] max-[900px]:left-[55%] max-[900px]:top-[30%] max-[900px]:w-3/4 max-[900px]:h-[240px] max-[900px]:min-h-[200px] max-[600px]:!relative max-[600px]:!left-auto max-[600px]:!top-auto max-[600px]:w-[85%] max-[600px]:max-w-[320px] max-[600px]:h-[200px] max-[600px]:min-h-[180px]">
                  <img src="https://picsum.photos/600/400?random=about4" alt="" class="w-full h-full object-cover object-center block" loading="lazy" />
                </div>
              </div>
            </div>
          </section>

          <section class="w-full min-w-full shrink-0 h-full min-h-[380px] bg-violet snap-start snap-always flex flex-wrap items-center justify-center py-8 px-6 md:py-12 md:px-8 overflow-y-auto box-border max-[767px]:px-4">
            <div class="max-w-[1000px] w-full mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-12 max-[767px]:justify-start max-[767px]:items-start max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-6">
              <div class="flex-1 min-w-0 max-w-[480px] flex flex-col gap-3.5 p-5 bg-white/10 border border-white/10 rounded-xl break-words max-[767px]:w-full max-[767px]:max-w-[280px] max-[767px]:mx-auto max-[900px]:max-w-full">
                <h2 class="text-white font-semibold text-2xl leading-tight tracking-tight">Mission</h2>
                <p class="text-sm md:text-base text-white leading-relaxed">The mission is to enhance the skills and knowledge of developers, facilitate networking and knowledge-sharing among community members, and assist job seekers in finding fulfilling roles in the IT industry.</p>
                <div class="flex gap-3 flex-wrap">
                  <button type="button" class="inline-flex items-center justify-center py-2.5 px-5 font-medium text-sm text-white bg-violet-dark border border-violet-border rounded-lg cursor-pointer transition-colors hover:bg-violet-light hover:border-accent-purple/60" @click="step('left')">← Main</button>
                </div>
              </div>
              <div class="flex-[0_1_420px] max-w-[480px] min-w-0 relative h-[400px] max-[900px]:max-w-[440px] max-[900px]:h-[380px] max-[600px]:flex max-[600px]:flex-col max-[600px]:items-center max-[600px]:gap-4 max-[600px]:h-auto max-[600px]:min-h-[320px]">
                <div class="absolute w-[78%] h-[280px] min-h-[220px] bg-violet rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:z-[25] top-0 left-0 border-2 border-green-400/55 z-[1] max-[900px]:w-3/4 max-[900px]:h-[240px] max-[900px]:min-h-[200px] max-[600px]:!relative max-[600px]:!left-auto max-[600px]:!top-auto max-[600px]:w-[85%] max-[600px]:max-w-[320px] max-[600px]:h-[200px] max-[600px]:min-h-[180px]">
                  <img src="https://picsum.photos/600/400?random=about5" alt="" class="w-full h-full object-cover object-center block" loading="lazy" />
                </div>
                <div class="absolute w-[78%] h-[280px] min-h-[220px] bg-violet rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:z-[25] left-[58%] top-[34%] border-2 border-red-400/55 z-[2] max-[900px]:left-[55%] max-[900px]:top-[30%] max-[900px]:w-3/4 max-[900px]:h-[240px] max-[900px]:min-h-[200px] max-[600px]:!relative max-[600px]:!left-auto max-[600px]:!top-auto max-[600px]:w-[85%] max-[600px]:max-w-[320px] max-[600px]:h-[200px] max-[600px]:min-h-[180px]">
                  <img src="https://picsum.photos/600/400?random=about6" alt="" class="w-full h-full object-cover object-center block" loading="lazy" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const whatisWrapRef = ref<HTMLElement | null>(null)

function step(direction: 'left' | 'right') {
  const wrap = whatisWrapRef.value
  if (!wrap) return
  const pages = wrap.querySelector('.whatis-pages')
  const total = pages ? pages.children.length : 3
  const w = wrap.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 0)
  if (!w) return
  const cur = Math.round(wrap.scrollLeft / w)
  const next = direction === 'left' ? Math.max(0, cur - 1) : Math.min(total - 1, cur + 1)
  wrap.scrollTo({ left: w * next, behavior: 'smooth' })
}

onMounted(() => {
  const wrap = whatisWrapRef.value
  if (wrap && typeof window !== 'undefined') {
    const w = wrap.clientWidth || window.innerWidth
    if (w) wrap.scrollLeft = w * 1
    const onResize = () => {
      const pages = wrap.querySelector('.whatis-pages')
      const total = pages ? pages.children.length : 3
      const width = wrap.clientWidth || window.innerWidth
      const cur = Math.round(wrap.scrollLeft / width)
      const idx = Math.max(0, Math.min(cur, total - 1))
      wrap.scrollLeft = width * idx
    }
    window.addEventListener('resize', onResize)
    onBeforeUnmount(() => window.removeEventListener('resize', onResize))
  }
})
</script>
