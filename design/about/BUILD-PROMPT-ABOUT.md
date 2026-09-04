# Claude Code prompt — build the About page

Paste everything below the rule into Claude Code from the root of the
Gatsby repo. `design/about/` must be present.

---

## The task

Build the About page to match the approved design in `design/about/`.
Scope is this page only — do not restyle the Work page, the home page or
the project template in this pass.

## Read before writing any code

1. `design/about/Main.dc.html` — approved desktop layout (1440px)
2. `design/about/AboutMobile.dc.html` — approved mobile layout (390px)
3. `design/about/Portrait.dc.html` — the portrait treatment study.
   Treatment **B (Arch)** is the chosen one and is what the two page
   artboards use. A and C are recorded alternatives — do not build them.
4. `design/System.dc.html` — the design system this page inherits

These are Design Component files, not plain HTML. Ignore the `<x-dc>`,
`<helmet>` and `<script data-dc-script>` wrappers; everything inside
`<x-dc>` is ordinary markup with inline styles. `{{accent}}` resolves to
`#9A3412`. Copy the numeric values exactly — paddings, font sizes, line
heights, radii, gaps. Do not round them, do not snap to a 4/8px grid,
do not substitute framework defaults.

**First, check what already exists.** If the Work page build has already
run, the design tokens, the font loading, and the `Tag` / `ArrowLink`
components are in the repo — reuse them, do not duplicate or redefine
them. If it hasn't run, establish the tokens from `design/System.dc.html`
as part of this task. Tell me which situation you found before you start.

## The portrait — read this carefully

`design/about/shira-portrait-graded.jpg` is the asset to use. It is
1240px wide and already colour-graded: white point lifted, warm cast
applied, saturation pulled back 6%, and — the important part — its
seamless studio backdrop has been mapped onto `#F4F2ED`, the exact value
of the `--paper` token. That is what makes the photograph dissolve into
the page instead of sitting on it as a lighter rectangle.

Consequences you must respect:

- **Apply no colour transform of any kind.** No duotone, tint,
  grayscale, `filter`, `mix-blend-mode`, or gatsby-plugin-image colour
  option. The grade is baked into the file. Anything you add on top
  breaks the match.
- **The match is coupled to `--paper`.** If that token ever changes, the
  image has to be re-graded to the new value. Leave a comment saying so
  next to wherever the image is referenced.
- Serve it through `gatsby-plugin-image` for responsive sizes and modern
  formats — resizing and re-encoding are fine, recolouring is not.
- The arch renders around 500px wide on desktop, so the 1240px source
  gives you 2x. Do not downscale the source file in the repo.

The arch itself: a container with `overflow: hidden` and
`border-radius: 999px 999px 3px 3px`, sitting bottom-aligned on a
`--card-feature` (`#EFEAE3`) panel at 78% width and ~91% height, with the
image `object-fit: cover` and `object-position: 52% 10%`. The panel is
`3px` radius, the arch is not a separate image asset — it is a CSS mask
on a rectangular photo.

**Watch the crop at every width.** The arch curve eats the top corners,
and as the panel gets shorter on smaller screens the curve rises into the
frame. Check at 360, 390, 768, 1024 and 1440 that the top of her head is
never clipped by the curve and she stays roughly centred. `object-position`
is the lever; adjust it per breakpoint if you need to, and tell me if you
do.

## Content model

Journey entries, press items and award items must be **data, not JSX**.
Put them in content files the same way projects are sourced today — MDX
frontmatter, a JSON file in `src/content/`, or whatever this repo already
uses — and query them. I need to add and reorder entries without opening
a component.

Suggested shapes, adjust to fit the repo's conventions:

```
journey:  { start, end, title, org, description, order }
press:    { publication, title, year, url, order }
award:    { name, whatFor, year, url, order }
```

Press and awards each render three placeholder rows in the design.
Drive the count from the data — if I add a fourth, it appears; if a list
is empty, hide that whole column rather than rendering empty rows.

## Missing content stays visibly missing

I will fill in the real facts. Everything in `[BRACKETS]` in the
artboards is something that could not be verified — carry it through as
a literal bracketed placeholder, seeded into the content files so I can
find and replace it there:

- `[X YEARS]` in the intro paragraph (shown in accent colour so it is
  impossible to miss)
- Years and employers in the first three journey rows
- Every press and award row

Do not invent years, company names, publications, awards or headlines.
Do not soften a bracketed placeholder into vague prose like "several
years" — leave the bracket.

The facts that ARE real and should be typed as-is: the Innovation Design
Engineering row (2024–2026, Imperial College London × Royal College of
Art), the Forter freelance row, and the Today row.

## Components

Reuse from the Work page build where they exist. New here:

- `PortraitArch` — the panel, the arch mask, the image, the
  `object-position` handling. Takes the image and an optional focal
  point. This is the one piece of real craft on the page; build it first
  and check it at every breakpoint before moving on.
- `Button` — this page introduces a filled button, which the Work page
  system did not have. Two variants: `outline` (hairline border, dark
  label, used for Download CV) and `solid` (ink background, paper label,
  used for Contact me). 3px radius, 13px/22px padding, icon plus label
  with a 9–10px gap. Add it to the system sheet's vocabulary.
- `TimelineRow` — three columns on desktop (years / title+org /
  description), stacked on mobile, hairline between rows, no rule after
  the last one.
- `ListRow` — the press and award row: title, then meta line.

## Page composition

Masthead (About active) → hero (text left, arch right) → Journey →
Press and Awards side by side → footer.

Note the hero does **not** bleed under the masthead — the arch is a
contained shape inside the 72px page margin. If you have seen an earlier
version of this design where the photograph ran off the top edge, that
was a different treatment and has been replaced.

## Responsive

Follow `AboutMobile.dc.html` at 390px and interpolate. The hero stacks
with the arch above the text. Press and Awards stack into one column.
Timeline rows collapse to year / title / org / description stacked.
Buttons go full-width on mobile. Nothing scrolls horizontally at any
width.

## Accessibility

- The portrait gets real `alt` text — "Shira Sonigo" is the minimum;
  better is a short description. It is not decorative.
- Both buttons are real `<a>` or `<button>` elements with visible focus
  rings in the accent colour, not styled divs.
- Contrast: check `--ink-muted` on `--card-feature` and the paper label
  on the solid ink button against WCAG AA and darken the token if either
  fails.
- Heading order is a real outline: one `h1` ("About Shira"), `h2` for
  Journey / Press / Awards, `h3` for row titles.
- The journey is a list semantically (`<ol>` or `<dl>`), not a stack of
  divs.
- Honour `prefers-reduced-motion` on any hover or entrance transition.

## Working agreement

Show me the plan before you build. Order: check what the Work page build
left behind → content model and sample data → `PortraitArch` → `Button`
and the row components → page composition → responsive → accessibility.
Run the dev server and look at the page at each stage rather than at the
end. Pay particular attention to the arch crop.

When you are done, give me the list of content files and fields I need to
edit to replace every bracketed placeholder.
