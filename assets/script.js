// Dark mode toggle
const toggleBtn = document.getElementById("mode-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Dropdown menu fix
const dropdown = document.querySelector(".dropdown");
const menu = dropdown.querySelector(".dropdown-menu");

dropdown.addEventListener("mouseenter", () => menu.classList.add("show"));
dropdown.addEventListener("mouseleave", () => menu.classList.remove("show"));
