# Preuves de vérification v1 (T22–T28)

Date locale : 2026-09-22. Runtime navigateur : Microsoft Edge (Playwright `channel: msedge`), serveur `python -m http.server 8765`.

## Navigateurs

| Navigateur | État |
|---|---|
| Edge | VERIFIED (local) |
| Chrome | UNAVAILABLE (exécutable absent) |
| Firefox | UNAVAILABLE (exécutable absent) |
| Safari | UNAVAILABLE (Windows) |

## T22 — Accessibilité (échantillon Edge)

| Contrôle | Résultat |
|---|---|
| 1× `h1` / page, `#main-content`, skip-link | VERIFIED |
| Tab initial → focus skip-link | VERIFIED |
| Menu mobile Escape ferme + `aria-expanded` | VERIFIED |
| Services select → continue → contact prefill | VERIFIED |
| Submit contact vide → `aria-invalid` + messages | VERIFIED (après `novalidate`) |
| Contraste automatisé / lecteur d'écran complet | NOT RUN |

## T23 — Responsive mobile (≤ 640 px)

Viewports testés : 320, 375, 390, 480, 640.

Pages testées : index.html, services.html, portfolio.html, contact.html, a-propos.html.

| Page | 320 | 375 | 390 | 480 | 640 |
|---|---|---|---|---|---|
| Accueil | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Services | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Portfolio | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Contact | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| À propos | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |

Overflow horizontal : aucun sur les 5 pages (VERIFIED Edge).

Breakpoints CSS : `40rem` (640px) — menu burger actif, grilles 1 colonne, stacking vertical.

Composants vérifiés : navigation burger (ouverture/fermeture/Escape/focus), sélecteur services (radio + bouton Continuer), portfolio (grille 1 colonne, filtres empilés), formulaire (champs 100%, select lisible), footer (stack vertical).

## T24 — Responsive tablette (641–1024 px) et grands écrans (≥ 1440 px)

Viewports testés : 641, 768, 820, 1024, 1280, 1366, 1440, 1600, 1920.

Pages testées : index.html, services.html, portfolio.html, contact.html, a-propos.html.

| Page | 641 | 768 | 820 | 1024 | 1280 | 1440 | 1920 |
|---|---|---|---|---|---|---|---|
| Accueil | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Services | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Portfolio | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| Contact | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |
| À propos | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED | VERIFIED |

Overflow horizontal : aucun sur les 5 pages (VERIFIED Edge).

Breakpoints CSS : `40rem` (640px) → grilles 2 colonnes ; `64rem` (1024px) → grilles 3-4 colonnes, hero side-by-side, contact layout 2 colonnes.

Proportions vérifiées : pas de contenu trop étiré, lignes de texte ≤ 52ch, conteneur max-width 72rem respecté, espaces équilibrés.

## T25 — Performance

| Élément | Observation |
|---|---|
| Médias runtime | favicon SVG ~0,3 Ko ; pas d'images projet |
| CSS+JS+JSON | chacun < 10 Ko ; pas de fonts externes |
| Scripts | `defer` sur tous les scripts |
| Lighthouse | NOT RUN (Chrome/Lighthouse non disponible sans install projet) |

Aucune optimisation d'images inventée (pas d'images projet).

Ressources non utilisées : aucune détectée.

## T26 — Cross-browser

| Navigateur | État | Preuve |
|---|---|---|
| Edge | VERIFIED | Tests manuels aux viewports T23/T24 |
| Chrome | UNAVAILABLE | Exécutable absent |
| Firefox | UNAVAILABLE | Exécutable absent |
| Safari | UNAVAILABLE | Windows |

Seule Edge a été exécutée. Chrome / Firefox / Safari = UNAVAILABLE.

## T27 — Netlify

| Élément | État |
|---|---|
| `netlify.toml` (publish `.`) | CONFIGURATION PRÉPARÉE |
| URL publique production | UNKNOWN (non inventée) |
| Forms ACTIVE en prod | UNVERIFIED |
| Soumission réelle | NON EFFECTUÉE (évite données / pollution Forms) |

## T28 — Recette (extrait)

- Navigation / skip / Escape : VERIFIED (Edge)
- Services select → continue : VERIFIED
- Prefill `?service=` valide / doublon ignoré : VERIFIED
- Portfolio filtres : VERIFIED
- SEO : OG + robots PRESENT ; sitemap/canonical BLOCKED sans URL
- Console / 404 assets (échantillon) : VERIFIED sans erreur sur parcours QA
- Envoi Forms production : UNVERIFIED