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

- Verify every product claim against the product repo (origin
  `vivary-dev/Vivary-New`, checked out at
  `/home/workspace/Projects/vivary-integration`) or against Jeff before writing
  it. The release table in that repo's `README.md` is the published install
  truth. The desktop GUI is in development and unreleased. Never describe it
  as installable, and never describe a pending runtime as runnable.
- Copy in Jeff's voice: plain sentences, no em dashes, no semicolons in prose,
  no marketing adjectives, no AI tells. Run the unslop rules before commit.
- Public-context guardrail: nothing about Jeff's location or living situation.
- Publishing needs Jeff's approval per deploy. The final site is hosted on
  Cloudflare as a static export (`output: "export"` in `next.config.ts`,
  decided 2026-09-13). Previews are not hosted on Zo. Do not add server-side
  routes or image optimization that a static export cannot serve.

## Design bar

- The bar is a site a marketing professional designed. One strong hero with
  real imagery, one first sentence a stranger understands, one primary call
  to action, and everything around it quiet.
- Imagery comes from Dither Kit (dithered charts, avatars, gradient washes)
  and from assets checked into `public/`. No stock photos and no gradient
  blob defaults. Zo's provider-backed image generation is down, so generated
  imagery is produced elsewhere and checked in.
- Icons come from icons0 collections through the shadcn registry, or from
  lucide. Pick one collection per surface and keep it.
- Quality floor: responsive to 360 pixels, visible keyboard focus, reduced
  motion respected, contrast passes, no horizontal page scroll.

## Tools and the rule for each

| Tool | Use | Rule |
| --- | --- | --- |
| shadcn/ui 4.21.0 | Components in `src/components/ui` | `pnpm dlx shadcn@4.21.0 add <name>`. Never `@latest`. Review every added file before commit. |
| Dither Kit | Hero and section imagery | Add through the shadcn registry with the pinned CLI. The packages are young and low-download, so review every added file line by line and never run its CLI in CI. |
| icons0 | Icons | `pnpm dlx shadcn@4.21.0 add @icons0/<collection>/<name>`. Review the SVG that lands. |
| shadscan 0.17.0 | Deterministic UI audit | `pnpm dlx @shadscan/cli@0.17.0` before any PR. Fix findings or record in the devlog why not. |
| shieldcn | README badges | Optional. Static SVG badges in `README.md` only. |
| Umami | Analytics | One script tag with the website id from an environment variable, disabled in development. The instance is undecided. Zo has no Docker or Postgres and Cloudflare has no Postgres, so Umami Cloud is the likely instance. No cookies and no second analytics tool. |

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
pnpm dev
pnpm build
pnpm lint
node scripts/publish-scan.mjs .
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
