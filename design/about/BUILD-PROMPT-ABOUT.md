# Claude Code prompt — rebuild the About page (simple version)

Paste everything below the rule into Claude Code from the root of the
Gatsby repo. `design/about/` must be present.

---

## The task

The About page has been redesigned. Rebuild `src/pages/about.js` to match
the approved design in `design/about/`. Scope is this page only — do not
restyle the Work page, the home page or the project template.

## Read before writing any code

1. `design/about/Main.dc.html` — approved desktop layout (1440px)
2. `design/about/AboutMobile.dc.html` — approved mobile layout (390px)
3. `design/System.dc.html` — the design system this page inherits

These are Design Component files, not plain HTML. Ignore the `<x-dc>`,
`<helmet>` and `<script data-dc-script>` wrappers; everything inside
`<x-dc>` is ordinary markup with inline styles. `{{accent}}` resolves to
`#0E4B53` (a deep teal taken from the wall in the photograph). Copy the
numeric values exactly — paddings, font sizes, line heights, radii, gaps.

## What changed from the previous build

The page is now a single hero: masthead → text left, photograph right →
footer. Specifically:

- **Remove** the Journey, Press and Awards sections, and the
  `TimelineRow`, `ListRow` and `PortraitArch` components plus their CSS
  if nothing else uses them. Remove the journey / press / awards content
  files and their GraphQL queries. Check nothing else imports them first.
- **Remove** `[X YEARS]` / `yearsBuilding` — the new copy doesn't use it.
- **Replace the copy** with the text in `Main.dc.html`, word for word:
  eyebrow "About", `h1` "Hey, I'm Shira.", the serif standfirst, four body
  paragraphs, then the italic closing line above a hairline.
- **Replace the portrait.** No arch, no tinted panel, no fades: a plain
  rectangle with `border-radius: 3px`, `overflow: hidden`,
  `object-fit: cover`, `object-position: 58% 20%` (mobile `60% 18%`),
  760px tall on desktop and 440px on mobile. Below it on desktop, a small
  caption row: "London, 2026" left, "Engineer & designer" right.
- **Introduce the teal accent** (`#0E4B53`) for this page only: the
  About underline in the masthead, the closing italic line, and the solid
  Contact button (paper label). The outline Download CV button is
  unchanged. Ground is `#F4F1EB`.
- Button order is now **Contact me (solid) first, Download CV (outline)
  second**.

## The portrait asset

Use `design/about/shira-portrait.jpg` (1365×2048, the original photo,
ungraded). Serve it through `gatsby-plugin-image`. Unlike the old
portrait, it needs no colour matching to the page: the teal wall is
meant to read as a photograph on the paper, so apply no filter, tint or
blend mode. `design/about/portrait.jpg` is a smaller copy used only by the
design canvas — don't use it on the site. Delete the old graded portrait
from wherever the page sources it.

Check the crop at 360, 390, 768, 1024 and 1440: her face should stay in
the upper third and roughly centred, with some teal wall above her head.

## Responsive

Follow `AboutMobile.dc.html` at 390px and interpolate. The hero stacks
with the photograph above the text, buttons go full width, and nothing
scrolls horizontally at any width. Between 768 and 1024 the two columns
can narrow, but switch to the stacked layout before the text column drops
below ~420px.

## Accessibility

- Portrait alt text: "Shira Sonigo, smiling, sitting in front of a teal
  wall".
- One `h1`. Both buttons are real links (`<a>`), with focus rings in the
  accent colour. Contact links to `/#contact`; Download CV keeps using the
  existing CV import.
- Check the paper label on the teal button and the teal italic line on the
  paper ground against WCAG AA (both should pass comfortably).

## Working agreement

Show me the plan before you build, including the list of files you will
delete. Run the dev server and check the page at each breakpoint before
you finish.
