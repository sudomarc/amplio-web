# T19 — Décision technique : Hébergement et envoi du formulaire

Date : 2026-09-22

---

## HOSTING
**Netlify** (plan gratuit à crédits)

## FORM SUBMISSION
**Netlify Forms** (natif, gratuit et illimité sur plans à crédits)

---

## WHY (Justification factuelle)

### Netlify vs GitHub Pages vs Vercel

| Critère | GitHub Pages | Netlify | Vercel |
|---|---|---|---|
| **Hébergement statique** | Oui | Oui | Oui |
| **Déploiement depuis GitHub** | Oui (branche ou Actions) | Oui (auto) | Oui (auto) |
| **Aperçus PR (Deploy Previews)** | Non natif (workaround possible) | **Oui, natif et auto** | Oui, natif |
| **HTTPS + domaine perso** | Oui | Oui | Oui |
| **Gestion native formulaires** | Non (service tiers requis) | **Oui, Netlify Forms** | Non (service tiers requis) |
| **Usage commercial sur plan gratuit** | Oui | **Oui** | **Non (Hobby = personnel seulement)** |
| **Coût plan gratuit** | 0 $ (repos publics) | 0 $ (300 crédits/mois) | 0 $ (non-commercial) |
| **Limites gratuites** | 1 Go stockage, 100 Go bande passante, 10 builds/h | 300 crédits/mois (déploiements 15c, bande passante 20c/Go, formulaires **gratuits**) | 100 Go transfert, 1M invoctions fonctions, 4h CPU |

Sources vérifiées (2026-09) :
- GitHub Pages : docs.github.com (limites 1GB/100GB/mois, HTTPS, domaine perso)
- Netlify : docs.netlify.com (pricing credit-based, Forms gratuits/illimités depuis avril 2026, Deploy Previews natifs)
- Vercel : vercel.com/pricing (Hobby = non-commercial seulement, 100GB transfert)

### Pourquoi Netlify l'emporte pour Amplio

1. **Formulaires gratuits et illimités** : Netlify Forms est inclus sans surcoût sur les plans à crédits (confirmé avril 2026). Alternative GitHub Pages + Formspree = 50 soumissions/mois gratuit, puis 10$/mois pour 200. Alternative Vercel + Formspree = même coût + plan Vercel Pro requis pour usage commercial (20$/mois/utilisateur).

2. **Deploy Previews natifs** : Chaque PR obtient une URL de prévisualisation automatique. Essentiel pour le workflow de review (ROADMAP §7).

3. **Usage commercial autorisé** : Le site Amplio est un site vitrine d'agence (usage commercial). Vercel Hobby l'interdit explicitement.

4. **Plateforme unique** : Hébergement + formulaires + prévisualisations PR sur un seul fournisseur. Réduit la complexité opérationnelle et les points de défaillance.

5. **Crédits suffisants pour le profil du projet** : Site statique ~5 pages, peu de déploiements quotidiens. 300 crédits = ~10 déploiements prod (150 crédits) + ~7,5 Go bande passante (150 crédits) + formulaires illimités. Marge confortable pour un portfolio d'agence.

---

## TRADE-OFFS (Limitations)

- **Tarification à crédits** : 300 crédits/mois gratuit. Chaque déploiement production = 15 crédits. Bande passante = 20 crédits/Go. Nécessite surveillance si trafic croît.
- **Vendor lock-in partiel** : Netlify Forms ne fonctionne qu'hébergé sur Netlify. Migration vers autre hébergeur = changement de solution formulaire.
- **Builds concurrents** : 1 seul build simultané sur plan gratuit. Suffisant pour projet solo.
- **Pas de fonctions serverless gratuites illimitées** : 125k invocations/mois sur plan legacy, inclus dans crédits sur nouveau modèle. Non requis pour ce projet statique.

---

## SECURITY (Implications)

- **Aucun secret côté client** : L'endpoint Netlify Forms est injecté au build (attribut `data-netlify="true"` ou `netlify` sur `<form>`). Aucune clé API exposée dans le navigateur.
- **Filtrage spam inclus** : Netlify Forms intègre Akismet/honeypot côté serveur.
- **HTTPS forcé** : Automatique sur `*.netlify.app` et domaines personnalisés.
- **Headers de sécurité** : Configurables via `_headers` ou `netlify.toml` (CSP, HSTS, X-Frame-Options, etc.).
- **Pas de stockage côté client** : Les soumissions vont directement vers Netlify, pas de localStorage/indexedDB pour données sensibles.

---

## NEXT STEP
**T20** — Implémentation de l'envoi réel du formulaire avec Netlify Forms :
1. Ajouter attribut `data-netlify="true"` au formulaire dans `contact.html`
2. Configurer notification email dans Netlify (dashboard)
3. Implémenter gestion de réponse (succès/erreur) côté client dans `contact.js`
4. Retirer la note "formulaire en cours de mise en place" de `contact.html`
5. Tester en preview Netlify (PR deploy preview)

---

## VÉRIFICATION DES SOURCES VOLATILES

| Information | Source | Date vérification |
|---|---|---|
| Netlify Forms gratuit/illimité sur plans crédit | docs.netlify.com/manage/forms/usage-and-billing | 2026-09-22 |
| Netlify 300 crédits/mois gratuit | netlify.com/pricing, docs.netlify.com | 2026-09-22 |
| Vercel Hobby non-commercial | vercel.com/pricing | 2026-09-22 |
| GitHub Pages limites | docs.github.com/en/pages | 2026-09-22 |
| Formspree Free 50/mois | formspree.io/plans | 2026-09-22 |

*Toutes prix/limites vérifiés contre documentation officielle fournisseur à la date ci-dessus. Sujets à évolution.*

---

## MARQUEURS D'INCERTITUDE

- **VERIFIED** : Netlify Forms gratuit/illimité sur plans crédit (doc officielle avril 2026)
- **VERIFIED** : Vercel Hobby non-commercial (tarification publique)
- **VERIFIED** : GitHub Pages pas de PR previews natifs (doc + blog communautaire 2026-04)
- **ASSUMPTION** : 300 crédits/mois suffisent pour trafic portfolio agence typique (basé sur estimation 7,5 Go bande passante résiduelle après déploiements)
- **UNVERIFIED** : Comportement exact Netlify si crédits épuisés en cours de mois (docs: "projets mis en pause jusqu'au cycle suivant sauf auto-recharge")