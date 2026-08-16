/**
 * @uuid         CMP-FRM-001
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Terminal-styled, typewriter-animated readout that lists the active contact channels for a company or project.
 *
 * @whereToUse
 * Contact sections/pages.
 *
 * @whenToUse
 * Use to present a dynamic list of contact channels with a terminal/CLI aesthetic. NOTE: in this project it reads channels via ../../lib/contactLoader (an internal, project-specific data loader) — a consuming project should supply its own loader with the same `loadContactChannels(): ContactChannel[]` shape, or adapt this component to accept channels as a prop.
 */

import { useEffect, useMemo, useState } from 'react'
import { loadContactChannels } from '../../lib/contactLoader'
import './style.css'

/**
 * Replaces the old static email/facebook/github rows with a
 * terminal-style readout: it "types" a short intro, then lists
 * whatever channels are currently active in configs/contact.json.
 * Fully dynamic — add/remove a channel in the config and this
 * list grows or shrinks with it, no code changes needed.
 */
export default function TerminalContact() {
  const channels = loadContactChannels()

  const lines = useMemo(() => [
    '$ contact --list-channels',
    '> resolving configs/contact.json ...',
    channels.length > 0
      ? `> ${channels.length} channel${channels.length > 1 ? 's' : ''} online. pick one:`
      : '> no channels configured yet.',
  ], [channels.length])

  const { typed, lineDone, allDone } = useTypewriter(lines)

  return (
    <div className={'term-terminal'}>
      <div className={'term-titlebar'}>
        <span className="term-dot term-dotRed" />
        <span className="term-dot term-dotYellow" />
        <span className="term-dot term-dotGreen" />
        <span className={'term-titlebarLabel'}>contact.sh</span>
      </div>

      <div className={'term-body'}>
        {lines.map((line, i) => (
          <div key={i} className={'term-line'}>
            <span>{typed[i] || ''}</span>
            {!allDone && !lineDone[i] && i === typed.length - 1 && (
              <span className={'term-cursor'} />
            )}
          </div>
        ))}

        {allDone && (
          <div className={'term-channels'}>
            {channels.map((c, idx) => (
              <a
                key={c.key}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noreferrer' : undefined}
                className={'term-channelRow'}
                style={{ animationDelay: `${idx * 90}ms` }}
              >
                <span className={'term-prompt'}>&gt;</span>
                <span className={'term-channelIcon'}><c.Icon /></span>
                <span className={'term-channelLabel'}>{c.label}</span>
                <span className={'term-channelValue'}>{c.display}</span>
              </a>
            ))}
            <div className={'term-line'}>
              <span>$ </span>
              <span className={'term-cursor'} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Types out `lines` one character at a time, line by line. Returns the
// text revealed so far per line, which lines have finished, and whether
// the whole sequence is done. Skips straight to the final text when the
// user prefers reduced motion.
function useTypewriter(lines, charDelay = 16, lineDelay = 260) {
  const key = lines.join('\n')
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [typed, setTyped] = useState(() => (reduceMotion ? lines : lines.map(() => '')))
  const [lineDone, setLineDone] = useState(() => lines.map(() => reduceMotion))
  const [allDone, setAllDone] = useState(reduceMotion)

  useEffect(() => {
    if (reduceMotion) return

    let cancelled = false
    let li = 0
    let ci = 0
    const revealed = lines.map(() => '')
    const done = lines.map(() => false)
    let timer

    function step() {
      if (cancelled) return
      if (li >= lines.length) {
        setAllDone(true)
        return
      }
      const line = lines[li]
      if (ci <= line.length) {
        revealed[li] = line.slice(0, ci)
        setTyped([...revealed])
        ci++
        timer = setTimeout(step, charDelay)
      } else {
        done[li] = true
        setLineDone([...done])
        li++
        ci = 0
        timer = setTimeout(step, lineDelay)
      }
    }
    timer = setTimeout(step, charDelay)

    return () => { cancelled = true; clearTimeout(timer) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, reduceMotion])

  return { typed, lineDone, allDone }
}
