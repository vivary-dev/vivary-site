# Optional Cloudflare Pages deployment

This target is staged for `https://www.vivaryagent.xyz` and
`https://mcp.vivaryagent.xyz/`. A source build or merge does not make either
hostname live. The existing GitHub publisher and its canonical default remain
intact until the rollout coordinator verifies an approved cutover.

## Build and content ownership

Use Node 24, pnpm 10.33.2 and Python 3. Python uses only its standard library.
Run the publication scan before frozen installation, then the normal checks.

```sh
node scripts/publish-scan.mjs .
pnpm install --frozen-lockfile
pnpm lint
pnpm exec tsc --noEmit
pnpm test:transport
VIVARY_DEPLOY_TARGET=cloudflare NEXT_PUBLIC_SITE_URL=https://www.vivaryagent.xyz NEXT_PUBLIC_PREVIEW=0 pnpm build
NEXT_PUBLIC_SITE_URL=https://www.vivaryagent.xyz node scripts/verify-public-export.mjs
node scripts/verify-edge-export.mjs
```

Publish directory: `out`. This is one Pages project using advanced-mode
`_worker.js`. No Next server, database, model, external fetch proxy, paid service
or new npm dependency is required. The normal `pnpm build` still targets
GitHub Pages. `scripts/deploy-site.sh` remains GitHub-only.

The JSX and `facts.ts` remain the content authority. After Next exports HTML,
`scripts/export-docs.py` converts each page's semantic main content to Markdown:

| HTML | Markdown |
| --- | --- |
| `/` | `/index.md` |
| `/commands/` | `/commands/index.md` |
| `/what-is-vivary/` | `/what-is-vivary/index.md` |

The conversion preserves headings, paragraphs, lists, definition lists, links,
code whitespace, source anchors and meaningful image alternatives. Navigation,
scripts and aria-hidden illustrative detail are omitted. The illustration's
accessible description stays. A missing main or ambiguous top heading fails
the build. The MCP catalog embeds these exact Markdown bytes and records HTML
hashes for export verification. Generated content is never edited manually.
The build substitutes the chosen canonical origin in the existing agent guide.

## Operator settings before enabling traffic

The rollout coordinator owns these settings and all account, DNS and deployment
actions. Do not run a deployment just because the source checks pass.

| Setting | Value and purpose |
| --- | --- |
| Build command | The Cloudflare build command above |
| Output directory | `out` |
| `SITE_ENABLED` | Exact string `true` enables the website handler |
| `MCP_ENABLED` | Exact string `true` enables public documentation MCP |
| `MCP_ALLOWED_ORIGINS` | Comma-separated exact HTTPS origins, initially `https://www.vivaryagent.xyz,https://mcp.vivaryagent.xyz` |
| `SITE_PREVIEW_HOST` | Optional exact Pages hostname for operator testing, such as `project.pages.dev`. That host returns noindex and a deny-all robots response |
| Runtime → Fail open / closed | **Fail closed**, required before MCP exposure |

Missing enable flags return 503 on Function endpoints. Excluded public assets
bypass those flags, so these are not whole-site privacy controls. A missing or malformed Origin allowlist also
disables MCP. Native clients without an Origin are allowed because these are
public documents. Browser clients must match the exact allowlist. No wildcard
or arbitrary client-supplied origin is reflected. Add other browser origins
only after review. No cookies or credentials are accepted or needed.

Cloudflare's free request allowance is finite. Fail-open behavior can bypass
Functions and serve static HTML at the MCP hostname when that allowance is
exhausted. The operator must select **Fail closed** in the project settings.
This cannot be guaranteed by application code that is no longer running.
Do not treat an environment flag as a substitute for the platform setting.
Static assets under `/_next/` and `/brand/`, and named icons, bypass Functions.
These public assets may also be fetched on the MCP hostname. MCP protocol
requests belong exclusively at its root endpoint and never fall through to HTML.

## HTTP behavior

The three website paths offer HTML and `text/markdown`. Accept quality values,
media-range specificity and explicit exclusions are honored. HTML wins ties.
Unsupported preferences receive 406. HEAD returns the selected GET headers
without a body. Only GET and HEAD serve website documents.

Website Function responses carry canonical, alternate-format and agent-guide Link
headers. They use `Vary: Accept` and `Cache-Control: no-store`, and discard
upstream entity validators, preventing HTML/Markdown cache confusion. This is
a conservative initial policy. Do not add edge caching without variant tests.
Public responses declare `Content-Signal: search=yes, ai-train=no`. `ai-input`
remains unspecified. Existing four training-bot exclusions stay in robots.txt.
Preview responses stay noindex and do not emit the public Content-Signal.

## MCP compatibility and limits

This small public server implements **2025-11-25 Streamable HTTP**, not the
newer 2026-07-28 per-request discovery protocol. An initialize request negotiates
2025-11-25. Subsequent requests require that exact MCP-Protocol-Version header.
Clients that support only the newer protocol need a compatibility mode or can
fetch the same public Markdown directly. No claim of universal MCP-client
compatibility is made.

The endpoint supports initialize, ping, resources/list, resources/read and an
empty resources/templates/list. It accepts initialized/cancelled notifications
with HTTP 202. It exposes only three fixed canonical URIs. Listed resources and read results
include `_meta["xyz.vivaryagent/source-html-sha256"]`, the SHA-256 of the exact
exported source HTML. This identifies the content revision without inventing
a modification date. Unknown methods and
unlisted URIs return JSON-RPC errors. There are no tools, subscriptions, sessions,
SSE streams, prompts, user files, account access or model calls. GET and DELETE
receive 405. POST must allow application/json and text/event-stream, even though
this server selects JSON responses. Request bodies are capped at 16 KiB while
streaming, must be uncompressed UTF-8 JSON and cannot be batches. MCP responses
are never cached. Origin validation applies before method handling.

## Cutover and rollback evidence

Before cutover, review the exact source revision, run both export gates and
check the compiled worker with real Request/Response objects. Inspect desktop
and phone renders. The operator should then test the deployed Pages hostname,
custom-domain TLS, HTML/Markdown/HEAD headers and full MCP initialize/list/read
sequence from outside the hosting account. Check the platform fail-closed setting
and asset exclusions, then verify the final canonical, sitemap, robots and
agent-guide origins. DNSSEC, existing mail records and registrar settings remain
operator-owned and must be preserved through the approved DNS plan.

Keep the existing GitHub publication available as the rollback target until
cutover succeeds. This source does not create redirects, alter DNS, promote
source main or change any desktop application release. After live approval,
record the Pages deployment ID, source commit, actual headers and response hashes.

Primary references:

- [Pages advanced mode](https://developers.cloudflare.com/pages/functions/advanced-mode/)
- [Routing and fail-closed behavior](https://developers.cloudflare.com/pages/functions/routing/)
- [2025-11-25 transport](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports)
- [2025-11-25 lifecycle](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle)
- [Current version compatibility](https://modelcontextprotocol.io/specification/latest/basic/versioning)
