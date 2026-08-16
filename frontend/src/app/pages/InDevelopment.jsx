import styles from './InDevelopment.module.css'

export default function InDevelopment({ pageName = 'This page' }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.terminal}>
        <div className={styles.bar}>
          <span className={styles.dot} style={{ background: '#ff5f56' }} />
          <span className={styles.dot} style={{ background: '#ffbd2e' }} />
          <span className={styles.dot} style={{ background: '#2f94d8' }} />
          <span className={styles.barTitle}>novex — {pageName.toLowerCase()}</span>
        </div>

        <div className={styles.body}>
          <div className={styles.line}>
            <span className={styles.ps1}>novex@corp:~$</span>
            <span className={styles.cmd}> cd pages/{pageName.toLowerCase()}</span>
          </div>
          <div className={styles.out}>
            <span className={styles.err}>Error:</span> /{pageName.toLowerCase()}: directory is being constructed
          </div>

          <div className={styles.gap} />

          <div className={styles.line}>
            <span className={styles.ps1}>novex@corp:~$</span>
            <span className={styles.cmd}> git log --oneline -1</span>
          </div>
          <div className={styles.out}>
            <span className={styles.sha}>a3f71cd</span> feat: scaffolding {pageName.toLowerCase()} page
          </div>

          <div className={styles.gap} />

          <div className={styles.badge}>
            <span className={styles.dot2} />
            in development
          </div>

          <div className={styles.gap} />

          <div className={styles.bigLabel}>{pageName}</div>
          <div className={styles.sub}>This page is currently under construction.<br />Check back soon — we ship fast.</div>

          <div className={styles.gap} />

          <div className={styles.line}>
            <span className={styles.ps1}>novex@corp:~$</span>
            <span className={styles.cursor}>&nbsp;</span>
          </div>
        </div>
      </div>

      <a href="#home" className={styles.back}>← back to home</a>
    </div>
  )
}
