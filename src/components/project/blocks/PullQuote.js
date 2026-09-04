import * as React from 'react'
import * as s from '../project.module.css'

// PullQuote — someone else's voice, at a size that stops the eye. One per
// chapter at most (see Blocks.dc.html) — not enforced here, just documented.
const PullQuote = ({ attribution, context, children }) => (
  <blockquote className={s.pullQuote}>
    <p className={s.pullQuoteText}>{children}</p>
    {(attribution || context) && (
      <div className={s.pullQuoteMeta}>{[attribution, context].filter(Boolean).join('  ·  ')}</div>
    )}
  </blockquote>
)

export default PullQuote
