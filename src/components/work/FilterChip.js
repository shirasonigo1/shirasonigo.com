import React from 'react'
import * as s from './work.module.css'

/*
 * FilterChip — active state is solid ink, resting state is a 1px hairline outline.
 * Rendered non-interactive for now: the filter row is not wired yet (a second
 * pass will make it functional once the category taxonomy is settled). Kept as a
 * standalone component so wiring it later is a one-file change.
 */
const FilterChip = ({ label, active = false }) => (
  <span className={`${s.filterChip} ${active ? s.filterChipActive : ''}`}>
    {label}
  </span>
)

export default FilterChip
