import * as React from 'react'
import * as s from '../project.module.css'

/*
 * SidePanel — prose beside the facts a reader might scan for instead of
 * reading (role, methods, tools, recognition; also good for a materials or
 * spec list). Used both for the frontmatter-driven "At a glance" panel next
 * to the Overview lede, and for a body-authored SidePanel anywhere else.
 */
const SidePanel = ({ title = 'At a glance', items }) => {
  if (!items || items.length === 0) return null
  return (
    <div className={s.sidePanel}>
      <div className={s.eyebrow}>{title}</div>
      {items.map((item, i) => (
        <div key={i} className={s.sidePanelItem}>
          <div className={s.metaLabel}>{item.label}</div>
          <div className={s.metaValue}>{item.value}</div>
        </div>
      ))}
    </div>
  )
}

export default SidePanel
