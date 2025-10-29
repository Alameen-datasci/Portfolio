// Dark mode
const toggleBtn=document.querySelector(".toggle-btn");
toggleBtn.addEventListener("click",()=>document.body.classList.toggle("dark"));

// Dropdown fix
const drop=document.querySelector(".dropdown");
drop.addEventListener("click",()=>drop.classList.toggle("show"));

// Scroll reveal
const sections=document.querySelectorAll("section");
const obs=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");});
},{threshold:0.2});
sections.forEach(s=>obs.observe(s));
