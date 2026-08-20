import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Zoom } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"

/*
 * Gallery (Phase 2).
 * Extracted from the project template. Renders one frontmatter `sliders[]`
 * entry (an array of Sharp-processed images) as a zooming slideshow.
 */
const zoomProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 1,
  arrows: true,
}

const Gallery = ({ images }) => {
  if (!images || images.length === 0) return null

  return (
    <div className="slider" style={{ margin: "1.5rem 0" }}>
      <Zoom {...zoomProperties}>
        {images.map((image, i) => {
          const gatsbyImage = getImage(image)
          if (!gatsbyImage) return null
          return (
            <GatsbyImage
              key={i}
              alt={`slide ${i + 1}`}
              image={gatsbyImage}
              objectPosition="center"
              style={{ maxHeight: "100vh", width: "auto" }}
            />
          )
        })}
      </Zoom>
    </div>
  )
}

export default Gallery
