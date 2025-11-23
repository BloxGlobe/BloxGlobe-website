function setActive(page: string) {
  document.querySelectorAll(".nav-btn")
    .forEach(btn => btn.classList.remove("nav-btn-active"));

  document
    .querySelector(`.nav-btn[data-page="${page}"]`)
    ?.classList.add("nav-btn-active");
}

async function loadPage(page: string) {
  const container = document.getElementById("page-content")!;

  try {
    const res = await fetch(`/src/pages/${page}.html`);
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

loadPage(location.hash.replace("#", "") || "home");
