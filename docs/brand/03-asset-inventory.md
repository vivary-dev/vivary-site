# Asset inventory

Updated 2026-09-16, evening. The brand system arrived. The jar mark, the
wordmark, lockups in bone, lime, and black, the app icon with `Vivary.ico`,
the vivarium hero, the social image, the org hero, the README header, and a
brand sheet are in `docs/brand/system/assets/`. Every "does not exist" below
is now filled except the harness marks. The rest of this file is the state
before delivery.

Every visual identity artifact that exists across the Vivary repositories as
of 2026-09-16, with a verdict. Paths are relative to each repo root.

## Three visual systems exist. None is designated for the new product.

| System | Where | Ground | Text | Accent | Type |
| --- | --- | --- | --- | --- | --- |
| Living strata (current site, being replaced) | `vivary-dev/vivary` `site/` | `#020916` navy | `#f1f7f3` | mint `#49e1b1`, blue `#52b6d8` | Bricolage Grotesque, Hanken Grotesk, JetBrains Mono |
| Workbench (the app) | Vivary-New `packages/workbench/DESIGN.md` | `#0C100E` and `#121715` green-black | `#EDF4EF` | lime `#B8F263` | Inter Variable today. Decided 2026-09-16: replace with Geist. |
| Candidate 9 (this site, locked 2026-09-13) | `src/app/home.css` | `#080705` warm black, pane `#0e0c09` | `#ebe5d8` off-white | amber `#e9a23b`, reserved for what the workspace recorded | Big Shoulders, Fraunces italic, Geist Mono |

A fourth appears in the Vivary-New README badges: lime `#b5ef4a` on `#101713`,
close to but not the Workbench lime. A fifth, from June 2026, is archived:
cream paper with lichen green, glacial blue, and copper in OKLCH, Geist type.

The locked home page is the only one Jeff chose after a full candidate process.
It should be the reference for the new brand. The app's lime-on-green-black is
the one users will look at most, so the logo has to work on both.

## Marks

| File | Repo | What it is | Verdict |
| --- | --- | --- | --- |
| `site/public/media/vivary-mark.png` (256x256, also `favicon.png` and `src/assets/vivary-mark.png`, byte-identical) | vivary, Vivary-New | Mint dome silhouette cut by four wavy strata bands with a small arched door at the bottom. The shipped logo on the live site. PNG only, no vector. | Best existing idea. Redraw as vector or replace. |
| `site/src/assets/vivary.svg` (32x32) | vivary, Vivary-New | Rounded square, green to blue gradient `#1f9d72` to `#1b6fa8`, three white wave strokes and a dot. Referenced by nothing. | Retire. |
| `site/public/favicon.svg` (128x128) | vivary, Vivary-New | A four-point sparkle glyph. Not Vivary artwork. Referenced by nothing. | Delete. |
| `profile/assets/vivary-hero.svg` (1280x640) | vivary-dev/.github | Navy to green gradient card, diamond and crosshair "gate" mark in Tailwind greens and cyans, Segoe UI text, stale tagline, package chips without strato. | Replace. |
| `public/favicon.svg` (32x32) | vivary-landing-page (archived) | Navy tile with two overlapping leaves, lichen green and glacial blue. | Archived. Ignore. |
| In-app sidebar mark | Vivary-New `packages/workbench/app/components/layout/Sidebar.tsx` | A typographic "V" in a 27px rounded tile on the sidebar accent. | Placeholder. Replace with the real mark. |
| Desktop app icon | Vivary-New `packages/desktop/` | None. No `.ico`, `.icns`, or PNG exists for `Vivary.exe`. | Gap. Required before any distribution. |

## Illustrations

| File | What it shows | Verdict |
| --- | --- | --- |
| `site/public/media/hero-living-strata.webp` (1672x941) | Cross-section of glowing earth in wavy layers, ferns on top, root filaments descending to a lit arched gate with a keyhole. The OG image of the live site. | Strongest existing metaphor image. Keep for reference. Not for the new site. |
| `site/public/media/architecture-layers.webp` (1254x1254) | Four translucent plates stacked in exploded isometric, one light through all four. The four layers. | A diagram of the four workspace commands. Could survive on a page about them. |
| `docs/assets/walkthrough/01-04*.svg` | Hand-built fake terminal windows showing CLI output. | Command docs only. |
| `docs/proof/homepage-desktop.webp`, `homepage-mobile.webp` | Screenshots of a homepage that no longer exists ("A working memory your agents can inspect.", version 0.1.1). | Stale. Do not reuse. |
| `docs/proof/graph-blast.webp` | Mint node graph, "4 things depend on it. See it before you touch it." | Best blast-radius visual. Current site style. |
| `public/og-image.png` (1200x630), `src/assets/hero-source.png` | June landing page: cream paper, terminal, file cards, copper gate, green graph. | Archived. Ignore. |
| `stats/usage-snapshot.svg` | Generated stats card, last data 2026-07-06, shows 3 stars. | Stale. Remove from public pages or refresh. |
| `Vivary-product-guide.html` (release asset, 2.6 MB) | Self-contained interactive design guide of the accepted app experience. No screenshots inside. Uses `Consolas` and a blue-gray palette of its own. | Internal. Useful to read, not a brand asset. |

## What does not exist

- A vector logo.
- A wordmark. Every lockup is the PNG mark plus the word "Vivary" in the page font.
- A desktop application icon in any size.
- Any screenshot of the new app. The preview ZIP is Windows-only and was not
  run here.
- A social preview image for the new product.
- A brand guide. A `/brand/` docs route once existed on the current site and was
  retired. No `BRAND.md` survives in any repo.
- Harness marks. The model picker design calls for "small brand marks" for
  Claude Code, Codex, and OpenCode. Those are third-party logos with their own
  usage rules and must not be redrawn.

## This site's current imagery

`public/` holds only the Next.js starter SVGs (`file.svg`, `globe.svg`,
`next.svg`, `vercel.svg`, `window.svg`) and a default `favicon.ico`. The home
page draws its scenes in code with Dither Kit and two Lucide icons. No checked
in imagery exists yet. `AGENTS.md` says generated imagery is produced elsewhere
and checked in.
