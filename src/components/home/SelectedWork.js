import React from 'react'
import { Link } from 'gatsby'
import { ArrowRight, Camera } from './icons'
import * as s from './home.module.css'

/*
 * Selected work — a featured project (2-col on desktop) and a two-up row.
 * Images are labelled placeholder wells (per the design system) until real
 * photography lands; each is an IMG NN slot. GrazeIQ / FlatPack copy is
 * bracketed and intentionally left bracketed (unconfirmed).
 */

const Well = ({ label, ratioClass, cameraSize, eyebrow, caption, captionClass }) => (
  <div className={`${s.well} ${ratioClass}`}>
    <div className={s.imgLabel}>{label}</div>
    <div className={s.wellInner}>
      <Camera size={cameraSize} />
      <div className={s.wellEyebrow}>{eyebrow}</div>
      <div className={captionClass}>{caption}</div>
    </div>
  </div>
)

const TwoUpCard = ({ label, wellCaption, year, category, title, desc, tags, href }) => (
  <div className={s.card}>
    <Well
      label={label}
      ratioClass={s.wellHalf}
      cameraSize={26}
      eyebrow="Project image"
      caption={wellCaption}
      captionClass={s.wellCaptionSm}
    />
    <div className={s.cardMetaRow}>
      <div className={s.metaText}>{year}</div>
      <div className={s.metaRule} />
      <div className={s.metaText}>{category}</div>
    </div>
    <h3 className={`${s.serif} ${s.cardTitle}`}>{title}</h3>
    <p className={s.cardDesc}>{desc}</p>
    <div className={`${s.chips} ${s.cardChips}`}>
      {tags.map((t, i) => (
        <div key={i} className={s.chip}>{t}</div>
      ))}
    </div>
    <Link to={href} className={`${s.textLink} ${s.cardView}`}>
      <span className={s.textLinkLabel}>View project</span>
      <ArrowRight />
    </Link>
  </div>
)

const SelectedWork = () => (
  <section className={s.work}>
    <div className={s.workHeader}>
      <div className={s.workHeaderText}>
        <div className={s.eyebrow}>Selected work</div>
        <h2 className={`${s.serif} ${s.sectionHeading}`}>
          Things I've made<br />and what I learned
        </h2>
      </div>
      <Link to="/projects" className={`${s.textLink} ${s.allProjectsTop}`}>
        <span className={s.textLinkLabel}>All projects</span>
        <ArrowRight />
      </Link>
    </div>

    {/* Featured */}
    <div className={s.featured}>
      <Well
        label={'IMG 01'}
        ratioClass={s.wellFeatured}
        cameraSize={28}
        eyebrow="Hero image"
        caption={<>The Inner Shoe — 4:3 landscape<br />Product / material photography</>}
        captionClass={s.wellCaption}
      />
      <div className={s.featuredText}>
        <div className={s.metaRow}>
          <div className={s.metaFeatured}>Featured</div>
          <div className={s.metaRule} />
          <div className={s.metaText}>2025</div>
        </div>
        <h3 className={`${s.serif} ${s.featuredTitle}`}>The Inner Shoe</h3>
        <p className={s.featuredDesc}>
          Crafted from upcycled bicycle inner tubes sourced from local bike shops,
          designed for walking comfortably on rocky beaches.
        </p>
        <div className={`${s.chips} ${s.featuredChips}`}>
          <div className={s.chip}>IDE</div>
          <div className={s.chip}>Super Green</div>
          <div className={s.chip}>Regenerative material</div>
        </div>
        <Link to="/projects/the-inner-shoe" className={`${s.textLink} ${s.featuredView}`}>
          <span className={s.textLinkLabel}>View project</span>
          <ArrowRight />
        </Link>
      </div>
    </div>

    {/* Two-up */}
    <div className={s.twoUp}>
      <TwoUpCard
        label={'IMG 02'}
        wellCaption="GrazeIQ — 3:2 landscape"
        year="[YEAR]"
        category="[Category]"
        title="GrazeIQ"
        desc="[Technology for understanding livestock grazing and land use — confirm or replace with your own one-liner.]"
        tags={['[Tag]', '[Tag]']}
        href="/projects"
      />
      <TwoUpCard
        label={'IMG 03'}
        wellCaption="FlatPack — 3:2 landscape"
        year="[YEAR]"
        category="[Category]"
        title="FlatPack"
        desc="[Reducing waste in the moving industry — confirm or replace with your own one-liner.]"
        tags={['[Tag]', '[Tag]']}
        href="/projects"
      />
    </div>

    {/* Mobile-only full-width button */}
    <Link to="/projects" className={s.allProjectsButton}>
      <span>All projects</span>
      <ArrowRight />
    </Link>
  </section>
)

export default SelectedWork
