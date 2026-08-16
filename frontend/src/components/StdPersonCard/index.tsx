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
import './style.css'

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
      className={`${'pc-card'} ${variant === 'founder' ? 'pc-founderCard' : ''} ${clickable ? 'pc-clickable' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={clickable ? 'link' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `${name} on GitHub` : undefined}
    >
      {variant === 'founder' && <span className={'pc-founderBadge'}>founder</span>}

      <div className={'pc-avatarWrap'}>
        {avatar && !avatarFailed ? (
          <img
            src={avatar}
            alt={name}
            className={'pc-avatar'}
            loading="lazy"
            draggable={false}
            onError={() => setAvatarFailed(true)}
          />
        ) : (
          <div className={'pc-avatarFallback'}>{initials(name)}</div>
        )}
      </div>

      <div className={'pc-body'}>
        {occupation && <p className={'pc-occupation'}>{occupation}</p>}

        <h3 className={'pc-name'}>
          {name}
          {username && <span className={'pc-username'}> ({username})</span>}
        </h3>

        {displayRole && <p className={'pc-role'}>{displayRole}</p>}

        {experts.length > 0 && (
          <div className={'pc-tags'}>
            {experts.map(e => <span key={e} className={'pc-tag'}>{e}</span>)}
          </div>
        )}

        {socialList.length > 0 && (
          <div className={'pc-socials'}>
            {socialList.map(s => (
              <a
                key={s.key}
                href={socials[s.key]}
                className={'pc-socialBtn'}
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
