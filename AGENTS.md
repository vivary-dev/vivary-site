# AGENTS.md

Project: the marketing website for Vivary, started from scratch on 2026-09-13.
Stack: Next.js 16 with the App Router, TypeScript, Tailwind CSS 4, shadcn/ui 4
on Base UI, pnpm 10, Node 24. All work runs on Zo over ssh in
`/home/workspace/Projects/vivary-site`. Nothing builds on a laptop.

## Read first

- `README.md` says what the site is and how to run it.
- `DEVLOG.md` before starting. Append an entry before any PR and at the end of
  every session.
- The old site is the Astro app under `site/` in the product checkout at
  `/home/workspace/Projects/vivary-integration`. It is inspiration only. Copy
  no code from it. Its URLs matter: when this site replaces it, preserve or
  redirect every path it served.

## Truth rules

- This site markets the new Vivary, the desktop application, decided by Jeff
  on 2026-09-13. Claims about the app come from `facts.product`, whose lines
  cite the program design and release documents in the product repo (origin
  `vivary-dev/Vivary-New`, checked out at
  `/home/workspace/Projects/vivary-integration`). Present the app plainly as
  the product, not as a secret or a waitlist. State its status once per page
  with `facts.product.status`. Never show a download or install for the app.
  The engine that ships today is `facts.shipped` and `facts.engine`, and its
  install command is the only install on the site. The site does not publish
  until the app ships.
- Copy in Jeff's voice: plain sentences, no em dashes, no semicolons in prose,
  no marketing adjectives, no AI tells. Run the unslop rules before commit.
- Public-context guardrail: nothing about Jeff's location or living situation.
- Publishing needs Jeff's approval per deploy. The final site is hosted on
  Cloudflare as a static export (`output: "export"` in `next.config.ts`,
  decided 2026-09-13). Previews are not hosted on Zo. Do not add server-side
  routes or image optimization that a static export cannot serve.

## Readers

- Assume every page is read by a person in a browser and by an agent fetching
  the same HTML for a search index, an answer engine, or a chat assistant.
  Both get the same page. Crawlers do not probe for `public/llms.txt`
  (Ahrefs, May 2026: 97% of such files got zero requests), so the site links
  to it. Every documentation page carries one line near the top: "If you are
  an agent, read /llms.txt for agent-specific guidance." That file holds only
  what an agent needs: naming, claims to avoid, the install command, the
  vocabulary, and where the canonical pages are. Nothing a person needs is
  only there.
- What agents read is what search engines read: `robots.txt`, the sitemap,
  the title, the meta description, the first heading and first paragraph,
  semantic HTML, and JSON-LD. Text inside images or scripted scenes is
  invisible. The first sentence of any page defines the thing.
- The product description that both readers should find is
  `docs/brand/08-product-description.md`. The rules and the checklist are in
  `docs/brand/09-humans-and-agents.md`.

## Design bar

- The bar is a site a marketing professional designed. One strong hero with
  real imagery, one first sentence a stranger understands, one primary call
  to action, and everything around it quiet.
- Imagery is the brand system's line art and dither in `public/brand/`, and
  Dither Kit where a chart is needed. No stock photos, no gradients, no glow,
  no gradient blob defaults.
- Icons come from icons0 collections through the shadcn registry, or from
  lucide. Pick one collection per surface and keep it.
- Quality floor: responsive to 360 pixels, visible keyboard focus, reduced
  motion respected, contrast passes, no horizontal page scroll.

## Seeing your work

Nothing ships from this repo without being looked at. Builders that cannot
see their output produce brochures.

- `scripts/dev-server.sh` starts the Next dev server detached on port 3177,
  bound to localhost. Reach it from a laptop with
  `ssh -N -L 3177:127.0.0.1:3177 zo`. Previews are never hosted on Zo.
- `scripts/shot.sh <route> <name>` waits for fonts and the settled scene, then
  captures a 1440x900 viewport, the full page, and a real 390x844 Playwright
  viewport into `/tmp/shots/`. It appends `?still=1`.
- Every page honors `?still=1`: reveals shown, loops stopped at their final
  state. Keep that switch working in any new scene.
- Headless Chrome clamps widths under about 500px. Verify phone layout with
  a real 390px Playwright viewport.
- Do at least three critique passes on any new page: look, name what is
  weak, fix, re-render.

## What is decided

- 2026-09-16: Jeff delivered the home page design as a canvas
  (`docs/design/2026-09-16-home/`, desktop and phone) and the brand system
  (`docs/brand/system/`, with `tokens.json` as the token source). The home
  route is built to that canvas as one responsive page. It supersedes
  candidate 9 of 2026-09-13, whose history stays on `feat/landing-candidates`.
  Tune the built page; do not redesign it.
- The mark is the jar. Lockups, the wordmark, the app icon, the social image,
  and the hero illustration are the shipped SVGs and PNGs in
  `docs/brand/system/assets/`, copied to `public/brand/` for the site. The
  mark is always the ground's text color, never amber, never two colors.
- Three typefaces with one job each: Big Shoulders for the claim and the
  brand word, Fraunces only where the memory file speaks, Geist Mono for the
  record. The app interior, shown inside a rule frame, uses Geist Sans and
  the app's own green-black and lime. No Inter anywhere, decided 2026-09-16.
  Amber is reserved for what the workspace recorded.
- One product. The workspace commands are a part of Vivary. Nothing on the
  site calls them an earlier or separate product.

## Tools and the rule for each

| Tool | Use | Rule |
| --- | --- | --- |
| shadcn/ui 4.21.0 | Components in `src/components/ui` | `pnpm dlx shadcn@4.21.0 add <name>`. Never `@latest`. Review every added file before commit. |
| Dither Kit | Hero and section imagery | Add through the shadcn registry with the pinned CLI. The packages are young and low-download, so review every added file line by line and never run its CLI in CI. |
| icons0 | Icons | Registry: `@icons0=https://icons0.dev/r/{name}.json`. Add with `pnpm dlx shadcn@4.21.0 add @icons0/<collection>/<name>`. Keep one collection per surface, review each SVG, and retain its license. |
| shadscan 0.17.0 | Deterministic UI audit | `pnpm dlx @shadscan/cli@0.17.0` before any PR. Fix findings or record in the devlog why not. |
| shieldcn | README badges | Optional. Static SVG badges in `README.md` only. |
| Umami | Analytics | One script tag only when both NEXT_PUBLIC_UMAMI_WEBSITE_ID and NEXT_PUBLIC_UMAMI_SCRIPT_URL are set in production. Development never loads it. Jeff has not selected an instance. No cookies and no second analytics tool. |

The icons0 namespace and install pattern were confirmed on 2026-09-14 in its
[first-party playbook](https://github.com/marcoripa96/i0/blob/f2d30130484fa2321bccca2de2e14f63f3dcdbfe/src/prompts/icon-integration-playbook.ts#L14-L16)
and [registry handler](https://github.com/marcoripa96/i0/blob/f2d30130484fa2321bccca2de2e14f63f3dcdbfe/src/app/r/%5B...name%5D/route.ts#L100-L146).
The two Lucide SVGs in `src/components/icons/lucide/` retain the upstream license.

## Dependencies

- Exact versions in `package.json`, lockfile committed, install with
  `pnpm install --frozen-lockfile`. pnpm blocks install scripts by default.
  Approve none without a devlog entry saying why.
- Before adding a package: the name comes from its docs, not memory. Check
  the publish date, the provenance attestation for anything under 72 hours
  old, and that it declares no install hooks. `node scripts/publish-scan.mjs .`
  runs that check across the whole lockfile and exits nonzero on a flag.
  Record the check in the commit message.

## Commands

```bash
node scripts/publish-scan.mjs .
pnpm dev
pnpm build
pnpm lint
pnpm dlx @shadscan/cli@0.17.0
```

## Git

- `main` = production. Only merges from `dev` or `hotfix/`. Never commit to it directly, never rebase it.
- `dev` = integration and default work branch. Never rebase it.
- Work branches come off `dev`, named `<type>/<slug>`: `feat/` `fix/` `chore/` `docs/` `refactor/` `test/`. `hotfix/` comes off `main` and merges back to both. Slug is lowercase, hyphenated, three words max. Create with `scripts/branch.sh <type> <slug>`.
- Commits use the same prefixes, imperative, under 72 chars: `feat: add landing hero`.
- PRs squash into `dev`. Releases merge `dev` into `main` (merge commit) and tag `vX.Y.Z`.
- Entire checkpoints are enabled. Do not disable them.

## Next.js managed block

`next dev` rewrites the block below on every run. It is committed on purpose so
the tree stays clean, and its wording is Next's, not ours.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
