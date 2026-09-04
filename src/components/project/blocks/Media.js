import * as React from 'react'
import { getSrc } from 'gatsby-plugin-image'
import ImageWell from '../../work/ImageWell'
import { normalizeImagePath } from '../imageMap'
import * as s from '../project.module.css'

// Play glyph for the poster-only placeholder state (no `src` yet) — the same
// circle+triangle shown in Blocks.dc.html's "Video or interaction" block.
const PlayGlyph = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#B3AA9D" strokeWidth="1.1" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5l6 3.5-6 3.5z" />
  </svg>
)

/*
 * Media — video with a poster frame. Never autoplays (no autoPlay prop is
 * ever wired), always shows controls. With no `src` yet (the common case
 * while a project is still being written) it falls back to the poster image
 * — or the labelled ImageWell placeholder — with a play glyph over it.
 */
export const createMedia = (imageMap = {}, projectTitle = 'Project') => {
  const Media = ({ src, poster, alt, caption }) => {
    const posterImage = poster ? imageMap[normalizeImagePath(poster)] : null
    const posterUrl = posterImage ? getSrc(posterImage) : undefined

    return (
      <figure className={s.media}>
        {src ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption -- no caption-track authoring exists yet in this format; revisit if/when a real video ships
          <video className={s.mediaVideo} controls preload="metadata" poster={posterUrl}>
            <source src={src} />
          </video>
        ) : (
          <div className={s.mediaPlaceholder}>
            <ImageWell
              name={projectTitle}
              label="video"
              image={posterImage}
              alt={alt}
              showIcon={!posterImage}
              className={s.mediaWell}
            />
            <span className={s.mediaPlay}>
              <PlayGlyph />
            </span>
          </div>
        )}
        {caption && <figcaption className={s.caption}>{caption}</figcaption>}
      </figure>
    )
  }
  Media.displayName = 'Media'
  return Media
}

export default createMedia
