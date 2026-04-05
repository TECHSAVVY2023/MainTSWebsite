<template>
  <main
    ref="formPanelRef"
    class="w-full flex flex-col justify-center items-center relative"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <canvas
      ref="trailCanvasRef"
      class="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
    <div class="w-full max-w-sm relative z-10">
      <div class="text-center mb-5">
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto lg:mb-6 text-violet-600 lg:shadow-sm lg:border border-violet-100">
          <i class="fas fa-fingerprint text-2xl" />
        </div>
        <p class="text-xs font-bold text-violet-900 uppercase tracking-widest">
          Access your community dashboard
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="$emit('submit')">
        <button
          type="submit"
          class="w-full relative group overflow-hidden rounded-2xl bg-white border-2 border-violet-100 p-4 transition-all duration-300 hover:border-violet-400 hover:shadow-[0_8px_24px_rgba(124,58,237,0.15)] flex flex-row items-center justify-center gap-3 cursor-pointer"
        >
          <div class="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <i class="fab fa-google text-violet-600 text-xl relative z-10"></i>
          <span class="relative z-10 text-sm font-black text-violet-800 uppercase tracking-widest group-hover:text-violet-800 transition-colors">Continue with Google</span>
        </button>
      </form>

      <div class="relative lg:mt-12 mt-5 text-center border-t border-violet-50 pt-8">
        <p class="text-[10px] font-bold text-violet-900 uppercase tracking-widest">
          New to TechSavvy?
        </p>
        <NuxtLink to="/#news" class="inline-block mt-3 px-6 py-2.5 rounded-xl bg-violet-50 border border-violet-100 text-violet-700 font-black text-[10px] uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-colors no-underline">
          Join the community
        </NuxtLink>
      </div>
    </div>

    <NuxtLink to="https://www.techsavvies.space" class="absolute bottom-2 lg:bottom-10 inline-flex items-center justify-center gap-2 text-violet-400 font-bold text-[10px] tracking-widest uppercase transition-colors hover:text-violet-700 z-50 w-full text-center">
      <i class="fas fa-arrow-left" :aria-hidden="true" /> Back to Home
    </NuxtLink>
  </main>
</template>

<script setup lang="ts">
const formPanelRef = ref<HTMLElement | null>(null)
const trailCanvasRef = ref<HTMLCanvasElement | null>(null)

const props = defineProps<{
  login: ReturnType<typeof useLogin>
}>()

const email = computed({
  get: () => props.login.email.value,
  set: (v) => { props.login.email.value = v }
})
const password = computed({
  get: () => props.login.password.value,
  set: (v) => { props.login.password.value = v }
})
const remember = computed({
  get: () => props.login.remember.value,
  set: (v) => { props.login.remember.value = v }
})

function handleMouseMove (e: MouseEvent) {
  props.login.onFormMouseMove(e, formPanelRef.value)
  nextTick(() => props.login.drawTrail(trailCanvasRef.value, formPanelRef.value))
}

function handleMouseLeave () {
  props.login.onFormMouseLeave()
  nextTick(() => props.login.drawTrail(trailCanvasRef.value, formPanelRef.value))
}

watch(() => props.login.trailPoints, () => {
  nextTick(() => props.login.drawTrail(trailCanvasRef.value, formPanelRef.value))
}, { deep: true })

defineEmits<{
  submit: []
}>()
</script>
