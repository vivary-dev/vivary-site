import test from 'node:test';
import assert from 'node:assert/strict';
import { handleRequest, representation, quality } from '../src/edge/worker.ts';

const site = 'https://www.vivaryagent.xyz';
const mcp = 'https://mcp.vivaryagent.xyz';
const docs = ['/', '/commands/', '/what-is-vivary/'].map((path) => ({ path, markdownPath: `${path}index.md`, title: path, uri: `${site}${path}`, markdown: `# ${path}\nPublic content`, htmlSha256: 'a'.repeat(64) }));
const config = { siteOrigin: site, mcpOrigin: mcp, preview: false, docs };
const env = {
  SITE_ENABLED: 'true', MCP_ENABLED: 'true', MCP_ALLOWED_ORIGINS: site,
  ASSETS: { async fetch(request) { return new Response(`<main>${new URL(request.url).pathname}</main>`, { headers: { 'Content-Type': 'text/html', ETag: '"html-old"', 'Last-Modified': 'yesterday', 'Content-Signal': 'search=yes, ai-train=no' } }); } },
};
const call = (path = '/', init = {}, bindings = env, settings = config) => handleRequest(new Request(site + path, init), bindings, settings);
function rpc(method, params, overrides = {}) {
  const { requestId = 1, ...init } = overrides;
  return new Request(mcp, { method: 'POST', headers: { Accept: 'application/json, text/event-stream', 'Content-Type': 'application/json', 'MCP-Protocol-Version': '2025-11-25' }, body: JSON.stringify({ jsonrpc: '2.0', ...(requestId === null ? {} : { id: requestId }), method, ...(params === undefined ? {} : { params }) }), ...init });
}
const invoke = (request, bindings = env) => handleRequest(request, bindings, config);

test('Accept quality, specificity, exclusions and HTML tie preference', () => {
  for (const [accept, expected] of [[null, 'html'], ['*/*', 'html'], ['text/markdown', 'markdown'], ['text/html;q=0.2, text/markdown;q=0.9', 'markdown'], ['text/html, text/markdown', 'html'], ['text/html;q=0,*/*;q=0.8', 'markdown'], ['text/markdown;q=0,text/*;q=1', 'html'], ['application/json', 'none'], ['text/html;q=0,text/markdown;q=0', 'none'], ['text/markdown;q=2', 'none'], ['text/markdown; charset=utf-8', 'markdown']]) assert.equal(representation(accept), expected, accept);
  assert.equal(quality('text/markdown;q=0,*/*;q=1', 'text/markdown'), 0);
});

test('HTML/Markdown variants have honest discovery and no cross-variant validators', async () => {
  for (const accept of ['text/html', 'text/markdown']) {
    const response = await call('/commands/', { headers: { Accept: accept, 'If-None-Match': '"html-old"' } });
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), new RegExp(accept));
    assert.equal(response.headers.get('vary'), 'Accept');
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(response.headers.get('etag'), null);
    assert.equal(response.headers.get('last-modified'), null);
    assert.equal(response.headers.get('content-signal'), 'search=yes, ai-train=no');
    assert.match(response.headers.get('link'), /commands\/index.md/);
    assert.match(response.headers.get('link'), /rel="canonical"/);
    assert.match(response.headers.get('link'), /llms.txt/);
    assert.match(await response.text(), accept === 'text/html' ? /<main>/ : /^# /);
  }
});

test('HEAD mirrors each GET representation without a body; unacceptable and write methods fail', async () => {
  for (const accept of ['text/html', 'text/markdown']) {
    const response = await call('/', { method: 'HEAD', headers: { Accept: accept } });
    assert.equal(await response.text(), '');
    assert.match(response.headers.get('content-type'), new RegExp(accept));
  }
  assert.equal((await call('/', { headers: { Accept: 'application/json' } })).status, 406);
  assert.equal((await call('/index.md', { headers: { Accept: 'text/markdown;q=0' } })).status, 406);
  assert.equal((await call('/', { method: 'POST' })).status, 405);
});

test('explicit Markdown URL serves same generated source and staging stays noindex', async () => {
  assert.equal(await (await call('/commands/index.md')).text(), docs[1].markdown);
  const response = await handleRequest(new Request('https://test-project.pages.dev/'), { ...env, SITE_PREVIEW_HOST: 'test-project.pages.dev' }, config);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.equal(response.headers.get('content-signal'), null);
});

test('host dispatch and operator switches fail closed', async () => {
  assert.equal((await call('/', {}, { ...env, SITE_ENABLED: undefined })).status, 503);
  assert.equal((await handleRequest(new Request('https://other.example/'), env, config)).status, 421);
  assert.equal((await invoke(rpc('ping'), { ...env, MCP_ENABLED: undefined })).status, 503);
  assert.equal((await invoke(rpc('ping'), { ...env, MCP_ALLOWED_ORIGINS: '*' })).status, 503);
  const root = await invoke(new Request(mcp));
  assert.equal(root.status, 405);
  assert.match(root.headers.get('content-type'), /application\/json/);
  assert.equal((await invoke(new Request(mcp + '/commands/'))).status, 404);
});

test('MCP initialization, notifications, resource list/read and exact URI boundary', async () => {
  const init = await invoke(rpc('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'test', version: '1' } }));
  const result = (await init.json()).result;
  assert.equal(result.protocolVersion, '2025-11-25');
  assert.deepEqual(result.capabilities, { resources: {} });
  assert.equal(init.headers.get('mcp-session-id'), null);
  const notification = await invoke(rpc('notifications/initialized', undefined, { requestId: null }));
  assert.equal(notification.status, 202); assert.equal(await notification.text(), '');
  const list = (await (await invoke(rpc('resources/list'))).json()).result.resources;
  assert.equal(list.length, 3);
  assert.equal(list[0]._meta['xyz.vivaryagent/source-html-sha256'], 'a'.repeat(64));
  for (const resource of list) {
    const read = (await (await invoke(rpc('resources/read', { uri: resource.uri }))).json()).result.contents[0];
    assert.equal(read.text, docs.find((doc) => doc.uri === resource.uri).markdown);
  }
  for (const uri of ['file:///etc/passwd', 'https://private.example/', site + '/commands/?x=1', site + '/commands/../']) assert.equal((await (await invoke(rpc('resources/read', { uri }))).json()).error.code, -32002);
  assert.equal((await (await invoke(rpc('tools/call', { name: 'exec' }))).json()).error.code, -32601);
});

test('MCP rejects malformed, unsupported, oversized and encoded requests', async () => {
  for (const [body, status] of [['{', 400], ['[]', 400], [JSON.stringify({ jsonrpc: '2.0', id: null, method: 'ping' }), 400], ['x'.repeat(16385), 413]]) {
    assert.equal((await invoke(rpc('ping', undefined, { body }))).status, status);
  }
  const unsupported = rpc('ping'); unsupported.headers.set('MCP-Protocol-Version', '2026-07-28');
  assert.equal((await invoke(unsupported)).status, 400);
  const missingVersion = rpc('ping'); missingVersion.headers.delete('MCP-Protocol-Version');
  assert.equal((await invoke(missingVersion)).status, 400);
  const encoded = rpc('ping'); encoded.headers.set('Content-Encoding', 'gzip'); assert.equal((await invoke(encoded)).status, 415);
  const text = rpc('ping'); text.headers.set('Content-Type', 'text/plain'); assert.equal((await invoke(text)).status, 415);
  const unacceptable = rpc('ping'); unacceptable.headers.set('Accept', 'text/event-stream'); assert.equal((await invoke(unacceptable)).status, 406);
});

test('Origin validation and bounded preflight do not create an open CORS proxy', async () => {
  const invalid = rpc('ping'); invalid.headers.set('Origin', 'https://evil.example'); assert.equal((await invoke(invalid)).status, 403);
  const valid = rpc('ping'); valid.headers.set('Origin', site);
  assert.equal((await invoke(valid)).headers.get('Access-Control-Allow-Origin'), site);
  const preflight = new Request(mcp, { method: 'OPTIONS', headers: { Origin: site, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type,mcp-protocol-version' } });
  assert.equal((await invoke(preflight)).status, 204);
  preflight.headers.set('Access-Control-Request-Headers', 'authorization'); assert.equal((await invoke(preflight)).status, 403);
});

test('preview robots denies crawling, and stream size limits apply without Content-Length', async () => {
  const preview = await call('/robots.txt', {}, env, { ...config, preview: true });
  assert.equal(await preview.text(), 'User-agent: *\nDisallow: /\n');
  assert.equal(preview.headers.get('content-signal'), null);
  const stream = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(8192)); controller.enqueue(new Uint8Array(8193)); controller.close(); } });
  const oversized = rpc('ping', undefined, { body: stream, duplex: 'half' });
  assert.equal((await invoke(oversized)).status, 413);
  const head = await invoke(new Request(mcp, { method: 'HEAD' }));
  assert.equal(head.status, 405); assert.equal(await head.text(), '');
});
