# Claude Code prompt — build the project case study template

Paste everything below the rule into Claude Code from the root of the
Gatsby repo. `design/project/` must be present.

---

## The task

Build the individual project (case study) template to match the approved
design in `design/project/`, and give me a content format I can keep
writing into for years. Two deliverables: the working template, and a
complete demo MDX file that exercises every block so I have a worked
example to copy.

Scope is the project template only. Do not restyle the Work page, the
About page or the home page in this pass.

## Read before writing any code

1. `design/project/Main.dc.html` — approved desktop layout (1440px)
2. `design/project/ProjectMobile.dc.html` — approved mobile layout (390px)
3. `design/project/Blocks.dc.html` — the block library and the rules at
   the bottom of it
4. `design/System.dc.html` — the design system this page inherits

These are Design Component files. Ignore the `<x-dc>`, `<helmet>` and
`<script data-dc-script>` wrappers; everything inside `<x-dc>` is ordinary
markup with inline styles. `{{accent}}` resolves to `#9A3412`. Copy the
numeric values exactly — do not round them or snap to a grid.

Then explore the repo before proposing anything: how projects are sourced
today, the existing project detail template and its route shape, how
images are handled, and what the Work page / About page builds already
left behind in the way of tokens and components. Reuse those; do not
redefine them. Report what you found before you start.

## The content format — this is the heart of the task

The design must be **composed**, not hardcoded. Different projects need
different arrangements: a materials project leans on image grids, a
software project on iteration rows, a research project on quotes and
method lists. I need to write each one differently without touching a
component.

Use MDX: **frontmatter for the fixed furniture, body for the composed
narrative.**

### Frontmatter — the parts every project has

```yaml
title: "Project Name"
slug: "project-name"
year: 2025
discipline: "Product Design"
standfirst: "The one-sentence version — what it is and who it is for."
tags: ["Inclusive Design", "Research", "Prototyping"]

role: "Design and engineering"
timeline: "Jan–Jun 2025"
team: "Solo"          # or names
context: "MA thesis, Imperial College London × RCA"

hero:
  image: "./images/hero.jpg"
  alt: "..."
  caption: "..."       # optional

glance:                # renders the At a glance panel; omit to hide it
  - label: "Outcome"
    value: "..."
  - label: "Methods"
    value: "..."

chapters:              # drives the sticky rail — see below
  - { id: "research",    number: "01", title: "Research" }
  - { id: "development", number: "02", title: "Development" }
  - { id: "delivery",    number: "03", title: "Delivery" }

card:                  # what the Work page grid renders
  summary: "..."
  image: "./images/card.jpg"
  featured: false
  order: 3

next: "the-inner-shoe" # optional; otherwise derive from order
```

Every field except `title`, `slug`, `year` and `standfirst` must be
optional, with the template hiding the corresponding block when absent
rather than rendering an empty shell.

### Body — the composed narrative

The body is MDX using block components. Prose is plain markdown between
them, so I write naturally.

```mdx
<Chapter id="research" lead="What I needed to find out, and who I went to.">

Ordinary markdown paragraphs here.

<FigurePair>
  <Figure src="./images/r1.jpg" alt="..." />
  <Figure src="./images/r2.jpg" alt="..." />
</FigurePair>
<Caption>What is happening in these photographs.</Caption>

<Insights>
  <Insight title="The finding, in six or seven words">
    One or two sentences of evidence.
  </Insight>
</Insights>

<PullQuote attribution="Participant" context="Home visit">
  The line that changed how I saw the problem.
</PullQuote>

</Chapter>
```

Build these components, matching `Blocks.dc.html`:

`Chapter` · `Figure` · `FigurePair` · `FigureGrid` (cols 2–4) ·
`Caption` · `Insights` / `Insight` · `PullQuote` · `Iteration` ·
`MethodList` / `Method` · `Media` (video with poster) ·
`SidePanel` · `Closing` (the Outcome / What I'd do next pair)

`Iteration` takes `n`, an image, and two named slots — *what changed* and
*what it taught us*. Support both prop form and children form, whichever
reads better in the MDX; pick one and use it consistently.

Register these globally via `MDXProvider` so I never have to import them
at the top of a project file.

### The sticky rail must be dynamic

The rail is generated from the chapters that exist in the file — not
hardcoded to three. A project with two chapters shows two; one with five
shows five, and the labels come from the content.

Prefer extracting the chapters from the MDX AST in `gatsby-node.js` so
there is one source of truth. If that turns out to be awkward, fall back
to the `chapters` frontmatter array above — but then add a build-time
check that every `chapters[].id` has a matching `<Chapter id>` in the
body and fail the build with a clear message if they drift. Do not leave
the two able to disagree silently.

Scroll behaviour: `IntersectionObserver` marks the active chapter,
`aria-current="true"` on it, clicking scrolls to that chapter, and the
whole thing respects `prefers-reduced-motion`. On mobile the rail becomes
the sticky horizontal strip shown in `ProjectMobile.dc.html`.

## The demo MDX file

Create a complete, working example project — call it something obviously
fake like `sample-project` — that:

- uses **every** block component at least once, arranged the way the
  desktop artboard arranges them
- has realistic-length placeholder copy, not lorem ipsum. Match the
  lengths indicated by the bracketed text in the artboards — that text
  says what belongs there and roughly how long it should run
- keeps `[BRACKETS]` around anything that would be a real fact (years,
  names, metrics) so it is obviously not a real project
- ships with placeholder images at the right ratios, or renders the
  labelled `ImageWell` where an image is missing
- is excluded from the Work page listing and from the sitemap — it is a
  reference file, not a published project. A `draft: true` flag or an
  ignore rule, whichever fits the repo.

Alongside it, write `AUTHORING.md` in the content folder: the frontmatter
reference, one example of each block, and the two rules from the block
library — body text stops at 680px, and every image earns a caption that
says something the photograph doesn't. I will be reading this in six
months having forgotten all of it.

## Do not break the existing projects

The five projects in the repo are in the old format. I will migrate them
myself, one at a time, after this lands.

Until then the template must render them without crashing: detect a file
with no `chapters` and no block components, and fall back to rendering
the header, the hero and the body prose in the new styling. A missing
`glance`, `next` or `hero` must not throw. Tell me plainly which of the
five render acceptably under the fallback and which look wrong.

Do not rewrite my existing project content. Do not invent years, metrics,
collaborator names or outcomes anywhere.

## Layout specifics

- Content column: rail 170px, gap 96px, content fills the rest inside the
  72px page margin
- Body text measure caps at 680px however wide the viewport gets
- Images may fill the content column, or break out to the page margin for
  a deliberate full-bleed moment — build a `bleed` variant on `Figure`
- Chapter headers: number and title on a baseline, hairline rule under,
  96px of air before the next chapter
- No shadows. Depth is tone plus the 1px hairline.

## Accessibility

- The rail is a `<nav>` with an accessible name, and a skip link past it
- Headings are a real outline: `h1` project title, `h2` chapter titles,
  `h3` insight and iteration titles
- Images use `<figure>` / `<figcaption>`; `alt` is required on `Figure`
  and the build should warn when it is missing or empty on a
  content-bearing image
- The iteration sequence is an ordered list semantically
- `Media` never autoplays with sound and always has a poster frame
- Check `--ink-muted` on `--card` for WCAG AA at the caption size and
  darken the token if it fails

## Working agreement

Show me the plan before you build. Order: explore and report → frontmatter
schema and the GraphQL/`gatsby-node` wiring → block components → the
chapter rail → page composition → the demo MDX and `AUTHORING.md` →
responsive → accessibility → check the five existing projects under the
fallback. Run the dev server and look at the page at each stage.

When you are done, tell me exactly what I need to add to a project's
frontmatter and body to move it from the old format to the new one.
