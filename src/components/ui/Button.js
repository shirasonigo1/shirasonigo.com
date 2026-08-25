import React from "react"
import { Link } from "gatsby"
import { button } from "./ui.module.css"

/*
 * Button (Phase 3) — one consistent action style, replacing scattered inline
 * link styling. Renders a Gatsby <Link> for internal `to`, an <a> for external
 * `href`, or a native <button> otherwise.
 */
const Button = ({ to, href, children, ...props }) => {
  if (to) {
    return (
      <Link to={to} className={button} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a className={button} {...props} href={href}>
        {children}
      </a>
    )
  }
  return (
    <button className={button} {...props}>
      {children}
    </button>
  )
}

export default Button
