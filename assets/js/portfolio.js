(function () {
  'use strict';

  var PROJECTS_URL = 'data/projects.json';

  var GRID = document.querySelector('.portfolio-grid');

  var COVER_VARIANTS = {
    identity: {
      coverClass: 'portfolio-card__cover--identity',
      mark: 'A.',
      markClass: '',
      figures: ['portfolio-card__figure--square']
    },
    campaign: {
      coverClass: 'portfolio-card__cover--campaign',
      mark: '\u2192',
      markClass: '',
      figures: ['portfolio-card__figure--ring']
    },
    editorial: {
      coverClass: 'portfolio-card__cover--editorial',
      mark: '\u0026',
      markClass: '',
      figures: ['portfolio-card__figure--rule', 'portfolio-card__figure--dot']
    },
    strategy: {
      coverClass: 'portfolio-card__cover--strategy',
      mark: '01',
      markClass: 'portfolio-card__mark--mono',
      figures: ['portfolio-card__figure--orb']
    },
    event: {
      coverClass: 'portfolio-card__cover--event',
      mark: '\u00d7',
      markClass: 'portfolio-card__mark--accent',
      figures: ['portfolio-card__figure--square portfolio-card__figure--square-soft', 'portfolio-card__figure--square portfolio-card__figure--square-dim']
    },
    digital: {
      coverClass: 'portfolio-card__cover--digital',
      mark: '\u203a',
      markClass: '',
      figures: ['portfolio-card__figure--bar']
    }
  };

  function loadProjects() {
    return fetch(PROJECTS_URL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Impossible de charger les projets (statut ' + response.status + ')');
        }
        return response.json();
      });
  }

  function isValidProject(project, index) {
    return Boolean(project)
      && typeof project === 'object'
      && typeof project.id === 'string' && project.id.length > 0
      && typeof project.category === 'string' && project.category.length > 0
      && typeof project.title === 'string' && project.title.length > 0
      && typeof project.status === 'string' && project.status.length > 0
      && typeof project.cover === 'string'
      && Object.prototype.hasOwnProperty.call(COVER_VARIANTS, project.cover)
      && typeof index === 'number' && index >= 0;
  }

  function validateProjects(data) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Structure des projets invalide : tableau attendu');
    }

    var ids = [];

    data.forEach(function (project, index) {
      if (!isValidProject(project, index)) {
        throw new Error('Structure du projet invalide (index ' + index + ')');
      }
      if (ids.indexOf(project.id) !== -1) {
        throw new Error('Identifiant de projet dupliqué : ' + project.id);
      }
      ids.push(project.id);
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

  function createElement(className, text) {
    var element = document.createElement('span');
    element.className = className;
    element.textContent = text || '';
    return element;
  }

  function createCover(project) {
    var variant = COVER_VARIANTS[project.cover];

    var cover = document.createElement('div');
    cover.className = 'portfolio-card__cover ' + variant.coverClass;
    cover.setAttribute('aria-hidden', 'true');

    var mark = createElement('portfolio-card__mark', variant.mark);
    if (variant.markClass) {
      mark.className += ' ' + variant.markClass;
    }
    cover.appendChild(mark);

    variant.figures.forEach(function (figureClasses) {
      cover.appendChild(createElement('portfolio-card__figure ' + figureClasses, ''));
    });

    return cover;
  }

  function createBody(project) {
    var body = document.createElement('div');
    body.className = 'portfolio-card__body';

    body.appendChild(createElement('portfolio-card__tag', project.category));

    var title = document.createElement('h3');
    title.className = 'portfolio-card__title';
    title.textContent = project.title;
    body.appendChild(title);

    body.appendChild(createElement('portfolio-card__note', project.status));

    return body;
  }

  function renderProjects(projects) {
    if (!GRID) {
      return;
    }

    var fragment = document.createDocumentFragment();

    projects.forEach(function (project) {
      var item = document.createElement('li');
      item.className = 'portfolio-grid__item';

      var card = document.createElement('article');
      card.className = 'portfolio-card';

      card.appendChild(createCover(project));
      card.appendChild(createBody(project));

      item.appendChild(card);
      fragment.appendChild(item);
    });

    GRID.appendChild(fragment);
  }

  function handleError(error) {
    var message = 'Les projets ne peuvent pas être affichés pour le moment.';

    console.error('portfolio: ' + error.message);

    if (GRID) {
      renderError(GRID, message);
    }
  }

  function init() {
    if (!GRID) {
      return;
    }

    loadProjects()
      .then(validateProjects)
      .then(renderProjects)
      .catch(handleError);
  }

  init();
})();