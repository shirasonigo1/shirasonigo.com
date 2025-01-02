import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { Link, graphql } from 'gatsby'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="Projects">
      {
        data.allMdx.nodes.map((node) => (
          <article key={node.id}>
               <h2>
              <Link to={`/projects/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </h2>
            <p>Posted: {node.frontmatter.year}</p>
            <p>{node.excerpt}</p>
          </article>
        ))
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { year: DESC }}) {
      nodes {
        frontmatter {
          year
          title
          slug
        }
        id
        excerpt
      }
    }
  }
`

export const Head = () => <Seo title="Projects" />

export default BlogPage