# Repository map and cleanup

Read on 2026-09-16 with the GitHub CLI as Jeff-Kazzee. Orgs: `vivary-dev`,
`wazootech`, `The-Little-AI-Company`.

## The Vivary repositories

| Repo | Visibility | Default branch | Role today | Verdict |
| --- | --- | --- | --- | --- |
| `vivary-dev/Vivary-New` | private | `main`, work on `dev` | The active product. Desktop app, Workbench, bundled engine. Issues and delivery live here. Created 2026-09-13. | Active. Read `dev`. |
| `vivary-dev/vivary` | public, MIT | `dev` | The original tools, published packages, public docs, and the live Astro site. 4 stars, 1 fork. | Engine and legacy site. Keep public. Needs a notice about the successor. |
| `vivary-dev/vivary-site` | private | `dev` | This repo. The new marketing site. | Active. |
| `vivary-dev/vivary-workbench-handoff` | private | `docs/context-compaction-policy` | Frozen source checkpoint from 2026-09-11. Its handoff PR #4 closed unmerged on 2026-09-13. Vivary-New calls it a dead salvage path. | Archive. |
| `vivary-dev/.github` | public | `main` | Org profile. Hero SVG and README from 2026-06-29 still say "Typed memory and gates for agent workspaces" and list tropo, ozone, exo with no strato. | Rewrite when the new brand lands. |
| `Jeff-Kazzee/vivary-landing-page` | private, archived | `feat/astro-landing-page` | June 2026 landing page with its own DESIGN.md and PRD. Points at a repo URL that no longer exists. | Leave archived. Reference only. |
| `Jeff-Kazzee/habitat-vivary` | public | `main` | Docker sandbox for CLI coding agents, exported 2026-09-10. Shares the name, contains no Vivary code. Vivary-New used Habitat as an approved build environment. | Keep. Not part of the product family. Consider a README line saying so. |

Related but not Vivary: `Jeff-Kazzee/littleagent` (public source identity for
the Agent-Native GUI the Workbench is built on), `The-Little-AI-Company/harnessmax`
(legacy implementation, removal deferred), `Jeff-Kazzee/loam`, `braincheck`,
`throughline`, `flywheel` (read-only predecessors folded into the engine).

## What makes it confusing

1. The GitHub description of `vivary-dev/vivary` ("Typed memory, search, and
   gates for AI-agent workspaces") is a generation behind its own README.
2. `vivary-dev/vivary` says "Deprecated: None" in `docs/MIGRATION-STATUS.md`
   and never mentions Vivary-New, a desktop app, or a successor. A visitor has
   no way to learn the direction changed.
3. `vivary-dev/vivary` still carries the whole 36-ticket GUI program under
   `docs/product/multi-project/`, which is now developed in Vivary-New.
   Vivary-New also carries a full copy of the old `site/` and `docs/`.
4. The org profile, the live site, the README in Vivary-New, and this site use
   four different taglines and three different visual systems.
5. `vivary-workbench-handoff` looks like a third product repo. It is a dead
   checkpoint.
6. Twenty stale `chore/stats-*` branches sit on `vivary-dev/vivary`. Issue #212
   there already asks to eliminate stale branches and release metadata.
7. Stats on the public site stopped on 2026-07-06. The chart on the homepage
   shows 3 stars.

## Cleanup, in order

These are outward-facing and need Jeff's go-ahead. None is done.

1. Archive `vivary-dev/vivary-workbench-handoff`. Set its description to
   "Archived checkpoint. Active development: vivary-dev/Vivary-New."
2. Update the GitHub description of `vivary-dev/vivary` to match its README
   and add one README paragraph: the tools remain published and supported as
   the engine, and a desktop application is in development.
3. Delete the twenty `chore/stats-*` branches on `vivary-dev/vivary` and fix
   or stop the daily stats workflow so the public chart is either current or
   gone.
4. Rewrite `vivary-dev/.github/profile/README.md` and replace
   `profile/assets/vivary-hero.svg` once the new logo exists. Until then, at
   least drop the stale tagline and add strato to the package list.
5. Add a README line to `habitat-vivary` saying it is a development sandbox,
   not part of the Vivary product.
6. When this site publishes: point the `vivary-dev` org blog URL at the new
   domain and retire `site/` in `vivary-dev/vivary` per its ticket 25.

## Domain

The live site is on `vivary.vercel.app`. The support email on that site is
`support@vivary.dev`. This site targets Cloudflare Pages. No document names the
production domain. Jeff owns that decision and the DNS.
