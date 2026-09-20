(function () {
  'use strict';

  var SERVICES_URL = 'data/services.json';

  var HOME_LIST = document.querySelector('.home-services__list');
  var SERVICES_LIST = document.querySelector('.services-cards__list');

  var CARD_MARKS = [
    'service-card__mark--square',
    'service-card__mark--ring',
    'service-card__mark--cross',
    'service-card__mark--dot'
  ];

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

  function renderServicesPage(services) {
    if (!SERVICES_LIST) {
      return;
    }

    var fragment = document.createDocumentFragment();

    services.forEach(function (service, index) {
      var item = document.createElement('li');
      item.className = 'services-cards__item';

      var card = document.createElement('article');
      card.className = 'service-card';

      var top = document.createElement('div');
      top.className = 'service-card__top';

      var number = document.createElement('p');
      number.className = 'service-card__index';
      number.setAttribute('aria-hidden', 'true');
      number.textContent = String(index + 1).padStart(2, '0');

      var mark = document.createElement('span');
      mark.className = 'service-card__mark ' + CARD_MARKS[index % CARD_MARKS.length];
      mark.setAttribute('aria-hidden', 'true');

      top.appendChild(number);
      top.appendChild(mark);

      var title = document.createElement('h2');
      title.className = 'service-card__title';
      title.textContent = service.name;

      var description = document.createElement('p');
      description.className = 'service-card__description';
      description.textContent = service.description;

      var scope = document.createElement('ul');
      scope.className = 'service-card__scope';

      service.scope.forEach(function (itemName) {
        var li = document.createElement('li');
        li.textContent = itemName;
        scope.appendChild(li);
      });

      card.appendChild(top);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(scope);

      item.appendChild(card);
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
      })
      .catch(handleError);
  }

  init();
})();