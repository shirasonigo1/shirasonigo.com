import * as React from 'react'
import * as s from '../project.module.css'

// Closing — the Outcome / "What I'd do next" pair. `whatNext` (not `next`,
// to avoid colliding with the frontmatter `next` project-slug field) is the
// honest reflection: what's unresolved, what you'd test with more time.
const Closing = ({ outcome, whatNext }) => {
  if (!outcome && !whatNext) return null
  return (
    <div className={s.closing}>
      {outcome && (
        <div>
          <div className={s.eyebrow}>Outcome</div>
          <p className={s.closingBody}>{outcome}</p>
        </div>
      )}
      {whatNext && (
        <div>
          <div className={s.eyebrow}>What I&rsquo;d do next</div>
          <p className={s.closingBody}>{whatNext}</p>
        </div>
      )}
    </div>
  )
}

export default Closing
