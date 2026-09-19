(function () {
  'use strict';

  function replaceInclude(placeholder) {
    const file = placeholder.getAttribute('data-include');

    if (!file) {
      return Promise.resolve();
    }

    return fetch(file)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Impossible de charger "${file}" (statut ${response.status})`);
        }
        return response.text();
      })
      .then((html) => {
        placeholder.outerHTML = html;
      })
      .catch((error) => {
        console.error(`includes: ${error.message}`);
      });
  }

  const placeholders = Array.from(document.querySelectorAll('[data-include]'));

  Promise.all(placeholders.map(replaceInclude))
    .then(() => {
      document.dispatchEvent(new CustomEvent('partials:loaded'));
    });
})();