import React from 'react'
import * as s from './about.module.css'

/*
 * TimelineRow — one journey entry. Three columns on desktop (years / title+org /
 * description), stacked on mobile. Rendered as an <li> inside the Journey <ol>;
 * the row title is an h3. Hairline between rows, none after the last.
 */
const TimelineRow = ({ year, title, org, description, isLast = false }) => (
  <li className={`${s.row} ${isLast ? s.rowLast : ''}`}>
    <div className={s.rowYear}>{year}</div>
    <div className={s.rowMid}>
      <h3 className={s.rowTitle}>{title}</h3>
      <p className={s.rowOrg}>{org}</p>
    </div>
    <p className={s.rowDesc}>{description}</p>
  </li>
)

export default TimelineRow
