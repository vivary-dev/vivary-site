# Vivary website

The marketing site for the new Vivary, the desktop application where agents
work from files you own. It markets the app and presents the library that
ships today as the engine underneath. Started from scratch on 2026-09-13 to
replace the Astro site at vivary.vercel.app. It goes live with the app.

## Stack

Next.js 16 (App Router, TypeScript), Tailwind CSS 4, shadcn/ui 4 on Base UI,
pnpm 10, Node 24. Imagery through Dither Kit, icons through icons0, UI audits
through shadscan, analytics through Umami.

## Run it

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Then open the printed local URL. `pnpm build` produces the production build
and `pnpm lint` runs ESLint.

## Layout

- `src/app/` holds routes and the root layout.
- `src/components/ui/` holds shadcn components. Add more with the pinned CLI
  named in `AGENTS.md`.
- `public/` holds static assets and imagery.
- `scripts/` holds the branch helper, the supply-chain scan, the dev-server
  starter, and the headless screenshot script. See AGENTS.md, "Seeing your work".

## Rules

`AGENTS.md` is the law for anyone or anything editing this repo: truth rules
for product claims, the design bar, the tool table, dependency gates, and the
branch model. `DEVLOG.md` records every session.

## Status

One page, the home route, locked in on 2026-09-13. Static export to `out/`
for Cloudflare. Not published yet.
