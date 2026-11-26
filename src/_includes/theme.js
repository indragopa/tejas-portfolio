(() => {
  const key = "tejas-portfolio-theme";
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const root = document.documentElement;
  let preference = null;
  let toggle;

  function readPreference() {
    try {
      const value = window.localStorage.getItem(key);
      preference = value === "dark" || value === "light" ? value : null;
    } catch {
      // The in-page switch also works when browser storage is unavailable.
    }
  }

  function render() {
    const theme = preference || (system.matches ? "dark" : "light");
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content =
      theme === "dark" ? "#1c1d2b" : "#faf9f5";
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      toggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    }
  }

  readPreference();
  render();
  document.addEventListener("DOMContentLoaded", () => {
    toggle = document.querySelector(".theme-toggle");
    toggle.addEventListener("click", () => {
      preference = root.dataset.theme === "dark" ? "light" : "dark";
      try { window.localStorage.setItem(key, preference); } catch { /* Session-only preference. */ }
      render();
    });
    render();
    toggle.hidden = false;
  });
  system.addEventListener("change", render);
  window.addEventListener("storage", event => {
    if (event.key === key || event.key === null) { readPreference(); render(); }
  });
  window.addEventListener("pageshow", () => { readPreference(); render(); });
})();
