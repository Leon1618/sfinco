const TEXT_SIZE_KEY = "sfincoassist-text-size";
const THEME_KEY = "sfincoassist-theme";
const CONTACT_KEY = "sfincoassist-trusted-contact";

/* ---------- Undo toast: lets a destructive action be reversed instead of confirmed upfront ---------- */

let undoTimeout = null;
let undoRestore = null;

function showUndo(message, restoreFn) {
  clearTimeout(undoTimeout);
  undoRestore = restoreFn;
  const toast = document.getElementById("undo-toast");
  document.getElementById("undo-toast-message").textContent = message;
  toast.classList.remove("hidden");
  undoTimeout = setTimeout(() => {
    toast.classList.add("hidden");
    undoRestore = null;
  }, 10000);
}

document.getElementById("undo-toast-btn").addEventListener("click", () => {
  clearTimeout(undoTimeout);
  document.getElementById("undo-toast").classList.add("hidden");
  if (undoRestore) undoRestore();
  undoRestore = null;
});

/* ---------- Profile: name, greeting, dialogs ---------- */

const USERNAME_KEY = "sfincoassist-username";
const personIconSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.42 0-8 2.24-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.76-3.58-5-8-5z"/></svg>';

function timeOfDayGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  return "Good evening";
}

function applyGreeting() {
  const name = localStorage.getItem(USERNAME_KEY);
  const greeting = timeOfDayGreeting();
  document.getElementById("greeting").textContent = name ? `${greeting}, ${name}` : greeting;
  document.getElementById("profile-name-input").value = name || "";
  const avatar = document.getElementById("profile-avatar");
  if (name) {
    avatar.textContent = name.trim().charAt(0).toUpperCase();
  } else {
    avatar.innerHTML = personIconSvg;
  }
}

document.getElementById("profile-name-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("profile-name-input").value.trim();
  if (name) {
    localStorage.setItem(USERNAME_KEY, name);
  } else {
    localStorage.removeItem(USERNAME_KEY);
  }
  applyGreeting();
});

const profileDialog = document.getElementById("profile-dialog");
const helpDialog = document.getElementById("help-dialog");
const panicDialog = document.getElementById("panic-dialog");
const qrDialog = document.getElementById("qr-dialog");

function openDialog(dialog) {
  document.querySelectorAll("dialog[open]").forEach((d) => {
    if (d !== dialog) d.close();
  });
  dialog.showModal();
}

document.getElementById("profile-btn").addEventListener("click", () => openDialog(profileDialog));
document.getElementById("help-btn").addEventListener("click", () => openDialog(helpDialog));
document.getElementById("profile-close-btn").addEventListener("click", () => profileDialog.close());
document.getElementById("help-close-btn").addEventListener("click", () => helpDialog.close());
document.getElementById("panic-btn").addEventListener("click", () => openDialog(panicDialog));
document.getElementById("panic-close-btn").addEventListener("click", () => panicDialog.close());
document.getElementById("panic-contacts-link").addEventListener("click", () => {
  panicDialog.close();
  document.getElementById("tab-btn-contacts").click();
});

[profileDialog, helpDialog, panicDialog, qrDialog].forEach((dialog) => {
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
});

document.getElementById("clear-data-btn").addEventListener("click", () => {
  const snapshot = {
    username: localStorage.getItem(USERNAME_KEY),
    contact: localStorage.getItem(CONTACT_KEY),
  };
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(CONTACT_KEY);
  applyGreeting();
  renderTrustedContact();
  profileDialog.close();
  showUndo("Your data was cleared.", () => {
    if (snapshot.username) localStorage.setItem(USERNAME_KEY, snapshot.username);
    if (snapshot.contact) localStorage.setItem(CONTACT_KEY, snapshot.contact);
    applyGreeting();
    renderTrustedContact();
  });
});

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

function renderTipDate() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
  const timeStr = now.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", hour12: false });
  document.getElementById("tip-date").textContent = `${dateStr}, ${timeStr}`;
}

function renderTipOfDay() {
  const today = new Date();
  const tip = dailyTips[getDayOfYear(today) % dailyTips.length];
  renderTipDate();
  document.getElementById("tip-title").textContent = tip.title;
  document.getElementById("tip-body").textContent = tip.body;
}

setInterval(renderTipDate, 30000);

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
  document.getElementById("tab-btn-latest").click();
});
document.getElementById("latest-next-btn").addEventListener("click", () => {
  document.getElementById("tab-btn-today").click();
});

const scamAlertCategories = [
  { key: "phone", label: "Phone calls", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/></svg>' },
  { key: "text", label: "Text messages", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3v4l5-4h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4z"/></svg>' },
  { key: "email", label: "Email", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>' },
  { key: "online", label: "Online & social media", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="12" r="2.3"/><circle cx="18" cy="6" r="2.3"/><circle cx="18" cy="18" r="2.3"/><path d="M8.16 10.9 15.84 7.1M8.16 13.1l7.68 3.8" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>' },
];

const scamAlerts = [
  {
    category: "phone",
    tactic: "new",
    tag: "New tactic",
    priority: "trending",
    title: "AI-cloned voice calls",
    text: "It only takes a few seconds of audio from a video or voicemail to clone someone's voice convincingly. If you get a panicked call from a \"family member\" asking for money by gift card or bank transfer, hang up and call them back on their usual number to check it's really them.",
  },
  {
    category: "online",
    tactic: "new",
    tag: "New tactic",
    priority: "trending",
    title: "Deepfake celebrity endorsements",
    text: "Fake videos of well-known news presenters or business figures \"endorsing\" a secret investment platform are circulating on social media, generated with AI to look and sound convincing. Real public figures don't tip you off to secret trading platforms.",
  },
  {
    category: "online",
    tactic: "new",
    tag: "New tactic",
    priority: "trending",
    title: "Fake QR codes (quishing)",
    text: "Scammers sometimes stick a fake QR code sticker over a real one, on parking meters, cafe tables, or parcel slips, leading to a fake payment page instead of the real one. Look for a sticker that seems peeled or slightly crooked, and type the website in yourself if you're not sure.",
  },
  {
    category: "online",
    tactic: "new",
    tag: "New tactic",
    priority: "trending",
    title: "AI chatbots building trust before asking for money",
    text: "Some romance and investment scams now use AI chatbots that can chat naturally with hundreds of people at once, building a friendship or relationship for weeks before asking for money. A connection that eventually asks for money, especially in cryptocurrency, is a warning sign no matter how genuine it felt.",
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

/* ---------- 5. Share / print a result ---------- */

function resultToText(text, matches) {
  const lines = ["Sfinco scam check:"];
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
  if (!hasText) {
    const empty = document.createElement("p");
    empty.className = "scam-empty-notice";
    empty.textContent = "Paste a message or link first, or upload a screenshot, then press \"Check this for me\".";
    result.appendChild(empty);
    return;
  }

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

let qrStream = null;
let qrAnimationId = null;

function stopQrScan() {
  if (qrAnimationId) {
    cancelAnimationFrame(qrAnimationId);
    qrAnimationId = null;
  }
  if (qrStream) {
    qrStream.getTracks().forEach((track) => track.stop());
    qrStream = null;
  }
}

function startQrScan() {
  const video = document.getElementById("qr-video");
  const status = document.getElementById("qr-status");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  if (!("mediaDevices" in navigator) || !navigator.mediaDevices.getUserMedia || typeof jsQR !== "function") {
    status.textContent = "Camera scanning isn't supported in this browser. Try uploading a screenshot of the code instead.";
    return;
  }

  status.textContent = "Starting camera…";

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      qrStream = stream;
      video.srcObject = stream;
      video.play();
      status.textContent = "Point your camera at the QR code.";

      const tick = () => {
        if (!qrStream) return;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            status.textContent = "Found it!";
            stopQrScan();
            qrDialog.close();
            document.getElementById("scam-text").value = code.data;
            document.getElementById("scam-check-form").requestSubmit();
            return;
          }
        }
        qrAnimationId = requestAnimationFrame(tick);
      };
      qrAnimationId = requestAnimationFrame(tick);
    })
    .catch(() => {
      status.textContent = "We couldn't access the camera. Check your browser's camera permission for this site, or upload a screenshot of the code instead.";
    });
}

document.getElementById("qr-scan-btn").addEventListener("click", () => {
  openDialog(qrDialog);
  startQrScan();
});

document.getElementById("qr-close-btn").addEventListener("click", () => {
  stopQrScan();
  qrDialog.close();
});

qrDialog.addEventListener("close", stopQrScan);

document.getElementById("scam-check-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("scam-text").value.trim();
  const matches = checkMessage(text);
  renderScamResult(text, matches, text.length > 0);
});

const EXAMPLE_SCAM_TEXT = "Australia Post: Your parcel has a $3.20 customs fee that must be paid within 24 hours or it will be returned to sender. Pay here: auspost-fee-check.com";
const EXAMPLE_GENUINE_TEXT = "Hi Leo, it's Grace from book club. Next meet-up is Thursday 7pm at the Noosaville library, see you then!";

document.getElementById("try-scam-example-btn").addEventListener("click", () => {
  document.getElementById("scam-text").value = EXAMPLE_SCAM_TEXT;
  document.getElementById("scam-check-form").requestSubmit();
});

document.getElementById("try-genuine-example-btn").addEventListener("click", () => {
  document.getElementById("scam-text").value = EXAMPLE_GENUINE_TEXT;
  document.getElementById("scam-check-form").requestSubmit();
});

function buildAlertCard(alert) {
  const card = document.createElement("div");
  card.className = `sample-card ${alert.priority}`;
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = alert.tag;
  const title = document.createElement("strong");
  title.className = "sample-card-title";
  title.textContent = alert.title;
  const text = document.createElement("p");
  text.textContent = alert.text;
  card.append(tag, title, text);
  return card;
}

function renderScamAlerts() {
  const newTactics = document.getElementById("new-tactics");
  newTactics.innerHTML = "";
  scamAlerts
    .filter((a) => a.tactic === "new")
    .forEach((alert) => newTactics.appendChild(buildAlertCard(alert)));

  const container = document.getElementById("latest-scams");
  container.innerHTML = "";

  scamAlertCategories.forEach((category, index) => {
    const alertsInCategory = scamAlerts.filter((a) => a.category === category.key && a.tactic !== "new");
    if (alertsInCategory.length === 0) return;

    const details = document.createElement("details");
    details.className = "disclosure";
    if (index === 0) details.open = true;

    const summary = document.createElement("summary");
    const iconSpan = document.createElement("span");
    iconSpan.className = "tab-icon";
    iconSpan.setAttribute("aria-hidden", "true");
    iconSpan.innerHTML = category.icon;
    const labelSpan = document.createElement("span");
    labelSpan.textContent = category.label;
    summary.append(iconSpan, labelSpan);
    details.appendChild(summary);

    const body = document.createElement("div");
    body.className = "disclosure-body";

    alertsInCategory.forEach((alert) => body.appendChild(buildAlertCard(alert)));

    details.appendChild(body);
    container.appendChild(details);
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

document.querySelectorAll(".read-aloud[data-text]").forEach((btn) => {
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
    text: "Hi Mum, it's Chloe. Running 10 minutes late for lunch at Massimo's in Noosa Junction, sorry!",
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
  {
    text: "Facebook Marketplace: Hi, I'm interested in your couch! I'll pay via PayPal, but you'll need to upgrade to a Business account first, here's a link to do that.",
    isScam: true,
    explanation: "There's no such thing as needing to \"upgrade\" your PayPal account to receive a payment. This is a common Marketplace scam that ends with your account details being stolen.",
  },
  {
    text: "Hi love, it's your neighbour Pat from number 12. Bin day's been moved to Thursday this week because of the public holiday.",
    isScam: false,
    explanation: "A normal, low-key message with no links, no money, and nothing needing an urgent response.",
  },
  {
    text: "Microsoft Security Alert: We've detected 3 viruses on your computer. Call 1800 XXX XXX immediately to avoid data loss.",
    isScam: true,
    explanation: "Microsoft doesn't monitor your computer and hand you a phone number to call. This is the classic tech support scam, aimed at getting remote access to your computer.",
  },
  {
    text: "Your prescription is ready for pickup at Terrace Pharmacy, Noosaville. Open until 6pm today.",
    isScam: false,
    explanation: "A routine, low-stakes message with no links or requests, just information.",
  },
  {
    text: "Hi, I saw your profile and felt an instant connection. I'm an engineer currently working on an oil rig, can we chat on WhatsApp instead of here?",
    isScam: true,
    explanation: "Moving straight to a private app, a vague overseas job, and an instant declaration of connection are hallmarks of a romance scam that usually ends with a request for money.",
  },
  {
    text: "Your GP appointment with Dr Chen is confirmed for Tuesday 10:30am at Noosa Civic Medical Centre.",
    isScam: false,
    explanation: "A standard appointment confirmation, no links, no payment requests.",
  },
  {
    text: "INVESTMENT ALERT: Turn $250 into $4,000 in 7 days with our AI trading bot, as seen on Sunrise and 60 Minutes! Limited spots, join now.",
    isScam: true,
    explanation: "Guaranteed high returns in a short time, plus a fake claim of being featured on TV, are strong signs of an investment scam. No legitimate trading bot can guarantee profits.",
  },
  {
    text: "Reminder from Sunshine Coast Council Library: \"The Thursday Murder Club\" is due back on 3 September.",
    isScam: false,
    explanation: "A routine library reminder, nothing to click, nothing to pay.",
  },
];

const redFlagItems = [
  {
    text: "Your parcel could not be delivered due to an unpaid customs fee of $2.99. Pay now to reschedule delivery: http://auspost-redelivery.info",
    options: ["an unpaid customs fee of $2.99", "Pay now to reschedule delivery", "http://auspost-redelivery.info"],
    correctIndex: 2,
    explanation: "That web address isn't the real auspost.com.au. A fake or lookalike link is one of the strongest scam signs there is, even when the rest of the message sounds mundane.",
  },
  {
    text: "CommBank Alert: Unusual activity detected on your account. Verify immediately or your card will be suspended: bit.ly/cba-secure",
    options: ["Unusual activity detected on your account", "Verify immediately or your card will be suspended", "bit.ly/cba-secure"],
    correctIndex: 2,
    explanation: "A shortened link like this hides where it actually leads. Real banks link straight to their own website, never through a bit.ly address. The urgent tone is worth noticing too, but the hidden link is the clearest tell.",
  },
  {
    text: "Congratulations! You've been selected to win a $500 Coles gift card. Claim now before it expires: claim-reward-au.com",
    options: ["You've been selected to win a $500 Coles gift card", "Claim now before it expires", "claim-reward-au.com"],
    correctIndex: 0,
    explanation: "An unexpected prize for a competition you never entered is the classic sign of a prize scam, no matter how official the rest of it looks.",
  },
  {
    text: "myGov: Your account has unusual activity and will be suspended. Update your details now at mygov-secure-update.com",
    options: ["unusual activity and will be suspended", "Update your details now", "mygov-secure-update.com"],
    correctIndex: 2,
    explanation: "Real government websites end in .gov.au. This one doesn't, and that's the giveaway even though the rest of the message sounds urgent and official.",
  },
  {
    text: "Your electricity account is overdue. Service will be disconnected within 24 hours unless you pay now: energy-billpay-au.net",
    options: ["Your electricity account is overdue", "disconnected within 24 hours unless you pay now", "energy-billpay-au.net"],
    correctIndex: 1,
    explanation: "A 24-hour deadline is designed to rush you into paying before you stop and check. No genuine energy provider disconnects that fast over an unpaid bill.",
  },
  {
    text: "You're eligible for a $310 tax refund. To receive it, confirm your online banking login and card PIN here.",
    options: ["eligible for a $310 tax refund", "confirm your online banking login and card PIN", "here"],
    correctIndex: 1,
    explanation: "A genuine refund never needs your online banking login or card PIN to be released. Anyone asking for both at once is phishing.",
  },
  {
    text: "Nan, it's me, I've been in an accident and I need $2,000 for the tow truck right now, please don't tell Mum and Dad.",
    options: ["I've been in an accident", "I need $2,000 for the tow truck right now", "please don't tell Mum and Dad"],
    correctIndex: 2,
    explanation: "Asking you to keep it secret from family is a major warning sign on its own, it's there to stop you checking the story with anyone else. Hang up and call the person back on their usual number.",
  },
  {
    text: "Your Woolworths order #48213 has been packed and is on its way. Track it here: woolworths.com.au/orders",
    options: ["has been packed and is on its way", "Track it here", "woolworths.com.au/orders"],
    correctIndex: -1,
    explanation: "A real, spelled-out domain, no pressure, and no request for money or personal details. This one looks genuine.",
  },
  {
    text: "Reminder: your rates notice from Noosa Council is due 15 September. Pay online at noosa.qld.gov.au or call 5329 6500.",
    options: ["due 15 September", "Pay online at noosa.qld.gov.au", "or call 5329 6500"],
    correctIndex: -1,
    explanation: "A real council domain, a normal due date, and a phone number you could look up independently to confirm. Nothing here is pushing you to act in a hurry.",
  },
  {
    text: "Hi Mum, it's Chloe. Running 10 minutes late for lunch at Massimo's in Noosa Junction, sorry!",
    options: ["Running 10 minutes late for lunch", "at Massimo's in Noosa Junction", "sorry!"],
    correctIndex: -1,
    explanation: "No links, no urgency, no request for money or details, just a normal message from someone you know.",
  },
];

const QUIZ_ROUND_SIZE = 6;
const REDFLAG_ROUND_SIZE = 5;
const STREAK_KEY = "sfincoassist-quiz-streak";
const BEST_STREAK_KEY = "sfincoassist-quiz-best-streak";

function shuffledIndices(n) {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function nextRotatedIndices(poolSize, count, storageKey) {
  let state = null;
  try {
    state = JSON.parse(localStorage.getItem(storageKey));
  } catch (e) {
    state = null;
  }
  if (!state || !Array.isArray(state.queue) || state.poolSize !== poolSize) {
    state = { queue: shuffledIndices(poolSize), poolSize };
  }
  const picked = [];
  while (picked.length < count) {
    if (state.queue.length === 0) state.queue = shuffledIndices(poolSize);
    picked.push(state.queue.shift());
  }
  localStorage.setItem(storageKey, JSON.stringify(state));
  return picked;
}

function getStreak() {
  return Number(localStorage.getItem(STREAK_KEY) || 0);
}

function getBestStreak() {
  return Number(localStorage.getItem(BEST_STREAK_KEY) || 0);
}

function renderStreak() {
  const el = document.getElementById("quiz-streak");
  if (!el) return;
  const streak = getStreak();
  const best = getBestStreak();
  if (streak > 0) {
    el.textContent = `Current streak: ${streak} in a row. Best: ${best}.`;
  } else if (best > 0) {
    el.textContent = `Best streak: ${best} in a row. Play a round below to beat it.`;
  } else {
    el.textContent = "Play a round below to start your streak.";
  }
}

function recordAnswer(correct) {
  let streak = getStreak();
  let best = getBestStreak();
  streak = correct ? streak + 1 : 0;
  if (streak > best) best = streak;
  localStorage.setItem(STREAK_KEY, String(streak));
  localStorage.setItem(BEST_STREAK_KEY, String(best));
  renderStreak();
}

let quizRoundItems = [];
let quizIndex = 0;
let quizScore = 0;

function startQuizRound() {
  const count = Math.min(QUIZ_ROUND_SIZE, quizItems.length);
  const idx = nextRotatedIndices(quizItems.length, count, "sfincoassist-quiz-rotation");
  quizRoundItems = idx.map((i) => quizItems[i]);
}

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  if (quizIndex >= quizRoundItems.length) {
    const summary = document.createElement("div");
    summary.className = "sample-card notice";
    const p = document.createElement("p");
    p.textContent = `You got ${quizScore} out of ${quizRoundItems.length}. Every bit of practice makes the real thing easier to spot.`;
    summary.appendChild(p);
    const restartBtn = document.createElement("button");
    restartBtn.type = "button";
    restartBtn.textContent = "Try again";
    restartBtn.addEventListener("click", () => {
      startQuizRound();
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

  const item = quizRoundItems[quizIndex];

  const progress = document.createElement("p");
  progress.className = "quiz-progress";
  progress.textContent = `Message ${quizIndex + 1} of ${quizRoundItems.length}`;

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
    recordAnswer(correct);
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
    nextBtn.textContent = quizIndex + 1 < quizRoundItems.length ? "Next" : "See my results";
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

let redFlagRoundItems = [];
let redFlagIndex = 0;
let redFlagScore = 0;

function startRedFlagRound() {
  const count = Math.min(REDFLAG_ROUND_SIZE, redFlagItems.length);
  const idx = nextRotatedIndices(redFlagItems.length, count, "sfincoassist-redflag-rotation");
  redFlagRoundItems = idx.map((i) => redFlagItems[i]);
}

function renderRedFlag() {
  const container = document.getElementById("redflag-container");
  container.innerHTML = "";

  if (redFlagIndex >= redFlagRoundItems.length) {
    const summary = document.createElement("div");
    summary.className = "sample-card notice";
    const p = document.createElement("p");
    p.textContent = `You got ${redFlagScore} out of ${redFlagRoundItems.length}. Every bit of practice makes the real thing easier to spot.`;
    summary.appendChild(p);
    const restartBtn = document.createElement("button");
    restartBtn.type = "button";
    restartBtn.textContent = "Try again";
    restartBtn.addEventListener("click", () => {
      startRedFlagRound();
      redFlagIndex = 0;
      redFlagScore = 0;
      renderRedFlag();
    });
    const restartRow = document.createElement("div");
    restartRow.className = "quiz-next-row";
    restartRow.appendChild(restartBtn);
    container.append(summary, restartRow);
    return;
  }

  const item = redFlagRoundItems[redFlagIndex];

  const progress = document.createElement("p");
  progress.className = "quiz-progress";
  progress.textContent = `Message ${redFlagIndex + 1} of ${redFlagRoundItems.length}`;

  const messageCard = document.createElement("div");
  messageCard.className = "sample-card notice quiz-message";
  const messageText = document.createElement("p");
  messageText.textContent = item.text;
  messageCard.appendChild(messageText);

  const prompt = document.createElement("p");
  prompt.textContent = "Which part gives it away?";

  const choices = document.createElement("div");
  choices.className = "quiz-choices redflag-choices";

  const allOptions = item.options
    .map((text, i) => ({ text, isCorrect: i === item.correctIndex }))
    .concat([{ text: "Nothing here looks suspicious", isCorrect: item.correctIndex === -1 }]);

  const buttons = allOptions.map((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = opt.text;
    return btn;
  });

  const answer = (chosenCorrect) => {
    recordAnswer(chosenCorrect);
    if (chosenCorrect) redFlagScore += 1;

    const feedback = document.createElement("div");
    feedback.className = `sample-card ${chosenCorrect ? "notice" : "urgent"}`;
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = chosenCorrect ? "Nice pick-up" : "Here's the tell";
    const p = document.createElement("p");
    p.textContent = item.explanation;
    feedback.append(tag, p);

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.textContent = redFlagIndex + 1 < redFlagRoundItems.length ? "Next" : "See my results";
    nextBtn.addEventListener("click", () => {
      redFlagIndex += 1;
      renderRedFlag();
    });

    const nextRow = document.createElement("div");
    nextRow.className = "quiz-next-row";
    nextRow.appendChild(nextBtn);

    buttons.forEach((b) => (b.disabled = true));
    container.append(feedback, nextRow);
  };

  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => answer(allOptions[i].isCorrect));
  });

  choices.append(...buttons);
  container.append(progress, messageCard, prompt, choices);
}

const callScenarios = [
  {
    title: "Bank fraud department",
    steps: [
      {
        caller: "Hi, this is Michelle from CommBank's fraud team. We've noticed a suspicious $1,200 transfer from your account just now. Can you confirm your account number and the security code we just texted you so I can stop it?",
        choices: [
          { text: "Give the account number and the code", correct: false, feedback: "A real bank will never ask you to read out a one-time code over the phone. That code is the one thing standing between a scammer and your account." },
          { text: "Say you'll call the bank back on the number on your card", correct: true },
        ],
      },
      {
        caller: "Wait, don't hang up, if you do the transfer will go through in the next few minutes. I need you to stay on the line and confirm your date of birth right now.",
        choices: [
          { text: "Stay on the line and give your date of birth", correct: false, feedback: "Creating panic to stop you hanging up is a classic pressure tactic. Real banks are fine with you calling back, there's no transfer that can't be stopped by hanging up." },
          { text: "Hang up anyway and call the number on the back of your card", correct: true },
        ],
      },
    ],
    safeOutcome: "You hung up and called the bank yourself. Turns out there was no suspicious transfer, the call was a scam. Well played.",
  },
  {
    title: "Grandchild in trouble",
    steps: [
      {
        caller: "Nan, it's me, I'm in so much trouble, I crashed the car and I need $3,000 for the tow and the police are here. Please don't tell Mum and Dad, can you just transfer it now?",
        choices: [
          { text: "Transfer the money straight away", correct: false, feedback: "Urgency plus a request to keep it secret from family is one of the strongest scam combinations there is, especially now that voices can be cloned convincingly from just a few seconds of audio." },
          { text: "Say you'll call them back on their usual number first", correct: true },
        ],
      },
      {
        caller: "No, don't hang up, this phone is borrowed, you won't be able to reach me. Please just send it to this account now.",
        choices: [
          { text: "Send the money to the account they give you", correct: false, feedback: "Insisting you can't call back on a normal number, and pushing a new account to pay into, are both major warning signs. A real emergency doesn't fall apart just because you double check." },
          { text: "Hang up and call your grandchild's actual number, or another family member, to check", correct: true },
        ],
      },
    ],
    safeOutcome: "You checked with the family directly instead of acting on the call alone. Turns out it wasn't them. Trusting that instinct paid off.",
  },
  {
    title: "Tech support call",
    steps: [
      {
        caller: "Hello, this is Telstra technical support, we've detected a virus on your home network coming from your computer. I need to remote into your computer right now to remove it before it spreads.",
        choices: [
          { text: "Let them remote into your computer", correct: false, feedback: "No phone or internet provider monitors your computer for viruses or calls you out of the blue to fix it. Giving remote access hands over full control of your computer and everything on it." },
          { text: "Say no and hang up", correct: true },
        ],
      },
      {
        caller: "The caller rings straight back: wait, if you hang up your internet will be cut off within the hour. I just need your account PIN to stop that happening.",
        choices: [
          { text: "Give them the account PIN to avoid losing internet", correct: false, feedback: "Threatening to cut off a service unless you act immediately is designed to panic you into handing over details. No provider disconnects you like that over the phone." },
          { text: "Hang up again and call your provider yourself using the number on a bill", correct: true },
        ],
      },
    ],
    safeOutcome: "You didn't let the pressure rush you, and checked with the provider directly. That's exactly the right move.",
  },
];

let callScenario = null;
let callStepIndex = 0;

function startCallRound() {
  const idx = nextRotatedIndices(callScenarios.length, 1, "sfincoassist-callsim-rotation");
  callScenario = callScenarios[idx[0]];
  callStepIndex = 0;
}

function renderCallSim() {
  const container = document.getElementById("callsim-container");
  container.innerHTML = "";

  const step = callScenario.steps[callStepIndex];

  if (!step) {
    const summary = document.createElement("div");
    summary.className = "sample-card notice";
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "Call handled safely";
    const p = document.createElement("p");
    p.textContent = callScenario.safeOutcome;
    summary.append(tag, p);

    const restartBtn = document.createElement("button");
    restartBtn.type = "button";
    restartBtn.textContent = "Try another call";
    restartBtn.addEventListener("click", () => {
      startCallRound();
      renderCallSim();
    });
    const restartRow = document.createElement("div");
    restartRow.className = "quiz-next-row";
    restartRow.appendChild(restartBtn);
    container.append(summary, restartRow);
    return;
  }

  const progress = document.createElement("p");
  progress.className = "quiz-progress";
  progress.textContent = `${callScenario.title}: step ${callStepIndex + 1} of ${callScenario.steps.length}`;

  const messageCard = document.createElement("div");
  messageCard.className = "sample-card notice quiz-message";
  const callerTag = document.createElement("span");
  callerTag.className = "tag";
  callerTag.textContent = "Caller says";
  const callerText = document.createElement("p");
  callerText.textContent = step.caller;
  messageCard.append(callerTag, callerText);

  const prompt = document.createElement("p");
  prompt.textContent = "What do you do?";

  const choices = document.createElement("div");
  choices.className = "quiz-choices redflag-choices";

  const buttons = step.choices.map((choice) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = choice.text;
    return btn;
  });

  const isLastStep = callStepIndex + 1 >= callScenario.steps.length;

  const answer = (choice) => {
    recordAnswer(choice.correct);

    const feedback = document.createElement("div");
    feedback.className = `sample-card ${choice.correct ? "notice" : "urgent"}`;
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = choice.correct ? "Good move" : "That's how the scam works";
    const p = document.createElement("p");
    p.textContent = choice.correct
      ? isLastStep
        ? "That's the safer move."
        : "That's the safer move. The caller tries a different angle."
      : choice.feedback;
    feedback.append(tag, p);

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    if (choice.correct) {
      nextBtn.textContent = isLastStep ? "See what happened" : "Next";
      nextBtn.addEventListener("click", () => {
        callStepIndex += 1;
        renderCallSim();
      });
    } else {
      nextBtn.textContent = "Try another call";
      nextBtn.addEventListener("click", () => {
        startCallRound();
        renderCallSim();
      });
    }

    const nextRow = document.createElement("div");
    nextRow.className = "quiz-next-row";
    nextRow.appendChild(nextBtn);

    buttons.forEach((b) => (b.disabled = true));
    container.append(feedback, nextRow);
  };

  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => answer(step.choices[i]));
  });

  choices.append(...buttons);
  container.append(progress, messageCard, prompt, choices);
}

const fakeSiteItems = [
  {
    org: "Australia Post",
    options: ["auspost.com.au", "auspost-redelivery.com"],
    correctIndex: 0,
    explanation: "The real Australia Post site is auspost.com.au. Anything with extra words tacked on before the .com is usually a lookalike built to catch people scanning quickly.",
  },
  {
    org: "myGov",
    options: ["mygov-au-secure.com", "my.gov.au"],
    correctIndex: 1,
    explanation: "Real Australian government sites end in .gov.au, not .com. A domain that just includes the word \"gov\" isn't the same thing as actually being government-issued.",
  },
  {
    org: "CommBank",
    options: ["commbank.com.au", "commbank-netbank-secure.com"],
    correctIndex: 0,
    explanation: "CommBank's real address is commbank.com.au. A longer address stuffed with reassuring words like \"secure\" is a common trick, real banks don't need to convince you that way.",
  },
  {
    org: "Australian Taxation Office",
    options: ["ato-refund-claim.com", "ato.gov.au"],
    correctIndex: 1,
    explanation: "The ATO's real site is ato.gov.au. A \"refund claim\" address promising money is designed to get you clicking before you check where it actually leads.",
  },
  {
    org: "Linkt (toll roads)",
    options: ["linkt.com.au", "linkt-toll-payment.net"],
    correctIndex: 0,
    explanation: "Linkt's real address is linkt.com.au. A .net address with \"payment\" added on is built to look official for just long enough to get your card details.",
  },
  {
    org: "Services Australia",
    options: ["centrelink-payments-au.com", "servicesaustralia.gov.au"],
    correctIndex: 1,
    explanation: "Centrelink is run by Services Australia, whose real site is servicesaustralia.gov.au. Again, look for .gov.au, not a .com address that just mentions Centrelink.",
  },
  {
    org: "Woolworths",
    options: ["woolworths.com.au", "woolworths-rewards-claim.com"],
    correctIndex: 0,
    explanation: "Woolworths' real address is woolworths.com.au. A separate \"rewards claim\" address is a common way to run a fake competition or points scam under a trusted name.",
  },
  {
    org: "Telstra",
    options: ["telstra-billing-update.com", "telstra.com.au"],
    correctIndex: 1,
    explanation: "Telstra's real address is telstra.com.au. A \"billing update\" address is built to catch you off guard about an unpaid bill that doesn't actually exist.",
  },
];

const FAKESITE_ROUND_SIZE = 5;
let fakeSiteRoundItems = [];
let fakeSiteIndex = 0;
let fakeSiteScore = 0;

function startFakeSiteRound() {
  const count = Math.min(FAKESITE_ROUND_SIZE, fakeSiteItems.length);
  const idx = nextRotatedIndices(fakeSiteItems.length, count, "sfincoassist-fakesite-rotation");
  fakeSiteRoundItems = idx.map((i) => fakeSiteItems[i]);
}

function renderFakeSite() {
  const container = document.getElementById("fakesite-container");
  container.innerHTML = "";

  if (fakeSiteIndex >= fakeSiteRoundItems.length) {
    const summary = document.createElement("div");
    summary.className = "sample-card notice";
    const p = document.createElement("p");
    p.textContent = `You got ${fakeSiteScore} out of ${fakeSiteRoundItems.length}. Every bit of practice makes the real thing easier to spot.`;
    summary.appendChild(p);

    const restartBtn = document.createElement("button");
    restartBtn.type = "button";
    restartBtn.textContent = "Try again";
    restartBtn.addEventListener("click", () => {
      startFakeSiteRound();
      fakeSiteIndex = 0;
      fakeSiteScore = 0;
      renderFakeSite();
    });
    const restartRow = document.createElement("div");
    restartRow.className = "quiz-next-row";
    restartRow.appendChild(restartBtn);
    container.append(summary, restartRow);
    return;
  }

  const item = fakeSiteRoundItems[fakeSiteIndex];

  const progress = document.createElement("p");
  progress.className = "quiz-progress";
  progress.textContent = `Website ${fakeSiteIndex + 1} of ${fakeSiteRoundItems.length}`;

  const prompt = document.createElement("p");
  prompt.innerHTML = `Which of these is the real <strong>${item.org}</strong> website?`;

  const choices = document.createElement("div");
  choices.className = "quiz-choices redflag-choices";

  const buttons = item.options.map((text, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = text;
    btn.addEventListener("click", () => answer(i === item.correctIndex));
    return btn;
  });

  const answer = (correct) => {
    recordAnswer(correct);
    if (correct) fakeSiteScore += 1;

    const feedback = document.createElement("div");
    feedback.className = `sample-card ${correct ? "notice" : "urgent"}`;
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = correct ? "Nice pick-up" : "Here's the tell";
    const p = document.createElement("p");
    p.textContent = item.explanation;
    feedback.append(tag, p);

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.textContent = fakeSiteIndex + 1 < fakeSiteRoundItems.length ? "Next" : "See my results";
    nextBtn.addEventListener("click", () => {
      fakeSiteIndex += 1;
      renderFakeSite();
    });

    const nextRow = document.createElement("div");
    nextRow.className = "quiz-next-row";
    nextRow.appendChild(nextBtn);

    buttons.forEach((b) => (b.disabled = true));
    container.append(feedback, nextRow);
  };

  choices.append(...buttons);
  container.append(progress, prompt, choices);
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-AU";
  window.speechSynthesis.speak(utterance);
}

const glossaryTerms = [
  { term: "Phishing", definition: "A fake email or website pretending to be from a real organisation, designed to trick you into handing over passwords or personal details." },
  { term: "Smishing", definition: "Phishing that arrives by text message (SMS) instead of email, often a fake delivery, toll, or bank alert with a link." },
  { term: "Vishing", definition: "Phishing that happens over a phone call, usually someone pretending to be your bank, the police, or a government department." },
  { term: "Quishing", definition: "Phishing using a QR code instead of a link, often a fake sticker placed over a real one on a parking meter, menu, or parcel slip." },
  { term: "Two-factor authentication (2FA)", definition: "A second check after your password, usually a code sent to your phone, so a stolen password alone isn't enough to get into your account." },
  { term: "VPN", definition: "A tool that hides your internet connection's location and encrypts your traffic. Genuinely useful for privacy, but not something a real organisation will ever ask you to install to \"fix\" your account." },
  { term: "Malware", definition: "Software designed to harm your device or steal information, often installed after clicking a link or opening an attachment from a scam message." },
  { term: "Deepfake", definition: "An AI-generated video or audio clip made to look or sound like a real person saying something they never actually said." },
  { term: "Spoofing", definition: "Faking the sender's name or number so a message looks like it's from your bank, a family member, or a business, when it isn't." },
  { term: "Social engineering", definition: "The broad term for tricking someone into an action or a decision, rather than hacking a computer. Almost every scam is social engineering first." },
];

function renderGlossary() {
  const list = document.getElementById("glossary-list");
  if (!list) return;
  list.innerHTML = "";
  glossaryTerms.forEach((entry) => {
    const dt = document.createElement("dt");
    dt.textContent = entry.term;
    const dd = document.createElement("dd");
    dd.textContent = entry.definition;
    list.append(dt, dd);
  });
}

/* ---------- Tabs ---------- */

const tabButtons = {
  "tab-btn-today": "tab-today",
  "tab-btn-scam": "tab-scam",
  "tab-btn-contacts": "tab-contacts",
  "tab-btn-aisafety": "tab-aisafety",
  "tab-btn-practice": "tab-practice",
  "tab-btn-latest": "tab-latest",
};
const tabsNav = document.querySelector(".tabs");
Object.keys(tabButtons).forEach((btnId) => {
  document.getElementById(btnId).addEventListener("click", () => {
    Object.entries(tabButtons).forEach(([id, panelId]) => {
      const isActive = id === btnId;
      document.getElementById(id).classList.toggle("active", isActive);
      document.getElementById(id).setAttribute("aria-selected", String(isActive));
      document.getElementById(panelId).classList.toggle("hidden", !isActive);
    });
    tabsNav.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ---------- 7. Text size + light mode toggles ---------- */

const textSizeLevels = ["normal", "large", "xlarge"];
const textSizeOptions = document.querySelectorAll(".text-size-option");

function applyTextSize(level) {
  document.documentElement.classList.remove("text-large", "text-xlarge");
  if (level === "large") document.documentElement.classList.add("text-large");
  if (level === "xlarge") document.documentElement.classList.add("text-xlarge");
  textSizeOptions.forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.level === level));
  });
}

function setTextSize(level) {
  localStorage.setItem(TEXT_SIZE_KEY, level);
  applyTextSize(level);
}

textSizeOptions.forEach((btn) => {
  btn.addEventListener("click", () => setTextSize(btn.dataset.level));
});

const savedTextSize = localStorage.getItem(TEXT_SIZE_KEY);
applyTextSize(textSizeLevels.includes(savedTextSize) ? savedTextSize : "normal");

const themeOptions = document.querySelectorAll(".theme-toggle-option");
function applyTheme(light) {
  document.body.classList.toggle("light-theme", light);
  themeOptions.forEach((btn) => {
    btn.setAttribute("aria-pressed", String((btn.dataset.theme === "light") === light));
  });
}
function setTheme(light) {
  localStorage.setItem(THEME_KEY, light ? "1" : "0");
  applyTheme(light);
}
themeOptions.forEach((btn) => {
  btn.addEventListener("click", () => setTheme(btn.dataset.theme === "light"));
});
applyTheme(localStorage.getItem(THEME_KEY) === "1");

/* ---------- Search ---------- */

function buildSearchIndex() {
  const index = [];

  Object.keys(tabButtons).forEach((btnId) => {
    const btn = document.getElementById(btnId);
    const label = btn.querySelector(".tab-label").textContent;
    index.push({
      label,
      description: "Go to this section",
      keywords: label.toLowerCase(),
      action: () => btn.click(),
    });
  });

  document.querySelectorAll(".contact-card").forEach((card) => {
    const nameEl = card.querySelector(".contact-info strong");
    if (!nameEl) return;
    const name = nameEl.textContent;
    const descEl = card.querySelector(".contact-info p");
    const detailEl = card.querySelector(".contact-detail");
    const desc = descEl ? descEl.textContent : "";
    const detail = detailEl ? detailEl.textContent : "";
    const detailsParent = card.closest("details");
    index.push({
      label: name,
      description: detail ? `${desc} ${detail}` : desc,
      keywords: `${name} ${desc} ${detail}`.toLowerCase(),
      action: () => {
        document.getElementById("tab-btn-contacts").click();
        if (detailsParent) detailsParent.open = true;
        setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      },
    });
  });

  scamAlerts.forEach((alert) => {
    index.push({
      label: alert.tag,
      description: alert.text,
      keywords: `${alert.tag} ${alert.text}`.toLowerCase(),
      action: () => document.getElementById("tab-btn-latest").click(),
    });
  });

  glossaryTerms.forEach((entry) => {
    const glossaryDetails = document.getElementById("glossary-list")?.closest("details");
    index.push({
      label: entry.term,
      description: entry.definition,
      keywords: `${entry.term} ${entry.definition} glossary meaning`.toLowerCase(),
      action: () => {
        document.getElementById("tab-btn-aisafety").click();
        if (glossaryDetails) glossaryDetails.open = true;
        setTimeout(() => glossaryDetails?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      },
    });
  });

  return index;
}

let searchIndex = [];

function renderSearchResults(matches, hasQuery) {
  const results = document.getElementById("search-results");
  results.innerHTML = "";

  if (!hasQuery) {
    results.classList.add("hidden");
    return;
  }

  if (matches.length === 0) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = 'No matches. Try a different word, or use "Check a message" for something you\'ve actually received.';
    results.appendChild(empty);
  } else {
    matches.forEach((item) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "search-result-row";
      row.setAttribute("role", "option");

      const label = document.createElement("strong");
      label.textContent = item.label;
      row.appendChild(label);

      if (item.description) {
        const desc = document.createElement("span");
        desc.textContent = item.description;
        row.appendChild(desc);
      }

      row.addEventListener("click", () => {
        item.action();
        document.getElementById("search-input").value = "";
        results.classList.add("hidden");
      });

      results.appendChild(row);
    });
  }

  results.classList.remove("hidden");
}

function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    renderSearchResults([], false);
    return;
  }
  const matches = searchIndex.filter((item) => item.keywords.includes(q)).slice(0, 6);
  renderSearchResults(matches, true);
}

document.getElementById("search-input").addEventListener("input", (e) => runSearch(e.target.value));
document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const first = document.querySelector(".search-result-row");
  if (first) first.click();
});

/* ---------- Voice search ---------- */

const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
const voiceBtn = document.getElementById("voice-search-btn");
const voiceStatus = document.getElementById("voice-search-status");

if (SpeechRecognitionCtor) {
  const recognition = new SpeechRecognitionCtor();
  recognition.lang = "en-AU";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let listening = false;

  recognition.addEventListener("start", () => {
    listening = true;
    voiceBtn.classList.add("listening");
    voiceStatus.textContent = "Listening…";
    voiceStatus.classList.remove("hidden");
  });

  recognition.addEventListener("result", (e) => {
    const transcript = e.results[0][0].transcript;
    document.getElementById("search-input").value = transcript;
    runSearch(transcript);
  });

  recognition.addEventListener("end", () => {
    listening = false;
    voiceBtn.classList.remove("listening");
    voiceStatus.classList.add("hidden");
  });

  recognition.addEventListener("error", () => {
    voiceStatus.textContent = "Didn't catch that. Try typing instead.";
    setTimeout(() => voiceStatus.classList.add("hidden"), 3000);
  });

  voiceBtn.addEventListener("click", () => {
    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });
} else {
  voiceBtn.disabled = true;
  voiceBtn.title = "Voice search isn't supported in this browser";
}

renderScamAlerts();
renderTrustedContact();
startQuizRound();
renderQuiz();
startRedFlagRound();
renderRedFlag();
startCallRound();
renderCallSim();
startFakeSiteRound();
renderFakeSite();
renderStreak();
renderGlossary();
renderTipOfDay();
applyGreeting();
searchIndex = buildSearchIndex();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

let deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const installBtn = document.getElementById("install-btn");
  installBtn.classList.remove("hidden");
});

document.getElementById("install-btn").addEventListener("click", () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.finally(() => {
    deferredInstallPrompt = null;
    document.getElementById("install-btn").classList.add("hidden");
  });
});

window.addEventListener("appinstalled", () => {
  document.getElementById("install-btn").classList.add("hidden");
  document.getElementById("install-instructions").textContent = "Sfinco is installed on this device.";
});
