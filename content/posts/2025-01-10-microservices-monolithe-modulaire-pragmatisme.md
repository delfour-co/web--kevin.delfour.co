---
author:
- Kevin Delfour
title: 'Microservices vs Monolithe modulaire : le pragmatisme avant la mode'
date: 2025-01-10
slug: "microservices-monolithe-modulaire-pragmatisme"
description: Analyse comparée des architectures microservices et monolithiques, avec
  des critères de choix pragmatiques basés sur l'expérience terrain
categories:
- architecture
series:
- Architecture
tags:
- architecture
- microservices
- monolithe
- scalabilite
- performance
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

"Il nous faut des microservices !" Cette phrase revient régulièrement lors des revues d'architecture. Souvent prononcée avec la certitude que cette approche résoudra tous les problèmes d'évolutivité et de performance. Mais après avoir conçu et maintenu des systèmes dans les deux paradigmes, je peux affirmer que la réalité est bien plus nuancée.

Ce que j'ai observé : le choix entre microservices et monolithe modulaire ne devrait jamais être dicté par la mode technologique, mais par des critères objectifs liés au contexte du projet. Chaque approche a ses avantages et ses inconvénients. L'important est de comprendre quand chaque approche fait sens.

## Le faux problème

Le faux problème serait de croire qu'il existe une architecture "meilleure" en absolu. En réalité, microservices et monolithe modulaire sont des outils différents pour résoudre des problèmes différents. Choisir microservices parce que "c'est moderne" ou monolithe parce que "c'est simple" sans comprendre le contexte réel, c'est faire un choix idéologique plutôt qu'un choix technique éclairé.

Un autre faux problème : associer automatiquement monolithe à "code spaghetti" et microservices à "architecture moderne". Un monolithe bien conçu peut être remarquablement efficace (Shopify maintient un monolithe Ruby on Rails qui traite des milliards de requêtes). Des microservices mal conçus peuvent créer plus de problèmes qu'ils n'en résolvent.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre quand chaque approche fait sens :

**Monolithe modulaire** : Avantages sous-estimés.

Simplicité opérationnelle :
- Un seul déploiement
- Une seule base de données
- Un seul processus de monitoring

Performance transactionnelle :
- Transactions ACID
- Pas de problématiques de consistance éventuelle

Debugging simplifié :
- Tous les logs au même endroit
- Stack traces complètes
- Profiling direct

Ces avantages sont précieux quand les équipes sont petites ou en phase d'apprentissage.

**Microservices** : Vrais cas d'usage.

Équipes autonomes et indépendantes :
- 6-8 développeurs qui peuvent travailler de façon totalement autonome sur des domaines métier distincts

Besoins de scalabilité hétérogène :
- Service de recommandations qui doit traiter 10x plus de requêtes que le module de facturation

Technologies spécialisées :
- Machine learning en Python
- Traitement temps réel en Go
- Interface utilisateur en Node.js

Ces cas d'usage justifient la complexité additionnelle.

**Les défis réels**

Complexité opérationnelle :
- Gestion d'une architecture distribuée introduit une complexité opérationnelle considérable

Consistance des données :
- Gestion de la consistance dans un système distribué est un défi majeur
- Patterns comme Event Sourcing ou CQRS ajoutent de la complexité

Latence réseau :
- Chaque appel inter-service introduit de la latence réseau
- Dans un monolithe un appel de méthode prend quelques nanosecondes
- Dans une architecture distribuée même un appel local peut prendre plusieurs millisecondes

## Cadre de décision

Voici les critères qui m'ont aidé à choisir entre les deux approches :

**1. Taille et maturité de l'équipe**
- Équipe < 8 personnes → Monolithe modulaire (simplicité opérationnelle prioritaire)
- Équipes multiples autonomes → Microservices (découplage des cycles de développement)
- Équipe junior → Monolithe modulaire (courbe d'apprentissage moins steep)

Cette taille d'équipe influence directement la capacité à gérer la complexité opérationnelle.

**2. Contraintes techniques**

Volume et pattern de trafic :
- Si vos différents modules ont des besoins de scalabilité similaires, un monolithe avec réplication horizontale peut être plus simple qu'une architecture distribuée

Besoins de consistance :
- Les secteurs financiers ou les systèmes de réservation bénéficient souvent de la simplicité transactionnelle du monolithe

Tolérance à la latence :
- Les applications temps réel (gaming, trading) peuvent souffrir de la latence réseau introduite par les microservices

**3. Contexte organisationnel**  
La loi de Conway s'applique particulièrement bien ici : votre architecture reflètera votre organisation. Si vos équipes travaillent étroitement ensemble, forcer une séparation via des microservices peut créer plus de friction que de valeur. Si vos équipes sont autonomes et travaillent sur des domaines distincts, les microservices peuvent faciliter cette autonomie.

**4. Approche hybride**

Une stratégie que j'ai souvent vue réussir :
- Démarrer avec un monolithe modulaire bien structuré
- Identifier les modules qui bénéficieraient d'une extraction
- Extraire progressivement en commençant par les plus autonomes
- Maintenir un core monolithique pour les fonctionnalités transverses

Cette approche progressive évite le Big Bang et permet d'évaluer les bénéfices à chaque étape.

**5. Mesurer l'impact réel**

Indicateurs techniques :
- Time to deploy
- MTTR
- Deployment frequency
- Lead time

Indicateurs business :
- Developer velocity
- Bug rate
- Customer satisfaction

Ces métriques permettent de mesurer l'impact réel de vos choix d'architecture sur la productivité de vos équipes et la satisfaction de vos utilisateurs.

## Retour terrain

Ce que j'ai observé dans différents contextes :

**Ce qui fonctionne**

Un monolithe modulaire bien structuré avec :
- Domaines métier clairement séparés
- Interfaces bien définies entre modules
- Système de feature flags granulaire
- Suite de tests robuste

Cette structure permet de livrer rapidement (3 mois avec une équipe de 4 développeurs) tout en gardant la possibilité d'extraire progressivement.

**Ce qui bloque**

Forcer des microservices trop tôt sans avoir les équipes autonomes nécessaires.

**Résultat :**
- Complexité opérationnelle ingérable
- Équipes qui se bloquent mutuellement
- Vélocité qui diminue

Mieux vaut commencer simple et évoluer progressivement.

**Les erreurs fréquentes**

Choisir microservices pour "être moderne" sans comprendre les défis opérationnels.

**Résultat :**
- Complexité ingérable
- Équipes qui souffrent
- Vélocité qui diminue

Choisir monolithe par défaut sans considérer les besoins réels de scalabilité.

**Résultat :**
- Limitations techniques qui bloquent la croissance

**L'approche hybride**
- Démarrer avec un monolithe modulaire
- Identifier les modules qui bénéficieraient d'une extraction (autonomie, scalabilité différente, technologie spécialisée)
- Extraire progressivement en commençant par les plus autonomes
- Maintenir un core monolithique pour les fonctionnalités transverses

Cette approche progressive permet d'évaluer les bénéfices à chaque étape.

## Erreurs fréquentes

**Choisir par idéologie plutôt que par contexte**  
Choisir microservices parce que "c'est moderne" ou monolithe parce que "c'est simple" sans comprendre le contexte réel. **Résultat:**  choix qui ne correspond pas aux besoins réels, problèmes opérationnels ou limitations techniques. Mieux vaut analyser le contexte (taille équipe, contraintes techniques, contexte organisationnel) avant de choisir.

**Forcer une architecture trop tôt**  
Forcer des microservices trop tôt sans avoir les équipes autonomes nécessaires. **Résultat:**  complexité opérationnelle ingérable, équipes qui se bloquent mutuellement, vélocité qui diminue. Mieux vaut commencer simple (monolithe modulaire) et évoluer progressivement.

**Ignorer la loi de Conway**  
Forcer une architecture qui ne correspond pas à l'organisation. Si vos équipes travaillent étroitement ensemble, forcer une séparation via des microservices peut créer plus de friction que de valeur. Mieux vaut adapter l'architecture à l'organisation, pas l'inverse.

**Ne pas mesurer l'impact réel**  
Choisir une architecture sans mesurer l'impact réel sur la productivité et la satisfaction. **Résultat:**  vous ne savez pas si votre choix était le bon, vous ne pouvez pas ajuster. Mieux vaut mesurer : time to deploy, MTTR, developer velocity, bug rate, customer satisfaction.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Commencer simple systématiquement**  
Plutôt que de choisir microservices d'emblée, commencer avec un monolithe modulaire bien structuré. Cette approche permet de livrer rapidement tout en gardant la possibilité d'extraire progressivement. Évoluer vers les microservices seulement quand les bénéfices justifient clairement la complexité additionnelle.

**Mesurer l'impact réel**  
Mettre en place des métriques dès le début : time to deploy, MTTR, developer velocity, bug rate, customer satisfaction. Ces métriques permettent de mesurer l'impact réel de vos choix d'architecture et d'ajuster si nécessaire.

**Adapter progressivement**  
Ne pas imposer une architecture d'avance, mais laisser l'architecture évoluer progressivement avec les besoins. Démarrer avec un monolithe modulaire, identifier les modules qui bénéficieraient d'une extraction, extraire progressivement en commençant par les plus autonomes. Cette approche progressive évite le Big Bang et permet d'évaluer les bénéfices à chaque étape.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
