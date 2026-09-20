/**
 * @uuid         CMP-LAY-001
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 *
 * @description
 * Fixed, full-viewport ambient backdrop layer:
 * - looping NOVEx black-hole video
 * - lightweight star canvas
 * - occasional shooting stars
 * - subtle nebula/orb atmosphere
 *
 * Performance notes:
 * - Canvas is capped to a reasonable device pixel ratio.
 * - Star rendering is limited to ~30 FPS.
 * - Canvas animation pauses while scrolling.
 * - Background video pauses briefly while scrolling.
 * - Hidden tabs stop all animation work.
 */

import { useEffect, useRef } from 'react'
import styles from './style.module.css'

export default function SpaceLayer({
  videoSrc = '/assets/novex-bg.webm',
}) {
  const canvasRef = useRef(null)
  const videoRef = useRef(null)

  const scrollResumeTimerRef = useRef(null)

  /*
   * ─────────────────────────────────────────────
   * Background video
   * ─────────────────────────────────────────────
   */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const pauseDuringScroll = () => {
      if (!video.paused) {
        video.pause()
      }

      if (scrollResumeTimerRef.current) {
        clearTimeout(scrollResumeTimerRef.current)
      }

      scrollResumeTimerRef.current = window.setTimeout(() => {
        if (!document.hidden) {
          video.play().catch(() => {})
        }
      }, 180)
    }

    window.addEventListener('scroll', pauseDuringScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', pauseDuringScroll)

      if (scrollResumeTimerRef.current) {
        clearTimeout(scrollResumeTimerRef.current)
      }
    }
  }, [])

  /*
   * ─────────────────────────────────────────────
   * Star canvas
   * ─────────────────────────────────────────────
   */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    })

    if (!ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let width = 0
    let height = 0

    let ambient = []
    let dust = []
    let shooters = []

    let animationFrame = 0
    let shooterInterval = null

    let running = true
    let scrolling = false

    /*
     * 30 FPS is intentional.
     *
     * The space background is ambient decoration,
     * so rendering it at 60/120/144/165 FPS provides
     * very little visual benefit while increasing GPU/CPU work.
     */
    const TARGET_FPS = 30
    const FRAME_TIME = 1000 / TARGET_FPS

    let lastFrameTime = 0

    /*
     * Limit DPR.
     *
     * Without this, a high-DPI display can turn a
     * 1920x1080 canvas into a 3840x2160 or larger
     * rendering surface.
     */
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

      width = window.innerWidth
      height = window.innerHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function initStars() {
      /*
       * 100 ambient stars instead of 120.
       * The difference is visually negligible but reduces
       * per-frame canvas work.
       */
      ambient = Array.from({ length: 100 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      }))

      /*
       * Dust particles are intentionally kept low.
       */
      dust = Array.from({ length: 16 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1.4,
        vx: (Math.random() - 0.5) * 0.06,
        vy: 0.02 + Math.random() * 0.05,
        alpha: 0.08 + Math.random() * 0.16,
      }))

      shooters = []
    }

    function spawnShooter() {
      if (reduceMotion || !running || scrolling || document.hidden) {
        return
      }

      /*
       * Don't allow a large queue of shooting stars.
       */
      if (shooters.length >= 1) {
        return
      }

      shooters.push({
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.3,
        len: 80 + Math.random() * 60,
        speed: 6 + Math.random() * 4,
        angle: Math.PI / 4 + Math.random() * 0.15,
        life: 1,
      })
    }

    function draw(timestamp) {
      animationFrame = requestAnimationFrame(draw)

      if (!running || scrolling || document.hidden) {
        return
      }

      /*
       * FPS limiter.
       */
      if (timestamp - lastFrameTime < FRAME_TIME) {
        return
      }

      lastFrameTime = timestamp

      ctx.clearRect(0, 0, width, height)

      /*
       * ─────────────────────────────
       * Dust
       * ─────────────────────────────
       */
      for (let i = 0; i < dust.length; i++) {
        const d = dust[i]

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)

        ctx.fillStyle = `rgba(180,170,220,${d.alpha})`
        ctx.fill()

        if (!reduceMotion) {
          d.x += d.vx
          d.y += d.vy

          if (d.y > height + 10) {
            d.y = -10
            d.x = Math.random() * width
          }

          if (d.x < -10) d.x = width + 10
          if (d.x > width + 10) d.x = -10
        }
      }

      /*
       * ─────────────────────────────
       * Ambient stars
       * ─────────────────────────────
       */
      for (let i = 0; i < ambient.length; i++) {
        const star = ambient[i]

        const twinkle = reduceMotion
          ? 0.6
          : 0.5 +
            0.5 *
              Math.sin(
                timestamp * 0.0006 * star.speed +
                  star.phase
              )

        ctx.beginPath()
        ctx.arc(
          star.x,
          star.y,
          star.r,
          0,
          Math.PI * 2
        )

        ctx.fillStyle = `rgba(245,243,255,${
          0.15 + twinkle * 0.55
        })`

        ctx.fill()
      }

      /*
       * ─────────────────────────────
       * Shooting stars
       * ─────────────────────────────
       */
      for (let i = shooters.length - 1; i >= 0; i--) {
        const shooter = shooters[i]

        const dx =
          Math.cos(shooter.angle) * shooter.len

        const dy =
          Math.sin(shooter.angle) * shooter.len

        const gradient = ctx.createLinearGradient(
          shooter.x,
          shooter.y,
          shooter.x - dx,
          shooter.y - dy
        )

        gradient.addColorStop(
          0,
          'rgba(255,255,255,0.9)'
        )

        gradient.addColorStop(
          1,
          'rgba(255,255,255,0)'
        )

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.6

        ctx.beginPath()
        ctx.moveTo(shooter.x, shooter.y)
        ctx.lineTo(
          shooter.x - dx,
          shooter.y - dy
        )
        ctx.stroke()

        shooter.x +=
          Math.cos(shooter.angle) * shooter.speed

        shooter.y +=
          Math.sin(shooter.angle) * shooter.speed

        shooter.life -= 0.006

        if (
          shooter.life <= 0 ||
          shooter.y > height + 100
        ) {
          shooters.splice(i, 1)
        }
      }
    }

    /*
     * ─────────────────────────────────────────────
     * Scroll performance
     * ─────────────────────────────────────────────
     */
    let scrollTimer = null

    function handleScroll() {
      scrolling = true

      if (scrollTimer) {
        clearTimeout(scrollTimer)
      }

      scrollTimer = window.setTimeout(() => {
        scrolling = false
      }, 120)
    }

    /*
     * ─────────────────────────────────────────────
     * Visibility
     * ─────────────────────────────────────────────
     */
    function handleVisibility() {
      if (document.hidden) {
        running = false
        shooters = []
      } else {
        running = true
        lastFrameTime = 0
      }
    }

    /*
     * ─────────────────────────────────────────────
     * Resize
     * ─────────────────────────────────────────────
     */
    function handleResize() {
      resize()
      initStars()
    }

    resize()
    initStars()

    /*
     * Start animation.
     */
    animationFrame = requestAnimationFrame(draw)

    /*
     * Shooting stars are deliberately infrequent.
     */
    if (!reduceMotion) {
      shooterInterval = window.setInterval(
        spawnShooter,
        4000
      )
    }

    window.addEventListener(
      'resize',
      handleResize,
      { passive: true }
    )

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    document.addEventListener(
      'visibilitychange',
      handleVisibility
    )

    return () => {
      cancelAnimationFrame(animationFrame)

      if (shooterInterval) {
        clearInterval(shooterInterval)
      }

      if (scrollTimer) {
        clearTimeout(scrollTimer)
      }

      window.removeEventListener(
        'resize',
        handleResize
      )

      window.removeEventListener(
        'scroll',
        handleScroll
      )

      document.removeEventListener(
        'visibilitychange',
        handleVisibility
      )
    }
  }, [])

  return (
    <div
      className={styles.spaceLayer}
      aria-hidden="true"
    >
      <video
        className={styles.bgVideo}
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source
          src={videoSrc}
          type="video/webm"
        />
      </video>

      <canvas
        className={styles.starsCanvas}
        ref={canvasRef}
      />

      <div
        className={`${styles.orb} ${styles.orb1}`}
      />

      <div
        className={`${styles.orb} ${styles.orb2}`}
      />
    </div>
  )
}