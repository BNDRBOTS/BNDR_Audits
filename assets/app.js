(() => {
  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Clock badge
  const clock = document.getElementById("clock");
  if (clock) {
    const t = new Date();
    const hh = String(t.getHours()).padStart(2, "0");
    const mm = String(t.getMinutes()).padStart(2, "0");
    clock.textContent = `${hh}:${mm}`;
  }

  // Mobile menu
  const menuBtn = document.querySelector(".rail__menu");
  const nav = document.querySelector(".rail__nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll progress
  const bar = document.querySelector(".progress__bar");
  const onScroll = () => {
    if (!bar) return;
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.height = `${pct}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });
  reveals.forEach(el => io.observe(el));

  // Risk Atlas panel data
  const atlasData = {
    hierarchy: {
      title: "Instruction hierarchy failure",
      impact: "Impact: High",
      desc: "Multiple instruction sources collide (system, developer, user, retrieved text). The model picks wrong, and it looks reasonable. I map failure patterns and specify boundary controls you can verify.",
      signal: "Signal: inconsistent compliance",
      fix: "Fix: constraints + validation + isolation",
      deliverable: "Evidence-linked cases + mitigations + verification criteria"
    },
    tools: {
      title: "Tool boundary drift",
      impact: "Impact: High",
      desc: "Tools turn language into actions. I evaluate permissioning, validation, and failure handling so an agent can’t wander into unsafe or unintended operations.",
      signal: "Signal: unsafe action paths",
      fix: "Fix: least privilege + strong validation + safe fallbacks",
      deliverable: "Tool permission map + workflow constraints + verification plan"
    },
    rag: {
      title: "Retrieval trust abuse",
      impact: "Impact: Medium–High",
      desc: "Retrieval can inject stale, wrong, or boundary-crossing context. I test isolation, relevance control, and how the system behaves under ambiguous or adversarial context.",
      signal: "Signal: misplaced trust in retrieved text",
      fix: "Fix: isolation + provenance + reliability constraints",
      deliverable: "RAG boundary review + reliability conditions + mitigations"
    },
    halluc: {
      title: "Confident wrongness",
      impact: "Impact: Medium–High",
      desc: "Plausible errors become dangerous when presented with confidence. I identify conditions that amplify false authority and specify guardrails that reduce harm without killing utility.",
      signal: "Signal: authoritative tone on uncertainty",
      fix: "Fix: calibrated responses + citations + refusal logic",
      deliverable: "Risk register items + acceptance criteria for critical outputs"
    },
    ops: {
      title: "Operational fragility",
      impact: "Impact: Medium",
      desc: "Even good designs fail without monitoring, triage, and safe degradation. I assess what happens under load, change, partial outages, and human error.",
      signal: "Signal: reactive firefighting",
      fix: "Fix: monitoring signals + incident posture + safe modes",
      deliverable: "Monitoring plan + incident runbook + verification scenarios"
    }
  };

  const nodes = Array.from(document.querySelectorAll(".node"));
  const atlasTitle = document.getElementById("atlasTitle");
  const atlasImpact = document.getElementById("atlasImpact");
  const atlasDesc = document.getElementById("atlasDesc");
  const atlasSignal = document.getElementById("atlasSignal");
  const atlasFix = document.getElementById("atlasFix");
  const atlasDeliverable = document.getElementById("atlasDeliverable");

  function setAtlas(key) {
    const d = atlasData[key];
    if (!d) return;
    if (atlasTitle) atlasTitle.textContent = d.title;
    if (atlasImpact) atlasImpact.textContent = d.impact;
    if (atlasDesc) atlasDesc.textContent = d.desc;
    if (atlasSignal) atlasSignal.textContent = d.signal;
    if (atlasFix) atlasFix.textContent = d.fix;
    if (atlasDeliverable) atlasDeliverable.textContent = d.deliverable;
  }

  nodes.forEach(btn => {
    btn.addEventListener("click", () => {
      nodes.forEach(n => n.classList.remove("is-active"));
      btn.classList.add("is-active");
      setAtlas(btn.dataset.key);
    });
    btn.addEventListener("mouseenter", () => {
      nodes.forEach(n => n.classList.remove("is-active"));
      btn.classList.add("is-active");
      setAtlas(btn.dataset.key);
    });
  });

  // Claims Ledger accordion
  const claims = Array.from(document.querySelectorAll("[data-claim]"));
  claims.forEach(c => {
    c.addEventListener("click", () => {
      const open = c.classList.contains("is-open");
      claims.forEach(x => x.classList.remove("is-open"));
      if (!open) c.classList.add("is-open");
    });
  });

  // Tilt effect (subtle)
  const tilts = Array.from(document.querySelectorAll("[data-tilt]"));
  function tiltMove(el, e){
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const rx = (-y * 4).toFixed(2);
    const ry = (x * 6).toFixed(2);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-1px)`;
  }
  tilts.forEach(el => {
    el.addEventListener("mousemove", (e) => tiltMove(el, e));
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });

  // Cursor
  const c1 = document.querySelector(".cursor");
  const c2 = document.querySelector(".cursor2");
  let shown = false;

  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && c1 && c2) {
    window.addEventListener("mousemove", (e) => {
      if (!shown) {
        c1.style.opacity = "1";
        c2.style.opacity = "1";
        shown = true;
      }
      c1.style.left = `${e.clientX}px`;
      c1.style.top = `${e.clientY}px`;

      // trailing cursor
      c2.animate(
        [{ left: c2.style.left || `${e.clientX}px`, top: c2.style.top || `${e.clientY}px` },
         { left: `${e.clientX}px`, top: `${e.clientY}px` }],
        { duration: 120, fill: "forwards", easing: "cubic-bezier(.2,.85,.2,1)" }
      );
    }, { passive: true });
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
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `System:\n${system}\n\n` +
        `Never event:\n${never}\n\n` +
        `Authorization:\nI confirm I can provide written authorization and scoped access.\n`
      );

      const to = "you@yourdomain.com"; // <-- replace
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();
