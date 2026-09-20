
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NAV_LINKS } from '../utils/constants'
import { useActiveSection } from '../utils/StdHooks'
import { requestProjectSearch } from '../utils/StdSearchBus'
import styles from './Navbar.module.css'

const SECTION_IDS = ['home', 'technologies', 'projects']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const active = useActiveSection(SECTION_IDS)
  const location = useLocation()
  const navigate = useNavigate()

  // Add a compact/scrolled state once the user moves away from the top.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  function close() {
    setOpen(false)
  }

  // In-page section navigation.
  // If we're on another route, return to home first.
  function goToSection(e, hash) {
    e.preventDefault()
    close()

    const id = hash.slice(1)

    if (location.pathname !== '/') {
      navigate('/' + hash)
      return
    }

    const el = document.getElementById(id)

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    window.history.replaceState(null, '', hash)
  }

  // Mobile project search.
  function openProjectSearch() {
    close()

    if (location.pathname !== '/projects') {
      navigate('/projects')
      setTimeout(() => requestProjectSearch(), 60)
    } else {
      requestProjectSearch()
    }
  }

  // Determine whether a navigation item is active.
  function isActive(link) {
    if (link.href.startsWith('/')) {
      return location.pathname === link.href
    }

    const section = link.href.slice(1)

    if (location.pathname !== '/') {
      return false
    }

    return active === section
  }

  function renderLink(link, className) {
    const activeClass = isActive(link) ? styles.active : ''

    if (link.href.startsWith('/')) {
      return (
        <Link
          to={link.href}
          className={`${className} ${activeClass}`}
          onClick={close}
          aria-current={isActive(link) ? 'page' : undefined}
        >
          <span>{link.label}</span>
        </Link>
      )
    }

    return (
      <a
        href={link.href}
        className={`${className} ${activeClass}`}
        onClick={e => goToSection(e, link.href)}
        aria-current={isActive(link) ? 'page' : undefined}
      >
        <span>{link.label}</span>
      </a>
    )
  }

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Main navigation"
      >
        <div className={styles.navInner}>
          {/* Brand */}
          <a
            href="#home"
            className={styles.logo}
            onClick={e => goToSection(e, '#home')}
            aria-label="NOVEx Engineering Tech — Home"
          >
            <img
              src="/assets/novex-logotype.png"
              alt="NOVEx Engineering Tech"
              className={styles.logoImage}
            />
          </a>

          {/* Desktop navigation */}
          <div className={styles.navRight}>
            <ul className={styles.links}>
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  {renderLink(link, styles.link)}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={styles.cta}
              onClick={e => goToSection(e, '#contact')}
            >
              <span className={styles.ctaDot} />
              <span>contact us</span>
              <span className={styles.ctaArrow}>↗</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={`${styles.ham} ${open ? styles.open : ''}`}
            onClick={() => setOpen(current => !current)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}
        aria-hidden={!open}
      >
        <div className={styles.mobileInner}>
          <div className={styles.mobileHeader}>
            <span>navigation</span>
            <span className={styles.mobileStatus}>
              <i /> online
            </span>
          </div>

          <div className={styles.mobileLinks}>
            {NAV_LINKS.map(link => (
              <div key={link.href} className={styles.mobileItem}>
                {renderLink(link, styles.mobileLink)}
              </div>
            ))}

            <a
              href="#contact"
              className={`${styles.mobileLink} ${styles.mobileContact}`}
              onClick={e => goToSection(e, '#contact')}
            >
              <span>contact us</span>
              <span>↗</span>
            </a>
          </div>

          <button
            type="button"
            className={styles.mobileSearchBtn}
            onClick={openProjectSearch}
          >
            <span className={styles.searchIcon}>⌕</span>
            <span>
              <strong>search a project</strong>
              <small>browse NOVEx work</small>
            </span>
            <span className={styles.searchArrow}>→</span>
          </button>

          <div className={styles.mobileFooter}>
            <span>© NOVEx Engineering Tech</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {open && (
        <button
          type="button"
          className={styles.backdrop}
          onClick={close}
          aria-label="Close navigation menu"
        />
      )}
    </>
  )
}
