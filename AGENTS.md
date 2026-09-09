# AGENTS.md

Project: marketing site for the new Vivary.

- Verify feature claims against the Vivary repo (https://github.com/vivary-dev/vivary) or Jeff before writing them.
- Copy in Jeff's voice: no em dashes, no AI tells, no hype words. Run unslop.
- Public-context guardrail: nothing about Jeff's location or living situation.
- Zo Site. Publishing needs Jeff's approval. Published sites serve `dist/` live; build in a temp dir, never in a published copy.

## Git and devlog

- Branching: `main` is production, `dev` is integration, work branches come off `dev` as `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`, `test/`, `hotfix/` (off main). Full rules in BRANCHING.md. Create branches with `scripts/branch.sh <type> <slug>`.
- Never commit to `main` directly. Never rebase `dev` or `main`.
- Append a DEVLOG.md entry (newest first, use the template) before opening any PR and at the end of any working session.
