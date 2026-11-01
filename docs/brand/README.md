# Vivary brand and marketing working set

Updated 2026-10-03. [The brand system](system/README.md) is the single current
authority for Vivary identity, character, assets and voice. The earlier
generation brief and design prompt have been replaced in place. Git history
preserves the old decisions. Product research and screenshots retain their
dates and are evidence, not instructions to restore an old identity.

| File | What it answers |
| --- | --- |
| `01-what-vivary-is.md` | What Vivary is, from the product guide and specification. Six steps, sixteen parts, vocabulary, decisions, status, and where the documentation lives. |
| `02-repo-map.md` | Every repository that carries the name, its role, and the cleanup that would end the confusion. |
| `03-asset-inventory.md` | Current asset sources, roles and known typography drift. |
| `04-url-map.md` | The 33 live URLs on vivary.vercel.app and what should happen to each when this site replaces it. |
| `05-zo-asset-brief.md` | Current asset reuse brief. Replaces the old generation instructions. |
| `06-claude-design-prompt.md` | Current design handoff pointing to the single brand authority. Replaces the old identity-generation prompt. |
| `07-site-design-and-motion.md` | The candidate 9 home page of 2026-09-13, superseded on 2026-09-16 by the design canvas in `docs/design/`. Kept as the record of how the visual system was chosen. |
| `system/` | The delivered brand system: tokens, marks, lockups, wordmark, app icon, hero, social, org hero, brand sheet, fonts, and the design agent's notes. Source of truth for every asset, including the approved mascot rules and `mascot-manifest.v1.json`. |
| `08-product-description.md` | The concise product description for the site, written for people and quotable by search and answer engines. |
| `09-humans-and-agents.md` | The site is read by humans and agents alike. What agents actually read, why llms.txt is not it, and what the site needs. |
| `images/` | Screenshots of the candidate 9 page and a rendered palette sheet, used to brief the design agent. Historical. |

## Rules these files follow

- Product claims come from `src/content/facts.ts` and the program documents in
  `vivary-dev/vivary` on `dev`. Nothing here adds a claim without a source.
- The app is in development with a dated, unsigned Windows preview. Keep public release evidence separate from newer development capabilities.
- Copy follows the voice rules in `AGENTS.md`.

## Status of the underlying facts

- Public preview availability was verified on 2026-10-03 against release `desktop-preview-2026-09-22` in `vivary-dev/vivary`. See `08-product-description.md` and `src/content/facts.ts` for current boundaries.
- Earlier research used product commit `b81dcd7`; those dated notes are historical, not current release claims.
- Registry versions checked live on 2026-09-16. See `01-what-vivary-is.md`.
- Live site crawled on 2026-09-16. See `04-url-map.md`.
