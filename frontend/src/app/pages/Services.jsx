import { useFadeUp } from '../../utils/StdHooks'
import { SERVICES } from '../../utils/constants'
import SectionHeader from '../../components/StdSectionHeader'
import styles from './Services.module.css'

export default function Services() {
  const ref = useFadeUp()

  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <SectionHeader label="what we do" title="Our" accent="services" />
        <div className={`${styles.grid} fade-up`} ref={ref}>
          {SERVICES.map(s => (
            <div key={s.num} className={styles.card}>
              <span className={styles.num}>{s.num}</span>
              <div className={styles.name}>{s.name}</div>
              <p className={styles.desc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
