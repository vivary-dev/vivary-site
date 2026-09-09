# AGENTS.md

Project: marketing site for the new Vivary.

- Verify feature claims against the Vivary repo (https://github.com/vivary-dev/vivary) or Jeff before writing them.
- Copy in Jeff's voice: no em dashes, no AI tells, no hype words. Run unslop.
- Public-context guardrail: nothing about Jeff's location or living situation.
- Zo Site. Publishing needs Jeff's approval. Published sites serve `dist/` live; build in a temp dir, never in a published copy.

## Git

- `main` = production. Only merges from `dev` or `hotfix/`. Never commit to it directly, never rebase it.
- `dev` = integration and default work branch. Never rebase it.
- Work branches come off `dev`, named `<type>/<slug>`: `feat/` `fix/` `chore/` `docs/` `refactor/` `test/`. `hotfix/` comes off `main` and merges back to both. Slug is lowercase, hyphenated, three words max. Create with `scripts/branch.sh <type> <slug>`.
- Commits use the same prefixes, imperative, under 72 chars: `feat: add landing hero`.
- PRs squash into `dev`. Releases merge `dev` into `main` (merge commit) and tag `vX.Y.Z`.
- Append a DEVLOG.md entry (newest first, template at the top) before any PR and at the end of every session.
