#!/usr/bin/env bash
# Render a settled desktop viewport, full page, and a real phone viewport.
# Usage: scripts/shot.sh <route> <name>. Captures stay in /tmp/shots.
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
shot_venv="${VIVARY_SHOT_VENV:-/tmp/vivary-site-shot-venv}"
shot_python="$shot_venv/bin/python"

if [[ ! -x "$shot_python" ]]; then
  python3 -m venv "$shot_venv"
fi

if ! "$shot_python" -c 'import importlib.metadata as m; expected = {"playwright": "1.52.0", "pyee": "13.0.1", "greenlet": "3.2.4", "typing-extensions": "4.16.0"}; raise SystemExit(any(m.version(package) != version for package, version in expected.items()))'; then
  "$shot_python" -m pip install --disable-pip-version-check --only-binary=:all: -r "$script_dir/requirements-shot.txt"
fi

if ! "$shot_python" -c 'from pathlib import Path; from playwright.sync_api import sync_playwright; p = sync_playwright().start(); found = Path(p.chromium.executable_path).is_file(); p.stop(); raise SystemExit(not found)'; then
  "$shot_python" -m playwright install chromium
fi

"$shot_python" - "$@" <<'PY'
from pathlib import Path
import re
import sys
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright
route, name = sys.argv[1:]
if not route.startswith('/') or not re.fullmatch(r'[a-zA-Z0-9-]+', name):
    raise SystemExit('Use a local route and a filename made of letters, numbers, and hyphens.')
url = 'http://127.0.0.1:3177' + route + ('&' if '?' in route else '?') + 'still=1'
out = Path('/tmp/shots')
out.mkdir(exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(args=['--no-sandbox'])
    for width, height, label in [(1440, 900, 'hero'), (390, 844, 'mobile')]:
        page = browser.new_page(viewport={'width': width, 'height': height}, device_scale_factor=1)
        page.goto(url, wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        if urlsplit(route).path == '/':
            page.locator('footer').wait_for(state='attached')
            page.wait_for_function("document.querySelector('.memory')?.classList.contains('done')")
        page.screenshot(path=str(out / f'{name}-{label}.png'), full_page=label == 'mobile')
        if label == 'hero':
            page.screenshot(path=str(out / f'{name}-full.png'), full_page=True)
        page.close()
    browser.close()
print('Captures: ' + str(out / name) + '-{hero,full,mobile}.png')
PY
