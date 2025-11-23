import * as THREE from 'three';
import { loadPage, initPageLoader } from './page';

function setActive(page: string) {
  document.querySelectorAll(".nav-btn")
    .forEach(btn => btn.classList.remove("nav-btn-active"));

  const active = document.querySelector(`.nav-btn[data-page="${page}"]`);
  active?.classList.add("nav-btn-active");
}

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const page = btn.getAttribute("data-page")!;
    loadPage(page);
    history.replaceState({}, "", `#${page}`);
  });
});

// Load initial page based on hash
const firstPage = location.hash.replace("#", "") || "home";
loadPage(firstPage);

// Update year
document.getElementById("year")!.textContent = new Date().getFullYear().toString();

// Initialize page loader
initPageLoader();