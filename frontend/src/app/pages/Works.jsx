import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { loadCarouselItems } from '../../lib/workLoader'
import SectionHeader from '../../components/StdSectionHeader'
import styles from './Works.module.css'

function generateCode(width, height) {
  const library = [
    '// novex — project scanner',
    'const SCAN_WIDTH = 8;',
    'const MAX_PARTICLES = 2500;',
    'function clamp(n,a,b){return Math.max(a,Math.min(b,n));}',
    'function lerp(a,b,t){return a+(b-a)*t;}',
    'const now=()=>performance.now();',
    'class Particle{constructor(x,y,vx,vy,r,a){this.x=x;this.y=y;this.vx=vx;this.vy=vy;this.r=r;this.a=a;}step(dt){this.x+=this.vx*dt;this.y+=this.vy*dt;}}',
    'const scanner={x:Math.floor(window.innerWidth/2),width:SCAN_WIDTH,glow:3.5};',
    'function drawParticle(ctx,p){ctx.globalAlpha=clamp(p.a,0,1);ctx.drawImage(gradient,p.x-p.r,p.y-p.r,p.r*2,p.r*2);}',
    'function tick(t){const dt=0.016;}',
    'const state={intensity:1.2,particles:MAX_PARTICLES};',
    'ctx.globalCompositeOperation="lighter";',
  ]
  let flow = library.join(' ')
  const totalChars = width * height
  while (flow.length < totalChars + width) flow += ' ' + library[Math.floor(Math.random() * library.length)]
  let out = '', offset = 0
  for (let row = 0; row < height; row++) {
    let line = flow.slice(offset, offset + width)
    if (line.length < width) line += ' '.repeat(width - line.length)
    out += line + (row < height - 1 ? '\n' : '')
    offset += width
  }
  return out
}

function calcCodeDims(w, h) {
  const fontSize = 11, lineHeight = 13, charWidth = 6
  return { width: Math.floor(w / charWidth), height: Math.floor(h / lineHeight), fontSize, lineHeight }
}

// ── Card DOM builder (imperative, outside React render) ──
function buildCard(item) {
  const CARD_W = 360, CARD_H = 220

  const wrapper = document.createElement('div')
  wrapper.className = styles.cardWrapper

  // Normal card: banner (image) on top, body (text) below — kept as
  // two separate, non-overlapping zones so the image never has to
  // fight with text for contrast.
  const normal = document.createElement('div')
  normal.className = styles.cardNormal

  const banner = document.createElement('div')
  banner.className = styles.cardBanner

  const img = document.createElement('img')
  img.className = styles.cardImage
  img.src = item.banner
  img.alt = item.title
  img.draggable = false
  img.onerror = () => {
    const c = document.createElement('canvas'); c.width = CARD_W; c.height = CARD_H
    const ctx = c.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, CARD_W, CARD_H)
    g.addColorStop(0, '#05030f'); g.addColorStop(1, '#7b2cbf')
    ctx.fillStyle = g; ctx.fillRect(0, 0, CARD_W, CARD_H)
    img.src = c.toDataURL()
  }
  banner.appendChild(img)

  // Body: the "card holder" — opaque, holds all text/info
  const body = document.createElement('div')
  body.className = styles.cardBody

  const title = document.createElement('div')
  title.className = styles.cardTitle
  title.textContent = item.title

  const desc = document.createElement('div')
  desc.className = styles.cardDesc
  desc.textContent = item.description

  const tags = document.createElement('div')
  tags.className = styles.cardTags
  item.tags.slice(0, 3).forEach(t => {
    const span = document.createElement('span')
    span.className = styles.cardTag
    span.textContent = t
    tags.appendChild(span)
  })

  const status = document.createElement('div')
  status.className = styles.cardStatus
  const dot = document.createElement('span')
  dot.className = `${styles.statusDot} ${item.status === 'in development' ? styles.active : styles.planned}`
  status.appendChild(dot)
  status.appendChild(document.createTextNode(item.status))

  body.appendChild(title)
  body.appendChild(desc)
  body.appendChild(tags)
  body.appendChild(status)

  normal.appendChild(banner)
  normal.appendChild(body)

  // ASCII card
  const ascii = document.createElement('div')
  ascii.className = styles.cardAscii

  const asciiContent = document.createElement('div')
  asciiContent.className = styles.asciiContent
  const dims = calcCodeDims(CARD_W, CARD_H)
  asciiContent.style.fontSize = dims.fontSize + 'px'
  asciiContent.style.lineHeight = dims.lineHeight + 'px'
  asciiContent.textContent = generateCode(dims.width, dims.height)

  ascii.appendChild(asciiContent)
  wrapper.appendChild(normal)
  wrapper.appendChild(ascii)

  return wrapper
}

// ── Main Works component ──
export default function Works() {
  const containerRef = useRef(null)
  const particleCanvasRef = useRef(null)
  const scannerCanvasLeftRef = useRef(null)
  const scannerCanvasRightRef = useRef(null)
  const cardLineRef = useRef(null)
  const stateRef = useRef(null)

  useEffect(() => {
    const items = loadCarouselItems(10)
    const cardLine = cardLineRef.current
    const container = containerRef.current
    if (!cardLine || !container) return

    // ── Build cards (5 originals × 6 = 30 cards) ──
    cardLine.innerHTML = ''
    const REPEAT = 6
    for (let r = 0; r < REPEAT; r++)
      items.forEach(item => cardLine.appendChild(buildCard(item)))

    // ── Dimensions ──
    const CARD_W = 360, CARD_GAP = 48
    const totalCards = items.length * REPEAT
    const cardLineWidth = (CARD_W + CARD_GAP) * totalCards

    // ── Stream controller state ──
    const s = {
      position: 0,
      velocity: 100,
      direction: 1,          // left-to-right
      isAnimating: true,
      isDragging: false,
      lastMouseX: 0,
      mouseVelocity: 0,
      friction: 0.95,
      minVelocity: 30,
      containerWidth: container.offsetWidth,
      cardLineWidth,
      lastTime: performance.now(),
      rafId: null,
    }
    stateRef.current = s

    // Set initial position off-screen left so it enters from left
    s.position = -cardLineWidth
    cardLine.style.transform = `translateX(${s.position}px)`

    // ── Drag ──
    function startDrag(clientX) {
      s.isDragging = true
      s.isAnimating = false
      s.lastMouseX = clientX
      s.mouseVelocity = 0
      cardLine.classList.add(styles.dragging)
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'grabbing'
    }

    function onDrag(clientX) {
      if (!s.isDragging) return
      const dx = clientX - s.lastMouseX
      s.position += dx
      s.mouseVelocity = dx * 60
      s.lastMouseX = clientX
      cardLine.style.transform = `translateX(${s.position}px)`
    }

    function endDrag() {
      if (!s.isDragging) return
      s.isDragging = false
      cardLine.classList.remove(styles.dragging)
      if (Math.abs(s.mouseVelocity) > s.minVelocity) {
        s.velocity = Math.abs(s.mouseVelocity)
        s.direction = s.mouseVelocity > 0 ? 1 : -1
      } else {
        s.velocity = 100
        s.direction = 1
      }
      s.isAnimating = true
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }

    cardLine.addEventListener('mousedown', e => { e.preventDefault(); startDrag(e.clientX) })
    document.addEventListener('mousemove', e => onDrag(e.clientX))
    document.addEventListener('mouseup', endDrag)
    cardLine.addEventListener('touchstart', e => { startDrag(e.touches[0].clientX) }, { passive: true })
    document.addEventListener('touchmove', e => onDrag(e.touches[0].clientX), { passive: true })
    document.addEventListener('touchend', endDrag)
    cardLine.addEventListener('wheel', e => {
      e.preventDefault()
      s.position += e.deltaY > 0 ? 20 : -20
      cardLine.style.transform = `translateX(${s.position}px)`
    }, { passive: false })

    // ── Animation loop ──
    function animate() {
      const now = performance.now()
      const dt = Math.min((now - s.lastTime) / 1000, 0.05)
      s.lastTime = now

      if (s.isAnimating && !s.isDragging) {
        if (s.velocity > s.minVelocity) s.velocity *= s.friction
        else s.velocity = s.minVelocity
        s.position += s.velocity * s.direction * dt

        // Wrap
        const cw = container.offsetWidth
        if (s.direction > 0 && s.position > cw) s.position = -s.cardLineWidth
        else if (s.direction < 0 && s.position < -s.cardLineWidth) s.position = cw

        cardLine.style.transform = `translateX(${s.position}px)`
      }

      s.rafId = requestAnimationFrame(animate)
    }
    s.rafId = requestAnimationFrame(animate)

    // ── ASCII periodic refresh ──
    const asciiTimer = setInterval(() => {
      cardLine.querySelectorAll(`.${styles.asciiContent}`).forEach(el => {
        if (Math.random() < 0.15) {
          const dims = calcCodeDims(360, 220)
          el.textContent = generateCode(dims.width, dims.height)
        }
      })
    }, 200)

    // ── Two-beam conversion window ──
    // The LEFT beam converts code → project; the RIGHT beam reverts
    // project → code. The transition is tied exactly to each card's own
    // width, so the visible wipe boundary always sits precisely at the
    // beam's physical x-position while a card is crossing it — not a
    // wide zone around it.
    //
    // Below MOBILE_BREAKPOINT the whole effect is disabled: no beams,
    // no code/project conversion — just a plain scrolling carousel of
    // fully-revealed project cards.
    const MOBILE_BREAKPOINT = 768
    const DESKTOP_OFFSET = 520   // px each beam sits from viewport center

    function clamp01(x) { return Math.max(0, Math.min(1, x)) }

    function updateClipping() {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT

      if (isMobile) {
        cardLine.querySelectorAll(`.${styles.cardWrapper}`).forEach(wrapper => {
          const normalCard = wrapper.querySelector(`.${styles.cardNormal}`)
          const asciiCard = wrapper.querySelector(`.${styles.cardAscii}`)
          if (!normalCard || !asciiCard) return
          normalCard.style.setProperty('--clip-right', '0%')
          asciiCard.style.setProperty('--clip-left', '0%')
          normalCard.classList.remove(styles.mirrored)
          asciiCard.classList.remove(styles.mirrored)
        })
        if (leftScannerRef) leftScannerRef.setScanningActive(false)
        if (rightScannerRef) rightScannerRef.setScanningActive(false)
        return
      }

      const offset = DESKTOP_OFFSET
      const centerX = window.innerWidth / 2
      const beamLeftX = centerX - offset
      const beamRightX = centerX + offset
      let leftActive = false
      let rightActive = false

      cardLine.querySelectorAll(`.${styles.cardWrapper}`).forEach(wrapper => {
        const rect = wrapper.getBoundingClientRect()
        const cw = rect.width
        const normalCard = wrapper.querySelector(`.${styles.cardNormal}`)
        const asciiCard = wrapper.querySelector(`.${styles.cardAscii}`)
        if (!normalCard || !asciiCard) return

        // left beam: 0 before the card reaches it, ramps to 1 exactly as
        // the card's own width sweeps past beamLeftX (code → project)
        const throughLeft = clamp01((rect.right - beamLeftX) / cw)
        // right beam: 1 until the card reaches it, ramps to 0 exactly as
        // the card's own width sweeps past beamRightX (project → code)
        const throughRight = clamp01((beamRightX - rect.left) / cw)
        const reveal = clamp01(Math.min(throughLeft, throughRight))

        // A card's leading edge (right side, since cards travel left→right
        // through the window) reaches each beam first. So while the RIGHT
        // beam is governing a card's reveal, the code needs to grow in
        // from that card's right side (where the beam first touched it)
        // rather than its left — mirror the clip direction in that case.
        const mirrored = throughRight <= throughLeft

        normalCard.style.setProperty('--clip-right', `${(1 - reveal) * 100}%`)
        asciiCard.style.setProperty('--clip-left', `${(1 - reveal) * 100}%`)
        normalCard.classList.toggle(styles.mirrored, mirrored)
        asciiCard.classList.toggle(styles.mirrored, mirrored)

        if (throughLeft > 0 && throughLeft < 1) leftActive = true
        if (throughRight > 0 && throughRight < 1) rightActive = true
      })

      if (leftScannerRef) { leftScannerRef.updateOffset(offset); leftScannerRef.setScanningActive(leftActive) }
      if (rightScannerRef) { rightScannerRef.updateOffset(offset); rightScannerRef.setScanningActive(rightActive) }
    }

    let scanRaf = (() => {
      function loop() { updateClipping(); scanRaf = requestAnimationFrame(loop) }
      return requestAnimationFrame(loop)
    })()

    // ── Particle beam (one light bar + its particle stream) ──
    class ParticleScanner {
      constructor(canvas, sign) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.sign = sign
        this.offsetX = 0
        this.w = window.innerWidth
        this.h = 300
        this.particles = []
        this.count = 0
        this.maxParticles = 800
        this.intensity = 0.8
        this.lightBarX = this.w / 2 + this.offsetX
        this.lightBarWidth = 3
        this.fadeZone = 60
        this.scanTargetIntensity = 1.8
        this.scanTargetParticles = 2500
        this.scanTargetFadeZone = 35
        this.scanningActive = false
        this.baseIntensity = this.intensity
        this.baseMaxParticles = this.maxParticles
        this.baseFadeZone = this.fadeZone
        this.currentIntensity = this.intensity
        this.currentMaxParticles = this.maxParticles
        this.currentFadeZone = this.fadeZone
        this.transitionSpeed = 0.05
        this.currentGlowIntensity = 1
        this.animId = null
        this.onResizeBound = () => this.onResize()
        this.setup()
        this.createGrad()
        this.initParticles()
        this.animate()
        window.addEventListener('resize', this.onResizeBound)
      }
      setup() {
        this.canvas.width = this.w
        this.canvas.height = this.h
      }
      updateOffset(offsetPx) {
        this.offsetX = this.sign * offsetPx
        this.lightBarX = this.w / 2 + this.offsetX
      }
      onResize() {
        this.w = window.innerWidth
        this.lightBarX = this.w / 2 + this.offsetX
        this.setup()
      }
      createGrad() {
        this.gc = document.createElement('canvas'); this.gc.width = 16; this.gc.height = 16
        const c = this.gc.getContext('2d'), h = 8
        const g = c.createRadialGradient(h, h, 0, h, h, h)
        g.addColorStop(0, 'rgba(255,255,255,1)')
        g.addColorStop(0.3, 'rgba(47,148,216,0.8)')
        g.addColorStop(0.7, 'rgba(123,44,191,0.4)')
        g.addColorStop(1, 'transparent')
        c.fillStyle = g; c.beginPath(); c.arc(h, h, h, 0, Math.PI * 2); c.fill()
      }
      rf(min, max) { return Math.random() * (max - min) + min }
      mkParticle() {
        const ir = this.intensity / this.baseIntensity
        const sm = 1 + (ir - 1) * 1.2
        return {
          x: this.lightBarX + this.rf(-1.5, 1.5),
          y: this.rf(0, this.h),
          vx: this.rf(0.2, 1.0) * sm, vy: this.rf(-0.15, 0.15) * sm,
          radius: this.rf(0.4, 1),
          alpha: this.rf(0.6, 1), decay: this.rf(0.005, 0.025),
          originalAlpha: 0, life: 1.0, time: 0,
          twinkleSpeed: this.rf(0.02, 0.08), twinkleAmount: this.rf(0.1, 0.25),
        }
      }
      initParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
          const p = this.mkParticle(); p.originalAlpha = p.alpha
          this.count++; this.particles[this.count] = p
        }
      }
      updateP(p) {
        p.x += p.vx; p.y += p.vy; p.time++
        p.alpha = p.originalAlpha * p.life + Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount
        p.life -= p.decay
        if (p.x > this.w + 10 || p.life <= 0) {
          p.x = this.lightBarX + this.rf(-1.5, 1.5); p.y = this.rf(0, this.h)
          p.vx = this.rf(0.2, 1.0); p.vy = this.rf(-0.15, 0.15)
          p.alpha = this.rf(0.6, 1); p.originalAlpha = p.alpha; p.life = 1.0; p.time = 0
        }
      }
      drawP(p) {
        if (p.life <= 0) return
        let fa = 1
        if (p.y < this.fadeZone) fa = p.y / this.fadeZone
        else if (p.y > this.h - this.fadeZone) fa = (this.h - p.y) / this.fadeZone
        fa = Math.max(0, Math.min(1, fa))
        this.ctx.globalAlpha = p.alpha * fa
        this.ctx.drawImage(this.gc, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2)
      }
      drawLightBar() {
        const vg = this.ctx.createLinearGradient(0, 0, 0, this.h)
        vg.addColorStop(0, 'rgba(255,255,255,0)')
        vg.addColorStop(this.fadeZone / this.h, 'rgba(255,255,255,1)')
        vg.addColorStop(1 - this.fadeZone / this.h, 'rgba(255,255,255,1)')
        vg.addColorStop(1, 'rgba(255,255,255,0)')

        this.ctx.globalCompositeOperation = 'lighter'
        const ti = this.scanningActive ? 3.5 : 1
        this.currentGlowIntensity += (ti - this.currentGlowIntensity) * this.transitionSpeed
        const gi = this.currentGlowIntensity
        const lw = this.lightBarWidth

        const cg = this.ctx.createLinearGradient(this.lightBarX - lw / 2, 0, this.lightBarX + lw / 2, 0)
        cg.addColorStop(0, 'rgba(255,255,255,0)')
        cg.addColorStop(0.5, `rgba(255,255,255,${gi})`)
        cg.addColorStop(1, 'rgba(255,255,255,0)')
        this.ctx.globalAlpha = 1; this.ctx.fillStyle = cg
        this.ctx.beginPath(); this.ctx.roundRect(this.lightBarX - lw / 2, 0, lw, this.h, 15); this.ctx.fill()

        const g1 = this.ctx.createLinearGradient(this.lightBarX - lw * 2, 0, this.lightBarX + lw * 2, 0)
        g1.addColorStop(0, 'rgba(47,148,216,0)'); g1.addColorStop(0.5, `rgba(255,255,255,${0.8 * gi})`); g1.addColorStop(1, 'rgba(47,148,216,0)')
        this.ctx.globalAlpha = this.scanningActive ? 1 : 0.8; this.ctx.fillStyle = g1
        this.ctx.beginPath(); this.ctx.roundRect(this.lightBarX - lw * 2, 0, lw * 4, this.h, 25); this.ctx.fill()

        const g2 = this.ctx.createLinearGradient(this.lightBarX - lw * 4, 0, this.lightBarX + lw * 4, 0)
        g2.addColorStop(0, 'rgba(123,44,191,0)'); g2.addColorStop(0.5, `rgba(47,148,216,${0.4 * gi})`); g2.addColorStop(1, 'rgba(123,44,191,0)')
        this.ctx.globalAlpha = this.scanningActive ? 0.8 : 0.6; this.ctx.fillStyle = g2
        this.ctx.beginPath(); this.ctx.roundRect(this.lightBarX - lw * 4, 0, lw * 8, this.h, 35); this.ctx.fill()

        this.ctx.globalCompositeOperation = 'destination-in'
        this.ctx.globalAlpha = 1; this.ctx.fillStyle = vg
        this.ctx.fillRect(0, 0, this.w, this.h)
      }
      render() {
        if (window.innerWidth < 768) {
          this.ctx.clearRect(0, 0, this.w, this.h)
          return
        }
        const ti = this.scanningActive ? this.scanTargetIntensity : this.baseIntensity
        const tm = this.scanningActive ? this.scanTargetParticles : this.baseMaxParticles
        const tf = this.scanningActive ? this.scanTargetFadeZone : this.baseFadeZone
        this.currentIntensity += (ti - this.currentIntensity) * this.transitionSpeed
        this.currentMaxParticles += (tm - this.currentMaxParticles) * this.transitionSpeed
        this.currentFadeZone += (tf - this.currentFadeZone) * this.transitionSpeed
        this.intensity = this.currentIntensity
        this.maxParticles = Math.floor(this.currentMaxParticles)
        this.fadeZone = this.currentFadeZone

        this.ctx.globalCompositeOperation = 'source-over'
        this.ctx.clearRect(0, 0, this.w, this.h)
        this.drawLightBar()
        this.ctx.globalCompositeOperation = 'lighter'
        for (let i = 1; i <= this.count; i++) {
          if (this.particles[i]) { this.updateP(this.particles[i]); this.drawP(this.particles[i]) }
        }
        if (Math.random() < this.intensity && this.count < this.maxParticles) {
          const p = this.mkParticle(); p.originalAlpha = p.alpha; this.count++; this.particles[this.count] = p
        }
        if (this.count > this.maxParticles + 200) {
          const ex = Math.min(15, this.count - this.maxParticles)
          for (let i = 0; i < ex; i++) delete this.particles[this.count - i]
          this.count -= ex
        }
      }
      animate() { this.render(); this.animId = requestAnimationFrame(() => this.animate()) }
      setScanningActive(v) { this.scanningActive = v }
      destroy() {
        if (this.animId) cancelAnimationFrame(this.animId)
        window.removeEventListener('resize', this.onResizeBound)
      }
    }

    const scannerCanvasLeft = scannerCanvasLeftRef.current
    const scannerCanvasRight = scannerCanvasRightRef.current
    let leftScannerRef = scannerCanvasLeft ? new ParticleScanner(scannerCanvasLeft, -1) : null
    let rightScannerRef = scannerCanvasRight ? new ParticleScanner(scannerCanvasRight, 1) : null

    // Cleanup
    return () => {
      if (s.rafId) cancelAnimationFrame(s.rafId)
      cancelAnimationFrame(scanRaf)
      clearInterval(asciiTimer)
      if (leftScannerRef) leftScannerRef.destroy()
      if (rightScannerRef) rightScannerRef.destroy()
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', endDrag)
      document.removeEventListener('touchend', endDrag)
    }
  }, [])

  return (
    <section id="work" className={styles.section}>
      <div className={styles.header}>
        <SectionHeader label="our work" title="Projects" accent="& Works" />
      </div>

      <div className={styles.streamWrap} ref={containerRef}>
        <canvas id="particleCanvas" ref={particleCanvasRef} className={styles.particleCanvas} />
        <canvas id="scannerCanvasLeft" ref={scannerCanvasLeftRef} className={styles.scannerCanvas} />
        <canvas id="scannerCanvasRight" ref={scannerCanvasRightRef} className={styles.scannerCanvas} />


        <div className={styles.cardStream}>
          <div className={styles.cardLine} ref={cardLineRef} />
        </div>
      </div>

      <div className={styles.footer}>
        <Link to="/projects" className={styles.seeMore}>see more →</Link>
      </div>
    </section>
  )
}
