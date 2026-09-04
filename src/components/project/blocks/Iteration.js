import * as React from 'react'
import ImageWell from '../../work/ImageWell'
import { normalizeImagePath } from '../imageMap'
import * as s from '../project.module.css'

/*
 * Iteration — one row of the development sequence: a version number, the
 * prototype image, and two named slots (what changed / what it taught us).
 * Prop form, not children — keeps the two slots' meaning explicit the same
 * way Insight's `title` and PullQuote's `attribution`/`context` are props
 * rather than ad-hoc markdown structure.
 *
 * Semantically an ordered list item — wrap a run of <Iteration> in a plain
 * <ol> (see AUTHORING.md); .chapterBody/.overviewBody style bare <ol> for
 * exactly this case.
 */
export const createIteration = (imageMap = {}, projectTitle = 'Project') => {
  const Iteration = ({ n, image, imageAlt, changed, learned }) => {
    const resolvedImage = image ? imageMap[normalizeImagePath(image)] : null
    return (
      <li className={s.iteration}>
        <h3 className={s.iterationNum}>
          <span className={s.iterationDigit}>{n}</span>
          <span className={s.iterationLabel}>Iteration</span>
        </h3>
        <ImageWell
          name={projectTitle}
          label={`prototype v${n}`}
          image={resolvedImage}
          alt={imageAlt}
          className={s.iterationWell}
        />
        <div className={s.iterationText}>
          <div>
            <div className={s.metaLabel}>What changed</div>
            <p className={s.iterationP}>{changed}</p>
          </div>
          <div>
            <div className={s.metaLabel}>What it taught us</div>
            <p className={s.iterationPMuted}>{learned}</p>
          </div>
        </div>
      </li>
    )
  }
  Iteration.displayName = 'Iteration'
  return Iteration
}

export default createIteration
