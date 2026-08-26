import React from 'react'
import { Mail } from './icons'
import * as s from './home.module.css'

/*
 * Contact — centred. Rule–eyebrow–rule, 60px heading, then a solid pill with the
 * email. Email is bracketed (unconfirmed) and left bracketed; the section id is
 * the target of the nav "Contact" link.
 */
const ContactCTA = () => (
  <section className={s.contact} id="contact">
    <div className={s.contactInner}>
      <div className={s.contactEyebrowRow}>
        <div className={s.accentRule} />
        <div className={s.eyebrow}>Contact</div>
        <div className={s.accentRule} />
      </div>
      <h2 className={`${s.serif} ${s.contactHeading}`}>Let's make<br />something together</h2>
      <p className={s.contactBody}>
        Open to collaborations, commissions and conversations about technology, craft and impact.
      </p>
      <a href="#" className={`${s.btnPrimary} ${s.contactBtn}`}>
        <Mail size={16} />
        <span>[your@email.com]</span>
      </a>
    </div>
  </section>
)

export default ContactCTA
