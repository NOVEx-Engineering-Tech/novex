import { Link } from 'react-router-dom'
import { useFadeUp } from '../../utils/StdHooks'
import { loadTeamMembers } from '../../lib/teamLoader'
import SectionHeader from '../../components/StdSectionHeader'
import PersonCard from '../../components/StdPersonCard'
import styles from './Teams.module.css'

import markAquino    from '../../../configs/founders/mark-aquino.json'
import rafaelOli     from '../../../configs/founders/rafael-oli.json'
import kreyFrancisco from '../../../configs/founders/krey-francisco.json'
import dexterPaniza  from '../../../configs/founders/dexter-paniza.json'

const FOUNDERS = [markAquino, rafaelOli, kreyFrancisco, dexterPaniza]

export default function Teams() {
  const founderRef = useFadeUp()
  const memberRef = useFadeUp()
  const members = loadTeamMembers()

  return (
    <section className={styles.teams}>
      <div className="container">
        <Link to="/" className={styles.back}>← back home</Link>

        <SectionHeader label={`founders — ${FOUNDERS.length}`} title="The" accent="founders" />
        <div className={`${styles.grid} fade-up`} ref={founderRef}>
          {FOUNDERS.map(f => (
            <PersonCard key={f.name} person={f} variant="founder" />
          ))}
        </div>

        <div className={styles.spacer} />

        <SectionHeader label={`team — ${members.length} member${members.length === 1 ? '' : 's'}`} title="Our" accent="team" />
        {members.length > 0 ? (
          <div className={`${styles.grid} fade-up`} ref={memberRef}>
            {members.map(m => (
              <PersonCard key={m.name} person={m} variant="member" />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No team members listed yet.</p>
        )}
      </div>
    </section>
  )
}
