import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import Seo from '../../components/seo'
import Masthead from '../../components/work/Masthead'
import SiteFooter from '../../components/work/SiteFooter'
import ImageWell from '../../components/work/ImageWell'
import Tag, { tagFamily } from '../../components/work/Tag'
import ArrowLink from '../../components/work/ArrowLink'
import { Arrow } from '../../components/work/icons'
import Gallery from '../../components/Gallery'
import Video from '../../components/video'
import SidePanel from '../../components/project/blocks/SidePanel'
import ChapterRail from '../../components/project/ChapterRail'
import { buildMdxComponents } from '../../components/project/mdxComponents'
import { buildImageMap } from '../../components/project/imageMap'
import * as s from '../../components/project/project.module.css'

/*
 * Project detail template (case-study format).
 *
 * New format (frontmatter.chapters present): composed MDX body of block
 * components — see src/components/project/blocks/ and
 * content/projects/AUTHORING.md.
 *
 * Legacy format (no chapters — the 5 pre-existing projects): renders header
 * + hero + body prose in the same warm-editorial styling, preserving the
 * old "## Slider N" → Gallery convention and the videoSrcURL/GithubLink/
 * linkedin_post rendering the previous template had, so none of the five
 * need to be rewritten to keep working.
 */

// Chevron-left "All work" back link — mirrors work/icons.js's Arrow, reversed.
const BackArrow = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 12H5" />
    <path d="M11 6l-6 6 6 6" />
  </svg>
)

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={s.arrowAnchor}>
    <span>{children}</span>
    <span className={s.arrowIcon}>
      <Arrow size={15} />
    </span>
  </a>
)

// Strip a leading '#' from a legacy tag (content owns the wording elsewhere too).
const cleanTag = (t) => (t || '').replace(/^#/, '').trim()

// Legacy "## Slider N: optional subtitle" convention, lifted from the
// previous template unchanged.
const SLIDER_HEADING = /^\s*slider\s*(\d+)\s*:?\s*(.*)$/i
const headingText = (children) =>
  React.Children.toArray(children)
    .map((child) => (typeof child === 'string' ? child : ''))
    .join('')

const resolveNextProject = (mdxNode, allMdxNodes) => {
  const { frontmatter: fm, id } = mdxNode
  const others = allMdxNodes.filter((n) => n.id !== id)

  if (fm.next) {
    const bySlug = others.find((n) => n.frontmatter.slug === fm.next)
    if (bySlug) return bySlug
  }

  const ordered = allMdxNodes
    .filter((n) => n.frontmatter.card?.order != null)
    .sort((a, b) => a.frontmatter.card.order - b.frontmatter.card.order)
  if (ordered.length > 1) {
    const idx = ordered.findIndex((n) => n.id === id)
    if (idx !== -1) return ordered[(idx + 1) % ordered.length]
  }

  return null
}

const Project = ({ data, children }) => {
  const { mdx, allFile, allMdx } = data
  const fm = mdx.frontmatter
  const chapters = fm.chapters || []
  const isLegacy = chapters.length === 0

  const projectDir = mdx.parent?.relativeDirectory
  const imageMap = buildImageMap(allFile.nodes, projectDir)
  const chapterMeta = {}
  chapters.forEach((c) => {
    chapterMeta[c.id] = c
  })

  const mdxComponents = buildMdxComponents({ chapterMeta, imageMap, projectTitle: fm.title })
  const nextProject = resolveNextProject(mdx, allMdx.nodes)

  if (isLegacy) {
    const tags = (fm.tags || []).map(cleanTag).filter(Boolean)
    const family = tagFamily(fm.category)
    const sliders = fm.sliders || []

    const legacyComponents = {
      ...mdxComponents,
      h2: (props) => {
        const match = headingText(props.children).match(SLIDER_HEADING)
        if (match) {
          const index = parseInt(match[1], 10) - 1
          const subtitle = match[2].trim()
          return (
            <>
              <Gallery images={sliders[index]?.images} />
              {subtitle ? <h2 className={s.chapterTitle}>{subtitle}</h2> : null}
            </>
          )
        }
        // eslint-disable-next-line jsx-a11y/heading-has-content -- content arrives via {...props}.children
        return <h2 className={s.chapterTitle} {...props} />
      },
    }

    const hasExternalLinks = fm.GithubLink || fm.linkedin_post

    return (
      <div className={`work-theme ${s.page}`}>
        <div className={s.frame}>
          <Masthead active="work" />
          <main className={s.main}>
            <div className={s.header}>
              <Link to="/projects" className={s.backLink}>
                <BackArrow />
                <span>All work</span>
              </Link>
              <div className={s.legacyHeaderBlock}>
                <div className={s.eyebrow}>{[fm.role, fm.year].filter(Boolean).join('  ·  ')}</div>
                <h1 className={s.title}>{fm.title}</h1>
                {tags.length > 0 && (
                  <div className={s.tagRow}>
                    {tags.map((t, i) => (
                      <Tag key={i} family={family}>
                        {t}
                      </Tag>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {fm.hero_image && (
              <div className={s.heroWrap}>
                <ImageWell
                  name={fm.title}
                  label="hero image"
                  image={fm.hero_image}
                  alt={fm.hero_image_alt}
                  className={s.heroWell}
                />
              </div>
            )}

            <div id="chapter-content" className={s.legacyBody}>
              <MDXProvider components={legacyComponents}>{children}</MDXProvider>

              {hasExternalLinks && (
                <div className={s.legacyLinks}>
                  {fm.GithubLink && <ExternalLink href={fm.GithubLink}>GitHub repository</ExternalLink>}
                  {fm.linkedin_post && <ExternalLink href={fm.linkedin_post}>LinkedIn post</ExternalLink>}
                </div>
              )}

              {(fm.videoSrcURL || []).map((url, i) => (
                <Video key={i} videoSrcURL={url} videoTitle={fm.videoTitle} />
              ))}
            </div>
          </main>
          <SiteFooter />
        </div>
      </div>
    )
  }

  const hasMeta = fm.role || fm.timeline || fm.team || fm.context
  const hasOverview = Boolean(fm.overview)
  const hasGlance = fm.glance && fm.glance.length > 0

  return (
    <div className={`work-theme ${s.page}`}>
      <div className={s.frame}>
        <Masthead active="work" />
        <main className={s.main}>
          <div className={s.header}>
            <Link to="/projects" className={s.backLink}>
              <BackArrow />
              <span>All work</span>
            </Link>
            <div className={s.headerGrid}>
              <div>
                <div className={s.eyebrow}>{[fm.discipline, fm.year].filter(Boolean).join('  ·  ')}</div>
                <h1 className={s.title}>{fm.title}</h1>
                {fm.standfirst && <p className={s.standfirst}>{fm.standfirst}</p>}
                {fm.tags && fm.tags.length > 0 && (
                  <div className={s.tagRow}>
                    {fm.tags.map((t, i) => (
                      <Tag key={i}>{t}</Tag>
                    ))}
                  </div>
                )}
              </div>
              {hasMeta && (
                <div className={s.metaGrid}>
                  {fm.role && (
                    <div>
                      <div className={s.metaLabel}>Role</div>
                      <div className={s.metaValue}>{fm.role}</div>
                    </div>
                  )}
                  {fm.timeline && (
                    <div>
                      <div className={s.metaLabel}>Timeline</div>
                      <div className={s.metaValue}>{fm.timeline}</div>
                    </div>
                  )}
                  {fm.team && (
                    <div>
                      <div className={s.metaLabel}>Team</div>
                      <div className={s.metaValue}>{fm.team}</div>
                    </div>
                  )}
                  {fm.context && (
                    <div>
                      <div className={s.metaLabel}>Context</div>
                      <div className={s.metaValue}>{fm.context}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {fm.hero && (
            <div className={s.heroWrap}>
              <ImageWell
                name={fm.title}
                label="hero image"
                ratio="16:9"
                dimensions="2400 × 1350"
                iconSize={28}
                image={fm.hero.image}
                alt={fm.hero.alt}
                className={s.heroWell}
              />
              {fm.hero.caption && <p className={s.caption}>{fm.hero.caption}</p>}
            </div>
          )}

          {(hasOverview || hasGlance) && (
            <div className={s.overview}>
              <div className={`${s.overviewGrid} ${!(hasOverview && hasGlance) ? s.overviewGridSingle : ''}`}>
                {hasOverview && (
                  <div>
                    <div className={s.eyebrow}>Overview</div>
                    {fm.overview.lede && <p className={s.overviewLede}>{fm.overview.lede}</p>}
                    {(fm.overview.body || []).map((p, i) => (
                      <p key={i} className={s.bodyText}>
                        {p}
                      </p>
                    ))}
                  </div>
                )}
                {hasGlance && <SidePanel items={fm.glance} />}
              </div>
            </div>
          )}

          <div className={s.chapterGrid}>
            <ChapterRail chapters={chapters} />
            <div id="chapter-content" className={s.chapterContent}>
              <MDXProvider components={mdxComponents}>{children}</MDXProvider>
            </div>
          </div>

          {nextProject && (
            <Link to={`/projects/${nextProject.frontmatter.slug}`} className={s.nextProject}>
              <div>
                <div className={s.eyebrow}>Next project</div>
                <div className={s.nextTitle}>{nextProject.frontmatter.title}</div>
                {nextProject.frontmatter.standfirst && (
                  <div className={s.nextDesc}>{nextProject.frontmatter.standfirst}</div>
                )}
              </div>
              <ArrowLink>View case study</ArrowLink>
            </Link>
          )}
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      id
      parent {
        ... on File {
          relativeDirectory
        }
      }
      frontmatter {
        title
        slug
        year
        discipline
        standfirst
        tags
        role
        timeline
        team
        context
        next
        draft
        hero {
          image {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: BLURRED
                quality: 82
                transformOptions: { fit: COVER, cropFocus: ATTENTION }
              )
            }
          }
          alt
          caption
        }
        overview {
          lede
          body
        }
        glance {
          label
          value
        }
        chapters {
          id
          number
          title
        }
        card {
          order
        }

        # legacy fields (the 5 pre-existing projects)
        category
        hero_image {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              quality: 82
              transformOptions: { fit: COVER, cropFocus: ATTENTION }
            )
          }
        }
        hero_image_alt
        sliders {
          images {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, transformOptions: { fit: COVER, cropFocus: ATTENTION })
            }
          }
        }
        videoSrcURL
        videoTitle
        GithubLink
        linkedin_post
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        relativeDirectory: { regex: "/^projects//" }
        extension: { regex: "/^(jpe?g|png|webp|gif|tiff?|avif)$/i" }
      }
    ) {
      nodes {
        relativePath
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            quality: 82
            transformOptions: { fit: COVER, cropFocus: ATTENTION }
          )
        }
      }
    }
    allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
      nodes {
        id
        frontmatter {
          title
          slug
          standfirst
          card {
            order
          }
        }
      }
    }
  }
`

export const Head = ({ data, location }) => {
  const fm = data.mdx.frontmatter
  return (
    <Seo title={fm.title} pathname={location.pathname}>
      {fm.draft && <meta name="robots" content="noindex" />}
    </Seo>
  )
}

export default Project
