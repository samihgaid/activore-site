// Activore — site interactions

(() => {
  'use strict';

  // === CONFIG ===========================================================
  // Once you've created a form on https://formspree.io, paste your form ID
  // here. It looks like "xnnvkpdz" (an 8-char string).
  // Until then, the waitlist will fall back to localStorage so submissions
  // are still captured locally for testing.
  const FORMSPREE_ID = ''; // e.g. 'xnnvkpdz'
  // ======================================================================

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href) return;
      // Only intercept if we're already on the home page
      const id = href.startsWith('/#') ? href.slice(1) : href;
      if (!id.startsWith('#') || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  // Reveal-on-scroll
  const revealables = document.querySelectorAll(
    '.hero, .about, .apps, .waitlist, .pillar, .app-card, .legal-card'
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

  // Waitlist form
  const form = document.getElementById('waitlistForm');
  const msg  = document.getElementById('formMessage');

  if (form && msg) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const email = (input?.value || '').trim();

      msg.classList.remove('error');

      if (!isValidEmail(email)) {
        msg.textContent = 'Please enter a valid email address.';
        msg.classList.add('error');
        input?.focus();
        return;
      }

      // UX: lock button while submitting
      const originalBtnText = submitBtn?.textContent || 'Notify me';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting…';
      }

      let success = false;

      // Path 1: Formspree (preferred)
      if (FORMSPREE_ID) {
        try {
          const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              source: 'activore.app waitlist',
              userAgent: navigator.userAgent,
            }),
          });
          success = res.ok;
        } catch (_) {
          success = false;
        }
      }

      // Path 2: localStorage fallback (also runs alongside Formspree)
      try {
        const list = JSON.parse(localStorage.getItem('activore_waitlist') || '[]');
        if (!list.includes(email)) list.push(email);
        localStorage.setItem('activore_waitlist', JSON.stringify(list));
      } catch (_) { /* storage not available */ }

      // If no Formspree configured, show success based on local save
      if (!FORMSPREE_ID) success = true;

      if (success) {
        form.reset();
        msg.textContent = "You're in. We'll email you the moment each app drops.";
      } else {
        msg.textContent = "Hmm, something went wrong. Please try again, or email info@activore.app.";
        msg.classList.add('error');
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }

      setTimeout(() => { msg.textContent = ''; msg.classList.remove('error'); }, 8000);
    });
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
})();
