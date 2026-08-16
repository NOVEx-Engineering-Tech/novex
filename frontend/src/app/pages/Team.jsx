import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../../components/StdSectionHeader'
import { FacebookIcon, InstagramIcon, GithubIcon } from '../../components/StdSocialIcons'
import styles from './Team.module.css'

import markAquino   from '../../../configs/founders/mark-aquino.json'
import rafaelOli    from '../../../configs/founders/rafael-oli.json'
import kreyFrancisco from '../../../configs/founders/krey-francisco.json'
import dexterPaniza from '../../../configs/founders/dexter-paniza.json'

const FOUNDERS = [markAquino, rafaelOli, kreyFrancisco, dexterPaniza]
const COUNT = FOUNDERS.length


function FounderCard({ founder, isMobile }) {
  const [hovered, setHovered] = useState(false)
  const [tapped, setTapped]   = useState(false)
  const active = isMobile ? tapped : hovered

  const socials = [
    { key: 'facebook',  icon: <FacebookIcon />,  label: 'Facebook'  },
    { key: 'instagram', icon: <InstagramIcon />, label: 'Instagram' },
    { key: 'github',    icon: <GithubIcon />,    label: 'GitHub'    },
  ].filter(s => founder.socials[s.key])

  return (
    <div
      className={`${styles.card} ${active ? styles.cardActive : ''}`}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onClick={() => isMobile && setTapped(t => !t)}
    >
      <div className={styles.cardInner}>
        <div className={styles.imageWrapper}>
          <img src={founder.baseImage} alt={founder.name} className={styles.baseImage} />
          <img
            src={founder.secondaryImage}
            alt={founder.name}
            className={`${styles.secondaryImage} ${active ? styles.secondaryImageActive : ''}`}
          />
          <div className={`${styles.overlayTop} ${active ? styles.overlayTopActive : ''}`} />
          <div className={styles.overlayBottom} />
        </div>

        <div className={`${styles.info} ${active ? styles.infoActive : ''}`}>
          <p className={styles.position}>{founder.position}</p>
          <h3 className={styles.name}>{founder.name}</h3>
          <p className={styles.bio}>{founder.bio}</p>
          {socials.length > 0 && (
            <div className={styles.socials}>
              {socials.map(s => (
                <a
                  key={s.key}
                  href={founder.socials[s.key]}
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  const [active, setActive]   = useState(0)
  const [isMobile, setMobile] = useState(false)
  const startX = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const prev = () => setActive(i => (i - 1 + COUNT) % COUNT)
  const next = () => setActive(i => (i + 1) % COUNT)

  const onTouchStart = e => { startX.current = e.touches[0].clientX }
  const onTouchEnd   = e => {
    if (startX.current === null) return
    const diff = startX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    startX.current = null
  }

  const openTeamsPage = () => {
    navigate('/teams')
  }

  return (
    <section id="team" className={styles.team}>
      <div className="container">
        <SectionHeader label="the team" title="Who's" accent="behind it" />

        <div
          className={styles.carousel}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {!isMobile && (
            <button className={styles.navBtn} onClick={prev} aria-label="Previous">&#8249;</button>
          )}

          <div className={styles.stage}>
            {FOUNDERS.map((founder, i) => {
              let offset = i - active
              if (offset > COUNT / 2)  offset -= COUNT
              if (offset < -COUNT / 2) offset += COUNT
              const absOffset = Math.abs(offset)
              if (absOffset > 2) return null
              return (
                <div
                  key={founder.name}
                  className={styles.cardSlot}
                  style={{
                    '--offset':     offset,
                    '--abs-offset': absOffset,
                    '--direction':  Math.sign(offset),
                    opacity:        absOffset >= 2 ? 0 : 1,
                    pointerEvents:  absOffset === 0 ? 'auto' : 'none',
                    zIndex:         10 - absOffset,
                  }}
                >
                  <FounderCard founder={founder} isMobile={isMobile} />
                </div>
              )
            })}
          </div>

          {!isMobile && (
            <button className={styles.navBtn} onClick={next} aria-label="Next">&#8250;</button>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.dots}>
            {FOUNDERS.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Founder ${i + 1}`}
              />
            ))}
          </div>
          <button className={styles.seeTeamsBtn} onClick={openTeamsPage}>
            <span>see teams</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
