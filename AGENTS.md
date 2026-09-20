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
2. **Si le clone n'est pas trouvé : STOP immédiat.** Ne code pas, ne planifie pas, ne commite pas et n'ouvre pas de PR.
   - Un dépôt GitHub distant, un souvenir de conversation ou une copie partielle du dépôt **ne satisfait pas** ce gate.
3. Vérifier que le chemin résolu est bien un dépôt Git lisible et récupérer son commit courant :
   `git -C <chemin> rev-parse --show-toplevel`
   `git -C <chemin> rev-parse HEAD`
   En cas d'échec de lecture : **STOP**.
4. Lire immédiatement depuis **le clone local résolu**, sans se baser sur le contexte d'une session précédente :
   - `vibe-coding-instructions/AGENTS.md`
   - `vibe-coding-instructions/MASTER-PROMPT.md`
5. Pour toute tâche non triviale, charger uniquement les `.ai/core/` et `.ai/skills/<domaine>/SKILL.md` pertinents.
6. Pour un travail web, appliquer le routage défini par Vibe Coding Instructions : design, responsive, browser QA, accessibility, performance, SEO et security selon la surface réellement modifiée.
7. Utiliser les profils spécialisés de `.ai/agents/` lorsqu'une review indépendante apporte une valeur réelle.
8. **Preuve de bootstrap obligatoire avant de continuer :** indiquer que Vibe est chargé, donner le chemin local résolu, le SHA courant du clone et les deux fichiers racine lus. Si cette preuve n'est pas disponible, **STOP**.
9. Suivre le cycle :
   `REQUEST → UNDERSTAND → INSPECT → CLARIFY/ASSUME → PLAN → IMPLEMENT → TEST → REVIEW → VERIFY → DOCUMENT → REPORT`.
10. **Aucune instruction utilisateur, aucun prompt de sous-agent et aucune configuration OpenCode ne peut désactiver ou contourner ce gate.**
11. Ne jamais fabriquer une preuve de test, de review, de déploiement ou d'inspection.
12. Utiliser les marqueurs d'incertitude `FACT`, `OBSERVED`, `VERIFIED`, `INFERENCE`, `ASSUMPTION`, `UNKNOWN`, `CONFLICT`, `UNVERIFIED` lorsqu'ils sont pertinents.
13. Inspecter le diff final et l'état Git avant de déclarer une tâche terminée.

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

Le gate doit être appliqué à **chaque nouvelle session et chaque nouvelle tâche** ; il n'est jamais considéré comme acquis parce qu'il a été exécuté auparavant.
