/**
 * @uuid         CMP-LAY-002
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Small presentational heading block used to introduce a page section: an eyebrow label, a title, and an accent word/phrase.
 *
 * @whereToUse
 * Any page section that needs a consistent label + title heading treatment.
 *
 * @whenToUse
 * Use at the top of a content section wherever a short label + title + accent pattern is needed.
 */

import styles from './style.module.css'

export default function SectionHeader({ label, title, accent }) {
  return (
    <div className={styles.wrap}>
      <div className="section-label">{label}</div>
      <h2 className="section-title">
        {title} <span>{accent}</span>
      </h2>
    </div>
  )
}
