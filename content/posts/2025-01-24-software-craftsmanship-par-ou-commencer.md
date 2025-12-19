---
author:
- Kevin Delfour
title: 'Software Craftsmanship : par où commencer sans se perdre'
date: 2025-01-24
description: Guide pratique pour débuter dans l'artisanat logiciel avec des étapes
  concrètes et accessibles, loin du jargon intimidant
categories:
- qualite
series:
- Qualité & Tests
tags:
- software-craftsmanship
- bonnes-pratiques
- clean-code
- developpement
- debutant
ShowToc: true
TocOpen: false
pillar: gouvernance-decision
pillars:
- gouvernance-decision
audience: cto
audiences:
- cto
---
## Dédramatisation

"Software Craftsmanship", "Clean Code", "SOLID"... Ces termes circulent partout dans notre écosystème, souvent accompagnés d'un sentiment d'intimidation. J'ai longtemps pensé que c'était réservé aux développeurs "experts", à ceux qui écrivent des livres ou donnent des conférences.

Erreur ! Le Software Craftsmanship, c'est avant tout une démarche progressive d'amélioration continue. Pas besoin d'être Robert C. Martin pour commencer. Il suffit de faire un pas, puis un autre. Le Software Craftsmanship n'est pas une destination, c'est un voyage. Chaque petit pas compte : un nom de variable plus clair, une fonction mieux découpée, un test ajouté.

## Le réel (sans filtre)

La réalité du Software Craftsmanship : c'est simplement l'envie de bien faire son travail. C'est se soucier de : la lisibilité de son code (pour soi et ses collègues), la facilité de maintenance (parce qu'on reviendra dessus), la fiabilité (parce qu'on n'aime pas les bugs en production), l'évolutivité (parce que les besoins changent).

**L'analogie de l'artisan** : Imaginez un menuisier qui construit une table. Il peut bâcler (assembler rapidement planches, tant que ça tient) ou faire correctement (choisir bon bois, soigner assemblages, poncer, vernir). Dans les deux cas, vous avez une table. Mais laquelle préférez-vous chez vous ? Laquelle durera le plus longtemps ? Pour le code, c'est pareil. Vous pouvez faire fonctionner une feature rapidement, ou prendre un peu plus de temps pour qu'elle soit robuste et maintenable.

**Les premiers pas** : Nommage explicite (donner noms clairs variables fonctions, "calculateDiscountedPrice(unitPrice, quantity)" plutôt que "calc(u, p)", dans 6 mois vous comprendrez immédiatement ce qu'il fait). Fonctions courtes et focalisées (une fonction doit faire une seule chose et la faire bien, séparer responsabilités plutôt que tout mélanger). Tests simples (tester 1-2 fonctions par semaine, l'habitude viendra naturellement, commencer par fonctions critiques).

**Progresser étape par étape** : Semaine 1-2 bases (installer linter formateur, renommer 10 variables/fonctions noms explicites, découper 2-3 fonctions trop longues). Semaine 3-4 structure (éliminer 3 duplications code, écrire 5 tests unitaires fonctions critiques, organiser code modules logiques). Mois 2 approfondissement (apprendre 1 principe SOLID commencer responsabilité unique, refactoriser module complexe, mettre place review code simple). Mois 3+ automatisation (intégrer tests CI/CD, mettre place métriques qualité, partager bonnes pratiques équipe).

## Repères clairs

Voici une manière de voir les choses pour débuter dans le Software Craftsmanship :

**Les premiers pas** : Nommage explicite (donner noms clairs variables fonctions, "calculateDiscountedPrice(unitPrice, quantity)" plutôt que "calc(u, p)", dans 6 mois vous comprendrez immédiatement ce qu'il fait, exercice pratique prendre fichier projet actuel renommer 5 variables/fonctions noms plus explicites ressentir différence immédiate). Fonctions courtes et focalisées (une fonction doit faire une seule chose et la faire bien, séparer responsabilités plutôt que tout mélanger, "processOrder(order)" appelle "validateOrder(order)", "calculateOrderTotal(order)", "saveOrder(order, total)", "sendConfirmationEmail(user, order)" chaque fonction <20 lignes testable). Tests simples (tester 1-2 fonctions par semaine, l'habitude viendra naturellement, commencer par fonctions critiques, test simple avec Jest "describe('calculateDiscount', () => { test('calculates discount correctly', () => { expect(calculateDiscount(100, 0.2)).toBe(80); }); test('throws error for negative price', () => { expect(() => calculateDiscount(-100, 0.2)).toThrow('Price cannot be negative'); }); });").

**Progresser étape par étape** : Semaine 1-2 bases (installer linter formateur, renommer 10 variables/fonctions noms explicites, découper 2-3 fonctions trop longues). Semaine 3-4 structure (éliminer 3 duplications code, écrire 5 tests unitaires fonctions critiques, organiser code modules logiques). Mois 2 approfondissement (apprendre 1 principe SOLID commencer responsabilité unique, refactoriser module complexe, mettre place review code simple). Mois 3+ automatisation (intégrer tests CI/CD, mettre place métriques qualité, partager bonnes pratiques équipe).

**Ressources pour continuer** : Lectures accessibles ("Clean Code" Robert C. Martin commencer 3 premiers chapitres, "Refactoring" Martin Fowler excellent apprendre améliorer code existant, articles blog tutoriels plutôt que livres théoriques). Pratique (code katas exercices courts pratiquer FizzBuzz Roman Numerals, code reviews collègues bienveillants, projets perso expérimenter sans pression). Communautés (forums locaux meetups développeurs, Slack/Discord communautés tech, mentoring informel collègues expérimentés).

## Erreurs classiques

**Perfectionnisme paralysant**  
Refactoriser tout d'un coup. **Résultat :**  paralysie, pas de progression. Mieux vaut améliorer progressivement feature par feature. Règle Boy Scout : "Laissez code plus propre que vous ne l'avez trouvé". Même petite amélioration compte.

**Over-engineering**  
Appliquer tous design patterns d'un coup. **Résultat :**  code trop compliqué, maintenance difficile. Mieux vaut commencer simple et complexifier seulement quand nécessaire. "OrderProcessorFactory" trop compliqué pour commencer, mieux vaut "processOrder(order)" simple qui fonctionne.

**Ignorer le contexte**  
Appliquer mêmes standards tous projets. **Résultat :**  standards inadaptés, frustration. Mieux vaut adapter standards contexte projet. Prototype rapide n'a pas mêmes exigences que système critique.

## Message de responsabilité

Débuter dans le Software Craftsmanship, c'est votre responsabilité. Personne ne le fera à votre place. Mais c'est aussi votre choix : vous pouvez choisir de progresser étape par étape et améliorer votre code progressivement, ou vous pouvez choisir de ne pas progresser et accepter les conséquences (code difficile maintenir, bugs fréquents, équipe frustrée). L'important est d'assumer ce choix et ses conséquences.

Si vous choisissez de progresser, faites-le progressivement. Semaine 1-2 bases (installer linter formateur, renommer variables/fonctions, découper fonctions trop longues). Semaine 3-4 structure (éliminer duplications, écrire tests unitaires, organiser code modules). Mois 2 approfondissement (apprendre 1 principe SOLID, refactoriser module complexe, mettre place review code). Mois 3+ automatisation (intégrer tests CI/CD, mettre place métriques qualité, partager bonnes pratiques). Cette progression progressive évite l'overwhelming et construit les compétences progressivement.

Si vous choisissez de ne pas progresser, assumez ce choix. Vous acceptez probablement code difficile maintenir, bugs fréquents, équipe frustrée. Ce choix est valide si vous préférez éviter l'apprentissage, mais comprenez les conséquences.

## Pour aller plus loin

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
