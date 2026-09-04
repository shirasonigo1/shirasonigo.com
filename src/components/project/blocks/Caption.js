import * as React from 'react'
import * as s from '../project.module.css'

// Caption — for a FigurePair/FigureGrid where one caption serves the whole
// group. A single Figure's own `caption` prop is preferred when there's only
// one image (see Figure.js) — this is the standalone form.
const Caption = ({ children }) => <p className={s.caption}>{children}</p>

export default Caption
