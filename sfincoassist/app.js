const STORAGE_KEY = "sfincoassist-reminders";
const TEXT_SIZE_KEY = "sfincoassist-text-size";
const THEME_KEY = "sfincoassist-theme";
const HISTORY_KEY = "sfincoassist-history";
const CONTACT_KEY = "sfincoassist-trusted-contact";

const priorityLabels = {
  notice: "Just so you know",
  soon: "Coming up",
  urgent: "Needs attention now",
};

const repeatLabels = {
  none: "",
  weekly: "Repeats weekly",
  monthly: "Repeats monthly",
  yearly: "Repeats yearly",
};

const categoryLabels = {
  bill: "Bill",
  renewal: "Renewal",
  financial: "Financial deadline",
  birthday: "Birthday",
  other: "Other",
};

/* ---------- Tip of the day ---------- */

const dailyTips = [
  { title: "Turn on two-step verification", body: "Where you can, add a second step to your important logins (email, banking), usually a code sent to your phone. Even if a scammer gets your password, they still can't get in." },
  { title: "Update when asked", body: "When your phone, tablet, or computer asks to update, it's usually fixing a security weakness, not just adding new features. It's worth doing sooner rather than later." },
  { title: "Hang up and call back", body: "If a call from your \"bank\" or a family member feels off, hang up and call them back on a number you already have, not one they gave you during the call." },
  { title: "Forward scam texts to 7726", body: "Most Australian phone carriers let you forward a scam text to 7726 (spells SPAM) for free. It helps get the number blocked for everyone." },
  { title: "No one legitimate asks for a one-time code", body: "Your bank, the ATO, or myGov will never ring or text asking you to read out a one-time code or PIN. If someone does, it's a scam, every time." },
  { title: "Gift cards are never a real payment method", body: "No bill, fine, fee, or debt is ever legitimately paid with gift cards. If someone asks for gift card codes, it's a scam, no exceptions." },
  { title: "Type the address in yourself", body: "Instead of clicking a link in a text or email, open a new browser tab and type the organisation's website in yourself. It takes a few extra seconds and closes off a common trick." },
  { title: "A locked screen is your first defence", body: "A PIN, pattern, or fingerprint lock on your phone means that if it's ever lost or picked up, whoever has it can't get straight into your messages, banking apps, or email." },
  { title: "Register for the Do Not Call Register", body: "Australia's free Do Not Call Register (donotcall.gov.au) won't stop scammers, but it cuts down genuine telemarketing calls, making the odd ones left easier to notice." },
  { title: "Check your bank statement regularly", body: "A quick glance at your statement each month, even just scrolling through it, is often how small, ongoing fraud gets caught early, before it becomes a big problem." },
  { title: "Good grammar doesn't mean it's real", body: "Scam messages used to be easy to spot by bad spelling. These days many are written just as well as a real one. Judge a message by what it's asking you to do, not how it reads." },
  { title: "Slow down on urgency", body: "\"Act now,\" \"final notice,\" \"within 24 hours\": real organisations rarely rush you like this. Urgency is one of the most reliable warning signs there is." },
  { title: "Agree on a family codeword", body: "Pick a word only your close family knows. If a call or message ever claims to be an emergency involving them, ask for the codeword before doing anything else." },
  { title: "Check before you invest", body: "Before putting money into anything you saw online, search the person or company on ASIC's free Professional Registers. If they're not listed, they're not licensed." },
  { title: "Only use official app stores", body: "Apps from outside the App Store or Google Play skip a layer of safety checking. It's a small habit that closes off a real risk." },
  { title: "Be wary on public Wi-Fi", body: "Avoid logging into your bank or email over public Wi-Fi (cafes, libraries). If you need to, your phone's own mobile data is safer than an open network." },
  { title: "It's okay to just hang up", body: "You don't owe a caller politeness or an explanation. If something feels wrong, hanging up is always the right move. You can always call back on a number you trust to check." },
];

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000);
}

function renderTipOfDay() {
  const today = new Date();
  const tip = dailyTips[getDayOfYear(today) % dailyTips.length];
  document.getElementById("tip-date").textContent = today.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
  document.getElementById("tip-title").textContent = tip.title;
  document.getElementById("tip-body").textContent = tip.body;
}

document.getElementById("today-check-btn").addEventListener("click", () => {
  document.getElementById("tab-btn-scam").click();
});
document.getElementById("scam-next-btn").addEventListener("click", () => {
  document.getElementById("tab-btn-contacts").click();
});
document.getElementById("contacts-next-btn").addEventListener("click", () => {
  document.getElementById("tab-btn-aisafety").click();
});
document.getElementById("aisafety-next-btn").addEventListener("click", () => {
  document.getElementById("tab-btn-practice").click();
});
document.getElementById("practice-next-btn").addEventListener("click", () => {
  document.getElementById("tab-btn-reminders").click();
});
document.getElementById("reminders-next-btn").addEventListener("click", () => {
  document.getElementById("tab-btn-today").click();
});

const scamAlerts = [
  {
    tag: "Did you know",
    priority: "notice",
    text: "Your streaming subscription renews in 3 days for $22.99. Still using it?",
  },
  {
    tag: "Heads up",
    priority: "urgent",
    text: "There's a scam call going around the Sunshine Coast where someone pretends to be from your bank and asks for your BSB and account number. Your real bank will never ask for this over the phone.",
  },
  {
    tag: "Heads up",
    priority: "urgent",
    text: "Watch for texts claiming a toll or parcel delivery fee is \"overdue\" with a link to pay. Go to the real website yourself instead of clicking the link.",
  },
  {
    tag: "Coming up",
    priority: "soon",
    text: "Your car registration is due in 9 days. Want a reminder closer to the date?",
  },
];

/* ---------- 1. Message + link scam checker ---------- */

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
    regex: /\b(gift card|itunes card|google play card|wire transfer|cryptocurrency|bitcoin|western union)\b/i,
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
];

const shortenerDomains = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly"];
const bankKeywords = ["commbank", "netbank", "westpac", "anz", "nab.com", "mygov", "auspost"];

function checkLinks(text) {
  const lower = text.toLowerCase();
  const flags = [];

  if (shortenerDomains.some((d) => lower.includes(d))) {
    flags.push({
      label: "Shortened link",
      tip: "Shortened links (like bit.ly) hide where you're really going. Legitimate businesses rarely need to hide their web address.",
    });
  }

  if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(lower)) {
    flags.push({
      label: "Raw IP address link",
      tip: "A link pointing straight at a number instead of a proper website name is very unusual for a genuine business.",
    });
  }

  if (bankKeywords.some((k) => lower.includes(k)) && !lower.includes(".com.au") && !lower.includes(".gov.au")) {
    flags.push({
      label: "Possible lookalike website",
      tip: "This mentions a bank or government name but doesn't go to a proper .com.au or .gov.au address. Type the real website in yourself instead.",
    });
  }

  if (/http:\/\//.test(lower)) {
    flags.push({
      label: "Not a secure link",
      tip: "This link starts with http, not https. That's unusual for anything asking you to enter details.",
    });
  }

  return flags;
}

function checkMessage(text) {
  const textFlags = scamSignals.filter((s) => s.regex.test(text)).map((s) => ({ label: s.label, tip: s.tip }));
  return textFlags.concat(checkLinks(text));
}

function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 10)));
}

function addHistoryEntry(text, matchCount) {
  const history = loadHistory();
  const snippet = text.length > 70 ? text.slice(0, 70) + "…" : text;
  history.unshift({
    id: crypto.randomUUID(),
    snippet,
    date: new Date().toISOString(),
    matchCount,
  });
  saveHistory(history);
}

function renderHistory() {
  const container = document.getElementById("scam-history");
  const empty = document.getElementById("history-empty");
  const history = loadHistory();

  container.innerHTML = "";
  empty.style.display = history.length ? "none" : "block";

  history.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "history-row";

    const badge = document.createElement("span");
    badge.className = `tag ${entry.matchCount > 0 ? "flagged" : "clear"}`;
    badge.textContent = entry.matchCount > 0 ? `${entry.matchCount} flag${entry.matchCount > 1 ? "s" : ""}` : "Looked clear";

    const text = document.createElement("span");
    text.className = "history-snippet";
    text.textContent = entry.snippet;

    const when = document.createElement("span");
    when.className = "history-date";
    when.textContent = new Date(entry.date).toLocaleDateString("en-AU", { day: "numeric", month: "short" });

    row.append(badge, text, when);
    container.appendChild(row);
  });
}

document.getElementById("clear-history-btn").addEventListener("click", () => {
  saveHistory([]);
  renderHistory();
});

/* ---------- 5. Share / print a result ---------- */

function resultToText(text, matches) {
  const lines = ["SfincoAssist scam check:"];
  if (matches.length === 0) {
    lines.push("No obvious warning signs found. If it still feels off, trust that instinct.");
  } else {
    matches.forEach((m) => lines.push(`- ${m.label}: ${m.tip}`));
  }
  return lines.join("\n");
}

function copyToClipboard(text, button) {
  const originalLabel = button.textContent;
  const restoreLabel = () => {
    setTimeout(() => (button.textContent = originalLabel), 1500);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        button.textContent = "Copied!";
        restoreLabel();
      })
      .catch(() => {
        button.textContent = "Couldn't copy";
        restoreLabel();
      });
  } else {
    button.textContent = "Couldn't copy";
    restoreLabel();
  }
}

function renderScamResult(text, matches, hasText) {
  const result = document.getElementById("scam-result");
  result.innerHTML = "";
  if (!hasText) return;

  const wrapper = document.createElement("div");
  wrapper.className = "scam-result";

  if (matches.length === 0) {
    const card = document.createElement("div");
    card.className = "sample-card notice";
    const p = document.createElement("p");
    p.textContent = "We didn't spot the usual warning signs in this one. That's a good sign, but if something still feels off, trust that instinct. Call the organisation directly using a number you already know, not one from the message.";
    card.appendChild(p);
    wrapper.appendChild(card);
  } else {
    const intro = document.createElement("p");
    intro.className = "scam-intro";
    intro.textContent = "Good instinct checking this one. Here's what stood out:";
    wrapper.appendChild(intro);

    matches.forEach((signal) => {
      const card = document.createElement("div");
      card.className = "sample-card urgent";
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = signal.label;
      const p = document.createElement("p");
      p.textContent = signal.tip;
      card.append(tag, p);
      wrapper.appendChild(card);
    });

    const outro = document.createElement("p");
    outro.className = "scam-outro";
    outro.textContent = "Spotting these takes a sharp eye. Well done for pausing to check before doing anything else.";
    wrapper.appendChild(outro);
  }

  const shareRow = document.createElement("div");
  shareRow.className = "share-row";

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.textContent = "Copy result";
  copyBtn.addEventListener("click", () => copyToClipboard(resultToText(text, matches), copyBtn));

  const printBtn = document.createElement("button");
  printBtn.type = "button";
  printBtn.textContent = "Print this";
  printBtn.addEventListener("click", () => window.print());

  shareRow.append(copyBtn, printBtn);
  wrapper.appendChild(shareRow);

  result.appendChild(wrapper);
}

document.getElementById("screenshot-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const status = document.getElementById("ocr-status");
  status.classList.remove("hidden");
  status.textContent = "Reading your screenshot… this can take a few seconds.";

  Tesseract.recognize(file, "eng")
    .then(({ data: { text } }) => {
      document.getElementById("scam-text").value = text.trim();
      status.textContent = 'Done. Here\'s what we could read. Check it looks right below, then press "Check this for me".';
    })
    .catch(() => {
      status.textContent = "We couldn't read that image. Try a clearer screenshot, or paste the text in yourself instead.";
    });

  e.target.value = "";
});

document.getElementById("scam-check-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("scam-text").value.trim();
  const matches = checkMessage(text);
  renderScamResult(text, matches, text.length > 0);
  if (text.length > 0) {
    addHistoryEntry(text, matches.length);
    renderHistory();
  }
});

function renderScamAlerts() {
  const container = document.getElementById("scam-alerts");
  container.innerHTML = "";
  scamAlerts.forEach((alert) => {
    const card = document.createElement("div");
    card.className = `sample-card ${alert.priority}`;
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = alert.tag;
    const text = document.createElement("p");
    text.textContent = alert.text;
    card.append(tag, text);
    container.appendChild(card);
  });
}

/* ---------- 2. Trusted contacts ---------- */

function loadTrustedContact() {
  const raw = localStorage.getItem(CONTACT_KEY);
  return raw ? JSON.parse(raw) : null;
}

function renderTrustedContact() {
  const contact = loadTrustedContact();
  const display = document.getElementById("trusted-contact-display");
  display.innerHTML = "";
  if (contact) document.getElementById("trusted-contact-details").open = true;
  if (!contact) return;

  const card = document.createElement("div");
  card.className = "contact-card";

  const info = document.createElement("div");
  info.className = "contact-info";
  const name = document.createElement("strong");
  name.textContent = contact.name;
  const detail = document.createElement("span");
  detail.className = "contact-detail";
  detail.textContent = contact.phone;
  info.append(name, detail);

  const readBtn = document.createElement("button");
  readBtn.className = "read-aloud";
  readBtn.textContent = "Read aloud";
  readBtn.addEventListener("click", () => speak(`${contact.name}, ${contact.phone}`));

  card.append(info, readBtn);
  display.appendChild(card);
}

document.getElementById("trusted-contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("trusted-name").value.trim();
  const phone = document.getElementById("trusted-phone").value.trim();
  if (!name || !phone) return;
  localStorage.setItem(CONTACT_KEY, JSON.stringify({ name, phone }));
  e.target.reset();
  renderTrustedContact();
});

document.querySelectorAll("#tab-contacts .read-aloud").forEach((btn) => {
  btn.addEventListener("click", () => speak(btn.dataset.text));
});

/* ---------- 4. Spot-the-scam practice quiz ---------- */

const quizItems = [
  {
    text: "Australia Post: Your parcel could not be delivered due to an unpaid customs fee of $2.99. Pay now to reschedule delivery: http://auspost-redelivery.info",
    isScam: true,
    explanation: "The link isn't the real auspost.com.au, and small \"just pay a couple of dollars\" fees are a common trick to seem believable.",
  },
  {
    text: "Hi Mum, it's Sarah. Running 10 minutes late for lunch at Massimo's in Noosa Junction, sorry!",
    isScam: false,
    explanation: "No links, no urgency, no requests for money or details. Just a normal message from someone you know.",
  },
  {
    text: "CommBank Alert: Unusual activity detected on your account. Verify immediately or your card will be suspended: bit.ly/cba-secure",
    isScam: true,
    explanation: "Banks don't send \"verify or be suspended\" links by text, and a shortened link hides where it actually goes.",
  },
  {
    text: "Your Woolworths order #48213 has been packed and is on its way. Track it here: woolworths.com.au/orders",
    isScam: false,
    explanation: "A real, spelled-out domain, no pressure, and no request for personal details.",
  },
  {
    text: "Congratulations! You've been selected to win a $500 Coles gift card. Claim now before it expires: claim-reward-au.com",
    isScam: true,
    explanation: "An unexpected prize you never entered for, plus a countdown to \"claim\" it, is a classic prize scam.",
  },
  {
    text: "Reminder: your rates notice from Noosa Council is due 15 September. Pay online at noosa.qld.gov.au or call 5329 6500.",
    isScam: false,
    explanation: "A real council domain, a normal due date, and a phone number you can independently look up to confirm.",
  },
];

let quizIndex = 0;
let quizScore = 0;

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  if (quizIndex >= quizItems.length) {
    const summary = document.createElement("div");
    summary.className = "sample-card notice";
    const p = document.createElement("p");
    p.textContent = `You got ${quizScore} out of ${quizItems.length}. Every bit of practice makes the real thing easier to spot.`;
    summary.appendChild(p);
    const restartBtn = document.createElement("button");
    restartBtn.type = "button";
    restartBtn.textContent = "Try again";
    restartBtn.addEventListener("click", () => {
      quizIndex = 0;
      quizScore = 0;
      renderQuiz();
    });
    const restartRow = document.createElement("div");
    restartRow.className = "quiz-next-row";
    restartRow.appendChild(restartBtn);
    container.append(summary, restartRow);
    return;
  }

  const item = quizItems[quizIndex];

  const progress = document.createElement("p");
  progress.className = "quiz-progress";
  progress.textContent = `Message ${quizIndex + 1} of ${quizItems.length}`;

  const messageCard = document.createElement("div");
  messageCard.className = "sample-card notice quiz-message";
  const messageText = document.createElement("p");
  messageText.textContent = item.text;
  messageCard.appendChild(messageText);

  const choices = document.createElement("div");
  choices.className = "quiz-choices";

  const scamBtn = document.createElement("button");
  scamBtn.type = "button";
  scamBtn.textContent = "Looks like a scam";

  const okBtn = document.createElement("button");
  okBtn.type = "button";
  okBtn.textContent = "Looks okay";

  const answer = (guessedScam) => {
    const correct = guessedScam === item.isScam;
    if (correct) quizScore += 1;

    const feedback = document.createElement("div");
    feedback.className = `sample-card ${correct ? "notice" : "urgent"}`;
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = correct ? "Nice pick-up" : item.isScam ? "Actually a scam" : "Actually genuine";
    const p = document.createElement("p");
    p.textContent = item.explanation;
    feedback.append(tag, p);

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.textContent = quizIndex + 1 < quizItems.length ? "Next" : "See my results";
    nextBtn.addEventListener("click", () => {
      quizIndex += 1;
      renderQuiz();
    });

    const nextRow = document.createElement("div");
    nextRow.className = "quiz-next-row";
    nextRow.appendChild(nextBtn);

    scamBtn.disabled = true;
    okBtn.disabled = true;
    container.append(feedback, nextRow);
  };

  scamBtn.addEventListener("click", () => answer(true));
  okBtn.addEventListener("click", () => answer(false));

  choices.append(scamBtn, okBtn);
  container.append(progress, messageCard, choices);
}

/* ---------- Reminders ---------- */

function loadReminders() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveReminders(reminders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

function toDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(dateStr, days) {
  const date = new Date(dateStr + "T00:00:00");
  date.setDate(date.getDate() + days);
  return toDateString(date);
}

function addYears(dateStr, years) {
  const date = new Date(dateStr + "T00:00:00");
  date.setFullYear(date.getFullYear() + years);
  return toDateString(date);
}

function nextOccurrence(dateStr, repeat) {
  if (repeat === "weekly") return addDays(dateStr, 7);
  if (repeat === "monthly") return addDays(dateStr, 30);
  if (repeat === "yearly") return addYears(dateStr, 1);
  return dateStr;
}

function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-AU";
  window.speechSynthesis.speak(utterance);
}

/* ---------- 6. Add reminder to calendar (.ics) ---------- */

function downloadIcs(reminder) {
  const dateDigits = reminder.date.replace(/-/g, "");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sfinco//SfincoAssist//EN",
    "BEGIN:VEVENT",
    `UID:${reminder.id}@sfincoassist`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${dateDigits}`,
    `SUMMARY:${reminder.text}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reminder.ics";
  a.click();
  URL.revokeObjectURL(url);
}

function renderReminders() {
  const reminders = loadReminders().sort((a, b) => a.date.localeCompare(b.date));
  const container = document.getElementById("reminders");
  const emptyState = document.getElementById("empty-state");

  container.innerHTML = "";
  emptyState.style.display = reminders.length ? "none" : "block";

  reminders.forEach((reminder) => {
    const card = document.createElement("div");
    card.className = `reminder-card ${reminder.priority}`;
    const repeatNote = repeatLabels[reminder.repeat] || "";

    const meta = document.createElement("div");
    meta.className = "reminder-meta";
    const tag = document.createElement("span");
    tag.className = "tag";
    const categoryLabel = categoryLabels[reminder.category] || categoryLabels.other;
    tag.textContent = `${categoryLabel} · ${priorityLabels[reminder.priority]}` + (repeatNote ? " · " + repeatNote : "");
    meta.appendChild(tag);

    const body = document.createElement("p");
    body.textContent = `${reminder.text} · ${formatDate(reminder.date)}`;

    const actions = document.createElement("div");
    actions.className = "reminder-actions";

    const readBtn = document.createElement("button");
    readBtn.className = "read-aloud";
    readBtn.textContent = "Read aloud";
    readBtn.addEventListener("click", () => speak(`${reminder.text}, ${formatDate(reminder.date)}`));

    const calendarBtn = document.createElement("button");
    calendarBtn.textContent = "Add to calendar";
    calendarBtn.addEventListener("click", () => downloadIcs(reminder));

    const snoozeBtn = document.createElement("button");
    snoozeBtn.className = "snooze";
    snoozeBtn.textContent = "Snooze 3 days";
    snoozeBtn.addEventListener("click", () => {
      const current = loadReminders();
      const match = current.find((r) => r.id === reminder.id);
      if (match) match.date = addDays(match.date, 3);
      saveReminders(current);
      renderReminders();
    });

    const isRecurring = reminder.repeat && reminder.repeat !== "none";
    const doneBtn = document.createElement("button");
    doneBtn.className = "done";
    doneBtn.textContent = isRecurring ? "Done for now" : "Done";
    doneBtn.addEventListener("click", () => {
      let current = loadReminders();
      const match = current.find((r) => r.id === reminder.id);
      if (match && match.repeat && match.repeat !== "none") {
        match.date = nextOccurrence(match.date, match.repeat);
      } else {
        current = current.filter((r) => r.id !== reminder.id);
      }
      saveReminders(current);
      renderReminders();
    });

    actions.append(readBtn, calendarBtn, snoozeBtn, doneBtn);
    card.append(meta, body, actions);
    container.appendChild(card);
  });
}

document.getElementById("reminder-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("reminder-text").value.trim();
  const date = document.getElementById("reminder-date").value;
  const category = document.getElementById("reminder-category").value;
  const priority = document.getElementById("reminder-priority").value;
  const repeat = document.getElementById("reminder-repeat").value;
  if (!text || !date) return;

  const reminders = loadReminders();
  reminders.push({ id: crypto.randomUUID(), text, date, category, priority, repeat });
  saveReminders(reminders);

  e.target.reset();
  document.getElementById("reminder-category").value = "other";
  document.getElementById("reminder-priority").value = "soon";
  document.getElementById("reminder-repeat").value = "none";
  renderReminders();
});

document.getElementById("export-btn").addEventListener("click", () => {
  const data = JSON.stringify(loadReminders(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sfincoassist-reminders.json";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("import-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (Array.isArray(imported)) {
        saveReminders(imported);
        renderReminders();
      }
    } catch {
      alert("That file doesn't look like a Sfinco reminders file.");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
});

/* ---------- Tabs ---------- */

const tabButtons = {
  "tab-btn-today": "tab-today",
  "tab-btn-scam": "tab-scam",
  "tab-btn-contacts": "tab-contacts",
  "tab-btn-aisafety": "tab-aisafety",
  "tab-btn-practice": "tab-practice",
  "tab-btn-reminders": "tab-reminders",
};
Object.keys(tabButtons).forEach((btnId) => {
  document.getElementById(btnId).addEventListener("click", () => {
    Object.entries(tabButtons).forEach(([id, panelId]) => {
      const isActive = id === btnId;
      document.getElementById(id).classList.toggle("active", isActive);
      document.getElementById(id).setAttribute("aria-selected", String(isActive));
      document.getElementById(panelId).classList.toggle("hidden", !isActive);
    });
  });
});

/* ---------- 7. Text size + light mode toggles ---------- */

const textSizeToggle = document.getElementById("text-size-toggle");
function applyTextSize(large) {
  document.body.classList.toggle("large-text", large);
  textSizeToggle.setAttribute("aria-pressed", String(large));
  textSizeToggle.textContent = large ? "Aa Normal text" : "Aa Larger text";
}
textSizeToggle.addEventListener("click", () => {
  const large = !document.body.classList.contains("large-text");
  localStorage.setItem(TEXT_SIZE_KEY, large ? "1" : "0");
  applyTextSize(large);
});
applyTextSize(localStorage.getItem(TEXT_SIZE_KEY) === "1");

const themeToggle = document.getElementById("theme-toggle");
function applyTheme(light) {
  document.body.classList.toggle("light-theme", light);
  themeToggle.setAttribute("aria-pressed", String(light));
  themeToggle.textContent = light ? "🌙 Dark mode" : "☀ Light mode";
}
themeToggle.addEventListener("click", () => {
  const light = !document.body.classList.contains("light-theme");
  localStorage.setItem(THEME_KEY, light ? "1" : "0");
  applyTheme(light);
});
applyTheme(localStorage.getItem(THEME_KEY) === "1");

renderReminders();
renderScamAlerts();
renderHistory();
renderTrustedContact();
renderQuiz();
renderTipOfDay();
