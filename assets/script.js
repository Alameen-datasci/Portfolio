/* Defensive, single-file JS that works with your existing HTML structure.
   - supports toggle button ids/classes: #mode-toggle, #modeToggle, .mode-toggle
   - dropdowns with .dropdown and .dropdown-menu
   - reveal animations via .reveal
   - small cursor dot that enlarges on interactive hoverables
   - ensures page lands at top on load
*/

(function () {
  const doc = document;
  const body = doc.body;

  /* ---------- helper: get toggle button (support multiple id/class names) ---------- */
  function getModeToggle() {
    return doc.getElementById('mode-toggle') ||
           doc.getElementById('modeToggle') ||
           doc.querySelector('.mode-toggle') ||
           null;
  }
  const modeBtn = getModeToggle();

  /* ---------- initialize theme from localStorage ---------- */
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') body.classList.add('dark-mode');
    else body.classList.remove('dark-mode');
    if (modeBtn) modeBtn.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
  } catch (e) {
    if (modeBtn) modeBtn.textContent = '🌙';
  }

  /* ---------- toggle handler (safe) ---------- */
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
      modeBtn.textContent = isDark ? '☀️' : '🌙';
    });
  }

  /* ---------- ensure page lands at very top on load ---------- */
  window.addEventListener('load', () => {
    // instant top position; some browsers ignore 'instant' so use auto fallback
    try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }
    catch (err) { window.scrollTo(0,0); }
  });

  /* ---------- Dropdown: desktop uses CSS hover; mobile toggles on click ---------- */
  doc.querySelectorAll('.dropdown').forEach(drop => {
    const menu = drop.querySelector('.dropdown-menu');
    if (!menu) return;
    drop.addEventListener('click', (ev) => {
      // only toggle on small screens (touch)
      if (window.innerWidth <= 820) {
        ev.stopPropagation();
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
      }
    });
  });
  // close mobile dropdown if clicking outside
  doc.addEventListener('click', (ev) => {
    if (window.innerWidth <= 820) {
      doc.querySelectorAll('.dropdown .dropdown-menu').forEach(m => {
        if (!m) return;
        const parent = m.closest('.dropdown');
        if (parent && !parent.contains(ev.target)) m.style.display = 'none';
      });
    }
  });

  /* ---------- Reveal animations (IntersectionObserver) ---------- */
  (function setupReveal() {
    const els = doc.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
        else entry.target.classList.remove('in-view');
      });
    }, { threshold: 0.18 });
    els.forEach(el => io.observe(el));
  })();

  /* ---------- Cursor dot + hover emphasis ---------- */
  (function cursorDot() {
    // create cursor dot if not already present
    if (!doc.querySelector('.cursor-dot')) {
      const dot = doc.createElement('div');
      dot.className = 'cursor-dot';
      doc.body.appendChild(dot);

      // move dot
      doc.addEventListener('mousemove', e => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
      });

      // enlarge on interactive elements
      const selectors = ['a', 'button', '.mode-toggle', '.project-card', '.hover-lift', '.photo', '.card'];
      doc.addEventListener('mouseover', e => {
        const el = e.target.closest(selectors.join(','));
        if (el) dot.classList.add('big');
      });
      doc.addEventListener('mouseout', e => {
        const el = e.target.closest(selectors.join(','));
        if (el) dot.classList.remove('big');
      });
    }
  })();

})();
