Sfinco Guides  ·  Volume 6: Small Business Protection  ·  Chapter 3


# Email security and protecting your domain


The single most targeted part of any small business, and the settings most owners never check


Email is where almost every scam in this book eventually arrives. This chapter covers the handful of settings that make your business email significantly harder to impersonate or break into.


## Checking for suspicious forwarding rules


One of the most common ways criminals maintain access after breaking into an email account is by quietly setting up a forwarding rule that sends a copy of every email, including invoices and password resets, to an address you have never heard of.

Settings path (Microsoft 365):  Outlook  >  Settings  >  Mail  >  Forwarding.

Settings path (Google Workspace):  Gmail  >  Settings  >  See all settings  >  Forwarding and POP/IMAP.

![Email settings screen showing the forwarding rules section with no unexpected addresses](screenshots/vol6-ch3-forwarding-rules.png)

*Mockup illustration, styled to match a typical business email admin panel, reshoot using your actual email provider before final layout.*

| ⚠  WARNING If you find a forwarding rule you did not set up, treat this as a serious sign your account has been compromised. Remove the rule, change your password immediately, and turn on MFA if it is not already active. |


## Checking sign-in activity


Most business email providers keep a log of recent sign-ins, including the approximate location and device used. Reviewing this occasionally can reveal an unauthorised sign-in before it causes real damage.

Settings path (Microsoft 365):  Outlook  >  My Account  >  Security info  >  Recent activity.

Settings path (Google Workspace):  Google Account  >  Security  >  Your devices.

![Email account security page showing recent sign-in activity by location and device](screenshots/vol6-ch3-signin-activity.png)

*Mockup illustration, styled to match a typical business email admin panel, reshoot using your actual email provider before final layout.*

★  TIP:  If you see a sign-in from a country your business has no connection to, change your password immediately and review your forwarding rules and connected apps.


## Domain protections, SPF, DKIM, and DMARC in plain English


These three settings, configured once by whoever manages your website or email hosting, make it significantly harder for a scammer to send an email that appears to come from your business's own domain.

| Setting | What it does in plain English |
| --- | --- |
| SPF | Lists which mail servers are allowed to send email on behalf of your domain |
| DKIM | Digitally signs your outgoing emails so recipients can verify they genuinely came from you |
| DMARC | Tells receiving mail servers what to do with emails that fail the SPF or DKIM checks, such as rejecting them |

| ℹ  DID YOU KNOW? Without DMARC configured, a scammer can send an email that appears to come from your exact business email address, even though they do not have access to your account at all. This is a common tactic used against customers and suppliers of small businesses. |

If you are not sure whether these are set up for your domain, ask whoever manages your website hosting or email, or mention it during a Sfinco Cyber Audit.


## Safer everyday email habits


Beyond the technical settings, a handful of habits meaningfully reduce risk for any small business.

Verify any change to payment details by phone, using a number you already have on file, never one provided in the email itself

Be cautious of urgency, particularly requests marked "urgent" or asking you to bypass your normal process

Check the actual sender address, not just the display name, since these can differ

Avoid opening unexpected attachments, particularly invoices or "remittance advice" from senders you were not expecting


## Quick review, your chapter 3 checklist


| Done | Item |
| --- | --- |
| ☐ | I have checked for unexpected email forwarding rules |
| ☐ | I have reviewed recent sign-in activity on business email accounts |
| ☐ | SPF, DKIM, and DMARC are configured for my business domain, or I have asked my provider to confirm this |
| ☐ | Staff know to verify payment detail changes by phone before paying |

With your email locked down, the next chapter looks at staff access, and making sure people only have the access they actually need.
