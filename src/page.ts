// Map of pages → HTML file paths
const pages: Record<string, string> = {
  home: "/src/pages/home.html",
  experience: "/src/pages/experience.html",
  ugc: "/src/pages/ugc.html",
  feedback: "/src/pages/feedback.html",
  site: "/src/pages/site.html",
  setting: "/src/pages/setting.html"
};

// Loads a page into #page-content
export async function loadPage(pageName: string) {
  const container = document.getElementById("page-content")!;
  const file = pages[pageName];
  if (!file) {
    container.innerHTML = `<p class="text-red-400">Page not found.</p>`;
    return;
  }

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error();

    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    container.innerHTML = doc.body.innerHTML;
    setActive(pageName);
  } catch {
    const res = await fetch("/src/pages/404.html");
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    container.innerHTML = doc.body.innerHTML;
  }
}

// Attach events to sidebar buttons
export function initPageLoader() {
  const buttons = document.querySelectorAll("[data-page]");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.getAttribute("data-page")!;
      loadPage(page);
      // Prevent default behavior (i.e., navigating to a new page)
      event.preventDefault();
      // Update the URL hash to reflect the new page
      history.pushState({}, "", `#${page}`);
    });
  });
}

// Function to set active page
function setActive(page: string) {
  document.querySelectorAll(".nav-btn")
    .forEach(btn => btn.classList.remove("nav-btn-active"));

  const active = document.querySelector(`.nav-btn[data-page="${page}"]`);
  active?.classList.add("nav-btn-active");
}