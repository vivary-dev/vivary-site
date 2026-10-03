# Vivary brand system

Current direction, approved 2026-10-03. This file replaces earlier brand briefs and generation prompts. Use it with `tokens.json` and `mascot-manifest.v1.json`. Git history preserves superseded guidance. Existing brand sheets and mark studies document the shipped logo and tokens. This guide governs character identity and resolves any older conflicting imagery or font instructions.

Vivary is a desktop workspace where your agents work from files you own. One window holds every project: code, research, writing, second brains, knowledge bases. It runs the coding agents you already pay for, such as Claude Code and Codex, on your machine with your keys. There is no Vivary account and no cloud control plane. Plans, memory, decisions and results are plain files. Before the agent works, Vivary hands it a bounded capsule of the files that matter. After, it leaves a receipt: what it saw, what it changed, what it left alone.

Product status and availability come from the current product repository, `vivary-dev/vivary`, and the site's sourced content rules. This guide grants no permission to announce a release, price or deployment.

This system replaces the retired command line product's identity (mint on navy, Bricolage Grotesque, the dome PNG). Keep nothing from it except the name and the engine's four layer names: tropo, strato, ozone, exo.

## Voice

Write for professionals who can install software and message an agent. Do not assume they program. Say what literally happens. Short sentences, one idea each.

- Do: "It knows you. Because you wrote it down." "What it saw, what it changed, what it left alone."
- Do not: marketing adjectives, "AI magic", sparkle language, exclamation marks, "unlock", "seamless", "supercharge".
- Name the agents the user already has. Claude Code and Codex are the user's tools, not features of Vivary.
- The four engine layers are named for the sky. Use the names in lowercase in running text: tropo, strato, ozone, exo.

## Mascot and agent character

The approved Vivary mascot review pack v1, dated 2026-10-03, establishes
Vivary's lead character and the identity behind its default project agent.
Its public name is undecided. Use "Vivary mascot" in asset descriptions until
the name is selected.

Vivary is the product. The Little AI Company is its maker and keeps its
skullbunny identity. The jar remains Vivary's logo, favicon and app icon.
The mascot carries Vivary's character and agent voice across the website,
GitHub and app. The jar carries product identification. Other company products
do not inherit Vivary's character.

### Approved artwork

The canonical hero is [lead-transparent.png](assets/Mascot/v1/lead-transparent.png).
Keep its broad charcoal felt body, asymmetric brown branch horns, olive leaf
on viewer right, two ochre arm stripes on viewer left, calm face and olive
notebook. Preserve its proportions and orientation. Do not mirror, recolor,
stretch, crop off the horns or add a background treatment.

The approved [lead-icon.svg](assets/Mascot/v1/lead-icon.svg) is a separate
simplified drawing with a bone tile. It is intended for small decorative
placements. It omits the hero's texture and stripes by design. It is not a
replacement favicon or a vector trace of the hero.

The visual system uses the approved tactile mascot for character identity
and line art and dither for product diagrams and the existing vivarium hero.
This replaces the earlier line-art-only imagery direction. The mascot's
natural olive and ochre colors belong to its artwork. They do not add UI
color tokens or change the amber and lime rules.
Scale the originals in layout. Do not generate new art, poses, crops, icon
exports or animation frames as part of this rollout.

[mascot-manifest.v1.json](mascot-manifest.v1.json) records exact byte sizes,
SHA-256 hashes and intended consumers. The versioned masters live here.
Consumer copies must match their hashes. New approved art gets a new version
and a manifest update. The private review sheet, naming draft, generation
prompts and draft persona contract are not public brand assets.

### Placements

| Consumer | Placement |
| --- | --- |
| Website home | Static 120px hero above the existing memory-section heading. Keep the vivarium hero, jar lockup, page copy and calls to action. |
| Product GitHub README | Canonical hero beside the product introduction. Keep the product mark and existing project facts. |
| Desktop app | Static 48px icon in the empty conversation. Keep the composer, settings and project controls. |
| Other Vivary repositories | Link to this guide where relevant. Assess each repository before adding art. |
| Other company products | Keep their own identities. Do not apply this mascot based on common ownership alone. |

These are the current rollout destinations, not a statement that each has
shipped. The manifest and the relevant pull requests identify the copies.

### Agent voice and behavior

The character gives Vivary's project agent a calm, resourceful woodland-scout
identity. Express that through useful work and concise language. Use
short, concrete sentences about the user's work. State what was checked,
what changed and what still needs a decision. Keep personality independent
of the model or provider. Avoid fantasy roleplay, baby talk, invented feelings,
guilt, claims of unlimited ability or claims that the mascot grants access.

For example: "I found the relevant files. I am checking the two conflicting
requirements." A blocked response names the problem and next action:
"The connection expired. The draft is saved. Reconnect the account to continue."
A completion message names the deliverable and checks. Do not call a tool
response a completed task without verifying the result.

This is a voice and presentation contract. It does not install an agent,
add tools, grant permissions or create durable memory. The host owns real
execution, authentication, approval, cancellation and run state.

### State and motion

The current image placements are static and decorative for accessibility.
They introduce the character without representing an activity or run status.
Future stateful appearances must follow verified host events:

| State | Required accompanying information |
| --- | --- |
| Working | A real admitted run and its current stage. |
| Waiting | What is awaited, including whether it is a user answer, a connection or an external process. |
| Finished | A verified deliverable and completion criteria. |
| Blocked | The reason and a safe next action. |
| Approval | The exact proposed action and the host's approve and cancel controls. The character cannot approve. |
| Stopped | Distinguish a requested stop from confirmed termination. |

Write the state in text. Never communicate it only by pose or color. Any
future motion must be brief, interruptible and triggered by a real transition.
No infinite bouncing, fabricated typing, fake percentages or sadness when
unused. Reduced motion keeps the same static content and controls.

Decorative art uses empty alt text and stays out of the keyboard order. A
future interactive character needs a visible keyboard focus, an accessible
name and a labeled Activity alternative. Never make the character the only
way to find status, approvals or cancellation. No interactive mascot or
state wiring is implemented by these assets.

## The mark

The mark is a jar: glass around wavy strata, a sprout growing inside, a door at the base. It is the vivarium as anyone keeps one on a shelf. Read it as: a small contained world (the glass), the layers (the strata), something alive that grows (the sprout), the gate the agent passes through (the door). One ink, always the ground's text color.

- On `ground` use `text`. In the app use `lime`, or the app's `text` #EDF4EF where lime would be too loud. On white use the site `ground` as the ink. Never `amber`, never two colors, never a fill behind the glass.
- Files: `assets/Marks/vivary-mark-jar-bone.svg` (site), `-lime.svg` and `-apptext.svg` (app), `-black.svg` (white and print). One flattened path on a 64 unit canvas, the jar body at units 14 to 50 across and 8 to 56 down.
- One mark at every size. There is no small cut. At 16 px the jar is a jar and the sprout is a dot. Never a lockup below 24 px.
- Clear space is the mark's own height on every side. The shipped lockup SVGs carry this space in their viewBox. Nothing enters it.
- The jar has a family. Six more marks in the same language (a dome of strata with a sprout, a cloche over wavy strata, the strata V with a sprout, a wave globe, a seed world, the cloche vivarium) are in `assets/Marks` for section objects and product illustration, never as a second logo or an agent character. The section "Mark directions" records them and the choice.

## Wordmark and lockups

- Set the wordmark exactly as the brand word in the site header: Big Shoulders 800, optical size 40, tracking +1%, as written: Vivary. Never all caps, never below weight 700, never another face. Use the shipped path SVGs (`assets/Wordmark`) so the letterforms do not depend on font loading. The claim uses optical size 72. The brand word uses 40. Do not swap them.
- Horizontal lockup: tile height 1.12 times the cap height, gap 0.45 times the cap height, tile bottom 6% of cap height below the baseline. Stacked lockup: tile 1.5 times the cap height, centered, gap 0.4 times the cap height.
- The claim under a lockup: Big Shoulders 800, optical size 72, 22% of the wordmark size, in the same ink as the wordmark. Left aligned with the wordmark in the horizontal lockup, centered in the stacked one. It is the claim, so it is set like the claim on the page, not like a caption.
- Recommended tagline: "It knows you. Because you wrote it down." Never split it. "It knows you." alone reads as surveillance. The second sentence is the product.
- The other tagline, "Your projects. Your agents. Your machine.", is built and kept for comparison. Its weakness: three possessives in a row is a pattern many local first products use, and it says what you keep, not what Vivary does.

## Color

The site palette is locked (candidate 9, 2026-09-13) and is the brand reference. The app palette is where the mark must also work. Keep them separate. One rule bridges them: the mark and the wordmark are always the ground's text color.

- `ground` #080705 is the page. `pane` #0E0C09 is a panel, 1.03:1 from ground, so a pane always carries a `rule` #2A2419 border. `rule-soft` #1A1712 is the hairline inside panels. Rules are borders only, never text.
- `text` #EBE5D8 is human words (16.0:1 on ground). `text-2` #A69D8D is secondary prose, nav and ledger values in plain mode (7.5:1). `text-3` #837C6F is captions, file headers, rails and the footer (4.9:1, body size only, never below 12px).
- `amber` #E9A23B is only for what the workspace recorded: ledger keys, file paths, counts, the active project, the open file, the agent's name in the chat, added memory lines, the focus ring, text selection. Never decorative. Never on the mark. Never in the app. In a ledger the key is amber and the value is text.
- The app runs its own set: navigation #0C100E, workspace #121715, raised #1C2420, borders #35423B, text #EDF4EF, muted #A6B4AB, primary `lime` #B8F263, light-mode primary #346C2B. Lime is the action, links, selection and focus. It appears on the site only inside an app screenshot, inside a rule frame.
- The two grounds are 1.05:1 apart and the two off-whites 1.12:1 apart. Nobody sees two blacks or two whites, so nothing is reconciled and nothing is invented to bridge them.
- Amber and lime are 1.6:1 apart: the same lightness in different hues. Side by side they read as a warning next to a success. That is why they are never on one surface.
- In print (white ground) the greys and accents darken: `text-2` #6B665C, `text-3` #756F64, `amber` #8F5808 (5.9:1), `lime` #346C2B (6.3:1, the app's own light-mode primary).
- No gradients, no glow, no blobs, no shadows, no stock photography. Panels may carry the page's scanline: a 1px line of text at 3.5% every 3px.

## Type

- `display`: Big Shoulders. The claim and the brand word. Nothing else. 800 for the hero and the brand word, 700 for section heads. Optical size 72 for headlines, 40 for the brand word. Line height 0.9 for the hero, 0.95 for section heads.
- `speaks`: Fraunces italic 400, SOFT 30, WONK 1, tracking -0.006em. Only where the memory file speaks. Never for UI, never for the claim.
- `record`: Geist Mono. Everything else on the site: body, deck, ledgers, nav, buttons, captions, code. 500 for buttons, 400 elsewhere. Tabular numerals for counts. A ledger is key in `amber`, value in `text`, lists inside a value in `text-2`.
- `app`: Inter in the desktop app. The website's drawn app specimen uses Geist Sans, per the 2026-09-16 site decision in `AGENTS.md`. These are separate consumers. This mascot rollout does not change either font. Inside the app Big Shoulders appears only in the wordmark.
- The four source font files are in `fonts/` and listed in `tokens.json`. That file retains the desktop app's Inter token. The site loads Geist Sans for its app specimen and uses Big Shoulders, Fraunces and Geist Mono for the surrounding page. Typography is not fully unified across the two implementations.

## Windows app icon

Per the asset brief: the mark on a rounded tile with its own background, because Windows shows icons on light and dark taskbars. Tile #0C100E, corner radius 22%, the jar in lime at 78% of the tile. `assets/App icon/vivary-appicon-1024.svg` is the master. `Vivary.ico` carries 256, 128, 64, 48, 32, 24 and 16 from that one master. `vivary-appicon-small-sizes.png` shows how it reads on both taskbars. The lime tile alternative (`vivary-appicon-alt-lime-1024.svg`) is kept for comparison. An `.icns` for macOS is not built yet.

## Hero illustration

`assets/Hero/vivary-hero-vivarium.svg` is the vivarium in cross section for the home page: a glass cloche over four strata, ferns and sprouts, stones, a door at the edge of the world, and a label leaning on the plate with three lines, the last in amber. This product illustration uses line art and dither, in `text`, `text-2` and `text-3` on `ground`. Amber appears once, on the recorded line. PNG and WebP at 1600 by 900 are beside it. It is drawn to sit in the 7fr column beside the headline or to replace the memory scene on a page that needs an image.

## Social preview

1200 by 630, in the locked page's system. Horizontal lockup top left, the claim at page scale bottom left in Big Shoulders 800, nothing else, all in `text` on `ground`. The asset brief allows a thin amber rule under the text. It is left out: amber is only for what the workspace recorded and a rule under a tagline is decoration. Both taglines are built in `assets/Social`. Ship the "It knows you" card. The GitHub organization hero (1280 by 640, with one status line) and the README header (1100 wide) share the composition and are in `assets/Org hero`.

## Do not

- Put the mark in amber, in lime on the site, or in two colors.
- Add a second tile, a glow, a gradient, a shadow or an outline behind the mark.
- Rotate or stretch the mark, straighten the waves, fill the glass, drop the sprout, or drop the door.
- Reuse the old mint, the old navy, Bricolage Grotesque, the dome PNG, the sparkle favicon, the org hero's diamond, or the glowing strata image.
- Use chat bubbles, sparkles, robots, brains, network graphs or generic AI glyphs anywhere.
- Show a download button, a price or a release date.
- Split the tagline.
