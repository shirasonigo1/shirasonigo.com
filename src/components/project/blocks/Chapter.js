import * as React from 'react'
import * as s from '../project.module.css'

/*
 * Chapter — one section of the case study. Number and title come from
 * frontmatter.chapters (looked up by id), not from body props — the spec's
 * own worked example only passes id + lead. gatsby-node.js's onCreateNode
 * fails the build if a frontmatter chapter id has no matching <Chapter id>
 * in the body (or vice versa), so this lookup can never silently render a
 * blank header.
 */
export const createChapter = (chapterMeta = {}) => {
  const Chapter = ({ id, lead, children }) => {
    const meta = chapterMeta[id] || {}
    return (
      <section id={id} className={s.chapter}>
        <div className={s.chapterHead}>
          <span className={s.chapterNum}>{meta.number}</span>
          <h2 className={s.chapterTitle}>{meta.title}</h2>
        </div>
        {lead && <p className={s.chapterLead}>{lead}</p>}
        {children}
      </section>
    )
  }
  Chapter.displayName = 'Chapter'
  return Chapter
}

export default createChapter
