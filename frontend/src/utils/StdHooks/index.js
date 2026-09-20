/**
 * @uuid         UTL-HOOK-001
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Collection of small, reusable React hooks: typewriter text effect, eased count-up animation, fade-up-on-scroll (IntersectionObserver), a scroll-activity hint sensor, active-section-on-scroll tracking, and an interactive particle canvas.
 *
 * @whereToUse
 * Any React component/page that needs one of these presentation behaviors.
 *
 * @whenToUse
 * Use whenever a component needs typewriter text, count-up numbers, scroll-triggered fade-ins, an idle/active-scroll hint, scroll-spy active-section tracking, or an interactive particle canvas background.
 */

import { useState, useEffect, useRef, useCallback } from 'react'

// ── TYPEWRITER HOOK ──
/**
 * @uuid         UTL-HOOK-001:useTypewriter
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Animates cycling through an array of phrases with a typewriter type/delete effect.
 */
/**
 * @uniqueid UTL-HOOK-001:useTypewriter
 *
 * Returns the currently-typed substring of the active phrase.
 */
export function useTypewriter(phrases, typingSpeed = 70, deletingSpeed = 40, pauseMs = 1800) {
  const [text, setText] = useState('')
  const state = useRef({ pi: 0, ci: 0, deleting: false })

  useEffect(() => {
    let timer
    function tick() {
      const { pi, ci, deleting } = state.current
      const phrase = phrases[pi]
      if (!deleting) {
        const next = ci + 1
        setText(phrase.slice(0, next))
        if (next === phrase.length) {
          state.current.deleting = true
          timer = setTimeout(tick, pauseMs)
          return
        }
        state.current.ci = next
      } else {
        const next = ci - 1
        setText(phrase.slice(0, next))
        if (next === 0) {
          state.current.deleting = false
          state.current.pi = (pi + 1) % phrases.length
        }
        state.current.ci = next
      }
      timer = setTimeout(tick, state.current.deleting ? deletingSpeed : typingSpeed)
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [phrases, typingSpeed, deletingSpeed, pauseMs])

  return text
}

// ── COUNT-UP HOOK ──
// Animates an integer from 0 to `target` on mount using an eased
// requestAnimationFrame loop. `delay` lets multiple counters stagger
// their start. Respects prefers-reduced-motion by jumping straight
// to the target.
/**
 * @uuid         UTL-HOOK-001:useCountUp
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Animates an integer from 0 up to a target value using an eased requestAnimationFrame loop, respecting prefers-reduced-motion.
 */
/**
 * @uniqueid UTL-HOOK-001:useCountUp
 *
 * Returns the current animated value.
 */
export function useCountUp(target, { duration = 1200, delay = 0 } = {}) {
  const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0))

  useEffect(() => {
    if (prefersReducedMotion()) return

    let raf
    let startTimer

    startTimer = setTimeout(() => {
      const start = performance.now()
      function tick(now) {
        const elapsed = now - start
        const t = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
        setValue(Math.round(eased * target))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(startTimer)
      cancelAnimationFrame(raf)
    }
  }, [target, duration, delay])

  return value
}

// ── FADE-UP INTERSECTION OBSERVER HOOK ──
/**
 * @uuid         UTL-HOOK-001:useFadeUp
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Attaches an IntersectionObserver to a ref and adds a 'visible' class once the element scrolls into view.
 */
/**
 * @uniqueid UTL-HOOK-001:useFadeUp
 *
 * Returns the ref to attach to the target element.
 */
export function useFadeUp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ── SCROLL SEARCH HINT HOOK ──
// "Sensor" that watches for the visitor actively scrolling around the
// page (up or down — direction doesn't matter, only that they're
// scrolling, i.e. looking for something) and flips on once their
// combined scroll activity has lasted `thresholdMs`. Rapid scroll
// events are treated as one continuous burst as long as consecutive
// events land within `idleGapMs` of each other; a longer pause resets
// the burst but keeps the accumulated total. Once triggered it stays
// on until the caller dismisses it (e.g. the search popup opens).
/**
 * @uuid         UTL-HOOK-001:useScrollSearchHint
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Detects sustained scroll activity (a continuous burst past a duration threshold) and flips a flag on once, until dismissed.
 */
/**
 * @uniqueid UTL-HOOK-001:useScrollSearchHint
 *
 * Returns [shouldShow, dismiss].
 */
export function useScrollSearchHint({ thresholdMs = 2500, idleGapMs = 200, suspend = false } = {}) {
  const [shouldShow, setShouldShow] = useState(false)
  const burstStart = useRef(null)
  const accumulated = useRef(0)
  const idleTimer = useRef(null)
  const triggered = useRef(false)

  useEffect(() => {
    if (suspend || triggered.current) return

    function settleBurst(now) {
      if (burstStart.current != null) {
        accumulated.current += now - burstStart.current
        burstStart.current = null
      }
    }

    function onScroll() {
      if (triggered.current) return
      const now = performance.now()
      if (burstStart.current == null) burstStart.current = now

      const liveTotal = accumulated.current + (now - burstStart.current)
      if (liveTotal >= thresholdMs) {
        triggered.current = true
        settleBurst(now)
        setShouldShow(true)
        return
      }

      clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => settleBurst(performance.now()), idleGapMs)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(idleTimer.current)
    }
  }, [thresholdMs, idleGapMs, suspend])

  const dismiss = useCallback(() => setShouldShow(false), [])

  return [shouldShow, dismiss]
}

// ── ACTIVE SECTION HOOK ──
/**
 * @uuid         UTL-HOOK-001:useActiveSection
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Tracks which of a list of section element ids is currently active based on scroll position.
 */
/**
 * @uniqueid UTL-HOOK-001:useActiveSection
 *
 * Returns the id of the active section.
 */
export function useActiveSection(sectionIds) {
  const [active, setActive] = useState('')
  const idsRef = useRef(sectionIds)

  useEffect(() => {
    idsRef.current = sectionIds
  }, [sectionIds])

  useEffect(() => {
    let ticking = false

    function update() {
      ticking = false
      const y = window.scrollY + 80
      let current = ''

      for (const id of idsRef.current) {
        const el = document.getElementById(id)
        if (el && y >= el.offsetTop) current = id
      }

      setActive(prev => prev === current ? prev : current)
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return active
}

// ── PARTICLE CANVAS HOOK ──
export function useParticleCanvas(sectionRef, canvasRef) {
  const mouse = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef([])
  const rafRef = useRef(null)

  const PARTICLE_COUNT = 72
  const CONNECTION_DIST = 125
  const MOUSE_REPEL = 120
  const MOUSE_ATTRACT = 190
  const MAX_DPR = 1.5
  const FRAME_MS = 1000 / 50

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let running = false
    let lastFrame = 0
    let resizeTimer = null
    let dpr = 1
    let width = 0
    let height = 0

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      const rect = section.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const CHARS = ['0', '1', '{', '}', '<', '>', '/', '#', '$', '_']

    function makeParticle(init = false) {
      return {
        x: Math.random() * width,
        y: init ? Math.random() * height : (Math.random() < 0.5 ? -10 : height + 10),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.4 + 0.15,
        alpha: 0.15,
        isChar: Math.random() < 0.16,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        charAlpha: Math.random() * 0.12 + 0.04,
      }
    }

    function resetParticles() {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => makeParticle(true))
    }

    function update(p) {
      const dx = p.x - mouse.current.x
      const dy = p.y - mouse.current.y
      const distSq = dx * dx + dy * dy
      const dist = Math.sqrt(distSq) || 0.001

      if (dist < MOUSE_REPEL) {
        const force = (MOUSE_REPEL - dist) / MOUSE_REPEL
        p.vx += (dx / dist) * force * 0.6
        p.vy += (dy / dist) * force * 0.6
        p.alpha = Math.min(1, p.baseAlpha + force * 0.6)
      } else if (dist < MOUSE_ATTRACT) {
        const force = (dist - MOUSE_REPEL) / (MOUSE_ATTRACT - MOUSE_REPEL)
        p.vx -= (dx / dist) * (1 - force) * 0.08
        p.vy -= (dy / dist) * (1 - force) * 0.08
        p.alpha = p.baseAlpha + (1 - force) * 0.2
      } else {
        p.alpha += (p.baseAlpha - p.alpha) * 0.05
      }

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      if (speed > 2.5) {
        p.vx = (p.vx / speed) * 2.5
        p.vy = (p.vy / speed) * 2.5
      }

      p.vx *= 0.98
      p.vy *= 0.98
      p.x += p.vx
      p.y += p.vy

      if (p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
        Object.assign(p, makeParticle(false))
      }
    }

    function drawParticle(p) {
      if (p.isChar) {
        ctx.globalAlpha = Math.max(0, p.charAlpha + (p.alpha - p.baseAlpha) * 0.3)
        ctx.fillStyle = '#ffffff'
        ctx.font = `${Math.floor(p.r * 7 + 8)}px 'JetBrains Mono', monospace`
        ctx.fillText(p.char, p.x, p.y)
      } else {
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawConnections() {
      const ps = particlesRef.current
      const mx = mouse.current.x
      const my = mouse.current.y

      ctx.lineWidth = 0.6

      for (let i = 0; i < ps.length; i++) {
        const a = ps[i]

        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const mdx = (a.x + b.x) * 0.5 - mx
            const mdy = (a.y + b.y) * 0.5 - my
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
            const boost = mdist < MOUSE_ATTRACT ? (1 - mdist / MOUSE_ATTRACT) * 0.4 : 0

            ctx.globalAlpha = (1 - dist / CONNECTION_DIST) * 0.18 + boost
            ctx.strokeStyle = '#2f94d8'
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        const mdx = a.x - mx
        const mdy = a.y - my
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < MOUSE_ATTRACT) {
          ctx.globalAlpha = (1 - mdist / MOUSE_ATTRACT) * 0.5
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }
    }

    function drawMouseDot() {
      const mx = mouse.current.x
      const my = mouse.current.y
      if (mx < 0 || mx > width || my < 0 || my > height) return

      ctx.globalAlpha = 0.7
      ctx.fillStyle = '#2f94d8'
      ctx.beginPath()
      ctx.arc(mx, my, 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalAlpha = 0.2
      ctx.strokeStyle = '#2f94d8'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(mx, my, 8, 0, Math.PI * 2)
      ctx.stroke()
    }

    function frame(now) {
      rafRef.current = requestAnimationFrame(frame)
      if (!running || reducedMotion) return
      if (now - lastFrame < FRAME_MS) return
      lastFrame = now

      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1

      drawConnections()
      particlesRef.current.forEach(update)
      particlesRef.current.forEach(drawParticle)
      drawMouseDot()
      ctx.globalAlpha = 1
    }

    function start() {
      if (running || reducedMotion) return
      running = true
      lastFrame = performance.now()
      if (!rafRef.current) rafRef.current = requestAnimationFrame(frame)
    }

    function stop() {
      running = false
    }

    function onMouseMove(e) {
      const rect = section.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
    }

    function onMouseLeave() {
      mouse.current.x = -9999
      mouse.current.y = -9999
    }

    function onClick(e) {
      const rect = section.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top

      for (let i = 0; i < 4; i++) {
        const p = makeParticle(false)
        p.x = cx
        p.y = cy
        p.vx = (Math.random() - 0.5) * 4
        p.vy = (Math.random() - 0.5) * 4
        p.alpha = 0.9
        p.baseAlpha = 0.3
        particlesRef.current.push(p)
      }

      if (particlesRef.current.length > PARTICLE_COUNT + 20) {
        particlesRef.current.splice(0, particlesRef.current.length - PARTICLE_COUNT - 20)
      }
    }

    resize()
    resetParticles()

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting ? start() : stop(),
      { threshold: 0.01 }
    )

    observer.observe(section)

    section.addEventListener('mousemove', onMouseMove, { passive: true })
    section.addEventListener('mouseleave', onMouseLeave, { passive: true })
    section.addEventListener('click', onClick)

    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
        resetParticles()
      }, 100)
    }

    window.addEventListener('resize', onResize, { passive: true })
    function onVisibilityChange() {
      if (document.hidden) stop()
      else if (document.visibilityState === 'visible') start()
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    if (reducedMotion) {
      ctx.clearRect(0, 0, width, height)
      particlesRef.current.forEach(drawParticle)
    }

    return () => {
      observer.disconnect()
      clearTimeout(resizeTimer)
      cancelAnimationFrame(rafRef.current)
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      section.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [canvasRef, sectionRef])
}

