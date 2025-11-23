// --- Clean Page Loader ---
async function loadPage(page) {
  const content = document.getElementById("page-content");

  // GitHub Pages adds repo name in the path
  const base = window.location.pathname.split("/")[1]; // e.g. BloxGlobe-website
  const realRoot = `/${base}/`;

  try {
    const res = await fetch(`${realRoot}src/pages/${page}.html`);
    if (!res.ok) throw new Error("Page not found");
    
    content.innerHTML = await res.text();
    setActive(page);
  } catch {
    const res = await fetch(`${realRoot}src/pages/404.html`);
    content.innerHTML = await res.text();
  }
}

// --- Highlight Active Nav Button ---
function setActive(page) {
  document.querySelectorAll(".nav-btn")
    .forEach(btn => btn.classList.remove("nav-btn-active"));

  const active = document.querySelector(`.nav-btn[data-page="${page}"]`);
  if (active) active.classList.add("nav-btn-active");
}

// --- Handle Nav Button Clicks ---
document.addEventListener("click", e => {
  const btn = e.target.closest(".nav-btn");
  if (!btn) return;

  const page = btn.getAttribute("data-page");
  if (!page) return;

  const base = window.location.pathname.split("/")[1]; // repo folder
  history.pushState({}, "", `/${base}/${page}`);

  loadPage(page);
});

// --- Handle Back/Forward ---
window.addEventListener("popstate", () => {
  const parts = window.location.pathname.split("/");
  const page = parts[2] || "home"; 
  loadPage(page);
});

// --- Initial Load ---
window.addEventListener("load", () => {
  const parts = window.location.pathname.split("/");
  const page = parts[2] || "home";

  loadPage(page);
  document.getElementById("year").textContent = new Date().getFullYear();
});
