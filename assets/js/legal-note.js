(function () {
  'use strict';

  var STORAGE_KEY = 'amplio:legal-note-dismissed';
  var initialized = false;

  function init() {
    var note = document.getElementById('legal-note');

    if (!note || initialized) {
      return;
    }

    if (note.hidden) {
      return;
    }

    if (localStorage.getItem(STORAGE_KEY) === '1') {
      note.hidden = true;
      return;
    }

    initialized = true;

    var dismissBtn = note.querySelector('[data-legal-note-dismiss]');

    function dismiss() {
      note.hidden = true;
      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch (e) {
        /* stockage indisponible : le bandeau se ferme simplement */
      }
    }

    if (dismissBtn) {
      dismissBtn.addEventListener('click', dismiss);
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !note.hidden) {
        dismiss();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('partials:loaded', init);
})();