(() => {
  'use strict';

  // ── year ─────────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── nav scroll state ──────────────────────────────────────
  const navWrap = document.getElementById('nav-wrap');
  const onScroll = () => {
    navWrap?.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── mobile menu ───────────────────────────────────────────
  const menuBtn   = document.getElementById('menu-btn');
  const menuClose = document.getElementById('menu-close');
  const mobileNav = document.getElementById('mobile-nav');

  const openMenu = () => {
    mobileNav?.classList.add('is-open');
    menuBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    mobileNav?.classList.remove('is-open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  menuBtn?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // close on ESC
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // ── scroll reveal ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );
    revealEls.forEach(el => io.observe(el));
  }

  // ── contact form → mailto ─────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);

      const name   = String(fd.get('name')   || '').trim();
      const email  = String(fd.get('email')  || '').trim();
      const system = String(fd.get('system') || '').trim();
      const never  = String(fd.get('never')  || '').trim();

      const subject = encodeURIComponent('AI Systems Assurance — Scope Request');
      const body = encodeURIComponent(
        [
          `Name: ${name}`,
          `Email: ${email}`,
          '',
          `System:`,
          system,
          '',
          `Never event:`,
          never,
          '',
          `Authorization:`,
          `I can provide written authorization and scoped access for testing.`,
        ].join('\n')
      );

      const to = 'you@yourdomain.com'; // ← replace with your address
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }

})();
