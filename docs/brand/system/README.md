Vivary is a desktop workspace where your agents work from files you own. One window holds every project: code, research, writing, second brains, knowledge bases. It runs the coding agents you already pay for, such as Claude Code and Codex, on your machine with your keys. There is no Vivary account and no cloud control plane. Plans, memory, decisions and results are plain files. Before the agent works, Vivary hands it a bounded capsule of the files that matter. After, it leaves a receipt: what it saw, what it changed, what it left alone.

The product is in development, Windows first, not released. Nothing made with this system may imply a download, a release date or a price.

This system replaces the retired command line product's identity (mint on navy, Bricolage Grotesque, the dome PNG). Keep nothing from it except the name and the engine's four layer names: tropo, strato, ozone, exo.

## Voice

Write for professionals who can install software and message an agent. Do not assume they program. Say what literally happens. Short sentences, one idea each.

- Do: "It knows you. Because you wrote it down." "What it saw, what it changed, what it left alone."
- Do not: marketing adjectives, "AI magic", sparkle language, exclamation marks, "unlock", "seamless", "supercharge".
- Name the agents the user already has. Claude Code and Codex are the user's tools, not features of Vivary.
- The four engine layers are named for the sky. Use the names in lowercase in running text: tropo, strato, ozone, exo.

## The mark

The mark is a jar: glass around wavy strata, a sprout growing inside, a door at the base. It is the vivarium as anyone keeps one on a shelf. Read it as: a small contained world (the glass), the layers (the strata), something alive that grows (the sprout), the gate the agent passes through (the door). One ink, always the ground's text color.

- On `ground` use `text`. In the app use `lime`, or the app's `text` #EDF4EF where lime would be too loud. On white use the site `ground` as the ink. Never `amber`, never two colors, never a fill behind the glass.
- Files: `assets/Marks/vivary-mark-jar-bone.svg` (site), `-lime.svg` and `-apptext.svg` (app), `-black.svg` (white and print). One flattened path on a 64 unit canvas, the jar body at units 14 to 50 across and 8 to 56 down.
- One mark at every size. There is no small cut. At 16 px the jar is a jar and the sprout is a dot. Never a lockup below 24 px.
- Clear space is the mark's own height on every side. The shipped lockup SVGs carry this space in their viewBox. Nothing enters it.
- The jar has a family. Six more marks in the same language (a dome of strata with a sprout, a cloche over wavy strata, the strata V with a sprout, a wave globe, a seed world, the cloche vivarium) are in `assets/Marks` for section objects, empty states and illustration, never as a second logo. The section "Mark directions" records them and the choice.

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
- `app`: Inter, per the app's own interior rules. Inside the app Big Shoulders appears only in the wordmark.
- The four font files are in `fonts/` and listed in tokens.json. Google Fonts serves the same families on the site.

## Windows app icon

Per the asset brief: the mark on a rounded tile with its own background, because Windows shows icons on light and dark taskbars. Tile #0C100E, corner radius 22%, the jar in lime at 78% of the tile. `assets/App icon/vivary-appicon-1024.svg` is the master. `Vivary.ico` carries 256, 128, 64, 48, 32, 24 and 16 from that one master. `vivary-appicon-small-sizes.png` shows how it reads on both taskbars. The lime tile alternative (`vivary-appicon-alt-lime-1024.svg`) is kept for comparison. An `.icns` for macOS is not built yet.

## Hero illustration

`assets/Hero/vivary-hero-vivarium.svg` is the vivarium in cross section for the home page: a glass cloche over four strata, ferns and sprouts, stones, a door at the edge of the world, and a label leaning on the plate with three lines, the last in amber. Line art and dither only, in `text`, `text-2` and `text-3` on `ground`. Amber appears once, on the recorded line. PNG and WebP at 1600 by 900 are beside it. It is drawn to sit in the 7fr column beside the headline or to replace the memory scene on a page that needs an image.

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
