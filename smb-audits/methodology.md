# SMB Cyber Audit — Methodology

Internal working document. Defines how an SMB Cyber Audit is actually run, so the process behind [`audits.html`](../audits.html) is consistent from client to client. Not published on the website.

## Principles

- **Remote-first.** Everything here can be done over a screen-share and a phone call. No site visit required, though one can be offered as a paid add-on if a client wants it.
- **Plain English throughout.** Every finding gets written up the way you'd explain it to the business owner in person — what it is, why it matters to *their* business, and what to do about it. Save the technical term for a bracket, if it's needed at all.
- **No scare tactics.** The goal is a clear, calm picture of risk — not a pitch built on fear. If something's already handled well, say so.
- **Fixes are ranked, not dumped.** A list of forty things to fix is useless to a sole trader. Every audit ends with a short, ordered list: what to do first, second, third.
- **Retainer is offered, never assumed.** The audit stands on its own. Ongoing help is an option at the end, not a foregone conclusion.

## The five stages

### 1. Intake conversation (free, ~20–30 min, phone or video)

Purpose: understand the business well enough to scope the audit and quote it. Not a sales call — a genuine "tell me about how you run this business" conversation.

Covers, loosely:
- What the business does, team size, and who (if anyone) currently looks after IT.
- What software and services the business runs on day to day (email platform, POS, booking system, accounting, cloud storage).
- Whether the business handles customer personal information, and whether it takes card payments directly or through a third party (Square, Stripe, EFTPOS terminal, etc.).
- Devices in use — owned by the business vs BYO — and roughly how many.
- Anything the owner already suspects or worries about. This is often the most useful five minutes of the call.

Output: a scope note (which of the domains below are in play) and a fixed quote within $299–$799 AUD, sent within 24 hours.

### 2. Remote risk review

The technical core of the audit, in two parts rather than one long screen-share block:

- **2a. Guided Self-Check (async, client's own time, ~15–20 min).** Sent once the quote's accepted. Covers the checks a client can honestly self-report with a plain-English explanation — password habits, update status, backup practices, and the like. See `self-check-guide.md` for the client-facing version.
- **2b. Verify Call (live, 30–45 min).** A short, focused screen-share for what genuinely needs Leo's eye directly — MFA status, admin access, payment handling — plus anything that came back unclear from the self-check. This is also where the trust-building conversation happens, not a box-ticking formality.

Plus a handful of checks Leo runs independently either way (email authentication via public DNS lookup), no client involved.

See `review-item-modes.md` for exactly which of the 20 checks lands where and why, and **Assessment domains** below for what's actually checked across the whole stage.

### 3. Findings and risk rating

Every finding gets sorted into one of three plain-English bands — deliberately not corporate "critical/high/medium/low" language:

| Rating | Meaning | Example |
|---|---|---|
| **Fix now** | Actively exposed; realistic path for someone to get in, get paid, or get data today | Shared admin login with no MFA, actively exploited software still unpatched |
| **Fix soon** | Not urgent, but a gap that becomes a problem given time or a bit of bad luck | No backup testing, ex-employee accounts still active, personal devices with no screen lock |
| **Good to know** | Worth being aware of; low likelihood or low impact, or already partly mitigated | Wi-Fi guest network not segmented but no guest traffic in practice |

Each finding is written as: **what we found → why it matters to this business → what to do about it**. No finding is left without a next step, even a "Good to know" one.

### 4. The report

A short written document (aim for something an owner can read end to end in 15–20 minutes), structured:

1. One-paragraph summary in plain English — overall picture, no jargon.
2. Findings grouped by domain, each rated and written per the format above.
3. A single ranked action list at the front or back (not buried) — the "what to do first, second, third" the client actually needs.
4. A short note on what's already being done well. Every audit finds at least one thing.

Delivered as PDF, walked through live on a final call rather than just emailed cold — that call is where the retainer conversation happens naturally, if it happens at all.

### 5. Optional retainer

Offered once, plainly, at the end of the final call: ongoing help working through the fix list, at a monthly rate to be scoped separately. Never a condition of the audit, never chased afterward.

## Assessment domains

What's actually reviewed. Not every domain applies to every business — scope is set at intake.

**Identity and access**
- Shared vs individual logins across email, cloud storage, POS, banking.
- Multi-factor authentication (MFA) status on email, cloud storage, and anything holding customer or payment data.
- Password reuse and password manager use (or absence of one).
- Former staff or contractor accounts still active.
- Admin privileges — who has them, and whether that still matches who should.

**Email and phishing exposure**
- Domain email authentication — SPF, DKIM, DMARC — checked via public DNS lookup, no access to the client's systems required.
- Spam/phishing filtering in place on the email platform (Microsoft 365, Google Workspace, etc.) and whether it's actually switched on.
- General staff awareness of phishing and invoice-fraud scams — a few plain questions during intake, not a formal test.

**Devices and software**
- Operating system and software update status across business-owned devices (self-checked by the client, see `review-item-modes.md`).
- Antivirus/endpoint protection presence and currency.
- Screen lock and encryption status, especially on laptops that leave the premises.
- BYO device policy, if any — what happens when staff use personal phones for business email or POS apps.

**Backups and recovery**
- What's backed up, where, and how often.
- Whether a restore has ever actually been tested, not just assumed to work.
- Ransomware exposure — whether backups are reachable from the same login as production data (a single compromised account could take out both).

**Payment and customer data handling**
- How card payments are taken and processed, and whether card data ever touches a business-owned device or spreadsheet (it shouldn't — flag immediately if it does).
- Where customer personal information is stored (booking systems, spreadsheets, paper) and who can access it.
- Data retention — whether old customer records are ever cleared out, or just accumulate.

**Network**
- Wi-Fi security (encryption type, default router credentials, guest network segregation).
- Remote access setup, if staff work off-site or from home.

## Regulatory flags — check every time

The audit routinely touches customer personal information and, for some clients, payment card data. Keep these in view at intake and in the report — this is guidance for Leo conducting the audit, not copy for the client report:

- **Privacy Act 1988** — if a business handles customer personal information, general data-handling obligations apply. The audit is not a formal Privacy Act compliance review and shouldn't be presented as one; findings about data handling are risk-based, not legal advice.
- **Notifiable Data Breaches (NDB) scheme** — worth a plain-English mention in the report if a client has no incident response plan at all, without turning the audit into a compliance product.
- **PCI DSS** — if a client takes card payments directly (rather than through a compliant third-party processor like Square/Stripe/EFTPOS), flag that PCI DSS obligations exist. This audit assesses exposure, not formal PCI compliance — don't imply otherwise.
- **No financial advice.** Nothing in this audit constitutes financial advice under the Corporations Act, even where Leo's RG146/RG206 background is part of what clients are trusting. Stay inside cyber risk; if a finding shades into financial advice territory, say so and stop there.

## What this audit is not

- Not a penetration test — no active exploitation, no attempts to break in. It's a review of configuration, practice, and exposure.
- Not a formal compliance audit against any named standard (ISO 27001, PCI DSS, Essential Eight) — those maturity models inform *how Leo thinks about* the domains above, but the audit isn't sold or reported as certification against them.
- Not ongoing monitoring — it's a point-in-time picture, which is exactly why the retainer option exists for anyone who wants it revisited regularly.
