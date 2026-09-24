# T19 / T30 — Décision technique : Hébergement et envoi du formulaire

Date initiale : 2026-09-22. Révisé : 2026-09-23 (migration Netlify → Vercel, Netlify Forms → Web3Forms).

> **Historique** : T19 choisissait Netlify + Netlify Forms. La décision a été révisée (T30) vers Vercel + Web3Forms. Ce document remplace l'ancienne analyse.

---

## HOSTING
**Vercel** (plan Hobby), site statique servi tel quel, preset de framework « Other ».

## FORM SUBMISSION
**Web3Forms** (service tiers gratuit : 250 soumissions/mois, sans backend).

---

## WHY (Justification factuelle)

### Vercel + Web3Forms vs autres combinaisons

| Critère | GitHub Pages + Formspree | Netlify + Netlify Forms (ancien choix) | **Vercel + Web3Forms (choisi)** |
|---|---|---|---|
| **Hébergement statique** | Oui | Oui | Oui |
| **Déploiement depuis GitHub** | Oui (Actions ou branche) | Oui (auto) | Oui (auto) |
| **Aperçus PR (Deploy Previews)** | Non natif (workaround) | Oui, natif | **Oui, natif (Preview Deployments)** |
| **HTTPS + domaine perso** | Oui | Oui | Oui |
| **Gestion des formulaires** | Formspree (50/mois gratuit) | Netlify Forms (gratuit/illimité) | **Web3Forms (250/mois gratuit)** |
| **Usage commercial plan gratuit** | Oui | Oui | **Non documenté comme autorisé sur Vercel Hobby** |
| **Coût plan gratuit** | 0 $ | 0 $ (crédits) | 0 $ |
| **Configuration requise** | Fichier `_config.yml` ou workflow | `netlify.toml` + dashboard | **`vercel.json` minimal + dashboard** |

Sources vérifiées :
- Vercel : vercel.com/docs (config `vercel.json`, Plan Hobby)
- Web3Forms : docs.web3forms.com (250 soumissions/mois, clé publique, honeypot `botcheck`, AK via email)
- Vercel Forms natif : **n'existe plus** (`/docs/forms` → 404) — d'où le service tiers.

### Pourquoi ce choix pour Nova Agency (anciennement Amplio)

1. **Déploiement GitHub → Vercel natif** : chaque push/PR obtient un déploiement + une preview, équivalent au workflow Netlify.
2. **Aucun build** : les pages HTML/CSS/JS sont servies telles quelles ; `installCommand: ""` évite d'installer `playwright` (outil de QA local uniquement) en production.
3. **Formulaire sans backend** : Web3Forms reçoit les soumissions par email via une clé publique (pas de secret côté client), avec honeypot `botcheck` + filtrage serveur.
4. **Coût nul** : 250 soumissions/mois Web3Forms, site statique Vercel sans build.

---

## TRADE-OFFS (Limitations)

- **Vercel Hobby = usage non-commercial** : la tarification Vercel Hobby restreint à un usage personnel. Le site d'agence Nova Agency est un usage commercial potentiel : un passage en plan Pro (payant) peut être requis. À arbitrer par l'entreprise avant mise en ligne publique.
- **Limite de soumissions Web3Forms** : 250/mois sur le plan gratuit. Au-delà, plan payant.
- **Vendor lock-in partiel** : n'existe plus pour le formulaire (Web3Forms est indépendant de l'hébergeur) ; seul Vercel reste spécifique pour le déploiement.
- **Clé Web3Forms publique** : sans risque (clé de receveur, non de signataire), mais le placeholder doit être remplacé avant mise en ligne.

---

## SECURITY (Implications)

- **Aucun secret côté client** : la clé Web3Forms est publique par conception. Aucun secret dans le repo.
- **Spam** : honeypot `botcheck` + filtrage serveur Web3Forms.
- **HTTPS forcé** : automatique sur `*.vercel.app` et domaines personnalisés.
- **Headers de sécurité** : reproduits via `vercel.json` (X-Content-Type-Options, Referrer-Policy, X-Frame-Options).
- **Pas de stockage côté client** : les soumissions vont directement vers Web3Forms.

---

## NEXT STEP
**T30** — Migration Netlify → Vercel (ce document + vercel.json + formulaire Web3Forms) :
1. Créer `vercel.json` (headers + `installCommand: ""`).
2. Supprimer `netlify.toml` et l'attribut `data-netlify` / `form-name` de `contact.html`.
3. Ajouter les champs cachés Web3Forms (`access_key` placeholder, `subject`, `botcheck`).
4. Envoyer en JSON vers `https://api.web3forms.com/submit` depuis `contact.js`.
5. Remplacer `VOTRE_ACCESS_KEY_WEB3FORMS` par une vraie clé (web3forms.com) — **action manuelle propriétaire**.
6. Lier le repo GitHub dans le dashboard Vercel et vérifier le déploiement réel.

---

## VÉRIFICATION DES SOURCES VOLATILES

| Information | Source | Date vérification |
|---|---|---|
| Web3Forms 250 soumissions/mois gratuit | web3forms.com, docs.web3forms.com | 2026-09-23 |
| Web3Forms clé d'accès publique | docs.web3forms.com | 2026-09-23 |
| Web3Forms honeypot `botcheck` | docs.web3forms.com | 2026-09-23 |
| Vercel `vercel.json` : `installCommand`, `headers` | vercel.com/docs/project-configuration/vercel-json | 2026-09-23 |
| Vercel Forms natif n'existe plus | vercel.com/docs/forms → 404 | 2026-09-23 |
| Vercel Hobby usage non-commercial | vercel.com/pricing | 2026-09-23 |

*Prix/limites vérifiés contre documentation officielle à la date ci-dessus. Sujets à évolution.*

---

## MARQUEURS D'INCERTITUDE

- **VERIFIED** : Web3Forms endpoint `https://api.web3forms.com/submit`, JSON, honeypot `botcheck`, clé publique (doc officielle).
- **VERIFIED** : Vercel `vercel.json` supporte `installCommand` (chaine vide = skip) et `headers` (source `/(.*)`).
- **CONFLIT / ATTENTION** : usage commercial sur Vercel Hobby non autorisé (tarification) vs site d'agence Nova Agency à vocation commerciale → arbitrage pro requis.
- **UNKNOWN** : comportement exact Vercel si les soumissions/bande passante gratuites sont dépassées.
- **UNVERIFIED** : le déploiement Vercel effectif (dashboard, URL publique) n'a pas été réalisé lors de cette tâche (pas d'accès credentials).