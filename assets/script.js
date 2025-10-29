/* ---------- Theme toggle (default: light) ---------- */
(function(){
  const root = document.documentElement;
  const body = document.body;
  const toggleBtns = document.querySelectorAll('#mode-toggle, .mode-toggle');
  function setTheme(theme){
    if(theme === 'dark'){
      body.classList.add('dark-mode');
      try{ localStorage.setItem('theme','dark') }catch(e){}
    } else {
      body.classList.remove('dark-mode');
      try{ localStorage.setItem('theme','light') }catch(e){}
    }
  }
  // init
  const saved = localStorage.getItem('theme');
  if(saved) setTheme(saved);
  else setTheme('light');

  // toggle handler (supports multiple buttons)
  document.addEventListener('click', e => {
    if(e.target && (e.target.id === 'mode-toggle' || e.target.classList.contains('mode-toggle'))){
      const isDark = document.body.classList.contains('dark-mode');
      setTheme(isDark ? 'light' : 'dark');
    }
  });
})();

/* ---------- IntersectionObserver for reveal (reversible) ---------- */
(function(){
  const els = document.querySelectorAll('[data-animate], .fade-in');
  if(!els.length) return;
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('in-view');
      else entry.target.classList.remove('in-view');
    });
  }, {threshold: 0.15});
  els.forEach(el => obs.observe(el));
})();

/* ---------- Dropdown accessibility: click to toggle on small screens ---------- */
(function(){
  document.querySelectorAll('.dropdown').forEach(drop=>{
    // open on click for touch devices
    drop.addEventListener('click', function(e){
      const menu = this.querySelector('.dropdown-menu');
      if(!menu) return;
      // on small screens, toggle; on large, hover handles it
      if(window.innerWidth <= 780){
        e.preventDefault();
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
      }
    });
  });

  // close dropdowns when clicking outside
  document.addEventListener('click', e=>{
    document.querySelectorAll('.dropdown .dropdown-menu').forEach(menu=>{
      const parent = menu.closest('.dropdown');
      if(!parent.contains(e.target) && window.innerWidth <= 780){
        menu.style.display = 'none';
      }
    });
  });
})();

/* ---------- Smooth scroll for hash links ---------- */
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(!href || href === '#') return;
      const el = document.querySelector(href);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });
})();
