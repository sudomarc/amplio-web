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

## T23 / T24 — Responsive (Edge)

Viewports : 320, 375, 390, 640, 641, 768, 1024, 1280, 1440, 1920.

Overflow horizontal : aucun sur les 5 pages (VERIFIED Edge).

Breakpoints CSS existants (`40rem`, `64rem`) : non modifiés (pas de défaut observé).

## T25 — Performance

| Élément | Observation |
|---|---|
| Médias runtime | favicon SVG ~0,3 Ko ; pas d'images projet |
| CSS+JS+JSON | chacun < 10 Ko ; pas de fonts externes |
| Scripts | `defer` |
| Lighthouse | NOT RUN (Chrome/Lighthouse non disponible sans install projet) |

Aucune optimisation d'images inventée.

## T26 — Cross-browser

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
