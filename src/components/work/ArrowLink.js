import React from 'react'
import { Arrow } from './icons'
import * as s from './work.module.css'

/*
 * ArrowLink — terracotta text, 1px underline, arrow that slides 4px right on hover.
 * Never a filled button.
 *
 * Rendered as a <span>, not an <a>: on this page it lives inside a card that is
 * itself a single link (one tab stop per card, the whole card is the target), so
 * a nested anchor would be invalid and add a second tab stop. The slide is driven
 * by the parent card's :hover and disabled under prefers-reduced-motion (see CSS).
 */
const ArrowLink = ({ children, size = 'md' }) => (
  <span className={`${s.arrowLink} ${size === 'sm' ? s.arrowLinkSm : ''}`}>
    <span>{children}</span>
    <span className={s.arrowIcon}>
      <Arrow size={size === 'sm' ? 15 : 16} />
    </span>
  </span>
)

export default ArrowLink
