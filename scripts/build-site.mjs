import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const target = process.env.VIVARY_DEPLOY_TARGET ?? 'github';
if (!['github', 'cloudflare'].includes(target)) throw new Error('VIVARY_DEPLOY_TARGET must be github or cloudflare');
const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivary-dev.github.io').replace(/\/$/, '');
const parsed = new URL(origin);
if (parsed.origin !== origin || !(parsed.protocol === 'https:' || parsed.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(parsed.hostname))) throw new Error('SITE_URL must be an HTTPS origin or local loopback origin');
if (target === 'cloudflare' && origin !== 'https://www.vivaryagent.xyz') throw new Error('Cloudflare build requires NEXT_PUBLIC_SITE_URL=https://www.vivaryagent.xyz');
process.env.NEXT_PUBLIC_SITE_URL = origin;
function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', env: process.env });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
run('pnpm', ['exec', 'next', 'build']);
run('python3', ['scripts/export-docs.py']);
if (target === 'cloudflare') {
  run('pnpm', ['exec', 'tsc', '--target', 'ES2022', '--module', 'ES2022', '--moduleResolution', 'bundler', '--lib', 'ES2022,DOM', '--strict', '--skipLibCheck', '--outDir', '.tmp/edge', 'src/edge/worker.ts']);
  const config = { siteOrigin: origin, mcpOrigin: 'https://mcp.vivaryagent.xyz', preview: process.env.NEXT_PUBLIC_PREVIEW === '1', docs: JSON.parse(readFileSync('.tmp/pages-functions/documents.json', 'utf8')) };
  const worker = readFileSync('.tmp/edge/worker.js', 'utf8');
  writeFileSync('out/_worker.js', `${worker}\nconst config = ${JSON.stringify(config)};\nexport default { fetch(request, env) { return handleRequest(request, env, config); } };\n`);
  writeFileSync('out/_routes.json', JSON.stringify({ version: 1, include: ['/*'], exclude: ['/_next/*', '/brand/*', '/favicon.ico', '/icon.svg', '/apple-icon.png'] }, null, 2) + '\n');
  // Pages does not apply _headers to Function responses. The handler emits its own.
  writeFileSync('out/_headers', config.preview ? '/*\n  X-Robots-Tag: noindex, nofollow\n' : '/*\n  Content-Signal: search=yes, ai-train=no\n  X-Content-Type-Options: nosniff\n');
}
console.log(`Built ${target} export for ${origin}. No deployment performed.`);
