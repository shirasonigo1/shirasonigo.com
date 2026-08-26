import React from 'react'
import { Link } from 'gatsby'
import ImageWell from './ImageWell'
import Tag from './Tag'
import ArrowLink from './ArrowLink'
import * as s from './work.module.css'

/*
 * ProjectCardFeatured — full width, 42/58 text/image split, featured tint.
 * The whole card is a single link (one tab stop). Standfirst in Newsreader,
 * up to four tags, "View case study" arrow link.
 */
const ProjectCardFeatured = ({ project }) => {
  const { title, year, slug, standfirst, description, tags, family, image, alt } = project

  return (
    <Link to={`/projects/${slug}`} className={`${s.card} ${s.featured}`} aria-label={`${title} — view case study`}>
      <div className={s.featuredText}>
        <div className={s.eyebrow}>Featured &nbsp;·&nbsp; {year}</div>
        <h3 className={s.featuredTitle}>{title}</h3>
        <p className={s.featuredStandfirst}>{standfirst}</p>
        <div className={s.tagRow}>
          {tags.slice(0, 4).map((t, i) => (
            <Tag key={i} family={family}>{t}</Tag>
          ))}
        </div>
        <p className={s.featuredDesc}>{description}</p>
        <div className={s.featuredLink}>
          <ArrowLink>View case study</ArrowLink>
        </div>
      </div>
      <ImageWell
        name={title}
        label="hero image"
        dimensions="1600 × 1200"
        iconSize={26}
        image={image}
        alt={alt}
        className={s.featuredWell}
      />
    </Link>
  )
}

export default ProjectCardFeatured
