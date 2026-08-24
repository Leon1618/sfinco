# Guided Self-Check

Sent to the client after the quote's accepted, before the Verify Call is booked. Client-facing — written in second person, plain English, no jargon. Takes about 15–20 minutes. Every question has a "?" with a plain explanation and steps that don't need any technical background — "not sure" is always a fine answer, and is genuinely useful information, not a failure.

This covers 10 of the 20 checks from the audit. The other 10 — the ones where seeing it live matters more than a self-report, like MFA status or who has admin access — happen on the short Verify Call instead. See `methodology.md` Stage 2 for how the two fit together, and `review-item-modes.md` for which item goes where and why.

---

## Secure your accounts

### Do you use different passwords for your important accounts, or a password manager?

**?** A password manager creates and remembers a different, strong password for every account, so you never have to reuse one — reusing a password is one of the easiest ways an attacker gets from one compromised account into several.

- If you already use a password manager (1Password, Bitwarden, or the one built into your browser or phone), you're set — just confirm it covers your important accounts, not only some of them.
- If you're not sure: think about your email, online banking, and anything you use for work. If more than one uses the exact same password, that's worth telling us.
- Nothing to change right now — just describe what you're actually doing.

## Protect your devices and information

### Is spam and phishing filtering switched on for your business email?

**?** Most business email already filters obvious scams and phishing before they reach the inbox — this just confirms it's actually on, not switched off by accident.

- **Google Workspace:** admin console → Apps → Google Workspace → Gmail → Safety, check the spam/phishing settings are enabled. Not the admin? Ask whoever set up the email, or just note "not sure, ask [contact]."
- **Microsoft 365:** admin.microsoft.com → Security → Threat policies, check Anti-phishing and Anti-spam policies are on.
- **Personal Gmail or Outlook with no business admin panel:** this is on by default and can't easily be switched off — safe to answer yes.

### Are your devices and software set to update automatically?

**?** Updates often exist specifically to close security holes already being used against businesses — the longer they're off, the longer that door stays open.

- **Windows:** Settings → Windows Update → Advanced options → confirm automatic updates are on.
- **Mac:** System Settings → General → Software Update → turn on automatic updates.
- **iPhone/Android:** Settings → General or System → Software Update → enable automatic updates.
- For everyday apps (not the operating system itself), just note anything you know hasn't been updated in a long time.

### Do your business devices have security software installed and up to date?

**?** This is the safety net that catches what slips past everything else.

- **Windows:** the built-in Windows Security is usually enough — Settings → Privacy & Security → Windows Security → Virus & threat protection, confirm it says "protected" and is current.
- **Mac:** built-in protection runs automatically in the background. If you've installed something else (Norton, McAfee, etc.), just check it isn't showing an "expired" warning.
- Not sure if anything's installed at all? That's a genuinely useful answer — just say so.

### Do your devices lock automatically after a short time, and are they encrypted?

**?** An unlocked device left on a counter or in a car is an open door — no technical skill required to walk through it.

- **Windows:** Settings → Accounts → Sign-in options → set "require sign-in after being away" to a few minutes. Encryption: Settings → Privacy & Security → Device encryption (or BitLocker).
- **Mac:** System Settings → Lock Screen → set a short "require password after" time. Encryption: System Settings → Privacy & Security → FileVault, confirm it's on.
- **Phones:** usually locked and encrypted by default once a passcode is set — just confirm you have one.

### If staff use their own phones or laptops for work, is there any expectation around that?

**?** Just a description, not a technical check — "no policy, everyone uses their own devices" is a completely normal, honest answer.

- If nothing formal exists, say so.
- If there's an informal understanding (e.g. "only the manager checks work email on their phone"), describe that.

### What gets backed up in your business, where does it go, and how often?

**?** If a device is lost, stolen, or hit by ransomware, anything not backed up is simply gone — this is just a description of what's currently in place, not a test.

- Describe it in your own words — e.g. "our booking system backs up to the cloud automatically," "we copy files to an external drive every Friday," or "we're not sure anything is backed up."
- All answers are useful, including "not sure" — that's actually the most common answer, and exactly what this is for.

### Has anyone ever actually tried restoring a file from your backup, to check it works?

**?** A backup that's never been tested to restore is a guess, not a safety net — plenty of businesses only find out theirs didn't work at the worst possible moment.

- Simple yes or no. "Not sure" usually means no, and that's fine to say plainly.

## Payment and customer data handling

### Do you ever clear out old customer records, or does everything just accumulate?

**?** Data that's kept longer than it's needed is data that can be exposed longer than it needed to be.

- Describe your general practice. Most small businesses don't have a formal process for this, and that's a normal starting point, not a red flag on its own.

## Network

### Has your Wi-Fi been set up with a proper password, and is guest Wi-Fi kept separate from the network your business devices use?

**?** Default router passwords are publicly known — leaving one unchanged is like leaving a spare key under a mat everyone knows about.

- Check the Wi-Fi password isn't the default one printed on a sticker on the router — if you're not sure, say so, that's useful to flag.
- If customers or visitors get their own Wi-Fi, check whether it's a genuinely separate network name from the one your team's devices use.
- No need to log into the router itself for this — a plain description is enough. We'll look closer on the call if anything here is unclear.

---

*Reply to this email with your answers, or use the interactive version if you'd rather click through it: [link]. Either way works — whatever's easiest for you.*
