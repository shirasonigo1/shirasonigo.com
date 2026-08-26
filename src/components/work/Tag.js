import React from 'react'
import * as s from './work.module.css'

/*
 * Tag — filled chip, sentence case, no border. Tint is keyed to the project's
 * family (not per-tag), using the three tag tokens. Max three/four per card is
 * enforced by the caller.
 */
const FAMILY_CLASS = {
  sand: s.tagSand,   // inclusive design / product
  stone: s.tagStone, // systems / engineering / sustainability
  clay: s.tagClay,   // speculative / art & culture
}

// Map a project category to a tag family. Falls back to stone when unknown.
export const tagFamily = (category) => {
  const c = (category || '').toLowerCase()
  if (c.includes('inclusive') || c.includes('product')) return 'sand'
  if (c.includes('speculat') || c.includes('art') || c.includes('culture')) return 'clay'
  if (c.includes('system') || c.includes('engineer') || c.includes('sustain')) return 'stone'
  return 'stone'
}

const Tag = ({ children, family = 'stone' }) => (
  <span className={`${s.tag} ${FAMILY_CLASS[family] || s.tagStone}`}>{children}</span>
)

export default Tag
