import { useState } from 'react'
import { useFadeUp } from '../../utils/StdHooks'
import { TECH_LANGUAGES, TECH_TOOLS } from '../../utils/constants'
import SectionHeader from '../../components/StdSectionHeader'
import styles from './Technologies.module.css'

const ALL_TECH = [...TECH_LANGUAGES, ...TECH_TOOLS]
const TECH_BY_NAME = new Map(ALL_TECH.map(item => [item.name, item]))

const CAPABILITIES = [
  {
    title: 'Web & Product',
    desc: 'Websites, dashboards, customer portals, and product interfaces that feel fast and easy to use.',
    tech: ['React', 'Next.js', 'Vue.js', 'Svelte', 'TypeScript', 'Flutter'],
  },
  {
    title: 'Backend & APIs',
    desc: 'The systems behind your product: business logic, integrations, authentication, and reliable services.',
    tech: ['Node.js', 'Python', 'Java', 'PHP', 'Laravel', 'Go'],
  },
  {
    title: 'Data & Databases',
    desc: 'Structured, searchable, and dependable data foundations for day-to-day operations and growth.',
    tech: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    title: 'Cloud & Delivery',
    desc: 'Deployment, version control, infrastructure, and workflows that help products launch and stay maintainable.',
    tech: ['Docker', 'Kubernetes', 'Git', 'GitHub', 'Linux', 'npm'],
  },
  {
    title: 'Design & Prototyping',
    desc: 'Interface design and rapid prototyping so ideas are clear before and during development.',
    tech: ['Figma', 'VS Code', 'Android Studio', 'Unity', 'Godot'],
  },
]

function TechChip({ item }) {
  if (!item) return null
  return (
    <span className={styles.chip}>
      <img src={item.icon} alt="" loading="lazy" decoding="async" />
      {item.name}
    </span>
  )
}

export default function Technologies() {
  const ref = useFadeUp()
  const [showAll, setShowAll] = useState(false)

  return (
    <section id="technologies" className={styles.tech}>
      <div className="container">
        <SectionHeader label="capabilities" title="How we" accent="build" />

        <div className={`fade-up ${styles.content}`} ref={ref}>
          <p className={styles.intro}>
            You do not need to choose the technology. We choose the tools that fit the product, then explain the trade-offs in plain language.
          </p>

          <div className={styles.capabilityGrid}>
            {CAPABILITIES.map(group => (
              <article key={group.title} className={styles.capabilityCard}>
                <h3>{group.title}</h3>
                <p>{group.desc}</p>
                <div className={styles.featuredTech} aria-label={`${group.title} technologies`}>
                  {group.tech.map(name => <TechChip key={name} item={TECH_BY_NAME.get(name)} />)}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.fullStack}>
            <button
              type="button"
              className={styles.stackToggle}
              aria-expanded={showAll}
              aria-controls="novex-full-stack"
              onClick={() => setShowAll(value => !value)}
            >
              {showAll ? 'hide full technology stack ↑' : 'view full technology stack ↓'}
            </button>

            {showAll && (
              <div id="novex-full-stack" className={styles.stackPanel}>
                <div className={styles.groupTitle}>Languages, frameworks & databases</div>
                <div className={styles.grid}>
                  {TECH_LANGUAGES.map(item => <TechChip key={item.name} item={item} />)}
                </div>

                <div className={styles.groupTitle}>Tools & infrastructure</div>
                <div className={styles.grid}>
                  {TECH_TOOLS.map(item => <TechChip key={item.name} item={item} />)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
