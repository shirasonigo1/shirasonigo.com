import React from 'react'
import { Link } from 'gatsby'
import * as s from './about.module.css'

/*
 * Button — the filled/outline action the Work system didn't have. Two variants:
 *  - outline: hairline border, dark label (Download CV)
 *  - solid:   ink background, paper label (Contact me)
 * Renders a real <a> (internal Link / external/href) or <button> — never a div —
 * with a visible accent focus ring. Icon + label sit in a 9–10px gap; pass `icon`
 * for a leading glyph or `iconRight` for a trailing one.
 *
 * First consumer is the About page; written to be promotable to the shared system.
 */
const Button = ({ variant = 'outline', to, href, download, icon, iconRight, children, ...rest }) => {
  const cls = `${s.btn} ${variant === 'solid' ? s.btnSolid : s.btnOutline}`
  const inner = (
    <>
      {icon}
      {children && <span>{children}</span>}
      {iconRight}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>{inner}</Link>
    )
  }
  if (href) {
    return (
      <a href={href} download={download || undefined} className={cls} {...rest}>{inner}</a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>{inner}</button>
  )
}

export default Button
