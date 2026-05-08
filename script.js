/* =========================================================
   PORTFOLIO — SCRIPT.JS
   Akkala Venkata Sai Krishna
========================================================= */

// ── Particles Background ──────────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 60;
  const colors = ['#38bdf8', '#818cf8', '#f472b6', '#34d399'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${3 + Math.random() * 5}s;
      --delay: ${Math.random() * 6}s;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
    `;
    container.appendChild(p);
  }
})();

// ── Navbar Scroll Behavior ────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ── Active Nav Link on Scroll ─────────────────────────────
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ── Mobile Menu ───────────────────────────────────────────
const menuBtn   = document.getElementById('menuBtn');
const closeBtn  = document.getElementById('closeBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mLinks    = document.querySelectorAll('.m-link');

menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
mLinks.forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ── Typing Animation ──────────────────────────────────────
const roles = [
  'AI Solutions',
  'RAG Pipelines',
  'ML Models',
  'Gen AI Systems',
  'Data Insights',
];
let roleIdx = 0;
let charIdx = 0;
let deleting = false;
const roleEl = document.getElementById('roleDynamic');

function typeRole() {
  if (!roleEl) return;
  const current = roles[roleIdx];
  if (!deleting) {
    roleEl.textContent = current.substring(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    roleEl.textContent = current.substring(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 60 : 110);
}
setTimeout(typeRole, 800);

// ── Intersection Observer — Reveal Animations ─────────────
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Counter Animation ─────────────────────────────────────
const counters = document.querySelectorAll('.stat-num');

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const step = 16;
  const totalSteps = duration / step;
  const increment = target / totalSteps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// ── Proficiency Bars ──────────────────────────────────────
const profFills = document.querySelectorAll('.prof-fill');
const cgpaFills = document.querySelectorAll('.cgpa-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = `${width}%`;
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

[...profFills, ...cgpaFills].forEach(el => barObserver.observe(el));

// ── Project Card Mouse Glow ───────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// ── Contact Form (Demo) ───────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  const formStatus = document.getElementById('formStatus');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    if (formStatus) {
      formStatus.textContent = '';
      formStatus.style.color = '';
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/saikrishnaakkala9@gmail.com', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      form.reset();
      if (formStatus) {
        formStatus.textContent = 'Message sent successfully.';
        formStatus.style.color = '#34d399';
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = 'Could not send message. Please try again.';
        formStatus.style.color = '#f87171';
      }
    } finally {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    }
  });
}

// ── Smooth Nav Scroll ─────────────────────────────────────
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

// ── Skill Tag Hover Stagger ───────────────────────────────
document.querySelectorAll('.skill-category').forEach(cat => {
  const tags = cat.querySelectorAll('.skill-tag');
  tags.forEach((tag, i) => {
    tag.style.transitionDelay = `${i * 40}ms`;
  });
});

// ── Cursor Trailing Effect (optional) ────────────────────
const trail = document.createElement('div');
trail.style.cssText = `
  position: fixed; width: 12px; height: 12px;
  border-radius: 50%; background: rgba(56,189,248,.5);
  pointer-events: none; z-index: 9999;
  transform: translate(-50%,-50%);
  transition: left .08s ease, top .08s ease;
  mix-blend-mode: screen;
`;
document.body.appendChild(trail);

let trailVisible = false;
document.addEventListener('mousemove', (e) => {
  if (!trailVisible) {
    trail.style.opacity = '1';
    trailVisible = true;
  }
  trail.style.left = `${e.clientX}px`;
  trail.style.top  = `${e.clientY}px`;
});
document.addEventListener('mouseleave', () => {
  trail.style.opacity = '0';
  trailVisible = false;
});

// ── Page Load Animation ───────────────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});
