import { useFadeUp } from '../../utils/StdHooks'
import { JOIN_POSITIONS, JOIN_CONTRIB, COMPANY } from '../../utils/constants'
import SectionHeader from '../../components/StdSectionHeader'
import styles from './Join.module.css'

export default function Join() {
  const ref = useFadeUp()

  return (
    <section id="join" className={styles.join}>
      <div className="container">

        <SectionHeader
          label="careers"
          title="Join"
          accent={
            <img
              src="/assets/novex-logotype.png"
              alt="NOVEx"
              className={styles.logoInline}
            />
          }
        />

        <p className={styles.lead}>
          We&apos;re building something meaningful. If you&apos;re passionate about clean code,
          thoughtful design, or growing a technology company — we want to hear from you.
        </p>

        <div className={`${styles.grid} fade-up`} ref={ref}>
          <div className={styles.card}>
            <span className={styles.icon}>💼</span>

            <div className={styles.title}>Open Positions</div>

            <p className={styles.desc}>
              We&apos;re actively looking for driven individuals to join our core team.
              We value curiosity, ownership, and the ability to ship quality work independently.
            </p>

            <div className={styles.chips}>
              {JOIN_POSITIONS.map(r => (
                <span key={r} className={styles.chip}>
                  {r}
                </span>
              ))}
            </div>

            <a
              href={`mailto:${COMPANY.email}?subject=Job Application`}
              className="btn-primary"
            >
              apply now →
            </a>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}>⚡</span>

            <div className={styles.title}>Open-Source Contributors</div>

            <p className={styles.desc}>
              Love building in the open? We welcome contributors to our public repositories.
              Good first issues are tagged and ready — dive in anytime.
            </p>

            <div className={styles.chips}>
              {JOIN_CONTRIB.map(r => (
                <span key={r} className={styles.chip}>
                  {r}
                </span>
              ))}
            </div>

            <a
              href={COMPANY.github}
              className="btn-secondary"
              target="_blank"
              rel="noreferrer"
            >
              view repositories
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}