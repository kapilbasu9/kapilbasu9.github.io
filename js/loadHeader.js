// ============================================
// loadHeader.js — Clean, Organized, Final
// Loads header, initializes theme, mobile nav,
// scrolling glass effect, then dispatches event
// ============================================

fetch("partials/header.html")
  .then(res => res.text())
  .then(data => {
    const headerRoot = document.getElementById("header");
    if (!headerRoot) return;
    headerRoot.innerHTML = data;

    // ============================
    // THEME SWITCH (SAFE)
    // ============================
    function initTheme() {
      const btn = document.getElementById("themeBtn");
      const html = document.documentElement;
      const KEY = "site-theme";

      const savedTheme = localStorage.getItem(KEY) || "dark";
      html.setAttribute("data-theme", savedTheme);
      if (btn) btn.textContent = savedTheme === "light" ? "🌙" : "☀️";

      if (!btn) return;

      btn.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        localStorage.setItem(KEY, next);
        btn.textContent = next === "light" ? "🌙" : "☀️";
      });
    }

    // ============================
    // MOBILE NAV
    // ============================
    function initMobileNav() {
      const toggle = document.getElementById("mobileToggle");
      const nav = document.getElementById("mainNav");

      if (!toggle || !nav) return;

      toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isOpen));
        nav.style.display = isOpen ? "" : "block";

        if (!isOpen) requestAnimationFrame(() => nav.classList.add("slide-in"));
        else nav.classList.remove("slide-in");
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
          nav.style.display = "";
          nav.classList.remove("slide-in");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    // ============================
    // SCROLL GLASS EFFECT
    // ============================
    function initHeaderGlass() {
      const headerEl = document.querySelector(".site-header");
      if (!headerEl) return;

      function applyGlass() {
        if (window.scrollY > 12) headerEl.classList.add("scrolled");
        else headerEl.classList.remove("scrolled");
      }

      window.addEventListener("scroll", applyGlass, { passive: true });
      applyGlass();
    }

    // ============================
    // INIT ALL
    // ============================
    initTheme();
    initMobileNav();
    initHeaderGlass();

    // Tell the rest of the site that header is ready
    document.dispatchEvent(new CustomEvent("headerLoaded"));
  })
  .catch(err => {
    console.error("Could not load header:", err);
  });
