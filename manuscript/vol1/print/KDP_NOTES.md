# Volume 1 — KDP production notes

## Paperback (interior.pdf + wraparound-cover.png)

- Trim size: 6 x 9 in (standard non-fiction default, not yet confirmed with Leo).
- Interior: 118 pages, **colour** (the in-text iPhone screenshots are colour, so this book needs KDP's colour interior option, not standard black-and-white — colour printing costs more per page and narrows which paper/trim combinations are available).
- Spine width at 118 pages, colour paper: 0.277 in (118 x 0.002347). This is already baked into wraparound-cover.png. **If the page count changes (more edits, different trim size), the spine width must be recalculated and the cover regenerated** — it will not match otherwise and KDP's cover checker will reject it.
- Margins: 0.75 in left/right, 0.95 in top, 0.85 in bottom, uniform on every page (not alternating inside/outside). This clears KDP's minimum for a book under 150 pages. If the book grows past 150 pages, the inside margin minimum increases and this will need revisiting.
- ISBN barcode area on the back cover is a placeholder box. KDP generates the actual barcode for you at upload if you don't supply your own — leave it to KDP unless you've bought your own ISBN first.
- ABN line on the copyright page reads "[to be added]" — Leo said he'd handle this.

## Kindle e-book (kindle/Sfinco_Vol1_iPhone_Protection.epub)

- Reflowable EPUB3, validated as well-formed XML/XHTML. Not run through Amazon's own Kindle Previewer (not installed in this environment) — worth doing before upload, it's a free download from Amazon.
- Cover image reused from cover/front-cover.png (1800x2700, well inside Kindle's recommended ratio).
- Front matter, all 8 chapters, and back matter are included with real navigation (EPUB3 nav + visible in-book contents page).

## Still outstanding (not done here)

- Author name "Leon Tavares" is applied consistently across the cover, back-cover blurb, in-book bio, and both production files. This reverses the earlier full-anonymisation pass for Volume 1 specifically — the other 7 volumes are untouched and still fully anonymised.
- Trim size (6x9in) and paper colour (colour interior) are my working assumptions — confirm both before final upload, since they drive price and the cover's exact spine width.
- QR codes and ABN: Leo's own step.
- KDP pricing/royalty: not set — needs the per-unit print cost (depends on trim/colour choices above) plus Leo's margin.
