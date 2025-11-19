// assets/script.js
/*
  Site-wide JavaScript
  - Dark mode toggle (persists preference to localStorage)
  - Dropdown aria-expanded toggling for keyboard access
  - Skill-chip small animations & keyboard focus handling
  - Card entrance animations on load
  - All feature explanations are in comments below
*/

(function () {
  'use strict';

  /* ---------------------------
     DARK MODE TOGGLE
     - Buttons with id="darkToggle" exist on pages.
     - Clicking toggles body.dark-mode and persists choice to localStorage.
  --------------------------- */
  const darkToggleButtons = document.querySelectorAll('#darkToggle');

  function setDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', enabled);
    darkToggleButtons.forEach(btn => {
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      btn.textContent = enabled ? '☀️' : '🌙';
    });
    try {
      localStorage.setItem('prefers-dark', enabled ? '1' : '0');
    } catch (e) {
      // ignore storage errors
    }
  }

  (function initDark() {
    try {
      const pref = localStorage.getItem('prefers-dark');
      setDarkMode(pref === '1');
    } catch (e) {
      // if storage unavailable, do nothing (default remains)
    }
  })();

  darkToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const enabled = !document.body.classList.contains('dark-mode');
      setDarkMode(enabled);
    });
  });

  /* ---------------------------
     DROPDOWN ACCESSIBILITY
     - The dropdown menu is shown via CSS on :hover and :focus-within.
     - We enhance keyboard support by toggling aria-expanded on the drop button.
  --------------------------- */
  document.querySelectorAll('.drop-btn').forEach(btn => {
    // Toggle aria-expanded on click for screen-reader users
    btn.addEventListener('click', (ev) => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      // If opened, move focus into the first menu item (optional)
      if (!expanded) {
        const parent = btn.parentElement;
        const firstLink = parent.querySelector('.dropdown-menu a');
        if (firstLink) firstLink.focus();
      }
    });

    // Allow Enter / Space to toggle aria-expanded (keyboard)
    btn.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (!expanded) {
          const parent = btn.parentElement;
          const firstLink = parent.querySelector('.dropdown-menu a');
          if (firstLink) firstLink.focus();
        }
      }
    });
  });

  // Close dropdowns if clicking outside (resets aria-expanded)
  document.addEventListener('click', (ev) => {
    if (!ev.target.closest('.nav-item')) {
      document.querySelectorAll('.drop-btn').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* ---------------------------
     SKILL CHIP INTERACTIONS
     - Hover & focus add a class (CSS handles visual change).
     - Click triggers a small pulse animation via Web Animations API.
  --------------------------- */
  document.querySelectorAll('.skills .skill-chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => chip.classList.add('is-active'));
    chip.addEventListener('mouseleave', () => chip.classList.remove('is-active'));
    chip.addEventListener('focus', () => chip.classList.add('is-active'));
    chip.addEventListener('blur', () => chip.classList.remove('is-active'));

    chip.addEventListener('click', () => {
      try {
        chip.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.06)' },
          { transform: 'scale(1)' }
        ], { duration: 220 });
      } catch (e) {
        // fallback: add a quick class (CSS fallback not implemented here)
      }
    });
  });

  /* ---------------------------
     CARD ENTRANCE ANIMATION
     - Sequential fade/slide for .card elements on window load
  --------------------------- */
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

  /* ---------------------------
     A11Y: reveal when user tabs (optional)
     - If the user presses Tab once, add class so outlines can be shown selectively
  --------------------------- */
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
})();
