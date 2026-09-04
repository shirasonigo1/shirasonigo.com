import * as React from 'react'
import { createChapter } from './blocks/Chapter'
import { createFigure } from './blocks/Figure'
import FigurePair from './blocks/FigurePair'
import FigureGrid from './blocks/FigureGrid'
import Caption from './blocks/Caption'
import Insights, { Insight } from './blocks/Insights'
import PullQuote from './blocks/PullQuote'
import { createIteration } from './blocks/Iteration'
import MethodList, { Method } from './blocks/MethodList'
import { createMedia } from './blocks/Media'
import SidePanel from './blocks/SidePanel'
import Closing from './blocks/Closing'
import * as s from './project.module.css'

/*
 * Assembles the full MDXProvider component map for a project's body, so a
 * project file never has to import a block — see BUILD-PROMPT-PROJECT.md's
 * "register these globally" instruction. `chapterMeta`/`imageMap` are
 * closed over by the factories rather than passed via context, the same
 * pattern the pre-existing template used for its `sliders` closure.
 *
 * `p`/`a` overrides give plain markdown prose (between blocks, and the
 * whole body on the legacy fallback path) the 680px-measure body styling
 * without every project file needing its own component.
 */
export const buildMdxComponents = ({ chapterMeta = {}, imageMap = {}, projectTitle }) => ({
  Chapter: createChapter(chapterMeta),
  Figure: createFigure(imageMap, projectTitle),
  FigurePair,
  FigureGrid,
  Caption,
  Insights,
  Insight,
  PullQuote,
  Iteration: createIteration(imageMap, projectTitle),
  MethodList,
  Method,
  Media: createMedia(imageMap, projectTitle),
  SidePanel,
  Closing,
  p: (props) => <p className={s.bodyText} {...props} />,
  // eslint-disable-next-line jsx-a11y/anchor-has-content -- content arrives via {...props}.children
  a: (props) => <a className={s.bodyLink} {...props} />,
})

export default buildMdxComponents
