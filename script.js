/* ============================================
   OBSIDIAN BARBER — JavaScript
   ============================================ */

(function () {
  'use strict';

  /* === NAVBAR: scroll effect === */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  /* === MOBILE MENU === */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  window.closeMenu = function () {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  /* === STICKY BOOK BUTTON (mobile) === */
  const stickyBook = document.getElementById('stickyBook');
  const heroSection = document.getElementById('hero');

  function updateStickyBtn() {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0 && window.innerWidth <= 768) {
      stickyBook.style.opacity = '1';
      stickyBook.style.pointerEvents = 'auto';
    } else {
      stickyBook.style.opacity = '0';
      stickyBook.style.pointerEvents = 'none';
    }
  }

  stickyBook.style.transition = 'opacity 0.35s ease';
  stickyBook.style.opacity = '0';
  stickyBook.style.pointerEvents = 'none';

  window.addEventListener('scroll', updateStickyBtn, { passive: true });
  window.addEventListener('resize', updateStickyBtn, { passive: true });

  /* === HERO IMAGE ZOOM === */
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    setTimeout(function () {
      heroImage.classList.add('zoomed');
    }, 100);
  }

  /* === FADE-IN SCROLL ANIMATIONS === */
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger children if parent is a grid
          const el = entry.target;
          el.classList.add('visible');
          fadeObserver.unobserve(el);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  fadeElements.forEach(function (el, index) {
    // Add staggered delay for grid children
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('services-grid') ||
                   parent.classList.contains('testimonials-grid') ||
                   parent.classList.contains('gallery-grid'))) {
      el.style.transitionDelay = (index % 4) * 0.1 + 's';
    }
    fadeObserver.observe(el);
  });

  /* === HERO content: animate on load === */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(function () {
      heroContent.classList.add('visible');
    }, 200);
  }

  /* === SMOOTH CLOSE on nav link click === */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* === ACTIVE NAV link highlight === */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';
      link.style.opacity = '';
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.style.color = 'var(--gold)';
        link.style.opacity = '1';
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* === GALLERY ITEMS: stagger animation === */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
          }, i * 80);
          galleryObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  galleryItems.forEach(function (item) {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.97)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    galleryObserver.observe(item);
  });

  /* === COUNTER ANIMATION for stats === */
  const stats = document.querySelectorAll('.stat-num');

  function animateCounter(el) {
    const text = el.textContent;
    const numMatch = text.match(/[\d.]+/);
    if (!numMatch) return;

    const end = parseFloat(numMatch[0]);
    const suffix = text.replace(/[\d.]+/, '');
    const duration = 1200;
    const steps = 40;
    const increment = end / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(function () {
      step++;
      current = Math.min(current + increment, end);
      const display = Number.isInteger(end) ? Math.round(current) : current.toFixed(1);
      el.textContent = display + suffix;
      if (step >= steps) {
        clearInterval(timer);
        el.textContent = end + suffix;
      }
    }, duration / steps);
  }

  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach(function (stat) {
    statsObserver.observe(stat);
  });

  /* === SERVICE CARDS hover lift === */
  document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-4px)';
      this.style.transition = 'transform 0.3s ease, background 0.35s ease';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

})();
