/* script.js */
/*
  Site-wide JavaScript:
  - Dark mode toggle (persists preference to localStorage)
  - Dropdown keyboard accessibility helpers
  - Skill-chip hover/click animations
  - Image size controls for profile preview on index.html
  - Small entrance animations for cards
*/

/* Immediately-invoked function to avoid polluting global scope */
(function () {
  // ------------------------------
  // DARK MODE TOGGLE
  // ------------------------------
  // We support multiple dark toggle buttons (present on each page's header).
  const darkToggleButtons = document.querySelectorAll('#darkToggle');

  // Helper: apply or remove dark mode and update UI
  function setDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', enabled);
    darkToggleButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      btn.textContent = enabled ? '☀️' : '🌙';
    });
    // Persist preference
    try {
      localStorage.setItem('prefers-dark', enabled ? '1' : '0');
    } catch (e) {
      // ignore storage errors
    }
  }

  // Initialize dark mode based on stored preference
  (function initDarkMode() {
    try {
      const pref = localStorage.getItem('prefers-dark');
      setDarkMode(pref === '1');
    } catch (e) {
      // if storage not available, default (do nothing)
    }
  })();

  // Attach click handlers to toggle buttons
  darkToggleButtons.forEach((btn) =>
    btn.addEventListener('click', function () {
      const enabled = !document.body.classList.contains('dark-mode');
      setDarkMode(enabled);
    })
  );

  // ------------------------------
  // DROPDOWN / ACCESSIBILITY
  // ------------------------------
  // Add keyboard toggling for drop buttons (Enter / Space to toggle aria-expanded)
  document.querySelectorAll('.drop-btn').forEach((btn) => {
    btn.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        // Toggle a CSS class on parent to simulate focus-within if needed
        btn.parentElement.classList.toggle('focus-toggle', !expanded);
      }
    });

    // Clicking button toggles aria-expanded for screen reader users
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.parentElement.classList.toggle('focus-toggle', !expanded);
    });
  });

  // Close dropdowns when clicking outside (optional, CSS already hides on blur/hover)
  document.addEventListener('click', (ev) => {
    // if click is not inside a .nav-item, close any toggled drop-btns
    if (!ev.target.closest('.nav-item')) {
      document.querySelectorAll('.drop-btn').forEach((b) => {
        b.setAttribute('aria-expanded', 'false');
        b.parentElement.classList.remove('focus-toggle');
      });
    }
  });

  // ------------------------------
  // SKILL CHIP INTERACTIONS
  // ------------------------------
  // Add small pop animation and allow click to trigger a pulse (visual only)
  document.querySelectorAll('.skill-chip').forEach((chip) => {
    chip.addEventListener('mouseenter', () => chip.classList.add('is-active'));
    chip.addEventListener('mouseleave', () => chip.classList.remove('is-active'));
    chip.addEventListener('focus', () => chip.classList.add('is-active'));
    chip.addEventListener('blur', () => chip.classList.remove('is-active'));

    chip.addEventListener('click', () => {
      // Simple Web Animation API pulse (works in modern browsers)
      try {
        chip.animate(
          [
            { transform: 'scale(1)' },
            { transform: 'scale(1.06)' },
            { transform: 'scale(1)' },
          ],
          { duration: 220 }
        );
      } catch (e) {
        // Fallback: quick CSS class toggle (if animate not available)
        chip.classList.add('pulse-fallback');
        setTimeout(() => chip.classList.remove('pulse-fallback'), 250);
      }
    });
  });

  // ------------------------------
  // PROFILE IMAGE SIZE CONTROLS (index.html)
  // ------------------------------
  // Provide simple controls to adjust profile image width/height for preview
  const imgWidthInput = document.getElementById('imgWidth');
  const imgHeightInput = document.getElementById('imgHeight');
  const applyImgSizeBtn = document.getElementById('applyImgSize');
  const profilePic = document.getElementById('profilePic');

  if (profilePic && imgWidthInput && imgHeightInput && applyImgSizeBtn) {
    applyImgSizeBtn.addEventListener('click', () => {
      const w = parseInt(imgWidthInput.value, 10) || 200;
      const h = parseInt(imgHeightInput.value, 10) || 200;
      profilePic.style.width = w + 'px';
      profilePic.style.height = h + 'px';
      // Save to localStorage so size persists during the session
      try {
        localStorage.setItem('profile-w', String(w));
        localStorage.setItem('profile-h', String(h));
      } catch (e) {}
    });

    // Load saved sizes (if any)
    try {
      const sw = parseInt(localStorage.getItem('profile-w'), 10);
      const sh = parseInt(localStorage.getItem('profile-h'), 10);
      if (sw) {
        profilePic.style.width = sw + 'px';
        imgWidthInput.value = sw;
      }
      if (sh) {
        profilePic.style.height = sh + 'px';
        imgHeightInput.value = sh;
      }
    } catch (e) {}
  }

  // ------------------------------
  // ON LOAD ANIMATIONS (cards)
  // ------------------------------
  // Animate cards sequentially on load to create a pleasant entrance
  window.addEventListener('load', () => {
    document.querySelectorAll('.card').forEach((c, i) => {
      c.style.opacity = 0;
      c.style.transform = 'translateY(12px)';
      setTimeout(() => {
        c.style.transition = 'opacity 360ms ease, transform 360ms ease';
        c.style.opacity = 1;
        c.style.transform = 'translateY(0)';
      }, 80 * i);
    });
  });

  // ------------------------------
  // Small helper: add keyboard focus styles to links and buttons (improve accessibility)
  // ------------------------------
  document.addEventListener(
    'keyup',
    (ev) => {
      if (ev.key === 'Tab') {
        document.documentElement.classList.add('user-is-tabbing');
      }
    },
    { once: true }
  );
})();
