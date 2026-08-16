import { useFadeUp } from '../../utils/StdHooks'
import { TECH_LANGUAGES, TECH_TOOLS } from '../../utils/constants'
import SectionHeader from '../../components/StdSectionHeader'
import styles from './Technologies.module.css'

function TechGrid({ items }) {
  return (
    <div className={styles.grid}>
      {items.map(t => (
        <div key={t.name} className={styles.chip}>
          <img src={t.icon} alt={t.name} />
          {t.name}
        </div>
      ))}
    </div>
  )
}

export default function Technologies() {
  const ref = useFadeUp()

  return (
    <section id="technologies" className={styles.tech}>
      <div className="container">
        <SectionHeader label="stack" title="Technologies" accent="we use" />

        <div className="fade-up" ref={ref}>
          <div className={styles.groupTitle}>## languages &amp; frameworks</div>
          <TechGrid items={TECH_LANGUAGES} />

          <div className={styles.groupTitle}>## tools &amp; infrastructure</div>
          <TechGrid items={TECH_TOOLS} />
        </div>
      </div>
    </section>
  )
}
