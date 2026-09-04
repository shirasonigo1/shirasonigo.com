import * as React from 'react'
import * as s from '../project.module.css'

// FigurePair — two <Figure>s side by side. "Two things that mean more
// together than apart" — the pair is the unit, so it takes one shared
// <Caption> after it rather than one per image (see AUTHORING.md).
const FigurePair = ({ children }) => <div className={s.figurePair}>{children}</div>

export default FigurePair
