# Sfinco — Pillars, Guides Series, and Roadmap (reference)

## Origin

Sfinco was conceived, named, and structured in a founding session (July 2026), starting from a question about Opus Magna — the great work of a lifetime. The name comes from the **Sphinx**, went through 60+ naming candidates across four sessions, and was chosen for being short, warm, mythologically rooted, and ownable. The unifying operating principle behind every decision:

> Protecting people who don't know they need protecting — through technology, money, and trust.

Sfinco is simultaneously a business for financial independence, a body of work and reputation, a direct community service to older Australians and local small businesses, and a personal legacy. Never present it as purely commercial or purely altruistic.

## Pillar 1 — SMB Cyber Audits

Remote-first cybersecurity risk assessments for small businesses on the Sunshine Coast (cafes, clinics, real estate agencies, tradies, professional services). Plain-English risk report, actionable fixes, optional retainer. Leverages Leo's Security+ credentials and banking background. Pricing: TBD (being adjusted, don't quote a figure until it's set), a short self-check plus a 30–45 min verify call rather than a long live session — see `smb-audits/pricing-worksheet.md` and `smb-audits/review-item-modes.md`. No face-to-face required — proposal-driven. Status: designed, not yet launched; first three Noosa clients are the near-term target.

## Pillar 2 — Sfinco Guides (publishing)

An 8-volume plain-English digital safety series, published via Amazon KDP (e-book + paperback), distributed locally through bookshops, libraries, RSL clubs, GP clinics, and community centres.

Brand colours: Blue `#1B4F8A` · Amber `#C47F00`. KDP pricing: $14.99 AUD paperback, $7.99 AUD e-book.

**Series 1 — Personal protection (launch series):**
1. iPhone Protection — manuscript complete, currently finalising (three-pass review, screenshots, cover, KDP upload remaining)
2. MacBook Protection — planned
3. Family and Home Network Protection — planned
4. Windows Protection — planned
5. Android Protection — planned

**Series 2 — Organisational protection (pipeline):**
6. Small Business Protection
7. NGO and Not-for-Profit Protection
8. Personal Finance Protection

The flywheel: books build credibility → credibility wins audits → audits find seniors → seniors subscribe to SfincoAssist → SfincoAssist subscribers buy the Digital Estate Vault. Each pillar markets the others. Each book contains QR codes in the back matter linking to the website, services booking, other books in the series, and free resources — every book sale is a potential subscriber or client, which is part of why the website matters now.

### Vol 1 — iPhone Protection — content shape

Front matter + 8 chapters + back matter, all KDP-ready .docx with a consistent design system (brand blue headings, amber subtitles, five callout box types, settings-path formatting, chapter checklists). Chapters cover: why iPhones are targeted, locking the front door (passcode/Face ID/Stolen Device Protection), Apple ID & iCloud security, app permissions, scams/phishing, Wi-Fi & VPN, Find My & theft response, and a monthly 15-minute security checkup. Back matter includes a glossary, quick-reference card, tearout checklist, series preview, and QR code page.

Remaining steps to publish: manuscript review, screenshot session (~24 screenshots), QR code generation (needs the domain live), Canva cover design, KDP upload. The website should have QR-friendly, stable URLs ready for these before Vol 1 goes live.

## Pillar 3 — SfincoAssist (AI financial companion for seniors)

The heart of Sfinco. Not a robo-advisor or budgeting app — a warm companion that remembers what matters financially to the user and proactively surfaces it before they miss it. Target user: a 68-year-old on the Sunshine Coast juggling a term deposit, a bonus-rate savings account, credit cards, and super — currently tracked on a spreadsheet or not at all.

**Phase 1 (buildable now, no accreditation):** alert/reminder engine for bonus rate expiry, repayment due dates, term deposit maturity, subscription creep, direct debit changes. Manual data entry, no bank connection. Stack: React or WhatsApp bot, Node.js, Supabase, Stripe, Claude API.

**Phase 2 (requires CDR accreditation via ACCC):** live Open Banking data feed (Basiq or Frollo), competitor rate comparison, switching suggestions, auto profile maintenance, RG146/AFSL advisory layer for anything construed as advice.

**Always flag CDR, AFSL, and RG146 implications whenever Phase 2 is discussed or referenced on the site.** The website should describe SfincoAssist's vision but must not imply Phase 2 capabilities (live bank data, advice) are available yet.

The original "Senior Tech Concierge" (in-person device help) concept became the onboarding mechanism for SfincoAssist: one home visit to set the person up, then a recurring subscription.

## Pillar 4 — Digital Estate Vault

SaaS product for secure storage of passwords, accounts, digital wishes, and legacy documents. Sold primarily as an upsell to SfincoAssist subscribers, plus estate lawyers and aged care referral networks. Target $20–$50/month. Status: Year 2+ — reference as future work only, don't build or prominently feature yet.

## Roadmap and success markers

- **30 days:** sfinco.com.au live, Vol 1 on Amazon KDP, domain email active, first SMB audit conversation started.
- **90 days:** Vol 2 in progress, SfincoAssist Phase 1 MVP live or in beta, first local distribution relationships (Noosa library, RSL, GP clinic).
- **12 months:** full Series 1 published, SfincoAssist with paying subscribers, CDR accreditation pathway initiated, Digital Estate Vault in design.

## Funding constraints

Operating budget is under $500 AUD total. Zero-debt, zero-equity approach — publishing funds the rest. Domain + hosting (VentraIP) costs ~$115 total. Any website tooling/hosting recommendation should respect this — GitHub Pages is free, which is exactly why it's the right choice here.
