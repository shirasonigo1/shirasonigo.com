import React from 'react'
import { Link } from 'gatsby'
import ImageWell from './ImageWell'
import ArrowLink from './ArrowLink'
import * as s from './work.module.css'

/*
 * ProjectCardCompact — image strip left (200px desktop / 110px mobile), text right.
 * Used in Experiments & Explorations. Desktop shows a "View project" arrow link;
 * mobile shows a year · category meta line instead (per the mobile reference).
 * Both are rendered and toggled by breakpoint so nothing is fabricated per size.
 */
const ProjectCardCompact = ({ project }) => {
  const { title, year, slug, description, category, image, alt } = project
  const meta = [year, category].filter(Boolean).join('  ·  ')

  return (
    <Link to={`/projects/${slug}`} className={`${s.card} ${s.compact}`} aria-label={`${title} — view project`}>
      <ImageWell
        name={title}
        label="image"
        dimensions="800 × 800"
        image={image}
        alt={alt}
        showIcon={false}
        className={s.compactWell}
      />
      <div className={s.compactBody}>
        <h3 className={s.compactTitle}>{title}</h3>
        <p className={s.compactDesc}>{description}</p>
        {meta && <span className={s.compactMeta}>{meta}</span>}
        <div className={s.compactLink}>
          <ArrowLink size="sm">View project</ArrowLink>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCardCompact
