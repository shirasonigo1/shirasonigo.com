import React from "react"
import { tag, tagList } from "./ui.module.css"

/* Tag / TagList (Phase 3) — reusable chips for project tags. */
export const Tag = ({ children }) => <span className={tag}>{children}</span>

export const TagList = ({ tags }) => {
  if (!tags || tags.length === 0) return null
  return (
    <div className={tagList}>
      {tags.map((t, i) => (
        <Tag key={i}>{t}</Tag>
      ))}
    </div>
  )
}

export default Tag
