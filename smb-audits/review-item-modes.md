# Remote Review — item modes

Internal reference. Which of the 20 checks from `methodology.md`'s six domains happen where, and why. Written after deciding the old "2–4 hours, all live" version didn't scale alongside a full-time job — this is what replaced it.

**Self-check** — the client can reasonably do this themselves with a plain-English explanation, async, before the call. See `self-check-guide.md` for the client-facing version.

**Verify call** — needs Leo's eye directly, either because self-report is unreliable for it, it needs cross-system judgement, or it's high-stakes enough that seeing it matters. Short live call, 30–45 minutes.

**Independent** — Leo checks it alone, no client involved either way (unchanged from before).

| # | Check | Mode | Why |
|---|---|---|---|
| 1 | Shared vs individual logins across email, cloud storage, POS, banking | Verify call | Needs a cross-system view a client rarely has themselves |
| 2 | MFA status on important accounts | Verify call | High-stakes; self-report on this is often wrong (people think it's on when it isn't) |
| 3 | Password reuse / password manager use | Self-check | Client can honestly describe their own habits |
| 4 | Former staff or contractor accounts still active | Verify call | Needs checking accounts against a staff list, judgement-heavy |
| 5 | Admin privileges — who has them | Verify call | Cross-system review, higher stakes if wrong |
| 6 | Domain email authentication (SPF/DKIM/DMARC) | Independent | Public DNS lookup, no client access needed at all |
| 7 | Spam/phishing filtering enabled | Self-check | Usually a single settings toggle to confirm |
| 8 | General staff phishing awareness | Verify call | Better as a conversation than a form answer |
| 9 | OS and software update status | Self-check | A visible settings screen, walkable with simple steps |
| 10 | Antivirus/endpoint protection presence | Self-check | Same — a visible status, not a judgement call |
| 11 | Screen lock and encryption status | Self-check | Visible settings toggle |
| 12 | BYO device policy | Self-check | A description, not a technical check |
| 13 | What's backed up, where, how often | Self-check | A description of current practice |
| 14 | Restore ever tested | Self-check | Simple yes/no |
| 15 | Ransomware exposure (backups reachable from same login) | Verify call | Architecture judgement call, needs Leo's read |
| 16 | How card payments are processed | Verify call | Compliance-sensitive (PCI DSS territory), worth seeing directly |
| 17 | Where customer data is stored, who can access it | Verify call | Judgement-heavy, touches Privacy Act exposure |
| 18 | Data retention habits | Self-check | A description of current practice |
| 19 | Wi-Fi security (encryption, default credentials, guest separation) | Self-check | Kept light on purpose — no router login required, just what's visibly obvious. Anything unclear gets a closer look on the call |
| 20 | Remote access setup for off-site staff | Verify call | Architecture judgement call |

**10 self-check, 9 verify call, 1 independent.** Net effect: live time drops from 2–4 hours to roughly 30–45 minutes, plus the async self-check (client's time, not Leo's) and the independent DNS check (a few minutes, unchanged).

Anything that comes back unclear or concerning from the self-check gets folded into the Verify Call agenda rather than chased separately — the call is also where those get resolved, not just the 9 items assigned to it by default.
