// small loader: fetch and insert header/footer HTML fragments
document.addEventListener('DOMContentLoaded', () => {
  const load = (selector, url) => {
    const el = document.querySelector(selector);
    if (!el) return;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load ' + url);
        return res.text();
      })
      .then(html => {
        el.innerHTML = html;
        // after injecting fragments, re-run small UI hooks (menu toggle, lucide icons if present)
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
        const btn = document.getElementById('mobile-menu-btn');
        if (btn) {
          btn.addEventListener('click', () => {
            const mm = document.getElementById('mobile-menu');
            if (mm) mm.classList.toggle('hidden');
          });
        }
      })
      .catch(() => { /* fail silently — pages still usable */ });
  };

  load('#site-header', 'includes/header.html');
  load('#site-footer', 'includes/footer.html');
});

(async function () {
    async function loadIfPlaceholderEmpty(selector, url) {
        const placeholder = document.querySelector(selector);
        if (!placeholder) return;
        // If the placeholder already contains markup, skip injection
        if (placeholder.children.length > 0 || placeholder.innerHTML.trim() !== '') return;
        try {
            const res = await fetch(url);
            if (!res.ok) return;
            const html = await res.text();
            placeholder.innerHTML = html;
            if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
        } catch (err) {
            console.warn('Failed to load fragment:', url, err);
        }
    }

    // If a real <header> exists on the page, don't inject header fragment.
    if (!document.querySelector('header')) {
        await loadIfPlaceholderEmpty('#site-header', 'fragments/header.html');
    }

    // If a real <footer> exists on the page, don't inject footer fragment.
    if (!document.querySelector('footer')) {
        await loadIfPlaceholderEmpty('#site-footer', 'fragments/footer.html');
    }
})();