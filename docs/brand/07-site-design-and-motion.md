# The locked home page: design and motion, in full

Extracted on 2026-09-16 from the code on `dev` (`src/app/page.tsx`,
`src/app/home.css`, `src/app/scenes.tsx`, `src/app/ledger.tsx`) and from the
candidate history on `feat/landing-candidates`. This is the only complete
written account of the page. The code remains the source of truth.

## How the page was chosen

Nine candidates were built on 2026-09-13, all from the same facts, behind one
index. Jeff locked candidate 9. The notes each one carried:

| # | Name | The idea |
| --- | --- | --- |
| 1 | Strata | Dark field, the product mint, the vivarium cross-section as the hero. |
| 2 | Workspace | Light and editorial. The hero is a real workspace: a file tree whose files are the copy. |
| 3 | Ledger | Paper and ink with one cobalt accent. The hero is the published-truth table and a dithered chart of real signals. |
| 4 | Terrarium | Warm and generative. Dithered gradient washes and a serif display face. The hero blooms. |
| 5 | Console | Product shot first. A drawn app frame, bold sans, three proof columns. |
| 6 | Workspace, not chat | The flagship. One idea told in six beats: agents need a workspace, not a better chat. Vapor for what evaporates, paper for what persists. |
| 7 | Transmission | Hyperstition. A field report from a workspace three years in, written as if it already happened. Phosphor on black. |
| 8 | Familiar | Paranormal. Something lives in your files and it is yours. The memory file reads you back, line by line. |
| 9 | Familiar transmission | The blend. Seven's body, eight's heart: the record read back from 2029, opening with the memory file that knows you. |

The first five were built blind and read as brochures. The turn came from
giving the builder eyes: a headless screenshot loop and a `?still=1` switch.
Candidates 6 through 9 were built with that loop. The rule since: at least
three critique passes on any new page. Look, name what is weak, fix, re-render.

The full code of all nine is on `feat/landing-candidates` under
`src/app/candidates/c1` to `c9`.

## The premise

The page is a record read back from the future. A software workspace called
northfield was opened on 2027-01-06. The page reads it on 2029-09-13, session
1,204, run 4,112. The fiction is framed once, in a bordered strip under the
hero, in three sentences: the dates run to 2029, that is the future Vivary is
built toward, the product facts are from the present. The fiction never
claims a shipped feature.

The voice comes from candidate 8: the memory file speaks to you in the second
person, in short declarative lines about you. "You write in the morning. I do
not schedule builds then." The system comes from candidate 7: a ledger of
keys and values, monospace, phosphor-quiet, everything recorded.

## Palette

| Token | Value | Job |
| --- | --- | --- |
| `--ground` | `#080705` | Page background. Warm black, not neutral. |
| `--pane` | `#0e0c09` | Panels: the memory file, the app window, the install block, the intro objects. |
| `--rule` | `#2a2419` | Borders on panels and the fiction frame. |
| `--rule-soft` | `#1a1712` | Hairlines inside panels, header and footer borders, the ledger rows on phone. |
| `--text` | `#ebe5d8` | Human words. Off-white, warm. |
| `--text-2` | `#a69d8d` | Secondary prose, nav links, the ledger values in plain mode. |
| `--text-3` | `#837c6f` | Captions, file headers, rails, footer. |
| `--amber` | `#e9a23b` | Reserved for what the workspace recorded: ledger keys, file paths, counts, the active project, the open file, the agent's name in the chat, added memory lines, the focus ring, text selection. |

There is no other color on the page. The solid button is off-white on ground
and turns pure white on hover, the one place `#fff` appears. Text selection
inverts to amber on ground. Focus is a 2px amber outline offset 3px.

Panels carry a scanline: a repeating 1px line of the text color at 3.5%
opacity every 3px, laid over the memory file with `::after`. It reads as a
phosphor screen without saying so.

## Type

Three faces with one job each. No face does two jobs.

| Face | Role | Settings |
| --- | --- | --- |
| Big Shoulders (variable, `opsz` axis) | The claim. Headlines and the brand word. | Weight 800 for the hero, 700 for section heads. `opsz` 72 for headlines, 40 for the brand word. Line height 0.9 for the hero, 0.95 for section heads, 1.05 for block heads. Tracking 0 (hero at -0.005em). Balanced wrapping on all but the hero. Fallbacks Impact, Arial Narrow. |
| Fraunces (variable, italic only, `SOFT` `WONK` `opsz` axes) | The file speaks. Only for lines written by the memory file. | Italic 400, `SOFT` 30, `WONK` 1, tracking -0.006em. Line height 1.35 in the hero scene, 1.4 in the ledgers. Fallbacks Georgia, Times. |
| Geist Mono | The record. Everything else: body, deck, ledgers, nav, buttons, captions, code. | 500 weight for buttons, 400 elsewhere. Body line height 1.65. Tabular numerals for counts. |

Scale, all fluid:

| Token | Value | Used for |
| --- | --- | --- |
| `--t-xl` | `clamp(3rem, 7.6vw, 6.8rem)` | Hero headline |
| `--t-lg` | `clamp(2rem, 4.4vw, 3.9rem)` | Section headlines, max width 20ch |
| `--t-md` | `clamp(1.35rem, 2.2vw, 1.9rem)` | Block heads such as file names |
| `--t-voice` | `clamp(1.25rem, 1.75vw, 1.6rem)` | The memory lines in the hero |
| `--t-deck` | `clamp(1rem, 1.25vw, 1.0625rem)` | Deck and ledes |
| `--t-body` | `0.9375rem` | Body |
| `--t-sm` | `0.8125rem` | Nav, buttons, captions, panels, footer |
| `--t-xs` | `0.75rem` | Project kinds in the window |

Measure: deck 44ch, lede 56ch, ledger values 62ch, the fiction frame 70ch.

## Layout

- Max width 1320px. Gutter `clamp(1.25rem, 5vw, 4.5rem)`.
- Section padding `clamp(3.5rem, 7vw, 6rem)` vertical. The hero is tighter:
  `clamp(2rem, 3.5vw, 2.5rem)` top.
- The recurring grid is 5:7. The hero row, every two-column section, and the
  section intros all split `minmax(0, 5fr) minmax(0, 7fr)` with a gap of
  `clamp(2rem, 5vw, 5rem)`. In two-column sections the left column is sticky
  at 5rem from the top so the headline stays while the record scrolls.
- At 1440x900 the headline, deck, the complete memory scene, and the primary
  button all fit inside the first 900px. That was measured and is a rule.
- Header: sticky, 3.5rem tall, ground at 90% with a 10px backdrop blur, a
  soft hairline below. Brand word left in Big Shoulders 1.5rem. Four links
  right: Memory, Engine, GitHub, Docs. The second link hides under 640px, the
  fourth under 420px.
- Buttons: 3rem tall, 1.25rem side padding, 1px border in the text color,
  square corners, mono 500. The solid variant fills with the text color.
  Hover fills the outline variant with `--rule-soft` over 160ms.
- Footer: soft hairline above, 2rem top and 4rem bottom padding, the line
  "Vivary. It knows you because you wrote it down." left and four links right.

Breakpoints: 900px collapses every grid to one column and unsticks the lead.
640px collapses ledgers to stacked key over value, the tally strip to two
columns, and tightens panel padding. 420px hides one more nav link. The page
must not scroll horizontally at 360px.

## The ledger

The page's one structural device. A definition list on a two-column grid: a
key column of `--col` (11rem, 10rem inside two-column sections) and a value
column. Keys are amber, one line, ellipsized. Keys can carry a small
secondary line in `--text-3`, used for "entry 40" under a date. Values are
off-white, max 62ch. Lists inside values are unbulleted in `--text-2`. When a
value is the file speaking it switches to Fraunces italic at 1.1875rem.

The plain variant, used for the promises, sets keys in off-white 500 with
normal wrapping and values in `--text-2`, with looser row spacing.

## Section order and content

1. **Hero.** Two-line headline in Big Shoulders 800: "It knows you." /
   "Because you wrote it down." Below it a 5:7 row. Left: the deck from
   `facts.product.what`, then two buttons, solid "See Vivary on GitHub" and
   outline "What it remembers" linking to the memory section. Right: the
   memory scene, described under Motion.
2. **Frame.** A bordered strip with one ledger row, key "About the dates,"
   naming the fiction in three sentences.
3. **Account.** "Every run ends with an account of itself." Left column
   explains capsule and receipt in two ledes. Right column is a block headed
   `receipts/run-04112.md` with a ledger: run, date, what I saw (4 of 1,318
   files, listed), what I changed, what I left alone, what I declined, kept.
4. **Record** (anchor `memory`). "Three years in. One workspace, read back."
   Block headed `memory/MEMORY.md`, caption "Written by the agent, kept by
   you. About you as much as the project." Ledger of five dated entries, each
   value in the file's voice, with paths and the receipt number in amber.
5. **Rooms.** "Every project is a room. One window opens all of them." Intro
   with the product line, a quiet lede listing the workspace kinds, and a
   folder object. Below, a drawn app window: a bar with "Vivary" and the
   date, then three columns. Projects rail with five rooms (northfield
   active, field-notes, the-second-novel, transit-study, ledger) each with a
   kind. A chat column with one user message and two Vivary replies. A files
   rail with six paths, `memory/MEMORY.md` open. Active items get a 2px amber
   left border and amber text.
6. **Kept.** "It keeps the promises you can check." Plain ledger of four
   promises: No account, Your machine your keys, Your folder stays yours,
   Version control is your choice.
7. **Grow.** "The file gets longer. That is the whole trick." Intro with a
   lede and a file object. Then a file header `memory/MEMORY.md`, "one file,
   three moments," and three columns: Session 1 (one line), Session 12
   (three lines), Session 40 (seven lines). Lines carried over are `--text-2`.
   Lines new in that session are amber.
8. **Engine** (anchor `engine`). The engine line and summary from facts. A
   ledger of the four layers. The pinned install command in a panel, wrapping
   with `overflow-wrap: anywhere`. The package list with versions and the
   verification date. The status sentence, set off by a rule.
9. **Footer.**

The intro objects beside sections 5 and 7 are small panels: a Lucide icon
(folder-open or file-text) at 1.25 stroke, then three hairlines under it, the
second at 75% width, the third at 45% width in amber. They are a folder and a
file with one recorded line. Added in the second tune after the first render
showed the lower intros wanted one visual object each.

## Motion

Two systems. Nothing else moves.

**Section reveals.** Each section past the hero starts with its `.reveal`
children at opacity 0. An IntersectionObserver with `rootMargin` of
`0px 0px -14% 0px` and threshold 0.1 marks the section `.in` when it enters.
Children fade to 1 over 600ms ease, staggered 0, 80, 160, 240ms by child
order. Opacity only. Nothing translates, scales, or slides. The hero is in
from the start.

**The hero memory scene.** One sequence, four phases: idle, say, count, done.
Each phase keeps the earlier ones.

- At 260ms the scene enters `say`. Five lines from the memory file appear in
  order, each with a 900ms `v9say` animation on `cubic-bezier(0.2, 0.7, 0.2,
  1)`: opacity 0 to 1 and an 8px upward settle. Line i starts at i times
  720ms. Lines: "You write in the morning." / "You dislike ORMs. You said so
  in March." / "You keep field notes in a second workspace. I do not mix
  them." / "You told me not to touch the migrations." / "I have not." The
  last line is the agent's own, set in amber and indented 2rem.
- At 3.9s after `say` begins, the turn line fades in with the same curve:
  "You can open that file. You can edit it. You can delete it."
- At 260 + 6 times 720 + 900 = 5,480ms the scene enters `count`. The tally
  strip fades in over 500ms and four counters run from 0 on
  requestAnimationFrame: sessions 1,204, memory entries 312, decisions 97,
  receipts 4,112. Each takes 2,000ms on a cubic ease-out, `1 - (1 - t)^3`,
  staggered 160ms apart. Values render with thousands separators and tabular
  numerals in amber. When all four settle the scene is `done`, about 8s in.
- The scene never loops. The final state is the page's resting state.

**Still mode.** `?still=1` on any URL puts every section `.in` and jumps the
scene to `done` with final counts. The screenshot script appends it. Every
new scene must honor it.

**Reduced motion.** `prefers-reduced-motion: reduce` sets every reveal, every
memory line, the turn, and the strip to opacity 1 with no animation or
transition, and removes the button hover transition. The scene also detects
reduced motion in script and jumps to `done` at once.

**Hover.** Buttons and nav links only. 160ms color and background. No
transforms anywhere.

## Fonts loaded

Big Shoulders and Fraunces load through `next/font/google` in `page.tsx` with
subsets latin and the axes named above. Geist and Geist Mono load in the root
layout. The static build warns that it cannot compute a fallback metric for
Big Shoulders. That warning is known and harmless.

## Metadata

Page title "Vivary knows you because you wrote it down." Description from
`facts.product.line`. No Open Graph image exists yet. That is item 4 in the
Zo asset brief.

## Rules carried by the page

- Do not rebuild it. Tune it.
- Amber is only for what the workspace recorded. Never decorative.
- One primary call to action. Everything around it quiet.
- The fiction is named once and never claims a shipped feature.
- No install for the app. The engine command is the only install.
- The status sentence appears once, from `facts.product.status`.
- Verify phone layout at a real 390px viewport, not with headless Chrome,
  which clamps widths under about 500px.
