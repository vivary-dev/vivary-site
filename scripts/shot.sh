#!/usr/bin/env bash
# Headless screenshots of a route on the local dev server.
# usage: shot.sh <path> <name> ; writes /tmp/shots/<name>-{hero,full,mobile}.png
set -e
CH=/root/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome
mkdir -p /tmp/shots
URL="http://127.0.0.1:3177$1?still=1"
common="--headless=new --no-sandbox --disable-gpu --hide-scrollbars --virtual-time-budget=12000 --run-all-compositor-stages-before-draw --force-device-scale-factor=1"
$CH $common --window-size=1440,900  --screenshot=/tmp/shots/$2-hero.png   "$URL" 2>/dev/null
$CH $common --window-size=1440,7400 --screenshot=/tmp/shots/$2-full.png   "$URL" 2>/dev/null
$CH $common --window-size=390,6200  --screenshot=/tmp/shots/$2-mobile.png "$URL" 2>/dev/null
ls -la /tmp/shots/$2-*.png
