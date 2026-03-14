/**
 * Login page composable: form state, trail effect, submit.
 */
const TRAIL_LENGTH = 20
const TRAIL_SPACING = 3

export function useLogin () {
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const remember = ref(false)
  const trailPoints = ref<{ x: number; y: number }[]>([])

  function onFormMouseMove (e: MouseEvent, el: HTMLElement | null) {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const last = trailPoints.value[trailPoints.value.length - 1]
    if (!last || Math.hypot(x - last.x, y - last.y) > TRAIL_SPACING) {
      trailPoints.value = [...trailPoints.value.slice(-(TRAIL_LENGTH - 1)), { x, y }]
    }
  }

  function onFormMouseLeave () {
    trailPoints.value = []
  }

  function drawTrail (canvas: HTMLCanvasElement | null, el: HTMLElement | null) {
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
