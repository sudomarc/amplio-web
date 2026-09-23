(function () {
  'use strict';

  var SERVICES_URL = 'data/services.json';

  var SERVICE_SELECT = document.querySelector('#service');
  var CONTACT_FORM = document.querySelector('.contact-form');
  var FORM_STATUS = document.getElementById('form-status');
  var CONSENT_CHECKBOX = document.querySelector('#consent');

  var ERROR_MESSAGES = {
    name: {
      valueMissing: 'Nom requis',
    },
    email: {
      valueMissing: 'Adresse e-mail requise',
      typeMismatch: 'Adresse e-mail invalide',
    },
    message: {
      valueMissing: 'Message requis',
    },
    consent: {
      valueMissing: 'Vous devez accepter le traitement de vos données',
    },
  };

  function getErrorMessage(field) {
    var validity = field.validity;
    var messages = ERROR_MESSAGES[field.name];

    if (!messages) {
      return field.validationMessage || 'Champ invalide';
    }

    if (validity.valueMissing && messages.valueMissing) {
      return messages.valueMissing;
    }
    if (validity.typeMismatch && messages.typeMismatch) {
      return messages.typeMismatch;
    }
    if (validity.tooShort && messages.tooShort) {
      return messages.tooShort;
    }

    return field.validationMessage || 'Champ invalide';
  }

  function showError(field, message) {
    var errorId = field.id + '-error';
    var errorEl = document.getElementById(errorId);
    var fieldContainer = field.closest('.contact-form__field');

    field.setAttribute('aria-invalid', 'true');
    if (errorEl) {
      errorEl.textContent = message;
    }
    if (fieldContainer) {
      fieldContainer.classList.add('contact-form__field--invalid');
    }
  }

  function clearError(field) {
    var errorId = field.id + '-error';
    var errorEl = document.getElementById(errorId);
    var fieldContainer = field.closest('.contact-form__field');

    field.setAttribute('aria-invalid', 'false');
    if (errorEl) {
      errorEl.textContent = '';
    }
    if (fieldContainer) {
      fieldContainer.classList.remove('contact-form__field--invalid');
    }
  }

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

  function focusFirstInvalid(form) {
    var invalidField = form.querySelector('[aria-invalid="true"]');
    if (invalidField) {
      invalidField.focus();
    }
  }

  function validateForm(form) {
    var isValid = form.checkValidity();

    if (!isValid) {
      var fields = form.querySelectorAll('input[required], textarea[required], select[required]');

      fields.forEach(function (field) {
        if (!field.validity.valid) {
          showError(field, getErrorMessage(field));
        } else {
          clearError(field);
        }
      });

      focusFirstInvalid(form);
    } else {
      var fields = form.querySelectorAll('input[required], textarea[required], select[required]');
      fields.forEach(clearError);
    }

    return isValid;
  }

  function setSubmitting(isSubmitting) {
    var submitBtn = CONTACT_FORM.querySelector('.contact-form__submit');
    if (submitBtn) {
      submitBtn.disabled = isSubmitting;
      var textEl = submitBtn.querySelector('.contact-form__submit-text');
      if (textEl) {
        textEl.textContent = isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande';
      }
      submitBtn.setAttribute('aria-busy', isSubmitting ? 'true' : 'false');
    }
  }

  function showFormStatus(message, isError) {
    if (!FORM_STATUS) return;
    FORM_STATUS.textContent = message;
    FORM_STATUS.hidden = false;
    FORM_STATUS.className = 'contact-form__status' + (isError ? ' contact-form__status--error' : ' contact-form__status--success');
    FORM_STATUS.setAttribute('role', isError ? 'alert' : 'status');
    FORM_STATUS.setAttribute('aria-live', isError ? 'assertive' : 'polite');
    FORM_STATUS.focus();
  }

  function clearFormStatus() {
    if (!FORM_STATUS) return;
    FORM_STATUS.textContent = '';
    FORM_STATUS.hidden = true;
    FORM_STATUS.className = 'contact-form__status';
  }

  function submitForm(form) {
    var formData = new FormData(form);
    var payload = {};
    var body;

    // Web3Forms exige une clé d'accès valide (voir contact.html) ;
    // la valeur placeholder doit être remplacée avant la mise en ligne.
    var accessKey = formData.get('access_key');
    if (!accessKey || accessKey === 'VOTRE_ACCESS_KEY_WEB3FORMS') {
      return Promise.reject(new Error('Formulaire non configuré'));
    }

    formData.forEach(function (value, key) {
      payload[key] = value;
    });
    body = JSON.stringify(payload);

    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    var form = event.target;
    var isValid = validateForm(form);

    if (!isValid) {
      return;
    }

    clearFormStatus();
    setSubmitting(true);

    submitForm(form)
      .then(function (response) {
        if (response.ok) {
          showFormStatus('Votre demande a bien été envoyée. Nous vous répondrons dès que possible.', false);
          form.reset();
          var fields = form.querySelectorAll('input[required], textarea[required], select[required]');
          fields.forEach(clearError);
        } else {
          throw new Error('Erreur serveur');
        }
      })
      .catch(function () {
        showFormStatus('L\'envoi a échoué. Veuillez réessayer dans quelques instants.', true);
      })
      .finally(function () {
        setSubmitting(false);
      });
  }

  function initValidation() {
    if (!CONTACT_FORM) {
      return;
    }

    var fields = CONTACT_FORM.querySelectorAll('input[required], textarea[required], select[required]');

    fields.forEach(function (field) {
      field.addEventListener('input', function () {
        if (!field.validity.valid) {
          showError(field, getErrorMessage(field));
        } else {
          clearError(field);
        }
      });

      field.addEventListener('blur', function () {
        if (!field.validity.valid) {
          showError(field, getErrorMessage(field));
        } else {
          clearError(field);
        }
      });
    });

    CONTACT_FORM.addEventListener('submit', handleSubmit);
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

    initValidation();
  }

  init();
})();