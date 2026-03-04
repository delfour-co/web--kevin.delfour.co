---
author: [Kevin Delfour]
title: "IA et dette technique : accélérateur ou amplificateur"
date: 2026-02-25
slug: "ia-dette-technique-accelerateur-ou-amplificateur"
description: "L'IA peut aider à résorber la dette technique. Elle peut aussi en créer davantage. Tout dépend de la manière dont elle est utilisée."
categories: ["craft"]
series: [IA & Développement]
tags: [ia, dette-technique, refactoring, qualite, architecture, code]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Une équipe utilise massivement l'IA pour accélérer la livraison de features. La vélocité augmente. Les sprints se remplissent. Le management est satisfait. Six mois plus tard, le constat : le code est plus volumineux, les patterns sont incohérents entre les modules, les tests générés passent mais ne testent pas les bons comportements, et personne ne comprend vraiment certains blocs de code commités par des développeurs qui ont « laissé l'IA faire ».

La dette technique n'a pas diminué. Elle a changé de forme. Elle est plus diffuse, plus silencieuse, et plus difficile à identifier.

## Le faux problème

La question habituelle : « L'IA aide-t-elle à réduire la dette technique ? »

En réalité, l'IA n'a pas d'opinion sur la dette technique. Elle produit du code en fonction de ce qu'on lui demande. Si on lui demande d'aller vite, elle va vite — sans se soucier de la cohérence, de la maintenabilité ou de la duplication. Si on lui demande de refactorer proprement avec des critères précis, elle le fait raisonnablement bien.

L'IA est un amplificateur. Elle amplifie les intentions de celui qui l'utilise. Si l'intention est « livrer vite », la dette augmente. Si l'intention est « livrer proprement », la dette diminue.

## Le vrai enjeu

Le vrai enjeu est de comprendre les **deux faces de l'IA face à la dette technique**.

### L'IA comme accélérateur de résorption

- **Refactoring assisté.** Extraire une méthode, renommer des variables, simplifier des conditions — l'IA fait ça correctement sur des périmètres locaux. Sur un module de 500 lignes, elle peut proposer une version plus lisible en quelques secondes.
- **Identification de duplication.** Soumettre plusieurs fichiers et demander « quels patterns se répètent ? » permet d'identifier des duplications que les outils classiques ne détectent pas (duplications sémantiques, pas syntaxiques).
- **Génération de tests pour du code non couvert.** Avant de toucher du code legacy, il faut le couvrir par des tests. L'IA accélère cette phase cruciale.
- **Documentation rétrospective.** Documenter du code existant qui n'a jamais été documenté — l'IA le fait rapidement et souvent correctement pour la partie technique (pas pour la partie métier).

### L'IA comme amplificateur de dette

- **Code que personne ne comprend.** Le code généré par l'IA est syntaxiquement correct mais sémantiquement opaque pour le développeur qui ne l'a pas écrit (ni compris). Ce code est de la dette par définition — il est impossible à maintenir.
- **Incohérence de patterns.** Chaque développeur utilise l'IA différemment. Les patterns divergent entre les modules. Le codebase devient un patchwork de styles et d'approches.
- **Duplication cachée.** L'IA ne sait pas ce qui existe déjà dans le projet. Elle peut générer un utilitaire qui existe déjà, créant une duplication que personne ne remarque.
- **Tests qui donnent une fausse confiance.** Des tests générés qui passent sans tester le bon comportement. Le dashboard est vert, mais la confiance est fictive.

## Cadre de décision

1. **Utiliser l'IA pour la dette existante, cadrer l'IA pour le code nouveau.** L'IA est un excellent outil pour s'attaquer au legacy. Mais sur le code nouveau, elle doit être cadrée par des conventions claires pour ne pas créer de nouvelle dette.

2. **Exiger la compréhension avant le merge.** Règle simple : si le développeur ne peut pas expliquer chaque ligne du code généré, le code ne passe pas. C'est le garde-fou le plus efficace contre la dette IA.

3. **Maintenir un style guide vivant.** L'IA respecte les conventions qu'on lui donne. Un fichier de contexte avec les patterns, les conventions et les anti-patterns du projet réduit l'incohérence.

4. **Mesurer la dette, pas la couverture.** La couverture de tests n'est pas un indicateur de qualité. La complexité cyclomatique, la duplication, le couplage — ces métriques disent plus que le pourcentage de code couvert.

5. **Allouer du temps de refactoring sur le code IA.** Le code généré par l'IA n'est pas exempt de refactoring. Au contraire — il en a souvent plus besoin que le code écrit manuellement.

## Retour terrain

Ce que j'ai constaté :

- Les équipes qui utilisent l'IA le plus efficacement contre la dette sont celles qui l'utilisent en mode « lecture » avant le mode « écriture ». Comprendre d'abord, modifier ensuite.
- La dette la plus insidieuse créée par l'IA est la dette cognitive : du code que personne ne comprend mais que tout le monde utilise. Elle ne se voit pas dans les métriques classiques.
- Les équipes qui cadrent l'IA avec un fichier de contexte projet (conventions, patterns, anti-patterns) produisent du code 40 % plus cohérent que celles qui ne le font pas.

## Erreurs fréquentes

- **Croire que l'IA produit du code « propre » par défaut.** L'IA produit du code fonctionnel. Propre, c'est autre chose — ça demande des critères, des conventions et une relecture.
- **Ne pas tracker l'origine du code.** Savoir quel code a été généré par IA aide à identifier les zones à risque pour le refactoring. Certaines équipes utilisent un tag ou un commentaire de commit.
- **Utiliser l'IA pour aller plus vite sans maintenir l'exigence de qualité.** L'IA rend la vitesse accessible. Mais la vitesse sans qualité, c'est de la dette en accéléré.

## Si c'était à refaire

- Je définirais deux modes d'usage de l'IA dans l'équipe : mode « exploration » (aller vite, prototyper, jetable) et mode « production » (conventions strictes, relecture obligatoire, tests manuels sur les cas limites). Les deux ont leur place, mais ils ne suivent pas les mêmes règles.
- Je ferais un audit trimestriel du code généré par IA — pas pour blâmer, mais pour identifier les patterns de dette récurrents et ajuster les conventions.
- Je rappellerais régulièrement que le refactoring n'est pas un luxe. C'est le prix de la vitesse.

## Pour approfondir

- [Architecture et craft](/articles/?cat=craft)
- [Legacy code : refactoring pragmatique](/posts/legacy-code-refactoring-pragmatique-dette-technique/)
- [Hallucinations et fiabilité : quand l'IA se trompe](/posts/hallucinations-ia-fiabilite-production/)
