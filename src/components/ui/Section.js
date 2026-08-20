import React from "react"
import { section, sectionTitle } from "./ui.module.css"

/* Section (Phase 4) — consistent vertical rhythm + optional heading. */
const Section = ({ title, children }) => (
  <section className={section}>
    {title ? <h2 className={sectionTitle}>{title}</h2> : null}
    {children}
  </section>
)

export default Section
