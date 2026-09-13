# Sfinco Guides: Volume 2, MacBook Protection
## How this manuscript was produced, 2026-08-24

### 1. Drafted from scratch
Volume 1 existed as Leo's own Word manuscript before any AI involvement. Volume 2 did not. There was only the one-paragraph teaser on the sfinco.com.au site. At Leo's explicit request ("draft the full manuscript myself"), Claude Code wrote the complete manuscript: cover sheet, front matter, all 8 chapters, and back matter, mirroring Volume 1's structure, chapter shape, callout system, and tone throughout.

Chapter mapping against Volume 1:

| Vol 1 | Vol 2 |
| --- | --- |
| Ch 1: Why your iPhone is a target | Ch 1: Why your Mac is a target |
| Ch 2: Locking the front door (Passcode, Face ID, Auto-Lock, Stolen Device Protection) | Ch 2: Locking the front door (Login password, Touch ID, Lock Screen, FileVault) |
| Ch 3: Your Apple ID and iCloud | Ch 3: Your Apple ID and iCloud (Mac-specific: iCloud Drive, Keychain) |
| Ch 4: App permissions | Ch 4: Gatekeeper and app permissions |
| Ch 5: Scams, fake texts and phishing | Ch 5: Scams, fake pop-ups and phishing (Mac-specific scam types) |
| Ch 6: Wi-Fi and VPN | Ch 6: Wi-Fi, the firewall and VPN (adds macOS firewall, File Sharing) |
| Ch 7: Find My and what to do if stolen | Ch 7: Backups, Find My, and what to do if your Mac goes missing (adds Time Machine) |
| Ch 8: Your 15-minute security checkup | Ch 8: Your 15-minute Mac security checkup |

Written directly in the already-corrected format from Volume 1's fix pass (proper heading hierarchy, real GFM tables with separator rows, the established callout syntax) rather than needing a separate cleanup pass afterward. Validated by running the same parser used for the e-book preview over every file: no stray/unclassified callouts, no broken tables.

**Known shortfall:** word count runs shorter than Volume 1 (~11,600 words across front matter + 8 chapters vs. Volume 1's ~19,000). Structurally complete and consistent, but each chapter could be expanded for closer parity if that matters for the finished book's page count.

### 2. Images: all 17 placeholders filled, but all as mockups
Every `[ SCREENSHOT ]` in Volume 1 needed the same options weighed: draft everything now vs. wait on real hardware. For Volume 2 the plan was to do better than Volume 1's iOS Simulator (which was stuck on iOS 16.1) by using this Mac directly. It runs macOS 15.5 (Sequoia), genuinely current, no version mismatch.

That plan hit a wall: launching System Settings and driving it via `open`/AppleScript never produced a usable window for `screencapture` to capture. The app's menu bar appeared but its window content did not render, consistent with the calling process lacking Screen Recording permission (a GUI grant that needs a human click, which wasn't available in this session). AppleScript automation via System Events also stalled waiting on an Accessibility permission prompt.

Rather than leave the placeholders empty, all 17 were built as styled HTML/CSS mockups matching macOS Sequoia's actual System Settings visual design (traffic-light window chrome, sidebar, toggle switches), rendered to PNG via headless Chrome, the same technique used for Volume 1's scam-SMS illustrations. Every one is captioned in the manuscript as a mockup with a note to reshoot on a real Mac before final layout. Fictional placeholder details (an "Alex Morgan" account name, a generic "Cafe Wi-Fi" network, a generic backup drive name) were used throughout. Nothing from Leo's actual Mac was captured or exposed.

Breakdown:
- **14 System Settings panel mockups** (Ch 2, 3, 4, 6, 7): styled UI, not real captures.
- **2 browser-mockups** (Ch 5: fake virus pop-up, Safari fraud warning): same illustrative approach as Volume 1's scam SMS graphics.
- **1 diagram** (Ch 6: VPN tunnel): reused Volume 1's diagram with the device label changed to "Your Mac."

### Still open (needs Leo, not a text fix)
1. **All 17 images need reshooting** on a real Mac running current macOS, once Screen Recording permission is sorted out (or captured manually).
2. **QR codes**: 5 placeholders in the back matter, pending final URLs.
3. **ABN**: back matter colophon.
4. **Word count parity** with Volume 1, if desired.

### A note on where this lives
Same as Volume 1: this repo is private, kept out of the public `sfinco` site repo, since it's the paid KDP manuscript.
