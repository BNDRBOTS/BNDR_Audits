/* assets/app.js */
(() => {
  'use strict';

  // Strict execution env. No console logs. No flash. 
  // Code like a ghost.
  
  // 01. Time / Meta Update
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 02. Smooth Scroll - Engineered Silence
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Brutalist snap / high-tension ease approach
        window.scrollTo({
          top: targetElement.offsetTop - 72, 
          behavior: 'smooth'
        });
      }
    });
  });

  // 03. Interaction Observer - Reveal Logic
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Trigger immediate reveal for above-the-fold content
  setTimeout(() => {
    document.querySelectorAll('#top .reveal').forEach(el => {
      el.classList.add('is-visible');
    });
  }, 100);

  // 04. Data Transmission (Mailto fallback)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('.btn-execute');
      const originalText = btn.innerHTML;
      
      // UX Feedback
      btn.innerHTML = `<span class="btn-text">TRANSMITTING...</span>`;
      
      setTimeout(() => {
        const fd = new FormData(form);

        const name = String(fd.get("name") || "").trim();
        const email = String(fd.get("email") || "").trim();
        const system = String(fd.get("system") || "").trim();
        const never = String(fd.get("never") || "").trim();

        const subject = encodeURIComponent(`SYS_REQ: AI Systems Assurance Scope [${name}]`);
        const body = encodeURIComponent(
          `// SCOPE REQUEST TRANSMISSION\n// ID: ${name}\n// COMMS: ${email}\n\n[SYSTEM TARGET]\n${system}\n\n[NEVER EVENT PARAMETERS]\n${never}\n\n[AUTH]\n> I can provide written authorization and scoped access.\n\n`
        );

        const to = "admin@veriable.com"; // Change target
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        
        btn.innerHTML = originalText;
      }, 600);
    });
  }
})();
