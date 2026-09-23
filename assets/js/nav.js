(function () {
  'use strict';

  function initNavigation() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.site-header__toggle');
    const nav = document.getElementById('primary-navigation');

    if (header && toggle && nav) {
      function setMenuOpen(open) {
        header.classList.toggle('is-menu-open', open);
        document.body.classList.toggle('has-menu-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      }

      toggle.addEventListener('click', () => {
        setMenuOpen(!header.classList.contains('is-menu-open'));
      });

      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          if (header.classList.contains('is-menu-open')) {
            setMenuOpen(false);
          }
        });
      });

      document.addEventListener('keydown', (event) => {
        if (!header.classList.contains('is-menu-open')) {
          return;
        }

        if (event.key === 'Escape') {
          setMenuOpen(false);
          toggle.focus();
          return;
        }

        if (event.key === 'Tab') {
          const focusables = Array.from(
            header.querySelectorAll('a[href], button:not([disabled])')
          );
          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 640 && header.classList.contains('is-menu-open')) {
          setMenuOpen(false);
        }
      });
    }

    const menu = document.querySelector('.site-header__menu');

    if (menu) {
      const rawPage = window.location.pathname.split('/').pop() || 'index.html';
      const currentPage = rawPage.split('?')[0].split('#')[0] || 'index.html';

      menu.querySelectorAll('a').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;
        const cleanHref = href.split('?')[0].split('#')[0];
        if (cleanHref === currentPage) {
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
