import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import Gallery from '../../components/Gallery'
import Video from '../../components/video'
import Button from '../../components/ui/Button'
import { TagList } from '../../components/ui/Tag'
import { contentproject } from '../../components/layout.module.css'
import { projectMeta, projectStack } from '../../components/ui/ui.module.css'

/*
 * Project detail template (Phase 2 — rewritten).
 *
 * The previous version re-parsed the raw MDX `body` string by splitting on
 * "## Slider" and injected the result with dangerouslySetInnerHTML, so markdown
 * (bold, lists, links) was never actually rendered. That fragile parser is gone.
 *
 * Now the MDX is rendered natively through `children` + MDXProvider. Content still
 * uses the "## Slider N" heading convention to place galleries: the h2 override
 * below detects those headings and renders the matching frontmatter `sliders[N-1]`
 * gallery in-flow. Any text after the colon (e.g. "## Slider 1: ClockMan") becomes
 * the visible section heading; a bare "## Slider N:" renders just the gallery.
 * Every heading maps 1:1 to a gallery, so no slider is dropped.
 */
const SLIDER_HEADING = /^\s*slider\s*(\d+)\s*:?\s*(.*)$/i

// Flatten heading children down to their text so we can match the convention.
const headingText = (children) =>
  React.Children.toArray(children)
    .map((child) => (typeof child === 'string' ? child : ''))
    .join('')

const Project = ({ data, children }) => {
  const { frontmatter } = data.mdx
  const sliders = frontmatter.sliders || []

  // MDX component overrides. Defined here so the h2 handler can close over
  // `sliders` and swap "## Slider N" headings for the corresponding gallery.
  const components = {
    h2: (props) => {
      const match = headingText(props.children).match(SLIDER_HEADING)
      if (match) {
        const index = parseInt(match[1], 10) - 1
        const subtitle = match[2].trim()
        return (
          <>
            <Gallery images={sliders[index]?.images} />
            {subtitle ? <h2>{subtitle}</h2> : null}
          </>
        )
      }
      return <h2 {...props} />
    },
  }

  return (
    <Layout pageTitle={frontmatter.title}>
      {/* Project header: year + optional role, tags, and optional tech stack.
          role/stack are optional frontmatter — rendered only when present. */}
      <div className={projectMeta}>
        <span>{frontmatter.year}</span>
        {frontmatter.role && <span>· {frontmatter.role}</span>}
      </div>
      <TagList tags={frontmatter.tags} />
      {frontmatter.stack && frontmatter.stack.length > 0 && (
        <p className={projectStack}>Stack: {frontmatter.stack.join(', ')}</p>
      )}

      <div className={contentproject}>
        <MDXProvider components={components}>{children}</MDXProvider>
      </div>

      {/* External links use Button's <a> (Gatsby <Link> is for internal routes only). */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1rem 0' }}>
        {frontmatter.linkedin_post && (
          <Button href={frontmatter.linkedin_post} target="_blank" rel="noopener noreferrer">
            LinkedIn post
          </Button>
        )}
        {frontmatter.GithubLink && (
          <Button href={frontmatter.GithubLink} target="_blank" rel="noopener noreferrer">
            GitHub repository
          </Button>
        )}
      </div>

      {frontmatter.videoSrcURL?.map((url, index) => (
        <Video key={index} videoSrcURL={url} videoTitle={frontmatter.videoTitle} />
      ))}
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        year
        role
        stack
        tags
        linkedin_post
        videoSrcURL
        videoTitle
        GithubLink
        sliders {
          images {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, transformOptions: { fit: COVER, cropFocus: ATTENTION })
            }
          }
        }
      }
    }
  }
`

export const Head = ({ data, location }) => (
  <Seo title={data.mdx.frontmatter.title} pathname={location.pathname} />
)

export default Project
