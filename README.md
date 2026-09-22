# amplio-web

Site vitrine de l'agence Amplio (HTML5 / CSS3 / JavaScript vanilla, sans build).

## Prérequis de gouvernance

Ce dépôt impose le bootstrap [Vibe Coding Instructions](https://github.com/sudomarc/vibe-coding-instructions) via `AGENTS.md` : clone local à jour sur `main`, lecture de `AGENTS.md` + `MASTER-PROMPT.md` avant toute action applicative.

## Structure

- Pages à la racine : `index.html`, `services.html`, `portfolio.html`, `contact.html`, `a-propos.html`
- `partials/` — header / footer injectés par `assets/js/includes.js`
- `assets/css|js|img/` — styles, scripts, favicon
- `data/` — `services.json`, `projects.json`
- `docs/` — décisions et preuves de vérification
- `ROADMAP.md` — source de vérité des tâches

## Aperçu local

Servir en HTTP (pas `file://`) :

```bash
python -m http.server 8765
```

Puis ouvrir `http://127.0.0.1:8765/`.

## Déploiement

Cible : **Netlify** + **Netlify Forms** (voir `docs/hosting-form-decision.md` et `netlify.toml`).

Le formulaire `contact` utilise `data-netlify="true"`, `method="post"` et un champ `form-name`. L'envoi AJAX poste en `application/x-www-form-urlencoded` vers `/`.

Une page avec `data-netlify="true"` n'implique pas à elle seule que Forms soit **ACTIVE** en production : vérifier le dashboard Netlify après liaison du dépôt.

## Maintenance

- Une branche par tâche, PR vers `main`, pas de push direct sur `main`.
- Conventional Commits en français (voir `ROADMAP.md`).
- Mettre à jour le statut des tâches dans `ROADMAP.md` après chaque livraison vérifiée.
