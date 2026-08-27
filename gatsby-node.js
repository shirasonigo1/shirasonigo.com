/**
 * Gatsby Node APIs.
 *
 * Phase 4: declare the optional project frontmatter fields (`role`, `stack`)
 * explicitly. Gatsby infers its GraphQL schema from existing content, so
 * querying a field that no MDX file uses yet would fail the build. Declaring
 * them here makes the fields queryable (returning null until authored), so the
 * detail page can surface role/stack without any content being fabricated.
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      role: String
      stack: [String]
      featured: Boolean
      standfirst: String
      category: String
      description: String
    }

    # About-page JSON data (content/about/*.json). Declared so optional fields
    # (notably url, which is null in every seeded placeholder row) stay queryable.
    type JourneyJson implements Node {
      order: Int
      start: String
      end: String
      title: String
      org: String
      description: String
    }
    type PressJson implements Node {
      order: Int
      publication: String
      title: String
      year: String
      url: String
    }
    type AwardsJson implements Node {
      order: Int
      name: String
      whatFor: String
      year: String
      url: String
    }
    type AboutJson implements Node {
      yearsBuilding: String
    }
  `)
}
