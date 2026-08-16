import { useEffect } from 'react'
import { loadContactChannels } from '../lib/contactLoader'
import styles from './ContactModal.module.css'

/**
 * Popup that lists every currently-configured contact channel
 * (from configs/contact.json) as a clickable option. Picking one
 * opens/redirects to that platform. Purely presentational — driven
 * entirely by whatever channels are non-empty in the config, so it
 * grows or shrinks automatically as channels get added.
 */
export default function ContactModal({ open, onClose }) {
  const channels = loadContactChannels()

  useEffect(() => {
    if (!open) return
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  function handleChoose(channel) {
    if (channel.external) {
      window.open(channel.href, '_blank', 'noopener,noreferrer')
    } else {
      window.open(channel.href, '_self')
    }
    onClose()
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Choose how to contact us"
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>

        <div className={styles.header}>
          <div className={styles.eyebrow}>// choose a channel</div>
          <h3 className={styles.title}>Contact us via</h3>
        </div>

        {channels.length === 0 ? (
          <p className={styles.empty}>No contact channels configured yet.</p>
        ) : (
          <div className={styles.grid}>
            {channels.map(c => (
              <button key={c.key} className={styles.option} onClick={() => handleChoose(c)}>
                <span className={styles.optionIcon}><c.Icon /></span>
                <span className={styles.optionLabel}>{c.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
