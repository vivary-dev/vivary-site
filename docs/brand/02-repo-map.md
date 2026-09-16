# Repository map and cleanup

Read on 2026-09-16 with the GitHub CLI as Jeff-Kazzee. Orgs: `vivary-dev`,
`wazootech`, `The-Little-AI-Company`.

## The Vivary repositories

| Repo | Visibility | Default branch | Role today | Verdict |
| --- | --- | --- | --- | --- |
| `vivary-dev/Vivary-New` | private | `main`, work on `dev` | The active product. Desktop app, Workbench, bundled workspace commands. Issues and delivery live here. Created 2026-09-13. | Active. Read `dev`. |
| `vivary-dev/vivary` | public, MIT | `dev` | Publishes the workspace command packages the app bundles (`create-vivary`, `tropo`, `strato`, `ozone`, `exo`) and hosts the current site at vivary.vercel.app. 4 stars, 1 fork. | Keep public as the package source. Its site is being replaced by this repo. Needs a notice that the app is in development. |
| `vivary-dev/vivary-site` | private | `dev` | This repo. The new marketing site. | Active. |
| `vivary-dev/vivary-workbench-handoff` | private | `docs/context-compaction-policy` | Frozen source checkpoint from 2026-09-11. Its handoff PR #4 closed unmerged on 2026-09-13. Vivary-New calls it a dead salvage path. | Archive. |
| `vivary-dev/.github` | public | `main` | Org profile. Hero SVG and README from 2026-06-29 carry a stale tagline and describe only the command packages. | Rewrite when the new brand lands. |
| `Jeff-Kazzee/vivary-landing-page` | private, archived | `feat/astro-landing-page` | June 2026 landing page with its own DESIGN.md and PRD. Points at a repo URL that no longer exists. | Leave archived. Reference only. |
| `Jeff-Kazzee/habitat-vivary` | public | `main` | Docker sandbox for CLI coding agents, exported 2026-09-10. Shares the name, contains no Vivary code. Vivary-New used Habitat as an approved build environment. | Keep. Not part of the product family. Consider a README line saying so. |

Related but not Vivary: `Jeff-Kazzee/littleagent` (public source identity for
the Agent-Native GUI the Workbench is built on), `The-Little-AI-Company/harnessmax`
(legacy implementation, removal deferred), `Jeff-Kazzee/loam`, `braincheck`,
`throughline`, `flywheel` (read-only predecessors folded into the workspace commands).

## What makes it confusing

1. The GitHub description of `vivary-dev/vivary` ("Typed memory, search, and
   gates for AI-agent workspaces") is a generation behind its own README.
2. Nothing public in `vivary-dev/vivary` or on vivary.vercel.app says that
   Vivary is a desktop app in development. A visitor reads only about the
   command packages.
3. `vivary-dev/vivary` still carries the whole 36-ticket product program under
   `docs/product/multi-project/`, which is now developed in Vivary-New.
   Vivary-New also carries a full copy of the current `site/` and `docs/`.
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
   and add one README paragraph: these packages are the workspace commands
   inside Vivary, the desktop application in development, and remain usable
   from a terminal.
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
