(function () {
  var PH = '919642328793';
  var D = [{"k": "pain", "label": "Pain management", "t": "Pain management", "d": "Whatever the source, persistent pain deserves attentive care. We start by understanding your story: where it hurts, when it started and what makes it better or worse.", "l": ["A detailed first consultation", "Treatment personalised to you", "Regular review of how you are responding"]}, {"k": "stress", "label": "Stress & anxiety", "t": "Stress & anxiety relief", "d": "Sometimes the most valuable part of a session is the quiet. Many people find acupuncture a calming break for body and mind.", "l": ["A peaceful, unhurried setting", "Relaxing points chosen for you", "Space to talk about what is on your mind"]}, {"k": "migraine", "label": "Migraine & headache", "t": "Migraine & headache care", "d": "Frequent headaches and migraines can wear you down. Acupuncture is a gentle, drug-free option many people explore for headache support.", "l": ["A conversation about triggers, sleep and routine", "Fine, comfortable needling at selected points", "A follow-up plan to track how you feel"]}, {"k": "back", "label": "Back pain", "t": "Back pain", "d": "Ongoing back discomfort can limit work and rest. Your practitioner will look at what may be behind it and plan care that suits you.", "l": ["Understanding where and when it hurts", "Treatment focused on the back and surrounding areas", "A realistic plan for how many visits may help"]}, {"k": "neck", "label": "Neck, shoulder & joint pain", "t": "Neck, shoulder & joint pain", "d": "Long hours at a desk, age or strain can leave the neck, shoulders and joints stiff. Treatment is tailored to the area and your daily movement.", "l": ["Assessment of the painful area and movement", "Targeted points to ease tension and discomfort", "Simple guidance you can use at home"]}, {"k": "knee", "label": "Knee pain", "t": "Knee pain", "d": "Knee discomfort affects stairs, walking and sleep. Care aims to support comfort and everyday movement.", "l": ["A look at how the knee feels in daily activity", "Local and supporting points", "A plan that fits your recovery pace"]}, {"k": "sciatica", "label": "Sciatica", "t": "Sciatica", "d": "Pain that travels from the lower back through the hip and leg can be hard to live with. Acupuncture is one supportive option people try.", "l": ["Mapping where the pain travels", "Points along the back, hip and leg", "Guidance on posture and movement"]}, {"k": "sleep", "label": "Sleep support", "t": "Sleep disorders support", "d": "When rest does not come easily, everything feels harder. A calming approach may support better sleep.", "l": ["Talk through sleep habits and stressors", "Relaxing treatment points", "Simple evening routine tips"]}, {"k": "energy", "label": "Energy & wellness", "t": "Improved energy & overall wellness", "d": "For when you are not unwell, just not yourself. Wellness sessions focus on balance and renewal.", "l": ["A whole-body conversation", "Balancing treatment", "Check-ins to keep you on track"]}, {"k": "menstrual", "label": "Menstrual disorders", "t": "Menstrual disorders", "d": "Private, respectful care for menstrual discomfort and irregularities, discussed openly with your practitioner.", "l": ["A confidential conversation about your cycle", "Treatment personalised to your pattern", "Follow-up across cycles to see how things change"]}];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* header, menu, back to top */
  var hd = $('#hd'), burger = $('#burger'), totop = $('#totop');
  function onScroll() {
    if (hd) hd.classList.toggle('solid', window.scrollY > 30);
    if (totop) totop.classList.toggle('show', window.scrollY > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    if (burger) { burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); }
  }
  if (burger) {
    burger.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
    $$('#drawer a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) setMenu(false); });
  }

  /* reveal on scroll */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else { $$('.rv').forEach(function (el) { el.classList.add('in'); }); }

  /* concern finder */
  var chips = $('#chips'), panel = $('#panel'), sel = $('#c');
  var byKey = {}; D.forEach(function (d) { byKey[d.k] = d; });
  if (sel) {
    D.forEach(function (d) { var o = document.createElement('option'); o.value = d.t; o.textContent = d.label; sel.appendChild(o); });
    var o = document.createElement('option'); o.value = 'Not sure yet'; o.textContent = 'Not sure yet'; sel.appendChild(o);
  }
  function show(key, scroll) {
    var x = byKey[key]; if (!x || !panel) return;
    $$('.chip', chips).forEach(function (c) { c.classList.toggle('on', c.dataset.k === key); c.setAttribute('aria-pressed', c.dataset.k === key); });
    $$('.hs').forEach(function (h) { var on = h.dataset.k === key; h.classList.toggle('on', on); h.setAttribute('aria-pressed', on); });
    var msg = encodeURIComponent("Hello, I'd like to book an appointment at Amrutha Acu Healing for: " + x.t + ".");
    panel.innerHTML = '<h3></h3><p></p><ul></ul><div class="acts"><a class="btn btn-fill" target="_blank" rel="noopener">Book on WhatsApp</a><a class="btn btn-ghost" href="contact.html#book">Use the booking form</a><a class="link" href="treatments.html#' + key + '" style="align-self:center">More details</a></div>';
    $('h3', panel).textContent = x.t; $('p', panel).textContent = x.d;
    x.l.forEach(function (t) { var li = document.createElement('li'); li.textContent = t; $('ul', panel).appendChild(li); });
    $('a.btn-fill', panel).href = 'https://wa.me/' + PH + '?text=' + msg;
    if (sel) sel.value = x.t;
    if (scroll && chips) chips.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  if (chips) {
    D.forEach(function (d) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.dataset.k = d.k; b.textContent = d.label;
      b.addEventListener('click', function () { show(d.k, false); }); chips.appendChild(b);
    });
    $$('.hs').forEach(function (h) {
      h.addEventListener('click', function () { show(h.dataset.k, true); });
      h.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(h.dataset.k, true); } });
    });
    show('pain', false);
  }

  /* booking form -> WhatsApp */
  var f = $('#f');
  if (f) {
    var q = new URLSearchParams(location.search);
    if (q.get('branch')) { var r = $('input[name=b][value="' + q.get('branch') + '"]'); if (r) r.checked = true; }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var b = $('input[name=b]:checked').value;
      var t = "Hello, I'm " + $('#n').value.trim() + ". I'd like to book an appointment at the " + b + ' branch for: ' + sel.value + '.';
      var m = $('#m').value.trim(); if (m) t += ' Note: ' + m;
      window.open('https://wa.me/' + PH + '?text=' + encodeURIComponent(t), '_blank', 'noopener');
    });
  }
})();
