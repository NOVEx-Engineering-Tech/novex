import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useFadeUp, useScrollSearchHint } from '../../utils/StdHooks'
import { loadWorkItems, searchWorkItems } from '../../lib/workLoader'
import { onProjectSearchRequest } from '../../utils/StdSearchBus'
import SectionHeader from '../../components/StdSectionHeader'
import ProjectSearch from '../../components/StdProjectSearch'
import styles from './Projects.module.css'

export default function Projects() {
  const ref = useFadeUp()
  const items = loadWorkItems()

  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('v') || ''
  const results = searchWorkItems(items, query)

  const [searchOpen, setSearchOpen] = useState(false)
  const [showHint, dismissHint] = useScrollSearchHint({ suspend: searchOpen })

  // Mobile navbar's "search a project" button opens this popup too,
  // via a plain window event since it doesn't share a parent with us.
  useEffect(() => onProjectSearchRequest(() => setSearchOpen(true)), [])

  // Desktop: pressing Enter anywhere on the page (as long as they're
  // not typing into some other field, and the popup isn't already
  // open) opens the search popup.
  useEffect(() => {
    function onKeyDown(e) {
      if (searchOpen || e.key !== 'Enter') return
      const el = document.activeElement
      const tag = el?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || el?.isContentEditable) return
      e.preventDefault()
      setSearchOpen(true)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [searchOpen])

  // Hide the "press enter" hint the moment the popup is open.
  useEffect(() => {
    if (searchOpen) dismissHint()
  }, [searchOpen, dismissHint])

  function handleSearchSubmit(value) {
    const v = value.trim()
    if (v) setSearchParams({ v })
    else setSearchParams({}, { replace: true })
    setSearchOpen(false)
  }

  function clearSearch() {
    setSearchParams({}, { replace: true })
  }

  return (
    <section className={styles.projects}>
      <div className="container">
        <Link to="/" className={styles.back}>← back home</Link>

        <div className={styles.headerRow}>
          <SectionHeader
            label={
              query
                ? `${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
                : `all work — ${items.length} project${items.length === 1 ? '' : 's'}`
            }
            title="Our"
            accent="projects"
          />

          {query && (
            <button type="button" className={styles.clearSearch} onClick={clearSearch}>
              ✕ clear search
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <p className={styles.empty}>no project found</p>
        ) : (
          <div className={`${styles.grid} fade-up`} ref={ref}>
            {results.map(p => (
              <article key={p.id} className={styles.card}>
                <div className={styles.banner}>
                  <img
                    src={p.banner}
                    alt={p.title}
                    draggable={false}
                    onError={e => { e.currentTarget.style.display = 'none' }}
                  />
                  <span className={styles.type}>{p.type}</span>
                </div>

                <div className={styles.body}>
                  <div className={styles.status}>
                    <span className={`${styles.dot} ${p.status === 'in development' ? styles.active : styles.planned}`} />
                    {p.status}
                  </div>

                  <h3 className={styles.name}>{p.title}</h3>
                  <p className={styles.desc}>{p.description}</p>

                  {p.language?.length > 0 && (
                    <div className={styles.language}>
                      {p.language.join(' · ')}
                    </div>
                  )}

                  <div className={styles.tags}>
                    {p.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                  </div>

                  <div className={styles.meta}>
                    {p.role && <span>{p.role}</span>}
                    {p.industry && <span>{p.industry}</span>}
                    {p.client && <span>{p.client}</span>}
                    {p.year && <span>{p.year}</span>}
                  </div>

                  {(p.github || p.link) && (
                    <a
                      href={p.github || p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {p.github ? 'view repository →' : 'view live →'}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {showHint && (
        <button
          type="button"
          className={styles.hintBar}
          onClick={() => setSearchOpen(true)}
        >
          press <kbd>enter</kbd> to search a project
        </button>
      )}

      {searchOpen && (
        <ProjectSearch
          initialValue={query}
          onSubmit={handleSearchSubmit}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </section>
  )
}
