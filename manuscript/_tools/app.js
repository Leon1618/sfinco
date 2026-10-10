(function () {
  var tocToggle = document.getElementById('tocToggle');
  var tocDrawer = document.getElementById('tocDrawer');
  var tocBackdrop = document.getElementById('tocBackdrop');
  var tocClose = document.getElementById('tocClose');
  var progressFill = document.getElementById('progressFill');
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc-link'));
  var sections = tocLinks.map(function (l) {
    return document.getElementById(l.getAttribute('data-id'));
  }).filter(Boolean);

  function openToc() {
    tocDrawer.classList.add('open');
    tocBackdrop.classList.add('open');
    tocDrawer.setAttribute('aria-hidden', 'false');
    tocToggle.setAttribute('aria-expanded', 'true');
  }
  function closeToc() {
    tocDrawer.classList.remove('open');
    tocBackdrop.classList.remove('open');
    tocDrawer.setAttribute('aria-hidden', 'true');
    tocToggle.setAttribute('aria-expanded', 'false');
  }
  if (tocToggle) tocToggle.addEventListener('click', openToc);
  if (tocClose) tocClose.addEventListener('click', closeToc);
  if (tocBackdrop) tocBackdrop.addEventListener('click', closeToc);
  tocLinks.forEach(function (l) {
    l.addEventListener('click', closeToc);
  });

  function onScroll() {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
    var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = pct + '%';

    var current = null;
    sections.forEach(function (s) {
      var rect = s.getBoundingClientRect();
      if (rect.top <= 120) current = s;
    });
    tocLinks.forEach(function (l) {
      l.classList.toggle('active', current && l.getAttribute('data-id') === current.id);
    });
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
