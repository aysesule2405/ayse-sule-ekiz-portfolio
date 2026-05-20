// js/theme-toggle.js
(function () {
  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      // The theme still applies for this page view when storage is unavailable.
    }
  }

  // Decide initial theme (saved value > OS preference > light)
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const saved = getSavedTheme();
  let currentTheme =
    saved === 'dark' || saved === 'light'
      ? saved
      : prefersDark
      ? 'dark'
      : 'light';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    const isDark = theme === 'dark';

    document.querySelectorAll('[data-logo-light][data-logo-dark]').forEach((logo) => {
      const nextSrc = isDark ? logo.dataset.logoDark : logo.dataset.logoLight;
      if (nextSrc && logo.getAttribute('src') !== nextSrc) {
        logo.setAttribute('src', nextSrc);
      }
    });

    const favicon = document.getElementById('site-favicon');
    if (favicon) {
      const base = isDark ? 'images/logo-dark.png' : 'images/logo-light.png';
      favicon.href = base + '?t=' + Date.now();
    }

    // Update all toggle buttons + icons
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');

      const sunIcon = btn.querySelector('[data-theme-icon="sun"]');
      const moonIcon = btn.querySelector('[data-theme-icon="moon"]');

      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        } else {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        }
      }
    });
  }

  function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    saveTheme(currentTheme);
    applyTheme(currentTheme);
  }

  // Apply before DOMContentLoaded so pages do not flash the wrong palette.
  applyTheme(currentTheme);

  document.addEventListener('DOMContentLoaded', () => {
    // Sync controls that were not present during the early apply.
    applyTheme(currentTheme);

    // Wire all toggle buttons
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });
  });
  document.addEventListener('keydown', (e) => {
    // Ignore when typing in inputs/textareas
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (e.key === 't' || e.key === 'T') {
      toggleTheme();
    }
  });

  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event) => {
      if (getSavedTheme()) return;
      currentTheme = event.matches ? 'dark' : 'light';
      applyTheme(currentTheme);
    };

    if (typeof colorSchemeQuery.addEventListener === 'function') {
      colorSchemeQuery.addEventListener('change', handleSystemThemeChange);
    } else if (typeof colorSchemeQuery.addListener === 'function') {
      colorSchemeQuery.addListener(handleSystemThemeChange);
    }
  }
})();
