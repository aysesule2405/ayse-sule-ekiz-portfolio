(function () {
  'use strict';

  // ── Scroll progress bar ─────────────────────────────────────────
  function initProgressBar() {
    var bar = document.createElement('div');
    bar.id = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      var total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    }, { passive: true });
  }

  // ── Assign reveal classes to elements ──────────────────────────
  function assignRevealClasses() {
    // Section headings — skip anything inside the hero text block
    document.querySelectorAll('h2, h3').forEach(function (el) {
      if (!el.closest('.hero-text') && !el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });

    // Home page interest cards — staggered left-to-right
    document.querySelectorAll('.interest-card').forEach(function (card, i) {
      if (!card.classList.contains('reveal')) {
        card.classList.add('reveal');
        card.setAttribute('data-delay', String(i + 1));
      }
    });

    // Masonry gallery cards — stagger by column position (mod 3)
    document.querySelectorAll('.masonry-item').forEach(function (item, i) {
      if (!item.classList.contains('reveal')) {
        item.classList.add('reveal');
        item.setAttribute('data-delay', String((i % 3) + 1));
      }
    });

    // Italic section intro paragraphs on gallery pages
    document.querySelectorAll('p.italic').forEach(function (el) {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });
  }

  // ── Intersection Observer ───────────────────────────────────────
  function setupObserver() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: make everything visible immediately
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -32px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── Init on DOM ready ───────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initProgressBar();
    assignRevealClasses();
    setupObserver();
  });

}());
