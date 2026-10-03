# Public discovery and agent access

Updated 2026-10-03. The canonical site is https://vivary-dev.github.io/.
People and agents get the same static HTML. Keep product information readable
without JavaScript, semantic headings and named landmarks, accurate metadata,
canonical URLs, and a sitemap containing the three public content pages.
The generated 404 remains noindex.

`src/content/facts.ts` owns current product claims and links. Each page states
preview status plainly. Distinguish the dated unsigned Windows download from
newer dev work and a stable release. `08-product-description.md` records the
copy boundaries. Never publish private profile data, credentials or internal
session links.

Every documentation page links `/llms.txt` near the top, and the shared footer
links it on the home page. It points to the canonical HTML, source, dated
preview, installation instructions, command reference and published skills.
Do not assume an agent will discover an unlinked text file. Nothing a person
needs belongs only in agent guidance. A skill link neither installs software
nor grants tools or permission.

## Crawl policy

The public site allows ordinary search crawling and user-directed retrieval.
The previous global `Disallow: /` also blocked training bots. Preserve those
restrictions when enabling discovery, using separate disallow rules for
`GPTBot`, `ClaudeBot`, `Google-Extended` and `Applebot-Extended`. The wildcard
rule also declares `Content-Signal: search=yes, ai-train=no` using the
[Content Signals vocabulary](https://contentsignals.org/): search is permitted
and model training is refused. `ai-input` remains unspecified, so this change
does not infer a new permission for that use. The specific bot blocks remain
in place alongside the signal. Local preview mode still denies all crawling.

The providers describe the controls separately:

- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)
  distinguishes OAI-SearchBot discovery and user requests from GPTBot training.
- [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
  distinguishes Claude-SearchBot and Claude-User from ClaudeBot training.
- [Google crawler documentation](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended)
  says Google-Extended controls Gemini training and some grounding uses. Its
  block therefore also limits those grounding uses. It does not block Google
  Search inclusion.
- [Apple crawler documentation](https://support.apple.com/en-us/119829)
  distinguishes Applebot search from Applebot-Extended model-training use.

These are crawler instructions, not an access-control system or a guarantee
of indexing. Review purpose changes against provider documentation before
changing the policy.

## Publication checks

- Build with the canonical site URL and `NEXT_PUBLIC_PREVIEW=0`.
- Run `node scripts/verify-public-export.mjs` to check public metadata, sitemap,
  crawler groups, the exact Content-Signal and local asset/link targets in the actual export.
- Read the HTML without JavaScript. Verify the preview, installation and skill
  links, human-readable status and JSON-LD agree.
- Inspect desktop and phone layouts, keyboard focus and reduced motion.
- After approved publication, fetch live HTML, robots, sitemap and changed
  assets. Confirm their bytes match the reviewed export.

`NEXT_PUBLIC_PREVIEW=1` remains available for unpublished local previews.
`scripts/deploy-site.sh` is the public publisher. Source CI does not deploy.
