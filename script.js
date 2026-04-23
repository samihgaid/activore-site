// Activore — site interactions

(() => {
  'use strict';

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth anchor scroll (extra offset for sticky header feel)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  // Reveal-on-scroll
  const revealables = document.querySelectorAll(
    '.hero, .about, .apps, .waitlist, .pillar, .app-card'
  );
  revealables.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('is-visible'));
  }

  // Waitlist form — stores locally until a backend is connected
  const form = document.getElementById('waitlistForm');
  const msg  = document.getElementById('formMessage');

  if (form && msg) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = (input?.value || '').trim();

      msg.classList.remove('error');

      if (!isValidEmail(email)) {
        msg.textContent = 'Please enter a valid email address.';
        msg.classList.add('error');
        input?.focus();
        return;
      }

      try {
        const list = JSON.parse(localStorage.getItem('activore_waitlist') || '[]');
        if (!list.includes(email)) list.push(email);
        localStorage.setItem('activore_waitlist', JSON.stringify(list));
      } catch (_) { /* storage not available — still show success */ }

      form.reset();
      msg.textContent = "You're in. We'll email you the moment each app drops.";

      setTimeout(() => { msg.textContent = ''; }, 6000);
    });
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
})();
