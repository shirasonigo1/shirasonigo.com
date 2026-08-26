import React from 'react'
import { Link } from 'gatsby'
import CV from '../../CV/ShiraSonigoCV.pdf'
import { ArrowRight, Download } from './icons'
import * as s from './home.module.css'

/*
 * Hero — single column, no portrait. Small tracked label carries the
 * "Engineer × Designer" positioning; the 42px Newsreader sentence carries the page.
 */
const Hero = () => (
  <section className={s.hero}>
    <div className={s.heroLabelRow}>
      <div className={s.accentRule} />
      <div className={s.heroLabel}>
        Engineer <span className={s.heroLabelMark}>×</span> Designer
      </div>
    </div>

    <h1 className={`${s.serif} ${s.heroLead}`}>
      I'm a software engineer and a practice designer based in London, navigating the
      intersection of technology, creativity and meaningful impact.
    </h1>

    <p className={s.heroBody}>
      I have a passion for observing the world around me and finding new ways to tell
      stories — through code, materials and the things people live with.
    </p>

    <div className={s.heroActions}>
      <Link to="/projects" className={s.btnPrimary}>
        <span>View my work</span>
        <ArrowRight size={16} />
      </Link>
      <a href={CV} download className={s.btnSecondary}>
        <Download size={16} />
        <span>Download CV</span>
      </a>
    </div>
  </section>
)

export default Hero
