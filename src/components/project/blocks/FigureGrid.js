import * as React from 'react'
import * as s from '../project.module.css'

// FigureGrid — 2 to 4 even columns of <Figure>. Column count is a CSS custom
// property rather than four generated classes. `square` swaps the fixed-height
// wells for 1:1 cells so square sources (logos, product renders) sit whole and
// centred instead of being zoomed and cropped top/bottom by the wide default
// cell.
const FigureGrid = ({ cols = 3, square = false, children }) => (
  <div
    className={`${s.figureGrid} ${square ? s.figureGridSquare : ''}`}
    style={{ '--fg-cols': cols }}
  >
    {children}
  </div>
)

export default FigureGrid
