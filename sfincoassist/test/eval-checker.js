/* Runs the scam checker over a set of labelled messages and reports what it
   catches, misses, and wrongly flags.

     node sfincoassist/test/eval-checker.js

   Exits with an error (so it can gate a change) if a genuine message gets a
   warning, or a scam the checker used to catch is missed. Known gaps and
   known false alarms are listed separately and don't fail the run. */

const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

const data = fs.readFileSync(path.join(root, "scam-data.js"), "utf8");
const checker = fs.readFileSync(path.join(root, "scam-checker.js"), "utf8");
const { checkMessage } = new Function(data + "\n" + checker + "\nreturn { checkMessage };")();

// the practice games already hold labelled messages, so reuse them rather than copy them
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const start = app.indexOf("const quizItems = [");
const end = app.indexOf("const QUIZ_ROUND_SIZE", start);
const { quizItems, redFlagItems } = new Function(app.slice(start, end) + "\nreturn { quizItems, redFlagItems };")();

const cases = [];
const seen = new Set();
const add = (c) => { if (!seen.has(c.text)) { seen.add(c.text); cases.push(c); } };
quizItems.forEach((q) => add({ text: q.text, scam: q.isScam, source: "practice" }));
redFlagItems.forEach((r) => add({ text: r.text, scam: r.correctIndex !== -1, source: "practice" }));
require("./cases.js").forEach((c) => add({ ...c, source: "cases" }));

const caught = [], missed = [], knownGaps = [], nowCaught = [];
const falseAlarms = [], knownFalseAlarms = [], nowClear = [];
let genuineClear = 0;

for (const c of cases) {
  const flags = checkMessage(c.text).map((f) => f.label);
  const flagged = flags.length > 0;
  if (c.scam) {
    if (flagged && c.gap) nowCaught.push(c);
    else if (flagged) caught.push(c);
    else if (c.gap) knownGaps.push(c);
    else missed.push(c);
  } else {
    if (!flagged && c.falseAlarm) nowClear.push(c);
    else if (!flagged) genuineClear++;
    else if (c.falseAlarm) knownFalseAlarms.push({ ...c, flags });
    else falseAlarms.push({ ...c, flags });
  }
}

const scamTotal = cases.filter((c) => c.scam).length;
const genuineTotal = cases.length - scamTotal;
const caughtTotal = caught.length + nowCaught.length;
const alarmTotal = falseAlarms.length + knownFalseAlarms.length;
console.log(`${cases.length} messages: ${scamTotal} scams, ${genuineTotal} genuine`);
console.log(`Scams flagged: ${caughtTotal}/${scamTotal}    Genuine wrongly flagged: ${alarmTotal}/${genuineTotal}\n`);

const show = (title, list, fmt) => {
  if (!list.length) return;
  console.log(title);
  list.forEach((c) => console.log("  - " + fmt(c)));
  console.log("");
};
const short = (t) => (t.length > 100 ? t.slice(0, 97) + "..." : t);
show("FAIL: genuine messages wrongly flagged (fix the rule, or mark falseAlarm: true if accepted):", falseAlarms, (c) => `${short(c.text)}\n      -> ${c.flags.join(", ")}`);
show("FAIL: scams that were not flagged (add a rule, or mark gap: true if accepted):", missed, (c) => short(c.text));
show("Known gaps (scams not caught today):", knownGaps, (c) => short(c.text));
show("Known false alarms (genuine messages flagged today):", knownFalseAlarms, (c) => `${short(c.text)}\n      -> ${c.flags.join(", ")}`);
show("Good news: now caught, remove gap: true:", nowCaught, (c) => short(c.text));
show("Good news: no longer flagged, remove falseAlarm: true:", nowClear, (c) => short(c.text));

process.exit(falseAlarms.length || missed.length ? 1 : 0);
