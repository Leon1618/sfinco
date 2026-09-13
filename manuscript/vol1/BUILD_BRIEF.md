# Sfinco Guides — Vol 1: iPhone Protection
## Build brief for Claude Code

This folder contains the complete manuscript for Volume 1 of the Sfinco Guides series, extracted from the original Word documents into markdown for easier programmatic handling.

### What this is
A KDP-ready non-fiction guide teaching everyday Australians (primarily aged 60–75) how to secure their iPhone. Ten sections: front matter, eight chapters, back matter.

### What's in this folder
- `00_CoverSheet.md` — title page metadata
- `00_FrontMatter.md` — introduction + how to use this book
- `01_Chapter1.md` through `08_Chapter8.md` — the eight chapters
- `09_BackMatter.md` — glossary, quick reference card, tearout checklist, series preview, QR code placeholders, about the author

Note: the original combined `SafeGuard_Vol1_MANUSCRIPT.md` file isn't carried over here — the source files above are the ones being edited; a fresh combined manuscript gets regenerated from them once they're in good shape.

### Rebrand pass — done (2026-08-22)
Every content file has been checked and updated: `SafeGuard Digital` → `Sfinco`, `safeguarddigital.com.au` → `sfinco.com.au`, `SafeGuard Guides` → `Sfinco Guides`. No remaining "SafeGuard" references in the manuscript content itself.

### Structure and screenshots pass — done (2026-09-13)
Every broken pipe-table callout converted to proper blockquotes, every `[ SCREENSHOT ]` placeholder replaced with a real illustrative mockup image (31 total, in `screenshots/`), and six fabricated anecdotes relabelled from "REAL STORY" to "SOUNDS FAMILIAR?" with an explicit composite-example disclaimer — labelling invented stories as real is an ACL problem for a commercially sold book. The Brisbane bank-impersonation story was also renamed away from Commonwealth Bank (Leo's own employer) to the fictional "Coastal Trust Bank." Also brought Chapter 5's Filter/Report Junk/Silence Unknown Senders section up to current iOS terminology (Screen Unknown Senders/Callers) and added three more illustrative scam examples (myGov, Apple, Linkt) alongside the existing CommBank one.

### Known gaps still to be aware of
1. **QR codes** — five `[ QR CODE ]` placeholders in the back matter, pending QR generation now that sfinco.com.au is registered.
2. **Author bio placeholders** — ABN and a couple of personal details in the back matter are marked `[to be added]`.
3. **Audience wording** — the cover sheet and front matter still say "aged 60–75"; the rest of the series (Vol 2 onward) uses "aged 60+". Not reconciled here, worth a quick decision on which wording to standardise on.

### Suggested next actions
- If generating a PDF/EPUB/print-ready output, treat `00_CoverSheet.md` as the title page and insert a page break before each numbered section
- QR codes remain a manual insertion point once final URLs are set
