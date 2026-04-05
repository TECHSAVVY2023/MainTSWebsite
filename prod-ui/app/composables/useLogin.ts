/**
 * Login page composable: form state, trail effect, submit.
 */
const TRAIL_SPACING = 35
const PARTICLE_LIFETIME = 1200 // ms

interface SparklePoint {
  x: number;
  y: number;
  colorRgb: string;
  angle: number;
  scale: number;
  createdAt: number;
}

const GLITTER_COLORS = [
  '244, 114, 182', // Pink
  '34, 211, 238',  // Cyan/Blue
  '167, 139, 250', // Purple
  '255, 255, 255', // White
]

export function useLogin () {
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const remember = ref(false)
  const trailPoints = ref<SparklePoint[]>([])
  
  let animationFrameId: number | null = null
  let currentCanvas: HTMLCanvasElement | null = null
  let currentEl: HTMLElement | null = null

  function onFormMouseMove (e: MouseEvent, el: HTMLElement | null) {
    if (!el) return
    currentEl = el
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const last = trailPoints.value[trailPoints.value.length - 1]
    
    if (!last || Math.hypot(x - last.x, y - last.y) > TRAIL_SPACING) {
      const colorRgb = GLITTER_COLORS[Math.floor(Math.random() * GLITTER_COLORS.length)]!
      const angle = Math.random() * Math.PI
      const scale = 0.3 + Math.random() * 0.9
      trailPoints.value.push({ x, y, colorRgb, angle, scale, createdAt: performance.now() })
    }

    if (animationFrameId === null && currentCanvas) {
      startLoop()
    }
  }

  function onFormMouseLeave () {
    // Let them fade out naturally
  }

  function startLoop() {
    function frame() {
      if (!currentCanvas || !currentEl) {
        animationFrameId = null
        return
      }
      
      const now = performance.now()
      trailPoints.value = trailPoints.value.filter(p => now - p.createdAt < PARTICLE_LIFETIME)
      
      renderFrame(currentCanvas, currentEl, now)
      
      if (trailPoints.value.length > 0) {
        animationFrameId = requestAnimationFrame(frame)
      } else {
        animationFrameId = null
      }
    }
    animationFrameId = requestAnimationFrame(frame)
  }

  // To preserve compatibility with LoginFormSection's direct calls
  function drawTrail (canvas: HTMLCanvasElement | null, el: HTMLElement | null) {
    if (canvas && el) {
      currentCanvas = canvas
      currentEl = el
      if (animationFrameId === null && trailPoints.value.length > 0) {
        startLoop()
      }
    }
  }

  function renderFrame (canvas: HTMLCanvasElement, el: HTMLElement, now: number) {
    const rect = el.getBoundingClientRect()
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width
      canvas.height = rect.height
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    for (const p of trailPoints.value) {
      // t goes from 1.0 down to 0.0
      let t = 1.0 - ((now - p.createdAt) / PARTICLE_LIFETIME)
      if (t < 0) t = 0
      
      // smooth easing
      const easeT = t * t 
      
      const opacity = easeT * 0.95
      const size = (1.0 + t * 3) * p.scale

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)

      // Draw the 4-point sparkle
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.quadraticCurveTo(0, 0, size, 0)
      ctx.quadraticCurveTo(0, 0, 0, size)
      ctx.quadraticCurveTo(0, 0, -size, 0)
      ctx.quadraticCurveTo(0, 0, 0, -size)
      
      ctx.fillStyle = `rgba(${p.colorRgb}, ${opacity})`
      ctx.shadowColor = `rgba(${p.colorRgb}, ${opacity})`
      ctx.shadowBlur = 4 + t * 4
      ctx.fill()
      ctx.shadowBlur = 0

      // Draw the bright center
      ctx.beginPath()
      ctx.arc(0, 0, 0.3 + t * 0.4, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fill()
      
      ctx.restore()
    }
  }

  function onSubmit () {
    router.push('/')
  }

  return {
    email,
    password,
    remember,
    trailPoints,
    onFormMouseMove,
    onFormMouseLeave,
    drawTrail,
    onSubmit
  }
}
