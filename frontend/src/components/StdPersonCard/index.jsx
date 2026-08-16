/**
 * @uuid         CMP-CRD-001
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    Std Github, Std Social Icons
 *
 * @description
 * Profile card for a person: GitHub-derived avatar (with initials fallback), name, role/occupation, expertise tags, and social links.
 *
 * @whereToUse
 * Team, about, or contributor listing pages/sections.
 *
 * @whenToUse
 * Use to display a person's profile from a plain data object — pass a `person` record and an optional `variant` ('member' | 'founder').
 */

import { useState } from 'react'
import { getGithubUsername, getGithubAvatar } from '../../utils/StdGithub'
import { FacebookIcon, InstagramIcon, GithubIcon } from '../StdSocialIcons'
import styles from './style.module.css'

function initials(name) {
  return name.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

export default function PersonCard({ person, variant = 'member' }) {
  const { name, githubLink, occupation, role, position, experts = [], socials = {} } = person
  const [avatarFailed, setAvatarFailed] = useState(false)

  const username = getGithubUsername(githubLink)
  const avatar = getGithubAvatar(githubLink)
  const displayRole = role || position
  const clickable = Boolean(githubLink)

  const socialList = [
    { key: 'facebook',  icon: <FacebookIcon />,  label: 'Facebook' },
    { key: 'instagram', icon: <InstagramIcon />, label: 'Instagram' },
    { key: 'github',    icon: <GithubIcon />,    label: 'GitHub' },
  ].filter(s => socials[s.key])

  function handleClick() {
    if (clickable) window.open(githubLink, '_blank', 'noopener,noreferrer')
  }
  function handleKeyDown(e) {
    if (clickable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); handleClick() }
  }

  return (
    <div
      className={`${styles.card} ${variant === 'founder' ? styles.founderCard : ''} ${clickable ? styles.clickable : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={clickable ? 'link' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `${name} on GitHub` : undefined}
    >
      {variant === 'founder' && <span className={styles.founderBadge}>founder</span>}

      <div className={styles.avatarWrap}>
        {avatar && !avatarFailed ? (
          <img
            src={avatar}
            alt={name}
            className={styles.avatar}
            loading="lazy"
            draggable={false}
            onError={() => setAvatarFailed(true)}
          />
        ) : (
          <div className={styles.avatarFallback}>{initials(name)}</div>
        )}
      </div>

      <div className={styles.body}>
        {occupation && <p className={styles.occupation}>{occupation}</p>}

        <h3 className={styles.name}>
          {name}
          {username && <span className={styles.username}> ({username})</span>}
        </h3>

        {displayRole && <p className={styles.role}>{displayRole}</p>}

        {experts.length > 0 && (
          <div className={styles.tags}>
            {experts.map(e => <span key={e} className={styles.tag}>{e}</span>)}
          </div>
        )}

        {socialList.length > 0 && (
          <div className={styles.socials}>
            {socialList.map(s => (
              <a
                key={s.key}
                href={socials[s.key]}
                className={styles.socialBtn}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                onClick={e => e.stopPropagation()}
              >
                {s.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
