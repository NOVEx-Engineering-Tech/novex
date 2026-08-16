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
  useEffect(() => {
    function onScroll() {
      let current = ''
      sectionIds.forEach(id => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 80) current = id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds])
  return active
}

// ── PARTICLE CANVAS HOOK ──
/**
 * @uuid         UTL-HOOK-001:useParticleCanvas
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Drives an interactive, mouse-reactive particle/connection canvas animation inside a given section+canvas ref pair.
 */
/**
 * @uniqueid UTL-HOOK-001:useParticleCanvas
 *
 * Returns nothing; manages the canvas animation as a side effect.
 */
export function useParticleCanvas(sectionRef, canvasRef) {
  const mouse = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef([])
  const rafRef = useRef(null)

  const PARTICLE_COUNT = 90
  const CONNECTION_DIST = 140
  const MOUSE_REPEL = 120
  const MOUSE_ATTRACT = 200

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return
    canvas.width = section.offsetWidth
    canvas.height = section.offsetHeight
  }, [canvasRef, sectionRef])

  const makeParticle = useCallback((init = false) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const W = canvas.width
    const H = canvas.height
    const CHARS = ['0','1','{','}','<','>','/','#','$','_']
    return {
      x: Math.random() * W,
      y: init ? Math.random() * H : (Math.random() < 0.5 ? -10 : H + 10),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.4 + 0.15,
      alpha: 0.15,
      isChar: Math.random() < 0.18,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      charAlpha: Math.random() * 0.12 + 0.04,
    }
  }, [canvasRef])

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    resize()
    particlesRef.current = Array.from(
      { length: PARTICLE_COUNT },
      () => makeParticle(true)
    ).filter(Boolean)

    const ctx = canvas.getContext('2d')

    function update(p) {
      const W = canvas.width, H = canvas.height
      const dx = p.x - mouse.current.x
      const dy = p.y - mouse.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

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
      if (speed > 2.5) { p.vx = (p.vx / speed) * 2.5; p.vy = (p.vy / speed) * 2.5 }
      p.vx *= 0.98; p.vy *= 0.98
      p.x += p.vx; p.y += p.vy

      if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) {
        const fresh = makeParticle(false)
        if (fresh) Object.assign(p, fresh)
      }
    }

    function draw(p) {
      if (p.isChar) {
        ctx.save()
        ctx.globalAlpha = p.charAlpha + (p.alpha - p.baseAlpha) * 0.3
        ctx.fillStyle = '#ffffff'
        ctx.font = `${Math.floor(p.r * 7 + 8)}px 'JetBrains Mono', monospace`
        ctx.fillText(p.char, p.x, p.y)
        ctx.restore()
      } else {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
        ctx.fill()
      }
    }

    function drawConnections() {
      const ps = particlesRef.current
      const mx = mouse.current.x, my = mouse.current.y
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i], b = ps[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const mdx = (a.x + b.x) / 2 - mx
            const mdy = (a.y + b.y) / 2 - my
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
            const boost = mdist < MOUSE_ATTRACT ? (1 - mdist / MOUSE_ATTRACT) * 0.4 : 0
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(47,148,216,${(1 - dist / CONNECTION_DIST) * 0.18 + boost})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
        const a = ps[i]
        const mdx = a.x - mx, mdy = a.y - my
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < MOUSE_ATTRACT) {
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = `rgba(255,255,255,${(1 - mdist / MOUSE_ATTRACT) * 0.5})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    }

    function drawMouseDot() {
      const mx = mouse.current.x, my = mouse.current.y
      const W = canvas.width
      if (mx < 0 || mx > W) return
      ctx.beginPath()
      ctx.arc(mx, my, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(47,148,216,0.7)'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(mx, my, 8, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(47,148,216,0.2)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawConnections()
      particlesRef.current.forEach(p => { update(p); draw(p) })
      drawMouseDot()
      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

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
      for (let i = 0; i < 6; i++) {
        const p = makeParticle(false)
        if (!p) continue
        p.x = cx; p.y = cy
        p.vx = (Math.random() - 0.5) * 4
        p.vy = (Math.random() - 0.5) * 4
        p.alpha = 0.9; p.baseAlpha = 0.3
        particlesRef.current.push(p)
        if (particlesRef.current.length > PARTICLE_COUNT + 30)
          particlesRef.current.splice(0, 6)
      }
    }

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
    section.addEventListener('click', onClick)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      section.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
    }
  }, [resize, makeParticle, canvasRef, sectionRef])
}
