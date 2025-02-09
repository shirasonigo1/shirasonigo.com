import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="Projects">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {
          data.allMdx.nodes.map(node => (
            <article key={node.id} style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <GatsbyImage
                image={getImage(node.frontmatter.hero_image)}
                alt={node.frontmatter.title}
                style={{height:'200px',  borderRadius: '3%', objectPosition: 'bottom', float: 'right' }}
                imgStyle={{ objectFit: 'cover' }}
              />
              <h2 style={{ margin: '0'}}>
                <Link style= {{ margin: '0', color: 'black', fontWeight: 'normal' }} to={`/projects/${node.frontmatter.slug}`}>
                  {node.frontmatter.title}
                </Link>
              </h2>
              <p style={{ margin: '0' }}>Posted: {node.frontmatter.year}</p>
              <p>{node.excerpt}</p>
              {node.frontmatter.tags && node.frontmatter.tags.length > 0 && (
                <div style= {{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px'}}>
                  {node.frontmatter.tags.map((tag, index) => (
                    <span key={index} style= {{    backgroundColor: '#f3f4f6',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      color: '#666'}}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))
        }
      </div>
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

export const Head = () => <Seo title="Projects" />

export default BlogPage