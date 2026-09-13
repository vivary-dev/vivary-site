# Devlog

Newest entry first. One entry per working session or per merged branch, whichever is smaller. Keep it honest: what broke matters more than what worked.

Template:

```
## YYYY-MM-DD  <branch or "session">
**Did:** one or two lines.
**Broke / surprised me:** the thing that cost time.
**Decided:** any choice future-me should not relitigate.
**Next:** the first thing to do next time.
```

---

## 2026-09-13  session
**Did:** Rebuilt the scaffold on Next.js 16.3.5, Tailwind 4, shadcn 4.21.0 (Base UI), pnpm. Added button, card, badge, separator, sheet, navigation-menu. Pinned every dependency exactly and wrote `scripts/publish-scan.mjs`, which checks all 655 resolved packages. Rewrote AGENTS.md with the truth rules, design bar, and tool table.
**Broke / surprised me:** Pinning `package.json` after pnpm wrote the lockfile made `--frozen-lockfile` refuse, so the lockfile was regenerated once. shadcn 4 pulls a package named `cn`. It is shadcn-ui's own, attested, 1.8M downloads a month. The host publish scanner skips symlinks and sees nothing in a pnpm tree, hence the lockfile-based scan. That scan flagged `@tybys/wasm-util` (published today, no attestation) and `open` (two days old, no attestation), both transitive. Both are pinned back through pnpm overrides until an attested or older release exists.
**Decided:** The old Astro site is inspiration only. Dither Kit files get reviewed in-tree and its CLI never runs in CI. Umami cannot self-host on Zo (no Docker, no Postgres), so the instance is undecided. Hosting is undecided.
**Next:** Three landing candidates on branches off `dev`.

---

## 2026-09-09  session
**Did:** Scaffolded the project. Added README, AGENTS.md, plan, branching guide, this devlog, and the `dev` branch.
**Broke / surprised me:** Nothing yet.
**Decided:** `main` is production, `dev` is where work happens, feature branches come off `dev` with `feat/` `fix/` `chore/` style prefixes. Rules in AGENTS.md.
**Next:** First real branch.
