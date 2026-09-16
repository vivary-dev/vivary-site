# Prompt for Claude Design

Paste everything below the line into Claude Design. The links point at the
`docs/brand-brief` branch of `vivary-dev/vivary-site` and at public files in
`vivary-dev/vivary`. Links into private repositories only open for a signed in
member of `vivary-dev`. If the design agent cannot fetch a private link, paste
that file's contents into the conversation instead. The two that matter most
are `01-what-vivary-is.md` and `05-zo-asset-brief.md`.

---

You are designing the brand identity for Vivary, a desktop application that is
about to replace an earlier command line product of the same name. Read the
linked documents before proposing anything. They are the source of truth. Do
not invent product features, and do not use anything from the old product's
visual identity unless a document says to keep it.

## What Vivary is

Vivary is a desktop workspace where your agents work from files you own. One
window holds every project: code, research, writing, second brains, knowledge
bases. It runs the coding agents the user already pays for, such as Claude
Code and Codex, on the user's own machine with the user's own keys. There is no
Vivary account and no cloud control plane. Plans, memory, decisions, and
results are plain files the user can open with any editor. Before the agent
works, Vivary hands it a bounded capsule of the files that matter. After, it
leaves a receipt: what it saw, what it changed, what it left alone. The
product's claim is: it knows you because you wrote it down.

The name comes from vivarium, an old word for a small self-contained world
where living things are kept in stacked layers. The engine underneath has four
layers named for the sky: tropo, strato, ozone, exo.

Audience: professionals doing coding, research, writing, and second-brain
work. Assume they can install software and message an agent, not that they
program. The product is for doing real work, not for learning. Language is
direct and respectful. No marketing adjectives, no "AI magic."

Status: in development, Windows first, not released. Nothing you make may
imply a download, a release date, or a price.

## Read these first

Product definition, vocabulary, audience, status, and every tagline in play:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/01-what-vivary-is.md

The asset brief with the four open decisions, the idea the mark must carry,
and one spec per deliverable:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/05-zo-asset-brief.md

Inventory of everything that exists today, with keep or retire verdicts:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/03-asset-inventory.md

The locked home page this brand must sit on, written out in full: how it
was chosen from nine candidates, the palette, the three typefaces and their
jobs, the layout grid, every section, and every animation with its exact
timings and easing. Read this before looking at the code:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/07-site-design-and-motion.md

The code that document describes. Palette and type reference: warm black
`#080705`, off-white `#ebe5d8`, amber `#e9a23b` reserved for what the
workspace recorded, Big Shoulders for headlines, Fraunces italic where a file
speaks, Geist Mono for the record:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/src/app/home.css
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/src/app/page.tsx
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/src/app/scenes.tsx

The nine candidate pages the home page was chosen from, as code:
https://github.com/vivary-dev/vivary-site/tree/feat/landing-candidates/src/app/candidates

The only source of product claims, with citations:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/src/content/facts.ts

The rules for the site, including the design bar and the voice:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/AGENTS.md

## Context on the old product and the app interior

The public engine repository and its plain-language concepts page. This is
the product being retired as the product and kept as the engine:
https://github.com/vivary-dev/vivary
https://github.com/vivary-dev/vivary/blob/dev/docs/CONCEPTS.md
https://github.com/vivary-dev/vivary/blob/dev/docs/ARCHITECTURE.md

The live site of the old product. Its identity, mint on navy with
Bricolage Grotesque, is being replaced. Look at it to know what not to repeat:
https://vivary.vercel.app/

The only logo that exists, a 256 pixel PNG. A mint dome in cross-section with
four wavy strata bands and a small door. It is the one mark that comes from
the name. Decide whether to redraw it as a vector or replace it:
https://github.com/vivary-dev/vivary/blob/dev/site/public/media/vivary-mark.png

The old hero image, to understand the layers-and-gate metaphor. Not for reuse:
https://github.com/vivary-dev/vivary/blob/dev/site/public/media/hero-living-strata.webp

The current GitHub organization hero, which is stale and will be replaced:
https://github.com/vivary-dev/.github/blob/main/profile/assets/vivary-hero.svg

The app's own interior design rules. Private. The app runs green-black
`#0C100E` with a lime `#B8F263` primary and Inter, and the mark must work
there too:
https://github.com/vivary-dev/Vivary-New/blob/dev/packages/workbench/DESIGN.md
https://github.com/vivary-dev/Vivary-New/blob/dev/README.md

## What to deliver

1. Three directions for the primary mark, each as a single-color vector on a
   square canvas. One that redraws the dome. Two that start from the idea of
   a contained world with layers, a gate, and a written record. None may use
   a chat bubble, sparkle, robot, brain, network graph, or generic AI glyph.
   Show each at 16, 32, and 256 pixels, on `#080705` in `#ebe5d8`, on
   `#0C100E` in `#B8F263`, and inverted on white.
2. A wordmark for "Vivary" in Big Shoulders, weight 700 to 800, and a
   horizontal and stacked lockup with your recommended mark.
3. A palette recommendation that reconciles the site's warm black and amber
   with the app's green-black and lime, or an argument for keeping them
   separate with one shared neutral. Hex values, roles, and contrast checks.
4. A desktop application icon for Windows, the mark on a rounded tile, at
   1024 with a note on how it reads at 16 and 32.
5. A 1200 by 630 social preview card: lockup, one tagline, nothing else.
6. A one-page brand sheet: the mark, the lockups, the palette, the type roles,
   clear space, and the things not to do.

Two taglines are in play. Show the lockup and the social card with each:
"Your projects. Your agents. Your machine." and "It knows you. Because you
wrote it down." Recommend one.

Constraints on the marketing site: no stock photography, no gradient blobs,
no glow. Dithered, line-art, and flat treatments fit. One primary call to
action per page. Responsive to 360 pixels. Contrast must pass.

Explain each direction in a few plain sentences: what it says, why it fits the
name and the product, and where it fails. Then recommend one.
