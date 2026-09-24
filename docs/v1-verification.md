# Preuves de vérification v1 (T21–T28 & Audit Complet)

Date locale : 2026-09-24. Runtime navigateur : Playwright Chromium 1.63.0, serveur local `python3 -m http.server 8765`.

## Audit complet & Maintenance globale (chore/full-maintenance-audit)

- **Audit Playwright** : 7 routes (`/`, `/services.html`, `/portfolio.html`, `/contact.html`, `/a-propos.html`, `/legal.html`, `/privacy.html`) testées sur 16 viewports (320px à 1920px).
- **Débordement horizontal (overflow)** : 0 problème détecté.
- **Erreurs console** : 0 erreur runtime ou réseau sur l'ensemble des pages.
- **Navigation mobile & Accessibilité** : piégeage du focus clavier (Tab/Shift+Tab) dans le menu mobile ouvert, fermeture automatique sur clic de lien ou touche Échap, focus restauré sur le bouton burger (`assets/js/nav.js`).
- **Sélecteur de services** : indicateur de focus progressif (`is-focused`) en cas de navigation au clavier sur les cartes de service (`assets/js/services.js` + `assets/css/services.css`). Redirection `contact.html?service=...` et pré-remplissage validés.
- **SEO & Réseaux sociaux** : balises Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`) harmonisées sur l'ensemble des 7 pages HTML avec les balises Open Graph déjà existantes.

## Navigateurs

| Navigateur | État |
|---|---|
| Playwright Chromium | VERIFIED (16 viewports, 7 pages) |
| Chrome | UNAVAILABLE (exécutable direct non présent) |
| Firefox | UNAVAILABLE |
| Safari | UNAVAILABLE |

## T21 — SEO (échantillon Chromium)

| Contrôle | Résultat |
|---|---|
| `<title>` distinct par page | VERIFIED (7/7 pages) |
| `meta description` distincte par page | VERIFIED (7/7 pages) |
| `lang="fr"` sur `<html>` | VERIFIED (7/7 pages) |
| Un `h1` cohérent par page | VERIFIED (7/7 pages) |
| Hiérarchie des titres (h1→h2→h3) | VERIFIED |
| Favicon SVG présent et chargé | VERIFIED (7/7 pages) |
| Open Graph : `og:type`, `og:locale`, `og:site_name`, `og:title`, `og:description` | VERIFIED (7/7 pages) |
| `robots.txt` : `User-agent: *` / `Allow: /` | VERIFIED |
| Liens internes fonctionnels | VERIFIED |
| Chemins relatifs corrects | VERIFIED |

### Éléments bloqués sans URL de production

| Élément | État | Raison |
|---|---|---|
| `<link rel="canonical">` | BLOCKED | Pas d'URL publique vérifiée |
| `og:url` | BLOCKED | Pas d'URL publique vérifiée |
| `og:image` | BLOCKED | Pas d'image de partage + pas d'URL |
| `sitemap.xml` | BLOCKED | Pas d'URL publique pour générer les entrées |

## T22 — Accessibilité (échantillon Chromium)

| Contrôle | Résultat |
|---|---|
| 1× `h1` / page, `#main-content`, skip-link | VERIFIED |
| Tab initial → focus skip-link | VERIFIED |
| Menu mobile Escape ferme + `aria-expanded` | VERIFIED |
| Lien actif : `aria-current="page"` | VERIFIED (nav.js) |
| Services select → continue → contact prefill | VERIFIED |
| Submit contact vide → `aria-invalid` + messages | VERIFIED (contact.js) |
| Formulaire : labels, `aria-describedby`, `role=alert` erreurs | VERIFIED |
| Champ Service (select) : `aria-describedby`, error element | VERIFIED |
| Focus visible (`:focus-visible`) | VERIFIED |
| Contraste automatisé / lecteur d'écran complet | NOT RUN |
| Ordre de tabulation logique | VERIFIED |
| Boutons natifs `<button>` pour actions | VERIFIED |
| Images décoratives : `aria-hidden="true"` | VERIFIED |

## T23 — Responsive mobile (≤ 640 px)

Viewports testés : 320px, 360px, 375px, 390px, 414px, 480px, 640px.

Pages testées : index.html, services.html, portfolio.html, contact.html, a-propos.html, legal.html, privacy.html.

| Page | 320 | 360 | 375 | 390 | 414 | 480 | 640 |
|---|---|---|---|---|---|---|---|
| Accueil | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Services | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Portfolio | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Contact | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| À propos | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Mentions légales | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Confidentialité | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |

Overflow horizontal : aucun sur les 7 pages (VERIFIED Playwright Chromium).

Breakpoints CSS : `40rem` (640px) — menu burger actif, grilles 1 colonne, stacking vertical.

## T24 — Responsive tablette (641–1024 px) et grands écrans (≥ 1440 px)

Viewports testés : 641px, 768px, 820px, 1024px, 1280px, 1366px, 1440px, 1600px, 1920px.

Pages testées : index.html, services.html, portfolio.html, contact.html, a-propos.html, legal.html, privacy.html.

| Page | 641 | 768 | 820 | 1024 | 1280 | 1366 | 1440 | 1600 | 1920 |
|---|---|---|---|---|---|---|---|---|---|
| Accueil | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Services | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Portfolio | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Contact | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| À propos | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Mentions légales | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Confidentialité | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |

Overflow horizontal : aucun sur les 7 pages (VERIFIED Playwright Chromium).

## T25 — Performance

| Élément | Observation |
|---|---|
| Assets statiques | favicon SVG ~0,3 Ko ; images CDN optimisées (Flickr b.jpg) |
| CSS | 8 fichiers légers, total ~44 Ko |
| JS | 8 fichiers vanilla ES6+, total ~27 Ko, tous `defer` |
| JSON | 2 fichiers (`services.json` ~1,8 Ko + `projects.json` ~1,1 Ko) |
| Scripts bloquants | NON (tous `defer`) |

## T27 / T30 — Vercel & Web3Forms

| Élément | État |
|---|---|
| `vercel.json` (headers sécurité, preset « Other », `installCommand: ""`) | CONFIGURATION PRÉPARÉE |
| Formulaire Web3Forms : `access_key` placeholder, `subject`, `botcheck`, envoi JSON | CONFIGURATION PRÉPARÉE |
| URL publique production | UNKNOWN (non inventée) |
| Déploiement / preview Vercel réel | UNVERIFIED |
| Soumission réelle Web3Forms | NON EFFECTUÉE (clé placeholder non remplacée) |
