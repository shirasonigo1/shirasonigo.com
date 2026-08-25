import React from "react"
import { video } from "./layout.module.css"

/*
 * Video (Phase 3 accessibility fix).
 * Dropped the deprecated `frameborder` attribute (now `style={{ border: 0 }}`),
 * added allowFullScreen, and kept a meaningful iframe title.
 */
const Video = ({ videoSrcURL, videoTitle }) => (
  <div className={video}>
    <iframe
      width="100%"
      height="400px"
      src={videoSrcURL}
      title={videoTitle || "Embedded video"}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ border: 0 }}
    />
  </div>
)

export default Video
