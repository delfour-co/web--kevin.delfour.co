---
author: [Kevin Delfour]
title: "Moderniser du code legacy avec l'IA : ce qui marche, ce qui piège"
date: 2025-09-10
slug: "moderniser-legacy-avec-ia"
description: "L'IA peut aider à comprendre et moderniser du code legacy. Mais elle peut aussi créer une fausse confiance dangereuse. Retour d'expérience."
categories: ["craft"]
series: [IA & Développement]
tags: [ia, legacy, refactoring, modernisation, dette-technique]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Un CTO hérite d'une base de code PHP de 200 000 lignes, sans tests, sans documentation, avec des développeurs originaux partis depuis longtemps. Il décide d'utiliser un LLM pour accélérer la compréhension et la modernisation. Trois mois plus tard, une partie du code est migrée vers une stack moderne. Mais un bug critique apparaît en production : le LLM avait « traduit » une fonction sans comprendre une subtilité métier — un arrondi spécifique imposé par une réglementation fiscale, codé en dur dans une condition imbriquée.

Ce que j'ai observé : l'IA est un excellent outil pour démystifier du code legacy. Mais elle ne remplace pas la compréhension métier — et c'est précisément ce qui manque le plus quand on hérite d'un legacy.

## Le faux problème

La question habituelle : « L'IA peut-elle réécrire notre legacy ? »

En réalité, réécrire n'est presque jamais la bonne stratégie — avec ou sans IA. Ce qui fonctionne, c'est une modernisation progressive. Et l'IA peut aider à chaque étape de cette progression, à condition de savoir ce qu'on lui demande.

## Le vrai enjeu

Le vrai enjeu n'est pas de traduire du vieux code en nouveau code. C'est de **comprendre avant de toucher**. Et c'est là que l'IA apporte sa plus grande valeur — non pas comme rédacteur de code, mais comme lecteur de code.

### Ce que l'IA fait bien sur du legacy

- **Expliquer du code opaque.** Un bloc de 200 lignes sans commentaire, avec des noms de variables obscurs — l'IA peut en produire une explication lisible en quelques secondes. Ce n'est pas toujours exact, mais c'est un point de départ précieux.
- **Générer des tests pour du code existant.** Avant de toucher du legacy, il faut le couvrir par des tests. L'IA peut proposer des cas de test basés sur la lecture du code — y compris des cas limites que le développeur n'avait pas identifiés.
- **Proposer des refactorings locaux.** Extraire une méthode, simplifier une condition, renommer des variables — l'IA fait ça correctement sur des périmètres limités.
- **Traduire entre langages.** PHP vers TypeScript, Java vers Kotlin, Python 2 vers Python 3 — pour des fonctions isolées et bien délimitées, l'IA produit des traductions exploitables.

### Ce que l'IA fait mal sur du legacy

- **Comprendre l'intention métier.** Le code legacy encode souvent des règles métier implicites. L'IA voit la mécanique, pas la raison. Elle peut reproduire un comportement sans comprendre pourquoi il existe.
- **Gérer les effets de bord.** Le legacy est plein de couplages cachés. Modifier une fonction peut casser quelque chose à l'autre bout du système. L'IA n'a pas cette vision globale.
- **Détecter les pièges temporels.** Du code qui « marche » depuis dix ans peut contenir des bugs latents que personne n'a jamais rencontrés. L'IA ne les détectera pas plus que les développeurs précédents.

## Cadre de décision

1. **Utiliser l'IA pour cartographier, pas pour migrer.** La première étape est de comprendre ce que fait le code. L'IA peut accélérer cette cartographie. La migration vient après, une fois que l'équipe comprend le domaine.

2. **Toujours écrire des tests avant de refactorer.** L'IA peut aider à les écrire. Mais les tests doivent être validés par un humain qui comprend le comportement attendu — pas seulement le comportement actuel.

3. **Procéder par modules isolés.** Ne pas demander à l'IA de migrer une application entière. Identifier un module avec des frontières claires, le comprendre, le tester, le migrer, puis passer au suivant.

4. **Vérifier chaque traduction avec des tests de non-régression.** L'IA peut traduire du PHP en TypeScript. Mais « ça compile » ne veut pas dire « ça fait la même chose ». Les tests de non-régression sont le filet de sécurité minimal.

5. **Documenter ce que l'IA a aidé à comprendre.** Les explications générées par l'IA doivent être relues, corrigées et intégrées dans la documentation du projet. Elles ne remplacent pas la doc — elles l'initient.

## Retour terrain

Ce que j'ai constaté sur les projets de modernisation assistée par IA :

- Les gains les plus importants sont sur la phase de compréhension, pas sur la phase de réécriture. Un développeur qui utilise l'IA pour comprendre un module legacy gagne en moyenne une à deux semaines par rapport à une lecture manuelle.
- Les risques les plus élevés sont sur les règles métier implicites. Chaque fois qu'un bug est apparu après une migration assistée par IA, la cause était la même : une règle métier codée en dur que l'IA avait « simplifiée ».
- Les équipes qui réussissent le mieux sont celles qui traitent l'IA comme un traducteur — pas comme un expert métier.

## Erreurs fréquentes

- **Faire confiance à l'explication de l'IA sans la vérifier.** L'IA explique ce qu'elle pense que le code fait. Ce n'est pas toujours ce qu'il fait réellement.
- **Migrer sans tests.** L'IA accélère la migration, mais sans tests, chaque changement est un pari. Et sur du legacy, les paris se perdent souvent.
- **Vouloir tout migrer d'un coup.** L'IA donne l'impression que c'est possible. Ce n'est pas le cas. La migration progressive est la seule approche viable.
- **Oublier que le legacy fonctionne.** Le code legacy a un avantage : il tourne en production. Chaque modification est un risque de casser quelque chose qui marchait.

## Si c'était à refaire

- Je commencerais par une phase de cartographie pure : utiliser l'IA pour documenter chaque module, sans toucher au code. Deux semaines de lecture avant une seule ligne modifiée.
- Je prioriserais les modules par criticité métier, pas par complexité technique. Le code le plus laid n'est pas toujours le plus risqué.
- J'impliquerais les profils métier dès le début — pas seulement les développeurs. Les règles implicites du code sont souvent explicites dans la tête de quelqu'un côté business.

## Pour approfondir

- [Architecture et craft](/articles/?cat=craft)
- [Legacy code : refactoring pragmatique](/posts/legacy-code-refactoring-pragmatique-dette-technique/)
- [IA générative et productivité développeur](/posts/ia-generative-et-productivite-developpeur/)
