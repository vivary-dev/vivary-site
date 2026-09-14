#!/usr/bin/env bash
# Render a settled desktop viewport, full page, and a real phone viewport.
# Usage: scripts/shot.sh <route> <name>. Captures stay in /tmp/shots.
set -euo pipefail
python3 - "$@" <<'PY'
from pathlib import Path
import re
import sys
from playwright.sync_api import sync_playwright
route, name = sys.argv[1:]
if not route.startswith('/') or not re.fullmatch(r'[a-zA-Z0-9-]+', name):
    raise SystemExit('Use a local route and a filename made of letters, numbers, and hyphens.')
url = 'http://127.0.0.1:3177' + route + ('&' if '?' in route else '?') + 'still=1'
out = Path('/tmp/shots')
out.mkdir(exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/root/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome', args=['--no-sandbox'])
    for width, height, label in [(1440, 900, 'hero'), (390, 844, 'mobile')]:
        page = browser.new_page(viewport={'width': width, 'height': height}, device_scale_factor=1)
        page.goto(url, wait_until='networkidle')
        page.locator('footer').wait_for(state='attached')
        page.evaluate('document.fonts.ready')
        page.wait_for_function("document.querySelector('.memory')?.classList.contains('done')")
        page.screenshot(path=str(out / f'{name}-{label}.png'), full_page=label == 'mobile')
        if label == 'hero':
            page.screenshot(path=str(out / f'{name}-full.png'), full_page=True)
        page.close()
    browser.close()
print('Captures: ' + str(out / name) + '-{hero,full,mobile}.png')
PY
