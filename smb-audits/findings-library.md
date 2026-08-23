# SMB Cyber Audit — Findings Library

Internal reference. For each of the 15 checklist items in [`intake-questionnaire.md`](intake-questionnaire.md), the canned language for a **Yes** (what's going well) and a **No** (a finding: what we found → why it matters → what to do, plus a typical rating). Draft starting points, not fixed text — every finding still gets written for the specific business, not copy-pasted verbatim.

**On "Not sure"** — never write a report finding straight off a "Not sure." Treat it as a flag to check during the remote review: if it turns out to be a real gap, use the No language below; if it's actually fine, use the Yes language (perhaps softened — "this was already in place, the team just wasn't aware of it").

**On ratings** — the ones below are typical starting points, not fixed. Fix now vs Fix soon for the same gap can shift depending on what the account or device actually holds (a shared login for the guest Wi-Fi is a different animal to a shared login for online banking).

Ties to [`methodology.md`](methodology.md)'s six report domains where one applies. Items 13–15 (staff) don't map to a report domain — see the note at the end.

## Secure your accounts → *Identity and access*

**1. MFA on important accounts**
- **Yes:** Multi-factor authentication is switched on across your important accounts — one of the single biggest things stopping an attacker who's gotten hold of a password.
- **No:** *What we found:* MFA isn't turned on for [account(s)]. *Why it matters:* a password alone is enough to get in if it's ever guessed, reused, or leaked in a breach elsewhere — MFA is what stops that from being the end of the story. *What to do:* turn on MFA starting with email and anything holding customer or payment data; most platforms take five minutes. *Typical rating:* Fix now for email/financial/admin accounts, Fix soon otherwise.

**2. Password manager / unique passwords**
- **Yes:** Passwords are unique per account, or managed through a password manager — reused passwords are one of the easiest ways in, and that risk isn't present here.
- **No:** *What we found:* the same password (or a small set) gets reused across several accounts. *Why it matters:* if one account is ever compromised, every account sharing that password is exposed too. *What to do:* move to a password manager (several good free ones exist) and give each important account its own password. *Typical rating:* Fix soon, Fix now if it includes email or financial accounts specifically.

**3. Shared logins secured**
- **Yes:** Where logins are shared, they're properly secured with MFA and a strong password — shared access doesn't have to mean weak access here.
- **No:** *What we found:* one or more logins are shared across the team without MFA or a strong unique password. *Why it matters:* shared logins make it hard to know who did what, and if the password leaks there's no second layer stopping someone getting in. *What to do:* move to individual logins where possible; secure any unavoidable shared login with MFA and a strong password. *Typical rating:* Fix soon.

**4. Role-based access**
- **Yes:** Access lines up with what each person actually needs for their role — nobody's carrying more access than their job requires.
- **No:** *What we found:* most or all staff have the same level of access, including admin, regardless of role. *Why it matters:* the more people who can change settings or reach sensitive data, the more ways in for a mistake or a compromised account to do real damage. *What to do:* review who actually needs admin access and scale the rest back. *Typical rating:* Fix soon.

## Protect your devices and information

**5. Automatic updates on** → *Devices and software*
- **Yes:** Devices and software are set to update automatically — one less thing to remember, and it closes gaps as soon as fixes exist.
- **No:** *What we found:* automatic updates aren't switched on for [devices/software]. *Why it matters:* updates often close security holes already being used against businesses — the longer they're off, the longer that door stays open. *What to do:* turn on automatic updates across business devices and key software. *Typical rating:* Fix soon, Fix now if a specific actively-exploited vulnerability is identified.

**6. Backup plan, restore tested** → *Backups and recovery*
- **Yes:** There's a regular backup in place, and a restore has actually been tested — not just assumed to work.
- **No, no backup at all:** *What we found:* no regular backup of business data. *Why it matters:* if a device is lost, stolen, or hit by ransomware, anything not backed up is simply gone. *What to do:* set up automatic backups for anything the business couldn't operate without. *Typical rating:* Fix now.
- **No, backup exists but untested:** *What we found:* backups run, but a restore has never been tested. *Why it matters:* an untested backup is a guess, not a safety net — plenty of businesses find out theirs didn't work at the worst possible moment. *What to do:* test-restore a small file now. *Typical rating:* Fix soon.

**7. Security software scanning** → *Devices and software*
- **Yes:** Security software is installed and actively scanning across business devices.
- **No:** *What we found:* no security software, or it's installed but not scanning. *Why it matters:* it's the safety net that catches what slips past everything else. *What to do:* install reputable security software and confirm it's actually running scans. *Typical rating:* Fix soon.

**8. Network/Wi-Fi reviewed** → *Network*
- **Yes:** The business Wi-Fi has been properly set up and reviewed — not left on whatever came out of the box.
- **No:** *What we found:* the network is still on default settings, or hasn't been reviewed since setup. *Why it matters:* default router passwords are publicly known — leaving them unchanged is like leaving a spare key under a mat everyone knows about. *What to do:* change default credentials, confirm strong Wi-Fi encryption, separate guest Wi-Fi from the business network. *Typical rating:* Fix soon, Fix now if a default admin password is still active on the router itself.

**9. Website reviewed/updated** → *Devices and software*
- **Yes:** The business website has been kept current — platform, plugins, and hosting reviewed recently.
- **No:** *What we found:* the website hasn't been reviewed or updated in some time. *Why it matters:* an out-of-date platform or plugin set is a common way for a business's public face to get quietly compromised. *What to do:* update the platform and any plugins, and set a habit to check every few months. *Typical rating:* Good to know, Fix soon if significantly outdated.

**10. Device disposal process** → *Devices and software*
- **Yes:** There's a clear process for wiping devices before they're sold, returned, or thrown out.
- **No:** *What we found:* no set process for wiping business devices before they leave. *Why it matters:* a device handed on without being wiped can carry customer data, saved passwords, or business files out the door. *What to do:* factory reset any device before it leaves the business, every time. *Typical rating:* Good to know, Fix soon if a device has already left without being wiped.

**11. Devices auto-lock** → *Devices and software*
- **Yes:** Devices lock automatically after a short period of inactivity — a small thing that closes off a lot of casual opportunity.
- **No:** *What we found:* devices don't auto-lock, or the timeout is long. *Why it matters:* an unlocked device left on a counter or in a car is an open door, no technical skill required. *What to do:* turn on auto-lock with a short timeout across business devices. *Typical rating:* Good to know, Fix soon for devices that regularly leave the premises.

**12. Knows what data is held** → *Payment and customer data handling*
- **Yes:** There's a clear picture of what customer and business data is held and where it lives.
- **No:** *What we found:* it's not clear, even roughly, what data is held or where it's stored. *Why it matters:* you can't protect what you don't know you have — and if something goes wrong, not knowing what was exposed makes it much harder to know who to tell. *What to do:* a simple stocktake — what's collected, where it's stored, who can access it. *Typical rating:* Fix soon.

## Prepare your staff — not a report domain

Items 13–15 don't get filed under one of the six domains in the report — per `methodology.md`, staff preparation is deliberately the territory of the ongoing **Cyber Awareness** offering (`cyber-awareness.md`), not a one-off audit finding. Use these as talking points for the "what's already going well" note and the retainer conversation on the final call, not as numbered report findings.

**13. Staff awareness/training**
- **Yes:** The team already has a good instinct for scams and phishing — worth building on, not starting from scratch.
- **No:** No formal awareness training yet. This is exactly what the Sfinco Check-in is built for — a short monthly note rather than a one-off session nobody remembers by March.

**14. Emergency plan**
- **Yes:** There's already a plan for what happens if something goes wrong — genuinely rare among businesses this size, worth saying so plainly.
- **No:** No plan yet for a compromised account or a ransom note turning up. Worth a simple one-pager: who to call, what to do first, how the team keeps operating for a day without the affected system. If this comes up during the review itself, it's reasonable to note it as a general finding rather than skip it entirely — just don't force it under one of the six domains.

**15. ACSC Partnership Program registered**
- **Either answer:** free registration gives access to threat alerts relevant to small businesses. Not registered isn't a risk finding, it's just an easy opportunity — always frame it that way, never as a gap.
