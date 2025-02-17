import * as React from 'react'
import Layout from '../../components/layout'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Zoom } from "react-slideshow-image";
import Seo from '../../components/seo'
import { Link, graphql } from 'gatsby'  
import "react-slideshow-image/dist/styles.css";
import {contentproject} from '../../components/layout.module.css'

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 1,
  arrows: true,
};

const Project = ({ data, children }) => {
  const sliders = data.mdx.frontmatter.sliders
  const content = data.mdx.body
  
  // Function to split content into sections based on slider headers
  const splitContentIntoSections = (content) => {
    const sections = []
    let currentSection = {
      isBeforeSliders: true,
      content: []
    }
    
    const contentLines = content.split('\n')
    
    contentLines.forEach((line) => {
      if (line.startsWith('## Slider')) {
        if (currentSection.isBeforeSliders) {
          sections.push({ type: 'intro', content: currentSection.content.join('\n') })
          currentSection = {
            type: 'slider',
            title: line,
            content: []
          }
        } else {
          sections.push({
            type: 'slider',
            title: currentSection.title,
            content: currentSection.content.join('\n')
          })
          currentSection = {
            type: 'slider',
            title: line,
            content: []
          }
        }
      } else if (line.startsWith('#') && currentSection.type === 'slider') {
        // Start of a new non-slider section
        sections.push({
          type: 'slider',
          title: currentSection.title,
          content: currentSection.content.join('\n')
        })
        currentSection = {
          type: 'outro',
          content: [line]
        }
      } else {
        currentSection.content.push(line)
      }
    })
    
    // Add the last section
    if (currentSection.content.length > 0) {
      sections.push({
        type: currentSection.type || 'outro',
        ...(currentSection.title && { title: currentSection.title }),
        content: currentSection.content.join('\n')
      })
    }
    
    return sections
  }

  const sections = splitContentIntoSections(content)

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.year}</p>
      <div className='project_post'>
        {/* Display intro content */}
        <div className={contentproject}>
          {sections.find(section => section.type === 'intro')?.content}
        </div>
        
        {/* Display sliders with their corresponding content */}
        {sliders?.map((slider, index) => (
          <div key={index} className='slider-section'>
            <div className='slider'>
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
            
            {/* Display the corresponding section content */}
            {sections.filter(section => section.type === 'slider')[index] && (
              <div className={contentproject}>
                <div dangerouslySetInnerHTML={{ 
                  __html: sections.filter(section => section.type === 'slider')[index].content 
                }} />
              </div>
            )}
          </div>
        ))}
        
        {/* Display outro content */}
        <div className="final-content">
          {sections.find(section => section.type === 'outro')?.content}
        </div>
        {}
        {data.mdx.frontmatter.linkedin_post && (
        <Link
          style={{ margin: '0', color: 'black', fontWeight: 'normal' }}
          to={data.mdx.frontmatter.linkedin_post}
        >
          Linkedin post
        </Link>
      )}

      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      body
      frontmatter {
        title
        year
        linkedin_post
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