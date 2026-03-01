---
author: [Kevin Delfour]
title: "IA et tests : générer, valider, maintenir"
date: 2025-09-24
slug: "ia-tests-generer-valider-maintenir"
description: "L'IA peut générer des tests. Mais un test généré sans compréhension est un test qui donne une fausse confiance. Comment utiliser l'IA pour tester mieux."
categories: ["pratiques"]
series: [IA & Développement]
tags: [ia, tests, qualite, automatisation, tdd, bonnes-pratiques]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Un tech lead demande à son équipe d'utiliser l'IA pour augmenter la couverture de tests. En deux semaines, la couverture passe de 45 % à 78 %. Le dashboard est vert. Tout le monde est content. Puis un bug arrive en production — un cas de bord sur un calcul de remise. Le test existait. Il passait. Mais il ne testait pas le bon comportement : l'IA avait généré un test qui validait l'implémentation actuelle, pas la spécification attendue.

Ce que j'ai observé : l'IA est très efficace pour produire des tests. Elle est beaucoup moins efficace pour produire des tests qui testent la bonne chose.

## Le faux problème

La question habituelle : « L'IA peut-elle écrire nos tests ? »

En réalité, écrire un test est la partie facile. La partie difficile, c'est de savoir quoi tester, pourquoi, et quels cas limites couvrir. L'IA peut aider sur le « comment ». Le « quoi » et le « pourquoi » restent humains.

## Le vrai enjeu

Le vrai enjeu est de **ne pas confondre couverture et confiance**. Un test généré par l'IA augmente la couverture. Mais la couverture ne mesure pas la pertinence des tests — elle mesure le pourcentage de code traversé. Traverser du code n'est pas la même chose que vérifier un comportement.

### Où l'IA excelle pour les tests

- **Tests unitaires sur des fonctions pures.** Entrée → sortie, pas d'effet de bord. L'IA génère les cas standards et propose souvent des cas limites intéressants (valeurs nulles, listes vides, bornes numériques).
- **Tests de snapshot et de non-régression.** Capturer le comportement actuel d'un module avant de le refactorer. L'IA peut générer rapidement un filet de sécurité basé sur l'état existant.
- **Tests de désérialisation et de parsing.** Formats d'entrée variés, cas d'erreur de format — l'IA explore ces variations mieux qu'un humain fatigué.
- **Scaffolding de tests d'intégration.** Setup de mocks, configuration de fixtures, boilerplate de tests d'API — tout ce qui est répétitif et structuré.

### Où l'IA échoue pour les tests

- **Tests de logique métier.** L'IA ne connaît pas les règles métier. Elle teste ce que le code fait, pas ce qu'il devrait faire. La nuance est fondamentale.
- **Tests de comportement utilisateur.** Les parcours utilisateur complexes, les interactions entre composants, les scénarios de bout en bout — l'IA manque de contexte produit.
- **Tests de performance et de charge.** Les seuils, les scénarios réalistes, les profils d'utilisation — tout cela demande une connaissance du terrain que l'IA n'a pas.

## Cadre de décision

1. **Utiliser l'IA pour le scaffolding, pas pour la logique.** L'IA génère la structure du test, les imports, les mocks, le setup. L'humain écrit les assertions qui comptent.

2. **Relire chaque test généré comme du code de production.** Un test que personne ne comprend est pire que pas de test. Il donne une fausse confiance et il est impossible à maintenir.

3. **Demander les cas limites explicitement.** Ne pas se contenter de « génère les tests pour cette fonction ». Demander : « Quels sont les cas limites ? Que se passe-t-il avec une entrée vide, un débordement, un null ? » L'IA répond bien aux questions précises.

4. **Séparer les tests de couverture des tests de confiance.** Les tests générés par l'IA augmentent la couverture. Les tests écrits par l'équipe augmentent la confiance. Les deux sont nécessaires, mais ils n'ont pas le même objectif.

5. **Intégrer la génération IA dans le workflow, pas en dehors.** La génération de tests doit se faire au moment de l'écriture du code, pas en batch après coup. Un test généré trois mois après le code a peu de chances d'être pertinent.

## Retour terrain

Ce que j'ai constaté dans les équipes qui utilisent l'IA pour les tests :

- La couverture monte vite — c'est le bénéfice visible. Mais la qualité des tests stagne si personne ne les relit.
- Les meilleurs résultats viennent des développeurs qui utilisent l'IA en mode « challenge » : ils écrivent le test, puis demandent à l'IA « quels cas ai-je oubliés ? ». L'IA comme second regard, pas comme rédacteur principal.
- Les tests générés sont souvent fragiles — couplés à l'implémentation plutôt qu'au comportement. Un refactoring les casse, et personne ne sait pourquoi ils existaient.

## Erreurs fréquentes

- **Viser un pourcentage de couverture avec des tests générés.** 80 % de couverture avec des tests que personne ne comprend est pire que 50 % avec des tests solides.
- **Ne pas maintenir les tests générés.** Un test qui casse après un refactoring doit être corrigé ou supprimé. Un test mort est du bruit.
- **Confondre « le test passe » et « le comportement est correct ».** Le test peut passer et le code être faux. L'IA valide le code tel qu'il est, pas tel qu'il devrait être.
- **Générer des tests pour atteindre un objectif de reporting.** Si la motivation est de « faire monter le dashboard », la qualité des tests sera mauvaise.

## Si c'était à refaire

- Je définirais deux catégories de tests : les « filets de sécurité » (générés par IA, couverture large, confiance modérée) et les « tests métier » (écrits manuellement, ciblés, haute confiance). Les deux coexistent.
- J'imposerais une relecture de chaque test généré avant merge — comme pour le code de production.
- J'utiliserais l'IA principalement pour identifier les cas limites manquants, pas pour écrire les tests complets.

## Pour approfondir

- [Pratiques de développement](/articles/?cat=pratiques)
- [Testing : stratégies pragmatiques](/posts/testing-strategies-pragmatiques/)
- [Assistants IA : au-delà de l'autocomplétion](/posts/assistants-ia-au-dela-autocompletion/)
