/* =========================================================
   PORTFOLIO — SCRIPT.JS
   Akkala Venkata Sai Krishna | Data Analyst & BI Specialist
   ========================================================= */

// ── Subtle Analytical Particles Background ────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 35;
  const colors = ['rgba(56, 189, 248, 0.35)', 'rgba(59, 130, 246, 0.25)', 'rgba(99, 102, 241, 0.25)'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${4 + Math.random() * 5}s;
      --delay: ${Math.random() * 5}s;
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
  if (window.scrollY > 40) {
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
    if (window.scrollY >= sec.offsetTop - 130) {
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
const menuBtn    = document.getElementById('menuBtn');
const closeBtn   = document.getElementById('closeBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mLinks     = document.querySelectorAll('.m-link');

if (menuBtn && mobileMenu && closeBtn) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mLinks.forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// ── Dynamic Typing Animation for Roles ───────────────────
const roles = [
  'Actionable Business Insights',
  'Power BI Dashboards',
  'Tableau Analytics',
  'Snowflake Data Warehousing',
  'AI & RAG Solutions',
  'Optimized SQL Pipelines',
  'Executive KPI Reports',
  'Data-Driven Solutions',
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
      setTimeout(typeRole, 2000);
      return;
    }
  } else {
    roleEl.textContent = current.substring(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 50 : 100);
}
setTimeout(typeRole, 700);

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
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ── Counter Animation ─────────────────────────────────────
const counters = document.querySelectorAll('.stat-num');

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const step = 20;
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
}, { threshold: 0.4 });

counters.forEach(el => counterObserver.observe(el));

// ── Proficiency Bars Animation ────────────────────────────
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
}, { threshold: 0.25 });

[...profFills, ...cgpaFills].forEach(el => barObserver.observe(el));

// ── Project Category Filtering ────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      if (filter === 'all' || category.includes(filter)) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
          card.style.transition = 'all 0.35s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Contact Form Handling ─────────────────────────────────
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
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.style.color = '#10b981';
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = 'Could not send message right now. Please email directly at saikrishnaakkala9@gmail.com';
        formStatus.style.color = '#f87171';
      }
    } finally {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    }
  });
}

// ── Smooth Scroll Offset for Anchor Links ─────────────────
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

// ── Page Load Smooth Fade-in ──────────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});
