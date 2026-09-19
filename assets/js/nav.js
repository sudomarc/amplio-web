(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.site-header__toggle');
  const nav = document.getElementById('primary-navigation');
  const menu = document.querySelector('.site-header__menu');

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

  if (menu) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    menu.querySelectorAll('a').forEach((link) => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('is-active');
      }
    });
  }
})();
