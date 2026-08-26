import React from 'react'
import { Link } from 'gatsby'
import { ArrowRight } from './icons'
import * as s from './home.module.css'

/*
 * About strip. The desktop and mobile references have genuinely different
 * structures (desktop: two columns with a pull quote on --panel-inset; mobile:
 * one column, eyebrow on top, no quote). Rather than force one DOM to reflow into
 * both, we render both layouts and toggle by breakpoint — but the copy lives in
 * shared constants below so the two versions can never drift apart.
 */

const PARAGRAPHS = [
  'I started as a programmer in the Israeli Army, then spent three years at Forter working on Kubernetes, multi-cloud environments and networking before joining the observability team in the UK.',
  'A trip to India turned an old habit of observing into a practice — crafting, sketching, and telling stories about craft, culture and the functionality of living. That led me to Innovation Design Engineering at Imperial and the RCA.',
]
const OUTSIDE = 'Outside work: long walks, cooking, life stories and science books, and time with family and friends.'
const PRACTICE = [
  'Software engineering',
  'Cloud & observability',
  'Design research',
  'Prototyping',
  'Materials & making',
  'Speculative design',
  'Sustainability',
]
const QUOTE = '“My aim is to work on projects that will impact the world we live in and help create a better future.”'

const AboutStrip = () => (
  <section className={s.about}>
    {/* Desktop: two columns */}
    <div className={s.aboutDesktop}>
      <div className={s.aboutPanel}>
        <div className={s.aboutLeft}>
          <h2 className={`${s.serif} ${s.aboutHeading}`}>A short<br />introduction</h2>
          <p className={`${s.aboutP} ${s.aboutPFirst}`}>{PARAGRAPHS[0]}</p>
          <p className={s.aboutP}>{PARAGRAPHS[1]}</p>
          <p className={s.aboutPMuted}>{OUTSIDE}</p>
          <Link to="/about" className={`${s.textLink} ${s.aboutMore}`}>
            <span className={s.textLinkLabel}>More about me</span>
            <ArrowRight />
          </Link>
        </div>
        <div className={s.aboutRight}>
          <div className={s.eyebrow}>What I work on</div>
          <div className={s.practiceChips}>
            {PRACTICE.map((p, i) => (
              <div key={i} className={s.practiceChip}>{p}</div>
            ))}
          </div>
          <div className={s.aboutDivider} />
          <p className={`${s.serif} ${s.pullQuote}`}>{QUOTE}</p>
        </div>
      </div>
    </div>

    {/* Mobile: single column, no quote */}
    <div className={s.aboutMobile}>
      <div className={s.aboutMobilePanel}>
        <div className={`${s.eyebrow} ${s.aboutMobileEyebrow}`}>What I work on</div>
        <h2 className={`${s.serif} ${s.aboutMobileHeading}`}>A short introduction</h2>
        <p className={`${s.aboutMobileP} ${s.aboutMobilePFirst}`}>{PARAGRAPHS[0]}</p>
        <p className={s.aboutMobileP}>{PARAGRAPHS[1]}</p>
        <p className={s.aboutMobilePMuted}>{OUTSIDE}</p>
        <div className={s.aboutMobileChips}>
          {PRACTICE.map((p, i) => (
            <div key={i} className={s.aboutMobileChip}>{p}</div>
          ))}
        </div>
        <Link to="/about" className={`${s.textLink} ${s.aboutMobileMore}`}>
          <span className={s.textLinkLabel}>More about me</span>
          <ArrowRight />
        </Link>
      </div>
    </div>
  </section>
)

export default AboutStrip
