(function () {
  'use strict';

  var SERVICES_URL = 'data/services.json';

  var HOME_LIST = document.querySelector('.home-services__list');
  var HOME_VISUAL = document.querySelector('.home-services__visual');
  var SERVICES_LIST = document.querySelector('.services-cards__list');
  var SERVICES_VISUAL = document.querySelector('.services-cards__visual');
  var SELECTOR_FIELD = document.querySelector('#service-selector');
  var CONTINUE_BUTTON = document.querySelector('#service-continue');
  var SELECTOR_STATUS = document.querySelector('#service-selection-status');

  var CARD_MARKS = [
    'service-card__mark--square',
    'service-card__mark--ring',
    'service-card__mark--cross',
    'service-card__mark--dot'
  ];

  var selectedServiceId = null;
  var servicesById = {};

  function loadServices() {
    return fetch(SERVICES_URL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Impossible de charger les services (statut ' + response.status + ')');
        }
        return response.json();
      });
  }

  function isValidService(service, index) {
    return Boolean(service)
      && typeof service === 'object'
      && typeof service.id === 'string' && service.id.length > 0
      && typeof service.name === 'string' && service.name.length > 0
      && typeof service.description === 'string' && service.description.length > 0
      && Array.isArray(service.scope)
      && service.scope.every(function (item) {
        return typeof item === 'string' && item.length > 0;
      })
      && typeof index === 'number' && index >= 0;
  }

  function validateServices(data) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Structure des services invalide : tableau attendu');
    }

    var ids = [];

    data.forEach(function (service, index) {
      if (!isValidService(service, index)) {
        throw new Error('Structure du service invalide (index ' + index + ')');
      }
      if (ids.indexOf(service.id) !== -1) {
        throw new Error('Identifiant de service dupliqué : ' + service.id);
      }
      ids.push(service.id);
    });

    return data;
  }

  function renderError(target, message) {
    if (!target) {
      return;
    }

    var status = document.createElement('p');
    status.className = 'services-error';
    status.setAttribute('role', 'status');
    status.textContent = message;

    target.parentNode.replaceChild(status, target);
  }

  function createLabeledIcon(className, text) {
    var element = document.createElement('span');
    element.className = className;
    element.setAttribute('aria-hidden', 'true');
    element.textContent = text;
    return element;
  }

  function renderVisualPanel(target, services) {
    if (!target) {
      return;
    }

    var fragment = document.createDocumentFragment();

    services.forEach(function (service, index) {
      if (!service.image) {
        return;
      }
      var img = document.createElement('img');
      img.className = index === 0 ? 'is-active' : '';
      img.dataset.for = service.id;
      img.src = service.image;
      img.alt = service.imageAlt || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      if (service.imageWidth) img.width = service.imageWidth;
      if (service.imageHeight) img.height = service.imageHeight;
      fragment.appendChild(img);
    });

    target.appendChild(fragment);
  }

  function setActiveVisual(target, serviceId) {
    if (!target) {
      return;
    }
    target.querySelectorAll('img').forEach(function (img) {
      img.classList.toggle('is-active', img.dataset.for === serviceId);
    });
  }

  /* ---------------------- Page Services : cartes ---------------------- */

  function renderServicesPage(services) {
    if (!SERVICES_LIST) {
      return;
    }

    var fragment = document.createDocumentFragment();

    services.forEach(function (service, index) {
      var item = document.createElement('li');
      item.className = 'services-cards__item';

      var label = document.createElement('label');
      label.className = 'service-card';

      var radio = document.createElement('input');
      radio.className = 'service-card__radio sr-only';
      radio.type = 'radio';
      radio.name = 'service';
      radio.value = service.id;
      radio.setAttribute('aria-labelledby', 'service-card-title-' + service.id);
      radio.setAttribute('aria-describedby', 'service-card-desc-' + service.id + ' service-card-scope-' + service.id);

      var top = document.createElement('span');
      top.className = 'service-card__top';

      var number = document.createElement('span');
      number.className = 'service-card__index';
      number.setAttribute('aria-hidden', 'true');
      number.textContent = String(index + 1).padStart(2, '0');

      var indicators = document.createElement('span');
      indicators.className = 'service-card__top-indicators';
      indicators.setAttribute('aria-hidden', 'true');

      var mark = document.createElement('span');
      mark.className = 'service-card__mark ' + CARD_MARKS[index % CARD_MARKS.length];
      mark.setAttribute('aria-hidden', 'true');

      var check = createLabeledIcon('service-card__check', '✓');

      indicators.appendChild(mark);
      indicators.appendChild(check);

      top.appendChild(number);
      top.appendChild(indicators);

      var title = document.createElement('h2');
      title.className = 'service-card__title';
      title.id = 'service-card-title-' + service.id;
      title.textContent = service.name;

      var description = document.createElement('span');
      description.className = 'service-card__description';
      description.id = 'service-card-desc-' + service.id;
      description.textContent = service.description;

      var scope = document.createElement('span');
      scope.className = 'service-card__scope';
      scope.id = 'service-card-scope-' + service.id;
      scope.setAttribute('role', 'list');

      service.scope.forEach(function (itemName) {
        var scopeItem = document.createElement('span');
        scopeItem.className = 'service-card__scope-item';
        scopeItem.setAttribute('role', 'listitem');
        scopeItem.textContent = itemName;
        scope.appendChild(scopeItem);
      });

      label.appendChild(radio);
      label.appendChild(top);
      label.appendChild(title);
      label.appendChild(description);
      label.appendChild(scope);

      item.appendChild(label);
      fragment.appendChild(item);

      label.addEventListener('mouseenter', function () {
        setActiveVisual(SERVICES_VISUAL, service.id);
      });
      label.addEventListener('focusin', function () {
        setActiveVisual(SERVICES_VISUAL, service.id);
      });
    });

    SERVICES_LIST.appendChild(fragment);

    if (SERVICES_LIST.addEventListener) {
      SERVICES_LIST.addEventListener('mouseleave', function () {
        setActiveVisual(SERVICES_VISUAL, selectedServiceId || services[0].id);
      });
    }
  }

  /* --------------------- Accueil : liste interactive ------------------- */

  function renderHomeServices(services) {
    if (!HOME_LIST) {
      return;
    }

    var fragment = document.createDocumentFragment();

    services.forEach(function (service, index) {
      var item = document.createElement('li');
      item.className = 'home-services__item';

      var row = document.createElement('button');
      row.type = 'button';
      row.className = 'home-services__row';
      row.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
      row.setAttribute('aria-controls', 'home-panel-' + service.id);
      row.dataset.serviceId = service.id;

      var number = document.createElement('span');
      number.className = 'home-services__index';
      number.setAttribute('aria-hidden', 'true');
      number.textContent = String(index + 1).padStart(2, '0');

      var name = document.createElement('span');
      name.className = 'home-services__name';
      name.textContent = service.name;

      var arrow = document.createElement('span');
      arrow.className = 'home-services__arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';

      row.appendChild(number);
      row.appendChild(name);
      row.appendChild(arrow);

      var panel = document.createElement('div');
      panel.className = 'home-services__panel';
      panel.id = 'home-panel-' + service.id;

      var panelInner = document.createElement('div');
      panelInner.className = 'home-services__panel-inner';

      var text = document.createElement('p');
      text.className = 'home-services__text';
      text.textContent = service.summary || service.description;

      panelInner.appendChild(text);
      panel.appendChild(panelInner);

      item.appendChild(row);
      item.appendChild(panel);

      fragment.appendChild(item);

      row.addEventListener('click', function () {
        setActiveHomeService(service.id);
      });
      row.addEventListener('mouseenter', function () {
        setActiveVisual(HOME_VISUAL, service.id);
      });
      row.addEventListener('focus', function () {
        setActiveVisual(HOME_VISUAL, service.id);
      });
    });

    HOME_LIST.appendChild(fragment);

    if (services[0]) {
      setActiveVisual(HOME_VISUAL, services[0].id);
    }
  }

  function setActiveHomeService(id) {
    if (!HOME_LIST) {
      return;
    }
    HOME_LIST.querySelectorAll('.home-services__row').forEach(function (row) {
      var isActive = row.dataset.serviceId === id;
      row.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
    setActiveVisual(HOME_VISUAL, id);
  }

  /* ------------------------- Sélecteur (formulaire) --------------------- */

  function getServiceById(id) {
    return servicesById[id] || null;
  }

  function continueToContact() {
    if (!getServiceById(selectedServiceId)) {
      selectedServiceId = null;
      updateSelectorUi(null);
      return;
    }

    var url = 'contact.html?service=' + encodeURIComponent(selectedServiceId);
    window.location.assign(url);
  }

  function updateSelectorUi(selectedId) {
    if (!SELECTOR_FIELD) {
      return;
    }

    var cards = SELECTOR_FIELD.querySelectorAll('.service-card');
    cards.forEach(function (card) {
      card.classList.toggle('is-selected', card.querySelector('.service-card__radio').value === selectedId);
    });

    if (CONTINUE_BUTTON) {
      CONTINUE_BUTTON.disabled = selectedId === null;
      if (CONTINUE_BUTTON.disabled) {
        CONTINUE_BUTTON.removeAttribute('data-service-id');
      } else {
        CONTINUE_BUTTON.setAttribute('data-service-id', selectedId);
      }
    }

    if (SELECTOR_STATUS) {
      var service = getServiceById(selectedId);
      SELECTOR_STATUS.textContent = service
        ? 'Service sélectionné : ' + service.name + '.'
        : 'Aucun service sélectionné pour le moment.';
    }

    if (selectedId) {
      setActiveVisual(SERVICES_VISUAL, selectedId);
    }
  }

  function initSelector(services) {
    if (!SELECTOR_FIELD || !CONTINUE_BUTTON) {
      return;
    }

    servicesById = {};
    services.forEach(function (service) {
      servicesById[service.id] = service;
    });

    updateSelectorUi(null);

    SELECTOR_FIELD.addEventListener('change', function (event) {
      var radio = event.target;
      var id = radio.value;

      if (getServiceById(id) && radio.checked) {
        selectedServiceId = id;
      } else {
        selectedServiceId = null;
      }

      updateSelectorUi(selectedServiceId);
    });

    CONTINUE_BUTTON.addEventListener('click', continueToContact);
  }

  function handleError(error) {
    var message = 'Les services ne peuvent pas être affichés pour le moment.';

    console.error('services: ' + error.message);

    if (HOME_LIST) {
      renderError(HOME_LIST, message);
    }
    if (SERVICES_LIST) {
      renderError(SERVICES_LIST, message);
    }
  }

  function init() {
    if (!HOME_LIST && !SERVICES_LIST) {
      return;
    }

    loadServices()
      .then(validateServices)
      .then(function (services) {
        renderServicesPage(services);
        renderVisualPanel(SERVICES_VISUAL, services);
        renderHomeServices(services);
        renderVisualPanel(HOME_VISUAL, services);
        initSelector(services);
      })
      .catch(handleError);
  }

  init();
})();
