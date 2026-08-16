/**
 * @uuid         CMP-INP-001
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Modal search popup: a focused text input plus submit/cancel actions, used to collect a free-text query and hand it back to the caller via onSubmit.
 *
 * @whereToUse
 * Any page/feature that needs a lightweight 'search for X' popup overlay.
 *
 * @whenToUse
 * Use when you need to collect a search query in a focused modal rather than an inline input — the component is fully controlled by initialValue/onSubmit/onClose props and holds no external state.
 */

import { useEffect, useRef, useState } from 'react'
import styles from './style.module.css'

/**
 * Search popup used both on desktop (opened via Enter) and mobile
 * (opened via the navbar button). The parent only renders this
 * component while `open` is true, so every time it appears it's a
 * fresh mount seeded with `initialValue` — no need to reset state
 * from an effect.
 * - Enter (inside the input, or the "search" button) submits.
 * - Esc (or the "x"/cancel button, or clicking the backdrop) closes.
 * Matching happens by name, project type, or language — see
 * utils/workLoader.searchWorkItems for the actual filter logic; this
 * component only collects the query text and hands it back up.
 */
export default function ProjectSearch({ initialValue = '', onSubmit, onClose }) {
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 30)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(value)
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Search projects"
        onClick={e => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close search">✕</button>

        <div className={styles.header}>
          <div className={styles.eyebrow}>// search</div>
          <h3 className={styles.title}>Find a project</h3>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="name, type, or language..."
            value={value}
            onChange={e => setValue(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              ✕ cancel
            </button>
            <button type="submit" className={styles.searchBtn}>
              search
            </button>
          </div>
        </form>

        <p className={styles.hint}>
          try <em>website</em>, <em>python</em>, or a project name — press <kbd>enter</kbd> to search, <kbd>esc</kbd> to close
        </p>
      </div>
    </div>
  )
}
