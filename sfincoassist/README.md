# SfincoAssist: Phase 1 prototype

The main function is anti-scam, not financial advice. Six tabs:

- **Today**: the landing view. Just one plain-English cybersecurity tip, rotating daily from a curated list of ~17, no other clutter. Gives a reason to open the app on an ordinary day, not just when something feels wrong. One button jumps straight to "Check a message".
- **Check a message**: paste SMS/email text, a link, or upload a screenshot (read via in-browser OCR, nothing uploaded to a server) and it's scanned against known scam tactics: urgency language, requests for BSB/PIN/codes, gift-card payment demands, suspicious/shortened/lookalike links, too-good-to-be-true offers. Each flag gets a plain-English explanation, framed to make someone feel sharp for checking, not silly for asking. Includes a local check history, copy/print of a result, and real example scams.
- **Who to call**: verified official numbers only (checked against cyber.gov.au, scamwatch.gov.au, and each provider directly, not from memory): the Australian Cyber Security Hotline (ACSC), the actual number cyber.gov.au promotes for this, plus IDCARE, Services Australia, the ATO, the Big 4 banks, Telstra/Optus, Australia Post, and toll operators (Linkt, EastLink). Scamwatch is mentioned as a reporting website in the intro text, not as a phone card, since it has no phone line. Also holds an editable "your trusted contact" entry.
- **AI Safety**: plain-English coverage of AI-enabled scams: voice-cloning "it's me" calls and deepfake celebrity investment scams, grounded in current ACCC/ASIC warnings, with a family-codeword tip and a pointer to ASIC's Professional Registers.
- **Practice**: a "spot the scam" quiz (6 real-style examples) plus an awareness card with real loss figures, to build the instinct without needing a real scam to learn from.
- **Important Dates**: bills, subscription renewals, licence/rego renewals, term deposit rates expiring, birthdays and anniversaries. Supports one-off or weekly/monthly/yearly repeats, a category tag per entry, snooze, calendar (.ics) export, read-aloud, and JSON backup/restore.

Also: large-text and light/dark theme toggles, a right-to-left thread of "next step" buttons linking Today through to Important Dates and back (right-aligned, since most people browse one-handed with their right thumb), and everything secondary (history, examples, backup options, more numbers) is tucked behind `<details>` disclosures so the first view of each tab stays uncluttered. This matters more than usual given the 60-75 audience.

**Not built (needs real infrastructure/cost, flagged rather than built):**
- SMS chatbot: would need a rented number, a paid SMS provider, and a backend webhook. Ongoing recurring cost, more infrastructure than "no developer required" comfortably covers.

**Phase 2** (real-time Open Banking data) needs CDR accreditation, and possibly an AFSL, before it can touch a real account. Do not wire this prototype up to any live financial feed without that in place.

Open `index.html` directly in a browser, or run `python3 -m http.server` from the repo root and visit `/sfincoassist/`. No build step. The screenshot-reading feature loads a ~2-4MB OCR library from a CDN on first use, needing an internet connection the first time, cached after.
