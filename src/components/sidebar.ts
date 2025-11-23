export function initSidebar() {
  const buttons = document.querySelectorAll(".nav-btn");

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.classList.add("hovered");
    });

    btn.addEventListener("mouseleave", () => {
      btn.classList.remove("hovered");
    });
  });
}
