// Defensive single-file JS for the site.
// - theme toggle (#mode-toggle) with persisted preference
// - dropdown behavior (hover on desktop, click toggle on touch)
// - reveal animations (IntersectionObserver, reversible)
// - ensure page top on load
// - subtle cursor dot (non-intrusive)

/* ---------- helpers ---------- */
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

/* ---------- THEME TOGGLE ---------- */
(function themeInit() {
  const btn = qs('#mode-toggle');
  if (!btn) return;
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
      btn.textContent = '☀️';
    } else {
      document.body.classList.remove('dark-mode');
      btn.textContent = '🌙';
    }
  } catch (e) {
    btn.textContent = '🌙';
  }

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
    btn.textContent = isDark ? '☀️' : '🌙';
  });
})();

/* ---------- DROPDOWN (hover desktop, click mobile) ---------- */
(function dropdownInit() {
  qsa('.dropdown').forEach(drop => {
    const menu = drop.querySelector('.dropdown-menu');
    const toggle = drop.querySelector('.dropdown-toggle') || drop.querySelector('button, a');

    if (!menu || !toggle) return;

    // Desktop: show on hover
    drop.addEventListener('mouseenter', () => {
      if (window.innerWidth > 820) drop.classList.add('open');
    });
    drop.addEventListener('mouseleave', () => {
      if (window.innerWidth > 820) drop.classList.remove('open');
    });

    // Mobile / touch: toggle on click
    toggle.addEventListener('click', (ev) => {
      if (window.innerWidth <= 820) {
        ev.preventDefault();
        ev.stopPropagation();
        drop.classList.toggle('open');
      }
    });
  });

  // close dropdowns when clicking outside (mobile)
  document.addEventListener('click', (ev) => {
    if (window.innerWidth <= 820) {
      qsa('.dropdown.open').forEach(d => {
        if (!d.contains(ev.target)) d.classList.remove('open');
      });
    }
  });
})();

/* ---------- REVEAL ANIMATIONS (IntersectionObserver) ---------- */
(function revealInit() {
  const els = qsa('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
      else entry.target.classList.remove('in-view'); // reversible on scroll back
    });
  }, { threshold: 0.18 });
  els.forEach(el => io.observe(el));
})();

/* ---------- CURSOR DOT & hover emphasis ---------- */
(function cursorDot() {
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return; // skip on touch
  let dot = document.querySelector('.cursor-dot');
  if (!dot) {
    dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
  }
  document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });

  const interactive = ['a', 'button', '.hover-lift', '.card', '.photo', '.btn'];
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest(interactive.join(','));
    if (el) dot.classList.add('big'); else dot.classList.remove('big');
  });
})();

/* ---------- ensure top on load ---------- */
window.addEventListener('load', () => {
  try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); } catch (e) { window.scrollTo(0,0); }
});
