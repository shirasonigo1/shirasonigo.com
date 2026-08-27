/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Shira Sonigo`,
    // Phase 5: real description + siteUrl feed SEO meta, canonical URLs and the sitemap.
    description: `Shira Sonigo — Software Engineer and practice Designer working at the intersection of technology, craft, and impact.`,
    siteUrl: `https://shirasonigo.com`,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    // About page: journey / press / awards are data, sourced as JSON from
    // content/about/ (already covered by the "content" filesystem source below)
    // and queried via GraphQL.
    "gatsby-transformer-json",
    // Phase 5: generate sitemap.xml for SEO.
    "gatsby-plugin-sitemap",
    // gatsby-plugin-manifest removed: it requires an icon and would generate
    // favicon/apple-touch-icon links. The tab is intentionally left blank
    // (see the empty icon link injected in gatsby-ssr.js).
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: true,
              backgroundColor: "transparent",
              quality: 80,
            },
          },
        ],
      },
    },
  ],
}
