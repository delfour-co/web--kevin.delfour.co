---
author:
- Kevin Delfour
title: 'Automatiser des tests pour maîtriser son impact carbone : guide pratique'
date: 2024-12-01
description: Découvrez comment automatiser des tests pour réduire l'impact carbone
  de vos projets numériques, grâce à un guide accessible et innovant.
categories:
- developpement
series:
- Développement
tags:
- tests-automatises
- eco-conception
- developpement-web
ShowToc: true
TocOpen: false
pillar: gouvernance-decision
pillars:
- gouvernance-decision
audience: cto
audiences:
- cto
---
🔹 Article #72
Pilier éditorial : Architecture & Technique
Public principal : Public A (CTO / tech leaders)

## Situation réelle

Quand on parle d'impact carbone, on pense souvent à des problématiques industrielles ou aux transports. Pourtant, le numérique représente aujourd'hui près de 4% des émissions mondiales de gaz à effet de serre, un chiffre en constante augmentation.

Ce que j'ai observé : chaque requête web, chaque octet transféré ou calcul exécuté contribue à ce bilan. En tant que développeurs, managers ou architectes, nous avons le pouvoir d'agir. Automatiser des tests pour évaluer et réduire l'impact carbone d'un projet est une démarche à la fois technique et porteuse de sens.

Avec le recul, j'ai constaté qu'il est tentant de penser qu'un site statique ou une application bien optimisée n'a qu'un faible impact. Mais la taille moyenne d'une page web a été multipliée par 10 en 20 ans. Ce poids, combiné aux centaines de requêtes quotidiennes par utilisateur, finit par peser lourd, littéralement.

## Le faux problème

Le faux problème serait de croire qu'un site statique ou une application bien optimisée n'a qu'un faible impact. En réalité, la taille moyenne d'une page web a été multipliée par 10 en 20 ans. Ce que j'ai observé : ce poids, combiné aux centaines de requêtes quotidiennes par utilisateur, finit par peser lourd, littéralement.

Un autre faux problème : penser qu'il faut mesurer l'impact carbone manuellement. En réalité, l'automatisation permet de mesurer l'impact en continu, de détecter les dérives, et de responsabiliser les équipes. Ce que j'ai constaté : chaque déploiement est une opportunité d'améliorer vos pratiques.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment automatiser la mesure et la réduction de l'impact carbone :

**L'automatisation comme levier d'amélioration** : Ce que j'ai observé : l'automatisation permet de mesurer l'impact en continu (chaque déploiement est une opportunité d'améliorer vos pratiques), de détecter les dérives (un nouveau script ou une image non optimisée peut soudainement doubler la consommation énergétique), et de responsabiliser les équipes (la transparence des résultats crée une dynamique d'amélioration continue).

**Les outils de mesure d'impact carbone** : Ce que j'ai appris : plusieurs outils permettent de quantifier l'impact carbone. Lighthouse CI : une solution open source qui audite les performances, l'accessibilité et les meilleures pratiques d'un site web. GreenFrame : un outil qui simule l'impact énergétique d'un utilisateur parcourant votre site. WebsiteCarbon API : pour estimer les émissions carbone basées sur le poids des pages et la source d'énergie utilisée. Cette diversité permet de choisir selon contraintes.

**L'intégration dans les workflows** : Ce que j'ai constaté : intégrer l'automatisation dans votre pipeline CI/CD permet de mesurer l'impact en continu et de détecter les dérives rapidement. Cette intégration facilite l'amélioration continue.

## Cadre de décision

Voici les principes qui m'ont aidé à automatiser la mesure et la réduction de l'impact carbone :

**1. Automatisation plutôt que mesure manuelle**  
L'automatisation permet de mesurer l'impact en continu (chaque déploiement est une opportunité d'améliorer vos pratiques), de détecter les dérives (un nouveau script ou une image non optimisée peut soudainement doubler la consommation énergétique), et de responsabiliser les équipes (la transparence des résultats crée une dynamique d'amélioration continue). Ce que j'ai observé : cette automatisation facilite l'amélioration continue.

**2. Intégration dans le pipeline CI/CD plutôt que tests ponctuels**  
Intégrer l'automatisation dans votre pipeline CI/CD permet de mesurer l'impact en continu et de détecter les dérives rapidement. Cette intégration facilite l'amélioration continue et responsabilise les équipes. Ce que j'ai constaté : cette approche crée une dynamique d'amélioration continue.

**3. Outils adaptés selon contraintes plutôt qu'un seul outil**  
Lighthouse CI : solution open source qui audite les performances, l'accessibilité et les meilleures pratiques d'un site web. GreenFrame : outil qui simule l'impact énergétique d'un utilisateur parcourant votre site. WebsiteCarbon API : pour estimer les émissions carbone basées sur le poids des pages et la source d'énergie utilisée. Ce que j'ai appris : cette diversité permet de choisir selon contraintes.

**4. Dynamique d'amélioration continue plutôt que mesure ponctuelle**  
Partager les résultats (afficher les rapports dans un tableau de bord), fixer des objectifs communs (réduire l'impact de 10% à chaque sprint), former les équipes (sensibiliser aux bonnes pratiques d'éco-conception). Ce que j'ai observé : cette dynamique facilite l'amélioration continue et responsabilise les équipes.

**5. Assertions et seuils plutôt que mesure passive**  
Définir des assertions et des seuils pour les métriques critiques : taille totale des ressources, nombre de requêtes, bytes non utilisés, images optimisées, temps d'interactivité, first contentful paint, accessibilité, SEO, font-display, cache TTL. Ce que j'ai constaté : ces assertions permettent de détecter les dérives rapidement et de maintenir la qualité.

## Retour terrain

Ce que j'ai observé dans les équipes qui ont adopté cette approche : l'automatisation permet de mesurer l'impact en continu et de détecter les dérives rapidement. Cette approche crée une dynamique d'amélioration continue et responsabilise les équipes.

Avec le recul, j'ai constaté que l'intégration dans le pipeline CI/CD facilite l'amélioration continue. Chaque déploiement est une opportunité d'améliorer vos pratiques.

Ce que j'ai appris : automatiser des tests pour maîtriser son impact carbone n'est pas seulement une question technique : c'est un engagement envers une innovation responsable. Cela peut sembler complexe au début, mais chaque étape franchie contribue à un web plus durable.

## Erreurs fréquentes

Ce que j'ai observé comme erreurs fréquentes : penser qu'un site statique ou une application bien optimisée n'a qu'un faible impact. Ce que j'ai constaté : la taille moyenne d'une page web a été multipliée par 10 en 20 ans, et ce poids finit par peser lourd.

Une autre erreur fréquente : mesurer l'impact carbone manuellement plutôt qu'automatiquement. Ce que j'ai observé : cette approche ne permet pas de mesurer l'impact en continu ni de détecter les dérives rapidement.

Ce que j'ai constaté : ne pas intégrer l'automatisation dans le pipeline CI/CD. Avec le recul, j'ai observé que cette intégration facilite l'amélioration continue et responsabilise les équipes.

Une erreur fréquente : ne pas créer une dynamique d'amélioration continue. Ce que j'ai observé : cette approche empêche de partager les résultats, de fixer des objectifs communs, et de former les équipes.

## Si c'était à refaire

Si c'était à refaire, j'automatiserais la mesure dès le début plutôt que de mesurer manuellement. Ce que j'ai appris : cette automatisation facilite l'amélioration continue et responsabilise les équipes.

Avec le recul, j'aurais intégré l'automatisation dans le pipeline CI/CD dès le départ. Ce que j'ai constaté : cette intégration facilite l'amélioration continue et détecte les dérives rapidement.

Si c'était à refaire, j'aurais créé une dynamique d'amélioration continue dès le début. Ce que j'ai appris : cette dynamique facilite l'amélioration continue et responsabilise les équipes.

Avec le recul, j'aurais défini des assertions et des seuils dès le départ. Ce que j'ai observé : ces assertions permettent de détecter les dérives rapidement et de maintenir la qualité.

## Pour approfondir

Pour approfondir, tu peux explorer les outils de mesure d'impact carbone (Lighthouse CI, GreenFrame, WebsiteCarbon API), les pratiques d'intégration CI/CD (GitHub Actions, GitLab CI, assertions et seuils), et les stratégies d'amélioration continue (partage des résultats, objectifs communs, formation équipes).

Une manière de voir les choses : automatiser des tests pour maîtriser son impact carbone n'est pas seulement une question technique : c'est un engagement envers une innovation responsable. Ce que j'ai observé : cela peut sembler complexe au début, mais chaque étape franchie contribue à un web plus durable.

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
