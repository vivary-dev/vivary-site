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

## 2026-09-16  docs/brand-brief

**Did:** Read every Vivary repository, the live site, the registries, and the
private Windows preview to build one account of what Vivary is. Wrote the
brand and marketing working set under `docs/brand/`: product definition and
vocabulary, repository map with cleanup steps, asset inventory with verdicts,
URL map for the vivary.vercel.app handover, the Zo asset brief, and the prompt
for Claude Design. No source, dependency, or page changed.

**Broke / surprised me:** Nothing public says Vivary is a desktop app in
development. The first draft of these docs split Vivary into an old and a new
product. Jeff corrected that: one product, the workspace commands are a part
of it. The docs were rewritten from the product guide. Three visual systems coexist
and no tagline, palette, or vector logo is designated. No application icon
exists for `Vivary.exe`. The Zo connectors and the preview browser were both
unavailable in the session, so assets were briefed, not generated, and the
home page was built but not screenshotted.

**Decided:** Nothing new. The four brand decisions in
`docs/brand/05-zo-asset-brief.md` are Jeff's. Candidate 9 stays locked and is
the reference for the new brand.

**Verification:** Frozen install, publication scan (674 packages, none
flagged), and static build passed on this branch. Registry versions and the
live sitemap were checked on 2026-09-16.

**Next:** Jeff makes the four decisions. Run the Claude Design prompt. Then the
GitHub cleanup in `docs/brand/02-repo-map.md` once approved.

---

## 2026-09-15  docs/day-end-state

**Did:** Reconciled foundations status with merged PR #4 at 5ddff98. Updated the
plan, optional analytics wording, and scan-first command order. Removed the
incorrect claim that private Vivary-New development is public. Pinned the engine
install example to its dated verified creator version.

**Broke / surprised me:** Current install instructions mixed the August 15
verification baseline with an unpinned command. September 15 registry metadata
reports PyPI create-vivary 0.4.3, while the documented baseline is 0.4.2.
The pin preserves that boundary. It does not claim a new installation proof.
The longer command exposed horizontal clipping on desktop. It now wraps using
the same rule as the phone layout, without changing the locked page structure.

**Decided:** Foundations are merged. Cloudflare, Umami, DNS, and publication
remain unperformed. Candidate 9 remains locked. Current app status comes from
the product repository. Native conversation persistence and Windows GUI
acceptance remain open.

**Verification:** The publication scan checked 674 resolved packages with none
flagged before dependency-backed commands. The previous dev CI run
34862012409 passed for the foundations merge. This branch passed frozen install, lint, TypeScript, static build, and shadscan.
Shadscan remains 46/100 with the existing recorded static-site decisions.
Three visual passes checked desktop composition, the real 390px layout, and
the complete pinned command/status block at both widths. No page overflow or
analytics script appeared in the unconfigured preview. Candidate 9 was not redesigned.

**Next:** Follow the product's remaining acceptance before any website
publication. Read the live PR state before taking on site work.

---

## 2026-09-14  feat/site-foundations review fixes
**Did:** Fixed the four confirmed PR review findings. CI now checks pull requests
into both long-lived branches and scans lockfile publication metadata before
installing dependencies. The screenshot helper declares and bootstraps its pinned
Playwright runtime and applies home-only waits only to the home route. A
follow-up review aligned both README command sequences with the CI boundary:
the publication scan runs before installation or dependency-backed commands.

**Broke / surprised me:** The original capture helper used Playwright 1.52.0 and
a browser executable from Zo's global cache without declaring either one. The
helper now uses a reusable temporary virtual environment and Playwright's own
browser resolution. Bootstrap downloads happen only when the pinned runtime or
its Chromium revision is absent.
The pinned [Playwright 1.52.0](https://pypi.org/project/playwright/1.52.0/),
[pyee 13.0.1](https://pypi.org/project/pyee/13.0.1/),
[greenlet 3.2.4](https://pypi.org/project/greenlet/3.2.4/), and
[typing-extensions 4.16.0](https://pypi.org/project/typing-extensions/4.16.0/)
wheels were published on 2025-04-30, 2026-02-14, 2025-08-07, and 2026-07-02.
PyPI reports no known vulnerabilities for those releases. The bootstrap uses
only wheels, so it never executes an sdist build or package install hook.


**Decided:** Generic routes wait for navigation and fonts. The home route also
waits for its footer and completed memory scene before capture.

**Verification:** Publication scan, lint, TypeScript, production build, shell
syntax, embedded Python syntax, README publication scan, and diff whitespace
passed. A fresh temporary
environment bootstrapped Playwright 1.52.0. Real home and generated-404 captures
each produced desktop, full-page, and phone images. The 404 completed without
waiting for home-only elements.

**Next:** Let PR CI verify the review-fix commit before merge.

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
The first PR CI run exposed a clean-checkout type error: Next's generated
`LayoutProps` existed after local development but not before CI's build. The root
layout now types its only input, `children`, with ReactNode directly. No build
step or generated-type dependency was added to make typechecking pass.

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
