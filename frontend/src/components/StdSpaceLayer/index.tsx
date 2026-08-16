/**
 * @uuid         CMP-LAY-001
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Fixed, full-viewport ambient backdrop layer: a looping background video, a twinkling star canvas with slow parallax dust, and occasional shooting stars, with a configurable video source.
 *
 * @whereToUse
 * Mount once near the root of the app (e.g. the top-level layout/App component), behind all page content.
 *
 * @whenToUse
 * Use whenever a page or app needs an animated space/starfield ambient background that reacts subtly to the viewport width.
 */

import { useEffect, useRef } from 'react'
import './style.css'

/**
 * Fixed full-page ambient backdrop: the NOVEx blackhole video, a
 * twinkling star canvas with a slow parallax dust layer, and
 * occasional shooting stars. Sits behind all page content (z-index
 * handled in SpaceLayer.module.css) and is independent of any
 * per-section canvas effects (e.g. Hero's particle canvas).
 */
export default function SpaceLayer({ videoSrc = '/assets/novex-bg.webm' }) {
  const canvasRef = useRef(null)
  const videoRef = useRef(null)

  // Continuous zoom tied directly to viewport width — as the screen
  // narrows the video scales up smoothly (no stepped breakpoints), so
  // it stays cropped/covering with no visible edge, without ever
  // overlapping outside its own fixed, overflow-hidden container.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    function applyZoom() {
      const w = window.innerWidth
      // 1x at 900px+ wide, scales up to ~1.9x by 360px wide
      const scale = Math.min(1.9, Math.max(1, 1 + (900 - w) / 620))
      video.style.transform = `scale(${scale})`
    }
    applyZoom()
    window.addEventListener('resize', applyZoom)
    return () => window.removeEventListener('resize', applyZoom)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let ambient = []
    let dust = []
    let shooters = []
    let rafId = 0
    let shooterInterval

    function resize() {
      // .spaceLayer is `position: fixed; inset: 0` — it only ever shows
      // one viewport's worth. Sizing the canvas to the full page's
      // scrollHeight (much taller on a long page) forces every frame to
      // render a bitmap many times larger than what's visible, which
      // the browser then has to downscale into the fixed box — a big,
      // unnecessary cost repeated on every single frame.
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    function initStars() {
      ambient = Array.from({ length: 120 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      }))
      dust = Array.from({ length: 22 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.2 + 1.4,
        vx: (Math.random() - 0.5) * 0.06,
        vy: 0.02 + Math.random() * 0.05,
        alpha: 0.08 + Math.random() * 0.16,
      }))
      shooters = []
    }
    function spawnShooter() {
      if (reduceMotion) return
      shooters.push({
        x: Math.random() * w * 0.7,
        y: Math.random() * h * 0.3,
        len: 80 + Math.random() * 60,
        speed: 6 + Math.random() * 4,
        angle: Math.PI / 4 + Math.random() * 0.15,
        life: 1,
      })
    }
    function tick(t) {
      ctx.clearRect(0, 0, w, h)

      dust.forEach((d) => {
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,170,220,${d.alpha})`
        ctx.fill()
        if (!reduceMotion) {
          d.x += d.vx
          d.y += d.vy
          if (d.y > h + 10) { d.y = -10; d.x = Math.random() * w }
          if (d.x < -10) d.x = w + 10
          if (d.x > w + 10) d.x = -10
        }
      })

      ambient.forEach((s) => {
        const tw = reduceMotion ? 0.6 : 0.5 + 0.5 * Math.sin(t * 0.0006 * s.speed + s.phase)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,243,255,${0.15 + tw * 0.55})`
        ctx.fill()
      })
      shooters.forEach((sh) => {
        const dx = Math.cos(sh.angle) * sh.len
        const dy = Math.sin(sh.angle) * sh.len
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - dx, sh.y - dy)
        grad.addColorStop(0, 'rgba(255,255,255,0.9)')
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(sh.x, sh.y)
        ctx.lineTo(sh.x - dx, sh.y - dy)
        ctx.stroke()
        sh.x += Math.cos(sh.angle) * sh.speed
        sh.y += Math.sin(sh.angle) * sh.speed
        sh.life -= 0.006
      })
      shooters = shooters.filter((s) => s.life > 0 && s.y < h + 100)
      rafId = requestAnimationFrame(tick)
    }

    resize()
    initStars()
    rafId = requestAnimationFrame(tick)
    if (!reduceMotion && !document.hidden) shooterInterval = window.setInterval(spawnShooter, 3200)

    const onResize = () => { resize(); initStars() }
    window.addEventListener('resize', onResize)

    // requestAnimationFrame already pauses itself while the tab is
    // hidden, but setInterval doesn't — browsers just throttle it
    // (roughly once a second) instead of stopping it. Left alone, that
    // means shooters keep queuing up while backgrounded with nothing
    // running to animate or expire them, so they all render/animate at
    // once in a burst the moment the tab regains focus. Explicitly
    // pausing both on hide, and dropping anything queued on show,
    // prevents that.
    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(rafId)
        if (shooterInterval) { clearInterval(shooterInterval); shooterInterval = undefined }
      } else {
        shooters = []
        rafId = requestAnimationFrame(tick)
        if (!reduceMotion) shooterInterval = window.setInterval(spawnShooter, 3200)
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(rafId)
      if (shooterInterval) clearInterval(shooterInterval)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <div className={'spl-spaceLayer'} aria-hidden="true">
      <video className={'spl-bgVideo'} ref={videoRef} autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/webm" />
      </video>
      <canvas className={'spl-starsCanvas'} ref={canvasRef} />
      <div className="spl-orb spl-orb1" />
      <div className="spl-orb spl-orb2" />
    </div>
  )
}
