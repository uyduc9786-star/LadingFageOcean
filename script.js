const header = document.querySelector(".header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#primary-navigation");
const desktopMedia = window.matchMedia("(min-width: 821px)");

function setMenuOpen(isOpen, returnFocus = false) {
  if (!navToggle || !siteNav) return;

  navToggle.classList.toggle("is-active", isOpen);
  siteNav.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng",
  );

  if (returnFocus) navToggle.focus();
}

navToggle?.addEventListener("click", () => {
  setMenuOpen(navToggle.getAttribute("aria-expanded") !== "true");
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    const target = hash && hash !== "#"
      ? document.getElementById(hash.slice(1))
      : null;

    if (!target) {
      event.preventDefault();
      return;
    }

    if (siteNav?.contains(link)) setMenuOpen(false);
  });
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    navToggle?.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false, true);
  }
});

function resetDesktopMenu(event) {
  if (event.matches) setMenuOpen(false);
}

if (desktopMedia.addEventListener) {
  desktopMedia.addEventListener("change", resetDesktopMenu);
} else {
  desktopMedia.addListener(resetDesktopMenu);
}

function syncHeaderHeight() {
  if (!header) return;

  document.documentElement.style.setProperty(
    "--header-height",
    `${Math.ceil(header.getBoundingClientRect().height)}px`,
  );
}

syncHeaderHeight();

if (header && "ResizeObserver" in window) {
  new ResizeObserver(syncHeaderHeight).observe(header);
} else {
  window.addEventListener("resize", syncHeaderHeight);
}
