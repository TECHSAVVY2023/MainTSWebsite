<template>
  <div class="login-page font-inter min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8">
    <NuxtLink :to="backToHomeHref" class="login-back-link">
      <i class="fas fa-arrow-left"></i> Back to Home
    </NuxtLink>

    <div class="login-card">
      <div class="login-card-inner flex flex-col lg:flex-row min-h-0">
        <!-- Left: Welcome banner -->
        <aside class="login-banner flex-shrink-0 lg:w-[55%] relative overflow-hidden flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-16">
          <div class="login-bg-pattern" aria-hidden="true"></div>
          <div class="login-wires" aria-hidden="true">
            <svg class="login-wires-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="wire-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#B5A3FF" stop-opacity="0.3" />
                  <stop offset="50%" stop-color="#B5A3FF" stop-opacity="0.9" />
                  <stop offset="100%" stop-color="#B5A3FF" stop-opacity="0.3" />
                </linearGradient>
                <linearGradient id="wire-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#FFD74A" stop-opacity="0.3" />
                  <stop offset="50%" stop-color="#FFD74A" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#FFD74A" stop-opacity="0.3" />
                </linearGradient>
              </defs>
              <!-- Base wires (faint, static) -->
              <path class="login-wire-base" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="#B5A3FF" stroke-width="0.35" stroke-opacity="0.15" />
              <path class="login-wire-base" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="#FFD74A" stroke-width="0.35" stroke-opacity="0.12" />
              <path class="login-wire-base" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="#B5A3FF" stroke-width="0.35" stroke-opacity="0.15" />
              <path class="login-wire-base" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="#FFD74A" stroke-width="0.35" stroke-opacity="0.12" />
              <path class="login-wire-base" d="M80 400 Q200 360 320 400" fill="none" stroke="#B5A3FF" stroke-width="0.35" stroke-opacity="0.15" />
              <path class="login-wire-base" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="#FFD74A" stroke-width="0.35" stroke-opacity="0.12" />
              <!-- Animated flowing wires -->
              <path class="login-wire login-wire-1" d="M0 80 Q100 60 180 100 T360 80" fill="none" stroke="url(#wire-grad-1)" stroke-width="0.8" stroke-linecap="round" />
              <path class="login-wire login-wire-2" d="M40 0 L40 120 Q80 180 120 220 T200 260" fill="none" stroke="url(#wire-grad-2)" stroke-width="0.65" stroke-linecap="round" />
              <path class="login-wire login-wire-3" d="M320 120 Q280 200 240 280 T160 380" fill="none" stroke="url(#wire-grad-1)" stroke-width="0.55" stroke-linecap="round" />
              <path class="login-wire login-wire-4" d="M0 280 Q80 260 160 300 T320 280" fill="none" stroke="url(#wire-grad-2)" stroke-width="0.65" stroke-linecap="round" />
              <path class="login-wire login-wire-5" d="M80 400 Q200 360 320 400" fill="none" stroke="url(#wire-grad-1)" stroke-width="0.55" stroke-linecap="round" />
              <path class="login-wire login-wire-6" d="M200 0 L200 80 Q240 140 200 200 T160 320" fill="none" stroke="url(#wire-grad-2)" stroke-width="0.55" stroke-linecap="round" />
            </svg>
          </div>
          <div class="login-glow login-glow-1" aria-hidden="true"></div>
          <div class="login-glow login-glow-2" aria-hidden="true"></div>
          <div class="login-banner-card">
            <p class="login-banner-label">Welcome</p>
            <h1 class="login-banner-title">
              <span class="login-banner-title-line">Welcome to</span>
              <span class="login-banner-title-brand">TECHSAVVY</span>
            </h1>
            <p class="login-banner-text">
              Code · Create · Connect. Join our growing IT community in Misamis Occidental and grow with aspiring developers.
            </p>
          </div>
        </aside>

        <!-- Right: Login form -->
        <main
          ref="formPanelRef"
          class="login-form-panel flex-1 lg:w-[45%] flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16 relative"
          @mousemove="onFormMouseMove"
          @mouseleave="onFormMouseLeave"
        >
          <canvas
            ref="trailCanvasRef"
            class="login-trail-canvas"
            aria-hidden="true"
          />
          <div class="login-form-inner max-w-sm mx-auto w-full relative z-10">
            <h2 class="login-form-title">USER LOGIN</h2>

            <form class="space-y-5" @submit.prevent="onSubmit">
              <div class="login-field-wrap">
                <i class="fas fa-user login-field-icon" aria-hidden="true"></i>
                <input
                  id="login-email"
                  v-model="email"
                  type="text"
                  autocomplete="username"
                  placeholder="Email or username"
                  class="login-input"
                  required
                />
              </div>
              <div class="login-field-wrap">
                <i class="fas fa-lock login-field-icon" aria-hidden="true"></i>
                <input
                  id="login-password"
                  v-model="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Password"
                  class="login-input"
                  required
                />
              </div>

              <div class="flex items-center justify-between gap-4 flex-wrap">
                <label class="login-remember">
                  <input v-model="remember" type="checkbox" class="login-checkbox" />
                  <span class="login-checkbox-box"><i class="fas fa-check"></i></span>
                  <span class="login-remember-text">Remember</span>
                </label>
                <NuxtLink to="/login" class="text-sm login-forgot">Forgot password?</NuxtLink>
              </div>

              <button type="submit" class="login-btn-submit w-full">
                LOGIN
              </button>
            </form>

            <p class="text-center login-signup-text mt-6">
              New to TECH SAVVY?
              <NuxtLink to="/community-dashboard" class="login-signup-link">Join Community</NuxtLink>
            </p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { backToHomeHref } = useBackToHome()
const router = useRouter()
const email = ref('')
const password = ref('')
const remember = ref(false)

const formPanelRef = ref<HTMLElement | null>(null)
const trailCanvasRef = ref<HTMLCanvasElement | null>(null)

const trailPoints = ref<{ x: number; y: number }[]>([])
const TRAIL_LENGTH = 20
const TRAIL_SPACING = 3

function onFormMouseMove(e: MouseEvent) {
  const el = formPanelRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const last = trailPoints.value[trailPoints.value.length - 1]
  if (!last || Math.hypot(x - last.x, y - last.y) > TRAIL_SPACING) {
    trailPoints.value = [...trailPoints.value.slice(-(TRAIL_LENGTH - 1)), { x, y }]
  }
  drawTrail()
}

function onFormMouseLeave() {
  trailPoints.value = []
  drawTrail()
}

function drawTrail() {
  const canvas = trailCanvasRef.value
  const el = formPanelRef.value
  if (!canvas || !el) return
  const rect = el.getBoundingClientRect()
  if (canvas.width !== rect.width || canvas.height !== rect.height) {
    canvas.width = rect.width
    canvas.height = rect.height
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const points = trailPoints.value
  if (points.length < 2) return
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1]!
    const p1 = points[i]!
    const t = i / points.length
    const opacity = 0.12 + t * 0.55
    const width = 2 + t * 2
    ctx.shadowColor = 'rgba(181, 163, 255, 0.5)'
    ctx.shadowBlur = 6
    ctx.strokeStyle = `rgba(181, 163, 255, ${opacity})`
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(p0.x, p0.y)
    ctx.lineTo(p1.x, p1.y)
    ctx.stroke()
    ctx.shadowBlur = 0
  }
  for (let i = 1; i < points.length; i++) {
    const p = points[i]!
    const t = i / points.length
    ctx.fillStyle = `rgba(255, 215, 74, ${0.25 + t * 0.45})`
    ctx.shadowColor = 'rgba(255, 215, 74, 0.6)'
    ctx.shadowBlur = 4
    ctx.beginPath()
    ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

function onSubmit() {
  router.push('/community-dashboard')
}

useHead({
  title: 'Sign in | TECH SAVVY',
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
  ]
})
</script>

<style scoped>
.login-page {
  font-family: 'Inter', system-ui, sans-serif;
  background: linear-gradient(135deg, #0f0718 0%, #1a0d2e 40%, #14082E 70%, #1e1242 100%);
  min-height: 100vh;
}

.login-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(247, 245, 252, 0.95);
  font-size: 0.875rem;
  text-decoration: none;
  margin-bottom: 1rem;
  align-self: flex-start;
  transition: color 0.2s;
}
.login-back-link:hover {
  color: #B5A3FF;
}

.login-card {
  width: 100%;
  max-width: 1080px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(181, 163, 255, 0.12);
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.login-card-inner {
  flex: 1;
  min-height: 0;
}

.login-banner {
  background: linear-gradient(160deg, #14082E 0%, #1a0d2e 50%, #231559 100%);
}

/* Animated wires */
.login-wires {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.6;
}
.login-wires-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.login-wire {
  stroke-dasharray: 30 60;
  stroke-dashoffset: 0;
  animation: login-wire-flow 4s linear infinite;
}
.login-wire-2 { animation-delay: -0.7s; }
.login-wire-3 { animation-delay: -1.4s; }
.login-wire-4 { animation-delay: -2.1s; }
.login-wire-5 { animation-delay: -2.8s; }
.login-wire-6 { animation-delay: -3.5s; }
@keyframes login-wire-flow {
  to { stroke-dashoffset: -90; }
}

/* Subtle grid pattern */
.login-bg-pattern {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(181, 163, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(181, 163, 255, 0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

/* Soft glow orbs */
.login-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  pointer-events: none;
}
.login-glow-1 {
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(181, 163, 255, 0.35) 0%, transparent 70%);
  bottom: -10%;
  right: -5%;
}
.login-glow-2 {
  width: 240px;
  height: 240px;
  background: radial-gradient(circle, rgba(255, 215, 74, 0.2) 0%, transparent 70%);
  top: 20%;
  left: -5%;
}

/* Welcome card */
.login-banner-card {
  position: relative;
  z-index: 10;
  max-width: 28rem;
  padding: 2rem 2.25rem;
  border-radius: 12px;
  background: rgba(35, 21, 89, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(181, 163, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
.login-banner-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #B5A3FF;
  margin-bottom: 0.5rem;
}
.login-banner-title {
  color: #F7F5FC;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 1rem;
}
.login-banner-title-line {
  display: block;
  font-weight: 500;
  color: rgba(247, 245, 252, 0.9);
  font-size: 1.125rem;
}
.login-banner-title-brand {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(101.5deg, #B5A3FF 0%, #FFD74A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
@media (min-width: 640px) {
  .login-banner-title-line { font-size: 1.25rem; }
  .login-banner-title-brand { font-size: 2.5rem; }
}
.login-banner-text {
  color: rgba(247, 245, 252, 0.92);
  font-size: 0.9375rem;
  line-height: 1.65;
}
@media (min-width: 640px) {
  .login-banner-text { font-size: 1rem; }
}

.login-form-panel {
  background: #f8f6ff;
  position: relative;
}

.login-trail-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.login-form-inner {
  color: #14082E;
}

.login-form-title {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #2d1f4e;
  margin-bottom: 2rem;
  text-align: center;
}

.login-field-wrap {
  position: relative;
}
.login-field-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6B5B95;
  font-size: 0.875rem;
  pointer-events: none;
}
.login-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  background: #fff;
  border: 1px solid rgba(61, 42, 110, 0.15);
  border-radius: 10px;
  color: #14082E;
  font-size: 0.9375rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.login-input::placeholder {
  color: rgba(20, 8, 46, 0.4);
}
.login-input:hover {
  border-color: rgba(181, 163, 255, 0.4);
}
.login-input:focus {
  outline: none;
  border-color: #B5A3FF;
  box-shadow: 0 0 0 3px rgba(181, 163, 255, 0.2);
}

.login-remember {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}
.login-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.login-checkbox-box {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 6px;
  background: #fff;
  border: 1px solid rgba(61, 42, 110, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  color: transparent;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.login-checkbox:checked + .login-checkbox-box {
  background: #B5A3FF;
  border-color: #B5A3FF;
  color: #F7F5FC;
}
.login-remember-text {
  font-size: 0.9375rem;
  color: #3D2A6E;
  font-weight: 500;
}
.login-forgot {
  color: #6B5B95;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}
.login-forgot:hover {
  color: #B5A3FF;
}

/* LOGIN button: gradient (accent purple → gold, like other pages) */
.login-btn-submit {
  background: linear-gradient(101.5deg, #B5A3FF 0%, #FFD74A 100%);
  color: #14082E;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(181, 163, 255, 0.35);
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
}
.login-btn-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(181, 163, 255, 0.45);
  opacity: 0.95;
}

.login-signup-text {
  font-size: 0.875rem;
  color: #3D2A6E;
}
.login-signup-link {
  color: #6B5B95;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}
.login-signup-link:hover {
  color: #B5A3FF;
}

</style>
