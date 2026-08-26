import React from 'react'
import { Link } from 'gatsby'
import ImageWell from './ImageWell'
import Tag from './Tag'
import * as s from './work.module.css'

/*
 * ProjectCard — image above text, 4:3 well. Title with the year on the same
 * baseline, description, up to three tags. Whole card is one link.
 */
const ProjectCard = ({ project }) => {
  const { title, year, slug, description, tags, family, image, alt } = project

  return (
    <Link to={`/projects/${slug}`} className={`${s.card} ${s.gridCard}`} aria-label={`${title} — view project`}>
      <ImageWell
        name={title}
        label="project image"
        dimensions="1200 × 900"
        ratio="4:3"
        image={image}
        alt={alt}
        className={s.wellBottom}
      />
      <div className={s.cardBody}>
        <div className={s.titleRow}>
          <h3 className={s.cardTitle}>{title}</h3>
          <span className={s.cardYear}>{year}</span>
        </div>
        <p className={s.cardDesc}>{description}</p>
        <div className={s.tagRowTight}>
          {tags.slice(0, 3).map((t, i) => (
            <Tag key={i} family={family}>{t}</Tag>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
