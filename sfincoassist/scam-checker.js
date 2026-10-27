/* SfincoAssist scam checker logic. Reads scamSignals, shortenerDomains and bankKeywords
   from scam-data.js (which must load first). No DOM access, so it can be tested in node. */

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

  // only a message that actually contains a link can have a lookalike one
  const hasLink = /https?:\/\/|www\.|\b[a-z0-9][a-z0-9-]*\.[a-z]{2,}\b/.test(lower);
  if (hasLink && bankKeywords.some((k) => lower.includes(k)) && !lower.includes(".com.au") && !lower.includes(".gov.au")) {
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
