import * as React from 'react'
import Layout from '../../components/layout'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Seo from '../../components/seo'
import { graphql } from 'gatsby'  

const Project = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.hero_image)
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.year}</p>
      <div className='project_post'> 
         <div className='prject_image'> 
           <GatsbyImage
            alt="hero"
        image={image}   
        className='image_box'
      /> 
      </div>
<div className='project_children'>
      {children}
      </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        year
        hero_image {
          childImageSharp {
            gatsbyImageData(width: 1000 height: 1000)
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export default Project