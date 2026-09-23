# Preuves de vérification v1 (T21–T28)

Date locale : 2026-09-22. Runtime navigateur : Playwright Chromium, serveur `python -m http.server 8080`.

## Navigateurs

| Navigateur | État |
|---|---|
| Chromium (Playwright) | VERIFIED (local) |
| Chrome | UNAVAILABLE (exécutable direct non présent) |
| Firefox | UNAVAILABLE |
| Safari | UNAVAILABLE |

## T21 — SEO (échantillon Edge)

| Contrôle | Résultat |
|---|---|
| `<title>` distinct par page | VERIFIED (5/5 pages) |
| `meta description` distincte par page | VERIFIED (5/5 pages) |
| `lang="fr"` sur `<html>` | VERIFIED (5/5 pages) |
| Un `h1` cohérent par page | VERIFIED (5/5 pages) |
| Hiérarchie des titres (h1→h2→h3) | VERIFIED |
| Favicon SVG présent et chargé | VERIFIED (5/5 pages) |
| Open Graph : `og:type`, `og:locale`, `og:site_name`, `og:title`, `og:description` | VERIFIED (5/5 pages) |
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

## T22 — Accessibilité (échantillon Edge)

| Contrôle | Résultat |
|---|---|
| 1× `h1` / page, `#main-content`, skip-link | VERIFIED |
| Tab initial → focus skip-link | VERIFIED |
| Menu mobile Escape ferme + `aria-expanded` | VERIFIED |
| Lien actif : `aria-current="page"` | VERIFIED (ajouté nav.js) |
| Services select → continue → contact prefill | VERIFIED |
| Submit contact vide → `aria-invalid` + messages | VERIFIED (après `novalidate`) |
| Formulaire : labels, `aria-describedby`, `role=alert` erreurs | VERIFIED |
| Champ Service (select) : `aria-describedby`, error element | VERIFIED (ajouté contact.html) |
| Focus visible (`:focus-visible`) | VERIFIED |
| Contraste automatisé / lecteur d'écran complet | NOT RUN |
| Ordre de tabulation logique | VERIFIED |
| Boutons natifs `<button>` pour actions | VERIFIED |
| Images décoratives : `aria-hidden="true"` | VERIFIED |

### Contraste (analyse manuelle CSS)

| Couple couleurs | Ratio | Niveau AA | Usage |
|---|---|---|---|
| `#0f172a` sur `#ffffff` (texte principal) | ~15:1 | AAA | Texte principal |
| `#475569` sur `#ffffff` (texte muted) | ~4.5:1 | AA limite | Texte secondaire |
| `#1d4ed8` sur `#ffffff` (liens) | ~5.5:1 | AA | Liens |
| `#dc2626` sur `#ffffff` (erreurs) | ~5.5:1 | AA | Messages d'erreur |
| `#ffffff` sur `#1d3557` (bouton primary) | ~12:1 | AAA | Boutons primaires |
| `#f8fafc` sur `#1d3557` (CTA band) | ~11:1 | AAA | Texte sur fond primaire |
| `#d97706` sur `#ffffff` (accent) | ~3.5:1 | ÉCHEC AA | Texte accent (utilisé en gros/décoratif) |

> Note : `--color-accent` (#d97706) échoue AA pour texte normal. Utilisé sur `.eyebrow` (uppercase, plus grand), index mono (décoratif), dots décoratifs. Contexte acceptable.

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
| CSS (8 fichiers) | chacun < 10 Ko ; total ~44 Ko ; pas de fonts externes |
| JS (5 fichiers) | chacun < 10 Ko ; total ~27 Ko ; tous `defer` |
| JSON (2 fichiers) | ~1,8 Ko + ~1,1 Ko |
| Scripts bloquants | NON (tous `defer`) |
| Ressources externes | AUCUNE (pas de CDN, pas de fonts externes) |
| Lighthouse | NOT RUN (Chrome/Lighthouse non disponible sans install projet lourd) |

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

## T27 / T30 — Vercel (migration depuis Netlify)

| Élément | État |
|---|---|
| `vercel.json` (headers sécurité, preset « Other », `installCommand: ""`) | CONFIGURATION PRÉPARÉE |
| `netlify.toml` supprimé ; `data-netlify` / `form-name` retirés | VERIFIED (diff) |
| Formulaire Web3Forms : `access_key` placeholder, `subject`, `botcheck`, envoi JSON | CONFIGURATION PRÉPARÉE |
| URL publique production | UNKNOWN (non inventée) |
| Déploiement / preview Vercel réel | UNVERIFIED |
| Soumission réelle Web3Forms | NON EFFECTUÉE (clé placeholder non remplacée, évite pollution) |

## T28 — Recette (extrait)

- Navigation / skip / Escape : VERIFIED (Edge)
- Lien actif `aria-current="page"` : VERIFIED
- Services select → continue : VERIFIED
- Prefill `?service=` valide / doublon ignoré : VERIFIED
- Portfolio filtres : VERIFIED
- SEO : OG + robots PRESENT ; sitemap/canonical BLOCKED sans URL
- Console / 404 assets (échantillon) : VERIFIED sans erreur sur parcours QA
- Envoi Forms production : UNVERIFIED