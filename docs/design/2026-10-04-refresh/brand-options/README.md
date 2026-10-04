# Vivary wordmark and native icon proposals

Proposal-only review, 2026-10-04. Open `review.html` in a browser. Its comparison
images are embedded, so it opens without a service or font download. The SVG and
ICO download links expect the accompanying option folders.

Nothing here changes app source, the public website, a native binary or provider
configuration. The original app screenshot is an October 3 browser-rendered
Workbench development capture, not the September 22 Windows package. Every
header replacement is explicitly labeled as a mockup overlay. The website
context likewise uses a previously reviewed screenshot, not a live mutation.

## Choices

- **A: Quiet wordmark (recommended).** The full canonical Vivary path wordmark
  replaces the generic V/name treatment. Native/browser icon: the canonical
  jar in app text `#EDF4EF` on charcoal `#0C100E`. It gives the name room and
  keeps the icon quiet. The 16px jar has limited internal detail.
- **B: Jar + name.** The existing horizontal lockup is fitted to the header.
  Native/browser icon: the existing lime-on-charcoal icon geometry and palette.
  This has the strongest continuity with the current site. It needs a wider
  header placement and repeats the jar beside the product name.
- **C: Light tile.** The same wordmark with a charcoal jar on bone `#EBE5D8`.
  The tile is more visible on a dark taskbar. It is also more prominent beside
  the mascot's separate bone tile.

All choices preserve the exact Big Shoulders wordmark path and jar path.
No new typeface, generic V, mascot pose, mascot name, or alternate product mark
was invented. The wordmark identifies the product. The approved charcoal
mascot remains its separate agent character, unchanged.

## Files per option

Each `option-a`, `option-b` and `option-c` directory contains:

- `header-dark.svg`, `header-light.svg`, `header-site.svg`: outlined, native SVG
  header assets using the appropriate ground's text color.
- `app-icon.svg`, `favicon.svg`: matching 1024-unit native SVG master. No text,
  raster image, external references, script or foreignObject inside the SVG.
- `app-icon-{size}.png`: browser-rendered RGBA exports at 16, 24, 32, 48, 64,
  128, 256, 512 and 1024 pixels.
- `app-icon.ico`: Windows container with the individually rendered 16, 24, 32,
  48, 64, 128 and 256px images. No native package has been rebuilt.

The header viewBoxes remove the old print-oriented outer whitespace. Letter
shapes and relative lockup geometry remain exact. The proposed component would
supply its own padding. This is a proposed spacing exception to the old SVG
clear-space guidance, not a silent replacement of the authoritative guide.
A and C also propose an icon color treatment; B preserves the existing one.

## Evidence and reproduction

`provenance.json` pins the canonical source files and the original screenshot
hashes. `render-checks.json` records output hashes and checks. The screenshot
copies are unmodified references, not new public assets.

`build-review.py` derives the proposed SVGs and review HTML from the canonical
assets. `render-review.py` uses existing global Python Playwright and Chromium
through a temporary loopback server on an OS-selected unused port. It exports
the icon sizes and verifies ICO contents, canonical path equality, no page errors,
no page overflow at 1280/390, and actual 16/24/32 CSS-pixel samples on light/dark.
The server and browser close at completion. No packages were installed.

Actual pixels of all three option sheets were inspected. The review captures
are `option-a-review.png` through `option-c-review.png`, plus
`review-desktop.png` and `review-phone.png`. Smaller `*-inspect.jpg` files are
inspection copies only. SVGs are the proposed masters.

An initial direct navigation to a tiny SVG viewport stalled a screenshot.
The export harness now renders each native SVG as an explicitly sized image
inside a normal viewport. At 16px, antialiasing leaves one alpha level at the
extreme rounded corner, so the transparency check permits alpha 0–1 of 255.
This does not alter the SVG or add an opaque icon background outside the tile.

After selection, implementation should separately verify real header layout,
Windows taskbar/desktop display and browser favicon behavior. These review
assets do not establish that OS-level integration or a release is complete.
