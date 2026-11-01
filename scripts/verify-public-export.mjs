import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vivary-dev.github.io").replace(/\/$/, "");
const pages = ["/", "/commands/", "/what-is-vivary/"];
const read = (file) => readFileSync(join("out", file), "utf8");
const titles = new Set();
const descriptions = new Set();
for (const route of pages) {
  const html = read(`${route.slice(1)}index.html`);
  assert(!/<meta[^>]+name="robots"[^>]+noindex/.test(html), `${route} must be indexable`);
  assert(html.includes(`rel="canonical" href="${origin}${route}"`), `${route} canonical`);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${route} needs one h1`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/ )?.[1];
  assert(title && description, `${route} needs a title and description`);
  assert(!titles.has(title) && !descriptions.has(description), `${route} needs distinct metadata`);
  titles.add(title);
  descriptions.add(description);
  assert(html.includes(`property="og:title" content="${title}"`), `${route} social title must match`);
  assert(html.includes(`property="og:description" content="${description}"`), `${route} social description must match`);
  assert(html.includes(`property="og:url" content="${origin}${route}"`), `${route} social URL must be canonical`);
  assert(read(`${route.slice(1)}index.md`).includes(`Canonical page: ${origin}${route}`), `${route} Markdown canonical`);
  assert(html.includes("/llms.txt"), `${route} must link agent guidance`);
  for (const [, reference] of html.matchAll(/(?:src|href)="(\/[^"\s]*)"/g)) {
    const path = decodeURIComponent(new URL(reference, origin).pathname);
    assert(existsSync(join("out", path)), `${route} missing local target: ${path}`);
  }
}
const robots = read("robots.txt");
const groups = robots.split(/\n\s*\n/).map((group) => group.toLowerCase());
const wildcard = groups.find((group) => /^user-agent: \*$/m.test(group));
assert(wildcard?.includes("allow: /"), "Public wildcard must allow crawling");
assert(!/^disallow: \/$/m.test(wildcard), "Public wildcard must not block crawling");
assert(/^content-signal: search=yes, ai-train=no$/m.test(wildcard), "Public wildcard must allow search and refuse training");
assert(!/ai-input\s*=/i.test(robots), "AI input permission must remain unspecified");
for (const bot of ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended"]) {
  const group = groups.find((item) => item.includes(`user-agent: ${bot.toLowerCase()}\n`));
  assert(group && /^disallow: \/$/m.test(group), `${bot} training control must remain blocked`);
}
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "Robots must name canonical sitemap");
const sitemap = read("sitemap.xml");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(locations.sort(), pages.map((route) => `${origin}${route}`).sort());
assert(read("404.html").includes("noindex"), "404 should remain noindex");
assert(read("llms.txt").includes(`Canonical site: ${origin}/`), "Agent guidance canonical");
console.log("Public export verified: canonical pages, indexing, training controls, sitemap and local targets.");
