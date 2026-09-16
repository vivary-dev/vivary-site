# Brief for generating Vivary brand assets with Zo

Zo was not reachable from the session that wrote this (its MCP connection
failed and its claude.ai connector was unauthorized). This brief is written so
it can be handed to Zo as is, or run step by step in a Zo session. `AGENTS.md`
notes that Zo's provider-backed image generation was down on 2026-09-13, so
some items may need another generator, with the result checked into `public/`.

## Decisions to make before generating anything

Jeff owns these. Each one changes the output.

1. **One tagline.** Candidates in `01-what-vivary-is.md`. The two current
   front-runners: "Your projects. Your agents. Your machine." (Vivary-New
   README) and "It knows you. Because you wrote it down." (this site's
   headline). A tagline and a headline can differ. A logo lockup needs the
   short one.
2. **One palette for the brand.** The locked home page is warm black, off-white,
   and amber. The app is green-black and lime. A logo must survive both. The
   simplest resolution: the mark is single-color, drawn for off-white on dark
   and dark on light, and takes the accent of whatever surface it sits on.
3. **One type family for the wordmark.** Big Shoulders is the site's display
   face and is free (OFL). Inter carries the app. A wordmark set once in Big
   Shoulders and exported as paths would end the question.
4. **Keep or drop the dome.** The shipped mark is a mint dome with strata bands
   and a door: a vivarium in cross-section with a gate. It is the only mark that
   comes from the name. The question is whether to redraw it or start over.
5. **Company attribution.** Whether "A flagship from The Little AI Company"
   appears on the new site.

## The idea the mark should carry

From the name and the product. A vivary is a small self-contained world in
stacked layers. The product's promise is that the agent works from files you
own and leaves a record you can read. So the mark should say: a contained
world, layers, a gate or door, and a written record. Not: a chat bubble, a
sparkle, a robot, a brain, a network graph, or a generic "AI" glyph.

The old sparkle favicon and the org hero's diamond-and-crosshair are the
things to avoid.

## Asset list

Each item lists the deliverable, the constraints, and a prompt to start from.
Prompts are written for an image model. Adjust the palette line once decision 2
is made.

### 1. Primary mark

- Deliverable: SVG, single color, on a square canvas. Also PNG at 512, 256,
  128, 64, 32, 16.
- Constraints: readable at 16 pixels. No gradients. No text. Works on `#080705`
  in `#ebe5d8` and on `#0C100E` in `#EDF4EF`, and inverted on white.
- Prompt: "A minimal flat vector logo mark for a software product called
  Vivary. A small dome-shaped terrarium seen in cross-section, made of four
  horizontal wavy layers stacked from top to bottom, with a small arched
  doorway at the bottom center. Single color, off-white on a near-black
  background. Geometric, even stroke weights, no gradients, no shading, no
  text, no sparkles. Centered, generous margin, legible as a favicon."

### 2. Wordmark and lockup

- Deliverable: SVG with text converted to outlines. Horizontal lockup (mark
  left, word right) and stacked lockup (mark above the word). Dark and light
  versions.
- Constraints: the word "Vivary" in Big Shoulders at weight 700 to 800,
  optical size 72, tight tracking, or in the face chosen under decision 3.
  Clear space equal to the mark's height on all sides.
- This is better produced from the mark SVG and the font file than by an image
  model. Zo can render it with a small script or in a design tool.

### 3. Desktop application icon

- Deliverable: `Vivary.ico` with 16, 24, 32, 48, 64, 128, 256 layers.
  `Vivary.icns` for the later macOS build. A 1024 PNG source.
- Constraints: the mark on a rounded-square tile. Windows shows icons on both
  light and dark taskbars, so the tile needs its own background. Use the app's
  `#0C100E` tile with the mark in `#B8F263`, or the mark in off-white, per
  decision 2.
- Destination: Vivary-New `packages/desktop/`. This is the one asset the app
  cannot ship without.

### 4. Social preview image

- Deliverable: 1200x630 PNG for Open Graph and Twitter cards. One for the site
  root. Optionally one template for blog posts.
- Constraints: lockup, tagline, nothing else. Dark ground from the site
  palette. Text large enough to read in a feed thumbnail. No screenshots until
  the app has a public build.
- Prompt: "A 1200 by 630 social preview card on a near-black warm background
  `#080705`. Left aligned: the Vivary mark and the word Vivary in a condensed
  heavy sans-serif in off-white `#ebe5d8`, and one line of text below in the
  same off-white: '[tagline]'. A thin amber `#e9a23b` rule under the text.
  Nothing else. Flat, no gradients, no illustration."

### 5. GitHub org profile hero

- Deliverable: 1280x640 SVG or PNG replacing
  `vivary-dev/.github/profile/assets/vivary-hero.svg`.
- Constraints: same composition as the social image, plus one line naming the
  two surfaces: the desktop app in development and the engine that ships. No
  package chips, they go stale.

### 6. README header

- Deliverable: a static SVG or PNG for the top of the Vivary-New and vivary
  READMEs, replacing the shieldcn-generated glow header.
- Constraints: 1100 wide. Lockup and tagline. Same palette as 4.

### 7. Home page hero imagery

- Deliverable: one strong image for the hero, checked into `public/`, in WebP
  and a PNG fallback, at 2x for a 1440 layout.
- Constraints: `AGENTS.md` bars stock photos and gradient blobs. The locked page
  already has a coded memory scene beside the headline. If an image replaces
  or joins it, it must read as something the workspace recorded: a file, a
  ledger, a receipt. Warm black ground, off-white marks, amber only for the
  recorded thing. Dithered or line-art treatment fits the Dither Kit style
  already on the page.
- Prompt: "A dark, quiet editorial illustration. On a near-black warm ground,
  a single sheet of plain text seen at an angle, its lines rendered as thin
  off-white strokes, one line highlighted in amber. Around it, faint outlines
  of a folder and a small arched doorway. Dithered halftone texture, no
  gradients, no glow, no people, no robots, no screens, no chat bubbles."

### 8. Section objects

- Deliverable: a small set of line icons or dithered objects in one style:
  folder, file, receipt, door or gate, layers. SVG.
- Constraints: `AGENTS.md` says one icon collection per surface. The page
  already uses two Lucide icons from icons0. Generated objects should match
  Lucide's stroke weight or replace both Lucide icons so the surface stays on
  one style.

### 9. Harness marks

- Not generated. Claude Code, Codex, and OpenCode marks for the model picker
  come from their owners' brand pages under their rules. Record the source and
  license for each in the app repo.

## Order of work

1. Decisions 1 to 4.
2. Mark (item 1), then wordmark (2), then app icon (3). Everything else
   derives from these.
3. Social image (4), org hero (5), README header (6) in one pass, since they
   share a composition.
4. Hero imagery (7) and section objects (8) against the live page, with the
   screenshot loop in `AGENTS.md`: look, name what is weak, fix, re-render.

## Where each asset lands

| Asset | Repo and path |
| --- | --- |
| Mark, wordmark, lockups, social image | `vivary-dev/vivary-site` `public/brand/` and `src/app/` for favicon and OG metadata |
| App icon | `vivary-dev/Vivary-New` `packages/desktop/` |
| Org hero | `vivary-dev/.github` `profile/assets/` |
| README headers | each repo's README |
| Source files and the brand rules | a `docs/brand/` folder here, or a public `vivary-dev/brand` repo modeled on the archived `wazootech/brand` layout: `assets/dark`, `assets/light`, `assets/common`, `colors.md`, `typography.md` |
