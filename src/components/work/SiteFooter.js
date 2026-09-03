import React from 'react'
import { Link } from 'gatsby'
import CV from '../../CV/ShiraSonigoCV.pdf'
import { Heart, LinkedIn, GitHub, Mail } from './icons'
import * as s from './work.module.css'

/*
 * SiteFooter — copyright + "Crafted with ♥ by Shira Sonigo" (the heart is the
 * inline SVG from the design, not an emoji), the nav links, and three social
 * icons (LinkedIn, GitHub, email). Keeps the real GitHub/LinkedIn URLs and the
 * CV PDF. Reflows to a stacked layout on mobile.
 */
const GITHUB_URL = 'https://github.com/shirasonigo1'
const LINKEDIN_URL = 'https://www.linkedin.com/in/shira-sonigo-051ab3198'

const Socials = () => (
  <div className={s.socials}>
    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={s.socialLink} aria-label="LinkedIn">
      <LinkedIn />
    </a>
    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={s.socialLink} aria-label="GitHub">
      <GitHub />
    </a>
    <a href="/#contact" className={s.socialLink} aria-label="Email">
      <Mail />
    </a>
  </div>
)


const SiteFooter = () => (
  <footer className={s.footer}>
    {/* Desktop: copyright + crafted line left, nav + socials right */}
    <div className={s.footerLeft}>
      <div className={s.copyright}>© 2026 Shira Sonigo</div>
    </div>
    <div className={s.footerRight}>
      <nav className={s.footerNav} aria-label="Footer">
        <Link to="/projects" className={s.footerLink}>Work</Link>
        <Link to="/about" className={s.footerLink}>About</Link>
        <a href={CV} download className={s.footerLink}>CV</a>
        <a href="/#contact" className={s.footerLink}>Contact</a>
      </nav>
      <Socials />
    </div>

    {/* Mobile: nav, socials, then a single crafted + copyright line */}
    <div className={s.footerMobile}>
      <nav className={s.footerNavMobile} aria-label="Footer">
        <Link to="/projects" className={s.footerLink}>Work</Link>
        <Link to="/about" className={s.footerLink}>About</Link>
        <a href={CV} download className={s.footerLink}>CV</a>
        <a href="/#contact" className={s.footerLink}>Contact</a>
      </nav>
      <Socials />
    </div>
  </footer>
)

export default SiteFooter
