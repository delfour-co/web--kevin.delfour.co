---
author:
- Kevin Delfour
title: 'Repenser son code : Comment une quête de performance a transformé ma vision
  du web'
date: 2024-11-22
description: Découvrez comment une refonte totale d'un site web, de Nuxt à Astro,
  a permis d'améliorer son impact carbone et sa performance.
categories:
- developpement
series:
- Développement
tags:
- astro
- tailwind
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

## Situation réelle

Il y a peu, je me suis retrouvé face à une réalité qui fait mal à tout développeur soucieux de bien faire. En testant un site simple que j'avais créé sur Website Carbon, le verdict est tombé : note F. Clairement, mon impact écologique était à des années-lumière de ce que je souhaitais défendre.

Ce que j'ai observé : j'avais opté pour une stack que je considérais comme moderne et efficace : Nuxt avec Nuxt UI Pro. Rapidité de développement ? Oui. Performance environnementale ? Non. Cette approche rapide et « clé en main » se révélait finalement coûteuse en termes de ressources.

Avec le recul, j'ai constaté que cette approche avait son revers :

- Beaucoup de code généré par défaut
- Des dépendances non optimisées pour les besoins réels du site
- Scripts lourds qui ajoutaient un poids conséquent à chaque page
- Mauvaise gestion des médias avec images et ressources non adaptées à leurs affichages

## Le faux problème

Le faux problème serait de croire qu'une stack moderne et efficace garantit une performance environnementale. En réalité, rapidité de développement et performance environnementale ne vont pas toujours de pair. Ce que j'ai observé : Nuxt avec Nuxt UI Pro facilite la création de sites performants, dynamiques et bien structurés, mais cette approche rapide et « clé en main » se révèle finalement coûteuse en termes de ressources.

Un autre faux problème : penser qu'il faut choisir entre rapidité de développement et performance environnementale. En réalité, il existe des alternatives qui permettent de concilier les deux. Ce que j'ai constaté : Astro, conçu pour des sites statiques, privilégie la génération de contenu léger et optimise le rendu en supprimant le JavaScript inutile.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment réduire l'impact carbone sans sacrifier la qualité :

**Le poids inutile des frameworks "tout-en-un"** : Ce que j'ai observé : cette approche rapide et « clé en main » se révèle finalement coûteuse en termes de ressources.

Principaux problèmes identifiés :

- Beaucoup de code généré par défaut
- Des dépendances non optimisées pour les besoins réels du site
- Scripts lourds qui ajoutent un poids conséquent à chaque page
- Mauvaise gestion des médias avec images et ressources non adaptées à leurs affichages

**La transition vers des solutions plus légères** : Ce que j'ai appris : plutôt que de retoucher un projet qui repose sur des bases déjà lourdes, faire table rase peut être plus efficace. Astro s'est imposé comme une alternative prometteuse. Ce framework, conçu pour des sites statiques, privilégie la génération de contenu léger et optimise le rendu en supprimant le JavaScript inutile.

**L'optimisation comme processus continu** : Ce que j'ai constaté : réduire les kilos-octets inutiles demande du temps et de l'attention. Mais chaque petit ajustement compte pour l'environnement. En accumulant ces « petits détails », un site web finit par consommer bien plus d'énergie que nécessaire.

## Cadre de décision

Voici les principes qui m'ont aidé à réduire l'impact carbone sans sacrifier la qualité :

**1. Simplicité technique comme choix conscient plutôt que solutions "tout-en-un"**  
Abandonner des solutions « tout-en-un » comme Nuxt UI Pro pour des alternatives plus épurées peut sembler fastidieux au début, mais cela permet de regagner en contrôle et en légèreté. Ce que j'ai observé : cette approche réduit le poids inutile et améliore la performance environnementale.

**2. Optimisation minutieuse plutôt que approche rapide**  
Réduire les kilos-octets inutiles demande du temps et de l'attention. Mais chaque petit ajustement compte pour l'environnement. Ce que j'ai constaté : en accumulant ces « petits détails », un site web finit par consommer bien plus d'énergie que nécessaire. Cette optimisation minutieuse réduit l'impact carbone.

**3. Optimisation des médias plutôt que médias non adaptés**  
Redimensionner les images pour leur affichage réel et compresser chaque fichier, éliminant ainsi des kilos-octets inutiles. Ce que j'ai appris : les images réduites à leur taille d'affichage réelle et compressées sans perte réduisent drastiquement le poids des pages.

**4. Suppression du code inutile plutôt que code généré par défaut**  
Éliminer tout le superflu et reconsidérer la structure du code. Supprimer les styles inutilisés grâce à la puissance de Tailwind et de son purge automatique. Intégrer les scripts uniquement si nécessaire. Ce que j'ai observé : cette approche réduit le poids des pages et améliore la performance.

**5. Mesure continue de l'impact plutôt que suppositions**  
Tester régulièrement sur Website Carbon, analyser les résultats, et se demander : que puis-je faire pour améliorer cela ? Ce que j'ai constaté : cette mesure continue permet d'identifier les opportunités d'amélioration et de suivre l'impact réel des optimisations.

## Retour terrain

Ce que j'ai observé dans cette transition : après quelques heures de travail, le site initialement noté F est passé à un B+. Non seulement cela, mais le rendu des pages est devenu quasi immédiat. Cette sensation de voir son site se charger presque instantanément est une satisfaction en soi, mais elle prend encore plus de sens quand on sait qu'on réduit également son empreinte carbone.

Avec le recul, j'ai constaté que la simplicité technique peut être un choix conscient. Abandonner des solutions « tout-en-un » pour des alternatives plus épurées permet de regagner en contrôle et en légèreté.

Ce que j'ai appris : l'optimisation est un processus minutieux. Réduire les kilos-octets inutiles demande du temps et de l'attention. Mais chaque petit ajustement compte pour l'environnement.

## Erreurs fréquentes

Ce que j'ai observé comme erreurs fréquentes : choisir une stack moderne sans vérifier son impact environnemental. Ce que j'ai constaté : rapidité de développement et performance environnementale ne vont pas toujours de pair.

Une autre erreur fréquente : ne pas optimiser les médias. Ce que j'ai observé : les images et ressources non adaptées à leurs affichages ajoutent un poids conséquent à chaque page.

Ce que j'ai constaté : garder du code généré par défaut inutile. Avec le recul, j'ai observé que beaucoup de code généré par défaut et des dépendances non optimisées pour les besoins réels du site augmentent le poids inutilement.

Une erreur fréquente : ne pas mesurer l'impact réel. Ce que j'ai observé : cette approche empêche d'identifier les opportunités d'amélioration et de suivre l'impact réel des optimisations.

## Si c'était à refaire

Si c'était à refaire, je choisirais la simplicité technique comme choix conscient dès le début. Ce que j'ai appris : cette approche réduit le poids inutile et améliore la performance environnementale.

Avec le recul, j'aurais optimisé les médias dès le départ. Ce que j'ai constaté : les images réduites à leur taille d'affichage réelle et compressées sans perte réduisent drastiquement le poids des pages.

Si c'était à refaire, je supprimerais le code inutile dès le début. Ce que j'ai appris : cette approche réduit le poids des pages et améliore la performance.

Avec le recul, j'aurais mesuré l'impact continu dès le départ. Ce que j'ai observé : cette mesure permet d'identifier les opportunités d'amélioration et de suivre l'impact réel des optimisations.

## Pour approfondir

Pour approfondir, tu peux explorer les outils de mesure d'impact carbone (Website Carbon, GreenFrame), les frameworks légers (Astro, Eleventy), les techniques d'optimisation (compression images, purge CSS, code splitting), et les pratiques d'éco-conception (réduction JavaScript, optimisation médias, mesure continue).

Une manière de voir les choses : chaque octet compte, et chaque ligne de code est une opportunité de faire mieux. Ce que j'ai observé : en tant que développeurs, nous avons le pouvoir de réduire cet impact. Cette démarche est aussi extrêmement stimulante. Voir un site plus rapide, plus léger, et obtenir une bien meilleure note sur des outils comme Website Carbon donne un sentiment d'accomplissement unique.

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
