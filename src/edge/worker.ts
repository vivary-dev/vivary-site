/** Public, bounded documentation transport. No network access except ASSETS. */
export type Doc = { path: string; markdownPath: string; title: string; uri: string; markdown: string; htmlSha256: string };
export type Config = { siteOrigin: string; mcpOrigin: string; preview: boolean; docs: Doc[] };
export type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  SITE_ENABLED?: string;
  MCP_ENABLED?: string;
  MCP_ALLOWED_ORIGINS?: string;
  SITE_PREVIEW_HOST?: string;
};
const VERSION = '2025-11-25';
const LIMIT = 16 * 1024;
const SIGNAL = 'search=yes, ai-train=no';

/** More-specific media ranges override wildcards, including explicit q=0. */
export function quality(accept: string, mime: string): number {
  const [type] = mime.split('/');
  let best = -1;
  let value = 0;
  for (const part of accept.toLowerCase().split(',')) {
    const [range, ...parameters] = part.trim().split(';').map((item) => item.trim());
    const specificity = range === mime ? 2 : range === `${type}/*` ? 1 : range === '*/*' ? 0 : -1;
    if (specificity < 0) continue;
    let q = 1;
    let valid = true;
    for (const param of parameters) {
      if (/^q\s*=/.test(param)) {
        const raw = param.slice(param.indexOf('=') + 1).trim();
        q = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(raw) ? Number(raw) : 0;
      } else if (param && param !== 'charset=utf-8' && param !== 'charset="utf-8"') {
        valid = false;
      }
    }
    if (valid && (specificity > best || specificity === best && q > value)) {
      best = specificity;
      value = q;
    }
  }
  return value;
}

export function representation(accept: string | null): 'html' | 'markdown' | 'none' {
  if (!accept) return 'html';
  const html = quality(accept, 'text/html');
  const markdown = quality(accept, 'text/markdown');
  if (html <= 0 && markdown <= 0) return 'none';
  // HTML wins ties, including browser */* and text/* preferences.
  return markdown > html ? 'markdown' : 'html';
}

function object(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function json(value: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(value === undefined ? null : JSON.stringify(value), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra },
  });
}

function error(id: string | number | null, code: number, message: string, status = 200): Response {
  return json({ jsonrpc: '2.0', id, error: { code, message } }, status);
}

async function boundedBody(request: Request): Promise<string> {
  const length = request.headers.get('content-length');
  if (length && (!/^\d+$/.test(length) || Number(length) > LIMIT)) throw new RangeError('Body too large');
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > LIMIT) {
        await reader.cancel();
        throw new RangeError('Body too large');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

function allowedOrigins(raw: string | undefined): Set<string> | undefined {
  if (!raw) return undefined;
  const values = raw.split(',').map((item) => item.trim());
  try {
    if (values.some((value) => new URL(value).origin !== value || !value.startsWith('https://'))) return undefined;
  } catch { return undefined; }
  return new Set(values);
}

async function mcp(request: Request, env: Env, config: Config): Promise<Response> {
  const allowed = allowedOrigins(env.MCP_ALLOWED_ORIGINS);
  if (env.MCP_ENABLED !== 'true' || !allowed || config.preview) return json({ error: 'MCP is not enabled' }, 503);
  const origin = request.headers.get('origin');
  if (origin && !allowed.has(origin)) return json({ error: 'Origin is not allowed' }, 403);
  const cors: Record<string, string> = origin ? {
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin',
    'Access-Control-Expose-Headers': 'MCP-Protocol-Version',
  } : {};
  if (request.method === 'OPTIONS') {
    const method = request.headers.get('access-control-request-method');
    const headers = (request.headers.get('access-control-request-headers') ?? '').toLowerCase().split(',').map((s) => s.trim()).filter(Boolean);
    if (!origin || method !== 'POST' || headers.some((h) => !['accept', 'content-type', 'mcp-protocol-version'].includes(h))) return json({ error: 'Preflight is not allowed' }, 403);
    return new Response(null, { status: 204, headers: { ...cors, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Accept, Content-Type, MCP-Protocol-Version', 'Cache-Control': 'no-store' } });
  }
  if (request.method !== 'POST') return json({ error: 'Use POST. This endpoint does not offer SSE.' }, 405, { ...cors, Allow: 'POST, OPTIONS' });
  const reply = await rpc(request, config);
  const headers = new Headers(reply.headers);
  for (const [key, value] of Object.entries(cors)) headers.set(key, value);
  headers.set('MCP-Protocol-Version', VERSION);
  return new Response(reply.body, { status: reply.status, headers });
}

async function rpc(request: Request, config: Config): Promise<Response> {
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return json({ error: 'Use application/json' }, 415);
  if (request.headers.has('content-encoding') && request.headers.get('content-encoding') !== 'identity') return json({ error: 'Encoded bodies are not supported' }, 415);
  const accept = request.headers.get('accept') ?? '';
  if (quality(accept, 'application/json') <= 0 || quality(accept, 'text/event-stream') <= 0) return json({ error: 'Accept must permit application/json and text/event-stream' }, 406);
  let body: unknown;
  try { body = JSON.parse(await boundedBody(request)); }
  catch (cause) { return error(null, -32700, cause instanceof RangeError ? 'Request exceeds 16384 bytes' : 'Invalid UTF-8 JSON', cause instanceof RangeError ? 413 : 400); }
  if (!object(body) || body.jsonrpc !== '2.0' || typeof body.method !== 'string' || ('params' in body && !object(body.params))) return error(null, -32600, 'Expected one JSON-RPC request or notification', 400);
  const hasId = 'id' in body;
  if (hasId && !(typeof body.id === 'string' || typeof body.id === 'number' && Number.isFinite(body.id))) return error(null, -32600, 'Invalid request id', 400);
  const id = typeof body.id === 'string' || typeof body.id === 'number' ? body.id : null;
  const params = object(body.params) ? body.params : {};
  const version = request.headers.get('mcp-protocol-version');
  if (version && version !== VERSION || body.method !== 'initialize' && version !== VERSION) return error(id, -32600, `Use MCP-Protocol-Version: ${VERSION}`, 400);
  if (!hasId) {
    if (body.method !== 'notifications/initialized' && body.method !== 'notifications/cancelled') return json({ error: 'Unsupported notification' }, 400);
    return json(undefined, 202);
  }
  if (body.method === 'initialize') {
    if (typeof params.protocolVersion !== 'string' || !object(params.capabilities) || !object(params.clientInfo) || typeof params.clientInfo.name !== 'string' || typeof params.clientInfo.version !== 'string') return error(id, -32602, 'Initialization requires protocolVersion, capabilities and clientInfo');
    return json({ jsonrpc: '2.0', id, result: {
      protocolVersion: VERSION,
      capabilities: { resources: {} },
      serverInfo: { name: 'vivary-public-docs', title: 'Vivary public documentation', version: '1.0.0', websiteUrl: config.siteOrigin },
      instructions: 'Read-only public website documents. These resources do not connect to the desktop app, local projects, accounts or tools.',
    } });
  }
  if (body.method === 'ping') return json({ jsonrpc: '2.0', id, result: {} });
  if (body.method === 'resources/list') {
    if ('cursor' in params) return error(id, -32602, 'This three-document collection has no pagination cursor');
    return json({ jsonrpc: '2.0', id, result: { resources: config.docs.map((doc) => ({ uri: doc.uri, name: doc.path === '/' ? 'overview' : doc.path.replaceAll('/', ''), title: doc.title, mimeType: 'text/markdown', _meta: { 'xyz.vivaryagent/source-html-sha256': doc.htmlSha256 } })) } });
  }
  if (body.method === 'resources/read') {
    if (typeof params.uri !== 'string') return error(id, -32602, 'uri must be a listed resource URI');
    const doc = config.docs.find((item) => item.uri === params.uri);
    if (!doc) return error(id, -32002, 'Resource not found');
    return json({ jsonrpc: '2.0', id, result: { contents: [{ uri: doc.uri, mimeType: 'text/markdown', text: doc.markdown }], _meta: { 'xyz.vivaryagent/source-html-sha256': doc.htmlSha256 } } });
  }
  if (body.method === 'resources/templates/list') return json({ jsonrpc: '2.0', id, result: { resourceTemplates: [] } });
  return error(id, -32601, 'Method not found');
}

async function dispatch(request: Request, env: Env, config: Config): Promise<Response> {
  const url = new URL(request.url);
  if (url.origin === config.mcpOrigin) {
    if (url.pathname !== '/' || url.search) return json({ error: 'MCP endpoint is /' }, 404);
    return mcp(request, env, config);
  }
  const previewHost = env.SITE_PREVIEW_HOST;
  const staging = Boolean(previewHost && /^[a-z0-9-]+(?:\.[a-z0-9-]+)*\.pages\.dev$/.test(previewHost) && url.hostname === previewHost);
  if (url.origin !== config.siteOrigin && !staging) return json({ error: 'Host is not configured' }, 421);
  if (env.SITE_ENABLED !== 'true') return json({ error: 'Site is not enabled' }, 503);
  const doc = config.docs.find((item) => [item.path, item.path + 'index.html', item.markdownPath, item.path === '/' ? '/' : item.path.slice(0, -1)].includes(url.pathname));
  if (!['GET', 'HEAD'].includes(request.method)) return json({ error: 'Method not allowed' }, 405, { Allow: 'GET, HEAD' });
  const variant = url.pathname.endsWith('.md') ? 'markdown' : representation(request.headers.get('accept'));
  let response: Response;
  if ((config.preview || staging) && url.pathname === '/robots.txt') {
    response = new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  } else if (doc && variant === 'none' || doc && variant === 'markdown' && quality(request.headers.get('accept') ?? '*/*', 'text/markdown') <= 0) {
    response = new Response('No acceptable representation', { status: 406 });
  } else if (doc && variant === 'markdown') {
    response = new Response(doc.markdown, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
  } else {
    // Never forward variant validators: a cached HTML ETag must not validate Markdown.
    const headers = new Headers(request.headers);
    headers.delete('if-none-match'); headers.delete('if-modified-since'); headers.delete('range');
    response = await env.ASSETS.fetch(new Request(request.url, { method: 'GET', headers }));
  }
  const headers = new Headers(response.headers);
  headers.set('Vary', 'Accept');
  headers.set('Cache-Control', 'no-store');
  headers.delete('ETag'); headers.delete('Last-Modified'); headers.delete('Content-Length');
  headers.set('X-Content-Type-Options', 'nosniff');
  if (config.preview || staging) {
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    headers.delete('Content-Signal');
  } else headers.set('Content-Signal', SIGNAL);
  const links = [`<${config.siteOrigin}/llms.txt>; rel="describedby"; type="text/plain"`];
  if (doc) {
    links.push(`<${doc.uri}>; rel="canonical"`, `<${config.siteOrigin}${doc.markdownPath}>; rel="alternate"; type="text/markdown"`, `<${doc.uri}>; rel="alternate"; type="text/html"`);
  }
  headers.set('Link', links.join(', '));
  return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers });
}

export async function handleRequest(request: Request, env: Env, config: Config): Promise<Response> {
  const response = await dispatch(request, env, config);
  return request.method === 'HEAD' ? new Response(null, { status: response.status, headers: response.headers }) : response;
}
