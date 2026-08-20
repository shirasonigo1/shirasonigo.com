import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import ProjectCard from '../../components/ProjectCard'
import { projectGrid } from '../../components/ui/ui.module.css'

/*
 * Projects listing (Phase 3).
 * Was named `BlogPage` with fully inline-styled markup; now uses the extracted
 * ProjectCard and a shared grid class.
 */
const ProjectsPage = ({ data }) => {
  return (
    <Layout pageTitle="Projects">
      <div className={projectGrid}>
        {data.allMdx.nodes.map((node) => (
          <ProjectCard key={node.id} node={node} />
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { year: DESC } }) {
      nodes {
        frontmatter {
          year
          title
          slug
          tags
          hero_image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
        id
        excerpt
      }
    }
  }
`

export const Head = ({ location }) => <Seo title="Projects" pathname={location.pathname} />

export default ProjectsPage
