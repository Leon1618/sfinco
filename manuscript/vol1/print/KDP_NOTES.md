# Volume 1 — KDP production notes

## KDP compliance checklist

**Verified against KDP's published specs:**
- Interior trim size is exactly 6 x 9 in (432 x 648 pt) — matches the declared trim size.
- All fonts are embedded in interior.pdf (checked with `pdffonts`) — nothing will substitute at KDP's end.
- 118 pages clears KDP's 79-page minimum for spine text to print at all (below that, KDP rejects any cover with spine text and makes you blank it out).
- Cover has 0.125in bleed on all outer edges, interior has none — correct for a non-bleed interior with a full-bleed cover.
- Cover pixel dimensions (3756 x 2776 px) match 300 DPI at the full bleed size for a 118pp B&W spine.
- Margins (0.75in sides, 0.95in top, 0.85in bottom) clear KDP's gutter minimum for this page count.

**Not verified — conflicting or unconfirmed, check KDP's live upload page before submitting:**
- **Cover file format.** Some sources say KDP only accepts PDF, JPEG or TIFF for covers and rejects PNG; others don't mention this restriction. I've generated `.jpg` versions of both front-cover and wraparound-cover alongside the `.png` originals as a hedge — use the JPEG if KDP's uploader complains about the PNG.
- **Cover colour space.** Sources disagree on whether KDP's print pipeline wants RGB (and converts internally) or CMYK (supplied pre-converted). Both the PNG and JPEG covers here are RGB. If KDP's uploader flags this, that's the fix needed, not a redo of the whole cover.
- I did not run interior.pdf or the covers through KDP's own online previewer/checker — that's the actual authority, everything above is me checking against published specs, not KDP's own validation pass.

## Paperback (interior.pdf + wraparound-cover.png / .jpg)

- Trim size: 6 x 9 in (standard non-fiction default, not yet confirmed with Leo).
- Interior: 118 pages, **black & white**. The in-text iPhone screenshots are converted to true grayscale (not left for the printer to desaturate), and the brand blue/amber accent colours in headings and callout boxes are swapped for two distinct greys, so interior.pdf shows exactly what the printed book will look like — TIP and WARNING boxes stay visually distinct even without colour.
- The **cover stays full colour** — that's normal for a B&W-interior paperback, only the text block is affected.
- Spine width at 118 pages, B&W paper: 0.2657 in (118 x 0.002252). Baked into wraparound-cover.png. **If the page count changes, the spine width must be recalculated and the cover regenerated**, or KDP's cover checker will reject it.
- Margins: 0.75 in left/right, 0.95 in top, 0.85 in bottom, uniform on every page. Clears KDP's minimum for a book under 150 pages; revisit if the book grows past that.
- ISBN barcode area on the back cover is a placeholder box — KDP generates the real barcode at upload if you don't supply your own.
- ABN line on the copyright page reads "[to be added]" — Leo's step.

## Kindle e-book (kindle/Sfinco_Vol1_iPhone_Protection.epub)

- Reflowable EPUB3, full colour, validated as well-formed XML/XHTML. Not run through Amazon's own Kindle Previewer (not installed in this environment) — worth doing before upload, it's a free download from Amazon.
- Screenshot images are downscaled (max 600px wide) and recompressed as JPEG specifically for this file — the print PDF keeps full-resolution grayscale images separately, this is a Kindle-only optimisation. Cuts the file from ~10MB to ~1.4MB, which matters because Kindle's 70% royalty tier deducts a delivery fee of roughly $0.15/MB on every sale.
- Cover image reused from cover/front-cover.png (1800x2700, well inside Kindle's recommended ratio).

## Pricing (estimated — confirm with KDP's live calculator before publishing)

KDP's own AUD print-cost table gives three data points (100pp/200pp/300pp) but not the exact formula, so the 118-page figure below is interpolated between the 100pp and 200pp points, not read directly from KDP. **Log into KDP and check the real number on the pricing page before you lock in a price** — it takes two minutes and removes the guesswork.

**Paperback** — estimated AU print cost at 118pp, B&W: **$4.85**, so the minimum list price (print cost ÷ 60%) is about **$8.08**.

| List price | Royalty/sale | Royalty as % of list |
|---|---|---|
| $14.99 | ~$4.14 | 27.6% |
| **$16.99 (recommended)** | **~$5.34** | **31.4%** |
| $18.99 | ~$6.54 | 34.4% |
| $19.99 | ~$7.14 | 35.7% |

$16.99 sits in the normal range for a ~120-page practical guide, leaves a healthy margin over the $8.08 floor, and isn't so expensive it creates friction for a budget-conscious reader deciding whether to try volume 1 of an 8-volume series.

**Kindle** — EPUB is 1.41MB, so the delivery fee is roughly $0.21/sale under the 70% royalty tier (AUD band is currently $3.99–$15.99).

| List price | Royalty/sale |
|---|---|
| $5.99 | ~$4.05 |
| **$7.99 (recommended)** | **~$5.45** |
| $8.99 | ~$6.15 |

$7.99 is roughly half the paperback price (a common convention), comfortably inside the 70% band, and still priced for an audience that's trying the series rather than committed to it yet.

## Still outstanding (not done here)

- Author name is "Leonardo Pinheiro" (the original pen name, restored after briefly trying the real-name-adjacent "Leon Tavares"), applied consistently across the cover, back-cover blurb, in-book bio, and both production files. This reverses the earlier full-anonymisation pass for Volume 1 specifically — the other 7 volumes are untouched and still fully anonymised.
- Trim size (6x9in) is my working assumption — confirm before final upload, it affects the cover's exact spine width if changed.
- QR codes and ABN: Leo's own step.
- Both prices above are estimates pending KDP's live calculator confirming the exact AU print cost at 118 pages.
