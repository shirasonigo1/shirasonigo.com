# Home page redesign — build spec

Reference implementation lives beside this file:

- `home-desktop.html` — the home page at 1440px. Authoritative for structure and exact values.
- `home-mobile.html` — the same page at 390px.
- `design-system.html` — type ramp, palette, component anatomy, image slots.

Open them in a browser. Every value below is lifted from them; when this document and
the HTML disagree, **the HTML wins**.

Target: the existing Gatsby 5 site at shirasonigo.com. Keep the current routing and
page structure; this is a visual and hierarchy change to the home page, not a rebuild.

---

## Tokens

```css
:root {
  /* surfaces */
  --page:        #F7F3EC;  /* page ground */
  --panel:       #EFE9DF;  /* cards, panels */
  --panel-inset: #ECE5D9;  /* nested panel (about, right column) */
  --well:        #E4DBCC;  /* image containers */
  --chip:        #E7DDCF;  /* project tags */
  --chip-strong: #E4D9C8;  /* practice-area chips on panel-inset */
  --hairline:    #E3DACE;  /* every rule and border, always 1px */
  --hairline-2:  #DBD0BE;  /* border on image wells */
  --stroke:      #D8CCB9;  /* secondary button border */

  /* text */
  --ink:     #1A1815;  /* headings, primary buttons */
  --ink-2:   #35302A;  /* the tracked label */
  --body:    #4A443C;  /* body copy */
  --muted:   #665D50;  /* meta, eyebrows, secondary copy */
  --caption: #5C5348;  /* placeholder captions */
  --label:   #5F5648;  /* IMG NN corner labels */

  --accent:  #8F4A2A;  /* terracotta — the old #9A3412, warmed and desaturated */
}
```

Contrast: every text token above passes AA against the surface it is used on. Do not
lighten `--muted` or `--caption`; they were already darkened once for this reason.

## Type

Two families, from Google Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..500;1,6..72,300&family=Jost:wght@300;400;500&display=swap">
```

- **Newsreader** — the voice. Headings, the hero sentence, the pull quote. Always weight 300.
  Fallback: `'Iowan Old Style', Georgia, serif`.
- **Jost** — everything functional. Body, nav, buttons, chips, meta.
  Fallback: `'Avenir Next', 'Segoe UI', system-ui, sans-serif`.

| Step | Desktop | Mobile | Family | Notes |
|---|---|---|---|---|
| Hero lead | 42 / 1.28 | 26 / 1.36 | Newsreader 300 | max-width 24ch desktop. Largest type on the page. |
| Section | 46 / 1.05 | 34 / 1.06 | Newsreader 300 | |
| Project title | 30–40 / 1.1 | 27 / 1.1 | Newsreader 300 | 40 featured, 30 in the two-up |
| Body | 16 / 1.68 | 15.5 / 1.66 | Jost 400 | max-width 46ch, never wider |
| Meta | 13 / 1.5 | 13 | Jost 400 | `--muted` |
| Eyebrow | 11 / 0.22em | 11 / 0.22em | Jost 400 | uppercase |
| Label | 11.5 / 0.3em | 11 / 0.28em | Jost 400 | uppercase, `--ink-2`, hero only |

There is **no display headline**. The old "Engineer × Designer" is a small tracked label;
the opening sentence carries the page.

## Layout

- Container 1180px, gutter 40px desktop / 22px mobile.
- Section rhythm: 120px desktop / 62px mobile. The hero→work gap is 144px / 76px.
- Radii: 16 panel, 14 large panel, 10 image well, 999 buttons and chips.
- Borders: 1px, `--hairline`. Never heavier, never a shadow.
- Use flex/grid with `gap`. No margin-based spacing between siblings.
- Minimum tap target 44px. Mobile buttons are 52px tall.

## Page structure

1. **Nav** — wordmark left ("Shira Sonigo", Newsreader 23px), links right: Work, About, CV,
   Contact. Current page underlined 1px in `--accent`. Mobile: wordmark + 46px hamburger.
2. **Hero** — single column. Rule + tracked label, the 42px sentence, a muted 16px
   paragraph, then two buttons: "View my work" (solid `--ink` pill) and "Download CV"
   (outlined pill with a download glyph). No portrait.
3. **Selected work** — header row (eyebrow + two-line section heading, "All projects →"
   right-aligned) over a hairline. Then:
   - **Featured card**: panel, 26px padding, image well left (4:3) / text right at
     1.25fr–1fr, 52px gap. Meta row → title → description → tag chips → "View project →".
   - **Two-up row**: two panels, 22px padding, image well on top (3:2), same text order.
   - Mobile stacks all three, then a full-width outlined "All projects →" button.
4. **About strip** — one panel, two columns. Left: "A short introduction" + three
   paragraphs + "More about me →". Right (on `--panel-inset`, separated by a 1px border):
   "What I work on" eyebrow, seven practice chips, a hairline, then the pull quote in
   italic Newsreader 22px. Mobile collapses to one column.
5. **Contact** — centred. Rule–eyebrow–rule, 60px section heading, muted line, solid pill
   with the email address.
6. **Footer** — hairline, then copyright left / nav links + three social icons right.
   Mobile centres the links above the icons.

## Images

All imagery is a labelled placeholder. Replace each with real photography; keep the
aspect ratio so nothing reflows.

| Slot | Where | Ratio | Suggested |
|---|---|---|---|
| IMG 01 | The Inner Shoe — featured card | 4:3 | ~1600×1200 |
| IMG 02 | GrazeIQ — two-up left | 3:2 | ~1400×933 |
| IMG 03 | FlatPack — two-up right | 3:2 | ~1400×933 |

Placeholder anatomy, if you need to keep one while building: `--well` background,
1px `--hairline-2` border, 10px radius, a corner "IMG NN" label in `--label`, and a
centred stroke icon + caption in `--caption`.

## Copy status

Verbatim from the current site, safe to ship: the hero sentences, the About paragraphs,
the pull quote, and The Inner Shoe's description and tags.

**Not confirmed — bracketed in the HTML, do not ship as-is:**

- GrazeIQ: description, year, category, tags
- FlatPack: description, year, category, tags
- The contact email address
- Footer year

## Icons

All icons are inline SVG on a 24px viewBox, `fill="none"`, `stroke="currentColor"`,
`stroke-width` 1.2–1.5, round caps and joins. No emoji, no icon font. Copy them from the
reference HTML rather than substituting a library.

## Out of scope

The About, Projects, CV and Contact pages are unchanged. The nav links to them as they
are today.
