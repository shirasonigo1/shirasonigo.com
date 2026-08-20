# shirasonigo.com — Redesign Plan

Redesigning the site into a stronger professional portfolio for an **Engineer × Designer**.
Framework stays **Gatsby** (no framework change). Phases are ordered lowest-risk first and
each phase is independently shippable, so the live site is never broken mid-redesign.

## Phase 0 — Clean baseline & safety net (prep)
**Goal:** start from a known-good, version-controlled state.
- Commit or stash pending changes (`shoe.mdx`, untracked `scan133.jpg`).
- Create a `redesign` branch off `main`.
- Add `netlify.toml` (build `gatsby build`, publish `public/`, Node 22).
- Set a real `siteUrl` in `gatsby-config.js`; remove tracked `.DS_Store`, add to `.gitignore`.
- Confirm `gatsby build` succeeds as the reference point.

**Risk:** none. **Verify:** clean `git status`, successful build.

## Phase 1 — Styling foundation (no visual change yet)
**Goal:** replace the four competing styling approaches with one system.
- Remove dead deps: `styled-components`, `babel-plugin-styled-components`, `gatsby-plugin-styled-components`.
- Add `src/styles/tokens.css` (color, spacing, type scale) and `src/styles/global.css`;
  move leaked global selectors out of `layout.module.css` into `global.css` via `gatsby-browser.js`.
- Self-host fonts with `@fontsource` (Oswald, Roboto Condensed); drop render-blocking `@import`s.

**Risk:** low. **Verify:** near-identical visual diff; build passes.

## Phase 2 — Fix the project template (highest-value correctness fix)
**Goal:** replace fragile manual markdown parsing.
- Rewrite `projects/{mdx.frontmatter__slug}.js` to render MDX via `children` + `MDXProvider`;
  delete `splitContentIntoSections` and `dangerouslySetInnerHTML`.
- Extract `Gallery`/`Slideshow` and `VideoEmbed` components, driven by frontmatter or MDX components.
- Keep the existing frontmatter contract so content files need no rewrite.

**Risk:** medium. **Verify:** all 5 project pages render text, sliders, videos, links correctly.

## Phase 3 — Component library & shared UI
**Goal:** eliminate inline styles; establish reusable building blocks.
- Extract `ProjectCard` from `projects/index.js`; build `Container`, `Section`, `Tag`, `Button`.
- Refactor `Layout`, `Header`, `Nav`, `Footer` into `components/layout/`;
  remove `console.log` and the `/about` logo special-case.
- Accessibility: aria-labels on nav/hamburger, remove deprecated `frameborder`, add iframe titles.

**Risk:** low–medium. **Verify:** all routes render; nav + mobile menu work.

## Phase 4 — Visual redesign (the new look)
**Goal:** apply the Engineer × Designer identity on the solid foundation.
- Redesign home hero, projects grid, project detail using tokens + components.
- Extend project frontmatter with `role`, `summary`, `stack`/`tools`.
- Rework responsive layout (replace fixed `12rem` margins with token-based container/grid).
- Decide `/blog`: build it or remove the nav entry.

**Risk:** medium. **Verify:** responsive at 480/768/1024/desktop; content parity.

## Phase 5 — SEO, performance & polish
**Goal:** production hardening.
- Expand `seo.js` to full meta/OpenGraph/canonical; add `gatsby-plugin-sitemap` + `gatsby-plugin-manifest`.
- Normalize image filename casing (`.JPG`/`.JPEG` → `.jpg`) to avoid Netlify case-sensitivity breaks.
- Lighthouse pass; verify Netlify deploy preview before merging to `main`.

**Risk:** low. **Verify:** Lighthouse scores, valid OG preview, successful Netlify deploy.
