/*
  Book a call: adds a "Send a message | Book a call" switch to any page's
  "Start with a conversation" section. Put this where the switch should go:

    <div data-book-call="Digital Check-up"></div>

  The text in data-book-call goes in the email subject so you know which page
  the request came from. Requests go through FormSubmit, same as the other forms.

  To change when people can ask for a call, edit the two lists below.
*/
(function () {
  // Which days can be picked. 0 = Sunday, 1 = Monday ... 6 = Saturday.
  var CALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

  // The time-of-day choices. "name" is the big word, "hours" sits underneath.
  var CALL_TIMES = [
    { name: "Morning", hours: "9am to 12pm" },
    { name: "Afternoon", hours: "12pm to 5pm" },
    { name: "Evening", hours: "5pm to 7pm" },
  ];

  var slot = document.querySelector("[data-book-call]");
  if (!slot) return;
  var topic = slot.getAttribute("data-book-call") || "Sfinco";
  var messageForm = document.getElementById("enquiry-form");
  var params = new URLSearchParams(window.location.search);
  var page = window.location.pathname.split("/").pop() || "index.html";

  // After a request is sent, FormSubmit brings people back here.
  if (params.get("booked") === "true") {
    if (messageForm) messageForm.classList.add("hidden");
    var thanks = document.createElement("div");
    thanks.id = "call-booked";
    thanks.tabIndex = -1;
    thanks.innerHTML = "<p><strong>Thanks, your call request is through.</strong> You'll hear back personally to confirm an exact time, usually within a couple of business days.</p>";
    slot.replaceWith(thanks);
    thanks.focus();
    return;
  }
  // A message was just sent, so there's nothing to switch between.
  if (params.get("sent") === "true" || !messageForm) return;

  function longDate(d) {
    return d.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }
  function isoDate(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  // The switch
  slot.className = "contact-switch";
  slot.setAttribute("role", "tablist");
  slot.setAttribute("aria-label", "How would you like to get in touch?");
  slot.innerHTML =
    '<button type="button" role="tab" id="tab-message" aria-controls="enquiry-form">Send a message</button>' +
    '<button type="button" role="tab" id="tab-call" aria-controls="call-panel">Book a call</button>';
  var tabs = slot.querySelectorAll('[role="tab"]');

  messageForm.setAttribute("role", "tabpanel");
  messageForm.setAttribute("aria-labelledby", "tab-message");

  // The call panel
  var panel = document.createElement("div");
  panel.id = "call-panel";
  panel.className = "call-panel";
  panel.setAttribute("role", "tabpanel");
  panel.setAttribute("aria-labelledby", "tab-call");

  var timeTiles = CALL_TIMES.map(function (t) {
    var value = t.name + " (" + t.hours + ")";
    return '<label class="pick"><input type="radio" name="Time of day" value="' + value + '"><span><strong>' + t.name + "</strong> " + t.hours + "</span></label>";
  }).join("");

  panel.innerHTML =
    '<p class="call-intro">The first conversation is free, with no obligation. Pick a day and a time of day that suits you, and you\'ll get a reply to confirm an exact time before anything\'s locked in.</p>' +
    '<p class="book-call-note">Think you\'ve just been scammed? Don\'t wait for this call. Ring your bank\'s fraud line now, using the number on the back of your card.</p>' +
    '<form class="enquiry" id="call-form" action="https://formsubmit.co/hello@sfinco.com.au" method="POST" novalidate>' +
      '<input type="hidden" name="_subject" value="Call request: ' + topic.replace(/"/g, "&quot;") + '">' +
      '<input type="hidden" name="_next" value="https://sfinco.com.au/' + page + '?booked=true#call-booked">' +
      '<input type="text" name="_honey" class="hidden" tabindex="-1" autocomplete="off">' +
      '<fieldset class="pick-group">' +
        "<legend>1. Which day suits you?</legend>" +
        '<div class="day-grid" id="day-grid"></div>' +
        '<div class="other-date">' +
          '<label for="call-date">Need a date further out? Choose it here</label>' +
          '<input type="date" id="call-date" name="Preferred date">' +
        "</div>" +
      "</fieldset>" +
      '<fieldset class="pick-group">' +
        "<legend>2. What time of day?</legend>" +
        '<div class="time-grid">' + timeTiles + "</div>" +
      "</fieldset>" +
      '<fieldset class="pick-group">' +
        "<legend>3. Your details</legend>" +
        '<div><label for="call-name">Your name</label><input type="text" id="call-name" name="name" autocomplete="name" required></div>' +
        '<div><label for="call-phone">Best phone number to call you on</label><input type="tel" id="call-phone" name="phone" autocomplete="tel" inputmode="tel" required></div>' +
        '<div><label for="call-email">Email address <span class="optional">(optional, for the confirmation)</span></label><input type="email" id="call-email" name="email" autocomplete="email"></div>' +
        '<div><label for="call-note">Anything you\'d like to talk about? <span class="optional">(optional)</span></label><textarea id="call-note" name="message" rows="3" placeholder="e.g. Setting up my new phone safely, or a message I wasn\'t sure about."></textarea></div>' +
      "</fieldset>" +
      '<div id="call-summary" class="call-summary" aria-live="polite"></div>' +
      '<div id="call-error" role="alert"></div>' +
      '<p class="book-call-privacy">Your details are only used to arrange this call. <a href="privacy.html">How we handle your information</a>.</p>' +
      '<div class="btn-row"><button class="btn btn-primary" type="submit">Request this call</button></div>' +
    "</form>";
  messageForm.after(panel);

  var form = panel.querySelector("#call-form");
  var grid = panel.querySelector("#day-grid");
  var dateInput = panel.querySelector("#call-date");
  var summary = panel.querySelector("#call-summary");
  var errorBox = panel.querySelector("#call-error");

  // The next fortnight of open days as big tap targets, starting tomorrow.
  var today = new Date();
  today.setHours(12, 0, 0, 0);
  var shown = 0;
  for (var i = 1; shown < 14 && i <= 60; i++) {
    var d = new Date(today);
    d.setDate(today.getDate() + i);
    if (CALL_DAYS.indexOf(d.getDay()) === -1) continue;
    var label = document.createElement("label");
    label.className = "pick day";
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "Preferred day";
    radio.value = longDate(d);
    var span = document.createElement("span");
    span.innerHTML =
      "<small>" + (i === 1 ? "Tomorrow" : d.toLocaleDateString("en-AU", { weekday: "short" })) + "</small>" +
      "<strong>" + d.getDate() + "</strong>" +
      "<small>" + d.toLocaleDateString("en-AU", { month: "short" }) + "</small>";
    label.append(radio, span);
    grid.appendChild(label);
    shown++;
  }

  var min = new Date(today);
  min.setDate(today.getDate() + 1);
  var max = new Date(today);
  max.setMonth(today.getMonth() + 3);
  dateInput.min = isoDate(min);
  dateInput.max = isoDate(max);

  function pickedDate() {
    return dateInput.value ? new Date(dateInput.value + "T12:00:00") : null;
  }
  function chosenDay() {
    var r = form.querySelector('input[name="Preferred day"]:checked');
    if (r) return r.value;
    var d = pickedDate();
    return d ? longDate(d) : "";
  }
  function chosenTime() {
    var r = form.querySelector('input[name="Time of day"]:checked');
    return r ? r.value : "";
  }
  function updateSummary() {
    var day = chosenDay();
    var time = chosenTime();
    summary.innerHTML = day || time
      ? "<strong>Your request:</strong> " + (day || "pick a day") + ", " + (time ? time.toLowerCase() : "pick a time of day") + "."
      : "";
  }

  // Picking a day from the grid clears the other-date box, and the reverse.
  form.addEventListener("change", function (e) {
    if (e.target.name === "Preferred day") dateInput.value = "";
    if (e.target === dateInput && dateInput.value) {
      form.querySelectorAll('input[name="Preferred day"]').forEach(function (r) { r.checked = false; });
    }
    errorBox.innerHTML = "";
    updateSummary();
  });

  form.addEventListener("submit", function (e) {
    var problems = [];
    var first = null;
    var picked = pickedDate();
    if (!chosenDay()) { problems.push("a day"); first = first || grid.querySelector("input"); }
    else if (picked && (!dateInput.checkValidity() || CALL_DAYS.indexOf(picked.getDay()) === -1)) {
      problems.push("a different date (that one isn't available)");
      first = first || dateInput;
    }
    if (!chosenTime()) { problems.push("a time of day"); first = first || form.querySelector('input[name="Time of day"]'); }
    ["call-name", "call-phone"].forEach(function (id) {
      var el = document.getElementById(id);
      var bad = !el.value.trim();
      el.setAttribute("aria-invalid", bad ? "true" : "false");
      if (bad) { problems.push(id === "call-name" ? "your name" : "a phone number"); first = first || el; }
    });
    var email = document.getElementById("call-email");
    if (email.value && !email.checkValidity()) { problems.push("an email address that looks right (or leave it blank)"); first = first || email; }

    if (problems.length) {
      e.preventDefault();
      var list = problems.length > 1 ? problems.slice(0, -1).join(", ") + " and " + problems[problems.length - 1] : problems[0];
      errorBox.innerHTML = '<p class="form-error">Nearly there. Please add ' + list + ".</p>";
      first.focus();
    }
  });

  // Switching between the two
  function show(which, focusTab) {
    var call = which === "call";
    tabs[0].setAttribute("aria-selected", call ? "false" : "true");
    tabs[1].setAttribute("aria-selected", call ? "true" : "false");
    tabs[0].tabIndex = call ? -1 : 0;
    tabs[1].tabIndex = call ? 0 : -1;
    messageForm.hidden = call;
    panel.hidden = !call;
    if (focusTab) tabs[call ? 1 : 0].focus();
  }
  tabs[0].addEventListener("click", function () { show("message"); });
  tabs[1].addEventListener("click", function () { show("call"); });
  slot.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      show(tabs[0].getAttribute("aria-selected") === "true" ? "call" : "message", true);
    }
  });

  // Any link to #book-call on the page opens the call side and scrolls to it.
  function openFromLink() {
    show("call");
    slot.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href="#book-call"]');
    if (!a) return;
    e.preventDefault();
    openFromLink();
    history.replaceState(null, "", "#book-call");
  });

  show(window.location.hash === "#book-call" ? "call" : "message");
  if (window.location.hash === "#book-call") openFromLink();
})();
