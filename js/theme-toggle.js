// js/theme-toggle.js
(function () {
  const STORAGE_KEY = 'portfolio-theme';

  // Decide initial theme (saved value > OS preference > light)
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const saved = localStorage.getItem(STORAGE_KEY);
  let currentTheme =
    saved === 'dark' || saved === 'light'
      ? saved
      : prefersDark
      ? 'dark'
      : 'light';

  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    // Update all toggle buttons + icons
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-pressed', String(isDark));

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
    localStorage.setItem(STORAGE_KEY, currentTheme);
    applyTheme(currentTheme);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Apply initial theme
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
})();
