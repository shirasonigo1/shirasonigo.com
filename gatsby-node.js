/**
 * Gatsby Node APIs.
 *
 * Phase 4: declare the optional project frontmatter fields (`role`, `stack`)
 * explicitly. Gatsby infers its GraphQL schema from existing content, so
 * querying a field that no MDX file uses yet would fail the build. Declaring
 * them here makes the fields queryable (returning null until authored), so the
 * detail page can surface role/stack without any content being fabricated.
 *
 * Project template (case-study format): the new frontmatter shape from
 * design/project/BUILD-PROMPT-PROJECT.md. Nested shapes (hero, glance,
 * chapters, card) are declared explicitly rather than left to inference,
 * since only sample-project.mdx uses them today — inference from a single
 * node is unreliable. `hero.image` / `card.image` use @fileByRelativePath so
 * they resolve the same way the legacy flat `hero_image` field already does.
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
      discipline: String
      timeline: String
      team: String
      context: String
      next: String
      draft: Boolean
      hero: MdxFrontmatterHero
      overview: MdxFrontmatterOverview
      glance: [MdxFrontmatterGlanceItem]
      chapters: [MdxFrontmatterChapter]
      card: MdxFrontmatterCard
    }
    # Overview lives in frontmatter, not the MDX body: unlike chapters (which
    # vary wildly per project) every project has exactly one lede line plus a
    # short paragraph or two of context — that's fixed furniture, not composed
    # narrative. It also sidesteps a real technical constraint: the MDX body
    # a page template receives as \`children\` is one opaque compiled
    # component, not an inspectable list of elements, so there is no reliable
    # way to split "prose before the first <Chapter>" out of it from outside.
    type MdxFrontmatterOverview {
      lede: String
      body: [String]
    }
    type MdxFrontmatterHero {
      image: File @fileByRelativePath
      alt: String
      caption: String
    }
    type MdxFrontmatterGlanceItem {
      label: String
      value: String
    }
    type MdxFrontmatterChapter {
      id: String
      number: String
      title: String
    }
    type MdxFrontmatterCard {
      summary: String
      image: File @fileByRelativePath
      featured: Boolean
      order: Int
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

// Matches `<Chapter id="...">` opening tags in document order. Controlled,
// author-only tag syntax (plain quoted attributes) — a regex scan is enough;
// gatsby-plugin-mdx v5 doesn't expose JSX-prop AST without a full compile pass.
const CHAPTER_ID_RE = /<Chapter\s+[^>]*?\bid="([^"]+)"/g
const FIGURE_TAG_RE = /<Figure\b([^>]*)>/g
const ALT_ATTR_RE = /\balt="([^"]*)"/

/*
 * Project template: frontmatter.chapters (id/number/title, drives the rail)
 * must never silently disagree with the <Chapter id="..."> tags actually
 * authored in the body — so a project's rail can't claim a chapter that
 * doesn't exist, or hide one that does. Only checked for files that declare
 * frontmatter.chapters; legacy projects (no chapters) skip this entirely.
 *
 * Also warns (does not fail the build) on any <Figure> missing alt text —
 * content-bearing images should always have it, but a missing caption isn't
 * as structurally broken as a rail that lies about what's on the page.
 */
exports.onCreateNode = ({ node, reporter }) => {
  if (node.internal.type !== 'Mdx') return

  const body = node.body || ''
  const file = node.internal.contentFilePath || node.id
  const frontmatterChapters = node.frontmatter?.chapters || []

  if (frontmatterChapters.length > 0) {
    const bodyIds = []
    CHAPTER_ID_RE.lastIndex = 0
    let m
    while ((m = CHAPTER_ID_RE.exec(body))) bodyIds.push(m[1])

    const frontmatterIds = frontmatterChapters.map((c) => c.id)
    const missingInBody = frontmatterIds.filter((id) => !bodyIds.includes(id))
    const missingInFrontmatter = bodyIds.filter((id) => !frontmatterIds.includes(id))

    if (missingInBody.length || missingInFrontmatter.length) {
      const parts = []
      if (missingInBody.length) {
        parts.push(
          `frontmatter.chapters lists ${missingInBody.map((id) => `"${id}"`).join(', ')} with no matching <Chapter id="..."> in the body`
        )
      }
      if (missingInFrontmatter.length) {
        parts.push(
          `the body has <Chapter id="..."> for ${missingInFrontmatter.map((id) => `"${id}"`).join(', ')} with no matching entry in frontmatter.chapters`
        )
      }
      reporter.panicOnBuild(`Chapter id mismatch in ${file}: ${parts.join('; ')}.`)
    }
  }

  FIGURE_TAG_RE.lastIndex = 0
  let fm
  while ((fm = FIGURE_TAG_RE.exec(body))) {
    const altMatch = fm[1].match(ALT_ATTR_RE)
    if (!altMatch || !altMatch[1].trim()) {
      reporter.warn(`${file}: a <Figure> is missing alt text.`)
    }
  }
}
