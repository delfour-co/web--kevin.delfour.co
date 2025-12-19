---
author: ["Kevin Delfour"]
title: "Droit à l'erreur : comment le rendre réel, pas cosmétique"
date: 2024-10-07
slug: "droit-erreur-rendre-reel-pas-cosmetique"
description: "Le droit à l'erreur affiché vs vécu : transformer une valeur théorique en pratique concrète."
categories: ["culture"]
series: ["Culture"]
tags: ["erreur", "apprentissage", "culture", "blameless"]
pillar: "culture-management"
pillars: ["culture-management"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

"Chez nous, on a droit à l'erreur." Puis première erreur significative, et c'est le blame, la tension, la peur. Le "droit à l'erreur" était cosmétique, pas réel.

Ce que j'ai observé : le vrai droit à l'erreur se mesure à la première erreur significative. Si elle mène à apprentissage sans blame, c'est réel. Si elle mène à pun ition ou évitement, c'était cosmétique.

## Le faux problème

Le faux problème serait de croire que "droit à l'erreur" signifie "zéro conséquence". En réalité, il signifie "conséquences orientées apprentissage, pas punition".

Un autre faux problème : penser qu'on peut l'afficher sans le ritualiser. En réalité, sans processus concrets (post-mortems, etc.), ça reste théorique.

## Le vrai enjeu CTO

Le vrai enjeu est de créer les conditions où l'erreur devient opportunité d'apprentissage :

**Les 3 types d'erreurs** :

**Type 1 - Erreur de bonne foi**

Contexte : Décision raisonnable avec les infos disponibles, exécution correcte, résultat imprévu.

Exemple : Techno choisie qui s'avère mauvaise après 3 mois.

Réponse attendue : Post-mortem blameless, apprentissage documenté, pivot rapide.

Réponse toxique : "Pourquoi t'as choisi ça ?"

**Type 2 - Erreur de négligence**

Contexte : Processus existant non suivi, warnings ignorés, raccourcis dangereux.

Exemple : Deploy en prod sans tests malgré le process.

Réponse attendue : Comprendre pourquoi le process n'a pas été suivi (urgence ? pression ?), corriger la cause systémique.

Réponse toxique : Blâmer l'individu sans regarder la pression système.

**Type 3 - Erreur répétée**

Contexte : Même erreur 3× malgré les post-mortems.

Exemple : Même bug réintroduit 3 fois.

Réponse attendue : Chercher pourquoi l'apprentissage n'a pas pris (process ? formation ?).

Réponse toxique : "Tu ne comprends rien ?"

**Ce qui rend le droit à l'erreur réel** :

**Élément 1 - Leadership qui partage ses erreurs**

Le CTO partage publiquement (all-hands, retros) :
- Erreurs faites
- Impact
- Apprentissages

Cette vulnérabilité modélise le comportement attendu.

**Élément 2 - Post-mortems systématiques et blameless**

Chaque erreur significative → post-mortem obligatoire.

Principes :
- Focus système, pas personne
- Actions concrètes, pas blame

**Élément 3 - Célébration de la détection**

Remercier qui détecte/signale une erreur.

Exemple : "Merci d'avoir trouvé ce bug avant prod."

Cette reconnaissance encourage la transparence.

**Élément 4 - Pas de punition cachée**

L'erreur ne doit pas affecter l'évaluation, la promo, ou le bonus (sauf Type 3 répétée).

Vérifier que les RH sont alignées.

**Élément 5 - Budget d'erreur explicite**

Définir clairement : "On accepte X% d'échec sur l'innovation, Y incidents/trimestre sur prod."

Cette tolérance explicite déculpabilise.

## Cadre de décision

Voici comment je rends le droit à l'erreur réel :

**1. Modéliser par l'exemple**
CTO partage ses erreurs. All-hands trimestriel : "Mes 3 erreurs ce trimestre et ce que j'en ai appris." Cette pratique normalise l'erreur.

**2. Post-mortem blameless obligatoire**
Toute erreur significative = post-mortem dans les 3-5 jours. Template structure, facilitation neutre, focus système.

**3. Mesurer réaction aux erreurs**
Survey : "Te sens-tu safe de signaler une erreur ?" Score 1-10. Trend trimestriel. Score <7 = problème culture.

**4. Former au blameless**
Workshop équipe : comment faire post-mortem, comment parler d'erreurs. Cette formation crée culture commune.

**5. Vérifier alignement RH**
S'assurer que erreurs ne pénalisent pas évals, promos. Sinon "droit à l'erreur" reste cosmétique.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**Le droit à l'erreur cosmétique** : Affiché partout. Première erreur : dev blâmé publiquement. **Résultat:**  erreurs cachées, pas d'apprentissage, incidents répétés.

**Le droit à l'erreur réel** : CTO partage erreurs publiquement. Post-mortems blameless systématiques. Dev fait erreur coûteuse, post-mortem révèle gap processus, processus corrigé. **Résultat:**  erreur devient opportunité amélioration.

**L'exemple de modélisation** : CTO all-hands : "J'ai choisi MongoDB, c'était une erreur, voici pourquoi, voici ce qu'on fait, voici ce que j'ai appris." Cette vulnérabilité change culture complète en 6 mois.

**Le budget d'erreur** : "On accepte 10% échec sur POCs innovation, 2 incidents mineurs/trimestre sur prod." Cette tolérance explicite libère expérimentation.

## Erreurs fréquentes

**Afficher sans incarner**
"Droit à l'erreur" affiché mais première erreur = blame. **Résultat:**  cynisme, erreurs cachées.

**Confondre erreur et incompétence**
Type 1 (bonne foi) traité comme Type 3 (répété). **Résultat:**  paralysie, personne n'ose décider.

**Pas de rituel post-erreur**
Erreur arrive, pas de post-mortem, pas d'apprentissage. **Résultat:**  même erreur se répète.

**RH non alignée**
"Droit à l'erreur" mais erreur impacte évaluation annuelle. **Résultat:**  message contradictoire, culture toxique.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Partager mes erreurs dès le premier all-hands**
Normaliser dès le début. "Voici mes erreurs passées, voici ce que j'en ai appris." Cette modélisation initiale pose les bases.

**Post-mortem template dès 5 personnes**
Ritualiser le processus avant la première grosse erreur. Cette préparation évite l'impro en crise.

**Mesurer psychological safety dès le début**
Survey mensuel simple : "Safe de signaler erreur ?" Cette mesure révèle culture réelle.

**Aligner RH explicitement**
Discussion franche avec RH : erreurs ne doivent PAS affecter éval sauf Type 3 répétées. Cette alignment évite double discours.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore comment créer une vraie culture d'apprentissage par l'erreur.

Pour approfondir, tu peux aussi consulter l'article ["Post-mortem blameless"](/posts/postmortem-sans-blame-apprendre-sans-punir/) ou les autres contenus du pilier ["Culture & management"](/culture-management/).
