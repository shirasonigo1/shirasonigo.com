import React, { useState } from 'react'
import { Link } from 'gatsby'
import CV from '../../CV/ShiraSonigoCV.pdf'
import { Menu } from './icons'
import * as s from './work.module.css'

/*
 * Masthead — Newsreader wordmark left, links right (Work current). Below the
 * breakpoint it collapses to a hamburger that reveals the links (functional
 * addition over the static mock). "Contact" points at the home contact section
 * (#contact) — see note in the PR; there is no standalone contact route yet.
 */
const NAV = [
  { key: 'work', label: 'Work', to: '/projects' },
  { key: 'about', label: 'About', to: '/about' },
  { key: 'cv', label: 'CV', href: CV, download: true },
  { key: 'contact', label: 'Contact', href: '/#contact' },
]

const NavItem = ({ item, className }) => {
  if (item.to) {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>
    )
  }
  return (
    <a href={item.href} download={item.download || undefined} className={className}>
      {item.label}
    </a>
  )
}

const Masthead = ({ active = 'work' }) => {
  const [open, setOpen] = useState(false)

  return (
    <header>
      <div className={s.mastheadBar}>
        <Link to="/" className={s.wordmark}>Shira Sonigo</Link>
        <nav className={s.mastheadNav} aria-label="Primary">
          {NAV.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              className={item.key === active ? `${s.navLink} ${s.navLinkCurrent}` : s.navLink}
            />
          ))}
        </nav>
        <button
          type="button"
          className={s.mastheadToggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Menu />
        </button>
      </div>
      {open && (
        <nav className={s.mobileMenu} aria-label="Primary mobile">
          {NAV.map((item) => (
            <NavItem key={item.label} item={item} className={s.mobileMenuLink} />
          ))}
        </nav>
      )}
    </header>
  )
}

export default Masthead
