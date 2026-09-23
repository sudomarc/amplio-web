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

Cible : **Vercel** (voir `docs/hosting-form-decision.md` et `vercel.json`).

Le site est statique (HTML/CSS/JS vanilla) : Vercel le sert tel quel via le preset de framework « Other », sans étape de build. `vercel.json` reproduit les précédents headers de sécurité et désactive l'installation npm (`installCommand: ""`) car aucun outil de build n'est requis en production.

Le formulaire de contact est géré par **Web3Forms** (service tiers, sans backend) :

- Champ caché `access_key` dans `contact.html` — la clé est volontairement publique (pas un secret), mais la valeur `VOTRE_ACCESS_KEY_WEB3FORMS` est un **placeholder à remplacer** (création de clé sur web3forms.com).
- L'envoi AJAX (`assets/js/contact.js`) poste en JSON vers `https://api.web3forms.com/submit`.
- Le champ caché `botcheck` sert de honeypot anti-spam ; le filtrage côté serveur reste actif.
- Tant que la clé placeholder n'est pas remplacée, l'envoi est désactivé côté client (message d'erreur), pour éviter toute soumission vers une clé invalide.

Un lien GitHub → Vercel doit être configuré dans le dashboard Vercel pour activer les déploiements automatiques et les previews de PR. Vérifier le déploiement réel dans le dashboard après liaison.

## Maintenance

- Une branche par tâche, PR vers `main`, pas de push direct sur `main`.
- Conventional Commits en français (voir `ROADMAP.md`).
- Mettre à jour le statut des tâches dans `ROADMAP.md` après chaque livraison vérifiée.
