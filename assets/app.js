(() => {
  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu
  const btn = document.querySelector(".menu");
  const nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form -> mailto (replace inbox)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);

      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const system = String(fd.get("system") || "").trim();
      const never = String(fd.get("never") || "").trim();

      const subject = encodeURIComponent("AI Systems Assurance — Scope Request");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nSystem:\n${system}\n\nNever event:\n${never}\n\nAuthorization:\nI can provide written authorization and scoped access.\n`
      );

      const to = "you@yourdomain.com"; // <-- change this
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();
