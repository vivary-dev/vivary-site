#!/usr/bin/env bash
# Create a working branch off dev: scripts/branch.sh feat landing-hero
set -euo pipefail
types="feat fix chore docs refactor test hotfix"
type="${1:-}"; slug="${2:-}"
if [[ -z "$type" || -z "$slug" ]]; then
  echo "usage: scripts/branch.sh <type> <slug>   types: $types"; exit 1
fi
if ! grep -qw "$type" <<<"$types"; then
  echo "unknown type '$type'. use one of: $types"; exit 1
fi
slug="$(tr '[:upper:] _' '[:lower:]--' <<<"$slug" | tr -s '-')"
base=dev; [[ "$type" == "hotfix" ]] && base=main
git fetch origin "$base" 2>/dev/null || true
git checkout "$base"
git pull --ff-only origin "$base" 2>/dev/null || true
git checkout -b "$type/$slug"
echo "on $type/$slug (from $base)"
