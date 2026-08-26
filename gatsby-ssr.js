import React from "react"

/**
 * Gatsby SSR APIs.
 * Inject an empty favicon on every page so the browser tab stays blank instead
 * of falling back to /favicon.ico or a default globe. Paired with
 * gatsby-plugin-manifest's `include_favicon: false` (see gatsby-config.js).
 */
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="blank-favicon" rel="icon" href="data:," />,
  ])
}
