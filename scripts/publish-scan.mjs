// Supply-chain gate for a pnpm project. Reads pnpm-lock.yaml, asks the npm
// registry when each resolved version was published, and flags anything
// published in the last 72 hours without a provenance attestation, anything
// with an install hook, or anything inside the ChainDrop window of 2026-08-04.
// Usage: node scripts/publish-scan.mjs .   Exits 1 on any flag.
import fs from 'node:fs';

const root = process.argv[2] || '.';
const lock = fs.readFileSync(`${root}/pnpm-lock.yaml`, 'utf8');
const keys = new Set();
const entry = /^  '?(@?[^@'\n(]+)@(\d+\.\d+\.\d+[^'\n(:]*)/gm;
for (const m of lock.matchAll(entry)) keys.add(`${m[1]}@${m[2]}`);

// Hooks that only select a platform binary, and that pnpm blocks anyway.
const ALLOWED_HOOKS = {
  'unrs-resolver': 'postinstall selects a platform binary; blocked by pnpm ignoredBuiltDependencies',
};

const now = Date.now();
const h72 = now - 72 * 3600e3;
const cdS = Date.parse('2026-08-04T09:00:00Z');
const cdE = Date.parse('2026-08-04T23:59:59Z');
const flagged = [];
let checked = 0;

for (const key of keys) {
  const at = key.lastIndexOf('@');
  const name = key.slice(0, at);
  const ver = key.slice(at + 1);
  const r = await fetch(`https://registry.npmjs.org/${name.replace('/', '%2f')}`, {
    headers: { accept: 'application/json' },
  });
  const d = await r.json();
  const when = d.time?.[ver];
  const t = Date.parse(when || '');
  checked++;
  if (!t) { flagged.push({ name, ver, why: 'no publish date' }); continue; }
  const v = d.versions?.[ver] || {};
  const attested = Boolean(v.dist?.attestations);
  const hooks = Object.keys(v.scripts || {}).filter((s) => /^(pre|post)?install$/.test(s));
  if (hooks.length && !ALLOWED_HOOKS[name]) flagged.push({ name, ver, why: `install hooks: ${hooks.join(',')}` });
  if (t >= h72 && !attested) flagged.push({ name, ver, why: `published ${when}, no attestation` });
  if (t >= cdS && t <= cdE) flagged.push({ name, ver, why: `chaindrop window ${when}` });
}

console.log(`resolved packages checked: ${checked}`);
console.log(flagged.length ? flagged : 'none flagged');
process.exit(flagged.length ? 1 : 0);
