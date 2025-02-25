import React from "react"
import {video} from "./layout.module.css"

const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <div className={video}>
    <iframe 
      width="100%" height="400px"
      src={videoSrcURL}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameborder="0" 
    />
  </div>
)
export default Video