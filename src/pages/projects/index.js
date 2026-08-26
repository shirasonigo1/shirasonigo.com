import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../../components/seo'
import Masthead from '../../components/work/Masthead'
import SiteFooter from '../../components/work/SiteFooter'
import ProjectCardFeatured from '../../components/work/ProjectCardFeatured'
import ProjectCard from '../../components/work/ProjectCard'
import ProjectCardWide from '../../components/work/ProjectCardWide'
import ProjectCardCompact from '../../components/work/ProjectCardCompact'
import FilterChip from '../../components/work/FilterChip'
import { tagFamily } from '../../components/work/Tag'
import * as s from '../../components/work/work.module.css'

// Filter taxonomy (design chrome, not project data). Not wired yet — "All" active.
const FILTERS = ['All', 'Inclusive Design', 'Product', 'Systems', 'Sustainability', 'Art & Culture']

// The category that groups a project into Experiments & Explorations.
const EXPERIMENTS_CATEGORY = 'Art & Culture'

// Strip a leading '#' from a stored tag; content owns the wording, we only clean it.
const cleanTag = (t) => (t || '').replace(/^#/, '').trim()

// The literal "protfolio" typo sits on every project's category today; treat it as unset.
const realCategory = (c) => (c && c.toLowerCase() !== 'protfolio' ? c : null)

const normalise = (node) => {
  const f = node.frontmatter
  const category = realCategory(f.category)
  return {
    id: node.id,
    title: f.title,
    year: f.year,
    slug: f.slug,
    description: f.description || node.excerpt,
    standfirst: f.standfirst || '[STANDFIRST]',
    tags: (f.tags || []).map(cleanTag).filter(Boolean),
    category,
    family: tagFamily(category),
    featured: f.featured === true,
    image: f.hero_image,
    alt: f.hero_image_alt || `${f.title} — project image`,
  }
}

const byYearDesc = (a, b) => (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0)

const WorkPage = ({ data }) => {
  const projects = data.allMdx.nodes.map(normalise)

  // Content drives the slotting — never position in a hardcoded list.
  const featured = projects.find((p) => p.featured) || null
  const experiments = projects
    .filter((p) => !p.featured && p.category === EXPERIMENTS_CATEGORY)
    .sort(byYearDesc)
  const grid = projects
    .filter((p) => !p.featured && p.category !== EXPERIMENTS_CATEGORY)
    .sort(byYearDesc)

  // The wide card closes the row only when the grid count is odd.
  const gridIsOdd = grid.length % 2 === 1
  const twoUp = gridIsOdd ? grid.slice(0, -1) : grid
  const wideOne = gridIsOdd ? grid[grid.length - 1] : null

  const expMeta = experiments.length
    ? [experiments[0].category, experiments[0].year].filter(Boolean).join('  ·  ')
    : null

  return (
    <div className={`work-theme ${s.page}`}>
      <div className={s.frame}>
        <Masthead />

        <main className={s.main}>
        <section className={s.intro}>
          <h1 className={s.pageTitle}>Selected Work</h1>
          <p className={s.lede}>
            Projects across inclusive design, cyber-physical systems, sustainable materials and
            speculative practice.
          </p>
          <div className={s.filterRow}>
            {FILTERS.map((label) => (
              <FilterChip key={label} label={label} active={label === 'All'} />
            ))}
          </div>
        </section>

        {featured && (
          <section className={s.blockFeatured}>
            <ProjectCardFeatured project={featured} />
          </section>
        )}

        {twoUp.length > 0 && (
          <section className={s.twoUp}>
            {twoUp.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </section>
        )}

        {wideOne && (
          <section className={s.blockWide}>
            <ProjectCardWide project={wideOne} />
          </section>
        )}

        {experiments.length > 0 && (
          <section className={s.experiments}>
            <div className={s.experimentsHeader}>
              <h2 className={s.experimentsTitle}>Experiments &amp; Explorations</h2>
              {expMeta && <span className={s.experimentsMeta}>{expMeta}</span>}
            </div>
            <div className={s.experimentsGrid}>
              {experiments.map((p) => (
                <ProjectCardCompact key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { year: DESC } }) {
      nodes {
        id
        excerpt
        frontmatter {
          title
          year
          slug
          tags
          category
          featured
          standfirst
          description
          hero_image_alt
          hero_image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 82)
            }
          }
        }
      }
    }
  }
`

export const Head = ({ location }) => <Seo title="Work" pathname={location.pathname} />

export default WorkPage
