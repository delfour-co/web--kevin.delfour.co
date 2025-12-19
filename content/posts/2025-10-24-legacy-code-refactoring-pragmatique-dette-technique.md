---
author:
- Kevin Delfour
title: 'Legacy Code : Le refactoring pragmatique sans réécriture complète'
date: 2025-10-24
slug: "legacy-code-refactoring-pragmatique-dette-technique"
description: Refactorer du legacy sans tout réécrire ? C'est possible. Stratégies
  pragmatiques pour améliorer progressivement une base de code vieillissante.
categories:
- architecture
series:
- CTO
- Architecture
tags:
- refactoring
- legacy-code
- dette-technique
- developpement
- architecture
ShowToc: true
TocOpen: false
pillar: gouvernance-decision
pillars:
- gouvernance-decision
audience: cto
audiences:
- cto
---
## Situation réelle

"Il faut tout réécrire !" Cette proposition revient régulièrement face à une codebase legacy. Elle semble séduisante : repartir de zéro, faire les choses bien cette fois. Mais la réalité est différente. Les réécritures complètes échouent 80% du temps : 6 mois deviennent 18 mois, le budget triple, les features manquent, les bugs nouveaux apparaissent, parfois le projet est abandonné.

Ce que j'ai observé : il est possible d'améliorer progressivement une codebase legacy sans Big Bang rewrite. Le pattern Strangler Fig permet de remplacer progressivement l'ancien système par du nouveau code, fonctionnalité par fonctionnalité. Cette approche progressive évite les risques du Big Bang et permet de continuer à livrer de la valeur pendant la migration.

## Le faux problème

Le faux problème serait de croire que toute codebase legacy doit être réécrite complètement. En réalité, beaucoup de code legacy peut être amélioré progressivement sans réécriture complète. Le pattern Strangler Fig permet de remplacer progressivement l'ancien par le nouveau, fonctionnalité par fonctionnalité, sans bloquer le business.

Un autre faux problème : penser qu'il faut rendre le code "parfait" avant de continuer. En réalité, améliorer le code de 20% à chaque passage est souvent plus efficace que d'essayer de le rendre parfait d'un coup. Le perfectionnisme bloque la progression.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment améliorer progressivement une codebase legacy sans bloquer le business :

**Strangler Fig Pattern** : Remplacer progressivement l'ancien système par du nouveau code, fonctionnalité par fonctionnalité. Old System 100% → Old 80% + New 20% → Old 40% + New 60% → Old 10% + New 90% → New 100%. Cette progression permet de continuer à livrer de la valeur pendant la migration.

**Patterns de refactoring progressif** : Add, Don't Modify (ajouter du nouveau code plutôt que modifier l'ancien), Branch by Abstraction (créer une abstraction puis migrer les implémentations), Seam Model (identifier les "coutures" pour isoler le legacy). Ces patterns permettent de refactorer en sécurité.

**Tests de sécurité** : Characterization tests (tests qui documentent le comportement actuel, même s'il est bugué), Golden Master Testing (capturer les outputs legacy, comparer après refactoring). Ces tests permettent de refactorer en sécurité sans régression.

## Cadre de décision

Voici les principes qui m'ont aidé à refactorer du legacy code :

**1. Commencer petit**  
Formatting (Prettier, ESLint), dead code removal, dependencies update. Ces quick wins améliorent la lisibilité et la sécurité sans risque. Ils libèrent aussi l'équipe mentalement et créent de la confiance pour les refactorings plus importants.

**2. Tests de sécurité d'abord**  
Avant de refactorer, ajouter des tests qui documentent le comportement actuel (characterization tests) ou capturer les outputs legacy (golden master testing). Ces tests permettent de refactorer en sécurité sans régression. Refactorer sans tests, c'est de la roulette russe.

**3. Refactoring progressif**  
Utiliser le pattern Strangler Fig : remplacer progressivement l'ancien par le nouveau, fonctionnalité par fonctionnalité. Cette approche progressive évite le Big Bang et permet de continuer à livrer de la valeur pendant la migration. Chaque étape peut être évaluée avant de continuer.

**4. Refactorer le code critique et fréquemment modifié**  
Prioriser le refactoring du code critique (checkout, payment) et fréquemment modifié plutôt que du code mort ou peu utilisé. Ce code a le plus d'impact sur la vélocité et la qualité. Refactorer du code mort n'apporte pas de valeur.

**5. Boy Scout Rule**  
"Laisser le code plus propre qu'on l'a trouvé". Chaque fois que vous touchez du code legacy, l'améliorer légèrement (5 minutes de refactoring, impact énorme). Cette approche progressive améliore la codebase sans effort dédié massif.

## Retour terrain

Ce que j'ai observé dans différents projets :

**Ce qui fonctionne** : Une approche progressive en 12 mois. Mois 1-3 : stabiliser (setup CI/CD, tests critiques, documentation architecture). Mois 4-6 : quick wins (formatter, dead code removal, dependencies update). Mois 7-9 : extract services (extraire progressivement les services les plus autonomes). Mois 10-12 : refactoring continu (Boy Scout Rule systématique, amélioration progressive). Cette approche progressive transforme la codebase sans Big Bang.

**Ce qui bloque** : Big Bang rewrite ("on réécrit tout en 6 mois"). **Résultat :**  6 mois deviennent 18 mois, budget triple, features manquantes, bugs nouveaux, parfois abandon. Refactoring sans tests. **Résultat :**  régressions, bugs en production, perte de confiance. Refactoring du code mort. **Résultat :**  pas de valeur business, temps perdu.

**Les résultats mesurés** : Bugs 40/mois → 8/mois (-80%), Deploy 2h → 15min (-87%), Coverage 5% → 45%, Velocity +60%, Team happiness 4/10 → 8/10. Coût : 0.5 ETP dédié = ~$50k. ROI : économie bugs + velocity = ~$200k/an. Ces résultats montrent que le refactoring progressif est un investissement rentable.

**Les patterns qui marchent** : Add, Don't Modify (wrapper avec validation, appeler legacy, migrer progressivement les appels). Branch by Abstraction (créer interface, implémenter ancien système, nouvelle implémentation, feature flag pour switcher, rollout progressif). Seam Model (identifier les "coutures", créer facade, progressivement remplacer). Ces patterns permettent de refactorer en sécurité.

## Erreurs fréquentes

**Big Bang rewrite**  
"On réécrit tout en 6 mois". **Résultat :**  6 mois deviennent 18 mois, budget triple, features manquantes, bugs nouveaux, parfois abandon. Mieux vaut extraire 1 service en 1 mois, évaluer, puis continuer.

**Refactoring sans tests**  
Refactorer du code sans tests. **Résultat :**  régressions, bugs en production, perte de confiance. Mieux vaut tests d'abord, refactoring ensuite.

**Refactoring sans business value**  
Refactorer du code mort ou peu utilisé. **Résultat :**  pas de valeur business, temps perdu. Mieux vaut refactorer le code critique et fréquemment modifié.

**Perfectionnisme**  
"Je vais rendre ce code parfait". **Résultat :**  temps infini, pas de progression. Mieux vaut rendre le code 20% meilleur à chaque passage.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Investir plus dans les tests de sécurité**  
Ajouter des characterization tests ou golden master tests avant chaque refactoring majeur. Ces tests permettent de refactorer en sécurité et d'éviter les régressions. Cet investissement se rentabilise rapidement via moins de bugs et plus de confiance.

**Mesurer l'impact régulièrement**  
Mettre en place des métriques dès le début : bugs/mois, deploy time, coverage, velocity, team happiness. Ces métriques permettent de mesurer l'impact réel du refactoring et d'ajuster si nécessaire.

**Prioriser le code critique**  
Se concentrer sur le refactoring du code critique (checkout, payment) et fréquemment modifié plutôt que du code mort ou peu utilisé. Ce code a le plus d'impact sur la vélocité et la qualité.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
