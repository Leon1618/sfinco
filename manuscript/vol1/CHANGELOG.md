# Sfinco Guides: Vol 1, iPhone Protection
## Changes applied by Claude Code, 2026-08-22

This replaces the old `BUILD_BRIEF.md`. Word counts were checked before/after per file. No prose was added, removed, or reworded; every change below is structural (headings and table markup only).

### 1. Rebrand pass
Replaced throughout every file (68 occurrences across chapters and back matter, though front matter and the cover sheet were already correct):
- `SafeGuard Digital` → `Sfinco`
- `safeguarddigital.com.au` → `sfinco.com.au`
- `SafeGuard Guides` / `SafeGuard Guide` → `Sfinco Guides` / `Sfinco Guide`
- Stray `SafeGuard journey` / `SafeGuard ecosystem` → `Sfinco journey` / `Sfinco ecosystem`

### 2. Chapter title headings were split across two lines
The .docx→.md conversion wrapped every chapter's title heading onto two lines, so only the first half was actually part of the `###` heading (e.g. `### Why your iPhone` / `is a target` on the next line: "is a target" was silently becoming a stray paragraph). Fixed in chapters 1, 2, 3, 5, 7, and 8. Chapters 4 and 6 happened to fit on one line already and were untouched apart from the level change below.

### 3. Heading hierarchy was inverted
Chapter titles were `###` (H3) while the sections inside each chapter were `##` (H2), the chapter title outranked by its own subsections. Promoted every chapter title to `#` (H1). Also demoted the redundant "iPhone Protection" mini-title-page line at the top of the front matter (it was an orphan `### ` sitting above the real `# Introduction`).

### 4. `09_BackMatter.md` had no markdown headings at all
Every section title (Glossary, Quick reference card, Emergency contacts, Monthly security checkup, the six checklist categories, About the author, etc.) came through as bare text. Added the appropriate `##`/`###` levels throughout, and joined one more wrapped line ("Scan to continue / your SafeGuard journey").

### 5. Tables were broken everywhere
Every table in the manuscript had been extracted as a header row (or, in a few cases, no header row) followed by isolated single-row pipe fragments separated by blank lines, which is not a table in Markdown; only a header immediately followed by a `|---|` separator and unbroken data rows renders as one. Rebuilt as proper tables in:
- Chapter 4: the permission reference guide (9 rows)
- Chapter 6: risky-vs-safer Wi-Fi habits (7 rows) and the VPN comparison (5 rows)
- Chapter 7: the "first 30 minutes" timeline (6 rows; had no header row, added "Time | What to do")
- Chapter 8: the complete monthly checklist (7 sub-tables, one per category)
- Back matter: the glossary (23 terms), the quick reference card (emergency contacts, device details, first-30-minutes, suspicious-message steps), the monthly checklist (7 sub-tables), the series list (Series 1 and Series 2), and the QR code index

Callout boxes (REAL STORY, WARNING, TIP, DID YOU KNOW, WELL DONE, NOTE) were left as single-row pipe blocks, those are intentional one-off callouts for the print layout, not broken tables, so they weren't touched.

### 6. Combined manuscript regenerated
`Sfinco_Vol1_MANUSCRIPT.md` was regenerated fresh from the corrected individual files (old filename had "SafeGuard" in it). The old combined file also had a stray literal `-e` artifact leaking into the text at several section breaks (e.g. "...protecting Australians online-e"), a leftover from whatever script originally concatenated the files. The regenerated file doesn't have this.

### Still open (not touched: these need your input, not a text fix)
1. **Screenshots**: 24 `[ SCREENSHOT ]` placeholders across chapters 1–7, each with a caption describing the shot needed.
2. **QR codes**: 5 `[ QR CODE ]` placeholders in the back matter, pending final URLs.
3. **ABN**: `Sfinco Guides is published by Sfinco · ABN [to be added]` in the back matter colophon.
4. A handful of table cells in chapter 4 (permission guide) and chapter 7 (timeline) still read as "What it means X... Allow when... Y" run together without punctuation separating the two halves, left as-is since that's a wording choice, not a structural break, but worth a look if you're doing a copy pass.

### A note on where this lives
This corrected set is **not** committed into the `sfinco` GitHub repo. That repo is public, and GitHub Pages serves the whole thing from the root, so anything pushed there (even in an unlinked folder) is publicly fetchable. Since this manuscript is the paid KDP product, it stays out of version control until you're ready to publish it. Happy to wire up a private repo or a different storage location if you want this tracked somewhere.
