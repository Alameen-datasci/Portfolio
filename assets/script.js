// Dark mode toggle
const toggleBtn = document.querySelector(".toggle-btn");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Dropdown menu fix
const dropdown = document.querySelector(".dropdown");
dropdown.addEventListener("mouseenter", () => dropdown.classList.add("show"));
dropdown.addEventListener("mouseleave", () => dropdown.classList.remove("show"));
