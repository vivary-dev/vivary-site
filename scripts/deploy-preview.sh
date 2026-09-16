#!/usr/bin/env bash
# Publish the static export to the preview host, https://vivary-dev.github.io.
# The preview is not the site: every page carries noindex and robots blocks
# crawling. Usage: scripts/deploy-preview.sh. Needs gh auth with repo scope.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
node scripts/publish-scan.mjs .
NEXT_PUBLIC_SITE_URL=https://vivary-dev.github.io NEXT_PUBLIC_PREVIEW=1 pnpm build
grep -q 'name="robots" content="noindex' out/index.html || { echo "preview build is missing noindex"; exit 1; }
rev="$(git rev-parse --short HEAD)"
tmp="$(mktemp -d)"
cp -r out/. "$tmp/"
touch "$tmp/.nojekyll"
git -C "$tmp" init -q -b main
git -C "$tmp" add -A
git -C "$tmp" -c user.name="vivary-site preview" -c user.email="noreply@vivary.dev" commit -q -m "Preview build of vivary-site at $rev"
git -C "$tmp" remote add origin "https://x-access-token:$(gh auth token)@github.com/vivary-dev/vivary-dev.github.io.git"
git -C "$tmp" push -q --force origin main
rm -rf "$tmp"
echo "pushed $rev. Pages rebuilds in about 30 seconds: https://vivary-dev.github.io/"
