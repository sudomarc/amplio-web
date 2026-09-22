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
      && (typeof project.image !== 'string' || project.image.length > 0)
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

  function createCover(project, index) {
    var variant = COVER_VARIANTS[project.cover];

    var cover = document.createElement('div');
    cover.className = 'portfolio-card__cover ' + variant.coverClass;

    if (project.image) {
      var img = document.createElement('img');
      img.className = 'portfolio-card__image';
      img.src = project.image;
      img.alt = project.imageAlt || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      if (project.imageWidth) img.width = project.imageWidth;
      if (project.imageHeight) img.height = project.imageHeight;
      cover.appendChild(img);
      cover.appendChild(createElement('portfolio-card__scrim', ''));
    }

    var number = createElement('portfolio-card__number', String(index + 1).padStart(2, '0'));
    number.setAttribute('aria-hidden', 'true');
    cover.appendChild(number);

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

    projects.forEach(function (project, index) {
      var item = document.createElement('li');
      item.className = 'portfolio-grid__item reveal';
      item.style.setProperty('--reveal-delay', String(index));

      var card = document.createElement('article');
      card.className = 'portfolio-card';

      card.appendChild(createCover(project, index));
      card.appendChild(createBody(project));

      item.setAttribute('data-category', project.category);

      item.appendChild(card);
      fragment.appendChild(item);
    });

    GRID.appendChild(fragment);
    document.dispatchEvent(new CustomEvent('content:rendered'));

    return projects;
  }

  var FILTERS = null;
  var STATUS = null;
  var ACTIVE_CATEGORY = 'Tous';

  function buildCategories(projects) {
    var seen = [];
    var set = {};
    projects.forEach(function (project) {
      if (!set[project.category]) {
        set[project.category] = true;
        seen.push(project.category);
      }
    });
    return seen;
  }

  function createFilterButton(label, isActive) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'portfolio-filter';
    btn.setAttribute('data-category', label);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    btn.textContent = label;
    return btn;
  }

  function renderFilters(categories) {
    if (!FILTERS) {
      return;
    }

    var frag = document.createDocumentFragment();
    frag.appendChild(createFilterButton('Tous', true));
    categories.forEach(function (category) {
      frag.appendChild(createFilterButton(category, false));
    });
    FILTERS.appendChild(frag);
  }

  function applyFilter(category) {
    var items = document.querySelectorAll('.portfolio-grid__item');
    var visible = 0;

    items.forEach(function (item) {
      var show = (category === 'Tous') || (item.getAttribute('data-category') === category);
      item.style.display = show ? 'flex' : 'none';
      if (show) visible += 1;
    });

    var buttons = FILTERS ? FILTERS.querySelectorAll('button') : [];
    Array.prototype.forEach.call(buttons, function (btn) {
      var active = btn.getAttribute('data-category') === category;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      if (active) {
        ACTIVE_CATEGORY = category;
      }
    });

    if (STATUS) {
      if (category === 'Tous') {
        STATUS.textContent = 'Tous les projets sont affichés.';
      } else if (visible === 0) {
        STATUS.textContent = 'Aucun projet dans cette catégorie.';
      } else {
        STATUS.textContent = visible + ' projet(s) affiché(s).';
      }
    }
  }

  function handleError(error) {
    var message = 'Les projets ne peuvent pas être affichés pour le moment.';

    console.error('portfolio: ' + error.message);

    if (GRID) {
      renderError(GRID, message);
    }
  }

  function wireFilters() {
    if (!FILTERS) {
      return;
    }

    FILTERS.addEventListener('click', function (event) {
      var btn = event.target.closest('button[data-category]');
      if (!btn) {
        return;
      }
      applyFilter(btn.getAttribute('data-category'));
    });
  }

  function init() {
    if (!GRID) {
      return;
    }

    FILTERS = document.querySelector('.portfolio-filters');
    STATUS = document.querySelector('#portfolio-grid-status');

    loadProjects()
      .then(validateProjects)
      .then(renderProjects)
      .then(function (projects) {
        var categories = buildCategories(projects);
        renderFilters(categories);
        wireFilters();
        applyFilter('Tous');
      })
      .catch(handleError);
  }

  init();
})();