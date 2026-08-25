import React from 'react'
import { Link } from 'gatsby'
import CV from '../../CV/ShiraSonigoCV.pdf'
import { LinkedIn, GitHub, Mail } from './icons'
import * as s from './home.module.css'

/*
 * Footer. Desktop: copyright left, links + social icons right. Mobile reflows to
 * centred stacks (links, then icons, then a shorter copyright) via CSS order.
 */
const HomeFooter = () => (
  <footer className={s.footer}>
    <div className={s.footerHairline} />
    <div className={s.footerRow}>
      <div className={s.copyright}>
        © 2026 Shira Sonigo<span className={s.copyExtra}> · Crafted with care in London</span>
      </div>
      <div className={s.footerRight}>
        <div className={s.footerLinks}>
          <Link to="/projects" className={s.footerLink}>Work</Link>
          <Link to="/about" className={s.footerLink}>About</Link>
          <a href={CV} download className={s.footerLink}>CV</a>
        </div>
        <div className={s.socials}>
          <a
            href="https://www.linkedin.com/in/shira-sonigo-051ab3198"
            target="_blank"
            rel="noopener noreferrer"
            className={s.socialLink}
            aria-label="LinkedIn"
          >
            <LinkedIn />
          </a>
          <a
            href="https://github.com/shirasonigo1"
            target="_blank"
            rel="noopener noreferrer"
            className={s.socialLink}
            aria-label="GitHub"
          >
            <GitHub />
          </a>
          <a href="#contact" className={s.socialLink} aria-label="Email">
            <Mail />
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default HomeFooter
