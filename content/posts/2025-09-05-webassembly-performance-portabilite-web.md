---
author:
- Kevin Delfour
title: 'WebAssembly : Performance native dans le navigateur, vraiment ?'
date: 2025-09-05
description: 'Au-delà du hype WebAssembly : cas d''usage réels, performance mesurée,
  et quand l''utiliser (ou pas) en production.'
categories:
- architecture
series:
- Tech
tags:
- webassembly
- performance
- developpement
- web
- javascript
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

WebAssembly (Wasm) promet des performances natives dans le navigateur. Après l'avoir utilisé en production sur plusieurs projets, voici ce qui fonctionne vraiment et ce qui relève du marketing.

Ce que j'ai observé : WebAssembly en 2 minutes. Qu'est-ce que c'est (WebAssembly format binaire exécutable navigateurs modernes offrant performances proches code natif Rust/C/C++ Go etc Compile .wasm Binaire compact Load Browser Exécution rapide). Promesses marketing vs Réalité (Marketing "Wasm 20x plus rapide JavaScript" Réalité Dépend totalement cas usage). WebAssembly n'est pas remplacement JavaScript. C'est complément cas usage spécifiques : Calculs intensifs, Portage applications, Performance critique. Approche pragmatique : Mesurer problème réel, Tester Wasm POC, Comparer métriques, Décider avec data. En 2025, Wasm mature production. Mais utilisez-le uniquement quand apporte vraie valeur.

## Le faux problème

Le faux problème serait de croire que WebAssembly remplace JavaScript. En réalité, WebAssembly n'est pas remplacement JavaScript. C'est complément cas usage spécifiques : Calculs intensifs, Portage applications, Performance critique. Cette distinction est importante pour comprendre quand utiliser WebAssembly.

Un autre faux problème : penser que WebAssembly est toujours plus rapide que JavaScript. En réalité, les performances dépendent du cas d'usage. Promesses marketing vs Réalité (Marketing "Wasm 20x plus rapide JavaScript" Réalité Dépend totalement cas usage). Cas d'usage où Wasm excelle (Calculs intensifs Exemple Traitement image Rust compilé Wasm pub fn apply_filter pixels &mut u8 width u32 height u32 Algorithme gourmand CPU Résultat mesuré JavaScript 450ms Wasm 85ms Gain 5.3x, Portage applications existantes Cas réel Porter éditeur vidéo C++ vers web Avant Réécrire JavaScript 6 mois + bugs Performance dégradée Avec Wasm Compilation directe 2 semaines Performance proche natif Code existant réutilisé Exemples célèbres Figma éditeur graphique AutoCAD Web Google Earth, Bibliothèques compression Bibliothèque compression Wasm import compress from './wasm-compress' 3x plus rapide zlib JavaScript Use cases Compression vidéo/audio Encodage/décodage images Cryptographie). Quand NE PAS utiliser Wasm (DOM manipulation Wasm pas accès direct DOM Doit passer JavaScript overhead JavaScript reste KING ça document.querySelector .button addEventListener click Wasm serait plus lent ici Applications "business logic" simples Pas besoin Wasm ça function calculateTotal items return items.reduce sum item sum + item.price 0 JavaScript amplement suffisant I/O intensive Wasm n'accélère pas Requêtes HTTP Accès BDD Lecture fichiers Le bottleneck ailleurs). Cette distinction aide à choisir selon contexte.

## Le vrai enjeu CTO

Le vrai enjeu est de comprendre quand WebAssembly apporte une vraie valeur :

**WebAssembly en 2 minutes** : Qu'est-ce que c'est (WebAssembly format binaire exécutable navigateurs modernes offrant performances proches code natif Rust/C/C++ Go etc Compile .wasm Binaire compact Load Browser Exécution rapide). Promesses marketing vs Réalité (Marketing "Wasm 20x plus rapide JavaScript" Réalité Dépend totalement cas usage). Cette distinction aide à comprendre WebAssembly.

**Cas d'usage où Wasm excelle** : Calculs intensifs (Exemple Traitement image Rust compilé Wasm pub fn apply_filter pixels &mut u8 width u32 height u32 Algorithme gourmand CPU Résultat mesuré JavaScript 450ms Wasm 85ms Gain 5.3x). Portage applications existantes (Cas réel Porter éditeur vidéo C++ vers web Avant Réécrire JavaScript 6 mois + bugs Performance dégradée Avec Wasm Compilation directe 2 semaines Performance proche natif Code existant réutilisé Exemples célèbres Figma éditeur graphique AutoCAD Web Google Earth). Bibliothèques compression (Bibliothèque compression Wasm import compress from './wasm-compress' 3x plus rapide zlib JavaScript Use cases Compression vidéo/audio Encodage/décodage images Cryptographie). Ces cas justifient WebAssembly.

**Quand NE PAS utiliser Wasm** : DOM manipulation (Wasm pas accès direct DOM Doit passer JavaScript overhead JavaScript reste KING ça document.querySelector .button addEventListener click Wasm serait plus lent ici). Applications "business logic" simples (Pas besoin Wasm ça function calculateTotal items return items.reduce sum item sum + item.price 0 JavaScript amplement suffisant). I/O intensive (Wasm n'accélère pas Requêtes HTTP Accès BDD Lecture fichiers Le bottleneck ailleurs). Ces cas ne justifient pas WebAssembly.

**Performance Benchmarks réels** : Test 1 Calcul Fibonacci CPU-bound (JavaScript function fib n if n <=1 return n return fib n -1 + fib n -2 Résultats fib 40 JavaScript 1250ms Wasm 680ms Gain 1.8x). Test 2 Traitement image (JavaScript 450ms Wasm 85ms Gain 5.3x). Test 3 Détection plagiat (Comparaison 2000 mots JavaScript 890ms Wasm 145ms Gain 6.1x). Ces benchmarks montrent quand WebAssembly apporte une valeur.

## Cadre de décision

Voici les principes qui m'ont aidé à décider quand utiliser WebAssembly :

**1. WebAssembly complément JavaScript plutôt que remplacement**  
WebAssembly n'est pas remplacement JavaScript. C'est complément cas usage spécifiques : Calculs intensifs, Portage applications, Performance critique. Approche pragmatique : Mesurer problème réel, Tester Wasm POC, Comparer métriques, Décider avec data. En 2025, Wasm mature production. Mais utilisez-le uniquement quand apporte vraie valeur.

**2. Cas d'usage où Wasm excelle calculs intensifs portage applications bibliothèques compression**  
Calculs intensifs (Exemple Traitement image Rust compilé Wasm pub fn apply_filter pixels &mut u8 width u32 height u32 Algorithme gourmand CPU Résultat mesuré JavaScript 450ms Wasm 85ms Gain 5.3x). Portage applications existantes (Cas réel Porter éditeur vidéo C++ vers web Avant Réécrire JavaScript 6 mois + bugs Performance dégradée Avec Wasm Compilation directe 2 semaines Performance proche natif Code existant réutilisé Exemples célèbres Figma éditeur graphique AutoCAD Web Google Earth). Bibliothèques compression (Bibliothèque compression Wasm import compress from './wasm-compress' 3x plus rapide zlib JavaScript Use cases Compression vidéo/audio Encodage/décodage images Cryptographie). Ces cas justifient WebAssembly.

**3. Quand NE PAS utiliser Wasm DOM manipulation applications business logic simples I/O intensive**  
DOM manipulation (Wasm pas accès direct DOM Doit passer JavaScript overhead JavaScript reste KING ça document.querySelector .button addEventListener click Wasm serait plus lent ici). Applications "business logic" simples (Pas besoin Wasm ça function calculateTotal items return items.reduce sum item sum + item.price 0 JavaScript amplement suffisant). I/O intensive (Wasm n'accélère pas Requêtes HTTP Accès BDD Lecture fichiers Le bottleneck ailleurs). Ces cas ne justifient pas WebAssembly.

**4. Performance Benchmarks réels plutôt que promesses marketing**  
Test 1 Calcul Fibonacci CPU-bound (JavaScript function fib n if n <=1 return n return fib n -1 + fib n -2 Résultats fib 40 JavaScript 1250ms Wasm 680ms Gain 1.8x). Test 2 Traitement image (JavaScript 450ms Wasm 85ms Gain 5.3x). Test 3 Détection plagiat (Comparaison 2000 mots JavaScript 890ms Wasm 145ms Gain 6.1x). Ces benchmarks montrent quand WebAssembly apporte une valeur plutôt que promesses marketing.

**5. Optimisation taille bundle lazy loading streaming compilation**  
Optimisation 1 wasm-opt (Problème Wasm peut être lourd my_wasm_lib_bg.wasm 287KB my_wasm_lib.js 12KB Total 299KB Optimisation wasm-opt Installer binaryen npm install -g binaryen Optimiser wasm-opt -Oz -o optimized.wasm input.wasm Résultat 287KB → 156KB -45%). Optimisation 2 Lazy loading (Ne charger Wasm nécessaire button.addEventListener click async const heavy_computation await import './pkg/my_wasm_lib.js' Wasm chargé seulement clic). Optimisation 3 Streaming compilation (Compilation streaming plus rapide const instance await WebAssembly.instantiateStreaming fetch optimized.wasm). Ces optimisations réduisent la taille bundle et améliorent les performances.

## Retour terrain

Ce que j'ai observé dans différents projets :

**Ce qui fonctionne** : WebAssembly complément JavaScript (WebAssembly n'est pas remplacement JavaScript C'est complément cas usage spécifiques Calculs intensifs Portage applications Performance critique Approche pragmatique Mesurer problème réel Tester Wasm POC Comparer métriques Décider avec data En 2025 Wasm mature production Mais utilisez-le uniquement quand apporte vraie valeur) plutôt que remplacement JavaScript. Cas d'usage où Wasm excelle (Calculs intensifs Exemple Traitement image Rust compilé Wasm Résultat mesuré JavaScript 450ms Wasm 85ms Gain 5.3x Portage applications existantes Cas réel Porter éditeur vidéo C++ vers web Avant Réécrire JavaScript 6 mois + bugs Performance dégradée Avec Wasm Compilation directe 2 semaines Performance proche natif Code existant réutilisé Exemples célèbres Figma éditeur graphique AutoCAD Web Google Earth Bibliothèques compression Bibliothèque compression Wasm 3x plus rapide zlib JavaScript Use cases Compression vidéo/audio Encodage/décodage images Cryptographie) justifie WebAssembly. Performance Benchmarks réels (Test 1 Calcul Fibonacci CPU-bound JavaScript 1250ms Wasm 680ms Gain 1.8x Test 2 Traitement image JavaScript 450ms Wasm 85ms Gain 5.3x Test 3 Détection plagiat Comparaison 2000 mots JavaScript 890ms Wasm 145ms Gain 6.1x) montrent quand WebAssembly apporte valeur.

**Ce qui bloque** : WebAssembly remplacement JavaScript (Utiliser Wasm tout plutôt que complément cas usage spécifiques). Résultat : complexité ajoutée, overhead inutile. Mieux vaut WebAssembly complément JavaScript (WebAssembly n'est pas remplacement JavaScript C'est complément cas usage spécifiques Calculs intensifs Portage applications Performance critique Approche pragmatique Mesurer problème réel Tester Wasm POC Comparer métriques Décider avec data). WebAssembly DOM manipulation applications business logic simples I/O intensive (DOM manipulation Wasm pas accès direct DOM Doit passer JavaScript overhead JavaScript reste KING Applications "business logic" simples Pas besoin Wasm JavaScript amplement suffisant I/O intensive Wasm n'accélère pas Requêtes HTTP Accès BDD Lecture fichiers Le bottleneck ailleurs). Résultat : performance dégradée, overhead inutile. Mieux vaut Quand NE PAS utiliser Wasm (DOM manipulation JavaScript reste KING Applications "business logic" simples JavaScript amplement suffisant I/O intensive Wasm n'accélère pas Requêtes HTTP Accès BDD Lecture fichiers Le bottleneck ailleurs).

**Production retours expérience** : Projet 1 Éditeur PDF web (Contexte Manipulation PDF côté client Rotation fusion compression pages Stack Rust + pdf-rs Compilé Wasm Résultats Fusion 10 PDFs 50 pages 2.1s vs impossible JS pur Bundle Wasm 1.2MB gzipped Satisfaction users 9.2/10). Projet 2 Plateforme e-learning (Contexte Détection plagiat côté client Algorithme Levenshtein distance gros textes Stack AssemblyScript → Wasm Résultats Comparaison 2000 mots 145ms vs 890ms JS Gain 6.1x ROI dev 2 semaines). Ces cas montrent quand WebAssembly fait sens.

## Erreurs fréquentes

**WebAssembly remplacement JavaScript**  
Utiliser Wasm tout plutôt que complément cas usage spécifiques. Résultat : complexité ajoutée, overhead inutile. Mieux vaut WebAssembly complément JavaScript (WebAssembly n'est pas remplacement JavaScript C'est complément cas usage spécifiques Calculs intensifs Portage applications Performance critique Approche pragmatique Mesurer problème réel Tester Wasm POC Comparer métriques Décider avec data).

**WebAssembly DOM manipulation applications business logic simples I/O intensive**  
DOM manipulation Wasm pas accès direct DOM Doit passer JavaScript overhead JavaScript reste KING Applications "business logic" simples Pas besoin Wasm JavaScript amplement suffisant I/O intensive Wasm n'accélère pas Requêtes HTTP Accès BDD Lecture fichiers Le bottleneck ailleurs. Résultat : performance dégradée, overhead inutile. Mieux vaut Quand NE PAS utiliser Wasm (DOM manipulation JavaScript reste KING Applications "business logic" simples JavaScript amplement suffisant I/O intensive Wasm n'accélère pas Requêtes HTTP Accès BDD Lecture fichiers Le bottleneck ailleurs).

**Pas d'optimisation taille bundle**  
Wasm peut être lourd my_wasm_lib_bg.wasm 287KB my_wasm_lib.js 12KB Total 299KB. Résultat : taille bundle élevée, performance dégradée. Mieux vaut Optimisation taille bundle (Optimisation 1 wasm-opt wasm-opt -Oz -o optimized.wasm input.wasm Résultat 287KB → 156KB -45% Optimisation 2 Lazy loading Ne charger Wasm nécessaire button.addEventListener click async const heavy_computation await import './pkg/my_wasm_lib.js' Wasm chargé seulement clic Optimisation 3 Streaming compilation Compilation streaming plus rapide const instance await WebAssembly.instantiateStreaming fetch optimized.wasm).

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Évaluer cas usage réels avant WebAssembly**  
Plutôt que WebAssembly remplacement JavaScript, évaluer cas usage réels avant WebAssembly (Cas d'usage où Wasm excelle Calculs intensifs Exemple Traitement image Rust compilé Wasm Résultat mesuré JavaScript 450ms Wasm 85ms Gain 5.3x Portage applications existantes Cas réel Porter éditeur vidéo C++ vers web Avec Wasm Compilation directe 2 semaines Performance proche natif Code existant réutilisé Bibliothèques compression Bibliothèque compression Wasm 3x plus rapide zlib JavaScript Use cases Compression vidéo/audio Encodage/décodage images Cryptographie Quand NE PAS utiliser Wasm DOM manipulation JavaScript reste KING Applications "business logic" simples JavaScript amplement suffisant I/O intensive Wasm n'accélère pas Requêtes HTTP Accès BDD Lecture fichiers Le bottleneck ailleurs). Cette évaluation évite la sur-ingénierie.

**Mettre en place Performance Benchmarks réels avant décision**  
Plutôt que promesses marketing, mettre en place Performance Benchmarks réels avant décision (Test 1 Calcul Fibonacci CPU-bound JavaScript 1250ms Wasm 680ms Gain 1.8x Test 2 Traitement image JavaScript 450ms Wasm 85ms Gain 5.3x Test 3 Détection plagiat Comparaison 2000 mots JavaScript 890ms Wasm 145ms Gain 6.1x). Ces benchmarks montrent quand WebAssembly apporte une valeur.

**Mettre en place optimisation taille bundle dès le début**  
Plutôt que pas d'optimisation taille bundle, mettre en place optimisation taille bundle dès le début (Optimisation 1 wasm-opt wasm-opt -Oz -o optimized.wasm input.wasm Résultat 287KB → 156KB -45% Optimisation 2 Lazy loading Ne charger Wasm nécessaire button.addEventListener click async const heavy_computation await import './pkg/my_wasm_lib.js' Wasm chargé seulement clic Optimisation 3 Streaming compilation Compilation streaming plus rapide const instance await WebAssembly.instantiateStreaming fetch optimized.wasm). Ces optimisations réduisent la taille bundle et améliorent les performances.

## Pour approfondir

Pour approfondir, tu peux aussi consulter les pages piliers du site ou les guides mis à disposition.
