# Writing a project

This is the reference for the case-study format — read this before
`sample-project/sample-project.mdx`, which is a complete worked example using
every block described here. If you've forgotten all of this in six months,
start with the worked example, then come back here for anything it doesn't
explain.

A project is one MDX file: **frontmatter for the fixed furniture** (title,
hero, role, tags, the chapter list...), **body for the composed narrative**
(the actual chapters, built from the block components below). No two
projects have to use the same blocks or the same number of chapters.

## Frontmatter reference

Only `title`, `slug`, `year` and `standfirst` are required. Everything else
is optional — omit a field and the template hides that block, it never
renders an empty shell.

```yaml
title: "Project Name"
slug: "project-name"                # becomes /projects/project-name
year: "2025"
discipline: "Product Design"
standfirst: "The one-sentence version — what it is and who it is for."
tags: ["Inclusive Design", "Research", "Prototyping"]

role: "Design and engineering"
timeline: "Jan–Jun 2025"
team: "Solo"                         # or names
context: "MA thesis, Imperial College London × RCA"

hero:
  image: "./images/hero.jpg"         # relative to this file's own folder
  alt: "..."
  caption: "..."                     # optional

overview:                            # the "Overview" section, just below the hero
  lede: "The problem in two lines."
  body:
    - "A paragraph or two of context — who this affects, why it matters."
    - "One sentence naming what you actually made."

glance:                              # the "At a glance" panel beside Overview; omit to hide it
  - label: "Outcome"
    value: "..."
  - label: "Methods"
    value: "..."

chapters:                            # drives the sticky rail — see "Chapters" below
  - { id: "research", number: "01", title: "Research" }
  - { id: "development", number: "02", title: "Development" }
  - { id: "delivery", number: "03", title: "Delivery" }

card:                                # what the Work page grid will render (once it's wired up — see note below)
  summary: "..."
  image: "./images/card.jpg"
  featured: false
  order: 3

next: "the-inner-shoe"               # optional; otherwise the next project by card.order
draft: true                          # keeps a file out of the Work page and the sitemap entirely
```

**Note on `card`:** this pass only built the project template itself, not
the Work page grid — `card` is queryable and used for `next`-project
ordering, but the Work page listing (`src/pages/projects/index.js`) still
reads the old flat fields (`hero_image`, `standfirst`, `category`,
`featured`) for now. When you migrate a real project to this format and want
it live on the Work page, keep those old fields set alongside the new ones
until that page gets its own pass.

**Why `overview` is frontmatter, not body:** everything else in the body is
"composed narrative" because chapters genuinely vary — a materials project
and a software project don't share a shape. Overview doesn't vary: every
project gets one lede line and a short paragraph or two, in the same spot,
next to the same glance panel. That's fixed furniture, same as the header.

## Chapters

```mdx
<Chapter id="research" lead="What I needed to find out, and who I went to.">

Ordinary markdown paragraphs here.

</Chapter>
```

The `id` in the body must match an `id` in `frontmatter.chapters` — that's
what supplies the chapter's number and title (so you never repeat them in
the body), and it's what the sticky rail is built from. **If they drift —
a chapter in frontmatter with no matching `<Chapter id>` in the body, or the
reverse — the build fails with a clear message telling you exactly which id
is missing on which side.** This is enforced in `gatsby-node.js`, not left
to chance.

The rail is entirely generated from however many chapters you actually
write — two, five, whatever — never hardcoded to three.

## Blocks

Every block below is registered globally; never import one in a project
file. All the numeric examples ("~300 characters") are guides, not limits.

**`Figure`** — the workhorse image.
```mdx
<Figure src="./images/detail.jpg" alt="A close, unglamorous shot of the seam" caption="What's happening in the photo — not what it looks like." />
```
Add `bleed` to break it out to the page margin instead of stopping at the
680px content column — use it once per chapter at most, for the one image
that should read as bigger than everything around it. `ratio`/`dimensions`
are only used for the placeholder label when the file can't be found (a
typo'd path, or an image you haven't added yet) — they don't affect a real
image's rendering. **`alt` is required.** The build warns (doesn't fail) if
it's missing or empty on a real `<Figure>` tag.

**`FigurePair`** / **`FigureGrid`** — two, or 2–4, `<Figure>`s together,
sharing one `<Caption>` after the group instead of one each:
```mdx
<FigurePair>
  <Figure src="./images/r1.jpg" alt="..." />
  <Figure src="./images/r2.jpg" alt="..." />
</FigurePair>
<Caption>One caption for the pair.</Caption>

<FigureGrid cols={3}>
  <Figure src="./images/d1.jpg" alt="..." />
  <Figure src="./images/d2.jpg" alt="..." />
  <Figure src="./images/d3.jpg" alt="..." />
</FigureGrid>
```

**`Insights`** / **`Insight`** — two or three findings, numbered
automatically:
```mdx
<Insights>
  <Insight title="The finding, in six or seven words">
    One or two sentences of evidence.
  </Insight>
</Insights>
```

**`PullQuote`** — someone else's voice. One per chapter at most.
```mdx
<PullQuote attribution="Participant" context="Home visit">
  The line that changed how you saw the problem.
</PullQuote>
```

**`Iteration`** — one row of a development sequence. Wrap a run of them in a
plain `<ol>` (that's what makes the sequence a real ordered list — every
`<ol>` inside a chapter is styled for exactly this):
```mdx
<ol>
  <Iteration
    n="01"
    image="./images/proto-v1.jpg"
    imageAlt="..."
    changed="What this version tried."
    learned="What broke, what surprised you, what carried into the next round."
  />
</ol>
```

**`MethodList`** / **`Method`** — the steps you actually took, named and
numbered automatically:
```mdx
<MethodList>
  <Method title="Contextual interviews">Eight sessions, three cities.</Method>
</MethodList>
```

**`Media`** — video, with a poster frame, never autoplaying:
```mdx
<Media src="./video/demo.mp4" poster="./images/poster.jpg" alt="..." caption="..." />
```
Leave off `src` while a video isn't ready yet — it'll show the poster (or a
placeholder) with a play glyph instead of a broken player.

**`SidePanel`** — facts a reader might scan for instead of reading (also
good for a materials or spec list, used standalone in a chapter):
```mdx
<SidePanel
  title="Materials"
  items={[{ label: 'Body', value: '3D-printed PETG' }]}
/>
```

**`Closing`** — the Outcome / "what I'd do next" pair, once, near the end:
```mdx
<Closing
  outcome="What changed as a result. Quote a real number if you have one — don't invent one if you don't."
  whatNext="The honest reflection. What's unresolved, what you'd test with more time."
/>
```

## The two rules

- **Body text stops at 680px however wide the page gets.** Plain paragraphs
  already do this automatically — don't fight it with inline styles.
- **Every image earns a caption that says something the photograph doesn't.**
  If you can't write one, the image probably isn't needed.

## Migrating an old project to this format

The five projects that predate this format (`TheInnerShoe`, `HMS-time`,
`neves-labs`, `epistles-of-emotion`, `timeless-mastery`) keep rendering as-is
— no chapters, no blocks — through a fallback that reuses the warm-editorial
header/hero styling with their existing `sliders`/`## Slider N`/
`videoSrcURL`/`GithubLink` content untouched. To move one onto the new
format:

1. Add `discipline`, `standfirst` (required — pick the header tagline),
   `role`, `timeline`, `team`, `context` to frontmatter.
2. Replace `hero_image`/`hero_image_alt` with a `hero: { image, alt,
   caption }` block (same image, nested).
3. Add an `overview: { lede, body }` block — the two-line problem statement
   that currently doesn't exist anywhere in the old format.
4. Decide the chapters (2–5 is typical) and add `chapters: [{ id, number,
   title }, ...]`.
5. Rewrite the body: replace the `## Slider N` headings and prose with
   `<Chapter>` blocks built from the components above. This is the real
   work — it's a rewrite of the narrative structure, not a find-and-replace.
6. Once a project has `chapters`, the template stops using the fallback
   automatically — no flag to flip.
7. If the project used `videoSrcURL`, migrate those to `<Media>` blocks
   inside the relevant chapter instead.
