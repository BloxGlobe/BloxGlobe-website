function setActive(page: string) {
  document.querySelectorAll(".nav-btn")
    .forEach(btn => btn.classList.remove("nav-btn-active"));

  const active = document.querySelector(`.nav-btn[data-page="${page}"]`);
  active?.classList.add("nav-btn-active");
}

async function loadPage(page: string) {
  const container = document.getElementById("page-content")!;

  try {
    const res = await fetch(`/src/pages/${page}.html`);
    if (!res.ok) throw new Error();

    container.innerHTML = await res.text();
    setActive(page);
  } 
  catch {
    const res = await fetch(`/src/pages/404.html`);
    container.innerHTML = await res.text();
  }
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
