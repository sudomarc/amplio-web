(function () {
  'use strict';

  function initNavigation() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.site-header__toggle');
    const nav = document.getElementById('primary-navigation');

    if (header && toggle && nav) {
      function setMenuOpen(open) {
        header.classList.toggle('is-menu-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      }

      toggle.addEventListener('click', () => {
        setMenuOpen(!header.classList.contains('is-menu-open'));
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && header.classList.contains('is-menu-open')) {
          setMenuOpen(false);
          toggle.focus();
        }
      });
    }

    const menu = document.querySelector('.site-header__menu');

    if (menu) {
      const path = window.location.pathname;
      let currentPage = path.split('/').pop() || 'index.html';
      if (currentPage === '') {
        currentPage = 'index.html';
      }

      menu.querySelectorAll('a').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        }
      });
    }
  }

  if (document.querySelector('.site-header')) {
    initNavigation();
  } else {
    document.addEventListener('partials:loaded', initNavigation, { once: true });
  }
})();
