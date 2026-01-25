// assets/script.js
(function () {
  'use strict';

  /* DARK MODE TOGGLE */
  const darkToggleButtons = document.querySelectorAll('#darkToggle');

  function setDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', enabled);
    darkToggleButtons.forEach(btn => {
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      btn.textContent = enabled ? '☀️' : '🌙';
    });
    try {
      localStorage.setItem('prefers-dark', enabled ? '1' : '0');
    } catch (e) {}
  }

  (function initDark() {
    try {
      const pref = localStorage.getItem('prefers-dark');
      setDarkMode(pref === '1');
    } catch (e) {}
  })();

  darkToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const enabled = !document.body.classList.contains('dark-mode');
      setDarkMode(enabled);
    });
  });

  /* DROPDOWN ACCESSIBILITY */
  document.querySelectorAll('.drop-btn').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) {
        const parent = btn.parentElement;
        const firstLink = parent.querySelector('.dropdown-menu a');
        if (firstLink) firstLink.focus();
      }
    });

    btn.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
      }
    });
  });

  document.addEventListener('click', (ev) => {
    if (!ev.target.closest('.nav-item')) {
      document.querySelectorAll('.drop-btn').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* SKILL CHIP INTERACTIONS */
  document.querySelectorAll('.skill-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      try {
        chip.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.06)' },
          { transform: 'scale(1)' }
        ], { duration: 220 });
      } catch (e) {}
    });
  });

  /* CARD ENTRANCE ANIMATION */
  window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((c, i) => {
      c.style.opacity = 0;
      c.style.transform = 'translateY(12px)';
      setTimeout(() => {
        c.style.transition = 'opacity 360ms ease, transform 360ms ease';
        c.style.opacity = 1;
        c.style.transform = 'translateY(0)';
      }, 90 * i);
    });
  });
})();
