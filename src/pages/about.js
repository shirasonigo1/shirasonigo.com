import * as React from 'react'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import CV from '../CV/ShiraSonigoCV.pdf'
import Seo from '../components/seo'
import Masthead from '../components/work/Masthead'
import SiteFooter from '../components/work/SiteFooter'
import PortraitArch from '../components/about/PortraitArch'
import Button from '../components/about/Button'
import TimelineRow from '../components/about/TimelineRow'
import ListRow from '../components/about/ListRow'
import { Download, Arrow } from '../components/about/icons'
import * as s from '../components/about/about.module.css'

const fmtYear = (start, end) => (end ? `${start}–${end}` : start)

// True while a column still holds bracketed placeholders — drives the "To be
// filled in" hint so it disappears automatically once real data is entered.
const hasPlaceholder = (rows) =>
  rows.some((r) => Object.values(r).some((v) => typeof v === 'string' && v.includes('[')))

const AboutPage = ({ data }) => {
  const portrait = getImage(data.portrait)
  const years = data.aboutJson?.yearsBuilding || '[X YEARS]'
  const journey = data.allJourneyJson.nodes
  const press = data.allPressJson.nodes
  const awards = data.allAwardsJson.nodes

  return (
    <div className={`work-theme ${s.page}`}>
      <div className={s.frame}>
        <Masthead active="about" />

        <main className={s.main}>
          {/* hero — text left, arch right; does not bleed under the masthead */}
          <section className={s.hero}>
            <div className={s.heroText}>
              <h1 className={s.h1}>About<br className={s.brMobile} /> Shira</h1>
              <p className={s.standfirst}>
                An engineer and a designer, working where software, hardware and the people who use
                them meet.
              </p>
              <p className={s.introP}>
                I spent <span className={s.accentYears}>{years}</span> building software before moving
                into Innovation Design Engineering at Imperial College London and the Royal College of
                Art — to work closer to the people who end up holding what I make.
              </p>
              <p className={s.introP}>
                Today my practice spans research, prototyping and systems thinking, with a bias toward
                inclusive design and things that last.
              </p>
              <div className={s.heroButtons}>
                <Button variant="outline" href={CV} download icon={<Download />}>
                  Download CV
                </Button>
                <Button variant="solid" href="/#contact" iconRight={<Arrow />}>
                  Contact me
                </Button>
              </div>
            </div>

            <PortraitArch
              image={portrait}
              alt="Shira Sonigo, in denim against a warm neutral studio backdrop"
            />
          </section>

          {/* journey — a real ordered list */}
          <section className={s.journey}>
            <div className={s.sectionHead}>
              <h2 className={s.h2}>Journey</h2>
              <span className={s.eyebrow}>Engineering → Design → Product</span>
            </div>
            <ol className={s.timeline}>
              {journey.map((j, i) => (
                <TimelineRow
                  key={j.id}
                  year={fmtYear(j.start, j.end)}
                  title={j.title}
                  org={j.org}
                  description={j.description}
                  isLast={i === journey.length - 1}
                />
              ))}
            </ol>
          </section>

          {/* press & awards — each column hides itself when its list is empty */}
          <section className={s.pressAwards}>
            {press.length > 0 && (
              <div className={s.column}>
                <div className={s.sectionHead}>
                  <h2 className={s.h2small}>Press</h2>
                  {hasPlaceholder(press) && <span className={s.phNote}>To be filled in</span>}
                </div>
                <ol className={s.list}>
                  {press.map((p, i) => (
                    <ListRow
                      key={p.id}
                      title={p.publication}
                      meta={`“${p.title}”  ·  ${p.year}`}
                      url={p.url}
                      isLast={i === press.length - 1}
                    />
                  ))}
                </ol>
              </div>
            )}

            {awards.length > 0 && (
              <div className={s.column}>
                <div className={s.sectionHead}>
                  <h2 className={s.h2small}>Awards</h2>
                  {hasPlaceholder(awards) && <span className={s.phNote}>To be filled in</span>}
                </div>
                <ol className={s.list}>
                  {awards.map((a, i) => (
                    <ListRow
                      key={a.id}
                      title={a.name}
                      meta={`${a.whatFor}  ·  ${a.year}`}
                      url={a.url}
                      isLast={i === awards.length - 1}
                    />
                  ))}
                </ol>
              </div>
            )}
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    aboutJson {
      yearsBuilding
    }
    allJourneyJson(sort: { order: ASC }) {
      nodes {
        id
        start
        end
        title
        org
        description
      }
    }
    allPressJson(sort: { order: ASC }) {
      nodes {
        id
        publication
        title
        year
        url
      }
    }
    allAwardsJson(sort: { order: ASC }) {
      nodes {
        id
        name
        whatFor
        year
        url
      }
    }
    portrait: file(relativePath: { eq: "about/shira-portrait-graded.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 1000, placeholder: BLURRED, quality: 85)
      }
    }
  }
`

export const Head = ({ location }) => <Seo title="About" pathname={location.pathname} />

export default AboutPage
