// src/page.ts

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
  const container = document.getElementById("page-content");
  if (!container) return;

  const file = pages[pageName];
  if (!file) {
    container.innerHTML = `<p class="text-red-400">Page not found.</p>`;
    return;
  }

  try {
    const res = await fetch(file);
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = `<p class="text-red-400">Failed to load page.</p>`;
  }
}

// Attach events to sidebar buttons
export function initPageLoader() {
  const buttons = document.querySelectorAll("[data-page]");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.getAttribute("data-page");
      if (page) loadPage(page);
    });
  });
}
