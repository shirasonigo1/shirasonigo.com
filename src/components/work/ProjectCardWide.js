import React from 'react'
import { Link } from 'gatsby'
import ImageWell from './ImageWell'
import Tag from './Tag'
import ArrowLink from './ArrowLink'
import * as s from './work.module.css'

/*
 * ProjectCardWide — image left at 55%, text right. Used to close an odd-numbered
 * grid row. Standfirst in Newsreader, up to three tags, "View project" link.
 * On mobile it collapses to the same image-above-text shape as ProjectCard.
 */
const ProjectCardWide = ({ project }) => {
  const { title, year, slug, standfirst, description, tags, family, image, alt } = project

  return (
    <Link to={`/projects/${slug}`} className={`${s.card} ${s.wide}`} aria-label={`${title} — view project`}>
      <ImageWell
        name={title}
        label="project image"
        dimensions="1400 × 1000"
        ratio="landscape"
        image={image}
        alt={alt}
        className={s.wideWell}
      />
      <div className={s.wideText}>
        <div className={s.titleRow}>
          <h3 className={s.wideTitle}>{title}</h3>
          <span className={s.cardYear}>{year}</span>
        </div>
        <p className={s.wideStandfirst}>{standfirst}</p>
        <p className={s.cardDesc}>{description}</p>
        <div className={s.tagRowTight}>
          {tags.slice(0, 3).map((t, i) => (
            <Tag key={i} family={family}>{t}</Tag>
          ))}
        </div>
        <div className={s.wideLink}>
          <ArrowLink>View project</ArrowLink>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCardWide
