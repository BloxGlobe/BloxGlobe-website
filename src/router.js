//Clean Page loader//

async function loadPage(page) {
  const content = document.getElementById("page-content");

  try {
    const res = await fetch(`./src/pages/${page}.html`);
    if (!res.ok) throw new Error();

    content.innerHTML = await res.text();
    setActive(page);
  } catch {
    const res = await fetch(`./src/pages/404.html`);
    content.innerHTML = await res.text();
  }
}

function setActive(page) {
  document.querySelectorAll(".nav-btn")
    .forEach(btn => btn.classList.remove("nav-btn-active"));

  const active = document.querySelector(`.nav-btn[data-page="${page}"]`);
  if (active) active.classList.add("nav-btn-active");
}

// When user clicks a button, change URL like /store, /docs
document.addEventListener("click", e => {
  const btn = e.target.closest(".nav-btn");
  if (!btn) return;

  const page = btn.getAttribute("data-page");
  if (!page) return;

  history.pushState({}, "", `/${page}`);
  loadPage(page);
});

// Handle back/forward buttons
window.addEventListener("popstate", () => {
  const page = location.pathname.replace("/", "") || "home";
  loadPage(page);
});

// Initial load
window.addEventListener("load", () => {
  const page = location.pathname.replace("/", "") || "home";
  loadPage(page);

  document.getElementById("year").textContent = new Date().getFullYear();
});
