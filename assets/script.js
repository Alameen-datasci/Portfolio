/* ===== Defensive utility selectors ===== */
const getToggle = () => document.getElementById('modeToggle') || document.getElementById('mode-toggle') || document.querySelector('.mode-toggle');
const toggleBtn = getToggle();
const body = document.body;

/* ===== Apply saved theme on load ===== */
(function initTheme(){
  try{
    const saved = localStorage.getItem('theme');
    if(saved === 'dark') {
      body.classList.add('dark-mode');
      if(toggleBtn) toggleBtn.textContent = '☀️';
    } else {
      body.classList.remove('dark-mode');
      if(toggleBtn) toggleBtn.textContent = '🌙';
    }
  }catch(e){ /* ignore storage errors */ }
})();

/* ===== Toggle handler (works even if multiple buttons exist) ===== */
if(toggleBtn){
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    try{ localStorage.setItem('theme', isDark ? 'dark' : 'light'); }catch(e){}
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
  });
}

/* ===== Dropdown behaviour (desktop hover, mobile click) ===== */
document.querySelectorAll('.dropdown').forEach(drop => {
  const menu = drop.querySelector('.dropdown-menu');
  if(!menu) return;

  // Desktop: rely on CSS :hover. For touch / small screens, toggle on click.
  drop.addEventListener('click', (ev) => {
    if(window.innerWidth <= 820){
      ev.stopPropagation();
      // toggle display
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    }
  });
});

// close any open dropdown when clicking outside (mobile)
document.addEventListener('click', (ev) => {
  if(window.innerWidth <= 820){
    document.querySelectorAll('.dropdown .dropdown-menu').forEach(m => {
      if(!m) return;
      const parent = m.closest('.dropdown');
      if(parent && !parent.contains(ev.target)) m.style.display = 'none';
    });
  }
});

/* ===== Smooth reveal with IntersectionObserver (reversible) ===== */
(function setupReveal(){
  const revealEls = document.querySelectorAll('.reveal');
  if(!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('in-view');
      else entry.target.classList.remove('in-view');
    });
  }, { threshold: 0.18 }); // 18% visible toggles in/out

  revealEls.forEach(el => observer.observe(el));
})();

/* ===== Subtle cursor dot + emphasis on hoverable elements ===== */
(function cursorAndHover(){
  // create cursor dot if not present (non-intrusive)
  let cursor = document.querySelector('.cursor-dot');
  if(!cursor){
    cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    document.body.appendChild(cursor);
  }

  // move dot
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // enlarge on hover over interactive elements
  const hoverables = ['a', 'button', '.card', '.hover-emph', '.project-card', '.btn'];
  document.addEventListener('mouseover', e => {
    const el = e.target.closest(hoverables.join(','));
    if(el) cursor.classList.add('big'); // larger dot indicates interactivity
  });
  document.addEventListener('mouseout', e => {
    const el = e.target.closest(hoverables.join(','));
    if(el) cursor.classList.remove('big');
  });
})();

/* ===== Ensure page lands at very top on load ===== */
window.addEventListener('load', () => {
  // instant top position without animation
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});
