(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setStaggerIndexes() {
    var menuItems = document.querySelectorAll('.site-header__menu li');
    menuItems.forEach(function (item, index) {
      item.style.setProperty('--stagger', String(index));
    });
  }

  var revealObserver = null;

  function getRevealObserver() {
    if (revealObserver || !('IntersectionObserver' in window)) {
      return revealObserver;
    }
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    return revealObserver;
  }

  function initReveal() {
    var targets = document.querySelectorAll('.reveal:not([data-reveal-bound])');

    if (!targets.length) {
      return;
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('is-visible');
        el.setAttribute('data-reveal-bound', '');
      });
      return;
    }

    var observer = getRevealObserver();

    targets.forEach(function (el) {
      el.setAttribute('data-reveal-bound', '');
      observer.observe(el);
    });
  }

  function init() {
    setStaggerIndexes();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('partials:loaded', setStaggerIndexes);
  document.addEventListener('content:rendered', initReveal);
})();
