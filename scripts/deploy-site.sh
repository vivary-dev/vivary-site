#!/usr/bin/env bash
# Publish the public static site at https://vivary-dev.github.io.
# Run only for a reviewed source commit with publication approval.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

[[ -z "$(git status --porcelain)" ]] || { echo "Commit source changes before publishing."; exit 1; }
node scripts/publish-scan.mjs .
NEXT_PUBLIC_SITE_URL=https://vivary-dev.github.io NEXT_PUBLIC_PREVIEW=0 pnpm build
node scripts/verify-public-export.mjs

rev="$(git rev-parse HEAD)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
git clone --quiet --depth 1 --branch main https://github.com/vivary-dev/vivary-dev.github.io.git "$tmp/site"
# Preserve existing history and any unrelated files. Hashed assets from older
# exports may remain available for cached pages. They are not linked by this build.
cp -r out/. "$tmp/site/"
touch "$tmp/site/.nojekyll"
git -C "$tmp/site" add -A
if git -C "$tmp/site" diff --cached --quiet; then echo "Published export is already current."; exit 0; fi
git -C "$tmp/site" -c user.name="vivary-site publisher" -c user.email="noreply@vivary.dev" commit -q -m "Publish vivary-site at $rev"
# A concurrent update rejects this normal push. Inspect it before trying again.
git -C "$tmp/site" push origin main
echo "Submitted $rev to GitHub Pages: https://vivary-dev.github.io/"
