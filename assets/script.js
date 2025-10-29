// Theme toggle (persist)
const body = document.documentElement;
const themeButtons = document.querySelectorAll('#theme-toggle');
function setTheme(theme){
  if(theme === 'dark') document.body.classList.add('dark');
  else document.body.classList.remove('dark');
  try{ localStorage.setItem('theme', theme);}catch(e){}
}
(function(){
  const saved = localStorage.getItem('theme');
  const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (preferDark? 'dark' : 'light'));
})();

// delegate theme toggle for multiple buttons
document.addEventListener('click', e => {
  if(!e.target.matches('#theme-toggle')) return;
  const isDark = document.body.classList.contains('dark');
  setTheme(isDark? 'light':'dark');
});

// Dropdown keyboard accessibility
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') document.querySelectorAll('.drop-list').forEach(dl => dl.style.display='none');
});

// Custom cursor
(function(){
  const cursor = document.getElementById('cursor');
  if(!cursor) return;
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.addEventListener('mouseover', e => {
    if(e.target.closest('.hoverable') || e.target.tagName === 'A' || e.target.tagName === 'BUTTON') cursor.classList.add('big');
  });
  document.addEventListener('mouseout', e => {
    if(e.target.closest('.hoverable') || e.target.tagName === 'A' || e.target.tagName === 'BUTTON') cursor.classList.remove('big');
  });
})();

// IntersectionObserver for scroll-based reveal and reverse when leaving viewport
(function(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry =>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }else{
        entry.target.classList.remove('in-view');
      }
    });
  },{threshold:0.15});

  document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));
})();

// Small enhancement: subtle parallax on hero image when scrolling
(function(){
  const hero = document.querySelector('.hero');
  if(!hero) return;
  window.addEventListener('scroll', () =>{
    const t = Math.min(window.scrollY/300, 1);
    const img = hero.querySelector('.profile-card');
    if(img) img.style.transform = `translateY(${t* -12}px) scale(${1 - t*0.02})`;
  });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a =>{
  a.addEventListener('click', e =>{
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});
