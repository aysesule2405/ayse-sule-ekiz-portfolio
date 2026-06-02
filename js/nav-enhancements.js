// js/nav-enhancements.js
document.addEventListener('DOMContentLoaded', () => {
  // 0) ICONS
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    try {
      window.lucide.createIcons();
    } catch (err) {
      console.warn(err);
    }
  }

  // 1) AUTO ACTIVE — direct nav links + dropdown items
  let currentPath = window.location.pathname.split('/').pop();
  if (!currentPath || currentPath === '/') {
    currentPath = 'index.html';
  }

  document.querySelectorAll('.nav-link[href], .nav-dropdown-item[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const file = href.split('/').pop();
    link.classList.remove('active');
    if (file === currentPath) {
      link.classList.add('active');
    }
  });

  // Propagate active state to parent dropdown toggle button
  document.querySelectorAll('.nav-dropdown-group').forEach((group) => {
    if (group.querySelector('.nav-dropdown-item.active')) {
      group.querySelector('.nav-dropdown-toggle')?.classList.add('active');
    }
  });

  // 2) CLOSE MOBILE MENU when a link is clicked
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBtn = document.getElementById('mobile-menu-btn');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const willOpen = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileBtn.setAttribute('aria-expanded', String(willOpen));
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileBtn?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // 3) MOBILE DROPDOWN TOGGLE — Art submenu accordion
  document.querySelectorAll('.mobile-dropdown-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const submenu = btn.nextElementSibling;
      if (!submenu) return;
      const isOpen = submenu.classList.contains('open');
      submenu.classList.toggle('open', !isOpen);
      const chevron = btn.querySelector('.dropdown-chevron');
      if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
    });
  });

  // 4) CARD DETAIL TOGGLES
  document.querySelectorAll('.view-details-btn:not([data-catalog])').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const button = event.currentTarget;
      const article = button.closest('.masonry-item');
      if (!article) return;

      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      article.classList.toggle('show-details', !isExpanded);
      button.setAttribute('aria-expanded', String(!isExpanded));
      button.textContent = isExpanded ? 'View Details' : 'Hide Details';
    });
  });

  // 5) PROJECT IMAGE CYCLING
  document.querySelectorAll('.project-visual[data-bg-images]').forEach((visual) => {
    const bgImg = visual.querySelector('.project-visual-img');
    if (!bgImg) return;

    let images;
    try {
      images = JSON.parse(visual.dataset.bgImages);
    } catch (err) {
      console.warn('Invalid project image list', err);
      return;
    }

    if (!Array.isArray(images) || images.length < 2) return;

    let current = 0;
    bgImg.style.transition = 'opacity 0.7s ease';
    window.setInterval(() => {
      current = (current + 1) % images.length;
      bgImg.style.opacity = '0';
      window.setTimeout(() => {
        bgImg.src = images[current];
        bgImg.style.opacity = '1';
      }, 700);
    }, 3500);
  });

  // 6) SHARED FOOTER
  const footer = document.querySelector('footer');
  if (footer) {
    footer.className = 'site-footer bg-white border-t border-gray-200 mt-12 relative overflow-hidden transition-colors duration-300';
    footer.innerHTML = `
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="flex justify-center items-center space-x-6 mb-4">
          <a href="https://www.instagram.com/aysule_2327/" target="_blank" rel="noopener noreferrer"
             class="site-footer-link text-[#850F01] hover:text-[#FFA618] transition duration-150" aria-label="Instagram">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
              <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/ayse-sule-ekiz-52892a1b6/" target="_blank" rel="noopener noreferrer"
             class="site-footer-link text-[#850F01] hover:text-[#FFA618] transition duration-150" aria-label="LinkedIn">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.53V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z"/>
            </svg>
          </a>
          <a href="https://github.com/aysesule2405" target="_blank" rel="noopener noreferrer"
             class="site-footer-link text-[#850F01] hover:text-[#FFA618] transition duration-150" aria-label="GitHub">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.15c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A11 11 0 0 1 12 6.08c.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.42-2.69 5.39-5.25 5.67.42.36.78 1.06.78 2.15v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
            </svg>
          </a>
          <a href="https://devpost.com/ase2327ekiz" target="_blank" rel="noopener noreferrer"
             class="site-footer-link text-[#850F01] hover:text-[#FFA618] transition duration-150 inline-flex items-center justify-center" aria-label="Devpost">
            <span class="font-extrabold text-lg leading-none">D</span>
          </a>
        </div>
        <p class="text-sm text-gray-500 transition-colors duration-300">&copy; 2026 Ayse Sule Ekiz. All rights reserved.</p>
      </div>
    `;
  }

  // 7) BACK TO TOP BUTTON
  const backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'back-to-top-btn';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19V5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M6.5 10.5 12 5l5.5 5.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  document.body.appendChild(backToTop);

  const updateBackToTop = () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 360);
  };

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  updateBackToTop();
  window.addEventListener('scroll', updateBackToTop, { passive: true });
});
