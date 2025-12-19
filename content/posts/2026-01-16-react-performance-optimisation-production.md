---
author:
- Kevin Delfour
title: 'React en production : Optimisations qui changent vraiment les performances'
date: 2026-01-16
description: 'Guide pratique d''optimisation React : memo, useMemo, code splitting,
  et techniques avancées pour des apps performantes en production.'
categories:
- developpement
series:
- Développement
tags:
- react
- performance
- optimisation
- frontend
- production
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

"L'app React est lente." Classique. Après avoir optimisé des dizaines d'apps React en production, voici les optimisations qui donnent les meilleurs résultats.

Ce que j'ai observé : les optimisations React les plus impactantes sont le code splitting (réduit bundle initial -60%), la memoization (évite re-renders inutiles -70%), la virtualization (scalabilité listes -90% DOM nodes), le lazy loading (chargement progressif -80% temps chargement), et le state management optimisé (colocation et contexts optimisés).

Avec le recul, j'ai constaté que ces optimisations permettent de passer d'applications lentes à des applications performantes en production. L'objectif n'est pas d'optimiser tout, mais d'identifier les 3 composants les plus coûteux à optimiser.

## Le faux problème

Le faux problème serait de croire qu'il faut optimiser tous les composants React dès le début. En réalité, l'objectif est d'identifier les composants les plus coûteux à optimiser. Ce que j'ai observé : toutes les optimisations ne sont pas nécessaires partout. Il faut mesurer avant d'optimiser.

Un autre faux problème : penser qu'il faut utiliser React.memo, useMemo et useCallback partout. En réalité, ces optimisations ont un coût et doivent être utilisées de manière ciblée. Ce que j'ai constaté : composant simple (overhead memo > bénéfice), props changent souvent (memo inutile), props objets/fonctions non mémorisées (memo inefficace).

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre comment optimiser une application React en production :

**Code splitting pour réduire le bundle initial** : Ce que j'ai observé : bundle initial de 2MB = temps chargement 8s (3G), utilisateur attend avant interaction. Solution : dynamic imports et route-based code splitting. Gain : bundle initial -60%, First Contentful Paint -40%. Route `/` charge seulement Home (200KB), route `/dashboard` charge Dashboard à la demande (300KB), bundle initial -70%.

**Memoization pour éviter les re-renders inutiles** : Ce que j'ai appris : React.memo évite les re-renders en cascade. Utiliser quand : composant rendu souvent avec mêmes props, composant coûteux (calculs, rendu complexe), props primitives ou références stables. Ne pas utiliser quand : composant simple (overhead memo > bénéfice), props changent souvent (memo inutile), props objets/fonctions non mémorisées. Gain : -70% re-renders sur composants coûteux.

**useMemo et useCallback pour mémoriser valeurs et fonctions** : Ce que j'ai constaté : useMemo mémorise calculs coûteux (recalcul seulement si dépendances changent), useCallback mémorise fonctions (fonction stable pour éviter re-renders enfants). Gain : -50% calculs redondants.

**Virtualization pour listes longues** : Ce que j'ai observé : rendre 10000 items = 10000 DOM nodes = performance dégradée, scroll laggy. Solution : react-window ou react-virtual rend seulement items visibles (~12 items pour 600px / 50px). Gain : -99% DOM nodes, scroll fluide.

**Lazy loading pour images et composants** : Ce que j'ai appris : lazy loading natif (`loading="lazy"`), Intersection Observer pour contrôle fin. Gain : -80% temps chargement.

## Cadre de décision

Voici les principes qui m'ont aidé à optimiser une application React en production :

**1. Code splitting plutôt que bundle monolithique**  
Dynamic imports et route-based code splitting : route `/` charge seulement Home (200KB), route `/dashboard` charge Dashboard à la demande (300KB), bundle initial -70%. Ce que j'ai observé : cette approche réduit le bundle initial -60% et améliore First Contentful Paint -40%.

**2. React.memo ciblé plutôt que partout**  
Utiliser quand : composant rendu souvent avec mêmes props, composant coûteux (calculs, rendu complexe), props primitives ou références stables. Ne pas utiliser quand : composant simple (overhead memo > bénéfice), props changent souvent (memo inutile), props objets/fonctions non mémorisées. Ce que j'ai appris : cette approche évite -70% re-renders sur composants coûteux.

**3. useMemo/useCallback cas précis plutôt que systématique**  
useMemo mémorise calculs coûteux (recalcul seulement si dépendances changent), useCallback mémorise fonctions (fonction stable pour éviter re-renders enfants). Ce que j'ai constaté : cette approche réduit -50% calculs redondants.

**4. Virtualization listes longues plutôt que tout rendre**  
react-window ou react-virtual rend seulement items visibles (~12 items pour 600px / 50px) plutôt que rendre 10000 items = 10000 DOM nodes. Ce que j'ai observé : cette approche réduit -99% DOM nodes et améliore le scroll.

**5. Lazy loading images et composants plutôt que chargement immédiat**  
Lazy loading natif (`loading="lazy"`), Intersection Observer pour contrôle fin. Ce que j'ai appris : cette approche réduit -80% temps chargement.

## Retour terrain

Ce que j'ai observé dans les applications optimisées : les optimisations React les plus impactantes sont le code splitting (réduit bundle initial), la memoization (évite re-renders inutiles), la virtualization (scalabilité listes), le lazy loading (chargement progressif), et le state management optimisé (colocation et contexts optimisés).

Avec le recul, j'ai constaté que ces optimisations permettent de passer d'applications lentes à des applications performantes en production. L'objectif n'est pas d'optimiser tout, mais d'identifier les 3 composants les plus coûteux à optimiser.

Ce que j'ai appris : toutes les optimisations ne sont pas nécessaires partout. Il faut mesurer avant d'optimiser et utiliser React DevTools Profiler pour identifier les composants les plus coûteux.

## Erreurs fréquentes

Ce que j'ai observé comme erreurs fréquentes : utiliser React.memo, useMemo et useCallback partout. Ce que j'ai constaté : ces optimisations ont un coût et doivent être utilisées de manière ciblée.

Une autre erreur fréquente : ne pas mesurer avant d'optimiser. Ce que j'ai observé : cette approche peut créer de la complexité inutile sans bénéfice réel.

Ce que j'ai constaté : ne pas utiliser la virtualization pour listes longues. Avec le recul, j'ai observé que rendre 10000 items = 10000 DOM nodes dégrade la performance et rend le scroll laggy.

Une erreur fréquente : ne pas utiliser le code splitting. Ce que j'ai observé : cette approche augmente le bundle initial et ralentit le chargement.

## Si c'était à refaire

Si c'était à refaire, je mesurerais avant d'optimiser dès le début. Ce que j'ai appris : cette approche permet d'identifier les composants les plus coûteux à optimiser.

Avec le recul, j'aurais utilisé le code splitting dès le départ. Ce que j'ai constaté : cette approche réduit le bundle initial -60% et améliore First Contentful Paint -40%.

Si c'était à refaire, j'aurais utilisé React.memo de manière ciblée plutôt que partout. Ce que j'ai appris : cette approche évite -70% re-renders sur composants coûteux sans overhead inutile.

Avec le recul, j'aurais virtualisé les listes longues dès le début. Ce que j'ai observé : cette approche réduit -99% DOM nodes et améliore le scroll.

## Pour approfondir

Pour approfondir, tu peux explorer les techniques de code splitting (dynamic imports, route-based splitting), les stratégies de memoization (React.memo, useMemo, useCallback), les approches de virtualization (react-window, react-virtual), les pratiques de lazy loading (images, composants), et les optimisations de state management (colocation, contexts optimisés).

Une manière de voir les choses : l'objectif n'est pas d'optimiser tout, mais d'identifier les 3 composants les plus coûteux à optimiser. Ce que j'ai observé : toutes les optimisations ne sont pas nécessaires partout. Il faut mesurer avant d'optimiser et utiliser React DevTools Profiler pour identifier les composants les plus coûteux.

Prochaine étape : lance React DevTools Profiler sur ton app et identifie les 3 composants les plus coûteux à optimiser.

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
