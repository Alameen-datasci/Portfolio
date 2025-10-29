/* Shared JS for dark-mode, basic protections, small helpers */

// ========== DARK MODE (sync across pages) ==========
(function(){
  const DARK_KEY = 'darkMode';
  const apply = (isDark) => {
    if(isDark) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
    // update all buttons with id 'dark-toggle' or 'dark-toggle' alias
    document.querySelectorAll('#dark-toggle, #dark-toggle, #dark-toggle, #dark-toggle, #dark-toggle, #dark-toggle, #dark-toggle, #dark-toggle, #dark-toggle').forEach(btn=>{
      if(btn) btn.textContent = isDark ? '☀️' : '🌙';
    });
    // single old id
    const primaryBtn = document.getElementById('dark-toggle') || document.getElementById('dark-toggle') || document.getElementById('dark-toggle');
    if(primaryBtn) primaryBtn.textContent = isDark ? '☀️' : '🌙';
  };

  // initial state from localStorage
  const saved = localStorage.getItem(DARK_KEY) === 'dark';
  apply(saved);

  // attach to any button with id 'dark-toggle' or 'dark-toggle' or 'dark-toggle' (pages use 'dark-toggle' or 'dark-toggle' or 'dark-toggle')
  document.querySelectorAll('#dark-toggle, #dark-toggle, #dark-toggle').forEach(btn=>{
    if(!btn) return;
    btn.addEventListener('click', ()=>{
      const now = !document.body.classList.contains('dark-mode');
      apply(now);
      localStorage.setItem(DARK_KEY, now ? 'dark' : 'light');
    });
  });

  // also support #dark-toggle and #dark-toggle in case some pages use a different id (defensive)
  const altBtn = document.getElementById('dark-toggle') || document.getElementById('theme-toggle') || document.getElementById('dark-toggle');
  if(altBtn && !altBtn.dataset.listenerAttached){
    altBtn.addEventListener('click', ()=>{
      const now = !document.body.classList.contains('dark-mode');
      apply(now);
      localStorage.setItem(DARK_KEY, now ? 'dark' : 'light');
    });
    altBtn.dataset.listenerAttached = '1';
  }
})();

// ========== PREVENT SIMPLE ABUSE ==========
// Lightweight deterrents: not security, but reduces casual misuse
// 1) Disable right-click menu (deterrent only)
window.addEventListener('contextmenu', function(e){
  const allow = false; // change to true if you want right click enabled
  if(!allow){
    e.preventDefault();
  }
});

// 2) Disable selecting long text (cosmetic)
document.addEventListener('selectstart', function(e){
  // allow selection in input/textarea
  const tag = e.target.tagName;
  if(tag === 'INPUT' || tag === 'TEXTAREA') return;
  // else prevent
  // comment out next line if you want selection
  // e.preventDefault();
});

// 3) Strip hashes that look suspicious (tiny defensive step)
(function sanitizeHash(){
  const h = location.hash;
  if(h && /javascript:|data:|vbscript:/i.test(h)){
    history.replaceState(null, '', location.pathname + location.search);
  }
})();

// ========== TINY UI HELPERS ==========
/* Smoothly update all external links to include noopener noreferrer if not present */
document.querySelectorAll('a[target="_blank"]').forEach(a=>{
  if(!a.hasAttribute('rel')) a.setAttribute('rel','noopener noreferrer');
});

// optional: small fade-in for major blocks on load
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('main, header, section').forEach((el, idx) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(6px)';
    setTimeout(()=> {
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 80 * idx);
  });
});
