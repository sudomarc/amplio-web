# ROADMAP — Amplio Web

Feuille de route du site vitrine de l'agence Amplio. Ce document est la référence pour le découpage du travail, les conventions du repo et le processus de livraison. Il est mis à jour à chaque fin de tâche (colonne « Statut » de la section 4).

---

## 1. Vue d'ensemble du projet

### Objectif

Site vitrine de l'agence de publicité avec une double fonction :

1. **Portfolio** : présenter les réalisations de l'agence sous forme d'études de cas.
2. **Sélecteur de services** : permettre au visiteur de choisir le type de service publicitaire souhaité, puis l'orienter vers un formulaire de contact dont le champ « service » est déjà rempli.

### Scope (v1.0)

- Pages : Accueil, Services, Portfolio, Contact, À propos (optionnelle).
- Composants communs : header (navigation, burger mobile, état actif, logo cliquable vers l'accueil) et footer.
- Sélecteur de services cliquable sur la page Services.
- Formulaire de contact avec pré-remplissage selon le service choisi.
- Affichage responsive (mobile, tablette, desktop).
- Mise en ligne sur une plateforme d'hébergement statique.

### Hors-scope (v1.0)

- Back-office ou CMS : le contenu est géré directement dans le repo.
- Espace client, comptes utilisateurs, authentification.
- Blog et système d'articles.
- Multilingue.
- Backend applicatif propre (l'envoi du formulaire passe par un service tiers, voir section 8).
- Framework JS, outil de build, préprocesseur CSS.

### Stack

HTML5, CSS3, JavaScript vanilla (ES6+). Aucune dépendance de build. Un simple serveur statique local suffit pour le développement.

### Organisation

- 1 développeur, 1 reviewer.
- Pas de développement en parallèle : une seule branche de travail ouverte à la fois.
- Pas de deadline fixe, mais des jalons informels (section 5).

---

## 2. Structure des dossiers du repo

```
amplio-web/
├── index.html                 # Accueil
├── services.html              # Services + sélecteur
├── portfolio.html             # Études de cas
├── contact.html               # Formulaire de contact
├── a-propos.html              # À propos (optionnel)
├── partials/
│   ├── header.html            # Header + navigation
│   └── footer.html            # Footer
├── assets/
│   ├── css/
│   │   ├── base.css           # Variables, reset, typographie, utilitaires
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── home.css
│   │   ├── services.css
│   │   ├── portfolio.css
│   │   ├── contact.css
│   │   └── about.css
│   ├── js/
│   │   ├── includes.js        # Injection des partials header/footer
│   │   ├── nav.js             # Burger mobile, état actif
│   │   ├── services.js        # Sélecteur de services
│   │   ├── portfolio.js       # Rendu et filtres du portfolio
│   │   └── contact.js         # Pré-remplissage, validation, envoi
│   ├── img/                   # Images optimisées (logo, visuels, projets)
│   └── fonts/                 # Polices auto-hébergées (si utilisées)
├── data/
│   ├── services.json          # Liste des services (source unique)
│   └── projects.json          # Liste des réalisations
├── .github/
│   └── pull_request_template.md
├── .gitignore
├── README.md
└── ROADMAP.md
```

### Choix techniques associés

- **Toutes les pages sont à la racine** pour que les chemins relatifs (`assets/...`, `partials/...`) restent identiques partout.
- **Chemins relatifs uniquement** (jamais de `/assets/...`) : le site doit fonctionner aussi bien à la racine d'un domaine que dans un sous-dossier (cas de GitHub Pages en mode « project site »).
- **Header et footer** sont maintenus en un seul exemplaire dans `partials/` et injectés au chargement par `includes.js` (`fetch`). Conséquence : le site doit être servi via HTTP en local (ex. `python3 -m http.server`) et non ouvert en `file://`.
- **`data/services.json`** est la source unique des services : elle alimente la page Services, l'aperçu de l'accueil et la liste déroulante du formulaire de contact.
- **Pré-remplissage du formulaire** via paramètre d'URL : `contact.html?service=<id-du-service>`.

---

## 3. Convention de branches

Une branche par tâche, y compris en solo, afin que chaque changement passe par une Pull Request et puisse être relu.

| Élément | Règle |
|---|---|
| Branche principale | `main`. Toujours stable et déployable. Aucun commit direct après l'initialisation. |
| Nouvelle fonctionnalité | `feature/nom-tache` |
| Correction de bug | `fix/nom-bug` |
| Documentation | `docs/nom-sujet` |
| Maintenance / config | `chore/nom-sujet` |
| Nommage | minuscules, mots séparés par des tirets, court et explicite |
| Durée de vie | courte : une branche = une tâche du tableau (section 4) |

**Exemples :** `feature/header-navigation`, `feature/selecteur-services`, `fix/burger-menu-focus`, `docs/roadmap`.

**Cycle de vie d'une branche :**

1. Se mettre à jour : `git checkout main && git pull`.
2. Créer la branche : `git checkout -b feature/nom-tache`.
3. Développer et commiter (section 6).
4. Pousser et ouvrir la Pull Request (section 7).
5. Après validation, merge dans `main`, puis suppression de la branche (distante et locale).

**Protection de `main` (à configurer dans T01) :** Pull Request obligatoire, au moins 1 approbation, pas de push direct, pas de force-push.

> **État actuel (20 septembre 2026) :** T01 reste `En review` jusqu'à la configuration effective de la protection de `main`, suivie dans l'issue #10. T08 et T09 sont livrés ; T10 est `Terminé` depuis le merge de la PR #21, suivi dans l'issue #19. T11 est `En review` via la PR #24, suivie dans l'issue #22 ; T12 est la prochaine tâche de développement. Le modèle `.github/pull_request_template.md` est maintenu comme configuration du dépôt. Le bootstrap OpenCode `AGENTS.md` est versionné ; il impose le chargement préalable des Vibe Coding Instructions canoniques avant toute modification.

---

## 4. Tableau des tâches

**Statuts :** `À faire` · `En cours` · `En review` · `Terminé`

### Phase 1 — Socle

| # | Tâche | Statut | Dépendances |
|---|---|---|---|
| T01 | Configuration du repo : protection de `main`, modèle de PR, `.gitignore` | En review | — |
| T02 | Structure des dossiers et squelettes HTML des pages | Terminé | T01 |
| T03 | Feuille de styles globale : variables (couleurs, espacements, typo), reset, utilitaires | Terminé | T02 |
| T04 | Header : markup et styles (logo cliquable vers l'accueil, menu desktop) | Terminé | T03 |
| T05 | Header : burger mobile et état actif du lien de la page courante | Terminé | T04 |
| T06 | Footer : markup et styles | Terminé | T03 |
| T07 | Injection des partials header/footer sur toutes les pages | Terminé | T05, T06 |

### Phase 2 — Pages (contenu et mise en page statiques)

| # | Tâche | Statut | Dépendances |
|---|---|---|---|
| T08 | Page Accueil : hero, aperçu des services, réalisations mises en avant, appel à l'action | Terminé | T07 |
| T09 | Page Services : mise en page et structure des cartes de services | Terminé | T07 |
| T10 | Page Portfolio : mise en page de la grille d'études de cas | Terminé | T07 |
| T11 | Page Contact : structure du formulaire (champs, libellés, bloc coordonnées) | En review | T07 |
| T12 | Page À propos (optionnelle) : présentation de l'agence et de l'équipe | À faire | T07 |

### Phase 3 — Intégration

| # | Tâche | Statut | Dépendances |
|---|---|---|---|
| T13 | `data/services.json` et rendu dynamique des services (Services, Accueil) | À faire | T09 |
| T14 | Sélecteur de services : sélection au clic, état visuel, bouton « Continuer » | À faire | T13 |
| T15 | Redirection vers `contact.html?service=…` et pré-remplissage du formulaire (avec repli si paramètre absent ou invalide) | À faire | T11, T14 |
| T16 | `data/projects.json` et rendu des études de cas | À faire | T10 |
| T17 | Filtres du portfolio par catégorie | À faire | T16 |
| T18 | Validation côté client du formulaire (champs requis, format e-mail, messages d'erreur) | À faire | T11 |
| T19 | Choix de la plateforme d'hébergement et du service d'envoi du formulaire (voir section 8) | À faire | T11 |
| T20 | Envoi du formulaire et message de confirmation / d'erreur | À faire | T18, T19 |
| T21 | SEO de base : `title`, `meta description`, Open Graph, favicon, `robots.txt`, `sitemap.xml` | À faire | T08, T09, T10, T11 |
| T22 | Accessibilité : contrastes, focus visible, attributs ARIA, navigation clavier, textes alternatifs | À faire | T14, T15, T17, T20 |

### Phase 4 — Responsive et performance

| # | Tâche | Statut | Dépendances |
|---|---|---|---|
| T23 | Responsive mobile (≤ 640 px) sur l'ensemble des pages et composants | À faire | T08–T11, T14, T17 |
| T24 | Responsive tablette (641–1024 px) et grands écrans (≥ 1440 px) | À faire | T23 |
| T25 | Optimisation des images (formats, dimensions, lazy-loading) et audit Lighthouse | À faire | T23 |
| T26 | Tests navigateurs (Chrome, Firefox, Safari, Edge) et appareils | À faire | T24, T25 |

### Phase 5 — Déploiement

| # | Tâche | Statut | Dépendances |
|---|---|---|---|
| T27 | Configuration du déploiement : source, HTTPS, domaine personnalisé éventuel | À faire | T19, T26 |
| T28 | Recette finale (checklist de la section 8) | À faire | T21, T22, T27 |
| T29 | Mise en ligne v1.0 et tag `v1.0.0` | À faire | T28 |

> T12 (À propos) est optionnelle. Si elle est écartée, retirer le lien correspondant du header et du footer et l'ignorer dans les dépendances.

---

## 5. Ordre de développement

Les tâches sont traitées dans l'ordre des phases. Au sein d'une phase, suivre l'ordre des numéros en respectant les dépendances. Une tâche n'est démarrée que lorsque la précédente est mergée.

| Phase | Contenu | Tâches | Jalon informel |
|---|---|---|---|
| 1. Socle | Repo, styles globaux, header, footer | T01–T07 | **M1** : squelette navigable, header/footer identiques sur toutes les pages |
| 2. Pages | Mise en page statique des pages | T08–T12 | **M2** : toutes les pages existent avec leur contenu |
| 3. Intégration | Données, sélecteur, pré-remplissage, formulaire, SEO, accessibilité | T13–T22 | **M3** : parcours complet fonctionnel (service choisi → formulaire pré-rempli → envoi) |
| 4. Responsive | Mobile, tablette, performance, tests | T23–T26 | **M4** : site utilisable et rapide sur tous les formats |
| 5. Déploiement | Configuration, recette, mise en ligne | T27–T29 | **M5** : v1.0 en ligne |

**Règle de priorité :** le socle (header et footer) est terminé et mergé avant toute page, pour éviter de dupliquer ou de reprendre la navigation.

---

## 6. Convention de commits

Format inspiré de Conventional Commits, rédigé en français :

```
type(portée): description courte
```

- Description à l'infinitif, sans point final, 72 caractères maximum.
- Un commit = un changement logique cohérent.
- Corps du message optionnel (après une ligne vide) pour expliquer le *pourquoi* si nécessaire.
- Référencer la tâche dans le corps ou la PR (ex. `Tâche : T05`).

**Types :**

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité ou nouvelle page |
| `fix` | Correction de bug |
| `style` | Changement purement visuel ou de mise en forme (CSS, indentation) |
| `refactor` | Réorganisation du code sans changement de comportement |
| `perf` | Amélioration de performance |
| `docs` | Documentation (README, ROADMAP, commentaires) |
| `chore` | Configuration, structure, maintenance |

**Portées usuelles :** `header`, `footer`, `nav`, `home`, `services`, `portfolio`, `contact`, `about`, `css`, `js`, `seo`, `a11y`, `deploy`.

**Exemples :**

```
feat(header): ajouter le menu de navigation desktop
feat(nav): gérer l'ouverture du menu burger sur mobile
feat(services): ajouter la sélection cliquable des services
fix(contact): corriger le pré-remplissage avec un service inconnu
style(portfolio): ajuster l'espacement de la grille de projets
docs(roadmap): mettre à jour le statut de T07
chore: ajouter le modèle de Pull Request
```

---

## 7. Process de Pull Request et de review

### Côté développeur

1. Travailler sur la branche de la tâche (section 3) et vérifier localement avant d'ouvrir la PR :
   - aucune erreur dans la console du navigateur ;
   - HTML valide (validateur W3C) ;
   - rendu contrôlé à trois largeurs (mobile, tablette, desktop) ;
   - liens et chemins relatifs fonctionnels.
2. Pousser la branche et ouvrir une Pull Request vers `main`.
3. Renseigner le modèle de PR : titre au format de commit, numéro de tâche, description des changements, captures d'écran si le rendu change, points d'attention pour le reviewer.
4. Assigner le reviewer.
5. Traiter les commentaires par de nouveaux commits sur la même branche, puis répondre à chaque remarque.
6. Une fois la PR approuvée, la merger (squash and merge) puis supprimer la branche.
7. Passer le statut de la tâche à `Terminé` dans le tableau de la section 4 (commit `docs(roadmap)` dédié ou inclus dans la PR suivante).

### Côté reviewer

Aucun merge n'a lieu sans approbation. Points de contrôle :

- La PR correspond bien à une seule tâche du ROADMAP.
- Le code est lisible, sans duplication inutile, sans code mort ni `console.log` oublié.
- Le HTML est sémantique (balises adaptées, hiérarchie de titres, attributs `alt`, libellés de formulaire).
- Le CSS suit les variables de `base.css` (pas de valeurs codées en dur répétées).
- Le rendu est correct sur mobile, tablette et desktop.
- Les liens, chemins relatifs et interactions JS fonctionnent.
- Aucune donnée sensible (clé, jeton, e-mail privé) n'est présente dans le diff.

**Décision :** `Approve` (merge autorisé), `Request changes` (corrections attendues avant nouvelle review) ou simple commentaire pour une question.

### Modèle de PR (`.github/pull_request_template.md`)

```markdown
## Tâche
T__ — intitulé de la tâche

## Description
Ce qui change et pourquoi.

## Captures d'écran
(si le rendu est modifié)

## Vérifications
- [ ] Aucune erreur console
- [ ] HTML valide
- [ ] Testé mobile / tablette / desktop
- [ ] Chemins relatifs vérifiés
- [ ] Statut mis à jour dans ROADMAP.md

## Points d'attention pour le reviewer
```

---

## 8. Déploiement

**Plateforme : à définir** (décision à prendre en T19, car le choix conditionne l'envoi du formulaire). Le site étant 100 % statique, les trois options ci-dessous conviennent.

| Critère | GitHub Pages | Netlify | Vercel |
|---|---|---|---|
| Hébergement statique | Oui | Oui | Oui |
| Déploiement depuis GitHub | Oui (branche ou workflow) | Oui (automatique) | Oui (automatique) |
| Aperçu par Pull Request | Non | Oui (Deploy Previews) | Oui (Preview Deployments) |
| HTTPS et domaine personnalisé | Oui | Oui | Oui |
| Gestion native des formulaires | Non | Oui (Netlify Forms) | Non |
| Envoi du formulaire | Service tiers requis (ex. Formspree) | Netlify Forms ou service tiers | Service tiers requis |
| Point d'attention | Site servi dans un sous-dossier `/amplio-web/` sans domaine perso : chemins relatifs obligatoires | Quota gratuit de soumissions de formulaire limité | Pas de gestion de formulaire intégrée |

**Critères de décision :** simplicité de mise en place, gestion du formulaire de contact, aperçus de PR utiles pour la review, présence d'un domaine personnalisé.

### Configuration cible

- Déploiement automatique à chaque merge sur `main`.
- HTTPS activé, redirection HTTP → HTTPS.
- Domaine personnalisé configuré si disponible.
- Page 404 personnalisée (optionnelle).

### Checklist de recette (T28)

- [ ] Toutes les pages s'affichent sans erreur console.
- [ ] Navigation : liens du header et du footer, logo vers l'accueil, état actif, burger mobile.
- [ ] Sélecteur de services : choix, redirection, pré-remplissage correct pour chaque service.
- [ ] Contact : accès direct sans paramètre, paramètre invalide, validation, envoi réel et réception du message.
- [ ] Portfolio : rendu des études de cas et filtres.
- [ ] Responsive vérifié sur mobile, tablette, desktop.
- [ ] Score Lighthouse acceptable (performance, accessibilité, SEO, bonnes pratiques).
- [ ] Balises SEO, favicon, `sitemap.xml` et `robots.txt` en place.
- [ ] Aucun secret ni donnée personnelle dans le repo.

### Mise en ligne (T29)

1. Merge de la dernière PR sur `main`.
2. Vérification du site en production avec la checklist ci-dessus.
3. Création du tag : `git tag v1.0.0 && git push origin v1.0.0`.
