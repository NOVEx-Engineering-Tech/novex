import { COMPANY } from '../utils/constants'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>
            © 2024 NOVEx Engineering Tech. All rights reserved.
            <span className={styles.comment}> // unauthorized distribution prohibited</span>
          </div>
          <div className={styles.links}>
            <a href={`mailto:${COMPANY.email}`}>email</a>
            <a href={COMPANY.github} target="_blank" rel="noreferrer">github</a>
            <a href={COMPANY.website} target="_blank" rel="noreferrer">website</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
