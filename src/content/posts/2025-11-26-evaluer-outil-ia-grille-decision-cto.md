---
author: [Kevin Delfour]
title: "Évaluer un outil IA : grille de décision pour CTO"
date: 2025-11-26
slug: "evaluer-outil-ia-grille-decision-cto"
description: "Chaque semaine, un nouvel outil IA promet de révolutionner le développement. Comment évaluer sans se faire piéger par le marketing."
categories: ["décision"]
series: [IA & Développement]
tags: [ia, outils, evaluation, decision, strategie, cto]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

Un VP Engineering revient d'une conférence enthousiaste : « Il faut qu'on adopte [outil X], ça va changer notre productivité. » Le CTO regarde la démo — c'est impressionnant. Trois mois et une licence enterprise plus tard, l'outil est utilisé par deux personnes sur vingt. Le reste de l'équipe est retourné à ses habitudes. L'outil résolvait un problème que l'équipe n'avait pas.

Ce que j'ai observé : le marché des outils IA est saturé de promesses. Chaque semaine, un nouveau produit prétend multiplier la productivité par deux, trois ou dix. La difficulté n'est pas de trouver des outils — c'est de distinguer ceux qui apportent de la valeur réelle de ceux qui n'apportent qu'une bonne démo.

## Le faux problème

La question habituelle : « Quel est le meilleur outil IA pour le développement ? »

En réalité, il n'y a pas de meilleur outil. Il y a l'outil qui résout un problème réel de ton équipe, dans ton contexte, avec tes contraintes. Un outil excellent pour une équipe de 50 personnes sur un monolithe Python n'a aucun intérêt pour une équipe de 5 sur des microservices Go.

## Le vrai enjeu CTO

Le vrai enjeu est de **ne pas confondre innovation et adoption utile**. Le CTO a la responsabilité de protéger l'équipe du bruit technologique — et en IA, le bruit est assourdissant.

### Les cinq dimensions d'évaluation

**1. Le problème résolu.** L'outil résout-il un problème que l'équipe rencontre réellement, régulièrement, et qui coûte du temps ? Si le problème est hypothétique ou rare, l'outil n'a pas sa place.

**2. L'intégration dans le workflow existant.** Un outil qui demande de changer tout le workflow pour fonctionner ne sera pas adopté. L'outil doit s'insérer dans les pratiques existantes, pas les remplacer.

**3. La confidentialité et la sécurité.** Où vont les données ? Le code est-il envoyé sur des serveurs externes ? L'outil est-il compatible avec les politiques de sécurité de l'entreprise ? Ces questions ne sont pas optionnelles.

**4. Le coût total.** Pas seulement la licence. Le coût d'intégration, de formation, de maintenance, de migration si l'outil disparaît. Un outil gratuit qui demande deux semaines d'intégration coûte plus cher qu'un outil payant qui s'installe en une heure.

**5. La réversibilité.** Si l'outil disparaît demain, ou si le pricing change, quel est l'impact ? Un outil qui crée du vendor lock-in sur des workflows critiques est un risque stratégique.

## Cadre de décision

1. **Commencer par le problème, pas par l'outil.** Avant d'évaluer quoi que ce soit, formuler clairement le problème à résoudre. « On passe trop de temps sur les code reviews de style » est un problème. « On veut utiliser l'IA » n'en est pas un.

2. **Tester avec un périmètre limité.** Un POC de deux semaines, avec 3 à 5 développeurs volontaires, sur un projet non critique. Pas un déploiement enterprise dès le premier jour.

3. **Définir les critères de succès avant le test.** « L'outil est considéré utile si le temps de X diminue de Y % sans dégradation de Z. » Sans critères, l'évaluation se résume à des impressions subjectives.

4. **Inclure le coût de non-adoption.** Que se passe-t-il si on n'adopte pas cet outil ? Si la réponse est « rien de grave », l'urgence est faible. Si la réponse est « on perd un avantage compétitif concret », l'évaluation est prioritaire.

5. **Prendre la décision à froid.** Pas après une démo, pas après une conférence, pas sous la pression d'un vendeur. Une semaine de recul entre la découverte et la décision.

## Retour terrain

Ce que j'ai constaté :

- Les outils qui s'installent durablement sont ceux que les développeurs adoptent spontanément après le POC — sans qu'on les force.
- Les outils qui échouent sont ceux qui ont été choisis par le management et imposés à l'équipe. L'adoption top-down fonctionne rarement en IA.
- Le meilleur indicateur de succès n'est pas le taux d'utilisation initial. C'est le taux d'utilisation à trois mois. Beaucoup d'outils sont utilisés la première semaine par curiosité, puis abandonnés.

## Erreurs fréquentes

- **Acheter la licence enterprise avant le POC.** Le commercial propose une réduction. L'engagement est d'un an. L'outil n'est pas testé. Classique — et coûteux.
- **Évaluer sur la démo, pas sur le cas d'usage réel.** Les démos sont optimisées pour impressionner. Le cas d'usage réel est toujours plus complexe, plus sale, plus spécifique.
- **Ignorer l'avis des développeurs.** Si l'équipe dit « ça ne m'aide pas », c'est un signal fort. Les métriques de productivité ne contredisent pas l'expérience de ceux qui utilisent l'outil.
- **Empiler les outils.** Copilot + Cursor + ChatGPT + un bot de review + un assistant de documentation — l'empilement crée de la confusion, des conflits et de la fatigue cognitive.

## Si c'était à refaire

- Je maintiendrais un registre des outils évalués, avec les conclusions du POC. Ça évite de réévaluer le même outil six mois plus tard parce que quelqu'un l'a redécouvert.
- Je limiterais le nombre d'outils IA actifs à trois maximum dans l'équipe. Au-delà, la fragmentation de l'attention coûte plus que la valeur apportée.
- Je ferais une réévaluation semestrielle des outils en place. Ce qui était utile il y a six mois ne l'est peut-être plus.

## Pour approfondir

- [Gouvernance et décision](/articles/?cat=décision)
- [Gouvernance IA en entreprise : cadrer sans bloquer](/posts/gouvernance-ia-entreprise-cadrer-sans-bloquer/)
- [Build vs Buy : cadre de décision](/posts/build-vs-buy-vs-partner-cadre-decision/)
