// ======= DARK MODE TOGGLE =======
const toggleBtn = document.getElementById('modeToggle');
const body = document.body;

// Apply saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️';
} else {
  toggleBtn.textContent = '🌙';
}

// Toggle mode
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

// ======= CONTACT DROPDOWN =======
const contactMenu = document.querySelector('.contact-menu');
const contactLink = document.querySelector('.contact-link');

if (contactLink && contactMenu) {
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
}

// ======= SCROLL REVEAL =======
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
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
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ======= SCROLL TO TOP ON LOAD =======
window.scrollTo({ top: 0, behavior: 'instant' });
