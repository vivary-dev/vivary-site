# Prompt for Claude Design

Paste everything below the line into Claude Design. Links into
`vivary-dev/vivary-site` and `vivary-dev/Vivary-New` are private and open only
for a signed-in member of `vivary-dev`. If the design agent cannot fetch a
link, paste that file's contents. The two that matter most are
`01-what-vivary-is.md` and `05-zo-asset-brief.md`. The product guide is one
HTML file that GitHub will not render in the browser. Download it and open it
locally, or attach it to the conversation.

---

You are designing the brand identity for Vivary, a desktop application in
development. Read the linked documents before proposing anything. They are the
source of truth. Do not invent product features.

## What Vivary is

A workspace for working with agents on your own projects. Vivary brings agent
chat, project files, tools, and memory into one desktop app. One window holds
every project: code, research, writing, second brains, knowledge bases. Select
a project, then continue one of its conversations or start another. Each
conversation has its own history and its own bounded context. It runs the
coding agents the user already pays for, such as Claude Code and Codex, on the
user's own machine with the user's own keys. There is no Vivary account and no
cloud control plane. Plans, memory, decisions, and results are plain files the
user can open with any editor. Before the agent works, Vivary hands it a
bounded capsule of the files that matter. After, it leaves a receipt: what it
saw, what it changed, what it left alone. The product's claim is: it knows you
because you wrote it down.

The name comes from vivarium, an old word for a small self-contained world
where living things are kept in stacked layers. The workspace commands inside
the app are named for layers of the sky: tropo, strato, ozone, exo.

Audience: professionals doing coding, research, writing, and second-brain
work. Assume they can install software and message an agent, not that they
program. The product is for doing real work, not for learning. Language is
direct and respectful. No marketing adjectives, no "AI magic."

Status: in development, Windows first, not released. Nothing you make may
imply a download, a release date, or a price.

## The product documentation

The guide. One offline HTML file with a six-step walkthrough, the map of the
sixteen parts, every user action, and the accepted decisions. This is the
document that says what Vivary is:
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/specification/guide.html

The plain-language source the guide renders, as JSON:
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/specification/guide-content.json

The specification overview, the system diagrams, and the sixteen parts:
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/specification/README.md
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/specification/system.md
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/specification/modules.md

The workspace interface contract and the shared vocabulary:
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/unified-workspace.md
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/CONTEXT.md

Product direction, what exists and what is missing, and the acceptance
register:
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/design.md
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/desktop-release.md
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/desktop-acceptance-status.md

The README and the app's interior design rules. The app runs green-black
`#0C100E` with a lime `#B8F263` primary and Inter, and the mark must work
there:
https://github.com/vivary-dev/Vivary-New/blob/dev/README.md
https://github.com/vivary-dev/Vivary-New/blob/dev/packages/workbench/DESIGN.md

## The brand working set

The one-page product description written for search engines and agents.
Read this first if you read nothing else:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/08-llms-txt.md

A condensed account of the product for this work, with vocabulary, accepted
decisions, status, and every tagline in play:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/01-what-vivary-is.md

The asset brief: the four open decisions, the idea the mark must carry, and
one spec per deliverable:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/05-zo-asset-brief.md

Inventory of the visual assets that exist today, with keep or retire
verdicts:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/03-asset-inventory.md

The locked home page this brand must sit on, written out in full: how it was
chosen from nine candidates, the palette, the three typefaces and their jobs,
the layout grid, every section, and every animation with its exact timings
and easing. Read this before looking at the code:
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

The only source of product claims on the site, with citations:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/src/content/facts.ts

The rules for the site, including the design bar and the voice:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/AGENTS.md

## Existing marks

One mark exists, a 256 pixel PNG: a mint dome in cross-section with four wavy
strata bands and a small door. It is the one mark that comes from the name.
Decide whether to redraw it as a vector or replace it:
https://github.com/vivary-dev/vivary/blob/dev/site/public/media/vivary-mark.png

The site currently at vivary.vercel.app is being replaced, along with its
mint-on-navy identity and its Bricolage Grotesque type. Do not draw from it.
The current GitHub organization hero is also being replaced:
https://github.com/vivary-dev/.github/blob/main/profile/assets/vivary-hero.svg

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
