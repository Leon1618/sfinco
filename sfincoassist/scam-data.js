/* SfincoAssist scam data. This is the file to edit when the scam alerts or the
   checker's warning signs change. No build step: save it, bump the ?v= number on
   its script tag in index.html and the version in sw.js, and push.

   - SCAM_ALERTS_UPDATED / scamAlerts: what's shown on the Scam Alerts tab.
   - scamSignals: the warning signs the Check a message tool looks for.
     label = the heading shown, regex = what to look for, tip = the plain-English explanation.
   - shortenerDomains / bankKeywords: used by the link checks in scam-checker.js.

   After changing signals, run: node sfincoassist/test/eval-checker.js */

// Manually update this whenever the scamAlerts list below is added to or edited.
const SCAM_ALERTS_UPDATED = "25 September 2026";

const scamAlerts = [
  {
    category: "online",
    tactic: "new",
    tag: "New tactic",
    priority: "trending",
    title: "Fake QR codes (quishing)",
    text: "Scammers sometimes stick a fake QR code sticker over a real one, on parking meters, cafe tables, or parcel slips, leading to a fake payment page instead of the real one. Look for a sticker that seems peeled or slightly crooked, and type the website in yourself if you're not sure.",
  },
  {
    category: "phone",
    tag: "Heads up",
    priority: "urgent",
    title: "Fake bank call asking for account details",
    text: "There's a scam call going around the Sunshine Coast where someone pretends to be from your bank and asks for your BSB and account number. Your real bank will never ask for this over the phone.",
  },
  {
    category: "phone",
    tag: "Heads up",
    priority: "urgent",
    title: "Robocall claiming a warrant is out for your arrest",
    text: "A recorded voice says you owe unpaid tax and police are on their way unless you press 1 to pay immediately by gift card or bank transfer. The ATO will never call threatening arrest or demanding instant payment like this. Just hang up.",
  },
  {
    category: "text",
    tag: "Heads up",
    priority: "urgent",
    title: "Fake toll or delivery fee text",
    text: "Watch for texts claiming a toll or parcel delivery fee is \"overdue\" with a link to pay. Go to the real website yourself instead of clicking the link.",
  },
  {
    category: "text",
    tag: "Heads up",
    priority: "urgent",
    title: "Fake myGov \"account suspended\" text",
    text: "A text claiming your myGov identity has been \"suspended due to unusual activity\" is doing the rounds, with a link to \"update your details.\" myGov never contacts you this way. Log in directly at my.gov.au instead, if you want to check.",
  },
  {
    category: "email",
    tag: "Heads up",
    priority: "urgent",
    title: "Fake overdue energy bill email",
    text: "An email claiming your gas or electricity account is \"overdue\" and threatening disconnection within 24 hours, with a link to pay, is a common template scammers reuse across different energy providers.",
  },
  {
    category: "email",
    tag: "Heads up",
    priority: "urgent",
    title: "Fake refund asking for banking details",
    text: "An email asking you to \"confirm your banking details\" to receive a refund or an unexpected payment is phishing. A genuine refund never needs your online banking login or card PIN to be released.",
  },
  {
    category: "email",
    tag: "Heads up",
    priority: "urgent",
    title: "Webcam \"hacked\" extortion email",
    text: "An email claiming to have hacked your webcam or have compromising footage of you, and demanding cryptocurrency to stop it being sent to your contacts, is almost always a mass-sent bluff with nothing behind it. Delete it and don't reply.",
  },
  {
    category: "online",
    tag: "Heads up",
    priority: "urgent",
    title: "Fake \"virus detected\" pop-up",
    text: "A pop-up claiming \"your computer has a virus, call Microsoft support now\" with a phone number is a scam. Real tech companies don't put their phone number in a pop-up. Just close the browser tab.",
  },
  {
    category: "online",
    tag: "Did you know",
    priority: "notice",
    title: "Fake charity appeals after disasters",
    text: "After any major bushfire or flood, fake charity appeals tend to follow within days. A genuine charity will never pressure you to donate immediately via gift card or wire transfer.",
  },
];

const scamSignals = [
  {
    label: "Pressure to act fast",
    regex: /\b(urgent|immediately|act now|act fast|right away|within\s+\d+\s*(hours|hrs|minutes|mins)|final notice|last chance)\b/i,
    tip: "Real organisations rarely give you minutes to respond. A tight deadline is a classic way to stop you thinking it through.",
  },
  {
    label: "Threatens your account",
    regex: /\b(suspend|suspended|account.*(locked|closed|frozen)|will be closed|deactivat\w*)\b/i,
    tip: "Threatening to lock or close an account is a pressure tactic. Contact the organisation directly using a number you already know to check.",
  },
  {
    label: "Asks for sensitive details",
    regex: /\b(BSB|PIN|one[- ]time code|verification code|security code|password|account number|CVV)\b/i,
    tip: "Your bank, the ATO, or myGov will never ask you to hand over a PIN, password, or one-time code, by text, phone, or email.",
  },
  {
    label: "Wants payment in an unusual way",
    regex: /\b(gift cards?|itunes cards?|google play cards?|wire transfer|cryptocurrency|bitcoin|western union)\b/i,
    tip: "No legitimate bill, fine, or debt is ever paid with gift cards or crypto. This is one of the strongest scam signs there is.",
  },
  {
    label: "Suspicious link or generic greeting",
    regex: /\b(click here|verify your account|confirm your details|dear customer|dear valued customer)\b/i,
    tip: "A vague greeting instead of your name, plus a link asking you to \"verify\" something, is a very common scam pattern. Type the real website in yourself instead of clicking through.",
  },
  {
    label: "Too good to be true",
    regex: /\b(you'?ve won|lottery|prize|claim your reward|congratulations you)\b/i,
    tip: "Unexpected prizes or winnings almost always come with a catch. If you didn't enter, you can't have won.",
  },
  {
    label: "Asks you to upgrade an account to get paid",
    regex: /(?=.*\bupgrade\b.{0,40}\baccount\b)(?=.*\b(pay|paid|paypal)\b)/is,
    tip: "Buyers never need you to upgrade or verify an account just to pay you. It's a common trick to steal your login or card details. Don't use the link, go to the site yourself instead.",
  },
  {
    label: "Moves the chat somewhere private",
    regex: /\b(whatsapp|telegram|signal)\b.{0,40}\binstead of (here|this)\b/i,
    tip: "Scammers often move you off a dating site or marketplace to WhatsApp or Telegram, where nobody is watching and you can't report them. Take care if this is someone you've only just met.",
  },
  {
    label: "Promises big, fast returns",
    regex: /\b(guaranteed (returns?|profits?|income)|turn \$?\d[\d,]*\s+into\s+\$?\d[\d,]*|double your (money|investment)|risk[- ]free|limited spots|\d+%\s+(returns?|profit)\s+(in|per|a|every)\s+(a\s+)?(day|week|month))\b/i,
    tip: "Real investments can't promise big profits in days. Countdowns and \"limited spots\" are there to rush you. Check the company on ASIC's free register before you put any money in.",
  },
  {
    label: "Asks you to keep it secret",
    regex: /(?=.*\b(don'?t tell|do not tell|keep (this|it) (a )?secret|between (you and me|us))\b)(?=.*(\$|\bmoney\b|\btransfer\b|\bbank\b))/is,
    tip: "Being told to keep it from your family is a classic scam move, because they're the ones who'd spot it. Check the story with them first, using a number you already have.",
  },
];

const shortenerDomains = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly"];
const bankKeywords = ["commbank", "netbank", "westpac", "anz", "nab.com", "mygov", "auspost"];
