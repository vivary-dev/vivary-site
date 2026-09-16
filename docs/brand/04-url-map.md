# URL map for the handover from vivary.vercel.app

Crawled from the live sitemap on 2026-09-16. `AGENTS.md` requires that when
this site replaces the Astro site, every path it served is preserved or
redirected. Ticket 25 in the product program owns the handover.

The new site has one route today. Nothing below is built. This is the plan to
decide against.

## Marketing pages

| Live path | Title | Proposed handling |
| --- | --- | --- |
| `/` | Vivary, a world your agents can understand | Replaced by the new home page. |
| `/roadmap/` | Prove the loop before expanding the surface (dated August 2026) | Redirect to the new status section, or rewrite as the app roadmap. Stale as is. |
| `/blog/` | Blog index | Keep as a route. Four posts exist. |
| `/blog/why-i-built-vivary/` | Why I built Vivary, 2026-06-10 | Keep. Still true in spirit. Add a note about the app. |
| `/blog/what-is-an-agent-native-workspace/` | 2026-06-12 | Keep. |
| `/blog/harnesses-explained/` | 2026-06-15 | Keep. The word "harness" is core vocabulary. |
| `/blog/run-vivary-with-local-models/` | 2026-06-17 | Keep. Check commands against 0.4.x. |

## Engine documentation, 25 pages generated from `docs/` in `vivary-dev/vivary`

These document the original CLI. The new site should not rebuild them. Two
sane options: keep serving them from an `/engine/` or `/docs/` prefix with
redirects from the old paths, or leave them on a docs subdomain built from the
engine repo and redirect the old root paths there.

| Live path | Page |
| --- | --- |
| `/concepts/` | What is Vivary? |
| `/getting-started/` | Getting started |
| `/walkthrough/` | Historical proof (0.3.1) |
| `/commands/` | Command reference |
| `/learn-by-doing/` | Vivary guides |
| `/guides/create-workspace/` | Create a Vivary workspace |
| `/guides/connect-agent/` | Connect an AI agent |
| `/guides/get-context/` | Get bounded context |
| `/guides/write-record/` | Write a governed record |
| `/guides/adopt-project/` | Adopt an existing project |
| `/guides/verify-recover/` | Verify and recover |
| `/mcp/` | MCP adapter |
| `/skills/` | Agent skills |
| `/active-context/` | Active context |
| `/llm-active-context/` | LLM active-context guide |
| `/semantic-memory/` | Optional semantic memory |
| `/white-paper/` | White paper |
| `/howto/` | Advanced recipes |
| `/signals/` | Public signals (stale stats) |
| `/release-workflow/` | Release workflow |
| `/architecture/` | Architecture |
| `/migration-status/` | Migration status |
| `/decisions/` | Decisions |
| `/obsidian/` | Obsidian (optional) |
| `/changelog/` | Changelog |

## Files, not pages

| Live path | Handling |
| --- | --- |
| `/llms.txt`, `/llms-full.txt` | Regenerate for the new product. The current ones describe the CLI only. |
| `/robots.txt`, `/sitemap-index.xml`, `/sitemap-0.xml` | Regenerate. |
| `/favicon.png`, `/media/vivary-mark.png` | Replace with the new mark. |
| `/media/hero-living-strata.webp` | Was the OG image. Redirect to the new social image or let it 404 after a grace period. |
| `/fonts/*.woff2` | Drop. New site uses different type. |
| `/usage-snapshot.svg` | Drop. |

## Already dead on the live site

`/brand/`, `/faq/`, `/product-roadmap/` were retired on the engine site. Leave
them dead. FAQ lives at `/#faq` on the live site. If the new home page has a
FAQ, keep that anchor.

## Not yet decided

- The production domain. Nothing names it. `support@vivary.dev` is the only
  hint.
- Whether engine docs live on this site or stay with the engine repo.
- Whether the blog moves.
