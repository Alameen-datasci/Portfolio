// Dark Mode Toggle
const toggleBtn = document.querySelector(".toggle-btn");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Dropdown fix (stay open while selecting)
document.querySelectorAll(".dropdown").forEach(drop => {
  drop.addEventListener("mouseenter", () => {
    drop.querySelector(".dropdown-content").style.display = "block";
  });
  drop.addEventListener("mouseleave", () => {
    drop.querySelector(".dropdown-content").style.display = "none";
  });
});

// Scroll reveal animation
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));
