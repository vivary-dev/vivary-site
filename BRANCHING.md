# Branching

Two long-lived branches, everything else is short-lived and comes off `dev`.

```
main   production. Only ever receives merges from dev (or a hotfix).
dev    integration. Default branch for all work. Always deployable to staging.
```

## Working branches

Branch off `dev`, named `<type>/<short-slug>`:

| Prefix | Use for |
|---|---|
| `feat/` | new user-facing behavior |
| `fix/` | bug fix on dev |
| `chore/` | deps, config, tooling, cleanup with no behavior change |
| `docs/` | docs, README, devlog only |
| `refactor/` | code change with no behavior change |
| `test/` | adding or fixing tests |
| `hotfix/` | urgent fix branched off `main`, merged back to both `main` and `dev` |

Slug is lowercase, hyphenated, three words or fewer: `feat/landing-hero`, `chore/bump-vite`, `fix/mobile-nav`.

Create one with the helper:

```
scripts/branch.sh feat landing-hero
```

## Commits

Same prefixes as branch types, imperative mood, under 72 characters:

```
feat: add landing hero
fix: stop nav overlapping on mobile
chore: bump vite to 7.1
```

## Flow

1. `scripts/branch.sh <type> <slug>` (pulls latest dev first).
2. Commit as you go. Add a DEVLOG.md entry before opening the PR.
3. PR into `dev`. Squash merge. Delete the branch.
4. Release: PR `dev` into `main`, merge commit (not squash), tag `vX.Y.Z`.
5. Hotfix: branch off `main`, PR into `main`, then merge `main` back into `dev`.

## Rules

- Never commit directly to `main`.
- Never rebase `dev` or `main`.
- One branch, one purpose. If the slug needs "and", it is two branches.
