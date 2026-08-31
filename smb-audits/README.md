# SMB Cyber Audits — product build

This folder is for the actual audit product (methodology, intake form, report template, any tooling) — separate from the marketing/enquiry page at [`/audits.html`](../audits.html), which stays in the website.

- [`methodology.md`](methodology.md) — the audit process itself: the five stages (intake → remote review → findings → report → optional retainer), the assessment domains, the plain-English risk-rating bands, and the regulatory flags to keep in view (Privacy Act, NDB scheme, PCI DSS, no financial advice).
- [`intake-questionnaire.md`](intake-questionnaire.md) — the script for the Stage 1 intake call, built directly on the ACSC's *Cyber security checklist for small businesses* (cyber.gov.au): same three sections, each item turned into a plain-English question, self-reported and later verified during the remote review.
- [`cyber-awareness.md`](cyber-awareness.md) — the Cyber Awareness component: what the optional retainer actually delivers (the Cyber Confidence Score, the Sfinco Check-in, and a manual monthly Breach Check via the free haveibeenpwned.com search), a suggested flat $99/month retainer price, and a roadmap note on the future self-serve web app (Year 2+, not started).
- [`report-template.md`](report-template.md) — the client-facing report itself: duplicate per engagement, fill in the brackets. Matches Stage 4 of the methodology — summary, Cyber Confidence Score, ranked action list, findings by domain with Fix now/Fix soon/Good to know ratings, what's going well, and the retainer offer.
- [`pricing-worksheet.md`](pricing-worksheet.md) — internal tool to turn intake answers into a fixed quote: a $299 base fee plus add-ons for team size, device count, extra software, direct card handling, sensitive data, and multi-site setups, floored at $299 and capped at $799. Repriced down from $500–$2,000 once Stage 2 stopped being a 2–4 hour live screen-share.
- [`findings-library.md`](findings-library.md) — for each of the 15 checklist items, canned Yes/No language: what's going well vs. what we found → why it matters → what to do, with a typical Fix now/Fix soon/Good to know rating. Feeds straight into the report template's findings sections.
- [`review-item-modes.md`](review-item-modes.md) — which of the 20 remote-review checks are self-check (client, async), verify call (Leo, live), or independent (Leo alone), and why. Replaces the old single 2–4 hour screen-share.
- [`self-check-guide.md`](self-check-guide.md) — the client-facing guide for the 10 self-check items: plain-English explanation plus achievable steps behind a "?" for each, no technical background assumed.

**Operational readiness — what's needed to actually take a paying client:**

- [`engagement-agreement-template.md`](engagement-agreement-template.md) — the contract: scope, fee, timeline, confidentiality, and a liability clause flagged clearly as needing a solicitor's review before it's relied on. Also flags professional indemnity insurance as worth looking into before the first client.
- [`privacy-notice.md`](privacy-notice.md) — plain-English client data handling notice. Covers where Sfinco likely sits under the Privacy Act's small business exemption (and where that exemption doesn't reach — health service providers are never exempt regardless of turnover).
- [`invoicing.md`](invoicing.md) — no paid tools: a fill-in invoice template, a sequential numbering scheme, and a flag to confirm GST registration status before the first invoice goes out.

The seven product-methodology docs (above) are all in place; the three operational docs are first drafts, not yet battle-tested against a real engagement. `docs/pillars-and-guides.md` in the repo root still quotes the old $500–$2,000 band — due an update to match.
