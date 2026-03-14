<template>
  <main
    ref="formPanelRef"
    class="bg-[#f8f6ff] flex-1 lg:w-[45%] flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16 relative"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <canvas
      ref="trailCanvasRef"
      class="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
    <div class="text-violet max-w-sm mx-auto w-full relative z-10">
      <h2 class="text-base font-bold tracking-[0.12em] uppercase text-[#2d1f4e] mb-8 text-center">USER LOGIN</h2>
      <form class="space-y-5" @submit.prevent="$emit('submit')">
        <div class="relative">
          <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-[#6B5B95] text-sm pointer-events-none" aria-hidden="true" />
          <input
            id="login-email"
            v-model="email"
            type="text"
            autocomplete="username"
            placeholder="Email or username"
            class="w-full py-3.5 pl-11 pr-4 bg-white border border-[rgba(61,42,110,0.15)] rounded-[10px] text-violet text-[0.9375rem] transition-colors hover:border-accent-purple/40 focus:outline-none focus:border-accent-purple focus:shadow-[0_0_0_3px_rgba(181,163,255,0.2)] placeholder:text-violet/40"
            required
          />
        </div>
        <div class="relative">
          <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-[#6B5B95] text-sm pointer-events-none" aria-hidden="true" />
          <input
            id="login-password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="Password"
            class="w-full py-3.5 pl-11 pr-4 bg-white border border-[rgba(61,42,110,0.15)] rounded-[10px] text-violet text-[0.9375rem] transition-colors hover:border-accent-purple/40 focus:outline-none focus:border-accent-purple focus:shadow-[0_0_0_3px_rgba(181,163,255,0.2)] placeholder:text-violet/40"
            required
          />
        </div>
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <label class="inline-flex items-center gap-2 cursor-pointer select-none">
            <input v-model="remember" type="checkbox" class="peer absolute opacity-0 w-0 h-0" />
            <span class="w-5 h-5 rounded-md bg-white border border-[rgba(61,42,110,0.25)] flex items-center justify-center text-[0.65rem] text-transparent transition-colors peer-checked:bg-accent-purple peer-checked:border-accent-purple peer-checked:text-[#F7F5FC]"><i class="fas fa-check" /></span>
            <span class="text-[0.9375rem] text-[#3D2A6E] font-medium">Remember</span>
          </label>
          <NuxtLink to="/login" class="text-sm text-[#6B5B95] font-medium no-underline transition-colors hover:text-accent-purple">Forgot password?</NuxtLink>
        </div>
        <button
          type="submit"
          class="w-full py-3.5 px-6 rounded-xl text-base font-bold bg-gradient-to-r from-accent-purple to-accent-gold text-violet tracking-[0.08em] uppercase border-none cursor-pointer shadow-[0_4px_16px_rgba(181,163,255,0.35)] transition-all hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(181,163,255,0.45)] hover:opacity-95"
        >
          LOGIN
        </button>
      </form>
      <p class="text-center text-sm text-[#3D2A6E] mt-6">
        New to TECH SAVVY?
        <NuxtLink to="/" class="text-[#6B5B95] font-semibold no-underline transition-colors hover:text-accent-purple">Join Community</NuxtLink>
      </p>
    </div>
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
