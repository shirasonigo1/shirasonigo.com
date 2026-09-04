/*
 * Resolves content-relative image paths (e.g. "./images/hero.jpg", written in
 * MDX body as a <Figure>/<Media> prop) to processed gatsby-plugin-image data.
 *
 * gatsby-remark-images only rewrites markdown `![]()` syntax at compile time —
 * it does nothing for a path passed as a JSX prop, which is just a literal
 * string at render time. So the page template queries every File under
 * content/projects/, and this builds a lookup keyed by each file's path
 * relative to the *current* project's own folder — not by slug, since a
 * project's frontmatter `slug` does not reliably match its content folder
 * name (e.g. slug "the-inner-shoe" lives in "TheInnerShoe/").
 */
export const normalizeImagePath = (p) => (p || '').replace(/^\.\//, '').trim()

export const buildImageMap = (fileNodes, projectRelativeDirectory) => {
  const map = {}
  if (!projectRelativeDirectory) return map
  const prefix = `${projectRelativeDirectory}/`
  ;(fileNodes || []).forEach((node) => {
    if (!node.relativePath || !node.relativePath.startsWith(prefix)) return
    if (!node.childImageSharp) return
    map[node.relativePath.slice(prefix.length)] = node.childImageSharp.gatsbyImageData
  })
  return map
}
