import React from 'react'
import * as s from './about.module.css'

/*
 * ListRow — a press or award entry: title (h3) then a meta line. Optional `url`
 * makes the title a link. Used inside the Press / Awards <ol> lists.
 */
const ListRow = ({ title, meta, url, isLast = false }) => (
  <li className={`${s.lrow} ${isLast ? s.lrowLast : ''}`}>
    <h3 className={s.lrowTitle}>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className={s.lrowLink}>
          {title}
        </a>
      ) : (
        title
      )}
    </h3>
    <p className={s.lrowMeta}>{meta}</p>
  </li>
)

export default ListRow
