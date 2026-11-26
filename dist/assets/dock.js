(() => {
  const dock = document.querySelector(".dock");
  if (!dock) return;

  const links = Array.from(dock.querySelectorAll("a"));
  const motion = matchMedia("(min-width:501px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)");
  let frame = 0;
  let pointerX = 0;

  function rest() {
    cancelAnimationFrame(frame);
    frame = 0;
    dock.style.removeProperty("--highlight");
    for (const link of links) {
      link.style.removeProperty("--swell");
      link.removeAttribute("data-nearest");
    }
  }

  function shapeDock() {
    frame = 0;
    // Resting centres stay fixed while tiles grow, so hovering never jitters.
    const bounds = dock.getBoundingClientRect();
    const pitch = parseFloat(getComputedStyle(dock).getPropertyValue("--rest-pitch"));
    const centre = bounds.left + bounds.width / 2;
    const first = centre - pitch * (links.length - 1) / 2;
    const peak = Math.max(0, Math.min(links.length - 1, (pointerX - first) / pitch));

    links.forEach((link, index) => {
      const distance = Math.min(1, Math.abs(index - peak) / 2);
      const weight = (1 + Math.cos(distance * Math.PI)) / 2;
      link.style.setProperty("--swell", weight.toFixed(3));
      link.toggleAttribute("data-nearest", index === Math.round(peak));
    });
    const highlight = Math.max(0, Math.min(100, 100 * (pointerX - bounds.left) / bounds.width));
    dock.style.setProperty("--highlight", highlight + "%");
  }

  function follow(event) {
    if (!motion.matches || event.pointerType === "touch") return;
    pointerX = event.clientX;
    if (!frame) frame = requestAnimationFrame(shapeDock);
  }

  dock.dataset.interactive = "";
  dock.addEventListener("pointerenter", follow);
  dock.addEventListener("pointermove", follow);
  dock.addEventListener("pointerleave", rest);
  dock.addEventListener("pointercancel", rest);
  dock.addEventListener("keydown", rest);
  window.addEventListener("blur", rest);
  window.addEventListener("pagehide", rest);
  window.addEventListener("resize", rest);
  motion.addEventListener("change", rest);
})();
