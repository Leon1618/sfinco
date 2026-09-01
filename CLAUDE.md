# Sfinco — Claude Code Project Brief

You are helping **Leo** build the **Sfinco** marketing website and get it hosted on GitHub (GitHub Pages). This file is your primary brief — read `docs/` for deeper reference material when you need it.

## Who you're working with

Leo is based in the Noosa area, Sunshine Coast, Queensland, Australia. He's a Customer Banking Specialist and Digital Concierge at CBA Noosaville (RG146, RG206 qualified, pursuing a financial crime investigation/compliance pathway), holds CompTIA Security+ and JavaScript Development certifications, and is completing a Certificate IV in Cyber Security. Sfinco is his venture, built alongside — not instead of — his banking career. Treat him as technically capable; don't over-explain basic concepts, but do explain anything Sfinco- or Australian-regulation-specific.

Address him as Leo. Australian English spelling throughout (colour, organise, licence as a noun, centre, etc.) — never American spellings. AUD for any figures.

## What Sfinco is

Sfinco is named after the Sphinx — the ancient guardian that protects the wise and challenges those with bad intent. The unifying idea behind the whole brand:

> **Protecting people who don't know they need protecting — through technology, money, and trust.**

It is a trusted local brand and a community service that happens to use technology — not a startup, not a tech company, not a cybersecurity firm. Every word on the site should read that way: warm, human, plain English, never corporate or cold, never tech-bro.

## The four pillars (full detail in `docs/pillars-and-guides.md`)

1. **SMB Cyber Audits** — remote-first cybersecurity risk assessments for Sunshine Coast small businesses. Pricing: TBD (being adjusted — don't quote a figure anywhere until Leo sets the new one). Designed, not yet launched.
2. **Sfinco Guides** — an 8-volume plain-English digital safety book series (Amazon KDP). Vol 1, *iPhone Protection*, is being finalised now. Brand colours: Blue `#1B4F8A`, Amber `#C47F00`.
3. **SfincoAssist** — an AI financial companion for seniors (60–75). The heart of Sfinco. Phase 1 (buildable now, no accreditation needed) is an alert/reminder engine. Phase 2 (live Open Banking data) requires CDR accreditation, and possibly AFSL — flag this every time it comes up, don't build it into the site as a live feature yet.
4. **Digital Estate Vault** — a SaaS vault for passwords, accounts, and digital legacy documents. Year 2+ product. Don't over-index the homepage on this.

## Primary audience

Australians aged 60–75, particularly on the Sunshine Coast — digitally exposed, financially comfortable, trust very few people, don't want to be lectured or patronised. They want to feel confident, not scared. Secondary audience: small business owners in Noosa and surrounds.

## Brand voice for site copy

Warm, human, conversational. Plain English — no jargon without an immediate plain-English explanation. Humble, no overclaiming. Short and punchy for headings and CTAs; fuller prose for explanations. Sunshine Coast local flavour where it fits naturally (Noosa, Tewantin, Eumundi, Cooroy, Noosaville). Avoid AI-sounding phrases ("genuinely", "it's worth noting that", "absolutely", "certainly"), fear-based scare copy, and bullet-point overload — prose first, lists only where they're genuinely clearer.

## The website — what to build

- A clean, fast, mobile-first marketing site for **sfinco.com.au**: homepage introducing the four pillars and the "protecting people who don't know they need protecting" thread, a page for the Sfinco Guides series (Vol 1 front and centre once it's live on KDP), a simple SMB Cyber Audits enquiry/contact page, and a short "About Leo" section (banking background, Sunshine Coast, CoderDojo, credentials — humble, not a resume dump).
- SfincoAssist and Digital Estate Vault should be presented as **coming soon / in development**, not as live products — they are not built yet.
- Static site (plain HTML/CSS or a lightweight static-site generator — your call, keep the stack simple since there's no backend requirement for v1). No paid tools, no unnecessary dependencies. Budget for the whole operation is under $500 AUD, most of which is already spent on domain/hosting — the site build itself should cost nothing beyond your time.
- Host on **GitHub Pages**, using Leo's own `gh`/git credentials on this machine. Set up a repo, commit, push, enable Pages, and confirm the live URL. Custom domain (`sfinco.com.au`, registered via VentraIP) can be wired up via a `CNAME` file once Leo has pointed DNS at GitHub Pages — flag that DNS step back to Leo rather than assuming it's done.
- Ask Leo before locking in a specific static-site framework if he hasn't specified one — a plain HTML/CSS/vanilla-JS site is a reasonable default given the no-developer, no-dependency constraint below.

## Constraints — always apply

- **No developer required.** Everything must be buildable/maintainable by Leo himself. Avoid tooling or frameworks that would need a hired developer to touch later.
- **Regulatory flags are mandatory.** Any copy or feature touching financial data, Open Banking, investment recommendations, or financial advice must flag the relevant Australian framework (CDR, AFSL, RG146, Privacy Act 1988) — don't let this slide even mid-build.
- **Stay on the current priority.** The immediate goal is the website. Don't drift into building SfincoAssist or the Vault — those are future work, referenced on the site only as "coming soon."
- **Keep Leo on budget.** Flag anything that would cost money (paid hosting tiers, premium themes, paid fonts/assets) before using it.

## How to work with Leo

Give him options with trade-offs and a clear recommendation rather than open-ended questions — he wants a thinking partner. One clarifying question at a time, only when it genuinely matters, and proceed on reasonable assumptions otherwise (state them). If something looks strategically off (e.g. scope creep beyond a marketing site), say so directly before proceeding.

Full reference detail — the founding story, brand colours and design system, the Guides series content, funding constraints, and a related (separate, not-yet-decided) SME cybersecurity concept called C.S.A.R.I.S. — is in `docs/`. Read the relevant file there before making brand or content decisions you're unsure about.
