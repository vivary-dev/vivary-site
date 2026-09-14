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

## 2026-09-14  feat/site-foundations
**Did:** Tuned the locked home page, added Cloudflare Pages configuration, PR CI,
optional Umami, two icons0 Lucide icons, and two static shieldcn README badges.
Cloudflare, Umami, DNS, and publication remain untouched. All work ran over SSH
in the existing Zo website checkout. No product-repository file was changed.

**Broke / surprised me:** The dev-server health check still requested the removed
`/candidates/` route, and the capture scripts lacked executable bits. The old
capture used fixed window heights and could capture streaming content before it
settled. The existing scripts now check `/`, wait for fonts and the settled
scene, and capture real desktop and phone viewports plus the actual full page.
No new screenshot framework or package was added.

**Visual critique:**
1. The baseline deck was centered well below the memory scene's top. Aligned the
   row at the top and added a folder/file object inside each existing lower
   intro. Section order, columns, copy, fonts, and the fiction frame stayed intact.
2. The first tune put the deck above the scene's file-header line and made the
   icon strokes too heavy. Added desktop inset and reduced the object strokes.
3. Inspected the static export at 1440x900 and real 390px and 360px viewports.
   Increased small navigation/footer link hit areas through padding. Verified
   keyboard focus, reduced motion, no overflow, and both intro objects. At 1440,
   the headline, deck, complete memory scene, and primary action fit inside 900px.

Before: `/tmp/shots/site-foundations-before-settled-hero.png`.
After: `/tmp/shots/site-foundations-after-hero.png`.
Each prefix also has full-page and mobile captures. Local measurements and
reports remain in `.tmp/`, outside source commits.

**Verification:** Frozen install, lint, `pnpm exec tsc --noEmit`, static build,
publication scan, and pinned shadscan passed. The scan checked 674 resolved
packages with no flags. `package.json` and the lockfile match `dev` exactly.
The dated overrides remain in place until their recorded removal dates.
Umami's actual component passed development, zero-variable, each single-variable,
and configured-production cases. The unconfigured static export made no tracker.
Independent source review approved the final implementation.

**Audit decisions:** shadscan 0.17.0 returned 46/100 and a successful exit. Its
JSON report remains visible as a CI artifact. These findings are not suppressed:
- Command menu/shortcut, theme provider/shortcut, and toast provider: not added.
  This is a locked, fixed-theme marketing page with anchor navigation and no
  mutations. Those app-shell controls would add unrelated UI and dependencies.
- Empty states and mobile navigation menu: no data-backed collection or separate
  application navigation exists. The page keeps its anchor links and footer.
- Custom error/not-found routes: deferred. The static export includes Next's
  generated 404 and framework error handling. This job adds no data routes.
- Social preview and public indexing files: deferred to publication preparation.
  The site stays unpublished until the app ships.
- Rendered contrast, overflow, landmark names, and pointer targets: verified in
  the exported page. Muted text contrast is at least 4.72:1, no visible link target
  is smaller than 24px, navigation is named Site, and no horizontal overflow occurs.

**Decided:** The icons0 registry is confirmed from its pinned first-party source
linked in AGENTS.md. Its two generated SVGs were reviewed and retain Lucide's
license. A repository-wide website license is unspecified, so the badge says so.
The CI badge labels PR checks and links to results instead of pretending to be
live status. README records Cloudflare's build command separately from Wrangler's
Pages output setting, following the cited Cloudflare documentation.

**Next:** Review this PR into `dev`. Jeff chooses the Umami instance and creates
Cloudflare/DNS resources when publication is authorized. His request for formatted
file viewing, editing, and explicit Save belongs to the separate product work,
not the website's locked demonstration.

---

## 2026-09-13  feat/landing-candidates
**Did:** Nine landing candidates behind one index, all on Zo over ssh. Five parallel first-round pages, then a flagship built with a screenshot-and-critique loop, then two hyperstition variants, then candidate 9 as the blend of 7 and 8. Jeff locked 9. Promoted it to the home route, deleted the other eight and the switcher, static export builds to `out/` at 1.4 MB.
**Broke / surprised me:** The first five were built blind and read as brochures. The turn came from giving builders eyes: `/tmp/shot.sh` renders any route headlessly with Playwright's Chromium at 1440 and full height, and a `?still=1` switch freezes animations and shows every reveal. Headless Chrome clamps window widths under about 500px, so phone layout is verified with a real 390px Playwright viewport, not the script. The Zo plan's ten hosted-service slots are full, so previews run as a detached dev server on port 3177 behind an ssh forward.
**Decided:** The site markets the desktop app, with the shipped library as the engine underneath; claims come from `facts.product` and cite design.md. Three typefaces with one job each: Big Shoulders for the claim, Fraunces only where the file speaks, Geist Mono for the record. Amber is reserved for what the workspace recorded. The fiction is framed once, in three sentences.
**Next:** Two tunes on the home page: the hero deck sits low against the scene, and two lower section intros want one visual object each. Then the site-foundations work: Cloudflare config, CI, Umami behind env, icons0 registry, badges.

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
