# Cyber Awareness — content plan

Internal working document. Defines the Cyber Awareness component of the SMB Cyber Audits pillar — what it is as a deliverable today, and where it's headed once a web app exists. Not published on the website.

*Note for continuity: this draws on the substance of the parked C.S.A.R.I.S. concept in `docs/business-context.md` (tiered awareness offering, a resilience-score idea, a recurring content engine) — deliberately without that name or its "Know. Fix. Protect." branding. C.S.A.R.I.S. itself stays parked and unconfirmed as its own thing; this is Pillar 1 absorbing the useful parts of that thinking under Sfinco's own voice.*

## Where this sits

The audit already has a "Prepare your staff" domain (`methodology.md`) covering the ACSC checklist's staff items — awareness, an emergency plan, ACSC Partnership Program registration (`intake-questionnaire.md`, items 13–15). Cyber Awareness turns that from a one-off checklist item into an actual ongoing offering: it's what the optional retainer (Stage 5 of the audit) concretely delivers, instead of a vague "help working through the list."

The one-off audit finds the gaps. Cyber Awareness is what keeps a business's biggest ongoing risk — people, not systems — in reasonable shape between audits.

## What it is, right now (no app required)

Two simple pieces, both deliverable manually by Leo, no tooling beyond email and a document template:

### 1. The Cyber Confidence Score

A plain-English snapshot of where a business stands, not a formal maturity certification. Scored off the same three sections used at intake and in the audit report — *Secure your accounts*, *Protect your devices and information*, *Prepare your staff* — with each of the 15 checklist items landing as met, partly met, or not yet. That rolls up into a three-band read the client can actually understand:

- **Building** — several important gaps, worth prioritising.
- **Solid** — the basics are in place, a few things to tighten.
- **Strong** — well covered across the board.

Given at the end of the audit report, and re-scored at each retainer check-in so a client can see it move over time. No algorithm, no weighting model — a rough band a person can sanity-check, on purpose, matching the "no scare tactics" principle in `methodology.md`.

### 2. The Sfinco Check-in

A short, recurring note for retainer clients — aimed at whoever needs to stay switched on day to day, not just the owner. One topic per note, plain English, no more than a five-minute read: a scam pattern doing the rounds locally, a plain explanation of something in the news (a big breach, a new tactic), or one small habit worth building. Never scary, never padded.

Cadence: monthly to start. Delivered as email or a one-page PDF — whichever the client actually reads. No content backlog needs building in advance; write each one close to when it goes out so it stays current.

Where useful, a Check-in can point back to relevant chapters in the Sfinco Guides series once more volumes are live (Vol 6, Small Business Protection, is a natural fit) — the same cross-pillar flywheel already described in `docs/pillars-and-guides.md`, rather than writing everything from scratch twice.

## The future web app

Eventually: a self-serve portal where a client's staff log in, work through short awareness modules at their own pace, and the Cyber Confidence Score updates automatically instead of being hand-scored by Leo. The business owner gets a simple team-level view rather than a per-person one.

This is **Year 2+ scope**, in the same bracket as the Digital Estate Vault — not something to design or build now, and not something to reference as a live or near-term feature anywhere on the website. Flagging it here so it's on the roadmap, not so it gets started.

When it does get built, two things to keep in view from day one of that design work:

- **Privacy Act 1988** — a portal means staff accounts and probably some personal information (names, emails, per-person progress). That's a real data-handling obligation the moment accounts exist, unlike the manual version above where nothing is stored beyond what's already in the audit report.
- **No CDR/AFSL overlap.** Worth stating explicitly since SfincoAssist's Phase 2 flags CDR and AFSL heavily elsewhere in this repo: Cyber Awareness never touches financial data or advice, so those two frameworks don't apply here. Keep that distinction clear if the two ever get discussed in the same breath.

## What this is not, for now

- Not a subscription product or a priced tier — it's the content of the existing optional retainer, not a new SKU to sell separately yet.
- Not a scored certification a client could wave at a supplier or insurer — the Cyber Confidence Score is a conversation aid, not a credential.
- Not on the website yet. `audits.html` can eventually gain a line about ongoing awareness support once this is actually running with a client, but that's a copy decision to make deliberately, not a byproduct of this doc.
