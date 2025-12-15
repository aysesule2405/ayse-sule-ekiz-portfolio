// js/nav-enhancements.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) AUTO ACTIVE NAV LINK
  // Get current file name, e.g. "index.html", "about.html", etc.
  let currentPath = window.location.pathname.split('/').pop();
  if (!currentPath || currentPath === '/') {
    currentPath = 'index.html';
  }

  const links = document.querySelectorAll('.nav-link[href]');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    const file = href.split('/').pop();

    // Clear any hard-coded active class first
    link.classList.remove('active');

    // Match file to current page
    if (file === currentPath) {
      link.classList.add('active');
    }
  });

  // 2) CLOSE MOBILE MENU WHEN A LINK IS CLICKED
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBtn = document.getElementById('mobile-menu-btn');

  if (mobileMenu && mobileBtn) {
    const mobileLinks = mobileMenu.querySelectorAll('a.nav-link[href]');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        // Only close if menu is open
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      });
    });
  }
});
