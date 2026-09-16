# Vivary brand and marketing working set

Written 2026-09-16 from a full read of every Vivary repository, the live site,
the public registries, and the private Windows preview. This folder is the
shared starting point for marketing copy, brand assets, and the GitHub cleanup.
It records what exists, what is decided, what is stale, and what still needs a
decision from Jeff.

| File | What it answers |
| --- | --- |
| `01-what-vivary-is.md` | What Vivary is, from the product guide and specification. Six steps, sixteen parts, vocabulary, decisions, status, and where the documentation lives. |
| `02-repo-map.md` | Every repository that carries the name, its role, and the cleanup that would end the confusion. |
| `03-asset-inventory.md` | Every logo, image, palette, and typeface that exists today, with a keep or retire verdict. |
| `04-url-map.md` | The 33 live URLs on vivary.vercel.app and what should happen to each when this site replaces it. |
| `05-zo-asset-brief.md` | The brief for generating the new brand assets with Zo: decisions first, then one spec per asset. |
| `06-claude-design-prompt.md` | The prompt to paste into Claude Design, with GitHub links to the files above and the public references. |
| `07-site-design-and-motion.md` | The locked home page in full: how it was chosen, palette, type, layout, every section, and every animation with its timings. |
| `08-product-description.md` | The concise product description for the site, written for people and quotable by search and answer engines. |
| `09-humans-and-agents.md` | The site is read by humans and agents alike. What agents actually read, why llms.txt is not it, and what the site needs. |
| `images/` | Screenshots of the locked home page at desktop, full length, and phone, cropped components, and a rendered palette and type sheet. Attach these to any design brief. |

## Rules these files follow

- Product claims come from `src/content/facts.ts` and the program documents in
  `vivary-dev/Vivary-New` on `dev`. Nothing here adds a claim without a source.
- The app is in development. Nothing here implies a download or a release date.
- Copy follows the voice rules in `AGENTS.md`.

## Status of the underlying facts

- Product repo read at `vivary-dev/Vivary-New` commit `b81dcd7` on `dev`.
  Codex was merging documentation into `dev` the same day, so re-read
  `docs/product/multi-project/desktop-acceptance-status.md` before quoting status.
- Registry versions checked live on 2026-09-16. See `01-what-vivary-is.md`.
- Live site crawled on 2026-09-16. See `04-url-map.md`.
