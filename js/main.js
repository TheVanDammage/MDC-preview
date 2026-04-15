/* MDC Tax Services — Main JavaScript */

// ── Mobile Navigation Toggle ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav when a link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Contact Form: Client-side validation + Netlify submission ─
const contactForm      = document.getElementById('contactForm');
const formWrap         = document.getElementById('formWrap');
const formConfirmation = document.getElementById('formConfirmation');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = contactForm.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#C0392B';
        valid = false;
      }
    });

    const emailField = contactForm.querySelector('#email');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.style.borderColor = '#C0392B';
      valid = false;
    }

    if (!valid) return;

    // Submit to Netlify
    const formData = new FormData(contactForm);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        // Show confirmation, hide form
        formWrap.style.display   = 'none';
        formConfirmation.style.display = 'block';
        formConfirmation.focus();
      } else {
        alert('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      alert('Something went wrong. Please check your connection and try again.');
    }
  });
}

// ── Smooth scroll offset for fixed nav ─────────────────────
// Adjusts anchor links to account for the 70px fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
