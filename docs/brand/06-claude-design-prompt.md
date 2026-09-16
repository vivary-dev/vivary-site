# Prompt for Claude Design

Paste everything below the line into Claude Design. Attach the images in
`docs/brand/images/` directly to the conversation as well, in case the agent
cannot open private GitHub links. Links into `vivary-dev/vivary-site` and
`vivary-dev/Vivary-New` open only for a signed-in member of `vivary-dev`. The
product guide is one HTML file that GitHub will not render in the browser;
download it and open it locally, or attach it.

This prompt deliberately contains no link to the site being replaced, its
mark, or its imagery. A previous run of the design agent studied those and
produced their identity again. If it asks about "the old Vivary design," the
answer is that there is none to use.

---

You are designing the brand identity for Vivary, a desktop application in
development. The visual direction already exists and is locked. Look at the
images first. Then read the documents. Do not invent product features. Do not
search the web for Vivary; anything you find there is the site being replaced
and must not influence this work.

## Look at these first

The locked home page, desktop 1440x900. This is the brand as it exists: warm
black, off-white, amber only for what the workspace recorded, a condensed
display face for the claim, a serif italic where the memory file speaks,
monospace for everything else:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/images/locked-home-hero.png

The full page, top to bottom:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/images/locked-home-full.png

The same page at a real 390 pixel phone width:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/images/locked-home-mobile.png

The brand reference sheet: both palettes with hex values, the three typefaces
in their roles, and what not to do:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/images/brand-sheet.png

Components of the page, cropped. The memory scene, the receipt ledger, the
drawn app window, the file that grows, and the commands section:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/images/component-memory-scene.png
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/images/section-receipt.png
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/images/component-app-window.png
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/images/section-file-grows.png
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/images/section-commands.png

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

## The visual system you are extending

Palette, from the locked page:

| Token | Hex | Job |
| --- | --- | --- |
| ground | `#080705` | Page background. Warm black. |
| pane | `#0e0c09` | Panels. |
| rule | `#2a2419` | Borders. |
| text | `#ebe5d8` | Human words. Off-white. |
| text-2 | `#a69d8d` | Secondary. |
| text-3 | `#837c6f` | Captions. |
| amber | `#e9a23b` | Only for what the workspace recorded. Never decorative. |

There is no other color on the page. The mark must also sit inside the app,
which runs green-black `#0C100E` with off-white `#EDF4EF` text and a lime
`#B8F263` primary action, set in Inter.

Type: Big Shoulders 800 for the claim and the brand word. Fraunces italic
only where the memory file speaks. Geist Mono for the record: body, ledgers,
nav, buttons, code.

Tone: quiet, recorded, plain. A ledger of keys and values. A file read back.
No gradients, no glow, no blobs, no stock photography, no sparkles, no
network-graph glyphs, no robots, no chat bubbles.

## Read these

The full account of the locked page: how it was chosen from nine candidates,
every token, every section, every animation with its timings:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/07-site-design-and-motion.md

The product, condensed, with vocabulary, accepted decisions, status, and every
tagline in play:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/01-what-vivary-is.md

The asset brief: the four open decisions, the idea the mark must carry, and
one spec per deliverable:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/05-zo-asset-brief.md

The one-page product description written for people and for answer engines:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/docs/brand/08-product-description.md

The code behind the images:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/src/app/home.css
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/src/app/page.tsx
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/src/app/scenes.tsx

The rules for the site, including the design bar and the voice:
https://github.com/vivary-dev/vivary-site/blob/docs/brand-brief/AGENTS.md

## The product documentation

The guide. One offline HTML file with a six-step walkthrough, the map of the
sixteen parts, every user action, and the accepted decisions:
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/specification/guide.html

The specification overview, the system diagrams, the sixteen parts, the
workspace interface contract, and the shared vocabulary:
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/specification/README.md
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/specification/system.md
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/specification/modules.md
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/unified-workspace.md
https://github.com/vivary-dev/Vivary-New/blob/dev/docs/product/multi-project/CONTEXT.md

The README and the app's interior design rules:
https://github.com/vivary-dev/Vivary-New/blob/dev/README.md
https://github.com/vivary-dev/Vivary-New/blob/dev/packages/workbench/DESIGN.md

## The mark

No usable mark exists. There is an old 256 pixel PNG of a mint dome with wavy
bands and a door. Its idea, a small contained world in layers with a gate, is
the only thing worth keeping from it. Its color, its style, and its site are
not. Do not look it up.

## What to deliver

1. Three directions for the primary mark, each as a single-color vector on a
   square canvas. One may take the dome-with-layers-and-door idea and redraw
   it in this system. Two start fresh from a contained world, layers, a gate,
   and a written record. None may use a chat bubble, sparkle, robot, brain,
   network graph, or generic AI glyph. Show each at 16, 32, and 256 pixels,
   on `#080705` in `#ebe5d8`, on `#0C100E` in `#B8F263`, and inverted on
   white.
2. A wordmark for "Vivary" in Big Shoulders, weight 700 to 800, matching the
   brand word in the header of the hero image, and a horizontal and stacked
   lockup with your recommended mark.
3. A palette recommendation that reconciles the site's warm black and amber
   with the app's green-black and lime, or an argument for keeping them
   separate with one shared neutral. Hex values, roles, and contrast checks.
4. A desktop application icon for Windows, the mark on a rounded tile, at
   1024 with a note on how it reads at 16 and 32.
5. A 1200 by 630 social preview card in the locked page's system: lockup, one
   tagline, nothing else.
6. A one-page brand sheet: the mark, the lockups, the palette, the type roles,
   clear space, and the things not to do.

Two taglines are in play. Show the lockup and the social card with each:
"Your projects. Your agents. Your machine." and "It knows you. Because you
wrote it down." Recommend one.

Explain each direction in a few plain sentences: what it says, why it fits the
name and the product, and where it fails. Then recommend one. Every deliverable
must look like it belongs on the pages in the images above.
