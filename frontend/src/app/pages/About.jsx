import { useFadeUp } from '../../utils/StdHooks'
import SectionHeader from '../../components/StdSectionHeader'
import styles from './About.module.css'

export default function About() {
  const ref = useFadeUp()

  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <SectionHeader label="about" title="Who we" accent="are" />

        <div className={`${styles.grid} fade-up`} ref={ref}>
          <div className={styles.text}>
            <p>NOVEx started as a group of <strong>organized developers</strong> with a shared passion for technology, innovation, and problem-solving.</p>
            <p>What began as collaborative freelancing evolved into a <strong>structured software solutions company</strong> with dedicated leadership and development workflows.</p>
            <p>We believe software should not only function properly but also provide <strong>meaningful experiences, performance, and long-term scalability</strong>.</p>

            <ul className={styles.mission}>
              {[
                'Build reliable and modern web applications',
                'Help clients bring their ideas to life',
                'Maintain clean and scalable development practices',
                'Deliver professional and user-focused solutions',
              ].map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.terminal}>
            <div className={styles.termBar}>
              <span className={`${styles.dot} ${styles.r}`} />
              <span className={`${styles.dot} ${styles.y}`} />
              <span className={`${styles.dot} ${styles.g}`} />
              <span className={styles.termTitle}>novex — bash — 80×24</span>
            </div>
            <div className={styles.termBody}>
              <div className={styles.line}><span className={styles.prompt}>$</span><span className={styles.cmd}> cat mission.txt</span></div>
              <span className={`${styles.out} ${styles.hi}`}>// NOVEx — Engineering Tech</span>
              <span className={styles.out}>Founded: 2024</span>
              <span className={styles.out}>Focus: Web &amp; Software Development</span>
              <span className={styles.out}>Status: <span className={styles.active}>● active</span></span>
              <div className={styles.gap} />
              <div className={styles.line}><span className={styles.prompt}>$</span><span className={styles.cmd}> ls services/</span></div>
              <span className={`${styles.out} ${styles.dim}`}>web-apps/  apis/  ui-ux/  dashboards/</span>
              <span className={`${styles.out} ${styles.dim}`}>secure-systems/  deployment/</span>
              <div className={styles.gap} />
              <div className={styles.line}><span className={styles.prompt}>$</span><span className={`${styles.cmd} ${styles.blinkCursor}`}>&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
