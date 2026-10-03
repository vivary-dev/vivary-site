import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const preview = process.argv.includes('--preview');
const docs = JSON.parse(readFileSync('.tmp/pages-functions/documents.json', 'utf8'));
assert.equal(docs.length, 3);
for (const doc of docs) {
  const html = readFileSync(`out${doc.path}index.html`);
  assert.equal(createHash('sha256').update(html).digest('hex'), doc.htmlSha256, 'Markdown catalog must describe this exact HTML build');
  assert.equal(readFileSync(`out${doc.markdownPath}`, 'utf8'), doc.markdown);
  assert(doc.markdown.includes('unsigned Windows x64 preview'), `${doc.path} preview qualifier`);
  assert(!doc.markdown.includes('jeffkazzee.zo.computer'), 'No private host');
}
const source = readFileSync('out/_worker.js', 'utf8');
// Import the actual compiled deployment module, not just the source handler.
const { default: worker } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const env = { SITE_ENABLED: 'true', MCP_ENABLED: 'true', MCP_ALLOWED_ORIGINS: 'https://www.vivaryagent.xyz', ASSETS: { async fetch(request) { return new Response(readFileSync(`out${new URL(request.url).pathname}index.html`), { headers: { 'Content-Type': 'text/html' } }); } } };
for (const doc of docs) {
  const md = await worker.fetch(new Request(doc.uri, { headers: { Accept: 'text/markdown' } }), env);
  assert.equal(md.status, 200); assert.equal(await md.text(), doc.markdown);
  assert.equal(md.headers.get('x-robots-tag'), preview ? 'noindex, nofollow' : null);
  assert.equal(md.headers.get('content-signal'), preview ? null : 'search=yes, ai-train=no');
  const html = await worker.fetch(new Request(doc.uri), env);
  assert.equal(await html.text(), readFileSync(`out${doc.path}index.html`, 'utf8'));
}
const request = new Request('https://mcp.vivaryagent.xyz/', { method: 'POST', headers: { Accept: 'application/json,text/event-stream', 'Content-Type': 'application/json', 'MCP-Protocol-Version': '2025-11-25' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'resources/read', params: { uri: docs[1].uri } }) });
const rpc = await worker.fetch(request, env);
if (preview) assert.equal(rpc.status, 503);
else {
  const result = (await rpc.json()).result;
  assert.equal(result.contents[0].text, docs[1].markdown);
  assert.equal(result._meta['xyz.vivaryagent/source-html-sha256'], docs[1].htmlSha256);
}
const routes = JSON.parse(readFileSync('out/_routes.json', 'utf8'));
assert(routes.exclude.includes('/_next/*') && routes.exclude.includes('/brand/*'));
assert(!source.includes('ai-input='));
console.log(`Compiled edge export verified: three exact HTML/Markdown resources, ${preview ? 'preview MCP disabled (503)' : 'public MCP parity'}, and static asset exclusions.`);
