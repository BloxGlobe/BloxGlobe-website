//hash router

// Load an HTML page from /src/pages/*.html
async function loadPage(page) {
  const content = document.getElementById("page-content");

  const url = `src/pages/${page}.html`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Page missing");

    content.innerHTML = await response.text();
    setActive(page);

  } catch (err) {
    const fallback = await fetch("src/pages/404.html");
    content.innerHTML = await fallback.text();
  }
}

// Highlight the current button
function setActive(page) {
  document.querySelectorAll(".nav-btn")
    .forEach(btn => btn.classList.remove("nav-btn-active"));

  const theBtn = document.querySelector(`.nav-btn[data-page="${page}"]`);
  if (theBtn) theBtn.classList.add("nav-btn-active");
}

// When URL hash changes (#home → #store)
function handleRoute() {
  let page = location.hash.replace("#", "");

  if (page === "" || page === "/") page = "home"; // default fallback

  loadPage(page);
}

// Handle sidebar clicks
document.addEventListener("click", e => {
  const btn = e.target.closest(".nav-btn");
  if (!btn) return;

  const page = btn.getAttribute("data-page");
  if (!page) return;

  location.hash = page; // updates URL AND triggers routing
});

// Back/forward browser navigation
window.addEventListener("hashchange", handleRoute);

// Initial page load
window.addEventListener("load", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  handleRoute();
});
