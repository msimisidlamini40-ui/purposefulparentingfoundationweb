/* ============================================================
   Purposeful Parenting Foundation — Main Scripts
   ============================================================ */

/* ── FADE-UP ANIMATION ON SCROLL ── */
(function initFadeUp() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
})();

/* ── NAV: ACTIVE SECTION HIGHLIGHT ON SCROLL ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const onScroll = () => {
    const scrollY = window.scrollY;

    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const bottom = top + sec.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach((a) => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── CONTACT FORM SUBMISSION ── */
(function initForm() {
  const btn = document.getElementById('submitBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.cform input, .cform textarea, .cform select');
    const name = document.querySelector('.cform input[type="text"]');
    const email = document.querySelector('.cform input[type="email"]');

    // Basic validation
    if (!name.value.trim()) {
      name.style.borderColor = '#E24B4A';
      name.focus();
      return;
    }
    if (!email.value.trim() || !email.value.includes('@')) {
      email.style.borderColor = '#E24B4A';
      email.focus();
      return;
    }

    // Success state
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#0F6E56';
    inputs.forEach((el) => {
      el.value = '';
      el.style.borderColor = '';
    });

    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
    }, 3500);
  });

  // Reset border color on input
  document.querySelectorAll('.cform input').forEach((input) => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
    });
  });
})();

/* ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ── BOOK 3D TILT ON MOUSE MOVE ── */
(function initBookTilt() {
  const book = document.querySelector('.book-img');
  if (!book) return;

  const wrap = book.parentElement;

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = -12 + x * 16;
    const rotX = 2 - y * 10;
    book.style.transform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
  });

  wrap.addEventListener('mouseleave', () => {
    book.style.transform = 'perspective(1000px) rotateY(-12deg) rotateX(2deg)';
  });
})();

/* ── COUNTER ANIMATION ── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num, .imp-num');

  const animateCount = (el) => {
    const raw = el.textContent.replace(/[^0-9]/g, '');
    const suffix = el.textContent.replace(/[0-9]/g, '');
    if (!raw) return;

    const target = parseInt(raw, 10);
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
})();

function toggleFaq(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

window.toggleFaq = toggleFaq;

function selectAmt(btn) {
  document.querySelectorAll('.donate-btn-amt').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
}

window.selectAmt = selectAmt;
