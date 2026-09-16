# The site is read by humans and by agents

Assume both. A person opens the page in a browser. An agent fetches the same
page for a search index, an answer engine, a chat assistant grounding an
answer, or a coding agent deciding whether to install something. Both readers
get the same HTML. There is no separate channel for agents that works.

## What the evidence says about llms.txt

- Ahrefs analyzed 137,000 domains in May 2026. 97% of `llms.txt` files
  received zero requests. Of the requests that arrived, AI retrieval bots were
  1.1%. Most came from SEO audit tools checking whether the file exists.
- A 14-day server log study across 18 named AI crawler families counted 723
  fetches of `robots.txt` and zero of `llms.txt`.
- Google's John Mueller, June 2025: "no AI system currently uses llms.txt."
  Gary Illyes confirmed in July 2025 that Google does not support it and has
  no plans to.

Sources: [Ahrefs data via No Hacks](https://nohacks.co/episode/229-does-llmstxt-work-what-137000-domains-server-logs-show),
[Saaslinks server log study](https://saaslinks.net/blog/llms-txt-server-log-study),
[Search Engine Roundtable on Mueller](https://www.seroundtable.com/google-ai-llms-txt-39607.html),
[Search Engine Land](https://searchengineland.com/google-says-normal-seo-works-for-ranking-in-ai-overviews-and-llms-txt-wont-be-used-459422).

So crawlers will not find `llms.txt` on their own. The site points them to
it. Every documentation page carries one visible line near the top: "If you
are an agent, read /llms.txt for agent-specific guidance." An agent that
fetches a page and follows links will find it. `llms.txt` carries what only
an agent needs: how to name and describe the product, what not to claim, the
exact install command for the workspace commands, the vocabulary, and where
the canonical pages are. The human-facing description is maintained in
`08-product-description.md` and lives on a real page. Nothing that a person
needs is only in `llms.txt`.

## What agents actually read

The same things search engines read, because answer engines are built on
search indexes and on fetching pages.

1. `robots.txt`. Every AI crawler fetches it. It must allow the crawlers we
   want (GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot,
   Google-Extended, Bingbot) and point at the sitemap.
2. `sitemap.xml`. Lists every page with a last-modified date.
3. The HTML itself. The `<title>`, the meta description, the first heading,
   and the first paragraph carry most of the weight. Agents quote the first
   sentence that answers the question. Ours has to be the definition.
4. Semantic structure. One `h1`, real `h2` sections, real lists, a `<dl>` or
   `<details>` for questions and answers, `<main>` and `<nav>` landmarks. The
   locked home page already does this. Text in images, canvases, or scripted
   scenes is invisible. The memory scene's lines are real text in the DOM,
   which is why it works.
5. Structured data. JSON-LD in the head: `SoftwareApplication` for Vivary,
   `Organization` for the maker, `FAQPage` for the question block. This is
   the one thing an answer engine can read without guessing.
6. Open Graph and Twitter card tags, so a shared link carries the definition
   and the social image from the Zo brief.
7. Plain, direct sentences. The voice rules in `AGENTS.md` are also the best
   answer-engine practice: one idea per sentence, no adjectives, the fact
   first.

## What this means for the site

The home page is locked and stays locked. The additions below sit around it
or in its metadata. None changes candidate 9's structure or copy.

| Add | Where | Why |
| --- | --- | --- |
| `robots.txt` allowing search and AI crawlers, with the sitemap URL | Done 2026-09-16, `src/app/robots.ts` | Without it, crawlers assume nothing and some stay away. |
| `sitemap.xml` | Done 2026-09-16, `src/app/sitemap.ts` | Discovery and freshness. |
| Meta description, canonical URL, Open Graph, Twitter card, social image | Done 2026-09-16 in `layout.tsx` and each page. Absolute URLs wait on `NEXT_PUBLIC_SITE_URL`. | The snippet an engine shows and the card a share shows. |
| JSON-LD: `SoftwareApplication`, `Organization`, `FAQPage` | Done 2026-09-16 on `/` and `/what-is-vivary/` | Machine-readable definition. |
| The product description as a real page with a question-and-answer block | Done 2026-09-16, `/what-is-vivary/` | The description has to live on a page, not only in a text file. |
| A status line an agent can quote | On every page from `facts.product.status` | Keeps engines from claiming a download exists. |
| One line on every documentation page pointing agents to `/llms.txt` | Done 2026-09-16, `AgentsLine` in `shell.tsx` | Crawlers do not probe for the file. A link is the only way they reach it. |

The production domain is undecided. Canonical URLs, the sitemap, robots, and
Open Graph all need it. Nothing above ships until the domain and the social
image exist, which is the same gate as publication.

## Writing rules for pages agents will quote

- The first sentence of any page defines the thing. "Vivary is a desktop
  application for working with AI agents on your own projects."
- Answer the question in the heading. "Does Vivary need an account?" then
  "No." then the reason.
- One fact per sentence. Numbers and versions dated.
- Say what is not true. "Not released." "No download." Engines repeat
  absence badly unless it is stated.
- Never describe the workspace commands as a separate or earlier product.
  They are a part of Vivary.
- Keep the same words everywhere: workspace, project, harness, host,
  capsule, receipt, gate, handoff. An engine matches strings.

## Checks before publication

- Fetch the built page with `curl` and read it with no CSS or JavaScript.
  Everything a reader needs must be in that text.
- Validate the JSON-LD with the Schema.org validator.
- Confirm `robots.txt` returns 200 and names the sitemap.
- Confirm the meta description is under 160 characters and is the definition.
