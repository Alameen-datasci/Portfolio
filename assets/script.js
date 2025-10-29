// script.js

// ======= DARK MODE TOGGLE =======
const toggleBtn = document.getElementById('modeToggle');
const body = document.body;

// Check saved theme in localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️';
} else {
  toggleBtn.textContent = '🌙';
}

// Toggle theme when button clicked
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    toggleBtn.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    toggleBtn.textContent = '🌙';
  }
});

// ======= NAVIGATION DROPDOWN =======
const contactMenu = document.querySelector('.contact-menu');
const contactLink = document.querySelector('.contact-link');

contactLink.addEventListener('mouseenter', () => {
  contactMenu.style.display = 'block';
});
contactLink.addEventListener('mouseleave', () => {
  contactMenu.style.display = 'none';
});
contactMenu.addEventListener('mouseenter', () => {
  contactMenu.style.display = 'block';
});
contactMenu.addEventListener('mouseleave', () => {
  contactMenu.style.display = 'none';
});

// ======= SCROLL ANIMATIONS =======
const revealElements = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  for (let i = 0; i < revealElements.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = revealElements[i].getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      revealElements[i].classList.add('active');
    } else {
      revealElements[i].classList.remove('active');
    }
  }
});
