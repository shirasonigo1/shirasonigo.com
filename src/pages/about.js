import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import CV from '../CV/ShiraSonigoCV.pdf'
import Seo from '../components/seo'
import Masthead from '../components/work/Masthead'
import SiteFooter from '../components/work/SiteFooter'
import Button from '../components/about/Button'
import { Download, Arrow } from '../components/about/icons'
import * as s from '../components/about/about.module.css'

/*
 * About page — the "simple" design (design/about/Main.dc.html and
 * AboutMobile.dc.html): masthead → text left, photograph right → footer.
 * Teal (#0E4B53, taken from the wall in the photo) is this page's only accent;
 * it is set as a page-scoped override of the --accent token in about.module.css.
 */
const AboutPage = ({ data }) => {
  const portrait = getImage(data.portrait)

  return (
    <div className={`work-theme ${s.page}`}>
      <div className={s.frame}>
        <Masthead active="about" />

        <main className={s.main}>
          <section className={s.hero}>
            <div className={s.heroText}>
              <p className={s.eyebrow}>About</p>
              <h1 className={s.h1}>Hey, I’m Shira.</h1>
              <p className={s.standfirst}>
                A multidisciplinary engineer and designer who uses technology to solve real-world
                problems.
              </p>

              <p className={s.p}>
                I started out as a software engineer in the Israel Defense Forces, where I led its
                cloud transformation. My team built the organisation’s first public cloud
                application, which kicked off a wider shift in how the IDF delivered software.
              </p>
              <p className={s.p}>
                I then joined Forter as a cloud engineer, and went on to lead the company’s
                observability transformation and its adoption across engineering teams.
              </p>
              <p className={s.p}>
                Ambition, curiosity and a love of adventure took me to London for the Innovation
                Design Engineering master’s at the Royal College of Art and Imperial College London,
                where I worked where technology, creativity and culture meet.
              </p>
              <p className={`${s.p} ${s.pLast}`}>
                Today my practice brings together research, prototyping and systems thinking.
              </p>

              <div className={s.closing}>
                <p className={s.closingLine}>
                  I’m looking for my next role. If you’re building something interesting, I’d love
                  to grab a coffee.
                </p>
              </div>

              <div className={s.heroButtons}>
                <Button variant="solid" href="/#contact" iconRight={<Arrow />}>
                  Contact me
                </Button>
                <Button variant="outline" href={CV} download icon={<Download />}>
                  Download CV
                </Button>
              </div>
            </div>

            {/* A plain, unframed photograph — no arch, tint or filter. The teal
                wall is meant to read as a photo on the paper ground. */}
            <figure className={s.portrait}>
              <div className={s.photo}>
                <GatsbyImage
                  image={portrait}
                  alt="Shira Sonigo, smiling, sitting in front of a teal wall"
                  className={s.photoImg}
                />
              </div>
              <figcaption className={s.caption}>
                <span>London, 2026</span>
                <span>Engineer &amp; designer</span>
              </figcaption>
            </figure>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    portrait: file(relativePath: { eq: "about/shira.JPG" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 1100, placeholder: BLURRED, quality: 85)
      }
    }
  }
`

export const Head = ({ location }) => <Seo title="About" pathname={location.pathname} />

export default AboutPage
