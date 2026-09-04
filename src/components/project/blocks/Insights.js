import * as React from 'react'
import * as s from '../project.module.css'

// Insight — one finding, numbered automatically by CSS counter (see
// .insights/.insight in project.module.css) so authoring never has to track
// an index by hand.
export const Insight = ({ title, children }) => (
  <div className={s.insight}>
    <h3 className={s.insightTitle}>{title}</h3>
    <p className={s.insightBody}>{children}</p>
  </div>
)

const Insights = ({ children }) => <div className={s.insights}>{children}</div>

export default Insights
