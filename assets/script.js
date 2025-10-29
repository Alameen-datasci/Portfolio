// DARK MODE TOGGLE
const toggleBtn = document.getElementById("mode-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// DROPDOWN FIX
const dropdown = document.querySelector(".dropdown");
const menu = document.querySelector(".dropdown-menu");

dropdown.addEventListener("mouseenter", () => menu.classList.add("show"));
dropdown.addEventListener("mouseleave", () => menu.classList.remove("show"));
