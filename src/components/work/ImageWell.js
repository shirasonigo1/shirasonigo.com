import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { CameraGlyph } from './icons'
import * as s from './work.module.css'

/*
 * ImageWell — the component that makes "missing content stays visibly missing" work.
 *
 * When the project has a real hero_image in the content it renders it via
 * gatsby-plugin-image, cover-cropped to fill the slot. When no image exists it
 * falls back to the labelled warm well from the design: the project name, the
 * expected ratio and the expected pixel dimensions — never a grey box or stock art.
 *
 * The slot's height/shape is owned by the parent card (each card sizes its well
 * per the design); ImageWell just fills it. `className` lets a card add its own
 * border rule (e.g. a bottom or right hairline between image and text).
 *
 * Accessibility: a real image gets meaningful alt text; the placeholder is
 * decorative (alt=""-equivalent) but carries a visible text label.
 */
const ImageWell = ({
  name,
  label = 'image',
  ratio,
  dimensions,
  image,
  alt,
  iconSize = 24,
  showIcon = true,
  showDimensions = true,
  className = '',
  // 'cover' (default) fills the slot, cropping to fit; 'contain' shows the
  // whole frame uncropped, letterboxed on the well background — use it for a
  // portrait/odd-ratio image the fixed-height slot would otherwise cut.
  objectFit = 'cover',
}) => {
  const gatsbyImage = image ? getImage(image) : null

  if (gatsbyImage) {
    return (
      <div className={`${s.well} ${className}`}>
        <GatsbyImage
          image={gatsbyImage}
          alt={alt || `${name} — project image`}
          className={s.wellImg}
          objectFit={objectFit}
        />
      </div>
    )
  }

  // Placeholder: build the dimension line from the pixel size and ratio.
  const dimLine = [dimensions, ratio].filter(Boolean).join('  ·  ')

  return (
    <div className={`${s.well} ${className}`} role="img" aria-label={`${name} — image placeholder`}>
      {showIcon && <CameraGlyph size={iconSize} />}
      <div className={s.wellLabel}>
        {name} — {label}
      </div>
      {showDimensions && dimLine && <div className={s.wellDim}>{dimLine}</div>}
    </div>
  )
}

export default ImageWell
