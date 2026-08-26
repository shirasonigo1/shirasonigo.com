import React, { useState } from 'react'
import { Link } from 'gatsby'
import CV from '../../CV/ShiraSonigoCV.pdf'
import { Menu } from './icons'
import * as s from './home.module.css'

/*
 * Home nav. Wordmark left, links right (Work/About/CV/Contact). "Work" carries
 * the current-page underline as in the reference. Below 820px the links collapse
 * to a hamburger that reveals a token-styled dropdown (functional addition — the
 * static mock only shows the closed button).
 */
const HomeNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className={s.nav} aria-label="Main navigation">
        <Link to="/" className={s.wordmark}>Shira Sonigo</Link>

        <div className={s.navLinks}>
          <Link to="/projects" className={s.navLinkCurrent}>Work</Link>
          <Link to="/about" className={s.navLink}>About</Link>
          <a href={CV} download className={s.navLink}>CV</a>
          <a href="#contact" className={s.navLink}>Contact</a>
        </div>

        <button
          type="button"
          className={s.navToggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Menu />
        </button>
      </nav>

      {open && (
        <div className={s.mobileMenuOpen}>
          <Link to="/projects">Work</Link>
          <Link to="/about">About</Link>
          <a href={CV} download>CV</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      )}
    </>
  )
}

export default HomeNav
