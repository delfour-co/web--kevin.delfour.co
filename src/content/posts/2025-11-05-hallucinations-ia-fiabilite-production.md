---
author: [Kevin Delfour]
title: "Hallucinations et fiabilité : quand l'IA se trompe en production"
date: 2025-11-05
slug: "hallucinations-ia-fiabilite-production"
description: "L'IA génère du code plausible, pas du code correct. Comprendre les limites de fiabilité pour éviter les mauvaises surprises en production."
categories: ["craft"]
series: [IA & Développement]
tags: [ia, fiabilite, hallucinations, production, qualite, risque]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Un développeur utilise un LLM pour générer un client HTTP avec gestion du retry et du backoff exponentiel. Le code est propre, bien structuré, avec des commentaires pertinents. Il passe les tests unitaires. En production, le retry ne fonctionne pas : le LLM avait généré un calcul de backoff qui semblait correct mais qui, dans certains cas, produisait un délai de zéro milliseconde — transformant le retry en boucle infinie.

Le code était plausible. Il n'était pas correct. Et c'est précisément ce qui rend les hallucinations dangereuses : elles ne ressemblent pas à des erreurs.

## Le faux problème

La question habituelle : « Les LLM sont-ils fiables pour le code ? »

En réalité, la question est mal posée. Un LLM ne « sait » pas coder. Il prédit la séquence de tokens la plus probable en fonction de son entraînement. Quand le pattern est courant et bien représenté dans les données d'entraînement, le résultat est souvent correct. Quand le cas est inhabituel ou ambigu, le LLM produit quelque chose de plausible — mais pas nécessairement juste.

## Le vrai enjeu

Le vrai enjeu est de comprendre **où la fiabilité s'effondre** et d'adapter les pratiques en conséquence.

### Les zones de fiabilité élevée

- **Patterns communs.** CRUD, API REST, patterns de design classiques — tout ce qui a été écrit des millions de fois sur Internet. L'IA reproduit correctement ce qui est fréquent.
- **Syntaxe et conventions.** L'IA respecte généralement la syntaxe du langage et les conventions du framework. Les erreurs de compilation sont rares.
- **Transformations mécaniques.** Convertir un format en un autre, mapper des structures, générer du boilerplate — les tâches mécaniques sont fiables.

### Les zones de fiabilité faible

- **Logique conditionnelle complexe.** Plus les branches et les conditions s'imbriquent, plus le risque d'hallucination augmente. L'IA perd le fil de la logique dans les cas de bord.
- **Calculs numériques précis.** Arrondis, overflow, edge cases numériques — l'IA génère des calculs qui « semblent justes » mais qui échouent sur les cas limites.
- **Interactions entre systèmes.** Concurrence, transactions distribuées, race conditions — tout ce qui implique du timing et de l'ordre d'exécution est mal géré.
- **APIs récentes ou peu documentées.** L'IA génère des appels à des APIs qui n'existent plus, des paramètres inventés, des versions obsolètes. Elle complète avec ce qu'elle « connaît », même si c'est faux.

### Pourquoi les hallucinations passent inaperçues

Le code hallucciné est syntaxiquement correct. Il compile. Il peut même passer des tests si les tests ne couvrent pas les bons cas. Le développeur qui lit le code voit quelque chose de raisonnable et passe à la suite. L'erreur n'apparaît qu'en conditions réelles — sous charge, avec des données inhabituelles, après un timeout.

## Cadre de décision

1. **Appliquer le principe de confiance zéro sur le code généré.** Chaque ligne produite par l'IA est suspecte jusqu'à preuve du contraire. La preuve, ce sont les tests — pas la lecture visuelle.

2. **Tester les cas limites en priorité.** L'IA génère bien les cas nominaux. Ce sont les cas limites qui posent problème. Demander explicitement à l'IA les edge cases, puis les tester indépendamment.

3. **Ne jamais utiliser l'IA pour du code critique sans double validation.** Paiement, authentification, cryptographie, calculs financiers — double relecture humaine obligatoire, tests de non-régression renforcés.

4. **Traiter les versions d'API avec méfiance.** Toujours vérifier que l'API et les paramètres suggérés par l'IA existent dans la version actuelle de la librairie. L'IA mélange fréquemment les versions.

5. **Documenter les limites connues.** Quand un pattern généré par l'IA a causé un bug, le documenter dans le wiki de l'équipe. Les erreurs de l'IA sont souvent répétitives — un pattern hallucciné sera re-proposé si le contexte est similaire.

## Retour terrain

Ce que j'ai constaté :

- Les hallucinations les plus fréquentes concernent les APIs et les librairies. L'IA invente des méthodes qui n'existent pas, avec des signatures plausibles.
- Les bugs les plus coûteux viennent de la logique conditionnelle — des conditions qui semblent couvrir tous les cas mais qui oublient un chemin.
- Les équipes qui ont le moins de problèmes sont celles qui traitent le code IA exactement comme du code de junior : elles le relisent ligne par ligne et le challengent.

## Erreurs fréquentes

- **Faire confiance parce que le code « a l'air bien ».** La plausibilité est le piège principal de l'IA. Plus le code est lisible, plus on baisse la garde.
- **Ne pas tester les cas limites.** Les tests nominaux passent presque toujours. C'est insuffisant.
- **Utiliser l'IA pour du code que personne ne comprend.** Si le développeur ne peut pas expliquer chaque ligne, le code ne devrait pas être mergé.
- **Ignorer les warnings du compilateur ou du linter.** L'IA génère parfois du code qui déclenche des warnings subtils. Les ignorer est une erreur classique.

## Si c'était à refaire

- J'établirais une règle simple : tout code généré par IA doit avoir au moins un test de cas limite qui ne vient pas de l'IA. Un test écrit à la main, par un humain qui a réfléchi au cas de bord.
- Je tiendrais un registre des hallucinations rencontrées par l'équipe. Pas pour blâmer l'IA, mais pour apprendre à reconnaître ses patterns d'erreur.
- Je rappellerais régulièrement que « le code compile et les tests passent » ne veut pas dire « le code est correct ».

## Pour approfondir

- [Architecture et craft](/articles/?cat=craft)
- [IA et tests : générer, valider, maintenir](/posts/ia-tests-generer-valider-maintenir/)
- [Gouvernance IA en entreprise : cadrer sans bloquer](/posts/gouvernance-ia-entreprise-cadrer-sans-bloquer/)
