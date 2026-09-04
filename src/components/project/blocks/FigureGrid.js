import * as React from 'react'
import * as s from '../project.module.css'

// FigureGrid — 2 to 4 even columns of <Figure>. Column count is a CSS custom
// property rather than four generated classes.
const FigureGrid = ({ cols = 3, children }) => (
  <div className={s.figureGrid} style={{ '--fg-cols': cols }}>
    {children}
  </div>
)

export default FigureGrid
