# AGENTS.md — Amplio Web

Instructions spécifiques au projet Amplio Web. `ROADMAP.md` est la référence principale : architecture, tâches, conventions et processus de livraison.

La gouvernance générale des agents de code est fournie par le système externe **Vibe Coding Instructions** :
https://github.com/sudomarc/vibe-coding-instructions

Ce fichier ne contient que les règles propres à Amplio Web ; il ne recopie pas la gouvernance générale.

## Stack

- HTML5, CSS3, JavaScript vanilla (ES6+).
- Aucun framework frontend, aucun préprocesseur CSS, aucun outil de build.
- Hébergement statique. Aucune dépendance npm à ajouter sans justification.

## Chemins relatifs

- Toutes les pages sont à la racine : les chemins `assets/...`, `partials/...` sont identiques partout.
- **Chemins relatifs uniquement** (jamais `/assets/...`) : le site doit fonctionner dans un sous-dossier (GitHub Pages « project site »).

## Convention de branches

- `main` est toujours stable. Aucun commit direct sur `main`.
- Une branche par tâche du ROADMAP : `feature/nom-tache` (fonctionnalité), `fix/nom-bug`, `docs/nom-sujet`, `chore/nom-sujet`.
- Chaque branche donne lieu à une Pull Request vers `main` avant merge.

## Convention de commits

- Format : `type(portée): description courte`
- En français, description à l'infinitif, sans point final, 72 caractères maximum.
- Un commit = un changement logique cohérent.
- Référencer la tâche (ex. `Tâche : T03`) dans le corps ou la PR.

## CSS

- Toutes les feuilles CSS réutilisent les variables définies dans `assets/css/base.css` (pas de valeurs codées en dur répétées).
- Une feuille par responsabilité : `base.css`, `header.css`, `footer.css`, `home.css`, `services.css`, `portfolio.css`, `contact.css`, `about.css`.

## Vérifications

- Serveur local : `python3 -m http.server 8000` depuis la racine, puis http://localhost:8000/
- Avant de terminer une tâche : `git status --short` puis `git diff` et inspecter réellement le diff final.
- Ne jamais affirmer un test, un rendu ou une vérification qui n'a pas été réellement effectué.

## Données sensibles

- Aucun secret ni donnée personnelle dans le repo. `.gitignore` ignore déjà `.env` et `.env.*`.
- Ne pas créer de `.env` ou `.env.example` sans besoin réel.