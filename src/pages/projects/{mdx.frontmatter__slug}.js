import * as React from 'react'
import Layout from '../../components/layout'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Zoom } from "react-slideshow-image";
import Seo from '../../components/seo'
import { graphql } from 'gatsby'  
import "react-slideshow-image/dist/styles.css";

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 1,
  arrows: true,
};



const Project = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.hero_image)
  console.log(image)
  const sliders = data.mdx.frontmatter.sliders

 
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.year}</p>
      <div className='project_post'> 
        {sliders?.map((slider, index) => (
          <div key={index} className='slider'>
             <Zoom {...zoomOutProperties}>
            {slider.images.map((image, imgIndex) => {
              const sliderImage = getImage(image)
                return (
                <GatsbyImage
                  key={imgIndex}
                  alt={`slider image ${imgIndex + 1}`}
                  image={sliderImage}
                  className='slider_image'
                  objectPosition={'center'}
                  style={{ maxHeight: '100vh', width: 'auto' }}
                />
                )
            })}
            </Zoom>
          </div>
        ))}
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
        sliders {
          images {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, transformOptions: {fit: COVER, cropFocus: ATTENTION})
            }
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export default Project