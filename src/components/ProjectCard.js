import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { TagList } from "./ui/Tag"
import { card, cardImage, cardTitle, cardTitleLink, cardMeta } from "./ui/ui.module.css"

/*
 * ProjectCard (Phase 3).
 * Extracted from projects/index.js, which previously styled every element inline.
 * Presents one project node in the listing grid.
 */
const ProjectCard = ({ node }) => {
  const { frontmatter, excerpt } = node
  const image = getImage(frontmatter.hero_image)

  return (
    <article className={card}>
      {image && (
        <GatsbyImage
          image={image}
          alt={frontmatter.title}
          className={cardImage}
          imgStyle={{ objectFit: "cover" }}
        />
      )}
      <h2 className={cardTitle}>
        <Link className={cardTitleLink} to={`/projects/${frontmatter.slug}`}>
          {frontmatter.title}
        </Link>
      </h2>
      <p className={cardMeta}>Posted: {frontmatter.year}</p>
      <p>{excerpt}</p>
      <TagList tags={frontmatter.tags} />
    </article>
  )
}

export default ProjectCard
