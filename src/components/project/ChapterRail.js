import * as React from 'react'
import * as s from './project.module.css'

/*
 * ChapterRail — sticky nav generated from `chapters` (frontmatter, id/number/
 * title), never hardcoded to a count. IntersectionObserver marks the chapter
 * whose heading is in the upper third of the viewport as current; a click
 * scrolls to it, instantly under prefers-reduced-motion. CSS alone turns
 * this into the desktop 170px sticky column or the mobile sticky horizontal
 * strip — one observer/scroll implementation, two layouts.
 */
const ChapterRail = ({ chapters }) => {
  const [activeId, setActiveId] = React.useState(chapters[0]?.id)

  React.useEffect(() => {
    if (!chapters.length || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    )

    chapters.forEach((chapter) => {
      const el = document.getElementById(chapter.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [chapters])

  const handleClick = (event, id) => {
    event.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  if (!chapters.length) return null

  return (
    <>
      <a href="#chapter-content" className={s.skipLink}>
        Skip to project content
      </a>
      <nav className={s.rail} aria-label="Chapters">
        <div className={s.railEyebrow}>Contents</div>
        <ol className={s.railList}>
          {chapters.map((chapter) => (
            <li key={chapter.id} className={s.railItem}>
              <a
                href={`#${chapter.id}`}
                onClick={(event) => handleClick(event, chapter.id)}
                aria-current={activeId === chapter.id ? 'true' : undefined}
                className={`${s.railLink} ${activeId === chapter.id ? s.railLinkActive : ''}`}
              >
                <span className={s.railNum}>{chapter.number}</span>
                <span className={s.railTxt}>{chapter.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export default ChapterRail
