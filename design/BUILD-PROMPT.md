# Claude Code prompt — build the Work page redesign

Paste everything below the line into Claude Code from the root of the
Gatsby repo. The `design/` folder must be present.

---

## The task

Redesign the Work / Projects page of this Gatsby site to match the
approved design in `design/`. Do not restyle the rest of the site yet —
this page first, then we extend the system outward.

## Read before writing any code

1. `design/Main.dc.html` — the approved desktop layout (1440px)
2. `design/Mobile.dc.html` — the approved mobile layout (390px)
3. `design/System.dc.html` — the design system: palette, type ramp,
   component specs, spacing rules

These are Design Component files, not plain HTML. Ignore the `<x-dc>`,
`<helmet>` and `<script data-dc-script>` wrappers — everything inside
`<x-dc>` is ordinary markup with inline styles. The `{{accent}}` holes
all resolve to `#9A3412`. Treat these files as the source of truth for
every numeric value: paddings, font sizes, line heights, radii, gaps.
Copy them exactly. Do not round or snap anything to a 4/8px grid, and
do not substitute framework defaults.

Then explore the repo before proposing anything:

- How this site is styled today (CSS Modules, styled-components,
  vanilla-extract, Tailwind, plain CSS — find out, don't assume) and
  follow that convention rather than introducing a new one
- The existing `gatsby-node.js` page creation, the GraphQL queries that
  feed the projects list, and wherever project content actually lives
  (MDX, Markdown frontmatter, JSON, a CMS source plugin)
- The existing project detail page template and its route shape
- The current Layout, Header/Nav, Footer, SEO and any existing theme or
  token file

Report back what you found and how you intend to fit the new design
into it **before** you start writing files.

## Hard constraints

**Keep the data layer.** The projects rendered on this page must come
from the same GraphQL source they come from today. Do not hardcode a
project array in the component. If the design needs a field the content
doesn't have yet (a standfirst line, a category for filtering, a
`featured` flag, an image aspect ratio), add it to the frontmatter
schema, give it a safe default, and tell me which files I need to edit
to fill it in.

**Missing content stays visibly missing.** I will add the real
photography and the final copy myself. Where an image or a piece of
copy is absent from the content source, render the labelled placeholder
component from the design — the warm well with the project name and the
expected ratio — not a stock image, not a grey box, and never invented
copy. Anything you cannot source from the repo goes in as a bracketed
placeholder like `[STANDFIRST]` so it is obvious on the page. Do not
fabricate project descriptions, dates, collaborator names or tags.

**Preserve what works.** Existing routes must not change. Keep the CV
PDF link, the GitHub and LinkedIn links, the SEO component, and the
"Crafted with ♥ by Shira Sonigo" footer line — the heart is the inline
SVG from the design, not an emoji.

## Design tokens

Add these to the project's existing token/theme file if there is one,
or create `src/styles/tokens.css` if there isn't. Everything downstream
references the token, never the raw hex.

```
--paper:        #F4F2ED   page ground
--card:         #FBFAF7   standard card surface
--card-feature: #EFEAE3   featured card only
--well:         #EAE5DC   image placeholder ground
--well-line:    #DCD4C8   image placeholder border

--ink:          #1C1917   headings, project titles
--ink-body:     #57534E   descriptions, nav
--ink-muted:    #8A827A   eyebrows, years, meta
--ink-faint:    #A09788   placeholder dimensions, footer meta

--accent:       #9A3412   links, arrows, active underline
--hairline:     #E4DED4   every border and rule, always 1px

--tag-sand:     #E6DFD4   inclusive design / product
--tag-stone:    #E7E4E0   systems / engineering
--tag-clay:     #EDE5DC   speculative / art & culture

--radius:       4px       cards
--radius-sm:    3px       chips, tags, image wells
```

Type: **Newsreader** (300/400, plus 400 italic) for display, **Archivo**
(400/500) for everything else. Self-host both with
`gatsby-plugin-webfonts` or `@fontsource` — do not add a render-blocking
Google Fonts `<link>` to the document head. Fallbacks
`Georgia, 'Times New Roman', serif` and `'Helvetica Neue', Arial,
sans-serif` respectively.

No shadows anywhere on this page. No gradients. Depth comes from tone
and the 1px hairline.

## Components to build

Build these as real, reusable components — this page is the first
consumer, not the only one.

- `ProjectCardFeatured` — full width, 42/58 text-image split, featured
  card tint, standfirst in Newsreader, up to four tags, "View case
  study" link
- `ProjectCard` — image above text, 4:3 well, title with the year on
  the same baseline, description, up to three tags
- `ProjectCardWide` — image left at 55%, text right, used to close an
  odd-numbered grid row
- `ProjectCardCompact` — 200px image strip left, text right, used in
  Experiments & Explorations
- `ImageWell` — the labelled placeholder. Props: project name, expected
  ratio, expected pixel dimensions. Renders the real image via
  `gatsby-plugin-image` when one exists in the content and falls back to
  the labelled well when it does not. This is the component that makes
  the "missing stays missing" rule work, so build it first.
- `Tag` — filled chip, tint keyed to the project family, sentence case
- `FilterChip` — active state is solid ink, resting state is a 1px
  hairline outline
- `ArrowLink` — terracotta text, 1px underline, 17px arrow. Never a
  filled button.

## Page composition

Match `design/Main.dc.html` in this order: masthead → page title, lede
and filter row → featured project → two equal cards → one wide card →
Experiments & Explorations → footer.

The filter row is **not wired yet** — render it in its resting state
with "All" active. We will make it functional in a second pass once the
category taxonomy is settled in the content.

Which project lands in which slot must be driven by the content, not by
position in a hardcoded list. Use a `featured` frontmatter flag for the
hero slot and let the rest fall into the grid in date order, with the
wide card used when the remaining count is odd.

## Responsive

Follow `design/Mobile.dc.html` at 390px and interpolate between. The
grid collapses to a single column, the featured card stacks image-above-
text, and the compact cards keep their 110px image strip. Test at 390,
768, 1024 and 1440. Nothing may scroll horizontally at any width.

## Accessibility — not optional on this site

- Every `ImageWell` that stands in for a real image gets meaningful
  `alt` text, or `alt=""` plus a visible label if it is decorative
- Tags and years are not the only carrier of any information
- Colour contrast: check `--ink-muted` on `--paper` and `--ink-body` on
  `--card-feature` against WCAG AA for their sizes and fix by darkening
  the token if either fails
- Cards are navigable and operable by keyboard with a visible focus ring
  in the accent colour; the whole card is the target, but there is only
  one tab stop per card
- Heading order is a real outline: one `h1`, sections at `h2`, project
  titles at `h3`
- Honour `prefers-reduced-motion` for the arrow hover slide

## Working agreement

Show me the plan before you build. Build in this order: tokens and fonts
→ `ImageWell` → the card components → the page composition → responsive
→ accessibility pass. Run the dev server and check the page renders at
each stage rather than at the end. Do not touch the home page, the
project detail template or the About page in this pass.

When you are done, give me a short list of exactly which content files I
need to edit and which fields I need to fill in to replace the
placeholders with the real thing.
