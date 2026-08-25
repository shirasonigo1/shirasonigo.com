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
    // Phase 5: generate sitemap.xml and a web manifest (PWA/install metadata).
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Shira Sonigo`,
        short_name: `Shira Sonigo`,
        start_url: `/`,
        background_color: `#efece6`,
        theme_color: `#9a3412`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
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
