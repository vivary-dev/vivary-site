import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const pinned = readFileSync(new URL('../.node-version', import.meta.url), 'utf8').trim();

test('Node 24 pin includes the November 2026 security fixes', () => {
  // https://nodejs.org/en/blog/release/v24.22.3
  assert.match(pinned, /^24\.\d+\.\d+$/);
  const [, minor, patch] = pinned.split('.').map(Number);
  assert.ok(minor > 22 || minor === 22 && patch >= 3, 'Use Node 24.22.3 or a newer Node 24 release');
});

test('tests run on the pinned Node runtime', () => {
  assert.equal(process.versions.node, pinned, `Select Node ${pinned} from .node-version before running checks`);
});
