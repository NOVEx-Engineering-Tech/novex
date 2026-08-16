import { useState } from 'react'
import { useFadeUp } from '../../utils/StdHooks'
import SectionHeader from '../../components/StdSectionHeader'
import ContactModal from '../../components/ContactModal'
import TerminalContact from '../../components/StdTerminalContact'
import styles from './Contact.module.css'

export default function Contact() {
  const ref = useFadeUp()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <SectionHeader label="reach out" title="Get in" accent="touch" />

        <div className={`${styles.wrap} fade-up`} ref={ref}>
          <TerminalContact />

          <div className={styles.responseBox}>
            <div className={styles.responseTitle}>// response time</div>
            <p>We typically respond within <strong>24–48 hours</strong>.<br/>For urgent inquiries, use the business email directly.</p>
          </div>

          <button type="button" className={`btn-primary ${styles.contactUsBtn}`} onClick={() => setModalOpen(true)}>
            contact us →
          </button>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
