import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './CaseStudy.module.css'

import { agoraContent } from '../../../../configs/work/agora.content'
// Register new case studies here as you build them:
const CONTENT_MAP = {
  agora: agoraContent,
}

const TOC = [
  { id: 'overview', num: '00', label: 'Overview' },
  { id: 'problem', num: '01', label: 'Problem & Goals' },
  { id: 'architecture', num: '02', label: 'Architecture' },
  { id: 'data-model', num: '03', label: 'Data Models' },
  { id: 'core-modules', num: '04', label: 'Core Modules' },
  { id: 'security', num: '05', label: 'Security' },
  { id: 'sprints', num: '06', label: 'Sprint Roadmap' },
  { id: 'post-mortem', num: '07', label: 'Post-Mortem' },
  { id: 'outcome', num: '08', label: 'Sign-off' },
]

function ModuleCard({ item }) {
  return (
    <div className={`${styles.moduleCard} ${item.featured ? styles.moduleCardFeatured : ''}`}>
      <div className={styles.moduleIcon}>
        <span className="material-symbols-outlined">{item.icon}</span>
      </div>
      <div className={styles.moduleNum}>MODULE {item.num}</div>
      <h3 className={styles.moduleTitle}>{item.title}</h3>
      <p className={styles.moduleBody}>{item.body}</p>
      <div className={styles.moduleTag}>{item.tag}</div>
    </div>
  )
}

function Incident({ item }) {
  return (
    <div className={styles.incidentCard}>
      <div className={styles.incidentHead}>
        <span className={styles.incidentBadge}>INCIDENT {item.num}</span>
        <span className="material-symbols-outlined" style={{ color: '#f87171' }}>{item.icon}</span>
      </div>
      <h3 className={styles.incidentTitle}>{item.title}</h3>
      <div className={styles.incidentSymptom}>
        <strong>SYMPTOM:</strong> {item.symptom}
      </div>
      <p className={styles.incidentText}><strong>Root Cause:</strong> {item.cause}</p>
      <p className={styles.incidentText}><strong className={styles.accentText}>Resolution:</strong> {item.fix}</p>
      <div className={styles.incidentResolved}>
        <span className="material-symbols-outlined">check_circle</span> {item.resolved}
      </div>
    </div>
  )
}

export default function CaseStudy() {
  const { id } = useParams()
  const data = CONTENT_MAP[id]
  const [navOpen, setNavOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  if (!data) {
    return (
      <main className={styles.notFound}>
        <p>Case study not found.</p>
        <Link to="/projects">Back to Projects</Link>
      </main>
    )
  }

  const accentVars = {
    '--cs-a1': data.accent.a1,
    '--cs-a2': data.accent.a2,
    '--cs-a3': data.accent.a3,
    '--cs-a4': data.accent.a4,
    '--cs-a5': data.accent.a5,
  }

  return (
    <main className={styles.page} style={accentVars}>
      {/* Terminal intro strip */}
      <div className={styles.container}>
        <div className={styles.terminalStrip}>
          <span className={styles.terminalPrompt}>novex@corp:~$</span>
          <span>case-study --inspect {id} --depth=deep</span>
          <span className={styles.cursor} />
        </div>
      </div>

      <div className={styles.layout}>
        {/* Desktop sticky TOC */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarHead}>
              <span className={styles.sidebarLabel}>// CONTENTS</span>
              <span className={styles.sidebarPill}>DOC_MAP</span>
            </div>
            <nav className={styles.sidebarNav}>
              {TOC.map(t => (
                <a key={t.id} href={`#${t.id}`} className={styles.sidebarLink}>
                  <span className={styles.sidebarNum}>{t.num}</span>
                  <span>{t.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile floating index button */}
        <button
          className={styles.mobileIndexBtn}
          onClick={() => setNavOpen(true)}
          aria-label="Open section index"
        >
          <span className="material-symbols-outlined">segment</span> INDEX
        </button>
        {navOpen && (
          <div className={styles.mobileNavBackdrop} onClick={() => setNavOpen(false)}>
            <aside className={styles.mobileNavDrawer} onClick={e => e.stopPropagation()}>
              <div className={styles.sidebarHead}>
                <span className={styles.sidebarLabel}>CASE INDEX // {data.hero.name}</span>
                <button onClick={() => setNavOpen(false)} aria-label="Close">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <nav className={styles.sidebarNav}>
                {TOC.map(t => (
                  <a key={t.id} href={`#${t.id}`} className={styles.sidebarLink} onClick={() => setNavOpen(false)}>
                    <span className={styles.sidebarNum}>{t.num}</span>
                    <span>{t.label}</span>
                  </a>
                ))}
              </nav>
            </aside>
          </div>
        )}

        <div className={styles.content}>
          {/* 0. OVERVIEW */}
          <section id="overview" className={styles.section}>
            <div className={styles.breadcrumbRow}>
              <div className={styles.breadcrumb}>
                <Link to="/projects">// PROJECTS</Link>
                <span>/</span>
                <span className={styles.accentText}>{data.hero.kicker}</span>
                <span>/</span>
                <span className={styles.white}>{data.hero.name}</span>
              </div>
              <div className={styles.statusPill}>
                <span className={styles.pulseDot} /> ● {data.hero.status}
              </div>
            </div>

            <div className={styles.heroBlock}>
              <div className={styles.heroTitleRow}>
                <h1 className={styles.heroTitle}>{data.hero.name}<span className={styles.accentText}>.</span></h1>
                <span className={styles.heroSubtitle}>{data.hero.subtitle}</span>
              </div>
              <p className={styles.heroLead}>{data.hero.lead}</p>
              <p className={styles.heroDesc}>{data.hero.description}</p>
            </div>

            <div className={styles.taglineBanner}>
              <div className={styles.taglineLeft}>
                <div className={styles.tallyBox}>卌 卌 卌</div>
                <div>
                  <span className={styles.taglineLabel}>PROJECT TAGLINE</span>
                  <p className={styles.taglineText}>"{data.hero.tagline}"</p>
                </div>
              </div>
            </div>

            <div className={styles.metaGrid}>
              {data.metaCards.map((c, i) => (
                <div key={i} className={styles.metaCard}>
                  <div className={styles.metaCardHead}>
                    <span className="material-symbols-outlined">{c.icon}</span> {c.label}
                  </div>
                  <div className={styles.metaCardValue}>{c.value}</div>
                  {c.lines?.map((l, j) => <div key={j} className={styles.metaCardLine}>{l}</div>)}
                  {c.tags && (
                    <div className={styles.metaTags}>
                      {c.tags.map((t, j) => <span key={j} className={styles.metaTag}>{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.stackRow}>
              <span className={styles.stackLabel}>// TECH STACK:</span>
              {data.techStack.map((t, i) => (
                <span key={i} className={styles.stackBadge}>{t}</span>
              ))}
            </div>

            <div className={styles.ctaRow}>
              {data.ctas.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className={c.primary ? styles.ctaPrimary : styles.ctaSecondary}
                >
                  <span>{c.label}</span>
                  <span className="material-symbols-outlined">{c.icon}</span>
                </a>
              ))}
            </div>
          </section>

          {/* 1. PROBLEM & GOALS */}
          <section id="problem" className={styles.section}>
            <div className={styles.card}>
              <div className={styles.twoCol}>
                <div>
                  <div className={styles.eyebrow}><span className={styles.accentText}>// 01</span> The Problem</div>
                  <h2 className={styles.h2}>{data.problem.title}</h2>
                  <p className={styles.body}>{data.problem.body}</p>
                  <div className={styles.painBox}>
                    <div className={styles.accentText}>&gt; OPERATIONAL PAIN POINTS:</div>
                    {data.problem.painPoints.map((p, i) => (
                      <div key={i} className={styles.painItem}><span>✕</span> {p}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className={styles.eyebrow}><span className={styles.accent2Text}>// GOALS</span> Key Objectives</div>
                  <p className={styles.body}>{data.problem.goalsIntro}</p>
                  <div className={styles.goalGrid}>
                    {data.problem.goals.map((g, i) => (
                      <div key={i} className={styles.goalCard}>
                        <div className={styles.goalHead}>
                          <div className={styles.goalIcon}><span className="material-symbols-outlined">{g.icon}</span></div>
                          <span className={styles.goalTitle}>{g.title}</span>
                        </div>
                        <p className={styles.goalBody}>{g.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. ARCHITECTURE */}
          <section id="architecture" className={styles.section}>
            <div className={styles.eyebrow}><span className={styles.accentText}>// 02</span> System Architecture</div>
            <h2 className={styles.h2}>{data.architecture.title}</h2>
            <p className={styles.lead}>{data.architecture.lead}</p>

            <div className={styles.tierGrid}>
              {data.architecture.tiers.map((t, i) => (
                <div key={i} className={styles.tierCard}>
                  <div className={styles.tierHead}>
                    <span className={styles.tierBadge}>TIER {t.num}</span>
                    <span className="material-symbols-outlined">{t.icon}</span>
                  </div>
                  <h3 className={styles.tierTitle}>{t.title}</h3>
                  <p className={styles.tierBody}>{t.body}</p>
                  <div className={styles.tierStack}>
                    {t.stack.map((s, j) => <div key={j}>● {s}</div>)}
                  </div>
                  <div className={styles.tierHosted}>Hosted: {t.hosted}</div>
                </div>
              ))}
            </div>

            <div className={styles.pipelineGrid}>
              <div className={styles.pipelineCard}>
                <div className={styles.pipelineHead}>
                  <span className={styles.accentText}>// REQUEST PIPELINE</span>
                </div>
                <div className={styles.pipelineChain}>
                  {data.architecture.pipeline.map((step, i) => (
                    <>
                      <div key={step} className={styles.pipelineStep}>{i + 1}. {step}</div>
                      {i < data.architecture.pipeline.length - 1 && <span key={`${step}-arrow`} className={styles.arrow}>→</span>}
                    </>
                  ))}
                </div>
              </div>
              <div className={styles.realtimeCard}>
                <div className={styles.eyebrow}>
                  <span className={styles.pulseDotSmall} /> Real-Time Sync Layer
                </div>
                <h3 className={styles.tierTitle}>{data.architecture.realtime.title}</h3>
                <p className={styles.tierBody}>{data.architecture.realtime.body}</p>
                <div className={styles.codeBox}>
                  {data.architecture.realtime.events.map((e, i) => <div key={i}>&gt; {e}</div>)}
                </div>
                <div className={styles.tierHosted}>{data.architecture.realtime.footnote}</div>
              </div>
            </div>
          </section>

          {/* 3. DATA MODEL */}
          <section id="data-model" className={styles.section}>
            <div className={styles.eyebrow}><span className={styles.accent2Text}>// 03</span> Data Architecture</div>
            <h2 className={styles.h2}>{data.dataModel.title}</h2>
            <p className={styles.lead}>{data.dataModel.lead}</p>
            <div className={styles.domainGrid}>
              {data.dataModel.domains.map((d, i) => (
                <div key={i} className={`${styles.domainCard} ${d.wide ? styles.domainCardWide : ''}`}>
                  <div className={styles.domainHead}>
                    <span className={styles.accentText}>DOMAIN {d.num}</span>
                    <span className="material-symbols-outlined">{d.icon}</span>
                  </div>
                  <h3 className={styles.tierTitle}>{d.title}</h3>
                  <p className={styles.tierBody}>{d.body}</p>
                  <div className={styles.tierStack}>
                    {d.facts.map((f, j) => <div key={j}>● {f}</div>)}
                  </div>
                  <div className={styles.tierHosted}>Rule: {d.rule}</div>
                </div>
              ))}
            </div>
          </section>

              {/* GALLERY */}
{data.gallery && (
  <section id="gallery" className={styles.section}>
    <div className={styles.eyebrow}><span className={styles.accentText}>// GALLERY</span></div>
    <h2 className={styles.h2}>{data.gallery.title}</h2>
    <p className={styles.lead}>{data.gallery.lead}</p>
    <div className={styles.galleryGrid}>
      {data.gallery.images.map((img, i) => (
        <button
          key={i}
          className={styles.galleryItem}
          onClick={() => setLightbox(img)}
        >
          <img src={img.src} alt={img.label} loading="lazy" />
          <span className={styles.galleryLabel}>{img.label}</span>
        </button>
      ))}
    </div>
  </section>
)}

          {/* 4. CORE MODULES */}
          <section id="core-modules" className={styles.section}>
            <div className={styles.eyebrow}><span className={styles.accentText}>// 04</span> Functional Walkthrough</div>
            <h2 className={styles.h2}>{data.modules.title}</h2>
            <p className={styles.lead}>{data.modules.lead}</p>
            <div className={styles.moduleGrid}>
              {data.modules.items.map((m, i) => <ModuleCard key={i} item={m} />)}
            </div>
          </section>

          {/* 5 & 6. SECURITY + SPRINTS */}
          <section id="security" className={styles.section}>
            <div className={styles.twoCol}>
              <div>
                <div className={styles.eyebrow}><span className={styles.accent2Text}>// 05</span> Security Architecture</div>
                <h2 className={styles.h2}>{data.security.title}</h2>
                <p className={styles.body}>{data.security.lead}</p>
                <div className={styles.securityList}>
                  {data.security.items.map((s, i) => (
                    <div key={i} className={styles.securityItem}>
                      <span className="material-symbols-outlined">{s.icon}</span>
                      <div><strong className={styles.accentText}>{s.label}:</strong> {s.body}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="sprints">
                <div className={styles.sprintHeadRow}>
                  <div className={styles.eyebrow}><span className={styles.accentText}>// 06</span> {data.sprints.title}</div>
                  <span className={styles.stackBadge}>TOTAL: {data.sprints.totalTickets} TICKETS</span>
                </div>
                <p className={styles.body}>{data.sprints.lead}</p>
                <div className={styles.sprintTable}>
                  {data.sprints.items.map((s, i) => (
                    <div key={i} className={styles.sprintRow}>
                      <div>
                        <div className={styles.white}>{s.name}</div>
                        <div className={styles.sprintDesc}>{s.desc}</div>
                      </div>
                      <div className={styles.sprintDates}>{s.dates}</div>
                      <div className={styles.sprintTickets}>{s.tickets}</div>
                      <span className={styles.doneBadge}>DONE</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 7. POST-MORTEM */}
          <section id="post-mortem" className={styles.section}>
            <div className={styles.eyebrow}><span className={styles.accentText}>// 07</span> Engineering Post-Mortem</div>
            <h2 className={styles.h2}>{data.postMortem.title}</h2>
            <p className={styles.lead}>{data.postMortem.lead}</p>
            <div className={styles.incidentGrid}>
              {data.postMortem.incidents.map((inc, i) => <Incident key={i} item={inc} />)}
            </div>
          </section>

          {/* 8. OUTCOME */}
          <section id="outcome" className={styles.section}>
            <div className={styles.outcomeBanner}>
              <div className={styles.outcomeLeft}>
                <span className={styles.stackBadge}>{data.outcome.tag}</span>
                <h3 className={styles.h2}>{data.outcome.title}</h3>
                <p className={styles.body}>{data.outcome.body}</p>
                <div className={styles.checkRow}>
                  {data.outcome.checks.map((c, i) => (
                    <span key={i} className={styles.checkPill}>✔ {c}</span>
                  ))}
                </div>
              </div>
              <div className={styles.statBox}>
                <span className={styles.stackLabel}>{data.outcome.statLabel}</span>
                <span className={styles.statValue}>{data.outcome.statValue}</span>
                <span className={styles.accentText}>{data.outcome.statSub}</span>
              </div>
            </div>

            <div className={styles.backBar}>
  <Link to="/projects" className={styles.backBtn}>
    <span className="material-symbols-outlined">arrow_back</span>
    back to projects
  </Link>
</div>
          </section>
        </div>
      </div>
    </main>
  )
}