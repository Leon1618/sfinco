# SMB Cyber Audit — Client Intake Questionnaire

Internal working document, used during **Stage 1: Intake conversation** in [`methodology.md`](methodology.md). Not a form to send — a script Leo works through live on the phone or video call, capturing answers as he goes.

Structure and item wording follow the Australian Cyber Security Centre's **[Cyber security checklist for small businesses](https://www.cyber.gov.au/business-government/small-business-cyber-security/small-business-hub/small-business-cyber-security-guide)** (cyber.gov.au) — the same three sections, in the same order: *Secure your accounts*, *Protect your devices and information*, *Prepare your staff*. Each ACSC checklist item becomes a plain-English question here. This keeps the audit grounded in a recognised government baseline rather than an in-house checklist, which matters when a client asks "says who?"

Everything captured here is **self-reported** at intake. Nothing gets written into a Fix Now / Fix Soon / Good to know rating (see `methodology.md`) until it's checked during the Stage 2 remote review — an intake answer of "yes, MFA's on everywhere" still gets verified on the screen-share, not taken on trust.

For each item: **Yes / No / Not sure / N/A**, plus a line for notes. "Not sure" is a normal, expected answer — most owners haven't looked closely at half of this, and that's exactly what the audit is for.

## Before the checklist — about the business

Needed to scope the engagement and quote it, not part of the ACSC checklist itself:

- What the business does, and roughly how many people are on the team.
- Who (if anyone) currently looks after IT — in-house, a contractor, or nobody.
- Main software and services in use day to day (email platform, POS, booking system, accounting, cloud storage).
- Whether the business holds customer personal information, and whether it takes card payments directly or through a third party (Square, Stripe, EFTPOS terminal, etc.).
- Devices in use, and roughly how many are business-owned vs BYO.
- Anything the owner already suspects or worries about.

## Secure your accounts

| # | Question | Answer | Notes |
|---|---|---|---|
| 1 | Is multi-factor authentication (MFA) turned on for your important accounts — email, cloud storage, banking, POS? Which ones don't have it yet? | | |
| 2 | Do you use a password manager, or unique passwords/passphrases for each important account? Or are passwords reused across accounts? | | |
| 3 | Are any logins shared between staff (one email or POS login everyone uses)? If so, are those shared logins secured — unique password, MFA? | | |
| 4 | Can each staff member access only what they need for their role, or does everyone effectively have the same access (including admin)? | | |

## Protect your devices and information

| # | Question | Answer | Notes |
|---|---|---|---|
| 5 | Are automatic updates turned on for your devices and the software you use? | | |
| 6 | Do you have a plan for backing up your information regularly — and has anyone ever actually tried restoring from it? | | |
| 7 | Do your devices run security software (antivirus/endpoint protection) that scans regularly? | | |
| 8 | Has anyone reviewed how your network (Wi-Fi/router) is secured — or is that still on the default setup from when it was installed? | | |
| 9 | If you have a business website, when was it last reviewed or updated — plugins, platform, hosting? | | |
| 10 | Do you have a process for wiping business devices (factory reset) before they're sold, returned, or disposed of? | | |
| 11 | Do your devices lock automatically after a short period of inactivity? | | |
| 12 | Do you know, roughly, what customer or business data you hold and where it lives (spreadsheets, cloud storage, booking system, paper)? | | |

## Prepare your staff

| # | Question | Answer | Notes |
|---|---|---|---|
| 13 | Has anyone on the team had any cyber security awareness training, even informally — spotting scam emails, invoice fraud, that kind of thing? | | |
| 14 | If something did go wrong — a compromised account, a ransom note, a suspicious payment request — is there any plan for what happens next, or would it be worked out on the spot? | | |
| 15 | Is the business registered with the [ACSC Partnership Program](https://www.cyber.gov.au/business-government/partnership-program) (free, and worth flagging to the client either way)? | | |

## After the call

- Answers above, plus the "about the business" section, set the scope for Stage 2 (remote risk review) against the domains in `methodology.md`.
- A "No" or "Not sure" here isn't a finding yet — it's a lead for what to check on the screen-share. The actual Fix Now / Fix Soon / Good to know rating only gets assigned once it's verified.
- Use the answers to size the fixed quote ($500–$2,000 AUD) before the review is booked in.
