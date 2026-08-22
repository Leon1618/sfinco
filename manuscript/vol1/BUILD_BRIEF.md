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

### Known gaps still to be aware of
1. **Screenshots** — every chapter contains `[ SCREENSHOT ]` placeholders with captions describing what should appear. These are not yet real images. A full shot list of ~24 required screenshots (which iOS screens, which settings) exists separately if needed.
2. **QR codes** — five `[ QR CODE ]` placeholders in the back matter, pending QR generation now that sfinco.com.au is registered.
3. **Author bio placeholders** — ABN and a couple of personal details in the back matter are marked `[to be added]`.
4. **Table extraction** — some original Word tables (permission reference grid, VPN comparison, safe-vs-risky comparison, glossary, checklists) were extracted as pipe-delimited markdown tables. Formatting/column widths may need a pass.
5. **Heading levels** — heading detection during .docx→.md conversion was heuristic (based on font size/boldness), not guaranteed perfect. Worth a scan for any mis-leveled headers.

### Suggested next actions
- Validate heading hierarchy and markdown table formatting (in progress)
- If generating a PDF/EPUB/print-ready output, treat `00_CoverSheet.md` as the title page and insert a page break before each numbered section
- Screenshots and QR codes remain manual insertion points — flag them rather than trying to auto-generate placeholder images
