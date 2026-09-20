(function () {
  'use strict';

  var SERVICES_URL = 'data/services.json';

  var SERVICE_SELECT = document.querySelector('#service');

  function getServiceIdParam() {
    var params = new URLSearchParams(window.location.search);
    var values = params.getAll('service');

    if (values.length !== 1) {
      return null;
    }

    return values[0];
  }

  function loadServices() {
    return fetch(SERVICES_URL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Impossible de charger les services (statut ' + response.status + ')');
        }
        return response.json();
      });
  }

  function hasServiceId(services, id) {
    return Array.isArray(services) && services.some(function (service) {
      return Boolean(service) && service.id === id;
    });
  }

  function findOption(select, value) {
    var options = select.options;

    for (var i = 0; i < options.length; i += 1) {
      if (options[i].value === value) {
        return options[i];
      }
    }

    return null;
  }

  function prefillService(select, services) {
    var serviceId = getServiceIdParam();

    if (typeof serviceId !== 'string' || serviceId.length === 0) {
      return;
    }

    if (!hasServiceId(services, serviceId)) {
      return;
    }

    if (!findOption(select, serviceId)) {
      return;
    }

    select.value = serviceId;
  }

  function init() {
    if (!SERVICE_SELECT) {
      return;
    }

    loadServices()
      .then(function (services) {
        prefillService(SERVICE_SELECT, services);
      })
      .catch(function (error) {
        console.error('contact: ' + error.message);
      });
  }

  init();
})();