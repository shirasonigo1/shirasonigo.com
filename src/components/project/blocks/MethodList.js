import * as React from 'react'
import * as s from '../project.module.css'

// Method — one named step, numbered automatically by CSS counter (see
// .methodList/.method in project.module.css).
export const Method = ({ title, children }) => (
  <li className={s.method}>
    <div className={s.methodBody}>
      <div className={s.methodTitle}>{title}</div>
      {children && <p className={s.methodDesc}>{children}</p>}
    </div>
  </li>
)

const MethodList = ({ children }) => <ol className={s.methodList}>{children}</ol>

export default MethodList
