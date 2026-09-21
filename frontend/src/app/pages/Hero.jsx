import { useEffect, useRef, useState } from 'react'
import { useTypewriter, useParticleCanvas, useCountUp } from '../../utils/StdHooks'
import { TYPEWRITER_PHRASES } from '../../utils/constants'
import heroBlobRaw from '../../assets/hero-blob.svg?raw'
import styles from './Hero.module.css'
import { Link } from 'react-router-dom'

// Splits a stat value like "23+" into { number: 23, suffix: '+' }
// and animates the number from 0 up on mount, keeping any suffix static.
function StatCounter({ val, delay }) {
  const match = val.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : val
  const count = useCountUp(target, { duration: 1200, delay })
  return <>{count}{suffix}</>
}

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const visualRef = useRef(null)
  const blobWrapRef = useRef(null)
  const astroRef = useRef(null)
  const glowRef = useRef(null)
  const glowFrameRef = useRef(null)
  const glowTargetRef = useRef({ x: -9999, y: -9999, visible: false })

  useParticleCanvas(sectionRef, canvasRef)
  const typed = useTypewriter(TYPEWRITER_PHRASES)

  function onMouseMove(e) {
    glowTargetRef.current.x = e.clientX
    glowTargetRef.current.y = e.clientY
    glowTargetRef.current.visible = true

    if (glowFrameRef.current) return
    glowFrameRef.current = requestAnimationFrame(() => {
      glowFrameRef.current = null
      const glow = glowRef.current
      const target = glowTargetRef.current
      if (!glow) return
      glow.style.left = `${target.x}px`
      glow.style.top = `${target.y}px`
      glow.style.opacity = target.visible ? '1' : '0'
    })
  }
  function onMouseLeave() {
    glowTargetRef.current.visible = false
    if (glowFrameRef.current) cancelAnimationFrame(glowFrameRef.current)
    glowFrameRef.current = requestAnimationFrame(() => {
      glowFrameRef.current = null
      if (glowRef.current) glowRef.current.style.opacity = '0'
    })
  }

  // Parallax: the blob + astronaut drift slightly toward the cursor
  // while it's over the hero, matching the standalone prototype.
  // Uses direct refs (not querySelector-by-class) so there's no
  // dependency on CSS-module hash matching inside the injected SVG.
  useEffect(() => {
    const section = sectionRef.current
    const visual = visualRef.current
    if (!section || !visual) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let frame = null
    let lastX = 0
    let lastY = 0

    function onMove(e) {
      lastX = e.clientX
      lastY = e.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = null
        const rect = visual.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (lastX - cx) / rect.width
        const dy = (lastY - cy) / rect.height
        const blobWrap = blobWrapRef.current
        const astro = astroRef.current
        if (blobWrap) blobWrap.style.transform = `translate3d(${(dx * 12).toFixed(1)}px, ${(dy * 12).toFixed(1)}px, 0) scale(1.02)`
        if (astro) astro.style.transform = `translate3d(${(dx * 20).toFixed(1)}px, ${(dy * 20).toFixed(1)}px, 0)`
      })
    }
    function onLeave() {
      const blobWrap = blobWrapRef.current
      const astro = astroRef.current
      if (blobWrap) blobWrap.style.transform = ''
      if (astro) astro.style.transform = ''
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="home" ref={sectionRef} className={styles.hero} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div
        className={styles.mouseGlow}
        ref={glowRef} style={{ left: '-9999px', top: '-9999px', opacity: 0 }}
      />

      <div className={`container ${styles.inner}`}>
        <div className={styles.split}>

          {/* LEFT — headline + sub */}
          <div className={styles.left}>
            <div className={styles.prompt}>
              <span className={styles.promptSym}>novexarc@corp</span>
              :~$ <span>{typed}</span>
              <span className={styles.cursor}>&nbsp;</span>
            </div>

            <h1 className={styles.headline}>
              We transform<br/>
              <span className={styles.acc}>ideas</span> into<br/>
              <span className={styles.dim}>digital</span><br/>
              solutions<span className={styles.acc}>.</span>
            </h1>

            <p className={styles.sub}>
              <span className={styles.comment}>{'/*'}</span><br/>
              &nbsp;Modern web applications.<br/>
              &nbsp;Clean design. Real results.<br/>
              <span className={styles.comment}>{'*/'}</span>
            </p>

            <div className={styles.actions}>
              <Link to="/projects" className="btn-primary">
                view projects →
              </Link>
              <a href="#contact" className="btn-secondary">get in touch</a>
            </div>

            <div className={styles.stats}>
              {[
                { val: '3',  label: 'services' },
                { val: '2',   label: 'founders' },
                { val: '23+', label: 'technologies' },
              ].map((s, i) => (
                <div key={s.label}>
                  <div className={styles.statVal}><StatCounter val={s.val} delay={i * 150} /></div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — parallax hero visual (desktop only) */}
          <div className={styles.right}>
            <div className={styles.heroVisual} ref={visualRef} aria-hidden="true">
              <div
                className={styles.heroBlobWrap}
                ref={blobWrapRef}
                dangerouslySetInnerHTML={{ __html: heroBlobRaw }}
              />
              <img className={styles.heroAstronaut} ref={astroRef} src="/assets/astronaut.png" alt="" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
