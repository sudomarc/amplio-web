(function () {
  'use strict';

  var SERVICES_URL = 'data/services.json';

  var HOME_LIST = document.querySelector('.home-services__list');
  var SERVICES_LIST = document.querySelector('.services-cards__list');
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

      var check = createLabeledIcon('service-card__check', '\u2713');

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
    });

    SERVICES_LIST.appendChild(fragment);
  }

  function renderHomeServices(services) {
    if (!HOME_LIST) {
      return;
    }

    var fragment = document.createDocumentFragment();

    services.forEach(function (service, index) {
      var item = document.createElement('li');
      item.className = 'home-services__item';

      var number = document.createElement('p');
      number.className = 'home-services__index';
      number.textContent = String(index + 1).padStart(2, '0');

      var title = document.createElement('h3');
      title.className = 'home-services__name';
      title.textContent = service.name;

      var text = document.createElement('p');
      text.className = 'home-services__text';
      text.textContent = service.summary || service.description;

      item.appendChild(number);
      item.appendChild(title);
      item.appendChild(text);

      fragment.appendChild(item);
    });

    HOME_LIST.appendChild(fragment);
  }

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
        renderHomeServices(services);
        initSelector(services);
      })
      .catch(handleError);
  }

  init();
})();