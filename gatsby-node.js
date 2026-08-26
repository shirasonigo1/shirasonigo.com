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
  `)
}
