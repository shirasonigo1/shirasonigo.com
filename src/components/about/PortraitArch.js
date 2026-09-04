import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import * as s from './about.module.css'

/*
 * PortraitArch — the one piece of real craft on the page.
 *
 * A --card-feature panel with the graded portrait masked into an arch
 * (border-radius: 999px 999px 3px 3px, overflow hidden), bottom-aligned.
 *
 * IMPORTANT: shira-portrait-graded.jpg has its studio backdrop baked to the
 * exact --paper value so it dissolves into the page. Apply NO colour transform
 * of any kind (no duotone/tint/grayscale/filter/mix-blend-mode, no
 * gatsby-plugin-image colour option). Resizing/re-encoding is fine. This match
 * is coupled to --paper: if that token changes, the image must be re-graded.
 *
 * The arch curve eats the top corners, so the crop is controlled by
 * `focalPoint` (object-position); it can be tuned per breakpoint by the caller.
 */
const PortraitArch = ({ image, alt, focalPoint = '52% 10%' }) => (
  <div className={s.portraitPanel}>
    <div className={s.arch}>
      <GatsbyImage
        image={image}
        alt={alt}
        className={s.archImg}
        imgStyle={{ objectFit: 'cover', objectPosition: focalPoint }}
      />
    </div>
  </div>
)

export default PortraitArch
