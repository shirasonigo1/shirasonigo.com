import * as React from 'react'
import ImageWell from '../../work/ImageWell'
import { normalizeImagePath } from '../imageMap'
import * as s from '../project.module.css'

/*
 * Figure — the workhorse image block. Resolves `src` against the current
 * project's image map; a miss (wrong path, or the demo project's images/
 * folder that doesn't exist) falls back to ImageWell's labelled placeholder
 * automatically, the same "missing content stays visibly missing" mechanism
 * the Work page grid already uses. `bleed` breaks the image out to the page
 * margin (170px rail + 96px gap) instead of stopping at the content column.
 * `tall` swaps the wide fixed-height slot for a centred, portrait-shaped one
 * (3:4) so a portrait photo shows whole instead of being cropped to a strip;
 * `wide` is the landscape equivalent — a centred, width-capped 4:3 slot.
 */
export const createFigure = (imageMap = {}, projectTitle = 'Project') => {
  const Figure = ({ src, alt, caption, bleed = false, tall = false, wide = false, ratio, dimensions, label = 'image', fit = 'cover' }) => {
    const image = src ? imageMap[normalizeImagePath(src)] : null
    return (
      <figure className={`${s.figure} ${bleed ? s.figureBleed : ''} ${tall ? s.figureTall : ''} ${wide ? s.figureWideCentered : ''}`}>
        <ImageWell
          name={projectTitle}
          label={label}
          ratio={ratio}
          dimensions={dimensions}
          image={image}
          alt={alt}
          objectFit={fit}
          className={s.figureWell}
        />
        {caption && <figcaption className={s.caption}>{caption}</figcaption>}
      </figure>
    )
  }
  Figure.displayName = 'Figure'
  return Figure
}

export default createFigure
