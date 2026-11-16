// ===== Theme System =====
(function () {
  const saved = localStorage.getItem('alexanders-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('alexanders-theme', next);
}

// ===== Mobile Navigation =====
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ===== Scroll Reveal Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-in, .fade-in-right, .fade-in-left, .stagger-children').forEach(el => {
    observer.observe(el);
  });
}

// ===== Committees Carousel / Slider =====
function initCommitteesSlider() {
  const slider = document.querySelector('.committees-slider');
  const prevBtn = document.querySelector('.committees-prev');
  const nextBtn = document.querySelector('.committees-next');

  if (!slider || !prevBtn || !nextBtn) return;

  const scrollAmount = 360;

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

// ===== Counter Numbers Animation =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetAttr = counter.getAttribute('data-target');
        if (!targetAttr) return;

        const targetNum = parseInt(targetAttr, 10);
        let current = 0;
        const duration = 1200;
        const stepTime = 25;
        const steps = duration / stepTime;
        const increment = targetNum / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNum) {
            current = targetNum;
            clearInterval(timer);
          }
          counter.textContent = '+' + Math.floor(current);
        }, stepTime);

        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
}

// ===== Navbar Scrolled Effect =====
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const checkScroll = () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.25)';
      navbar.style.borderBottomColor = 'rgba(56, 189, 248, 0.2)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.borderBottomColor = 'var(--border-color)';
    }
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimations();
  initCommitteesSlider();
  animateCounters();
  initNavbarScroll();
});
