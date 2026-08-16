import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NAV_LINKS } from '../utils/constants'
import { useActiveSection } from '../utils/StdHooks'
import { requestProjectSearch } from '../utils/StdSearchBus'
import styles from './Navbar.module.css'

const SECTION_IDS = ['home', 'technologies', 'projects', 'contact', 'join']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const location = useLocation()
  const navigate = useNavigate()

  function close() { setOpen(false) }

  // In-page section links (#home, #contact, etc.) only work as plain
  // anchors when we're already on "/" — the page that actually has
  // those ids. From any other route (e.g. /projects), a bare `href="#x"`
  // just appends the hash to the current path ("/projects#x"), which
  // goes nowhere. So: if we're elsewhere, route to "/" + the hash first;
  // if we're already home, just scroll.
  function goToSection(e, hash) {
    e.preventDefault()
    close()
    const id = hash.slice(1)
    if (location.pathname !== '/') {
      navigate('/' + hash)
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', hash)
  }

  // Mobile "search a project" button: gets us to /projects if we're
  // not already there, then asks the Projects page to open its search
  // popup. It listens via the searchBus event since it isn't a parent
  // of this component. A small delay covers the case where we just
  // navigated and Projects hasn't mounted its listener yet.
  function openProjectSearch() {
    close()
    if (location.pathname !== '/projects') {
      navigate('/projects')
      setTimeout(() => requestProjectSearch(), 60)
    } else {
      requestProjectSearch()
    }
  }

  function renderLink(l, className) {
    if (l.href.startsWith('/')) {
      return (
        <Link to={l.href} className={className} onClick={close}>
          {l.label}
        </Link>
      )
    }
    return (
      <a href={l.href} className={className} onClick={e => goToSection(e, l.href)}>
        {l.label}
      </a>
    )
  }

  return (
    <>
      <nav className={styles.nav}>
        <a href="#home" className={styles.logo} onClick={e => goToSection(e, '#home')}>
          <svg viewBox="0 0 160 32" height="28" width="auto">
            <text y="24" fontFamily="'JetBrains Mono', monospace" fontSize="20" fontWeight="700" letterSpacing="-0.5">
              <tspan fill="#ffffff">NOV</tspan>
              <tspan fill="#2f94d8">Ex</tspan>
              <tspan fill="#7b2cbf"> &gt;_</tspan>
            </text>
          </svg>
        </a>

        <ul className={styles.links}>
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              {renderLink(l, `${styles.link} ${active === l.href.slice(1) ? styles.active : ''}`)}
            </li>
          ))}
          <li>
            <a href="#join" className={`${styles.link} ${styles.cta}`} onClick={e => goToSection(e, '#join')}>
              join us
            </a>
          </li>
        </ul>

        <button
          className={`${styles.ham} ${open ? styles.open : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}>
        {NAV_LINKS.map(l => (
          <span key={l.href}>{renderLink(l, styles.mobileLink)}</span>
        ))}
        <a href="#join" className={styles.mobileLink} onClick={e => goToSection(e, '#join')}>
          join us
        </a>

        <button type="button" className={styles.mobileSearchBtn} onClick={openProjectSearch}>
          search a project
        </button>
      </div>
    </>
  )
}
