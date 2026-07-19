(() => {
  'use strict';

  const THEME_KEY = 'akscape-theme';
  const DARK_CLASS = 'dark';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_CLASS : 'light';
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
    }
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === DARK_CLASS) {
      html.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.setAttribute('data-theme', getSystemTheme());
    }
  }

  function initTheme() {
    const stored = getStoredTheme();
    const defaultTheme = 'system';
    const theme = stored || defaultTheme;
    applyTheme(theme);
    updateThemeToggle(theme);
  }

  function updateThemeToggle(theme) {
    const toggle = document.querySelector('.header-theme-toggle');
    if (!toggle) return;
    const isDark = theme === DARK_CLASS || (theme === 'system' && getSystemTheme() === DARK_CLASS);
    toggle.setAttribute('aria-pressed', isDark.toString());
  }

  function toggleTheme() {
    const stored = getStoredTheme() || 'system';
    const current = stored === 'system' ? getSystemTheme() : stored;
    const next = current === DARK_CLASS ? 'light' : DARK_CLASS;
    setStoredTheme(next);
    applyTheme(next);
    updateThemeToggle(next);
  }

  function initThemeToggle() {
    const toggle = document.querySelector('.header-theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', toggleTheme);
  }

  function initSearchModal() {
    const searchToggle = document.querySelector('.header-search-toggle');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.querySelector('.search-modal-close');
    const searchOverlay = document.querySelector('.search-modal-overlay');

    if (!searchToggle || !searchModal) return;

    function openSearch() {
      searchModal.classList.add('is-open');
      searchToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const input = searchModal.querySelector('input');
      if (input) input.focus();
    }

    function closeSearch() {
      searchModal.classList.remove('is-open');
      searchToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    searchToggle.addEventListener('click', openSearch);
    searchClose?.addEventListener('click', closeSearch);
    searchOverlay?.addEventListener('click', closeSearch);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('is-open')) {
        closeSearch();
      }
    });
  }

  function initTocHighlight() {
    const tocLinks = document.querySelectorAll('.toc-link');
    if (tocLinks.length === 0) return;

    const headings = Array.from(document.querySelectorAll('.article-content h2, .article-content h3'));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          if (!id) return;
          const link = document.querySelector(`.toc-link[href="#${id}"]`);
          if (link) {
            if (entry.isIntersecting) {
              document.querySelectorAll('.toc-link.is-active').forEach((l) => l.classList.remove('is-active'));
              link.classList.add('is-active');
            }
          }
        });
      },
      {
        rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64}px 0px -80% 0px`,
        threshold: 0
      }
    );

    headings.forEach((heading) => observer.observe(heading));
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 24;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  function initCodeCopy() {
    document.querySelectorAll('pre').forEach((pre) => {
      const button = document.createElement('button');
      button.className = 'code-copy-btn';
      button.setAttribute('aria-label', 'Copy code');
      button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
      button.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 6px;
        background: var(--color-bg-muted);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        color: var(--color-fg-muted);
        cursor: pointer;
        opacity: 0;
        transition: opacity var(--transition-fast), color var(--transition-fast), background-color var(--transition-fast);
      `;
      pre.style.position = 'relative';
      pre.appendChild(button);

      pre.addEventListener('mouseenter', () => { button.style.opacity = '1'; });
      pre.addEventListener('mouseleave', () => { button.style.opacity = '0'; });

      button.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.textContent || pre.textContent;
        try {
          await navigator.clipboard.writeText(code);
          button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          button.style.color = 'var(--color-accent)';
          setTimeout(() => {
            button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
            button.style.color = '';
          }, 2000);
        } catch (e) {
        }
      });
    });
  }

  function initImageZoom() {
    document.querySelectorAll('.article-content img').forEach((img) => {
      if (img.closest('a')) return;
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          inset: 0;
          background: rgb(0 0 0 / 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          cursor: zoom-out;
        `;
        const zoomedImg = document.createElement('img');
        zoomedImg.src = img.src;
        zoomedImg.alt = img.alt;
        zoomedImg.style.cssText = `
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
        `;
        overlay.appendChild(zoomedImg);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        overlay.addEventListener('click', () => {
          document.body.removeChild(overlay);
          document.body.style.overflow = '';
        });
      });
    });
  }

  function init() {
    initTheme();
    initThemeToggle();
    initSearchModal();
    initTocHighlight();
    initSmoothScroll();
    initCodeCopy();
    initImageZoom();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const stored = getStoredTheme();
    if (!stored || stored === 'system') {
      applyTheme('system');
      updateThemeToggle('system');
    }
  });
})();