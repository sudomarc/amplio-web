# AGENTS.md — Amplio Web

Ce fichier est le **bootstrap obligatoire d'OpenCode** pour ce dépôt.

## HARD GATE — VIBE CODING INSTRUCTIONS

**Aucune planification, modification de code, création de commit ou ouverture de PR ne doit commencer avant le chargement des Vibe Coding Instructions.**

Source canonique :
- dépôt : https://github.com/sudomarc/vibe-coding-instructions
- clone local attendu : un dossier nommé `vibe-coding-instructions`, idéalement adjacent au projet.

### Procédure obligatoire

1. Résoudre le clone local de `vibe-coding-instructions`.
   - Chercher d'abord `../vibe-coding-instructions`.
   - Sinon rechercher un dossier `vibe-coding-instructions` dans les répertoires parents accessibles.
2. **Si le clone n'est pas trouvé : STOP.** Ne code pas à partir de la mémoire et ne considère pas cette étape comme satisfaite.
3. Lire immédiatement :
   - `vibe-coding-instructions/AGENTS.md`
   - `vibe-coding-instructions/MASTER-PROMPT.md`
4. Pour toute tâche non triviale, charger uniquement les `.ai/core/` et `.ai/skills/<domaine>/SKILL.md` pertinents.
5. Pour un travail web, appliquer le routage défini par Vibe Coding Instructions : design, responsive, browser QA, accessibility, performance, SEO et security selon la surface réellement modifiée.
6. Utiliser les profils spécialisés de `.ai/agents/` lorsqu'une review indépendante apporte une valeur réelle.
7. Suivre le cycle :
   `REQUEST → UNDERSTAND → INSPECT → CLARIFY/ASSUME → PLAN → IMPLEMENT → TEST → REVIEW → VERIFY → DOCUMENT → REPORT`.
8. Ne jamais fabriquer une preuve de test, de review, de déploiement ou d'inspection.
9. Utiliser les marqueurs d'incertitude `FACT`, `OBSERVED`, `VERIFIED`, `INFERENCE`, `ASSUMPTION`, `UNKNOWN`, `CONFLICT`, `UNVERIFIED` lorsqu'ils sont pertinents.
10. Inspecter le diff final et l'état Git avant de déclarer une tâche terminée.

## RÈGLE DE PERSISTANCE

Ce bootstrap est volontairement versionné dans le dépôt afin que **chaque session OpenCode reçoive cette contrainte**.

Ne crée pas une copie complète de `vibe-coding-instructions` dans ce dépôt. Le dépôt Vibe reste la source canonique.

## RÈGLES PROJET

- `ROADMAP.md` est la source de vérité du projet.
- Une branche par tâche.
- Aucun push direct sur `main`.
- Aucun force-push.
- Une PR doit être utilisée pour les changements.
- Préserver les changements sans rapport avec la tâche.
- Le site est HTML5/CSS3/JavaScript vanilla, sans build system.
- Respecter les chemins relatifs du projet.
- Ne pas ajouter de dépendance ou d'outil sans nécessité démontrée.

## OPENCode V2

Ne compte pas sur le champ `instructions` de `opencode.json` pour satisfaire le hard gate Vibe : le bootstrap de ce dépôt passe par ce `AGENTS.md` et par le chargement explicite des fichiers Vibe indiqués ci-dessus.
