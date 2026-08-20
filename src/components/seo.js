import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

/*
 * SEO (Phase 5).
 * Was title-only. Now emits description, canonical URL, and OpenGraph/Twitter
 * meta so pages preview correctly when shared. `pathname` (passed from each page's
 * Head export via Gatsby's location prop) builds the canonical/OG URL.
 */
const Seo = ({ title, description, pathname, children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const meta = site.siteMetadata
  const seoTitle = title ? `${title} | ${meta.title}` : meta.title
  const seoDescription = description || meta.description
  const url = `${meta.siteUrl}${pathname || ''}`

  return (
    <>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />

      {children}
    </>
  )
}

export default Seo
